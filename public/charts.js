var g_pie_chart_shader_program = null;
var g_bar_chart_shader_program = null;
var g_pie_chart_vertex_buffer = null;
var g_bar_chart_vertex_buffer = null;
var g_chart_highlighted_index = -1;
let g_label_data_object_map = new Map();
var g_chart_data;
var g_chart_text = undefined;
var g_chart_color_data_map = new Map();
let g_max_data_value;
let g_min_data_value;

let column_chart_highlighted_label = null;
let column_chart_max_scale_label = null;
let column_chart_min_scale_label = null;
let pie_chart_highlighted_label = null;


const CHART_HIGHLIGHTED_SHADING_FRACTION = 0.5;
const MIN_COLUMN_CHART_Y = 0;
const MAX_COLUMN_CHART_Y = 0.8;
const non_printing_character = '\u00A0';
const MAX_PIE_CHART_BAR_COUNT = 25;
const MAX_CHART_ELEMENT_COUNT = 60;


// Namespace all chart functionality to avoid conflicts with other code
const WebGLChartApp = (function() 
{
    // Private chart data array

    // Public API methods
    return {
        // Called when chart type changes or data updates
        updateChartDisplay: function() 
        {
            const canvas_element = document.getElementById('webglChartCanvas');
            const chartType = document.getElementById('webglChartTypeSelector').value;
            const glContext = canvas_element.getContext('webgl2');
            const chart_borders = {left: 0, bottom: 0, right: 0, top: 0};
            
            if (chartType === 'pie') 
            {
                renderPieChartWithWebGL(glContext, canvas_element, webglchart_dataSeries);
            } else 
            {
                renderColumnChartWithWebGL(glContext, canvas_element, webglchart_dataSeries);
            }
        },

        // Add a new data point to the chart
        addChartDataPoint: function() {
            const labelInput = document.getElementById('webglChartDataLabel');
            const valueInput = document.getElementById('webglChartDataValue');
            
            const label = labelInput.value;
            const value = parseFloat(valueInput.value);
            
            if (label && !isNaN(value)) {
                webglchart_dataSeries.push({
                    label,
                    value,
                    color: generateUniqueChartColorHex()
                });
                
                labelInput.value = '';
                valueInput.value = '';
                
                WebGLChartApp.updateChartDisplay();
            }
        },
        
        // Initialize the chart and event handlers
        initializeChart: function() {
            const canvas_element = document.getElementById('webglChartCanvas');
            const tooltipElement = document.getElementById('webglChartTooltip');

            canvas_element.addEventListener('mousemove', (event) => {
                const chartType = document.getElementById('webglChartTypeSelector').value;
                if (chartType === 'pie') {
                    handlePieChartHoverInteraction(event);
                } else {
                    handleColumnChartHoverInteraction(event);
                }
            });

            canvas_element.addEventListener('mouseleave', () => {
                tooltipElement.style.display = 'none';
            });

            // Initial draw
            WebGLChartApp.updateChartDisplay();
        }
    };
})();

// Initialize chart when DOM is loaded
// document.addEventListener('DOMContentLoaded', WebGLChartApp.initializeChart);


function createWebGLChartShader(glContext, shaderType, shaderSource) {
    const shader = glContext.createShader(shaderType);
    glContext.shaderSource(shader, shaderSource);
    glContext.compileShader(shader);
    
    if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error('WebGL Chart Shader compilation error:', glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
    }
    return shader;
}

function createWebGLChartProgram(glContext, vertexShader, fragmentShader) {
    const program = glContext.createProgram();
    glContext.attachShader(program, vertexShader);
    glContext.attachShader(program, fragmentShader);
    glContext.linkProgram(program);
    
    if (!glContext.getProgramParameter(program, glContext.LINK_STATUS)) {
        console.error('WebGL Chart Program linking error:', glContext.getProgramInfoLog(program));
        return null;
    }
    return program;
}

// Color utility functions
function convertHexStringToRGBArray(hexColor) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
    ] : [1, 0, 0];
}

let lastColor = null;

function generateUniqueChartColorHex() {
    const upper_limit = 220;
    const minDifference = 150;
    const maxRedLimit = 180; // Maximum allowed red when green and blue are low
    
    function generateColor() {
        let r, g, b;
        do {
            r = Math.floor(Math.random() * upper_limit);
            g = r > 120 ? Math.floor(Math.random() * 140) : Math.floor(Math.random() * upper_limit);
            b = Math.floor(Math.random() * upper_limit);
        } while (r > maxRedLimit && g < 50 && b < 50); // Reject if red is high and green/blue are low
        return { r, g, b };
    }
    
    function getColorDifference(color1, color2) {
        if (!color2) return Infinity;
        return Math.abs(color1.r - color2.r) + 
            Math.abs(color1.g - color2.g) + 
            Math.abs(color1.b - color2.b);
    }
    
    let newColor;
    let attempts = 0;
    const maxAttempts = 10;
    
    do {
        newColor = generateColor();
        attempts++;
    } while (getColorDifference(newColor, lastColor) < minDifference && attempts < maxAttempts);
    
    const hexColor = "#" + 
        newColor.r.toString(16).padStart(2, "0") + 
        newColor.g.toString(16).padStart(2, "0") + 
        newColor.b.toString(16).padStart(2, "0");
    
    lastColor = newColor;
    return hexColor;
}

    // function generateUniqueChartColorHex() 
    // {
    //     let r, g, b;
    //     do {
    //         // Keep values in darker range (0-128)
    //         r = Math.floor(Math.random() * 129);
    //         g = Math.floor(Math.random() * 129);
    //         b = Math.floor(Math.random() * 129);
            
    //         // Avoid yellow by ensuring at least one of R or G is significantly lower
    //         // and boosting blue if both R and G are high
    //         if (r > 80 && g > 80) {
    //             b = Math.max(b, 64); // Ensure some blue presence
    //         }
    //     } while (r > 100 && g > 100 && b < 50); // Reject if too yellow-like
        
    //     // Convert to hex and pad with zeros
    //     const hex = '#' + 
    //         r.toString(16).padStart(2, '0') + 
    //         g.toString(16).padStart(2, '0') + 
    //         b.toString(16).padStart(2, '0');
        
    //     return hex;
    // }

    const webglchart_dataSeries = [
        { label: "Category A", value: 30, color: generateUniqueChartColorHex()},
        { label: "Category B", value: 20, color: generateUniqueChartColorHex() },
        { label: "Category C", value: 15, color: generateUniqueChartColorHex() },
        { label: "Category D", value: 60, color: generateUniqueChartColorHex() }
    ];

    // WebGL Shaders with descriptive names
    const webglChartVertexShaderSource = `
        attribute vec2 chart_vertex_positions;
        void main() 
        {
            gl_Position = vec4(chart_vertex_positions, 0.0, 1.0);
        }
    `;

    const webglChartPieFragmentShaderSource = `
        precision mediump float;
        uniform vec2 webglChartDimensions;
        uniform vec2 webGLcanvas_offset;
        uniform vec2 webglChartPieCenter;
        uniform float webglChartPieRadius;
        uniform float webglChartPieStartAngle;
        uniform float webglChartPieEndAngle;
        uniform vec3 webglChartPieSliceColor;
        uniform float shading_fraction;
        
        void main() {
            float aspect_ratio = webglChartDimensions.x / webglChartDimensions.y;
            vec2 pixel_coord = gl_FragCoord.xy - webGLcanvas_offset.xy;

            // vec2 normalizedCoord = (pixel_coord) * 2.0 - 1.0;
            vec2 normalizedCoord = (pixel_coord / webglChartDimensions) * 2.0 - 1.0;
            normalizedCoord.x = normalizedCoord.x * aspect_ratio;
            
            vec2 full_viewport_size = webglChartDimensions + webGLcanvas_offset;
            vec2 center = webglChartPieCenter + ((webGLcanvas_offset / full_viewport_size) * 2.0) - 1.0;
            center = webglChartPieCenter;
            float distanceFromCenter = length(normalizedCoord - center);
            float angleFromCenter = atan(normalizedCoord.y - center.y, normalizedCoord.x - center.x);
            
            if (angleFromCenter < 0.0) {
                angleFromCenter += 2.0 * 3.14159;
            }
            
            if (distanceFromCenter <= webglChartPieRadius && 
                angleFromCenter >= webglChartPieStartAngle && 
                angleFromCenter <= webglChartPieEndAngle) 
            {
                gl_FragColor = vec4(webglChartPieSliceColor, 1.0);

                if (shading_fraction < 1.0)
                {
                    vec3 border_color = vec3(1.0, 0.0, 0.0);
                    gl_FragColor = vec4(border_color, 1.0);
                }
            } 
            else 
            {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            }

            // vec2 screen_fraction = pixel_coord / webglChartDimensions;

            // if (abs(normalizedCoord.x - center.x) < 0.05)
            // {
            //     gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
            // }
            // else
            // {
            //     gl_FragColor = vec4(pixel_coord / webglChartDimensions, 0.0, 1.0);
            // }

            // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    const webglChartColumnFragmentShaderSource = 
    `
        precision mediump float;
        uniform vec2 webglChartDimensions;
        uniform vec2 webGLcanvas_offset;
        uniform vec2 webglChartColumnPosition;
        uniform vec2 webglChartColumnDimensions;
        uniform vec3 webglChartColumnColor;
        uniform float shading_fraction;
        
        void main() 
        {
            vec2 pixel_coord = gl_FragCoord.xy - webGLcanvas_offset.xy;
            float aspect_ratio = webglChartDimensions.x / webglChartDimensions.y;
            vec2 viewport_fraction = pixel_coord / webglChartDimensions;
            vec2 normalizedCoord = viewport_fraction * 1.0;
            // vec2 normalizedCoord = viewport_fraction;
            vec2 column_screen_fraction = webglChartColumnDimensions / 2.0;
            
            // Define border thickness (in normalized units)
            float border_thickness = 0.900; // Adjust this value to change border thickness
            float border_thickness_x = column_screen_fraction.x * border_thickness;
            float border_thickness_y = border_thickness_x * aspect_ratio;
            
            // Check if pixel is within column boundaries
            bool isInColumn = (normalizedCoord.x >= webglChartColumnPosition.x && 
                            normalizedCoord.x <= webglChartColumnPosition.x + webglChartColumnDimensions.x &&
                            normalizedCoord.y >= webglChartColumnPosition.y && 
                            normalizedCoord.y <= webglChartColumnPosition.y + webglChartColumnDimensions.y);
            
            if (isInColumn) 
            {
                // Check if pixel is near the border
                bool is_border =   normalizedCoord.x > webglChartColumnPosition.x + webglChartColumnDimensions.x - border_thickness_x
                                || normalizedCoord.y < webglChartColumnPosition.y + border_thickness_y
                                ;
                
                // if (shading_fraction < 1.0 && is_border) 
                if (shading_fraction < 1.0) 
                {
                    // Draw black border
                    vec3 color = webglChartColumnColor;
                    vec3 border_color = vec3(1.0, 0.0, 0.0);
                    gl_FragColor = vec4(border_color, 1.0);
                } 
                else 
                {
                    // Draw column interior
                    gl_FragColor = vec4(webglChartColumnColor, 1.0) * 1.0;
                }
            } 
            else 
            {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            }

            // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
            // gl_FragColor = vec4(webglChartColumnDimensions.y, webglChartColumnDimensions.y, 0.0, 1.0);
        }    
    `;

    // WebGL helper functions

    function initializePieColumnChartShaders(glContext)
    {
        if (g_pie_chart_shader_program === null)
        {
            const vertexShader = createWebGLChartShader(glContext, glContext.VERTEX_SHADER, webglChartVertexShaderSource);
            const fragmentShader = createWebGLChartShader(glContext, glContext.FRAGMENT_SHADER, webglChartPieFragmentShaderSource);
            g_pie_chart_shader_program = createWebGLChartProgram(glContext, vertexShader, fragmentShader);
        }

        if (g_bar_chart_shader_program === null)
        {
            const vertexShader = createWebGLChartShader(glContext, glContext.VERTEX_SHADER, webglChartVertexShaderSource);
            const fragmentShader = createWebGLChartShader(glContext, glContext.FRAGMENT_SHADER, webglChartColumnFragmentShaderSource);
            g_bar_chart_shader_program = createWebGLChartProgram(glContext, vertexShader, fragmentShader);
        }
    }

    const full_viewport_vertex_positions = new Float32Array(
    [
        -1, -1,
         1, -1,
        -1,  1,
         1,  1
    ]);

        // Chart drawing functions
    function renderPieChartWithWebGL(glContext, viewport, chart_data, clear = true) 
    {
        if (!glContext) return;

        glContext.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

        initializePieColumnChartShaders(glContext);
        if (!g_pie_chart_shader_program) return;
        
        const current_program = glContext.getParameter(glContext.CURRENT_PROGRAM);
        glContext.useProgram(g_pie_chart_shader_program);
        
        
        if (g_pie_chart_vertex_buffer === null)
        {
            g_pie_chart_vertex_buffer = glContext.createBuffer();
        }

        glContext.bindBuffer(glContext.ARRAY_BUFFER, g_pie_chart_vertex_buffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, full_viewport_vertex_positions, glContext.STATIC_DRAW);
        
        const chart_position_attribute_location = glContext.getAttribLocation(g_pie_chart_shader_program, 'chart_vertex_positions');
        glContext.enableVertexAttribArray(chart_position_attribute_location);
        glContext.vertexAttribPointer(chart_position_attribute_location, 2, glContext.FLOAT, false, 0, 0);
        
        const centerUniformLocation = glContext.getUniformLocation(g_pie_chart_shader_program, 'webglChartPieCenter');
        const radiusUniformLocation = glContext.getUniformLocation(g_pie_chart_shader_program, 'webglChartPieRadius');
        const startAngleUniformLocation = glContext.getUniformLocation(g_pie_chart_shader_program, 'webglChartPieStartAngle');
        const endAngleUniformLocation = glContext.getUniformLocation(g_pie_chart_shader_program, 'webglChartPieEndAngle');
        const colorUniformLocation = glContext.getUniformLocation(g_pie_chart_shader_program, 'webglChartPieSliceColor');
        const webglCanvas_offset_Location = glContext.getUniformLocation(g_pie_chart_shader_program, 'webGLcanvas_offset');
        const webglChartDimensionsLocation = glContext.getUniformLocation(g_pie_chart_shader_program, 'webglChartDimensions');
        const shading_fraction_location = glContext.getUniformLocation(g_pie_chart_shader_program, 'shading_fraction');
        
        // const totalValue = chart_data.reduce((sum, item) => sum + item.value, 0);
        let total_value = 0;

        for (let i = 0; i < chart_data.length && i < MAX_CHART_ELEMENT_COUNT; i++)
        {
            let data = chart_data[i];
            total_value += data.value;
        }
        
        if (clear)
        {
            let current_clear_color = glContext.getParameter(glContext.COLOR_CLEAR_VALUE);
            glContext.clearColor(1.0, 1.0, 1.0, 1.0);
            glContext.scissor(viewport.x, viewport.y, viewport.width, viewport.height);
            glContext.enable(glContext.SCISSOR_TEST);
            glContext.clear(glContext.COLOR_BUFFER_BIT);
            glContext.disable(glContext.SCISSOR_TEST);
            glContext.clearColor(current_clear_color[0], current_clear_color[1], current_clear_color[2], current_clear_color[3]);
        }
        
        
        glContext.enable(glContext.BLEND);
        glContext.blendFunc(glContext.SRC_ALPHA, glContext.ONE_MINUS_SRC_ALPHA);

        glContext.uniform2f(webglChartDimensionsLocation, viewport.width, viewport.height);
        // console.log("renderPieChartWithWebGL viewport", viewport);
        glContext.uniform2f(webglCanvas_offset_Location, viewport.x, viewport.y);

        
        let currentAnglePosition = 0;
        for (index = 0; index < chart_data.length && index < MAX_CHART_ELEMENT_COUNT; index++)
        {
            let data_point = chart_data[index];
            const segmentProportion = data_point.value / total_value;
            const segmentAngleSize = segmentProportion * Math.PI * 2;
            
            glContext.uniform2f(centerUniformLocation, 0.0, -0.2);
            glContext.uniform1f(radiusUniformLocation, 0.7);
            glContext.uniform1f(startAngleUniformLocation, currentAnglePosition);
            glContext.uniform1f(endAngleUniformLocation, currentAnglePosition + segmentAngleSize);
            glContext.uniform3fv(colorUniformLocation, new Float32Array(convertHexStringToRGBArray(data_point.color)));

            if (index == g_chart_highlighted_index)
            {
                glContext.uniform1f(shading_fraction_location, CHART_HIGHLIGHTED_SHADING_FRACTION);
            }
            else
            {
                glContext.uniform1f(shading_fraction_location, 1.0);
            }
            
            glContext.drawArrays(glContext.TRIANGLE_STRIP, 0, 4);
            
            currentAnglePosition += segmentAngleSize;
        }

        glContext.useProgram(current_program);


        // updateChartLegendDisplay(chart_data, canvas_element);
    }

    function clearChart(glContext, viewport)
    {
        console.log("clearChart");
        let current_clear_color = glContext.getParameter(glContext.COLOR_CLEAR_VALUE);
        glContext.clearColor(g_chart_clear_color.x, g_chart_clear_color.y, g_chart_clear_color.z, g_chart_clear_color.w);
        glContext.scissor(viewport.x, viewport.y, viewport.width, viewport.height);
        glContext.enable(glContext.SCISSOR_TEST);
        glContext.clear(glContext.COLOR_BUFFER_BIT);
        glContext.disable(glContext.SCISSOR_TEST);
        // Restore original clear color
        glContext.clearColor(current_clear_color[0], current_clear_color[1], current_clear_color[2], current_clear_color[3]);
    }

    function renderColumnChartWithWebGL(glContext, viewport, chart_data) 
    {
        if (!glContext) return;        
        
        glContext.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

        initializePieColumnChartShaders(glContext);
        if (!g_bar_chart_shader_program) return;
        
        const current_program = glContext.getParameter(glContext.CURRENT_PROGRAM);
        glContext.useProgram(g_bar_chart_shader_program);
                
        if (g_bar_chart_vertex_buffer === null)
        {
            g_bar_chart_vertex_buffer = glContext.createBuffer();
        }

        glContext.bindBuffer(glContext.ARRAY_BUFFER, g_bar_chart_vertex_buffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, full_viewport_vertex_positions, glContext.STATIC_DRAW);
        
        const positionAttributeLocation = glContext.getAttribLocation(g_bar_chart_shader_program, 'chart_vertex_positions');
        glContext.enableVertexAttribArray(positionAttributeLocation);
        glContext.vertexAttribPointer(positionAttributeLocation, 2, glContext.FLOAT, false, 0, 0);
        
        const webglCanvas_offset_Location = glContext.getUniformLocation(g_bar_chart_shader_program, 'webGLcanvas_offset');
        const webglChartDimensionsLocation = glContext.getUniformLocation(g_bar_chart_shader_program, 'webglChartDimensions');
        const columnPositionUniformLocation = glContext.getUniformLocation(g_bar_chart_shader_program, 'webglChartColumnPosition');
        const columnDimensionsUniformLocation = glContext.getUniformLocation(g_bar_chart_shader_program, 'webglChartColumnDimensions');
        const colorUniformLocation = glContext.getUniformLocation(g_bar_chart_shader_program, 'webglChartColumnColor');
        const shading_fraction_location = glContext.getUniformLocation(g_bar_chart_shader_program, 'shading_fraction');
        

        clearChart(glContext, viewport);
        // // Save current clear color
        // // let current_clear_color = new Float32Array(4);
        // let current_clear_color = glContext.getParameter(glContext.COLOR_CLEAR_VALUE);
        // glContext.clearColor(g_chart_clear_color.x, g_chart_clear_color.y, g_chart_clear_color.z, g_chart_clear_color.w);
        // glContext.scissor(viewport.x, viewport.y, viewport.width, viewport.height);
        // glContext.enable(glContext.SCISSOR_TEST);
        // glContext.clear(glContext.COLOR_BUFFER_BIT);
        // glContext.disable(glContext.SCISSOR_TEST);
        
        // // Restore original clear color
        // glContext.clearColor(current_clear_color[0], current_clear_color[1], current_clear_color[2], current_clear_color[3]);

        glContext.enable(glContext.BLEND);
        glContext.blendFunc(glContext.SRC_ALPHA, glContext.ONE_MINUS_SRC_ALPHA);
        
        let used_chart_data = []
        {
            for (i = 0; i < chart_data.length && i < MAX_CHART_ELEMENT_COUNT; i++)
            {
                used_chart_data.push(chart_data[i]);
            }
        }

        g_max_data_value = Math.max(...used_chart_data.map(item => item.value));
        g_min_data_value = Math.min(...used_chart_data.map(item => item.value));
    
        let horizontal_shrink = 0.97;
        const columnWidth = 1.0 / used_chart_data.length * horizontal_shrink;
        const columnGap = columnWidth * 0.2;
        let drawn_column_width = columnWidth - columnGap;

        glContext.uniform2f(webglChartDimensionsLocation, viewport.width, viewport.height);
        glContext.uniform2f(webglCanvas_offset_Location, viewport.x, viewport.y);
        let column_left_x = 0;

        let all_above = g_min_data_value >= 0;
        let all_below = g_max_data_value <= 0;
        let y_range = g_max_data_value - g_min_data_value;
        let zero_point = Math.abs(g_min_data_value) / y_range * MAX_COLUMN_CHART_Y;

        column_chart_max_scale_label.innerHTML = "_ " + (g_max_data_value <= 0 ? "0" : insertCommasIntoNumber(g_max_data_value));
        column_chart_min_scale_label.innerHTML = "_ " + (g_min_data_value >= 0 ? "0" : insertCommasIntoNumber(g_min_data_value));

        for (index = 0; index < used_chart_data.length && index < MAX_CHART_ELEMENT_COUNT; index++)
        {
            let data_point = used_chart_data[index];
        // chart_data.forEach((data_point, index) => {
            let column_top_y = (data_point.value - g_min_data_value) / y_range * MAX_COLUMN_CHART_Y;
            // column_top_y = 0.5;
            // const columnXPosition = -1 + (index * columnWidth) - columnGap/2;
            let column_bottom_y = 0.0;

            if (all_above)
            {
                // Bottom is zero
                column_top_y = data_point.value / g_max_data_value * MAX_COLUMN_CHART_Y;
            }
            else if (all_below)
            {
                // Top is zero
                column_top_y = MAX_COLUMN_CHART_Y;
                column_bottom_y = (data_point.value - g_min_data_value) / Math.abs(g_min_data_value) * MAX_COLUMN_CHART_Y;
            }
            else
            {
                if (data_point.value > 0)
                {
                    column_bottom_y = zero_point;
                }
                else
                {
                    column_top_y = zero_point;
                    column_bottom_y = (data_point.value - g_min_data_value) / y_range * MAX_COLUMN_CHART_Y;
                }
            }

            let column_height = column_top_y - column_bottom_y;
            
            glContext.uniform2f(columnPositionUniformLocation, column_left_x, column_bottom_y);
            glContext.uniform2f(columnDimensionsUniformLocation, drawn_column_width, column_height);
            glContext.uniform3fv(colorUniformLocation, new Float32Array(convertHexStringToRGBArray(data_point.color)));
            // console.log("renderColumnChartWithWebGL columnXPosition", column_left_x, drawn_column_width, viewport);

            if (index == g_chart_highlighted_index)
            {
                glContext.uniform1f(shading_fraction_location, CHART_HIGHLIGHTED_SHADING_FRACTION);
            }
            else
            {
                glContext.uniform1f(shading_fraction_location, 1.0);
            }
            
            glContext.drawArrays(glContext.TRIANGLE_STRIP, 0, 4);
            column_left_x += columnWidth;
        };

        updateChartLegendDisplay(used_chart_data, viewport, horizontal_shrink);
        // console.log("renderColumnChartWithWebGL g_chart_color_data_map\n", g_chart_color_data_map);
        const border_color = {red: 1.0, green: 0.0, blue: 0.0, alpha: 1.0};
        let line_width = 1;
        drawViewportBorder(glContext, g_chart_border_viewport, line_width, border_color)
        glContext.useProgram(current_program);
        let gl_error = glContext.getError();

        if (gl_error != glContext.NO_ERROR)
        {
            console.error("renderColumnChartWithWebGL gl_error", gl_error);
        }
    }

    function updateChartLegendDisplay(chart_data, viewport, horizontal_shrink) 
    {
        const legend_container = document.getElementById('webgl_chart_legend_container');
        
        const font_family = "monospace, bold, 'Courier New', Courier";

        legend_container.style.fontFamily = font_family;
        legend_container.style.position = "absolute";
        legend_container.style.display = 'block';
        legend_container.style.top = (g_chart_viewport.height + g_chart_viewport.y - 40).toString() + "px";        
        legend_container.innerHTML = '';
        legend_container.style.width = viewport.width.toString() + 'px';
        legend_container.style.height = (viewport.y).toString() + 'px';
    
        const totalValue = chart_data.reduce((sum, item) => sum + item.value, 0);
        const itemCount = chart_data.length;
        
        // Dynamic font sizing with linear transition based on number of items
        const minFontSize = 8;
        const maxFontSize = 15;
        const minItems = 5;
        const maxItems = 50;
        
        // Calculate font size using linear interpolation
        let fontSize;
        if (itemCount <= minItems) {
            fontSize = maxFontSize;
        } else if (itemCount >= maxItems) {
            fontSize = minFontSize;
        } else {
            fontSize = maxFontSize - (itemCount - minItems) * (maxFontSize - minFontSize) / (maxItems - minItems);
            fontSize = Math.round(fontSize * 10) / 10;
        }
        
        legend_container.style.fontSize = fontSize.toString() + "px";
        const containerWidth = legend_container.offsetWidth || 1000; // Fallback if not rendered yet
        
        // Calculate spacing based solely on number of items
        const spacing = containerWidth / itemCount;
        legend_container.style.left = (g_chart_viewport.x).toString() + "px";
        
        // Add extra bottom margin to the container to account for rotated text
        legend_container.style.marginBottom = '0px';
        legend_container.style.marginTop = '0px';
        
        // Find the maximum label length for padding
        const maximum_label_length = Math.max(...chart_data.map(item => item.label.length));


            // Create a temporary element to measure text dimensions - we'll just measure once for all labels
        const measure_element = document.createElement('div');
        measure_element.style.position = 'absolute';
        measure_element.style.visibility = 'hidden';
        measure_element.style.fontFamily = font_family;
        measure_element.style.fontSize = fontSize.toString() + "px";
        measure_element.style.whiteSpace = 'nowrap';
        document.body.appendChild(measure_element);
        
        // Generate a sample padded label with max length to measure
        const sampleText = '.'.repeat(maximum_label_length).slice(-17);
        measure_element.textContent = sampleText;
        const text_width = measure_element.offsetWidth;
        const text_height = measure_element.offsetHeight;
        
        // We're done with the measure element
        document.body.removeChild(measure_element);
        let rotation = -70;
 
        let rotated_text_height = text_width * Math.sin(rotation);
        let rotated_text_width = text_height * Math.cos(rotation);
        
        for (let index = 0; index < chart_data.length && index < MAX_CHART_ELEMENT_COUNT; index++)
        {
            let data_point = chart_data[index];
        // chart_data.forEach((data_point, index) => {
            const percentage = ((data_point.value / totalValue) * 100).toFixed(1);
            const legend_item_div = document.createElement('div');
            legend_item_div.className = 'webgl-chart-legend-item';
            
            // Position absolutely with even spacing
            legend_item_div.style.position = 'absolute';
            // legend_item_div.style.bottom = '5px';
            
            // Position based on index and total count - center each item in its allocated space
            const positionX = ((spacing * index) - text_width + (text_height)) * horizontal_shrink;
            // legend_item_element.style.left = (positionX + (spacing / 2) - (fontSize / 2)).toString() + 'px';
            legend_item_div.style.left = (positionX).toString() + 'px';
            
            // Width based on container width divided by number of items
            legend_item_div.style.width = '0px'; // Allow natural width for text
            legend_item_div.style.height = "0px";
            // legend_item_div.style.top = "-" + (rotated_text_height + 10).toString() + "px";
            legend_item_div.style.top = "0px";
            
            // Text styling
            legend_item_div.style.padding = '0px';
            legend_item_div.style.margin = '0';
            legend_item_div.style.whiteSpace = 'nowrap';
            legend_item_div.style.color = data_point.color;
            
            // Apply monospace font to each legend item
            legend_item_div.style.fontFamily = font_family;
            
            // Right-justify the text
            legend_item_div.style.textAlign = 'right';
            
            // Create a wrapper div for the text that will be rotated
            const textWrapper = document.createElement('div');
            textWrapper.style.display = 'inline-block';
            // textWrapper.style.transform = 'rotate(-70deg)';
            textWrapper.style.transform = `rotate(${rotation}deg)`;
            textWrapper.style.transformOrigin = '100% 100%';
            textWrapper.style.width = 'auto';
            // Add padding to ensure text is fully visible after rotation
            textWrapper.style.paddingRight = '10px';
            // Add some bottom padding to prevent cutoff
            textWrapper.style.paddingBottom = '10px';
            // textWrapper.style.right = positionX + 'px';
            textWrapper.style.top = '0px';
            
            // With monospace font, we can just use spaces for padding
            // Using non-breaking spaces (\u00A0) to prevent HTML from collapsing them
            const paddingLength = maximum_label_length - data_point.label.length;
            const padding = non_printing_character.repeat(paddingLength);
            const paddedLabel = (data_point.label + padding).slice(0, 17);
            
            textWrapper.appendChild(document.createTextNode(paddedLabel));
            
            legend_item_div.appendChild(textWrapper);
            
            legend_container.appendChild(legend_item_div);

            let data_object = g_chart_color_data_map.get(data_point.color);
            data_object.legend_item = legend_item_div;

            // console.log("updateChartLegendDisplay data_object", data_object);
        // });
        }

        drawChartLabels();
        // console.log("updateChartLegendDisplay g_chart_data", g_chart_data); 
    }

    function handlePieChartHoverInteraction(event) {
        const canvas_element = document.getElementById('webglChartCanvas');
        const tooltipElement = document.getElementById('webglChartTooltip');
        const canvasBounds = canvas_element.getBoundingClientRect();
        const pointerX = event.clientX - canvasBounds.left;
        const pointerY = event.clientY - canvasBounds.top;
        
        const normalizedX = (pointerX / canvas_element.width) * 2 - 1;
        const normalizedY = ((canvas_element.height - pointerY) / canvas_element.height) * 2 - 1;
        
        const angleFromCenter = Math.atan2(normalizedY, normalizedX);
        const distanceFromCenter = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
        
        let adjustedAngle = angleFromCenter;
        if (adjustedAngle < 0) {
            adjustedAngle += 2 * Math.PI;
        }
        
        if (distanceFromCenter <= 0.8) {
            const totalValue = webglchart_dataSeries.reduce((sum, item) => sum + item.value, 0);
            let currentAnglePosition = 0;
            
            for (const data_point of webglchart_dataSeries) {
                const segmentProportion = data_point.value / totalValue;
                const segmentAngleSize = segmentProportion * Math.PI * 2;
                if (adjustedAngle >= currentAnglePosition && 
                    adjustedAngle <= currentAnglePosition + segmentAngleSize) {
                    tooltipElement.style.display = 'block';
                    tooltipElement.style.left = event.clientX + 10 + 'px';
                    tooltipElement.style.top = event.clientY + 10 + 'px';
                    const percentage = ((data_point.value / totalValue) * 100).toFixed(1);
                    tooltipElement.textContent = `${data_point.label}: ${data_point.value} (${percentage}%)`;
                    return;
                }
                currentAnglePosition += segmentAngleSize;
            }
        }
        
        tooltipElement.style.display = 'none';
    }

    function handleColumnChartHoverInteraction(event) {
        const canvas_element = document.getElementById('webglChartCanvas');
        const tooltipElement = document.getElementById('webglChartTooltip');
        const canvasBounds = canvas_element.getBoundingClientRect();
        const pointerX = event.clientX - canvasBounds.left;
        const pointerY = event.clientY - canvasBounds.top;
        
        const normalizedX = (pointerX / canvas_element.width) * 2 - 1;
        const normalizedY = ((canvas_element.height - pointerY) / canvas_element.height) * 2 - 1;
        
        const columnWidth = 1.6 / webglchart_dataSeries.length;
        const columnGap = columnWidth * 0.2;
        const maxDataValue = Math.max(...webglchart_dataSeries.map(item => item.value));
        
        for (let i = 0; i < webglchart_dataSeries.length; i++) {
            const columnXPosition = -0.8 + (i * columnWidth) + columnGap/2;
            const normalizedColumnHeight = (webglchart_dataSeries[i].value / maxDataValue) * 1.6;
            
            if (normalizedX >= columnXPosition && 
                normalizedX <= columnXPosition + columnWidth - columnGap && 
                normalizedY >= -0.8 && 
                normalizedY <= -0.8 + normalizedColumnHeight) {
                tooltipElement.style.display = 'block';
                tooltipElement.style.left = event.clientX + 10 + 'px';
                tooltipElement.style.top = event.clientY + 10 + 'px';
                tooltipElement.textContent = `${webglchart_dataSeries[i].label}: ${webglchart_dataSeries[i].value}`;
                return;
            }
        }
        
        tooltipElement.style.display = 'none';
    }

    function drawViewportBorder(gl, viewport, line_width, color) 
    {
        // Set the viewport
        gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
    
        // Vertex shader - simple passthrough
        const vsSource = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        // Fragment shader with uniform color
        const fsSource = `
        precision mediump float;
        uniform vec3 u_color;
        uniform vec4 u_viewport;
        uniform float u_line_width;
        void main() {
            
            vec2 pixel_coord = gl_FragCoord.xy - vec2(u_viewport.x, u_viewport.y);

            if (pixel_coord.x < u_line_width)
            {
                gl_FragColor = vec4(u_color, 1.0);
            } 
            else if (pixel_coord.x > u_viewport.z - u_line_width)
            {
                gl_FragColor = vec4(u_color, 1.0);
            } 
            else if (pixel_coord.y < u_line_width)
            {
                gl_FragColor = vec4(u_color, 1.0);
            } 
            else if (pixel_coord.y > u_viewport.w - u_line_width)
            {
                gl_FragColor = vec4(u_color, 1.0);
            } 
            else 
            {
                discard;
            }

        }
    `;    
        // Create and compile shaders
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vsSource);
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error("Vertex shader compilation failed:", gl.getShaderInfoLog(vertexShader));
            return;
        }
    
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fsSource);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error("Fragment shader compilation failed:", gl.getShaderInfoLog(fragmentShader));
            return;
        }
    
        // Create program
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
    
        // Define the border vertices in normalized device coordinates (-1 to 1)
        const vertices = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
           ]);

        // Set color uniform (values between 0.0 and 1.0)
        const colorLoc = gl.getUniformLocation(program, 'u_color');
        gl.uniform3f(colorLoc, color.red, color.green, color.blue);
    
        const viewportLoc = gl.getUniformLocation(program, 'u_viewport');
        gl.uniform4f(viewportLoc, viewport.x, viewport.y, viewport.width, viewport.height);
    
        const lineWidthLoc = gl.getUniformLocation(program, 'u_line_width');
        gl.uniform1f(lineWidthLoc, line_width);
    
        // Create buffer
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        // Set up attribute
        const positionLoc = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    
        // Draw the border
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);
    }
    
    // Usage example:
    // const canvas = document.getElementById('glCanvas');
    // const gl = canvas.getContext('webgl');
    // // Draw border for viewport at (100, 100) with size 200x200
    // drawViewportBorder(gl, 100, 100, 200, 200);

function setupCharts(viewport)
{
    let half_chart_width = (g_chart_border_viewport.width - g_chart_border_viewport.x) / 2;

    g_chart_border_viewport = {x: viewport.x - 70, y: 0, width: viewport.width + 70, height:  viewport.height + viewport.y + 10};
    g_column_chart_viewport.x = viewport.x;
    g_column_chart_viewport.y = viewport.y;
    g_column_chart_viewport.width = half_chart_width;
    g_column_chart_viewport.height = viewport.height;
    g_pie_chart_viewport.x = viewport.x + half_chart_width;
    g_pie_chart_viewport.y = viewport.y;
    g_pie_chart_viewport.width = half_chart_width - 1;
    g_pie_chart_viewport.height = viewport.height;

    column_chart_highlighted_label = document.getElementById('column_chart_highlighted_label');
    column_chart_highlighted_label.style.position = "absolute";
    column_chart_highlighted_label.style.left = g_column_chart_viewport.x.toString() + "px";
    column_chart_highlighted_label.style.bottom = (g_chart_border_viewport.y + g_chart_border_viewport.height - 50).toString() + "px";
    column_chart_highlighted_label.style.width = (g_column_chart_viewport.width).toString() + "px";;
    column_chart_highlighted_label.style.textAlign = "center";
    column_chart_highlighted_label.style.zIndex = "500";
    column_chart_highlighted_label.style.color = "black";
    column_chart_highlighted_label.style.height = "30px";
    column_chart_highlighted_label.style.fontFamily = "bold, 'Copernicus";
    column_chart_highlighted_label.style.fontSize = "24px";

    column_chart_max_scale_label = getGraphingColumnMaxScaleLabel();
    column_chart_max_scale_label.style.position = "absolute";
    column_chart_max_scale_label.style.left = (g_chart_border_viewport.x + 0).toString() + "px";
    // column_chart_max_scale_label.style.bottom = (g_column_chart_viewport.y + (g_column_chart_viewport.height * MAX_COLUMN_CHART_Y / 2)).toString() + "px";
    column_chart_max_scale_label.style.bottom = (g_column_chart_viewport.y + (g_column_chart_viewport.height * MAX_COLUMN_CHART_Y)).toString() + "px";
    column_chart_max_scale_label.style.width = (g_column_chart_viewport.width).toString() + "px";;
    column_chart_max_scale_label.style.textAlign = "left";
    column_chart_max_scale_label.style.zIndex = "500";
    column_chart_max_scale_label.style.color = "black";
    column_chart_max_scale_label.style.height = "15px";
    column_chart_max_scale_label.style.fontFamily = "bold, 'Copernicus";
    column_chart_max_scale_label.style.fontSize = "13px";
    column_chart_max_scale_label.innerHTML = "Scale";

    column_chart_min_scale_label = getGraphingColumnMinScaleLabel();
    column_chart_min_scale_label.style.position = "absolute";
    column_chart_min_scale_label.style.left = (g_chart_border_viewport.x + 0).toString() + "px";
    // column_chart_min_scale_label.style.bottom = (g_column_chart_viewport.y + (g_column_chart_viewport.height * MAX_COLUMN_CHART_Y / 2)).toString() + "px";
    column_chart_min_scale_label.style.bottom = (g_column_chart_viewport.y).toString() + "px";
    column_chart_min_scale_label.style.width = (g_column_chart_viewport.width).toString() + "px";;
    column_chart_min_scale_label.style.textAlign = "left";
    column_chart_min_scale_label.style.zIndex = "500";
    column_chart_min_scale_label.style.color = "black";
    column_chart_min_scale_label.style.height = "15px";
    column_chart_min_scale_label.style.fontFamily = "bold, 'Copernicus";
    column_chart_min_scale_label.style.fontSize = "13px";
    column_chart_min_scale_label.innerHTML = "Scale";

    pie_chart_highlighted_label = document.getElementById('pie_chart_highlighted_label');
    pie_chart_highlighted_label.style.position = "absolute";
    pie_chart_highlighted_label.style.left = g_pie_chart_viewport.x.toString() + "px";
    pie_chart_highlighted_label.style.bottom = (g_chart_border_viewport.y + g_chart_border_viewport.height - 50).toString() + "px";
    pie_chart_highlighted_label.style.width = (g_pie_chart_viewport.width).toString() + "px";;
    pie_chart_highlighted_label.style.textAlign = "center";
    pie_chart_highlighted_label.style.zIndex = "500";
    pie_chart_highlighted_label.style.color = "black";
    pie_chart_highlighted_label.style.height = "30px";
    pie_chart_highlighted_label.style.fontFamily = "bold, 'Copernicus";
    pie_chart_highlighted_label.style.fontSize = "24px";
    
}

function clearChartLabels()
{
    column_chart_highlighted_label.innerHTML = "";
    column_chart_max_scale_label.innerHTML = "";
    pie_chart_highlighted_label.innerHTML = "";
}

function updateChartLabels(chart_data, color, text_length)
{
    column_chart_highlighted_label.innerHTML = chart_data.label + non_printing_character.repeat(2) + insertCommasIntoNumber(chart_data.value);
    column_chart_highlighted_label.style.color = color;

    pie_chart_highlighted_label.innerHTML = chart_data.label + non_printing_character.repeat(2) + chart_data.percent.toFixed(1) + "%";
    pie_chart_highlighted_label.style.color = color;
}

function insertCommasIntoNumber(num) 
{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeChartData(chart_data_to_remove)
{
    for (let i = 0; i < g_chart_data.length; i++)
    {
        let chart_data = g_chart_data[i];

        if (chart_data == chart_data_to_remove)
        {
            g_chart_data.splice(i, 1);
            g_chart_color_data_map.delete(chart_data.color);
        }
    }
}

function drawChartLabels()
{
    let scroll_container = document.getElementById("scroll_container");

    g_label_data_object_map.clear();

    // Remove existing labels
    for (let label of g_series_labels) 
    {
        label.remove();
    }
    
    scroll_container.innerHTML = '';

    for (let i = 0; i < g_chart_data.length && i < MAX_CHART_ELEMENT_COUNT; i++)
    {
        let data_object = g_chart_data[i];
        let name = data_object.label;
        let color = data_object.color;

        if (i == g_chart_highlighted_index)
        {
            color = "red";
        }

        let [label_container, chart_label, delete_button] = createLabel(scroll_container, name, color)
        data_object.chart_label = chart_label;
        g_label_data_object_map.set(chart_label, data_object);

        if (g_chart_data.length <= 2)
        {
            delete_button.style.display = 'none';
        }

        // Add event listener for deletion
        delete_button.addEventListener("click", function() 
        {
            // dont_draw = true;
            let data_object = g_label_data_object_map.get(chart_label);

            console.log("drawChartLabels delete_button clicked", data_object);

            removeChartData(data_object);

            console.log("drawChartLabels delete_button clicked", g_chart_data, g_chart_color_data_map);


            calculateChartPercents(g_chart_data);

            drawCharts();
            // var g_chart_data;
            // var g_chart_color_data_map = new Map();


            // if (series == g_series_to_highlight)
            // {
            //     g_series_to_highlight = null;
            // }

            // dont_draw = false;
            // document.dispatchEvent(draw_scene_event);
        });


        chart_label.addEventListener("mouseenter", (function(label) {
            let hoverTimer = null;
            
            return function() {
                if (!mouse_moved) {
                    return;
                }
                
                mouse_moved = false;
                
                // Start the hover timer
                hoverTimer = setTimeout(() => {
                    console.log("series_label mouseenter");

                    for (let j = 0; j < g_chart_data.length && j < MAX_CHART_ELEMENT_COUNT; j++)
                    {
                        let data_object = g_chart_data[j];

                        if (this == data_object.chart_label)
                        {
                            console.log("drawChartLabels mouseenter", j, data_object);
                            g_chart_highlighted_index = j;

                            if (!g_dont_draw)
                            {
                                drawCharts()
                                updateChartLabels(data_object, "red", CHART_LABEL_TEXT_LENGTH);
                            }
                        }
                    }
                    
                }, 100); // 300ms delay
                
                // Add mouseleave handler to cancel the timer if mouse leaves before timeout
                label.addEventListener("mouseleave", function clearHover() {

                    console.log("series_label mouseleave");
                    g_chart_highlighted_index = -1;
                    
                    if (hoverTimer) {
                        clearTimeout(hoverTimer);
                        hoverTimer = null;
                    }
                    // Remove this mouseleave handler
                    label.removeEventListener("mouseleave", clearHover);
                    g_dont_draw = false;
                    g_label_container_has_focus = false;
                    updateChartLabel(label);
                });

                label.addEventListener("focus", function() 
                {
                    // console.log("drawSeriesLabels focus");
                    g_label_container_has_focus = true;
                    g_dont_draw = true;
                    this.select();
                });
                
                label.addEventListener("keydown", function(event) 
                {
                    if (event.key === 'Enter') 
                    {
                        updateChartLabel(label);
                    }
                });
        
        
            };
        })(chart_label));

    }
    
}

function calculateChartPercents(chart_data)
{
    let total = 0;

    for (let i = 0; i < chart_data.length && i < MAX_CHART_ELEMENT_COUNT; i++)
    {
        let item = chart_data[i];
        total += item.value;
    }
    
    for (let i = 0; i < chart_data.length; i++)
    {
        let item = chart_data[i];
        item.percent = item.value / total * 100;
    }
}

function getChartMinMax()
{
    let minimum = Number.MAX_SAFE_INTEGER;
    let maximum = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < chart_data.length; i++)
    {
        let item = chart_data[i];
        
        if (item.value < minimum)
        {
            minimum = item.value;
        }

        if (item.value > maximum)
        {
            maximum = item.value;
        }
    }

    return [minimum, maximum];

}

function calculateTickScale(minValue, maxValue, maxTicks) 
{
    // Ensure valid inputs
    if (minValue >= maxValue || maxTicks < 2) {
        return {
            tickCount: 0,
            minScale: minValue,
            maxScale: maxValue,
            tickInterval: 0
        };
    }

    // Calculate the raw range
    const range = maxValue - minValue;
    
    // Calculate the rough tick interval
    const roughInterval = range / (maxTicks - 1);
    
    // Find a nice number for the interval (powers of 10, 5, or 2)
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughInterval)));
    const normalized = roughInterval / magnitude;
    
    let niceInterval;
    if (normalized < 1.5) {
        niceInterval = magnitude;
    } else if (normalized < 3) {
        niceInterval = 2 * magnitude;
    } else if (normalized < 7) {
        niceInterval = 5 * magnitude;
    } else {
        niceInterval = 10 * magnitude;
    }
    
    // Calculate the nice minimum and maximum scale values
    const minScale = Math.floor(minValue / niceInterval) * niceInterval;
    const maxScale = Math.ceil(maxValue / niceInterval) * niceInterval;
    const tickCount = Math.round((maxScale - minScale) / niceInterval) + 1;
    
    return {
        tickCount: tickCount,
        minScale: minScale,
        maxScale: maxScale,
        tickInterval: niceInterval
    };
}

// Updated generateTicks function
function generateTicks(minValue, maxValue, maxTicks) {
    const scale = calculateTickScale(minValue, maxValue, maxTicks);
    const ticks = [];
    
    for (let i = 0; i < scale.tickCount; i++) {
        ticks.push(scale.minScale + (i * scale.tickInterval));
    }
    
    return ticks;
}

// // Example usage:
// console.log(calculateTickScale(0, 100, 5));     // { tickCount: 5, minScale: 0, maxScale: 100, tickInterval: 25 }
// console.log(calculateTickScale(3, 73, 6));      // { tickCount: 5, minScale: 0, maxScale: 80, tickInterval: 20 }
// console.log(calculateTickScale(-50, 150, 5));   // { tickCount: 5, minScale: -50, maxScale: 150, tickInterval: 50 }
// console.log(calculateTickScale(17, 83, 5));     // { tickCount: 5, minScale: 0, maxScale: 100, tickInterval: 25 }

// // Generate tick values
// console.log(generateTicks(3, 73, 6));           // [0, 20, 40, 60, 80]
// console.log(generateTicks(17, 83, 5));          // [0, 25, 50, 75, 100]