let g_current_user = null;

let D2T_TEST_MODE = false;
let GRAPHING_MODE_TIME_SERIES = "Graphing Mode Time Series";
let GRAPHING_MODE_CHARTS = "Graphing Mode Charts";
let GRAPHING_MODE = GRAPHING_MODE_TIME_SERIES;
const COLUMN_CHART_TYPE = "column chart";
const TIME_SERIES_CHART_TYPE = "time series";
const COMPLEX_CHART_TYPE = "complex chart type";
const UNKNOWN_CHART_TYPE = "unknown chart type";
let CHART_TYPE = TIME_SERIES_CHART_TYPE;
let MAX_GOOGLE_MARKERS = 1000;
var graphing_vertex_shader_source = "";
var graphing_fragment_shader_source = "";
var glcanvas;
var canvas2D;
var canvas2D_ctx;
var canvas2D_2;
var canvas2D_2_ctx;
var canvas2D_3;
var canvas2D_3_ctx;
var canvas2D_4;
var canvas2D_4_ctx;
var canvas_2D_4_image_object;
const CANVAS_2D_BACKGROUND_COLOR = "white";
var body;
var gl;
var ui_container;
var projection_matrix = new Matrix4x4();
var modelview_matrix = new Matrix4x4();
var graphing_program_information = null;
var vertex_buffers;
var vertex_shader;
var fragment_shader;
var graphing_shader_program;
var glcanvas_width = screen.width * 0.5; 
var glcanvas_height = screen.height * 0.55;
var g_original_canvas_width = 1330;
var g_original_canvas_height = 850;
// var glcanvas_width = g_original_canvas_width; 
// var glcanvas_height = g_original_canvas_height;
var aspect_ratio = glcanvas_width / glcanvas_height;
var g_main_viewport_borders = {left: 150, bottom: 150, right: 200, top: 110};
var g_main_viewport = {x: 0, y: 0, width: glcanvas_width, height: glcanvas_height};
var g_chart_viewport = {x: 150, y: 150, width: glcanvas_width, height: glcanvas_height}
var g_pie_chart_viewport = {};
var g_column_chart_viewport = {};
var g_chart_border_viewport = {x: g_chart_viewport.x - 30, y: 0, width: g_chart_viewport.width + 30, height:  g_chart_viewport.height + g_chart_viewport.y};
var g_x_scale_factor = g_main_viewport.width / g_original_canvas_width;
var g_y_scale_factor = g_main_viewport.height / g_original_canvas_height;
var g_full_viewport = {x: 0, y: 0, width: glcanvas_width, height: glcanvas_height};
var graph_viewport_frame = { left : 0, bottom : 0};
var g_offset = new Vec2(0, 0);
var g_scale = new Vec3(1, 1);
var g_minimum = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
var g_maximum = new Vec2(0.0, 0.0); 
// var clear_color = new Vec4(0.3, 0.3, 0.3, 1.0);
var g_clear_color = new Vec4(0.98, 0.98, 0.98, 1.0);
var g_graph_clear_color = new Vec4(0.95, 0.95, 0.95, 1.0);
let g_chart_clear_color = new Vec4(1.0, 1.0, 1.0, 1.0);
let CLEAR_COLOR_STRING = glColorToHexString(g_graph_clear_color);
let CHART_CLEAR_COLOR_STRING = glColorToHexString(g_chart_clear_color).toUpperCase().slice(0, -2);
// var clear_color = new Vec4(1.0, 1.0, 1.0, 1.0);
var point_color = new Vec4(1.0, 0.0, 0.0, 1.0);
var x_at_minimum_y = 0;
var x_at_maximum_y = 0;
var vertex_data_list = [];
var scale_before_translate = false;
var g_point_size = 8;
var g_user_point_scaling = 1;
var setup_complete = false;
var position_buffer = null;
var index_buffer = null;
const BODY_MARGIN = 0;  // Crome and firefix offset the canvas by eight pixels
const CONTROL_CONTAINER_HEIGHT = 50;
const INSTRUMENTATION_CONTAINER_HEIGHT = 90;
const GRAPH_MARGIN_PERCENT = 3; 
// const draw_scene_event = new Event("draw_scene_event");
var controls_container;
var instrumentation_container;
var name_label;

var g_is_line_chart = true;

var x_y_label_dimensions = new Vec2(220, 80); 
const grid_label_dimensions = new Vec2(80, 15);
var g_grid_dimensions = new Vec2(10, 10);


var number_of_multiple_data_files_to_load;
var number_of_multiple_data_files_loaded;
var g_all_data_files_loaded = false;
var graph_drawn = false;

var graph_positions = [];
var graph_indices = [];

var h_key_down = false;
var v_key_down = false;
var ctrl_key_down = false;
var shift_key_down = false;
var g_dont_deselect_anything = false;
var scroll_speed = 1;
var g_dont_draw = false;
var auto_update_statistics = false;
var number_of_coordinates_per_point = 2;
var x_axis_represents_a_date = true;
var maximum_point_search_count = 2000000;

var mouse = new Mouse();

const graphing_shader_loaded_event = new Event("graphing_shader_loaded_event");

var text_color = "black";
const grid_color = [0.1, 0.1, 0.1, 0.6];
const trend_color = [0.0, 0.5, 0.5, 1.0];

var g_user_series_list = [];
var previous_point_search_time = 0;
var minimum_time_between_point_searches = 0; //ms

var g_visible_count;
const visible_count_statistics_threshold = 100000;
var g_visible_average;
var g_visible_total;
var g_visible_point_list;
var g_total_point_count;
var g_actual_visible_point_list;
var max_auto_update_statistics_total_point_count = 100000;
var new_user_data = false;

var detailed_statistics_can_execute = true;
var detailed_statistics_next_time = false;
var one_second_timer;
var MAX_NUMBER_OF_SERIES_IN_TITLE = 5;
var last_hovered_series = null;
var g_series_to_highlight = null;


var YEARLY_AVERAGE = "Yearly Average";
var YEARLY_MINIMUM = "Yearly Minimum";
var YEARLY_MAXIMUM = "Yearly Maximum";
var DAILY_AVERAGE = "Daily Average";
var DAILY_TOTAL = "Daily Total";
var statistics_layers_map = new Map();
var current_graph_state = null; 
var button_pressed_since_last_timeout = false;
var key_pressed_since_last_timeout = false;
var key_released_since_last_timeout = false;
var g_option_series_map = new Map();
const HYBRID_SERIES_TYPE = "Hybrid Series Type";
const GENERIC_SERIES_TYPE = "Generic Series Type";
const TEMPERATURE_STATION_SERIES_TYPE = "Temperature Station Series Type";
const SCALED_BAR_CHART_SERIES_TYPE = "Scaled Bar Chart Series Type";
var global_trend_line;
var draw_wide_series = true;
var closest_valid_series = null;
const MAX_SERIES_TREND_LINES = 5;
var show_all_series = false;
var g_red_transparency = 1.0;
var user_file_name = "";
var query_file_name = "";
const continuously_normalize = false;
var generate_fft = false;
var state_changed_since_last_timeout = false;


var ice_loss_color = [255, 0, 75, 255];
var ice_gain_color = [0, 255, 0, 255];

var compare_against_sea_ice_image_filename = "";
const proxy_url = 'https://d2tcode.uc.r.appspot.com/fetch-image';
// const proxy_url = 'http://35.194.44.156:8080/fetch-image';
// const proxy_url = 'http://127.0.0.1:8080/fetch-image';

const FIRST_DATE = 1800;

var PROGRAM_NAME = "GRAPHING";
var g_series_labels = [];

var previous_selected_series_list = undefined;
var current_minimum;
var current_maximum;
var USER_TIER_ROOT = 0;
var USER_TIER_PAID = 1;
var USER_TIER_FREE = 10;
var USER_TIER = USER_TIER_ROOT;

var red_bar_graph_buffer = undefined;
var blue_bar_graph_buffer = undefined;
var associated_rectangle_bar_graph_buffer = undefined;

var label_series_map = new Map();

var image_1 = undefined;
var image_2 = undefined;
var image_1_date;
var image_2_date;
var image_1_date_numeric;
var image_2_date_numeric;

var firestore_db = undefined;

var PAID_USER_BUTTON_BACKGROUND_COLOR = "#5050FF";
var PAID_USER_BUTTON_FOREGROUND_COLOR = "white";

const MAIN_TITLE_STRING = "Main Title String";
const VERTICAL_TITLE_STRING = "Vertical Title String";
const HORIZONTAL_TITLE_STRING = "Horizontal Title String";

var visible_point_count = 0;
const maximum_point_count_for_statistics = 100000;
const g_scroll_container_width = 190;

var mouse_moved = false;
var g_label_container_has_focus = false;

const CHART_LABEL_TEXT_LENGTH = 17;


const SCROLL_LABEL_HEIGHT = 24;
const SCROLL_MAX_LABELS = 200;
const SCROLL_MAX_NAME_LENGTH = 25;
const SCROLL_CONTAINER_PADDING = 5;
const SCROLL_LABEL_MARGIN = 2;

const MAX_BAR_CHART_BAR_COUNT = 50000;
const GRAPH_BAR_CHART_VERTICAL_PERCENT = 50;

var update_statistics_next_time = false;

var stripe_subscription_canceled = false;

var current_pressed_keys = "";

var g_bar_chart_center_y_value = 0;

const document_root = document.documentElement;
let window_zoom_x = 1;
let window_zoom_y = 1;

// Function to set zoom level for both X and Y
function setWindowZoom(zoomX, zoomY) {
    window_zoom_x = zoomX;
    window_zoom_y = zoomY;
    document_root.style.transform = `scale(${zoomX}, ${zoomY})`;
}

// Function to zoom in/out relative to current zoom
function zoomWindowBy(factorX, factorY) {
    setWindowZoom(window_zoom_x * factorX, window_zoom_y * factorY);
}

var state_abbreviations = 
[
    "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI",
    "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",
    "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
    "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

var state_names = 
[
    "Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Idaho", "Illinois", "Indiana",
    "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
    "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
    "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

var country_abbreviations = 
[
    "US", "AR", "AS", "BR", "CA", "CF", "CG", "CH", "CS", "FI", "FR", "GM", "IC", "IN", 
    "IT", "JA", "KE", "KN", "MX", "NI", "SP", "TH", "UK", "UP"
];

var country_names =
[
    "United States", "Argentina", "Australia", "Brazil", "Canada", "Congo (Brazzaville)", 
    "Congo (Kinshasa)", "China", "Costa Rica", "Finland", "France", "Germany", "Iceland", "India", 
    "Italy", "Japan", "Kenya", "Korea", "Mexico", "Nigeria", "Spain", "Thailand", 
    "United Kingdom", "Ukraine"
];

var state_name_to_abbreviation_map = undefined;
var state_abbreviation_to_name_map = undefined;
var country_name_to_abbreviation_map = undefined;
var country_abbreviation_to_name_map = undefined;

function generateMatrices()
{
    const matrices = [[], []];

    for (let y = 0; y < MATRIX_SIZE; y++) 
    {
        matrices[0].push([]);
        matrices[1].push([]);

        for (let x = 0; x < MATRIX_SIZE; x++) 
        {
            // matrices[0][y].push(Math.random());
            // matrices[1][y].push(Math.random());
            matrices[0][y].push(x - y);
            matrices[1][y].push(y - x);
        }
    }

    return matrices;
}

function image2DButton1Pressed()
{
    console.log("image2DButton1Pressed");
}


function numberOfSelectedOptions(select)
{
    let selected_count = 0;

    for (let i = 0; i < select.length; i++)
    {
        let option = select[i];

        if (optionIsSelected(option))
        {
            selected_count++;
        }
    }

    return selected_count;
}

function help()
{
    console.log("help");
    helpLink.click();
    // var help_string = "Designed to work with a large screen, keyboard and mouse\n"
    // help_string += "Scroll wheel : zoom\n";
    // help_string += "Scroll wheel + h : zoom horizontal\n";
    // help_string += "Scroll wheel + v : zoom vertical\n";
    // help_string += "Right click and drag : zoom to selected region\n";
    // help_string += "Left arrow : move screen left\n"; 
    // help_string += "Right arrow : move screen right\n"; 
    // help_string += "Up arrow : move screen up if graph has focus\n"; 
    // help_string += "Down arrow : move screen down if graph has focus\n"; 
    // help_string += "Left click and drag : move graph\n"; 
    // help_string += "y : Advance one year\n"; 
    // help_string += "Y : Go back one year\n"; 
    // help_string += "s : Advance one screen\n"; 
    // help_string += "S : Go back one screen\n"; 
    // help_string += "ctrl-shift-z : reset zoom\n"; 
    // help_string += "ctrl-shift-x : screenshot\n"; 
    // help_string += "ctrl-shift-g : generate csv file of currently visible data\n"; 
    // help_string += "ctrl-shift-y : copy station information to clipboard\n"; 
    // help_string += "ctrl-shift-h : help\n"; 
    // alert(help_string);
}

function keyUp(event)
{
    const key_name = event.key;
    key_released_since_last_timeout= true;

    let key_down_string = "";

    if (shift_key_down && key_name != "Shift")
    {
        key_down_string += "Shift ";
    }
    if (controlKeyDown() && key_name != "Control")
    {
        key_down_string += "Ctrl ";
    }

    current_pressed_keys = key_down_string;

    pressed_keys_label.innerHTML = key_down_string;

    if (key_name == "Control")
    {
        ctrl_key_down = false;
        console.log("ctrl_key_down", ctrl_key_down);
    }
    else if (key_name == "Shift")
    {
        shift_key_down = false;
        console.log("Shift key up");
    }
    else if (!mouseInViewportOrAbove(g_main_viewport) && key_name != "Control" && key_name != "Shift")
    {
        return;
    }


    if (key_name == 'h')
    {
        h_key_down = false;

        if (auto_update_statistics)
        {
            // updateStatistics();
        }
    }
    else if (key_name == "v")
    {
        v_key_down = false;

        if (auto_update_statistics)
        {
            // updateStatistics();
        }
    }
    

    // console.log(h_key_down);
}

function buttonUp(event)
{
    
    var viewport_coordinates = viewportCoordinates(g_main_viewport, g_main_viewport_borders, event.x, event.y);
    var x = viewport_coordinates.x;
    var y = viewport_coordinates.y;
    var unzoomed_position = unzoomedViewportCoordinates(g_main_viewport, x, y, g_scale, g_offset);
    var unzoomed_start_position = unzoomedViewportCoordinates(g_main_viewport, mouse.pressed_x, mouse.pressed_y, g_scale, g_offset);

    if (getGraphingMode() == GRAPHING_MODE_CHARTS)
    {
        if (mouse.pressed_button == BUTTON_0 || mouse.pressed_button == BUTTON_2)
        {
            return;
        }
    }

    if (mouse.pressed_button == BUTTON_2)
    {
        if (!mouseWithinViewport(g_main_viewport))
        {
            event.x = event.x < 0 ? 0 : event.x;
            event.x = event.x >= g_main_viewport.width ? g_main_viewport.width - 1 : event.x;
            event.y = event.y < 0 ? 0 : event.y;
            event.y = event.y >= g_main_viewport.height ? g_main_viewport.height - 1 : event.y;
        }

        var unzoomed_rectangle_dimensions = Vec2.subtract(unzoomed_position, unzoomed_start_position);
        var half_unzoomed_rectangle_dimensions = Vec2.scalarDivide(unzoomed_rectangle_dimensions, 2);
        var unzoomed_rectangle_center = Vec2.sum(half_unzoomed_rectangle_dimensions, unzoomed_start_position);
        setOffsetUsingRectangleCenter(g_main_viewport, unzoomed_rectangle_center, g_offset);
        var unzoomed_rectangle_size = Vec2.abs(unzoomed_rectangle_dimensions);
        var zoom_size = new Vec2();
        g_scale.x = g_main_viewport.width / unzoomed_rectangle_size.x;
        g_scale.y = g_main_viewport.height / unzoomed_rectangle_size.y;
        // clearMinMaxInputs();
        // console.log(unzoomed_start_position, unzoomed_position, unzoomed_rectangle_size, unzoomed_rectangle_center, offset);
        document.dispatchEvent(draw_scene_event);
    }

    // if (!mouseWithinViewport(main_viewport))
    // {
    //     mouse.reset();
    //     return;
    // }

    if (mouseWithinViewport(g_main_viewport) && mouse.pressed_button != BUTTON_1)
    {
        if (getGraphingMode() == GRAPHING_MODE_TIME_SERIES)
        {
            auto_update_statistics = getAutoUpdateStatistics();
            // console.log("buttonUp set auto_update_statistics");
            document.dispatchEvent(draw_scene_event);
        }
    }

    mouse.reset();
    
}

function buttonDown(event)
{
    if (getGraphingMode() == GRAPHING_MODE_CHARTS)
    {
        if (BUTTON_NAMES[event.button] == BUTTON_0 || BUTTON_NAMES[event.button] == BUTTON_2)
        {
            return;
        }
    }

    button_pressed_since_last_timeout = true;

    console.log("buttonDown", event.target.id);

    if (event.target.id === 'visitech_logo') 
    {
        // console.log('Button pressed');
        document.cookie = "visitedApp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.visitech.ai";
        window.location.href = 'https://visitech.ai';
    }

    if (event.ctrlKey)
    {
        // console.log("buttonDown ctrl_key_down = true;");
        // ctrl_key_down = true;
    }
    else
    {
        // console.log("buttonDown ctrl_key_down = false;");
        // ctrl_key_down = false;
    }

    if (event.shiftKey)
    {
        // console.log("buttonDown shift_key_down = true;");
        // shift_key_down = true;
    }
    else
    {
        // console.log("buttonDown shift_key_down = false;");
        // shift_key_down = false;
    }

    if (mouseWithinViewport(g_main_viewport))
    {
        mouse.pressed_button = BUTTON_NAMES[event.button];
        console.log("Mouse button pressed", mouse.pressed_button);
        mouse.x = viewportCoordinates(g_main_viewport, g_main_viewport_borders, event.clientX, event.clientY).x;
        mouse.y = viewportCoordinates(g_main_viewport, g_main_viewport_borders, event.clientX, event.clientY).y;
        mouse.pressed_x = mouse.x;
        mouse.pressed_y = mouse.y;
    }

    if (mouse.pressed_button == BUTTON_1)
    {
        if (mouseWithinViewport(g_main_viewport) && USER_TIER <= USER_TIER_PAID)
        {
            smartToggleMicrophone();
            
            // if (mic_is_recording)
            // {
            //     setTimeout(function() {
            //         AI_query_button.click();
            //     }, 1000); // 1000 ms delay
            // }
            // else
            // {
            //     AI_query_mic_button.click();
            // }
        }
        else
        {
            showDisappearingAlert(4000, "red", "AI queries are only available")
        }
    }
    else if (mouse.pressed_button == BUTTON_0 && mouseWithinViewport(g_main_viewport))
    {
        let [valid, closest_valid_series, values_at_point] = valuesAtPoint(mouse.x, mouse.y);

        if (valid)
        {
            copyTextToClipboard(values_at_point.y.toString());
        }

        if (valid)
        {
            if (closest_valid_series === g_series_to_highlight)
            {
                // g_series_to_highlight = null;
                setHighlightedSeries(null);
            }
            else
            {
                // g_series_to_highlight = closest_valid_series;
                setHighlightedSeries(closest_valid_series);
                let series_index = getSeriesSelectIndex(g_series_to_highlight);
                            
                if (series_index !== undefined) 
                {
                    // series_select.selectedIndex = series_index;
                } 
                else 
                {
                    console.log(`series index ${series_index} not found`);
                }
    
                let index = getSeriesIndex(g_series_to_highlight)
    
                if (index !== undefined)
                {
                    series_select.selectedIndex = index + numberOfGenericOptions(series_select);
                    console.log("buttonDown calling updateSelectedSeriesStatistics");
                    updateSelectedSeriesStatistics();
                    console.log(`drawSeriesLabels series_select.selectedIndex ${series_select.selectedIndex}`);

                    let scroll_container = document.getElementById("scroll_container");
                    centerScrollingContainer(scroll_container, index);
                }
            }
        }
        
    }

    if (mouseWithinViewport(g_main_viewport))
    {
        // console.log("buttonDown cleared auto_update_statistics");
        if (g_total_point_count > max_auto_update_statistics_total_point_count)
        {
            auto_update_statistics = false;
        }
    }
}

function getSeriesIndex(search_series)
{
    let series_list = g_selected_series_list;
    
    if (usingUserData())
    {
        series_list = g_user_series_list;
    }

    for (let i = 0; i < series_list.length; i++)
    {
        let series = series_list[i];

        if (series == search_series)
        {
            return i;
        }
    }

    return undefined;
}

function resetZoom()
{
    console.log("resetZoom");
    g_scale.x = 1;
    g_scale.y = 1;
    g_offset.x = 0;
    g_offset.y = 0;

    g_minimum.x = Number.MAX_SAFE_INTEGER;
    g_minimum.y = Number.MAX_SAFE_INTEGER;
    g_maximum.x = Number.MIN_SAFE_INTEGER;
    g_maximum.y = Number.MIN_SAFE_INTEGER;
    
    for (let i = 0; i < g_selected_series_list.length; i++)
    {
        let series = g_selected_series_list[i];
        g_minimum.x = Math.min(g_minimum.x, series.minimum.x);
        g_minimum.y = Math.min(g_minimum.y, series.minimum.y);
        g_maximum.x = Math.max(g_maximum.x, series.maximum.x);
        g_maximum.y = Math.max(g_maximum.y, series.maximum.y);
    }

    console.log("resetZoom g_minimum g_maximum", g_minimum, g_maximum);
    addGraphMargin(g_minimum, g_maximum, GRAPH_MARGIN_PERCENT);

    clearMinMaxInputs();
    console.log("calling updateStatistics() from resetZoom()");
    updateStatistics();
    document.dispatchEvent(draw_scene_event);
}

function updateMinimalStatistics()
{
    if (g_selected_series_list === undefined || g_selected_series_list.length == 0)
    {
        return;
    }
    

    // Using global variables
    // [g_visible_count, g_visible_average, g_visible_total, g_visible_point_list, g_total_point_count, g_actual_visible_point_list] = 
    let [visible_count, visible_average, visible_total, visible_point_list, total_point_count, actual_visible_point_list] = 
        visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    g_visible_count = visible_count;
    g_visible_average = visible_average;
    g_visible_total = visible_total;
    g_visible_point_list = visible_point_list;
    g_total_point_count = total_point_count;
    g_actual_visible_point_list = actual_visible_point_list;

    let day_count_map = new Map();

    for (i in g_actual_visible_point_list)
    {
        let point = g_actual_visible_point_list[i];
        let date = point.x;
        if (day_count_map.has(date))
        {
            let count = day_count_map.get(date) + 1;
            day_count_map.set(date, count);
        }
        else
        {
            day_count_map.set(date, 1);
        }
    }

    day_count_label.innerHTML = day_count_map.size.toString();

    count_label.innerHTML = g_actual_visible_point_list.length.toString();

    if (type_select.value == TMAX || type_select.value == TMIN)
    {
        if (use_centigrade)
        {
            g_visible_average = fToC(g_visible_average);
            g_visible_total = fToC(g_visible_total);
        }
    }
    else if (type_select.value == PRCP || type_select.value == SNOW)
    {
        if (use_centigrade)
        {
            g_visible_average = inchesToMM(g_visible_average);
            g_visible_total = inchesToMM(g_visible_total);
        }
    }

    average_label.innerHTML = g_visible_average.toFixed(4);
    // sum_label.innerHTML = parseInt(visible_total).toString();
    sum_label.innerHTML = g_visible_total.toFixed(g_visible_total < 100 ? 1 : 0);
    series_count_label.innerHTML = g_selected_series_list.length.toString();

    console.log("updateMinimalStatistics calling updateSelectedSeriesStatistics");
    updateSelectedSeriesStatistics();
}

function updateSelectedSeriesStatistics()
{
    let highlighted_series = getCurrentlyHighlightedSeries();
    console.log("updateSelectedSeriesStatistics highlighted_series", highlighted_series);

    if (highlighted_series === null)
    {
        console.log("updateSelectedSeriesStatistics() highlighted_series === null");
        return;
    }

    let series_list = [];
    series_list.push(highlighted_series);
    let [series_count, series_average, series_total, series_visible_point_list] = 
        visiblePointList(g_main_viewport, series_list, g_scale, g_offset, g_minimum, g_maximum);

    console.log("updateSelectedSeriesStatistics series_average", series_average);

    if (type_select.value == TMAX || type_select.value == TMIN)
    {
        if (use_centigrade)
        {
            series_average = fToC(series_average);
            series_total = fToC(series_total);
        }
    }
    else if (type_select.value == PRCP || type_select.value == SNOW)
    {
        if (use_centigrade)
        {
            series_average = inchesToMM(series_average);
            series_total = inchesToMM(series_total);
        }
    }
        
    selected_average_label.innerHTML = series_average.toFixed(4);

    if (series_visible_point_list.length > 1)
    {
        let result = createTrendLine(series_visible_point_list);

        if (result !== null)
        {
            let [trend_line, slope, b, y_average, y_sum] = result;
            selected_trend_label.innerHTML = slope.toFixed(4);
            selected_sum_label.innerHTML = series_total.toFixed(y_sum < 100 ? 1 : 0);
        }
        
    }
}

function updateStatistics()
{
    console.log("updateStatistics", new Date().toISOString());
    g_statistics_updated = true
    // callingFunction();

    // [g_visible_count, g_visible_average, g_visible_total, g_visible_point_list, g_total_point_count, g_actual_visible_point_list] = 
    //     visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    let [visible_count, visible_average, visible_total, visible_point_list, total_point_count, actual_visible_point_list] = 
    visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    g_visible_count = visible_count;
    g_visible_average = visible_average;
    g_visible_total = visible_total;
    g_visible_point_list = visible_point_list;
    g_total_point_count = total_point_count;
    g_actual_visible_point_list = actual_visible_point_list;


    if (g_visible_point_list === undefined)
    {
        console.log("updateStatistics visible_point_list undefined");
        return;
    }
    // return;

    updateMinimalStatistics();

    if (plot_trend_checkbox.checked && g_visible_point_list.length >= 2)
    {
        let trend_line, curvature, a, b, y_average, y_sum = undefined;

        try
        {
            let result = createTrendLine(g_visible_point_list);

            if (result !== null)
            {
                let [trend_line, a, b, y_average, y_sum] = result;

                if (trend_line !== undefined)
                {
                    global_trend_line = trend_line;
                    let slope = a;
                    trend_label.innerHTML = slope.toFixed(4);
                    console.log("updateStatistics trend_line created", trend_line);
                }
                else
                {
                    console.log("updateStatistics trend_line undefined");
                }
            }

        }
        catch
        {
            console.log("updateStatistics trend_line exception");
            let break_here = true;
        }
    }
    else
    {
        console.log("updateStatistics g_visible_point_list.length", g_visible_point_list.length);
    }

    detailed_statistics_can_execute = false;
    detailed_statistics_next_time = false;
    console.log("end updateStatistics", new Date().toISOString());

    // document.dispatchEvent(draw_scene_event);
    // current_graph_state = new GraphState();
}

function createTrendLine(point_list)
{
    if (point_list === undefined || point_list.length == 0)
    {
        return null;
    }

    let [a, b, y_average, y_sum] = linearRegression(point_list);

    if (a == 0 && b == 0 && y_average == 0 && y_sum == 0)
    {
        return null;
    }
    // console.log(a, b, y_average);

    var screen_corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
    var left_x = screen_corners[0].x;
    var left_y = (left_x * a) + b;
    var right_x = screen_corners[1].x;
    var right_y = (right_x * a) + b;
    // console.log(left_x, left_y, right_x, right_y);
    let trend_line = [left_x, left_y, right_x, right_y];
    return [trend_line, a, b, y_average, y_sum];
}

function titleChanged()
{
    main_title_label.innerHTML = main_title_input.value;
}

function verticalAxisLabelChanged()
{
    y_axis_label.innerHTML = getVerticalString(vertical_axis_title_input.value);
    let font_size = Number(y_axis_label.style.fontSize.replace("px", "")) / 2;
    let y_axis_label_height = y_axis_label.innerHTML.length * font_size;
    y_axis_label.style.height = `${y_axis_label_height}px`;  
    y_axis_label.style.top = `${g_main_viewport_borders.top + (g_main_viewport.height / 2) - (y_axis_label_height / 2)}px`;
}

function horizontalAxisLabelChanged()
{
    x_axis_label.innerHTML = horizontal_axis_title_input.value;
}

function dimensionsChanged(event)
{
    console.log("dimensionsChanged", minimum_x_input.value, maximum_x_input.value);

    if (isNumber(minimum_x_input.value))
    {
        g_minimum.x = parseFloat(minimum_x_input.value);
    }
    if (isNumber(maximum_x_input.value))
    {
        g_maximum.x = parseFloat(maximum_x_input.value);
    }
    if (isNumber(minimum_y_input.value))
    {
        g_minimum.y = parseFloat(minimum_y_input.value);
    }
    if (isNumber(maximum_y_input.value))
    {
        g_maximum.y = parseFloat(maximum_y_input.value);
    }

    if (g_minimum.x >= g_maximum.x || g_minimum.y >= g_maximum.y)
    {
        return;
    }

    if (minimum_x_input.value == "1/1" && maximum_x_input.value == "12/31")
    {
        if (!screenLocked())
        {
            g_minimum.x = 0;
            g_maximum.x = 1;
            g_scale.x = 1;
            g_offset.x = 0;
        }
    }

    var screen_corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);


    let minimum_decimal_date = GraphingUtilities.convertDateToDecimal(minimum_x_input.value);
    console.log(minimum_decimal_date);
    let minimum_date = minimum_decimal_date >= 0 ? minimum_decimal_date : parseFloat(minimum_x_input.value);
    if (!isNaN(minimum_date))
    {
        screen_corners[0].x = minimum_date ;
    }
    
    let maximum_decimal_date = GraphingUtilities.convertDateToDecimal(maximum_x_input.value);
    let maximum_date = maximum_decimal_date >= 0 ? maximum_decimal_date : parseFloat(maximum_x_input.value);
    if (!isNaN(maximum_date))
    {
        screen_corners[1].x = maximum_date;
    }

    var minimum_y = parseFloat(minimum_y_input.value);
    if (!isNaN(minimum_y))
    {
        // minimum_y -= onePixelDelta().y;
        
        if (units_select.value == "C")
        {
            minimum_y = cToF(minimum_y);
        }

        screen_corners[0].y = minimum_y;
    }
    
    var maximum_y = parseFloat(maximum_y_input.value);
    if (!isNaN(maximum_y))
    {
        if (units_select.value == "C")
        {
            maximum_y = cToF(maximum_y);
        }

        screen_corners[1].y = maximum_y;
    }

    console.log("dimensionsChanged", "screen_corners", screen_corners);

    if (screen_corners[0].x < screen_corners[1].x && screen_corners[0].y < screen_corners[1].y)
    {
        zoomToNewScreenCorners(g_main_viewport, screen_corners[0], screen_corners[1], 0, g_scale, g_offset, g_minimum, g_maximum);
    }
    else
    {
        console.log("dimensionsChanged() returning because maximum has to be larger than minimum", screen_corners);
    }

    console.log("calling updateStatistics() from dimensionsChanged()");
    updateStatistics();
    
}

function searchMostDaysAbove(minimum_threshold)
{
    let year_longest_map = new Map();

    if (!isNaN(minimum_threshold))
    {
        if (units_select.value == "C")
        {
            minimum_threshold = cToF(minimum_threshold);
        }

        var current_year = 0;
        var maximum_yearly_count = 0;
        var maximum_year = 0;
        var lower_left = new Vec2();
        var upper_right = new Vec2();
        var first_date_above = Number.MAX_VALUE;
        var last_date_above = Number.MIN_VALUE;
        var lowest_y = Number.MAX_VALUE;
        var highest_y = Number.MIN_VALUE;
        var longest_series = null;

        for (var i = 0; i < g_selected_series_list.length; i++)
        {
            var series = g_selected_series_list[i];
            var series_list = [];
            var series_visible_point_list = [];
            series_list.push(series);
            [count, average, total, series_visible_point_list] = visiblePointList(g_main_viewport, series_list, g_scale, g_offset, g_minimum, g_maximum);
            var yearly_count = 0;

            for (var j = 0; j < series_visible_point_list.length; j++)
            {
                var x = series_visible_point_list[j].x;
                var y = series_visible_point_list[j].y;
                var year = parseInt(x);
                var last_point = j == series_visible_point_list.length - 1;

                if (year == current_year || current_year == 0)
                {
                    if (y >= minimum_threshold)
                    {
                        yearly_count++;
                        first_date_above = Math.min(first_date_above, x);
                        last_date_above = Math.max(last_date_above, x);
                    }

                    lowest_y = Math.min(lowest_y, y);
                    highest_y = Math.max(highest_y, y);

                    if (current_year == 0)
                    {
                        current_year = year;
                    }
                }

                var new_year = (year != current_year) || last_point;

                if (new_year)
                {
                    if (yearly_count > maximum_yearly_count)
                    {
                        maximum_yearly_count = yearly_count;
                        maximum_year = current_year;
                        lower_left.x = first_date_above;
                        upper_right.x = last_date_above;
                        lower_left.y = minimum_threshold;
                        upper_right.y = highest_y;
                        console.log(series.name, yearly_count, year);
                        longest_series = series;
                    }

                    year_longest_map.set(current_year, Math.max(yearly_count, year_longest_map.get(current_year) || 0));

                    first_date_above = Number.MAX_VALUE;
                    last_date_above =  Number.MIN_VALUE;
                    lowest_y = Number.MAX_VALUE;
                    highest_y = Number.MIN_VALUE;
                    current_year = year;
                    yearly_count = 0;
                }
            }
        }
    }

    if (longest_series == null)
    {
        console.log("No search series found");
        return;
    }

    selectOneSeries(longest_series);
    let display_minimum = _.cloneDeep(lower_left);
    let display_maximum = _.cloneDeep(upper_right);
    display_minimum.x -= 1.0 / 365.0;
    display_maximum.x += 1.0 / 365.0;

    zoomToNewScreenCorners(g_main_viewport, display_minimum, display_maximum, 3, g_scale, g_offset, g_minimum, g_maximum);
    // console.log(maximum_consecutive_count, longest_sequence_minimum, longest_sequence_maximum);

    let [sorted_map, sorted_array] = sortMapToArray(year_longest_map, (a, b) => a[0] > b[0] ? 1 : -1);
    console.log("sorted array", sorted_array);
    sorted_string = `Year, Most Days Above ${minimum_threshold}\n`;

    for (let i = 0; i < sorted_array.length; i++)
    {
        let year = sorted_array[i][0];
        let value = sorted_array[i][1];
        sorted_string += `${year},${value}\n`;
    }

    writeTextFile( `Most_days_above_${minimum_threshold}_${state_select.value}.csv`, sorted_string);

}

function searchLongestStretchAbove(minimum_threshold)
{
    if (!isNaN(minimum_threshold))
    {
        if (units_select.value == "C")
        {
            minimum_threshold = cToF(minimum_threshold);
        }

        var maximum_consecutive_count = 0;
        var sequence_minimum = new Vec2();
        var sequence_maximum = new Vec2();
        var longest_sequence_minimum = new Vec2();
        var longest_sequence_maximum = new Vec2();
        var longest_series = null;
        let year_longest_map = new Map();
        let previous_date = null;
        let most_allowable_missing_days = 2;

        for (var j = 0; j < g_selected_series_list.length; j++)
        {
            var series = g_selected_series_list[j];
            var series_list = [];
            var series_visible_point_list = [];
            series_list.push(series);
            [count, average, total, series_visible_point_list] = visiblePointList(g_main_viewport, series_list, g_scale, g_offset, g_minimum, g_maximum);
            var consecutive_count = 0;
            console.log(series.name);

            for (var i = 0; i < series_visible_point_list.length; i++)
            {
                var x = series_visible_point_list[i].x;
                var y = series_visible_point_list[i].y;
                let year = Math.floor(x);
                let date = x;


                if (y >= minimum_threshold)
                {
                    if (consecutive_count == 0)
                    {
                        sequence_minimum.x = x;
                        sequence_minimum.y = y;
                        sequence_maximum.x = x;
                        sequence_maximum.y = y;
                    }
                    else
                    {
                        sequence_minimum.x = Math.min(sequence_minimum.x, x);
                        sequence_maximum.x = Math.max(sequence_maximum.x, x);
                        sequence_minimum.y = Math.min(sequence_minimum.y, y);
                        sequence_maximum.y = Math.max(sequence_maximum.y, y);
                    }

                    consecutive_count++;
                    year_longest_map.set(year, Math.max(consecutive_count, year_longest_map.get(year) || 0));
                }

                let too_many_missing_days = previous_date == null ? false : (date - previous_date) > (most_allowable_missing_days / 365) ? true : false;

                if (y < minimum_threshold || i == series_visible_point_list.length - 1 || too_many_missing_days)
                {
                    if (consecutive_count > maximum_consecutive_count)
                    {
                        maximum_consecutive_count = consecutive_count;
                        longest_sequence_minimum.x = sequence_minimum.x;
                        longest_sequence_maximum.x = sequence_maximum.x;
                        longest_sequence_minimum.y = sequence_minimum.y;
                        longest_sequence_maximum.y = sequence_maximum.y;
                        longest_series = series;
                        console.log(series.name);
                    }

                    consecutive_count = 0;
                }

                previous_date = date;
            }
        }

        let [sorted_map, sorted_array] = sortMapToArray(year_longest_map, (a, b) => a[0] > b[0] ? 1 : -1);
        console.log("sorted array", sorted_array);
        sorted_string = `Year, Consecutive Days Above ${minimum_threshold}\n`;

        for (let i = 0; i < sorted_array.length; i++)
        {
            let year = sorted_array[i][0];
            let value = sorted_array[i][1];
            sorted_string += `${year},${value}\n`;
        }

        writeTextFile( `Longest_stretch_above_${minimum_threshold}_${state_select.value}.csv`, sorted_string);

        if (longest_series == null)
        {
            console.log("No search series found");
            return;
        }    

        selectOneSeries(longest_series);
        let display_minimum = _.cloneDeep(longest_sequence_minimum);
        let display_maximum = _.cloneDeep(longest_sequence_maximum);
        display_minimum.x -= 1.0 / 365.0;
        display_maximum.x += 1.0 / 365.0;
        zoomToNewScreenCorners(g_main_viewport, display_minimum, display_maximum, 1, g_scale, g_offset, g_minimum, g_maximum);
        console.log(maximum_consecutive_count, longest_sequence_minimum, longest_sequence_maximum);
    }
}

function searchLongestSeasonAbove(minimum_threshold)
{
    if (!isNaN(minimum_threshold) && count > 0)
    {
        if (units_select.value == "C")
        {
            minimum_threshold = cToF(minimum_threshold);
        }
    }

    var current_year = 0;
    var current_year_first_date_above_threshold = Number.MAX_VALUE;;
    var current_year_last_date_above_threshold = Number.MIN_VALUE;
    var current_year_first_index_above_threshold = Number.MAX_VALUE;
    var current_year_last_index_above_threshold = Number.MIN_VALUE;
    var current_year_above_threshold_length = 0;
    var longest_season_first_date_above_threshold = 0;
    var longest_season_last_date_above_threshold = 0;
    var longest_season_first_index_above_threshold = 0;
    var longest_season_last_index_above_threshold = 0;
    var longest_season_above_threshold_length = 0;
    var min_y;
    var max_y;
    let year_longest_map = new Map();
    
    for (var i = 0; i < g_selected_series_list.length; i++)
    {
        var series = g_selected_series_list[i];
        var series_list = [];
        var series_visible_point_list = [];
        series_list.push(series);
        [count, average, total, series_visible_point_list] = visiblePointList(g_main_viewport, series_list, g_scale, g_offset, g_minimum, g_maximum);
        var consecutive_count = 0;

        for (var j = 0; j < series_visible_point_list.length; j++)
        {
            var x = series_visible_point_list[j].x;
            var y = series_visible_point_list[j].y;
            var year = parseInt(x);

            var new_year = year != 0 && current_year != year;
            var end_of_list = j == (series_visible_point_list.length - 1);

            if (new_year || end_of_list)
            {
                if (current_year_above_threshold_length > longest_season_above_threshold_length)
                {
                    longest_season_first_date_above_threshold = current_year_first_date_above_threshold;
                    longest_season_last_date_above_threshold = current_year_last_date_above_threshold;
                    longest_season_first_index_above_threshold = current_year_first_index_above_threshold;
                    longest_season_last_index_above_threshold = current_year_last_index_above_threshold;
                    longest_season_above_threshold_length = current_year_above_threshold_length;
                    longest_season_year = current_year;
                    longest_series = series;
                    console.log(series.name);
                    min_y = Number.MAX_VALUE;
                    max_y = Number.MIN_VALUE;
                    
                    for (var k = longest_season_first_index_above_threshold; k <= longest_season_last_index_above_threshold; k++)
                    {
                        var y = series_visible_point_list[k].y;
                        min_y = Math.min(min_y, y);
                        max_y = Math.max(max_y, y);
                    }
                }

                current_year = year;
                current_year_first_date_above_threshold = Number.MAX_VALUE;
                current_year_last_date_above_threshold = Number.MIN_VALUE;
                current_year_first_index_above_threshold =  Number.MAX_VALUE;
                current_year_last_index_above_threshold = Number.MIN_VALUE;
                current_year_above_threshold_length = 0;
            }

            if (y >= minimum_threshold)
            {
                current_year_first_date_above_threshold = Math.min(current_year_first_date_above_threshold, x);
                current_year_last_date_above_threshold = Math.max(current_year_last_date_above_threshold, x);
                current_year_first_index_above_threshold = Math.min(current_year_first_index_above_threshold, j);
                current_year_last_index_above_threshold = Math.max(current_year_last_index_above_threshold, j);
                current_year_above_threshold_length = current_year_last_date_above_threshold - current_year_first_date_above_threshold + 1/365;
                year_longest_map.set(year, Math.max(parseInt(current_year_above_threshold_length * 365), year_longest_map.get(year) || 0));
            }
        }
    }

    var longest_season_lower_left = new Vec2(longest_season_first_date_above_threshold, min_y);
    var longest_season_upper_right = new Vec2(longest_season_last_date_above_threshold, max_y);

    if (longest_series == null)
    {
        console.log("No search series found");
        return;
    }

    let [sorted_map, sorted_array] = sortMapToArray(year_longest_map, (a, b) => a[0] > b[0] ? 1 : -1);
    console.log("sorted array", sorted_array);
    sorted_string = `Year, Longest Season Above ${minimum_threshold}\n`;

    for (let i = 0; i < sorted_array.length; i++)
    {
        let year = sorted_array[i][0];
        let value = sorted_array[i][1];
        sorted_string += `${year},${value}\n`;
    }

    writeTextFile( `Longest_season_above_${minimum_threshold}.csv`, sorted_string);

    
    selectOneSeries(longest_series);
    zoomToNewScreenCorners(g_main_viewport, longest_season_lower_left, longest_season_upper_right, 0.5, g_scale, g_offset, g_minimum, g_maximum);
    console.log(longest_season_lower_left, longest_season_upper_right);

}

function searchFirstDayAbove(minimum_threshold)
{
    if (!isNaN(minimum_threshold) && count > 0)
    {
        if (units_select.value == "C")
        {
            minimum_threshold = cToF(minimum_threshold);
        }
    }

    var current_year = 0;
    var current_year_first_date_above_threshold = Number.MAX_VALUE;
    var current_year_first_index = 0;
    var current_year_last_index = Number.MIN_VALUE;
    var first_date_above_threshold = Number.MAX_VALUE;
    var first_date_above_series = null;
    var min_x;
    var max_x;
    var min_y;
    var max_y;
    let year_earliest_map = new Map();
    
    for (var i = 0; i < g_selected_series_list.length; i++)
    {
        var series = g_selected_series_list[i];
        var series_list = [];
        var series_visible_point_list = [];
        series_list.push(series);
        [count, average, total, series_visible_point_list] = visiblePointList(g_main_viewport, series_list, g_scale, g_offset, g_minimum, g_maximum);
        var consecutive_count = 0;

        for (var j = 0; j < series_visible_point_list.length; j++)
        {
            var date = series_visible_point_list[j].x;
            var value = series_visible_point_list[j].y;
            var year = parseInt(date);

            var new_year = current_year != year;
            var end_of_list = j == (series_visible_point_list.length - 1);

            if (value >= minimum_threshold)
            {
                year_earliest_map.set(year, Math.min(parseInt((date - year) * 365), year_earliest_map.get(year) || Number.MAX_SAFE_INTEGER));
            }
    

            if (end_of_list)
            {
                current_year_last_index = j;
            }

            if (new_year || end_of_list)
            {
                if (current_year_first_date_above_threshold < first_date_above_threshold)
                {
                    first_date_above_threshold = current_year_first_date_above_threshold;
                    first_date_above_series = series;
                    console.log(series.name);
                    min_x = Number.MAX_VALUE;
                    max_x = Number.MIN_VALUE;
                    min_y = Number.MAX_VALUE;
                    max_y = Number.MIN_VALUE;
                    
                    for (var k = current_year_first_index; k < current_year_last_index; k++)
                    {
                        var x = series_visible_point_list[k].x;
                        var y = series_visible_point_list[k].y;
                        min_x = Math.min(min_x, x);
                        max_x = Math.max(max_x, x);
                        min_y = Math.min(min_y, y);
                        max_y = Math.max(max_y, y);
                    }
                }
                
                
                
                current_year = year;
                current_year_first_date_above_threshold = Number.MAX_VALUE;
                current_year_last_index = Number.MIN_VALUE;
                current_year_first_index = j;
            }
            else
            {
                current_year_last_index = j;
            }

            if (value >= minimum_threshold)
            {
                current_year_first_date_above_threshold = Math.min(current_year_first_date_above_threshold, date - current_year);
            }
        }
    }



    var lower_left = new Vec2(min_x, minimum_threshold);
    var upper_right = new Vec2(max_x, max_y);

    if (first_date_above_series == null)
    {
        console.log("No search series found");
        return;
    }

    let [sorted_map, sorted_array] = sortMapToArray(year_earliest_map, (a, b) => a[0] > b[0] ? 1 : -1);
    console.log("sorted array", sorted_array);
    sorted_string = `Year, First Day Above ${minimum_threshold}\n`;

    for (let i = 0; i < sorted_array.length; i++)
    {
        let year = sorted_array[i][0];
        let value = sorted_array[i][1];
        sorted_string += `${year},${value}\n`;
    }

    writeTextFile( `First_day_above_${minimum_threshold}.csv`, sorted_string);
    selectOneSeries(first_date_above_series);
    zoomToNewScreenCorners(g_main_viewport, lower_left, upper_right, 0.5, g_scale, g_offset, g_minimum, g_maximum);
    console.log(lower_left, upper_right);

}

function searchLastDayAbove(minimum_threshold)
{
    if (!isNaN(minimum_threshold) && count > 0)
    {
        if (units_select.value == "C")
        {
            minimum_threshold = cToF(minimum_threshold);
        }
    }

    var current_year = 0;
    var current_year_last_date_above_threshold = Number.MIN_VALUE;
    var current_year_first_index = 0;
    var current_year_last_index = Number.MIN_VALUE;
    var last_date_above_threshold = current_year_last_date_above_threshold;
    var last_date_above_series = null;
    var min_x;
    var max_x;
    var min_y;
    var max_y;
    
    for (var i = 0; i < g_selected_series_list.length; i++)
    {
        var series = g_selected_series_list[i];
        var series_list = [];
        var series_visible_point_list = [];
        series_list.push(series);
        [count, average, total, series_visible_point_list] = visiblePointList(g_main_viewport, series_list, g_scale, g_offset, g_minimum, g_maximum);
        var consecutive_count = 0;

        for (var j = 0; j < series_visible_point_list.length; j++)
        {
            var date = series_visible_point_list[j].x;
            var value = series_visible_point_list[j].y;
            var year = parseInt(date);

            var new_year = current_year != year;
            var end_of_list = j == (series_visible_point_list.length - 1);

            if (end_of_list)
            {
                current_year_last_index = j;
            }

            if (new_year || end_of_list)
            {
                if (current_year_last_date_above_threshold > last_date_above_threshold)
                {
                    last_date_above_threshold = current_year_last_date_above_threshold;
                    last_date_above_series = series;
                    console.log(series.name);
                    min_x = Number.MAX_VALUE;
                    max_x = Number.MIN_VALUE;
                    min_y = Number.MAX_VALUE;
                    max_y = Number.MIN_VALUE;
                    
                    for (var k = current_year_first_index; k < current_year_last_index; k++)
                    {
                        var x = series_visible_point_list[k].x;
                        var y = series_visible_point_list[k].y;
                        min_x = Math.min(min_x, x); 
                        max_x = Math.max(max_x, x);
                        min_y = Math.min(min_y, y);
                        max_y = Math.max(max_y, y);
                    }
                }
                
                current_year = year;
                current_year_last_date_above_threshold = Number.MIN_VALUE;
                current_year_last_index = Number.MIN_VALUE;
                current_year_first_index = j;
            }
            else
            {
                current_year_last_index = j;
            }

            if (value >= minimum_threshold)
            {
                current_year_last_date_above_threshold = Math.max(current_year_last_date_above_threshold, date - current_year);
            }
        }
    }

    var lower_left = new Vec2(min_x, min_y);
    var upper_right = new Vec2(max_x, max_y);

    if (last_date_above_series == null)
    {
        console.log("No search series found");
        return;
    }

    selectOneSeries(last_date_above_series);
    zoomToNewScreenCorners(g_main_viewport, lower_left, upper_right, 0.5, g_scale, g_offset, g_minimum, g_maximum);
    console.log(lower_left, upper_right);

}

function searchMostDaysBelow(maximum_threshold)
{
    if (!isNaN(maximum_threshold))
    {
        if (units_select.value == "C")
        {
            maximum_threshold = cToF(maximum_threshold);
        }

        var current_year = 0;
        var maximum_yearly_count = 0;
        var maximum_year = 0;
        var lower_left = new Vec2();
        var upper_right = new Vec2();
        var first_date_below = Number.MAX_VALUE;
        var last_date_below = Number.MIN_VALUE;
        var lowest_y = Number.MAX_VALUE;
        var highest_y = Number.MIN_VALUE;
        var longest_series = null;

        for (var i = 0; i < g_selected_series_list.length; i++)
        {
            var series = g_selected_series_list[i];
            var series_list = [];
            var series_visible_point_list = [];
            series_list.push(series);
            [count, average, total, series_visible_point_list] = visiblePointList(g_main_viewport, series_list, g_scale, g_offset, g_minimum, g_maximum);
            var yearly_count = 0;

            for (var j = 0; j < series_visible_point_list.length; j++)
            {
                var x = series_visible_point_list[j].x;
                var y = series_visible_point_list[j].y;
                var year = parseInt(x);
                var last_point = j == series_visible_point_list.length - 1;

                if (year == current_year || current_year == 0)
                {
                    if (y <= maximum_threshold)
                    {
                        yearly_count++;
                        first_date_below = Math.min(first_date_below, x);
                        last_date_below = Math.max(last_date_below, x);
                    }

                    lowest_y = Math.min(lowest_y, y);
                    highest_y = Math.max(highest_y, y);

                    if (current_year == 0)
                    {
                        current_year = year;
                    }
                }

                var new_year = (year != current_year) || last_point;

                if (new_year)
                {
                    if (yearly_count > maximum_yearly_count)
                    {
                        maximum_yearly_count = yearly_count;
                        maximum_year = current_year;
                        lower_left.x = first_date_below;
                        upper_right.x = last_date_below;
                        lower_left.y = lowest_y;
                        upper_right.y = maximum_threshold;
                        console.log(series.name, yearly_count, year);
                        longest_series = series;
                    }

                    first_date_below = Number.MAX_VALUE;
                    last_date_below =  Number.MIN_VALUE;
                    lowest_y = Number.MAX_VALUE;
                    highest_y = Number.MIN_VALUE;
                    current_year = year;
                    yearly_count = 0;
                }
            }
        }
    }

    if (longest_series == null)
    {
        console.log("No search series found");
        return;
    }

    selectOneSeries(longest_series);
    zoomToNewScreenCorners(g_main_viewport, lower_left, upper_right, 1, g_scale, g_offset, g_minimum, g_maximum);
    // console.log(maximum_consecutive_count, longest_sequence_minimum, longest_sequence_maximum);

}

function searchLongestStretchBelow(maximum_threshold)
{
    if (!isNaN(maximum_threshold))
    {
        if (units_select.value == "C")
        {
            maximum_threshold = cToF(maximum_threshold);
        }

        var maximum_consecutive_count = 0;
        var sequence_minimum = new Vec2();
        var sequence_maximum = new Vec2();
        var longest_sequence_minimum = new Vec2();
        var longest_sequence_maximum = new Vec2();
        var longest_series = null;

        for (var j = 0; j < g_selected_series_list.length; j++)
        {
            var series = g_selected_series_list[j];
            var series_list = [];
            var series_visible_point_list = [];
            series_list.push(series);
            [count, average, total, series_visible_point_list] = visiblePointList(g_main_viewport, series_list, g_scale, g_offset, g_minimum, g_maximum);
            var consecutive_count = 0;
            console.log(series.name);

            for (var i = 0; i < series_visible_point_list.length; i++)
            {
                var x = series_visible_point_list[i].x;
                var y = series_visible_point_list[i].y;

                if (y <= maximum_threshold)
                {
                    if (consecutive_count == 0)
                    {
                        sequence_minimum.x = x;
                        sequence_minimum.y = y;
                        sequence_maximum.x = x;
                        sequence_maximum.y = y;
                    }
                    else
                    {
                        sequence_minimum.x = Math.min(sequence_minimum.x, x);
                        sequence_maximum.x = Math.max(sequence_maximum.x, x);
                        sequence_minimum.y = Math.min(sequence_minimum.y, y);
                        sequence_maximum.y = Math.max(sequence_maximum.y, y);
                    }

                    consecutive_count++;
                    // console.log(y);
                }
                
                if (y > maximum_threshold || i == series_visible_point_list.length - 1)
                {
                    if (consecutive_count > maximum_consecutive_count)
                    {
                        maximum_consecutive_count = consecutive_count;
                        longest_sequence_minimum.x = sequence_minimum.x;
                        longest_sequence_maximum.x = sequence_maximum.x;
                        longest_sequence_minimum.y = sequence_minimum.y;
                        longest_sequence_maximum.y = sequence_maximum.y;
                        longest_series = series;
                        console.log(series.name);
                    }

                    consecutive_count = 0;
                }
            }
        }

        if (longest_series == null)
        {
            console.log("No search series found");
            return;
        }    

        selectOneSeries(longest_series);
        zoomToNewScreenCorners(g_main_viewport, longest_sequence_minimum, longest_sequence_maximum, 1, g_scale, g_offset, g_minimum, g_maximum);
        console.log(maximum_consecutive_count, longest_sequence_minimum, longest_sequence_maximum);
    }

}

function search()
{
    console.log("search started ", search_type_select.value, parseFloat(search_parameter_1_input.value));

    var count;
    var average;
    var total;

    clearMinMaxInputs();

    // console.log(visible_point_list);

    let tolerance = 0.1;

    if (search_type_select.value == MOST_DAYS_ABOVE)
    {
        let minimum_threshold = parseFloat(search_parameter_1_input.value) - tolerance;
        searchMostDaysAbove(minimum_threshold);
    }
    else if (search_type_select.value == LONGEST_STRETCH_ABOVE)
    {
        let minimum_threshold = parseFloat(search_parameter_1_input.value) - tolerance;
        searchLongestStretchAbove(minimum_threshold);
    }
    else if (search_type_select.value == LONGEST_SEASON_ABOVE)
    {
        let minimum_threshold = parseFloat(search_parameter_1_input.value) - tolerance;
        searchLongestSeasonAbove(minimum_threshold);
    }
    else if (search_type_select.value == FIRST_DAY_ABOVE)
    {
        let minimum_threshold = parseFloat(search_parameter_1_input.value) - tolerance;
        searchFirstDayAbove(minimum_threshold);
    }
    else if (search_type_select.value == LAST_DAY_ABOVE)
    {
        let minimum_threshold = parseFloat(search_parameter_1_input.value) - tolerance;
        searchLastDayAbove(minimum_threshold);
    }
    else if (search_type_select.value == MOST_DAYS_BELOW)
    {
        var maximum_threshold = parseFloat(search_parameter_1_input.value) + tolerance;
        searchMostDaysBelow(maximum_threshold);
    }
    else if (search_type_select.value == LONGEST_STRETCH_BELOW)
    {
        var maximum_threshold = parseFloat(search_parameter_1_input.value) + tolerance;
        searchLongestStretchBelow(maximum_threshold);
    }

    console.log("calling updateStatistics() from search()");
    updateStatistics();

    // console.log("search set auto_update_statistics");
    auto_update_statistics = getAutoUpdateStatistics();
}

function getAutoUpdateStatistics()
{
    return plot_trend_checkbox.checked;
}

function monthChanged(event)
{
    console.log("monthChanged");
    console.log("month_select.value", month_select.value);
    if (month_select.value == "0")
    {
        day_select.value = "0";
    }

    if (month_select.value == 0)
    {
        selectAllMonths(); 
        month_select_passthrough_button.innerHTML = "Month " + DOWN_ARROW_HAT;
    }
    else
    {
        selectChanged(month_select);
        month_select_passthrough_button.innerHTML = month_select[month_select.selectedIndex].innerHTML + "  " + DOWN_ARROW_HAT;
    }

    createSelectedMonthList();

    let update_graph = true;
    let add_margin = false;
    generateIndexListAndCalculateMinMax(month_select.value, day_select.value, g_minimum, g_maximum, update_graph, add_margin);
    month_label.innerHTML = GraphingUtilities.monthAbbreviation(parseInt(month_select.value));
}

function dayChanged(event)
{
    // console.log("dayChanged");
    // console.log("day_select.value", day_select.value);

    if (day_select.value == "0")
    {
        day_select.value = "0";
    }

    if (day_select.value == 0)
    {
        selectAllDays(); 
        day_select_passthrough_button.innerHTML = "Day " + DOWN_ARROW_HAT;
    }
    else
    {
        selectChanged(day_select);
        day_select_passthrough_button.innerHTML = day_select[day_select.selectedIndex].innerHTML + "  " + DOWN_ARROW_HAT;
    }

    createSelectedDayList();

    let update_graph = true;
    let add_margin = false;
    generateIndexListAndCalculateMinMax(month_select.value, day_select.value, g_minimum, g_maximum, update_graph, add_margin);
    day_label.innerHTML = day_select.value == 0 ? "ALL" : day_select.value;

    // // console.log(day_select.value);
    // let update_graph = true;
    // let add_margin = false;
    // generateIndexListAndCalculateMinMax(month_select.value, day_select.value, minimum, maximum, update_graph, add_margin);
    // month_label.innerHTML = GraphingUtilities.monthAbbreviation(parseInt(month_select.value));

    // if (month_select.value == "0")
    // {
    //     day_select.value = "0";
    // }

    // if (day_select.value == "0")
    // {
    //     day_label.innerHTML = "ALL";
    // }
    // else
    // {
    //     day_label.innerHTML = day_select.value;
    // }

    // day_select_passthrough_button.innerHTML = day_select[day_select.selectedIndex].innerHTML + "  " + DOWN_ARROW_HAT;
}

// Convert base64 to Blob
function dataURItoBlob(dataURI) 
{
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) 
    {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
  

function createScreenshotImage(canvas, image_name)
{
    let data_uri = canvas.toDataURL("image/png");
    downloadURI(data_uri, image_name)
}

function screenshotHandler(canvas)
{
    var image_name = g_selected_series_list[0].name.replace(/  */g, "-");

    for (var i = 1; i < g_selected_series_list.length && i < MAX_NUMBER_OF_SERIES_IN_TITLE; i++)
    {
        var series = g_selected_series_list[i];
        image_name += "_" + series.name.replace(/  */g, "-");
    }

    image_name += ".png";

    createScreenshotImage(canvas, image_name);

    let [total_percent_string, daily_percent_string, running_slope_string] = generateStatisticsFromScreen(canvas);

    if (PROGRAM_NAME == "STOCKS")
    {
        writeTextFile("total_percent.csv", total_percent_string);
        writeTextFile("daily_percent.csv", daily_percent_string);
        writeTextFile("running_slope.csv", running_slope_string);    
    }

    if (g_selected_series_list.length == 1)
    {
        let series = g_selected_series_list[0];
        let delta_string = createDeltaString(series);
        let delta_file_name = "delta.csv";

        let chart_title = convertWhitespaceToUnderscore(main_title_input.value);

        if (main_title_input.value.length > 0)
        {
            delta_file_name = chart_title + "_delta.csv";
        }

        writeTextFile(delta_file_name, delta_string);
    }


    if (g_selected_series_list.length == 2)
    {
        let first_series = g_selected_series_list[0];
        let second_series = g_selected_series_list[1];
        let [difference_string, inverse_difference_string] = createDifferenceString(first_series, second_series);
        writeTextFile(`${second_series.name.trim()} minus ${first_series.name.trim()}.csv`, difference_string + inverse_difference_string);
    }

    // updateMainTitleText();

}

function createDifferenceString(first_series, second_series)
{
    let first_series_map = new Map();
    let difference_map = new Map();

    let [position_buffer, index_buffer, graph_positions, graph_indices, graph_index_list] = seriesData(first_series);

    for (let i = 0; i < graph_positions.length; i += 2)
    {
        let date = graph_positions[i];
        let date_string = GraphingUtilities.dateString(date);
        let value = graph_positions[i+1];
        first_series_map.set(date_string, value);
    }

    
    [position_buffer, index_buffer, graph_positions, graph_indices, graph_index_list] = seriesData(second_series);

    for (let i = 0; i < graph_positions.length; i += 2)
    {
        let date = graph_positions[i];
        let date_string = GraphingUtilities.dateString(date);
        let value = graph_positions[i+1];

        let point_is_on_screen = pointIsOnScreen(g_main_viewport, new Vec2(date, value), g_scale, g_offset, current_minimum, current_maximum);
        
        if (first_series_map.has(date_string) && point_is_on_screen.x && point_is_on_screen.y)
        {
            let difference = value - first_series_map.get(date_string);
            difference_map.set(date, difference);
        }
    }

    map_array = Array.from(difference_map);
    let sorted_map_array = map_array.sort((a, b) => String(a[0]).localeCompare(String(b[0])));
    let sorted_data_array = sorted_map_array.map(pair => pair[1]);
    let interval = 365;
    let daily_moving_average_data_list = centeredMovingAverage(sorted_data_array, interval);
    previous_selected_series_list = g_selected_series_list;

    let difference_string = "Date,";
    difference_string += `${second_series.name.trim()} minus ${first_series.name.trim()}\n`
    let inverse_difference_string = "Date,";
    inverse_difference_string += `${first_series.name.trim()} minus ${second_series.name.trim()}\n`

    for (let i = 0; i < sorted_map_array.length; i++)
    {
        let date = sorted_map_array[i][0];
        let value = sorted_map_array[i][1];
        let running_average = daily_moving_average_data_list[i];
        difference_string += `${date},${value}\n`;
        inverse_difference_string += `${date},${-value}\n`;
    }

    return [difference_string, inverse_difference_string];
}

function parseUrlParameters()
{
    if (already_initialized)
    {
        return;
    }

    // offset_x=0&offset_y=0&scale_x=1&scale_y=1&country=US&state=AL&id=ANNUAL&type=TMAX&month=0&day=0&units=F
    if (initial_settings.offset_x != undefined)
    {
        g_offset.x = initial_settings.offset_x;
    }
    if (initial_settings.offset_x != undefined)
    {
        g_offset.y = initial_settings.offset_y;
    }
    if (initial_settings.scale_x != undefined)
    {
        g_scale.x = initial_settings.scale_x;
    }
    if (initial_settings.offset_x != undefined)
    {
        g_scale.y = initial_settings.scale_y;
    }
    if (initial_settings.country != undefined) 
    {
        var country = initial_settings.country;
        country_select.value = country;
    }
    if (initial_settings.state != undefined) 
    {
        var state = initial_settings.state;
        state_select.value = state;
        state_label.innerHTML = state;
    }
    if (initial_settings.type != undefined) 
    {
        var type = initial_settings.type;
        type_select.value = type;
        setUnitsLabelString();
        setAverageValueLabelString();
    }
    if (initial_settings.units != undefined) 
    {
        var units = initial_settings.units;
        units_select.value = units;
    }
    if (initial_settings.month != undefined) 
    {
        var month = initial_settings.month;
        month_select.value = month;
        month_label.innerHTML = GraphingUtilities.monthAbbreviation(month);
    }
    if (initial_settings.day != undefined) 
    {
        var day = initial_settings.day;
        day_select.value = day;

        if (day == 0)
        {
            day_label.innerHTML = "ALL";
        }
        else
        {
            day_label.innerHTML = day;
        }
    }
    if (initial_settings.units != undefined) 
    {
        var units = initial_settings.units;
        units_select.value = units;
    }

    already_initialized = true;
}

function calculateDeltas(series)
{
    let series_name = series.name.trim();
    let data = series.graph_positions;

    let [count, average, total, visible_point_list, actual_visible_point_list] = visiblePointList(g_main_viewport, g_selected_series_list, g_scale, 
                                                                            g_offset, g_minimum, g_maximum);
    let previous_value = undefined;
    let delta_map = new Map();
    let delta_percent_map = new Map();

    for (let data of visible_point_list)
    {
        let date = data.x;
        let value = data.y;

        if (previous_value !== undefined)
        {
            let delta_percent = (value - previous_value)/ previous_value;
            delta_percent_map.set(date, delta_percent);
            delta_map.set(date, value - previous_value);
        }

        previous_value = value;
    }
    
    let sorted_delta_percent_map = sortMap(delta_percent_map);
    let sorted_delta_map = sortMap(delta_map);

    let delta_string = `Date,${series.name.slice(0, 20)} delta percent\n`;

    for (let [date, value] of sorted_delta_percent_map)
    {
        delta_string += `${date},${value}\n`;
    }

    delta_string += `Date,${series.name.slice(0, 20)} delta\n`;

    for (let [date, value] of sorted_delta_map)
    {
        delta_string += `${date},${value}\n`;
    }

    let filename = `${series.name.slice(0, 20)}_delta.csv`;
    writeTextFile(filename, delta_string);
}

function calculateDetailedStatistics(series_list, visible_point_list)
{
    console.log("calculateDetailedStatistics");
    let daily_data_map = new Map();
    let yearly_data_map = new Map();
    let series_visible_count_map = new Map();
    let series_name_list = [];

    let day_year_data_map = new Map();
    let day_year_record_map = new Map();
    let year_day_record_map = new Map();
    let year_day_record_count_list = [];

    console.log("series_list", g_selected_series_list);

    for (let i = 0; i < series_list.length; i++)
    {
        let series = series_list[i];
        let series_name = series.name.trim();

        if (series.state_abbreviation !== undefined)
        {
            series_name += `_${series.state_abbreviation}`;
        }

        series_name_list.push(series_name);
        series_visible_count_map.set(series_name, series.visible_point_list.length);
    }

    let previous_year = null;
    let previous_value = null;

    for (let j = 0; j < visible_point_list.length; j++)
    {
        let point = visible_point_list[j];
        let date = point.x;
        let value = point.y;
        let i = point.z;
        let series = series_list[i];
        var series_name = series.name.trim();

        if (getGenerateDailyStatistics())
        {
            if (daily_data_map.has(date))
            {
            }
            else
            {
                daily_data_map.set(date, {data_list : []});
            }

            daily_data_map.get(date).data_list.push([series_name, value]);
            // console.log(date, series_name, value);
        }


        let year = parseInt(date);

        if (yearly_data_map.has(year))
        {      
            let year_entry = yearly_data_map.get(year);

            yearly_data_map.get(year).last_value = value;


            if (value < year_entry.minimum)
            {
                year_entry.minimum = value;
                year_entry.minimum_date = date;

            }

            if (value > year_entry.maximum)
            {
                year_entry.maximum = value;
                year_entry.maximum_date = date;

            }

            year_entry.total += value;
            year_entry.count ++;
        }
        else
        {
            yearly_data_map.set(year, {minimum : value, maximum : value, total : value, count : 1});
            yearly_data_map.get(year).minimum_date = date;
            yearly_data_map.get(year).first_value = value;

        }

        previous_year = year;
        previous_value = value;
    }

    yearly_data_map = sortMap(yearly_data_map);

   
    for (let i = 0; i < series_list.length; i++)
    {
        let series = series_list[i];
        let series_name = series.name.trim();
        let year = series_name.split(" ")[1]; 

        let data = getPositionArray(series);

        for (let j = 0; j < data.length / 2; j++)
        {
            let date = data[j*2];
            // let day = parseInt(Math.round(date * 365));
            let day = getDaysSince(date, FIRST_DATE);
            let year = Math.round(date);
            let value = data[j*2 + 1];
            // console.log(year, day, value)
            ;
            if (day_year_data_map.has(day))
            {
                let record = day_year_data_map.get(day);
                record.total += value;
                record.count += 1;

                if (value > record.highest)
                {
                    record.highest = value;
                }
                else if (value < record.lowest)
                {
                    record.lowest = value;
                }

                record.range = record.highest - record.lowest;
            }
            else 
            {
                day_year_data_map.set(day, {});
                let record = day_year_data_map.get(day);
                record.total = value;
                record.count = 1;
                record.year = year;
                record.highest = value;
                record.lowest = value;
                record.date = date;
            }
        }                
    }

    console.log("day_year_data_map", day_year_data_map);

    for (const [day, value] of day_year_data_map)
    {
        let year = day.year;
        let value = day.highest;

        // console.log(i, year, value);

        if (year_day_record_map.has(year))
        {
            let count = year_day_record_map.get(year);
            year_day_record_map.set(year, count + 1);
        }
        else
        {
            year_day_record_map.set(year, 1);
        }
    }

    year_day_record_map = sortMap(year_day_record_map);
    console.log("year_day_record_map", year_day_record_map);


    if (getGenerateDailyStatistics())
    {
        daily_data_map = sortMap(daily_data_map);

        for (const [date, data] of daily_data_map)
        {
            let total = 0;
            let minimum = Number.MAX_SAFE_INTEGER;
            let maximum = Number.MIN_SAFE_INTEGER;
            let range = 0;
            let first_value = Number.MIN_SAFE_INTEGER;
    
            for (let i = 0; i < data.data_list.length; i++)
            {
                let series_name = data.data_list[i][0];
                let value = data.data_list[i][1];
                minimum = Math.min(minimum, value);
                maximum = Math.max(maximum, value);
                total += value;

                if (data.data_list.length == 2 && i == 1)
                {
                    let first_value = data.data_list[0][1];
                    data.range = value - first_value;
                }
            }

            let average = total / data.data_list.length;

            // data.range = Math.abs(maximum - minimum);
            data.minimum = minimum;
            data.maximum = maximum;
            data.total = total;
            data.average = average;
            data.date = convertNumericDateToString(date)[0];
        }
    }

    for (let i = 0; i < series_list.length; i++)
    {
        let series = series_list[i];
        let series_name = series.name.trim();
        let year = series_name.split(" ")[1]; 
        console.log(year);

        if (year_day_record_map.has(year))
        {
            year_day_record_count_list.push( {year: year, count: year_day_record_map.get(year)} )
        }
        else
        {
            year_day_record_count_list.push( {year: year, count: 0} );
        }
    }

    console.log(year_day_record_count_list);

    return([daily_data_map, yearly_data_map, series_name_list, series_visible_count_map, day_year_data_map, day_year_record_map, year_day_record_count_list]);
}

function convertNumericDateToString(numeric_date) 
{
    if (numeric_date < 1)
    {
        numeric_date += FIRST_DATE;
    }

    const year = Math.floor(numeric_date);
    let remaining_days = Math.round((numeric_date - year) * 365);

    if (isLeapYear(year))
    {
        remaining_days = Math.round((numeric_date - year) * 366);
    }
    
    const date = new Date(year, 0, 1); // Create a date object for January 1st of the given year
    date.setDate(date.getDate() + remaining_days); // Add the remaining days to the date

    const numeric_year = date.getFullYear();
    const numeric_month = date.getMonth();
    const numeric_day_of_month = date.getDate();
    
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const date_string = `${yyyy}-${mm}-${dd}`;
    
    return([date_string, numeric_year, numeric_month, numeric_day_of_month]);
  }

function sortMapByKeys(map) 
{
    const sorted_enries = Array.from(map.entries()).sort(([key_A], [key_B]) => 
    {
        if (key_A < key_B) return -1;
        if (key_A > key_B) return 1;
        return 0;
    });
    return new Map(sorted_enries);
}

function getDayOfYear(date) 
{
    const start_of_year = new Date(date.getFullYear(), 0, 0); // Start of the year
    const diff = date - start_of_year; // Difference in milliseconds
    const day_of_year = Math.floor(diff / (1000 * 60 * 60 * 24)); // Calculate the day of the year
    return day_of_year;
}

function calculateCurrentDate(start_date, days_passed) 
{
    const [date_string, year, month, day] = convertNumericDateToString(start_date);
    const earlier_date = new Date(year, month, day);
    const milliseconds_per_day = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const start_date_time = earlier_date.getTime(); // Convert the start date to milliseconds
    const current_date_time = start_date_time + (days_passed * milliseconds_per_day); // Add the number of milliseconds corresponding to the days passed
    const current_date = new Date(current_date_time); // Create a new Date object with the current date and time
    return current_date;
}

function getDaysSince(date, target_date) 
{
    const later_date = new Date(convertNumericDateToString(date)[0]);
    const earlier_date = new Date(convertNumericDateToString(target_date)[0]);
    
    // Calculate the difference in milliseconds
    const difference_ms = later_date.getTime() - earlier_date.getTime();
    
    // Convert milliseconds to days
    const days = Math.floor(difference_ms / (1000 * 60 * 60 * 24));
    
    return days;
}

function isLeapYear(year) 
{
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
  

function generateSineWave(length, frequency, sample_rate) 
{
    const signal = [];
    for (let i = 0; i < length; i++) 
    {
        const t = i / sample_rate;
        signal.push(Math.sin(2 * Math.PI * frequency * t));
    }
    return signal;
}

function generateSineWaves(length, frequency, sample_rate) 
{
    const signal = [];
    for (let i = 0; i < length; i++) 
    {
        const t = i / sample_rate;
        signal.push(Math.sin(2 * Math.PI * 1 * frequency * t) + Math.sin(2 * Math.PI * 3 * frequency * t));
    }
    return signal;
}

function realDft(real_data)
{
    let imaginary_data = new Array(real_data.length).fill(0);
    let real_fft = new Array(real_data.length);
    let imaginary_fft = new Array(real_data.length);

    // for (let i = 0; i < imaginary_data.length; i++)
    // {
    //     imaginary_data[i] = real_data[i];
    // }

    let invert = false;
    naiveDft(real_data, imaginary_data, real_fft, imaginary_fft, invert);
    return real_fft;
}

function naiveDft(inreal, inimag, outreal, outimag, inverse) 
{
	const n = inreal.length;
	if (n != inimag.length || n != outreal.length || n != outimag.length)
		console.log("Mismatched lengths");
	
	const coef = (inverse ? 2 : -2) * Math.PI;
	for (let k = 0; k < n; k++) 
    {  // For each output element
		let sumreal = 0;
		let sumimag = 0;
		for (let t = 0; t < n; t++) 
        {  // For each input element
			const angle = coef * (t * k % n) / n;  // This is more accurate than t * k
			sumreal += inreal[t] * Math.cos(angle);
			// sumreal += inreal[t] * Math.cos(angle) - inimag[t] * Math.sin(angle);
			// sumimag += inreal[t] * Math.sin(angle) + inimag[t] * Math.cos(angle);
		}
        
		outreal[k] = sumreal;
		outimag[k] = sumimag;
	}
}

function getSortedPointListCsvString(visible_series_name_list, sorted_series_date_data_list)
{
    let csv_string = "Date";

    for (let i = 0; i <  visible_series_name_list.length; i++)
    {
        let series_name = visible_series_name_list[i];
        csv_string += "," + series_name;
    }

    csv_string += "\n";

    for (let i = 0; i < sorted_series_date_data_list.length; i++)
    {
        let date_value_array = sorted_series_date_data_list[i];
        csv_string += date_value_array[0].toFixed(4);
        csv_string += "," + date_value_array[1];
        csv_string += "\n"
    }

    return csv_string;
}

function getSortedPointList(viewport, series_list, scale, offset, minimum, maximum)
{
    let total_count = 0;

    // let [count, average, total, visible_point_list = []] = visiblePointList(main_viewport, selected_series_list, scale, offset, minimum, maximum);

    [g_visible_count, g_visible_average, g_visible_total, g_visible_point_list, total_count, g_actual_visible_point_list] = visiblePointList(viewport, series_list, scale, offset, minimum, maximum);

    let series_date_data_map = new Map();
    let visible_series_name_list = [];

    for (series of series_list)
    {
        let series_name = series.name.trim();

        if (visible_series_name_list.includes(series_name))
        {
        }
        else
        {
            visible_series_name_list.push(series_name);
        }
    }

    for (series of series_list)
    {
        let visible_point_list = series.visible_point_list;

        for (let i = 0; i < visible_point_list.length; i++)
        {
            let visible_point = visible_point_list[i];
            let x = visible_point.x;
            let y = visible_point.y;

            if (series_date_data_map.has(x))
            {
            }
            else
            {
                series_date_data_map.set(x, new Array(visible_series_name_list.length).fill(''));
            }

            let series_index = visible_series_name_list.indexOf(series.name);
            series_date_data_map.get(x)[series_index] = y;
        }
    }

    let sorted_series_date_data_list = Array.from(series_date_data_map);
    sorted_series_date_data_list.sort((a, b) => a[0] - b[0]);
    return [visible_series_name_list, sorted_series_date_data_list];
}

function getFormattedDateTime() 
{
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${month}-${day}-${year}-${hours}-${minutes}-${seconds}`;
}

function visibleDataString(set_global = true)
{
    let [visible_count, visible_average, visible_total, visible_point_list, total_count, actual_visible_point_list] = 
        visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    let [visible_series_name_list, sorted_series_date_data_list] = 
        getSortedPointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    let csv_string = getSortedPointListCsvString(visible_series_name_list, sorted_series_date_data_list);

    if (set_global)
    {
        g_visible_point_list = visible_point_list;
    }

    return csv_string;
}


function generateCsvFromScreen(minimum_value, maximum_value)
{
    let daily_output_string = "DATE,";
    let daily_output_file_name = "";
    let yearly_output_string = "";
    let yearly_output_file_name = "";
    let year_daily_average_filename = "";
    let year_daily_total_filename = "";
    let daily_average_fft_filename = "";
    let daily_average_raw_fft_filename = "";

    let [visible_count, visible_average, visible_total, visible_point_list, total_count, actual_visible_point_list] = 
        visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    g_visible_point_list = visible_point_list;

    console.log("selected_series_list", g_selected_series_list);

    let [visible_series_name_list, sorted_series_date_data_list] = getSortedPointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);
    console.log("visible_series_name_list", visible_series_name_list);
    console.log("sorted_series_date_data_list", sorted_series_date_data_list);

    let visible_data_csv_string = "";
    visible_data_csv_string += `#${MAIN_TITLE_STRING} "${main_title_label.innerHTML}"\n`
    visible_data_csv_string += `#${VERTICAL_TITLE_STRING} "${y_axis_label.innerHTML}"\n`
    visible_data_csv_string += `#${HORIZONTAL_TITLE_STRING} "${x_axis_label.innerHTML}"\n`

    visible_data_csv_string += getSortedPointListCsvString(visible_series_name_list, sorted_series_date_data_list);
    console.log("visible_data_csv_string", visible_data_csv_string);
    let visible_data_file_name = "visible_data-" + getFormattedDateTime() + ".csv";
    writeTextFile(visible_data_file_name, visible_data_csv_string);

    const [daily_data_map, yearly_data_map, series_name_list, series_visible_count_map, day_year_data_map, day_year_record_map, year_day_record_count_list] = 
            calculateDetailedStatistics(g_selected_series_list, visible_point_list);


    // console.log("series_visible_count_map", series_visible_count_map);

    if (yearly_data_map.size == 1)
    {
        if (series_visible_count_map.size > 0)
        {
            let first_series_element = series_visible_count_map.entries().next().value;
            let first_series_name = first_series_element[0];
            
            if (first_series_name.startsWith("average "))
            {
                console.log("first_series_name", first_series_name);
                
                yearly_output_string = "Year,Count\n";
                yearly_output_file_name = "yearly_count.csv"

                for (const [series_name, count] of series_visible_count_map)
                {
                    let year = series_name.split(" ")[1];
                    yearly_output_string += year + "," + count + "\n";
                }

                let year_maximum_record_count_string = "YEAR,RECORD COUNT\n";

                for (let i = 0; i < year_day_record_count_list.length; i++)
                {
                    let record = year_day_record_count_list[i];
                    year_maximum_record_count_string += record.year + "," + record.count + "\n";
                }

                yearly_output_string += year_maximum_record_count_string;
            
                writeTextFile(yearly_output_file_name, yearly_output_string);

                console.log("day_year_data_map", day_year_data_map);

                let day_average_string = "DATE,DAILY AVERAGE\n";
                let day_average_filename = "daily_average.csv"; 

                const data_map = sortMapByKeys(day_year_data_map)

                for (const [day_offset_since_first_date, values] of data_map)
                {
                    let date = calculateCurrentDate(FIRST_DATE, day_offset_since_first_date);
                    let day_of_year = getDayOfYear(date);
                    let fraction_of_year = day_of_year / 365;
                    
                    if (values != undefined && values.count > 0)
                    {
                        let average = values.total / values.count;
                        day_average_string += fraction_of_year.toFixed(3) + "," + average.toFixed(2) + "\n";
                    }
                }

                writeTextFile(day_average_filename, day_average_string);

                return [visible_data_csv_string, ""];
            }
        }
    }

    for (let i = 0; i < series_name_list.length; i++)
    {
        let series_name = series_name_list[i];

        if (i < MAX_NUMBER_OF_SERIES_IN_TITLE)
        {
            daily_output_file_name += series_name + "-";
            yearly_output_file_name += series_name + "-";
            year_daily_average_filename += series_name + "-";
            year_daily_total_filename += series_name + "-";
            daily_average_fft_filename += series_name + "-";
            daily_average_raw_fft_filename += series_name + "-";
        }

        if (daily_data_map.size > 0)
        {
            daily_output_string += series_name + ",";
        }
    }


    // daily_output_string += "AVERAGE,TOTAL\n";    
    daily_output_string += "DAILY MINIMUM,DAILY MAXIMUM,DAILY AVERAGE,DAILY TOTAL,DAILY RANGE\n";
    daily_output_file_name += "_daily.csv";
    yearly_output_file_name += "_yearly.csv";
    year_daily_average_filename += "_average_daily.csv";
    year_daily_total_filename += "_total_daily.csv";
    daily_average_fft_filename += "_fft_daily.csv";
    daily_average_raw_fft_filename += "_raw_fft_daily.csv";
    let year_daily_average_string = "";
    let year_daily_count_string = "";
    let year_daily_total_string = "";
    let daily_average_list = [];
    let day_list = [];

    // daily_data_map = sortMap(daily_data_map);
    // console.log(daily_data_map);
    // console.log(series_name_list);

    let current_year = 0;

    for (const [date, data] of daily_data_map)
    {
        let daily_data_list = data.data_list;

        if (daily_data_list.length > 0)
        {
            // console.log(date, daily_data_list);
            let total = 0;

            const [month_name, month, day, year] = GraphingUtilities.monthDayYear(date);
            daily_output_string += date + ",";

            for (let i = 0; i < series_name_list.length; i++)
            {
                let series_name = series_name_list[i];
                let series_index = -1;

                for (let j = 0; j < daily_data_list.length; j++)
                {
                    let data_series_name = daily_data_list[j][0];

                    if (data_series_name == series_name)
                    {
                        series_index = j;
                        break;
                    }
                }

                if (series_index >= 0)
                {
                    // console.log(date, series_name, daily_data_list[series_index][1]);
                    daily_output_string += daily_data_list[series_index][1] + ",";
                }
                else
                {
                    // console.log(date, series_name, daily_data_list[series_index][1]);
                    daily_output_string += ",";
                }
            }

        }

        let year = parseInt(date);

        if (year != current_year)
        {
            year_daily_average_string += "Date," + "average " + year + "\n";
            year_daily_total_string += "Date," + "total " + year + "\n";
            current_year = year;
            yearly_data_map.get(year).first_value = data.total;
        }

        yearly_data_map.get(year).last_value = data.total;

        year_daily_average_string += (date - parseInt(date)) + ",";
        year_daily_average_string += data.average.toFixed(2) + "\n";
        year_daily_total_string += (date - parseInt(date)) + ",";
        year_daily_total_string += data.total.toFixed(2) + "\n";

        daily_output_string += data.minimum.toFixed(2) + ",";
        daily_output_string += data.maximum.toFixed(2) + ",";
        daily_output_string += data.average.toFixed(2) + ",";
        daily_output_string += data.total.toFixed(2) + ",";

        if (data.range === undefined)
        {
            daily_output_string += ",";
        }
        else
        {
            daily_output_string += data.range.toFixed(2) + ",";
        }
        
        // console.log(date, daily_data_list.length, total, average)

        daily_output_string += "\n";

        daily_average_list.push(data.average);
        day_list.push(date);
    }

    let first_date = new Date(GraphingUtilities.dateString(day_list[0]));
    let last_date = new Date(GraphingUtilities.dateString(day_list[day_list.length - 1]));
    let number_of_days = daysBetweenDates(first_date, last_date);
    // console.log(day_list[0], day_list[day_list.length - 1], first_date, last_date, number_of_days);
    let number_of_days_per_list_entry = number_of_days / day_list.length;

    let daily_moving_interval = 365;

    if (number_of_days_per_list_entry > 25 && number_of_days_per_list_entry < 50)
    {
        // Monthly data
        daily_moving_interval = 12;
    }
    else if (number_of_days_per_list_entry > 300 && number_of_days_per_list_entry < 400)
    {
        // Monthly data
        daily_moving_interval = 10;
    }

    const index_offset = parseInt(daily_moving_interval / 2);
    let daily_moving_average_data_list = centeredMovingAverage(daily_average_list, daily_moving_interval);
    // console.log("moving_average", daily_moving_average_data_list, "interval", daily_moving_interval, "daily_average_list", daily_average_list);
    let daily_moving_average_string = "DAILY MOVING AVERAGE DATE,DAILY MOVING AVERAGE\n";

    let daily_moving_average_list = [];

    for (let i = 0; i < daily_moving_average_data_list.length - 2; i++)
    {
        let index = i + index_offset;
        let day = day_list[index];
        let daily_moving_average = daily_moving_average_data_list[i];
        daily_moving_average_list.push(day, daily_moving_average);
        daily_moving_average_string += day + "," + (daily_moving_average).toFixed(2) + "\n";
    }
    
    // console.log("daily_moving_average_list", daily_moving_average_list);

    let [curvature_list, curvature_date_list, curvature_data_list] = secondDerivateFromXYList(daily_moving_average_list, daily_moving_interval);
    // console.log("curvature", curvature_list);


    let daily_moving_average_curvature_string = "CURVATURE MOVING AVERAGE DATE,CURVATURE MOVING AVERAGE\n";

    // let curvature_moving_interval = daily_moving_interval;
    // const curvature_index_offset = parseInt(curvature_moving_interval / 2);
    // // let daily_curvature_moving_average_list = centeredMovingAverage(curvature_list, curvature_moving_interval);
    // // console.log("daily_curvature_moving_average_list", daily_curvature_moving_average_list, curvature_moving_interval, curvature_list);

    // // for (let i = 0; i < daily_curvature_moving_average_list.length - 2; i++)
    // // {
    // //     let index = i + curvature_index_offset;
    // //     let day = day_list[index];
    // //     let daily_moving_average = daily_curvature_moving_average_list[i];
    // //     daily_moving_average_curvature_string += day + "," + (daily_moving_average).toFixed(2) + "\n";
    // // }

    for (let i = 0; i < curvature_list.length; i += 2)
    {
        let index = i;
        let day = curvature_list[index];
        let curvature = curvature_list[index + 1];
        daily_moving_average_curvature_string += day + "," + curvature.toFixed(2) + "\n";
    }

    // console.log("daily_moving_average_curvature_string", daily_moving_average_curvature_string);

    let daily_average_string = "DATE,DAILY AVERAGE\n";

    for (let i = 0; i < day_year_data_map.length; i++)
    {
        let day = day_year_data_map[i];
        // let daily_moving_average = daily_moving_average_data_list[i];
        // daily_average_string += day + "," + (daily_moving_average).toFixed(2) + "\n";
    }


    // daily_output_string += daily_moving_average_string;
    daily_output_string += daily_moving_average_string + daily_moving_average_curvature_string;
    let daily_moving_average_fft_string = "DAILY MOVING AVERAGE FFT SPACING,DAILY MOVING AVERAGE FFT MAGNITUDE\n";
    let daily_moving_average_raw_fft_string = daily_moving_average_fft_string;

    if (generate_fft)
    {
        let use_fft = false;
        // let list_to_use = daily_average_list;
        let list_to_use = daily_moving_average_data_list;
        let array_length = list_to_use.length;

        if (use_fft)
        {
            array_length = getNextSmallestPowerOf2(list_to_use.length);
        }
        
        console.log("generate_fft", array_length, list_to_use.length);

        // let daily_moving_average_fft_list = new Array(2**15).fill(0);
        let daily_moving_average_fft_list = new Array(array_length);

        for (let i = 0; i < array_length; i++)
        {
            // daily_moving_average_fft_list[i] = daily_average_list[i];
            daily_moving_average_fft_list[i] = list_to_use[i];
        }

        let daily_moving_average_fft = undefined;

        console.log("daily_moving_average_fft_list\n", daily_moving_average_fft_list);

        if (use_fft)
        {
            daily_moving_average_fft = rfft(daily_moving_average_fft_list);
        }
        else
        {
            daily_moving_average_fft = realDft(daily_moving_average_fft_list);
        }
        // let daily_moving_average_fft = realDft(daily_moving_average_fft_list);
        console.log("daily_moving_average_fft", daily_moving_average_fft);
        const max = Math.max(...daily_moving_average_fft);
        const max_index = daily_moving_average_fft.indexOf(max);
        console.log(max, max_index);
    
        let max_length = Math.min(200, daily_moving_average_fft_list.length);

        for (let i = 1; i < max_length; i++)
        {
            let fft_value = daily_moving_average_fft[i];
            let cycle_count = i;
            let number_of_days = daily_moving_average_fft_list.length / cycle_count;
            let number_of_years = number_of_days / daily_moving_interval;
            console.log(cycle_count, daily_moving_average_fft_list.length, number_of_days, number_of_years);
            daily_moving_average_fft_string += number_of_years.toFixed(2) + "," + fft_value.toFixed(2) + "\n";
            daily_moving_average_raw_fft_string += cycle_count.toFixed(2) + "," + fft_value.toFixed(2) + "\n";
        }
    }

    let year_count_string = "YEAR,YEARLY COUNT\n";
    let year_minimum_string = "YEARLY MINIMUM DATE,YEARLY MINIMUM\n";
    let year_maximum_string = "YEARLY MAXIMUM DATE,YEARLY MAXIMUM\n";
    let year_average_string = "YEAR,RANGE,YEARLY AVERAGE, YEARLY FIRST MINUS LAST\n";
    let yearly_average_list = [];
    let year_list = [];

    for (const [year, year_data] of yearly_data_map)
    {
        let year_string = "";

        if (daily_data_map.size == 0)
        {
            year_string += ",,,";
        }

        year_count_string += (year + 0.5) + "," + year_data.count + "\n";
        year_minimum_string += year_data.minimum_date + "," + year_data.minimum + "\n";
        year_maximum_string += year_data.maximum_date + "," + year_data.maximum + "\n";
        // Yearly range
        year_average_string += (year + 0.5) + "," + (year_data.maximum - year_data.minimum).toFixed(2) + ",";
        let average = year_data.total / year_data.count;
        year_average_string += average.toFixed(2) + ",";
        year_average_string += year_data.first_value - year_data.last_value + "\n";
        // console.log(year, year_data.first_value, year_data.last_value, year_data.first_value - year_data.last_value)
        year_string += year_data.count + ",,";
        year_string += year_data.minimum_date + "," + year_data.minimum + ",,";
        year_string += year_data.maximum_date + "," + year_data.maximum + ",,";
        year_string += (year + 0.5) + "," + (year_data.maximum - year_data.minimum).toFixed(2) + ",";
        year_string += average.toFixed(2);

        yearly_average_list.push(average);
        year_list.push(year);
    }

    let moving_interval = 10;
    let moving_average_list = centeredMovingAverage(yearly_average_list, moving_interval);
    // console.log("moving_average", moving_average, moving_interval, yearly_average_list);
    let moving_average_string = "MOVING AVERAGE DATE, MOVING AVERAGE\n";

    for (let i = 0; i < moving_average_list.length - 2; i++)
    {
        let index = i + index_offset;
        let year = year_list[index];
        let moving_average = moving_average_list[i];
        moving_average_string += (year + 0.5) + "," + (moving_average).toFixed(2) + "\n";
    }

    yearly_output_string = year_count_string + year_minimum_string + year_maximum_string + year_average_string;
    yearly_output_string += moving_average_string;

    writeTextFile(daily_output_file_name, daily_output_string);
    writeTextFile(yearly_output_file_name, yearly_output_string);
    writeTextFile(year_daily_average_filename, year_daily_average_string);
    writeTextFile(year_daily_total_filename, year_daily_total_string);

    if (generate_fft)
    {
        writeTextFile(daily_average_fft_filename, daily_moving_average_fft_string);
        writeTextFile(daily_average_raw_fft_filename, daily_moving_average_raw_fft_string);
    }

    generate_fft = false;

    return [visible_data_csv_string, year_daily_average_string];
}

function writeTextFile(filename, text_string)
{
    if (USER_TIER > USER_TIER_PAID)
    {
        return;
    }

    blob = new Blob( [text_string], { type: "text/plain;charset=utf-8" } );
    saveAs(blob, filename);
}

function buildUrl() 
{
    var url = "index.html?"
    url += "offset_x=" + g_offset.x;
    url += "&offset_y=" + g_offset.y;
    url += "&scale_x=" + g_scale.x;
    url += "&scale_y=" + g_scale.y;
    url += "&country=" + country_select.value;
    url += "&state=" + state_select.value;
    url += "&id=" + series_select.value;
    url += "&type=" + type_select.value;
    url += "&month=" + month_select.value;
    url += "&day=" + day_select.value;
    url += "&units=" + units_select.value;
    // console.log(url);
    return url;
}

function mouseInViewportOrAbove(viewport)
{
    return mouse.y > viewport.y;
}

function mouseInLabelContainer()
{
    if (mouse.y < 0)
    {
        return false;
    }

    if (mouse.x > g_main_viewport.width && mouse.x < (g_main_viewport.width + g_scroll_container_width) && mouse.y < g_main_viewport.height)
    {
        return true;
    }

    return false;
}

function mouseWithinViewport(viewport)
{
    // console.log("mouseWithinViewport mouse viewport", mouse, viewport);
    if (mouse.y < 0)
    {
        return false;
    }

    if (mouse.x >= 0 && mouse.y >= 0 && mouse.x < viewport.width && mouse.y < viewport.height)
    {
        // console.log("In viewport");
        return true;
    }
    else
    {
        // console.log("Not in viewport");
        return false;
    }
}

function getNumericDateFromTextString(date_string)
{
    if (Number.isInteger(date_string) && date_string.toString().length === 6) 
    {
        let year = parseInt(date_string) / 100;
        let month = parseInt(date_string.slice(-2));
        return parseFloat(year) + ((parseFloat(month) - 1) / 12);
    }
    else if (date_string.includes("/"))
    {
        return GraphingUtilities.convertDateToDecimal(date_string);
    }
    
    return parseFloat(date_string);
}

function drawCharts()
{
    console.log("drawCharts");

    if (g_chart_data.length <= MAX_PIE_CHART_BAR_COUNT)
    {
        renderColumnChartWithWebGL(gl, g_column_chart_viewport, g_chart_data);
        renderPieChartWithWebGL(gl, g_pie_chart_viewport, g_chart_data);
    }
    else
    {
        renderColumnChartWithWebGL(gl, g_chart_viewport, g_chart_data);
    }
}

/**
 * Converts a CSV string with various possible delimiters into a standard comma-separated format
 * @param {string} csvString - The input CSV string with unknown delimiter
 * @param {Array<string>} [possibleDelimiters=[',', ';', '\t']] - Array of possible delimiters to check
 * @returns {string} Standard comma-separated CSV string
 */
function convertToStandardCSV(csvString, possibleDelimiters = [',', ';', '\t']) 
{
    if (!csvString || typeof csvString !== 'string') {
      throw new Error('Input must be a non-empty string');
    }
  
    // Detect the delimiter by counting occurrences in the first few lines
    const sampleLines = csvString.split(/\r?\n/).slice(0, 5).join('\n');
    let bestDelimiter = ','; // Default to comma
    let maxCount = 0;
  
    for (const delimiter of possibleDelimiters) {
      // Count occurrences of the delimiter in the sample
      const count = (sampleLines.match(new RegExp(delimiter === '\t' ? '\t' : delimiter, 'g')) || []).length;
      
      if (count > maxCount) {
        maxCount = count;
        bestDelimiter = delimiter;
      }
    }
  
    // If no delimiter was found or the best one is already a comma, return the original
    if (maxCount === 0 || bestDelimiter === ',') {
      return csvString;
    }
  
    // Process the CSV line by line
    const lines = csvString.split(/\r?\n/);
    const processedLines = lines.map(line => {
      // Handle quoted values correctly
      const result = [];
      let inQuotes = false;
      let currentValue = '';
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
          currentValue += char;
        } else if (char === bestDelimiter && !inQuotes) {
          // End of field
          result.push(currentValue);
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      // Add the last field
      result.push(currentValue);
      
      // Join with commas
      return result.join(',');
    });
  
    return processedLines.join('\n');
  }
  
  // Example usage:
  // const input = 'name;age;city\nJohn;30;New York\nJane;25;Los Angeles';
  // const output = convertToStandardCSV(input);
  // console.log(output);
  // Output: name,age,city
  //         John,30,New York
  //         Jane,25,Los Angeles

function convertToCSV(inputString) 
{
    // Split the input string into rows by newlines
    const rows = inputString.trim().split('\n');
    
    // Process each row
    const csvRows = rows.map(row => {
        // Split by tabs or semicolons
        const fields = row.split(/[\t;]/);
        
        // Clean and quote fields
        const csvFields = fields.map(field => {
            const trimmedField = field.trim();
            // If field contains comma, quote, or newline, wrap it in quotes
            if (trimmedField.includes(',') || trimmedField.includes('"') || trimmedField.includes('\n')) {
                // Escape existing quotes by doubling them
                return `"${trimmedField.replace(/"/g, '""')}"`;
            }
            return trimmedField;
        });
        
        // Join fields with commas
        return csvFields.join(',');
    });
    
    // Join rows with newlines
    return csvRows.join('\n');
}

// Example usage:
// const input = "Name\tAge;City\nJohn Doe\t25;New York\nJane Smith;30\tLos Angeles";
// const csv = convertToCSV(input);
// console.log(csv);
// Output:
// Name,Age,City
// "John Doe",25,"New York"
// "Jane Smith",30,"Los Angeles"

function extractLatLonFromCSV(csvString) {
    /**
     * Extracts latitude and longitude from a CSV string with case-insensitive headers.
     *
     * @param {string} csvString - CSV string containing incident data.
     * @returns {Array} - Array containing two elements:
     *                    1. Array of [latitude, longitude] pairs for each valid incident
     *                    2. Array of objects containing all fields except lat/lon for each valid incident
     */
    
    // Split CSV into lines and remove empty lines
    const lines = csvString.trim().split('\n').filter(line => line.trim() !== '');
    
    // Parse headers (first line)
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Find latitude and longitude column indices (case-insensitive)
    let latIndex = -1, lonIndex = -1;
    headers.forEach((header, index) => {
      if (header.toLowerCase() === 'latitude') latIndex = index;
      if (header.toLowerCase() === 'longitude') lonIndex = index;
    });
    
    // If either latitude or longitude header is missing, return empty arrays
    if (latIndex === -1 || lonIndex === -1) {
      console.warn('Latitude or Longitude header not found.');
      return [[], []];
    }
    
    const latLonPairs = [];
    const otherData = [];
    
    // Parse rows (skip header) and extract data
    lines.slice(1).forEach(line => {
      const values = line.split(',').map(value => value.trim());
      
      // Ensure the row has enough columns
      if (values.length <= latIndex || values.length <= lonIndex) return;
      
      // Convert to numbers
      const lat = parseFloat(values[latIndex]);
      const lon = parseFloat(values[lonIndex]);
      
      // Only process valid lat/lon pairs
      if (!isNaN(lat) && !isNaN(lon)) {
        // Add the lat/lon pair
        latLonPairs.push([lat, lon]);
        
        // Create an object with all fields EXCEPT lat/lon from this row
        const rowData = {};
        headers.forEach((header, index) => {
          // Skip the latitude and longitude columns
        //   if (index !== latIndex && index !== lonIndex && index < values.length) 
          {
            rowData[header] = values[index];
          }
        });
        otherData.push(rowData);
      }
    });
    
    return [latLonPairs, otherData];
}

function addGoogleMarkers(text)
{
    let [lat_lon_pairs, other_data] = extractLatLonFromCSV(text);
    console.log("addGoogleMarkers lat_lon_pairs", lat_lon_pairs);

    let other_data_strings = [];

    for (let i = 0; i < lat_lon_pairs.length; i++)
    {
        let data = other_data[i];
        let other_data_string = "";

        for (let [key, value] of Object.entries(data)) 
        {
            // console.log(key, ":", value); // Outputs: a, b, c
            other_data_string += key + ": " + value + "<br>";
        }

        other_data_strings.push(other_data_string);
    }


    if (USER_TIER <= USER_TIER_PAID && lat_lon_pairs.length > 0)
    {
        clearAllGoogleMapMarkers(g_google_map_marker_list);
        g_google_map_marker_list.length = 0;
        
        for (let i = 0; i < lat_lon_pairs.length  && i <= MAX_GOOGLE_MARKERS; i++)
        {
            let item = lat_lon_pairs[i];
            let latitude = item[0];
            let longitude = item[1];

            if (isValidLatLng(latitude, longitude))
            {
                let new_google_map_marker = addGoogleMapMarker(latitude, longitude, ".", 5);
            }
        }
    
        // g_google_map_marker_list.forEach(marker => addLabelClickHandler(marker, onGoogleMapChartLabelClick));

        for (let i = 0; i < g_google_map_marker_list.length; i++)
        {
            let marker = g_google_map_marker_list[i];
            addLabelClickHandler(marker, onGoogleMapChartLabelClick);
            // Create an InfoWindow

            const infowindow = new google.maps.InfoWindow({
                content: other_data_strings[i],
                disableAutoPan: true
            });

            // Show InfoWindow on marker hover
            marker.addListener("mouseover", () => 
            {
                // console.log("mouseover opening infowindow");
                infowindow.open(g_google_map, marker);
            });

            // Close InfoWindow when mouse leaves marker
            marker.addListener("mouseout", () => 
            {
                if (!infowindow.clicked)
                {
                    // console.log("mouseout closing infowindow");
                    infowindow.close();
                }
            });

            // Close InfoWindow when mouse leaves marker
            marker.addListener("click", () => 
            {
                console.log("click opening infowindow");
                infowindow.open(g_google_map, marker);
                infowindow.clicked = true;
            });

            infowindow.addListener('closeclick', () => 
            {
                console.log('InfoWindow close button was clicked');
                infowindow.clicked = false;
            });
        }

        centerGoogleMap(g_google_map_marker_list, g_google_map);
        // let center_zoom = fitMapToMarkers(g_google_map_marker_list, g_google_map);

        // // Check if the function returned valid results
        // if (center_zoom.center && center_zoom.zoom !== null && g_google_map !== undefined)  
        // {
        //     // Set the map center to the calculated center
        //     g_google_map.setCenter(center_zoom.center);
            
        //     // Set the map zoom to the calculated zoom level
        //     g_google_map.setZoom(center_zoom.zoom);
        // } else {
        //     console.error("Failed to calculate map center and zoom");
        // }

        showGoogleMap();
    }
}

function centerGoogleMap(list, map)
{
    let center_zoom = fitMapToMarkers(list, map);

    // Check if the function returned valid results
    if (center_zoom.center && center_zoom.zoom !== null && map !== undefined)  
    {
        // Set the map center to the calculated center
        map.setCenter(center_zoom.center);
        
        // Set the map zoom to the calculated zoom level
        map.setZoom(center_zoom.zoom);
    } 
    else 
    {
        console.error("Failed to calculate map center and zoom");
    }
}

function addSeriesFromTextString(text, type = GENERIC_SERIES_TYPE)
{   
    let text1 = text.replace(/N[\/\\]A/g, "");
    let text2 = removeCommasInQuotes(text1);
    let text3 = tsvToCsv(text2);

    if (type == HYBRID_SERIES_TYPE && CHART_TYPE == COMPLEX_CHART_TYPE)
    {
        addGoogleMarkers(g_chart_text);
        removeGridLabels();
        return;
    }

    let rows = text3.split("\n");
    let columns = rows[0].split(",");

    if (columns.length < 2)
    {
        // return;
    }
    
    g_chart_text = convertToStandardCSV(text3);
    // console.log("addSeriesFromTextString\n", g_chart_text);
    CHART_TYPE = suggestChartType(g_chart_text);
    console.log("addSeriesFromTextString chart type = ", CHART_TYPE); 

    if (CHART_TYPE == COMPLEX_CHART_TYPE)
    {
        removeGridLabels();
    }

    if (CHART_TYPE == COLUMN_CHART_TYPE)
    {
        g_chart_data = stringToWebGLChartData(g_chart_text);

        for (let i = 0; i < g_chart_data.length; i++)
        {
            let data_object = g_chart_data[i];

            g_chart_color_data_map.set(data_object.color, data_object);
        }

        console.log("addSeriesFromTextString chart_data\n", g_chart_data);
        setGraphingMode(GRAPHING_MODE_CHARTS);
        removeGridLabels();
        drawGraph();
        setupCharts(g_chart_viewport);
        clearChartLabels();
        drawCharts();
        addGoogleMarkers(g_chart_text);
        return;
    }
    else if (CHART_TYPE == UNKNOWN_CHART_TYPE)
    {
        if (getGraphingMode() == GRAPHING_MODE_CHARTS)
        {
            clearChart(gl, g_chart_viewport);
        }
        else if (getGraphingMode() == GRAPHING_MODE_TIME_SERIES)
        {
            clearGraph();
            removeGridLabels();
        }

        setGraphingMode(UNKNOWN_CHART_TYPE);
        console.log(UNKNOWN_CHART_TYPE);
        addGoogleMarkers(g_chart_text);
    
        return; 
    }

    setGraphingMode(GRAPHING_MODE_TIME_SERIES);

    console.log("addSeriesFromTextString", suggestChartType(text));
    console.log("addSeriesFromTextString", text.slice(0, 200));
    text = text.replace(/\t+/g, ","),
    text = text.replace(/,+\n/g, '\n');
    text = removeNaNLines(text);
    let lines = text.split("\n");
    lines = g_chart_text.split("\n");
    let main_title = "";
    let horizontal_title = "";
    let vertical_title = "";



    // Parse and remove comment lines
    while (lines[0].substring(0,1) == "#" || lines[0].length == 0)
    {
        if (lines[0].substring(0,1) == "#")
        {
            let line_content = lines[0].substring(1);

            if (line_content.includes(MAIN_TITLE_STRING))
            {
                main_title = line_content.split(MAIN_TITLE_STRING)[1].trim().replace(/["]/g, '');
                main_title_input.value = main_title;
            }
            else if (line_content.includes(HORIZONTAL_TITLE_STRING))
            {
               horizontal_title = line_content.split(HORIZONTAL_TITLE_STRING)[1].trim().replace(/["]/g, '');
               horizontal_axis_title_input.value = horizontal_title;
            }
            else if (line_content.includes(VERTICAL_TITLE_STRING))
            {
                vertical_title = line_content.split(VERTICAL_TITLE_STRING)[1].trim().replace(/["]/g, '');
                vertical_axis_title_input.value = verticalTitleStringToPlainText(vertical_title);
            }
        }

        lines.shift();
    }

    main_title_label.innerHTML = main_title;
    y_axis_label.innerHTML = vertical_title;
    x_axis_label.innerHTML = horizontal_title;

    let first_data_line = 0;
    let first_field_is_numeric = false;

    // Find the first line with data
    for (let i = 1; i < lines.length; i++)
    {
        let line = lines[i];
        let fields = line.split(/[,;]/).map(field => field.trim());;
        let all_fields_are_numbers = true;
        first_field_is_numeric = !Number.isNaN(fields[0]);

        for (let j = 0; j < fields.length; j++)
        {
            if (isNaN(Number(fields[j])))
            {
                all_fields_are_numbers = false;
                break;
            }
        }

        if (all_fields_are_numbers && line != "")
        {
            first_data_line = i;
            break;
        }
    }

    if (lines.length < first_data_line + 1)
    {
        console.log("addSeriesFromTextString", "no data found");
        return null;
    }

    // Remove comment lines.  Not sure why this is needed again
    lines.splice(0, first_data_line - 1);

    while (lines[0].substring(0,1) == "#" || lines[0].length == 0)
    {
        lines.shift();
    }

    // console.log(lines);
    columns = lines[0].split(/[,;]/).map(field => field.trim());
    let number_of_series = 0;

    // text = text.slice(lines[0].length + 1);
    let user_series_list = [];
    let series_data = [];
    let series_names = [];
    let series_id = "";
    let series_country = "";
    let series_latitude = "";
    let series_longitude = "";
    let series_elevation = "";
    let calculate_date_from_year_month = false;
    let calculate_date_from_year_month_day = false;
    let first_data_column = 1;

    if (columns[0].includes("Year") && columns[1].includes("Month") && !columns[2].includes("Day"))
    {
        calculate_date_from_year_month = true;
        first_data_column = 2;
    }
    else if (columns[0].includes("Year") && columns[1].includes("Month") && columns[2].includes("Day"))
    {
        calculate_date_from_year_month_day = true;
        first_data_column = 3;
    }
    else if (columns[0].toLowerCase() == "latitude")
    {
        first_data_column = 0;
    }

    // Create a list of series names and empty lists of series data
    for (let i = first_data_column; i < columns.length; i++)
    {
        if (columns[i].includes("ID:"))
        {
            series_id = columns[i].split("ID:")[1]
        }
        else if (columns[i].includes("country:"))
        {
            series_country = columns[i].split("country:")[1]
        }
        else if (columns[i].includes("latitude:"))
        {
            series_latitude = columns[i].split("latitude:")[1]
        }
        else if (columns[i].includes("longitude:"))
        {
            series_longitude = columns[i].split("longitude:")[1]
        }
        else if (columns[i].includes("elevation:"))
        {
            series_elevation = columns[i].split("elevation:")[1]
        }
        else
        {
            let series_name = columns[i]
            series_names.push(series_name);
            series_data.push([]);
            number_of_series++;
        }
    }

    let metadata = {};


    // Collect the data line by line
    for (let i = 1; i < lines.length; i++)
    {
        // console.log(lines[i]);
        let fields = lines[i].split(/[,;]/).map(field => field.trim());
        // console.log(fields);
        let date_string = fields[0];
        let date = undefined;

        if (calculate_date_from_year_month)
        {
            let year = parseFloat(fields[0]);
            let month = parseFloat(fields[1]);
            date_string = GraphingUtilities.convertMonthDayYearToDecimal(month, 1, year).toString();
        }
        else if (calculate_date_from_year_month_day)
        {
            let year = parseFloat(fields[0]);
            let month = parseFloat(fields[1]);
            let day = parseFloat(fields[2]);

            date_string = GraphingUtilities.convertMonthDayYearToDecimal(month, day, year).toString();
        }

        for (let j = 0; j < number_of_series; j++)
        {
            let data = fields[j + first_data_column];

            // if (first_field_is_numeric && Number.isNaN(data))
            // {
            //     continue;
            // }

            let NO_DATA = "-99999";

            if (date_string == "" || data == NO_DATA)
            {

            }
            else if (Number.isInteger(parseInt(date_string)) && !date_string.includes(".") && date_string.length == 6) 
            {
                let year = parseInt(parseInt(date_string) / 100);
                let month = parseInt(date_string.slice(-2));
                // NCDC uses month 12 for a whole year
                // let float_date = GraphingUtilities.convertMonthDayYearToDecimal(month, 1, year);
                let float_date = GraphingUtilities.convertMonthDayYearToDecimal(1, 1, year);
                series_data[j].push(float_date);
                series_data[j].push(data);
            }
            else if (hasDateSubstring(date_string))
            {
                let [year, month, day] = date_string.split("-");
                series_data[j].push(GraphingUtilities.convertMonthDayYearToDecimal(Number(month), Number(day), Number(year)));
                series_data[j].push(data);
            }
            else if (date_string.includes("/"))
            {
                series_data[j].push(GraphingUtilities.convertDateToDecimal(date_string));
                series_data[j].push(data);
            }
            else if (!isNaN(parseFloat(date_string)))
            {
                series_data[j].push(date_string);
                series_data[j].push(data);
            }
            else
            {
                // Found a new group of series. Save the data for the series already parsed
                metadata.country = series_country;
                metadata.id = series_id;
                metadata.latitude = series_latitude;
                metadata.longitude = series_longitude;
                metadata.elevation = series_elevation;
                createSeriesFromNameDataLists(series_names, series_data, metadata, user_series_list, type);
                let draw_series = i == lines.length - 1;
                addNewSeriesFromList(user_series_list, draw_series);

                columns = lines[i].split(",");
                user_series_list.length = 0;
                series_data.length = 0;
                series_names.length = 0;
                number_of_series = 0;

                for (let i = 1; i < columns.length; i++)
                {
                    if (columns[i].includes("ID:"))
                    {
                        series_id = columns[i].split("ID:")[1]
                    }
                    else if (columns[i].includes("country:"))
                    {
                        series_country = columns[i].split("country:")[1]
                    }
                    else if (columns[i].includes("latitude:"))
                    {
                        series_latitude = columns[i].split("latitude:")[1]
                    }
                     else if (columns[i].includes("longitude:"))
                    {
                        series_longitude = columns[i].split("longitude:")[1]
                    }
                    else if (columns[i].includes("elevation:"))
                    {
                        series_elevation = columns[i].split("elevation:")[1]
                    }
                    else
                    {
                        series_names.push(columns[i]);
                        series_data.push([]);
                        number_of_series++;
                    }
                }
            
                break;
            }
        }
    }

    createSeriesFromNameDataLists(series_names, series_data, metadata, user_series_list, type);
    let draw_series = true;
    unselectOptionByName("Annual Average");
    addNewSeriesFromList(user_series_list, draw_series);

    return user_series_list;

    // createSelectedSeriesList();
    // let series_list = g_selected_series_list;

    // if (usingUserData())
    // {
    //     series_list = user_series_list;
    //     createSeriesFromNameDataLists(series_names, series_data, metadata, series_list);
    //     let draw_series = true;
    //     // addNewSeries(series_list, draw_series);
    //     addNewSeries(user_series_list, draw_series);
    // }
}

function isValidLatLng(lat, lng) 
{
    // Check if inputs are numbers and not NaN
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
        return false;
    }
    
    // Latitude: -90 to 90 degrees
    // Longitude: -180 to 180 degrees
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

function createSeriesFromNameDataLists(series_names, series_data, metadata, series_list, type)
{
    // console.log(series_names, series_data);

    // if (USER_TIER <= USER_TIER_PAID)
    // {
    //     console.log("populateStationList adding google map marker", station.latitude, station.longitude, station.name);
    //     let new_google_map_marker = addGoogleMapMarker(station.latitude, station.longitude, station.name);
    //     station.google_map_marker = new_google_map_marker;
    // }

    let latitude_list = [];
    let longitude_list = [];
    
    for (let i = 0; i < series_names.length; i++)
    {
        let name = series_names[i];
        console.log("createSeriesFromNameDataLists", name);

        if (name.toUpperCase() == "LATITUDE")
        {
            latitude_list = series_data[i];
        }
        else if (name.toUpperCase() == "LONGITUDE")
        {
            longitude_list = series_data[i];
        }
        let units = "";

        if (name.toLowerCase() == "latitude")
        {   
            // Don't plot latitude vs. latitude
            if (series_data[i][0] == series_data[i][1])
            {
                continue;
            }
        }

        let new_series = createSeriesFromData(name, units, series_data[i], metadata);
        new_series.series_type = type;
        series_list.push(new_series);
    }

    if (CHART_TYPE == COMPLEX_CHART_TYPE)
    {
        addGoogleMarkers(g_chart_text);
        removeGridLabels();
    }
    else
    {
        clearAllGoogleMapMarkers(g_google_map_marker_list); 
        g_google_map_marker_list.length = 0;
        let marker_count = 0;
    
        // if (latitude_list[0])
    
        for (let i = 0; i < latitude_list.length && i < longitude_list.length && marker_count < MAX_GOOGLE_MARKERS; i++)
        {
            let latitude = latitude_list[i];
            let longitude = longitude_list[i];
    
            if (latitude == longitude)
            {
                // This is for a special case of data which is only latitude and longitude
                continue;
            }
    
            // console.log("createSeriesFromNameDataLists", latitude, longitude);
    
            if (USER_TIER <= USER_TIER_PAID)
            {
                if (isValidLatLng(parseFloat(latitude), parseFloat(longitude)))
                {
                    console.log("createSeriesFromNameDataLists adding google map marker", latitude, longitude, name);
                    let new_google_map_marker = addGoogleMapMarker(latitude, longitude, ".", 5);
                    marker_count++;
                }
            }
        }
    }


    if (USER_TIER <= USER_TIER_PAID)
    {
        g_google_map_marker_list.forEach(marker => addLabelClickHandler(marker, onGoogleMapSeriesLabelClick));
        centerGoogleMap(g_google_map_marker_list, g_google_map);
        showGoogleMap();
    }

}


function addClipboardData(text)
{
    g_new_user_data_loaded = true;
    addSeriesFromTextString(text);
    user_file_name = "";
}

function addClipboardDataButtonPressed()
{
    console.log("addClipboardDataButtonPressed");

    if (navigator.clipboard) {
        // Attempt to read the clipboard content
        navigator.clipboard.readText()
          .then(text => 
          {
            if (text.length >= 4)
            {
                addClipboardData(text);
            }
          })
          .catch(err => {
            console.error('Failed to read clipboard content:', err);
          });
      } else {
        console.error('Clipboard API is not available in this browser.');
      }
}


function addUserData()
{
    console.log("addUserData", arguments.callee.name);
    let file_input = document.createElement("input");
    file_input.type = "file";
    file_input.name = "file";
    file_input.id = "file_input";
    file_input.accept = '.csv, text/csv';
    file_input.addEventListener('change', handleAddUserDataFileSelect, false);
    console.log("addUserData", "file_input.change()");
    file_input.click();
}

function handleAddUserDataFileSelect(event)
{
    console.log("handleAddUserDataFileSelect");
    const selected_file = event.target.files[0];

    if (selected_file) 
    {
        console.log(selected_file.name);
        addUserDataFile(selected_file);
        // user_file_name = selected_file.name;
        // const file_reader = new FileReader();
        // file_reader.onload = handleUserDataFileLoaded;
        // file_reader.readAsText(selected_file);
    }
}

function addUserDataFile(file)
{
    console.log("addUserDataFile", file.name);
    user_file_name = file.name;
    const file_reader = new FileReader();
    file_reader.onload = handleUserDataFileLoaded;
    file_reader.readAsText(file);
}

/**
 * Sorts an array in format [x1, y1, x2, y2, ...] by x or y values
 * Converts string values to floats before sorting
 * @param {Array} coords - Array of coordinates in format [x1, y1, x2, y2, ...]
 * @param {string} sortBy - Sort by 'x' (default) or 'y'
 * @param {boolean} ascending - True for ascending order (default), false for descending
 * @returns {Array} Sorted array in the same format
 */
function sortXYArray(coords, sortBy = 'x', ascending = true) 
{
    // Check if array has even length (pairs of x,y)
    if (coords.length % 2 !== 0) {
      throw new Error('Input array must have an even number of elements');
    }
    
    // Convert flat array to array of pairs, converting strings to floats
    const pairs = [];
    for (let i = 0; i < coords.length; i += 2) {
      // Convert to float if values are strings
      const x = typeof coords[i] === 'string' ? parseFloat(coords[i]) : coords[i];
      const y = typeof coords[i + 1] === 'string' ? parseFloat(coords[i + 1]) : coords[i + 1];
      pairs.push([x, y]);
    }
    
    // Determine sort index (0 for x, 1 for y)
    const sortIndex = sortBy.toLowerCase() === 'y' ? 1 : 0;
    
    // Sort the pairs
    pairs.sort((a, b) => {
      return ascending 
        ? a[sortIndex] - b[sortIndex] 
        : b[sortIndex] - a[sortIndex];
    });
    
    // Convert back to flat array in the original format (string or number)
    const result = [];
    for (let i = 0; i < pairs.length; i++) {
      // Preserve the original type (string or number)
      const originalXType = typeof coords[i * 2] === 'string';
      const originalYType = typeof coords[i * 2 + 1] === 'string';
      
      // Push with original type
      result.push(
        originalXType ? pairs[i][0].toString() : pairs[i][0],
        originalYType ? pairs[i][1].toString() : pairs[i][1]
      );
    }
    
    return result;
}

function createSeriesFromData(name, units, data, metadata, type)
{
    // console.log("createSeriesFromData", name);
    let user_series = new Series(name, units, metadata);
    user_series.type = type;

    let smallest_delta_x = Number.MAX_SAFE_INTEGER;
    let previous_x = undefined;

    // console.log(data);

    let sorted_data = sortXYArray(data);

    for (let i = 0; i < sorted_data.length; i++)
    {
        let index = i * 2;
        let x = parseFloat(sorted_data[index]);
        let y = parseFloat(sorted_data[index+1]);
        // console.log(`i ${i} x ${x} y ${y}`);

        if (isNaN(x) || isNaN(y))
        {
            continue;
        }

        if (previous_x !== undefined)
        {
            const delta_x = x - previous_x;

            if (delta_x < smallest_delta_x)
            {
                smallest_delta_x = delta_x;
                console.log(`x ${x} previous_x ${previous_x}`);
            }
        }

        if (!isNaN(x))
        {
            previous_x = x;
        }

        user_series.minimum.x = Math.min(x, user_series.minimum.x);
        user_series.maximum.x = Math.max(x, user_series.maximum.x);
        user_series.minimum.y = Math.min(y, user_series.minimum.y);
        user_series.maximum.y = Math.max(y, user_series.maximum.y);
    
        if (!isNaN(x) && !isNaN(y) )
        {
            user_series.graph_positions.push(x, y);
            user_series.graph_indices.push(i);
        }
    }

    user_series.smallest_delta_x = smallest_delta_x;
    console.log("smallest_delta_x", user_series.smallest_delta_x);

    loadVertexData(user_series.position_buffer, user_series.graph_positions);
    return user_series;
}

function addSeriesToSeriesSelect(series, set_selected)
{
    var option = newOption(series.name, series.name);
    // series.id = series.name;
    series_select.appendChild(option);
    addToOptionSeriesMap(option, series);
    console.log("addSeriesToSeriesSelect set option series", option, series);

    if (set_selected)
    {
        selectOption(option);
    }

    return option;
}

function addToOptionSeriesMap(option, series)
{
    console.log("addToOptionSeriesMap", option.innerHTML, series.name);
    g_option_series_map.set(option, series);
    series.option = option;
}

function addNewSeriesFromList(new_series_list, draw_series)
{
    if (new_series_list.length == 0)
    {
        return;
    }

    let first_series = new_series_list[0];

    if (first_series === undefined)
    {
        return;
    }

    if (usingUserData() || first_series.series_type == HYBRID_SERIES_TYPE)
    {
        use_whole_year_labels = false;
    }
    else
    {
        setUsingUserData();
        series_select.length = 0;
    }

    for (let i = 0; i < new_series_list.length; i++)
    {
        let user_series = new_series_list[i];

        // console.log("addNewSeriesFromList computeFFT", computeFFT(user_series.graph_positions));
        g_user_series_list.push(user_series);
        let select_option = true;
        addSeriesToSeriesSelect(user_series, select_option); 
    }

    // setUsingUserData();
    createSelectedSeriesList()

    if (draw_series)
    {
        prepareToDrawAfterDataLoaded();

        if (!screenLocked())
        {
            resetZoom();
        }
    }
    // document.dispatchEvent(draw_scene_event);
}

function screenLocked()
{
    return lock_screen_checkbox.checked;
}

function lockScreen()
{
    lock_screen_checkbox.checked = true;
}

function unlockScreen()
{
    lock_screen_checkbox.checked = false;
}

function handleUserDataFileLoaded(event)
{
    console.log("handleUserDataFileLoaded");
    var file_contents = event.target.result;
    g_new_user_data_loaded = true;

    if (!usingUserData())
    {
        // option_series_map.clear();
        // console.log("handleUserDataFileLoaded cleared option_series_map");
    }
    
    addSeriesFromTextString(file_contents);

    // y_axis_label.innerHTML = "";
}

function updateSelectedSeriesList()
{
    // console.log("updateSelectedSeriesList called from", arguments.callee.caller.toString());
    // console.log("updateSelectedSeriesList option_series_map", option_series_map);
    
    g_selected_series_list.length = 0;

    for (var i = 0; i < series_select.length; i++)
    {
        var option = series_select[i];
        // console.log("updateSelectedSeriesList", i, option.style.backgroundColor)

    // for (const [option, series] of option_series_map)
    // {
        if (optionIsSelected(option))
        {
            let series = g_option_series_map.get(option);

            if (series === undefined)
            {
                console.log(`updateSelectedSeriesList: ${option.value} does not have a matching series`)
                return;
            }
            else
            {
                // console.log(`updateSelectedSeriesList ${option.value}`);
            }

            g_selected_series_list.push(series);
            // console.log(`updateSelectedSeriesList pushing ${series.name}`);
        }
    }

    // console.log(`selected_series_list ${selected_series_list}`);
}

var ten_millisecond_activity_busy = false;

async function tenMillisecondTimer()
{
    if (ten_millisecond_activity_busy) 
    {
        console.log("tenMillisecondTimer ten_millisecond_activity_busy");
        return;
    }
    
    ten_millisecond_activity_busy = true;

    try 
    {
        await tenMillisecondActivity();
    } 
    finally 
    {
        ten_millisecond_activity_busy = false;
    }
}

function tenMillisecondActivity()
{
    // console.log(`tenMillisecondActivity() offset : ${offset.x} ${offset.y} scale ${scale.x}  ${scale.y}`);
    let graph_state = new GraphState();
    let state_changed =    graph_state.notEqual(current_graph_state) 
                        || key_pressed_since_last_timeout 
                        || key_released_since_last_timeout 
                        || button_pressed_since_last_timeout;

    if (state_changed)
    {
        console.log("STATE CHANGED");
    }

    if (current_graph_state !== null && state_changed)
    {
        let show_state_differences = false;

        if (show_state_differences)
        {
            graph_state.difference(current_graph_state);
        }

        // console.log("tenMillisecondTimer", "graph_state.offset.x", graph_state.offset.x, "state_changed", state_changed, 
        // "state_changed_since_last_timeout", state_changed_since_last_timeout,
        // "mouse.pressed_button", mouse.pressed_button,
        // "key_pressed_since_last_timeout", key_pressed_since_last_timeout,
        // "button_pressed_since_last_timeout", button_pressed_since_last_timeout
        // );
    }

    // console.log("tenMillisecondTimer mouse.pressed_button =", mouse.pressed_button); 
    // console.log(`tenMillisecondActivity current_pressed_keys "${current_pressed_keys}"`);

    if ((state_changed || state_changed_since_last_timeout) 
         && mouse.pressed_button == NO_BUTTON 
         && getGraphingMode() == GRAPHING_MODE_TIME_SERIES
         && mouseWithinViewport(g_main_viewport)
         && (current_pressed_keys == "" || g_visible_count < visible_count_statistics_threshold)
       ) 
    {
        console.log("tenMillisecondActivity state_changed || state_changed_since_last_timeout", state_changed, state_changed_since_last_timeout);
        updateSelectedSeriesList();
        console.log("calling updateStatistics() from tenMillisecondTimer()");
        updateStatistics()
        document.dispatchEvent(draw_scene_event);
        updateUrl();
    }

    key_pressed_since_last_timeout = false;
    key_released_since_last_timeout = false;
    button_pressed_since_last_timeout = false;
    current_graph_state = graph_state;
    state_changed_since_last_timeout = false;   
}


class Series
{
    constructor(name, y_units, metadata)
    {
        this.series_type = GENERIC_SERIES_TYPE;
        this.name = name.trim();
        this.y_units = y_units;
        this.id = metadata.id;
        this.position_buffer = gl.createBuffer();
        this.index_buffer = gl.createBuffer();
        this.graph_positions = [];
        this.graph_indices = [];
        this.graph_index_list = [];
        this.associated_bar_chart_array = [];
        this.associated_bar_chart_scaling = 100;
        this.country = metadata.country;
        this.latitude = metadata.latitude;
        this.longitude = metadata.longitude;
        this.elevation = metadata.elevation;

        this.minimum = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
        this.maximum = new Vec2(Number.MIN_VALUE, Number.MIN_VALUE);
        this.visible_point_list = [];
        this.visible_minimum = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
        this.visible_maximum = new Vec2(Number.MIN_VALUE, Number.MIN_VALUE);

        this.color = randomPointColor();  
        this.original_color = _.cloneDeep(this.color);
        // console.log(this.color);
    }
}

function googleEarth()
{
    if (last_hovered_series === null)
    {
        console.log("googleEarth no series selected");
        return;
    }

    // https://earth.google.com/web/search/40.8997+-97.0908
    // https://earth.google.com/web/@37.8199,-122.4783,0a,0d,35y,0h,0t,0r
    // var url = "https://earth.google.com/web/" + "@" + last_hovered_series.latitude + "," + last_hovered_series.longitude + ",1000a,0d,35y,0h,0t,0r";
    // let url = `https://earth.google.com/web/@${last_hovered_series.latitude.toString().trim()},${last_hovered_series.longitude.toString().trim()},1000a,0d,35y,0h,0t,0r`;

    // https://www.google.com/maps/place/39.14220403,-77.70939688/@39.14220403,-77.70939688,17z/data=!3m1!1e3
    let latitude = last_hovered_series.latitude.toString().trim();
    let longitude = last_hovered_series.longitude.toString().trim();
    let url = `https://www.google.com/maps/place/${latitude},${longitude}/@${latitude},${longitude},17z/data=!3m1!1e3`;
    console.log(`"${url}"`, last_hovered_series);
    window.open(url, "_blank");
}

class GraphState
{
    constructor()
    {
        this.offset = _.cloneDeep(g_offset);
        this.scale = _.cloneDeep(g_scale);
        this.plot_trend = plot_trend_checkbox.checked;
        this.series_select = series_select.selectedIndex;
        this.type_select = type_select.selectedIndex;
        this.month_select = month_select.selectedIndex;
        this.day_select = day_select.selectedIndex;
        this.pressed_button = mouse.pressed_button;

        // this.selected_series_list = _.cloneDeep(selected_series_list);
        // this.selected_month_list = _.cloneDeep(selected_month_list);
        // this.selected_day_list = _.cloneDeep(selected_day_list);
    }

    notEqual(other)
    {
        return !this.equals(other);
    }

    equals(other)
    {
        if (_.isEqual(this, other))
        {
            return true;
        }

        return false;
    }

    difference(other)
    {
        if (this.offset != other.offset)
        {
            console.log("GraphState.difference offset", this.offset, other.offset);
        }
        if (this.scale != other.scale)
        {
            console.log("GraphState.difference scale", this.scale, other.scale);
        }
        if (this.plot_trend != other.plot_trend)
        {
            console.log("GraphState.difference plot_trend", this.plot_trend, other.plot_trend);
        }
        if (this.series_select != other.series_select)
        {
            console.log("GraphState.difference series_select", this.series_select, other.series_select);
        }
        if (this.type_select != other.type_select)
        {
            console.log("GraphState.difference type_select", this.type_select, other.type_select);
        }
        if (this.month_select != other.month_select)
        {
            console.log("GraphState.difference month_select", this.month_select, other.month_select);
        }
        if (this.day_select != other.day_select)
        {
            console.log("GraphState.difference day_select", this.day_select, other.day_select);
        }
        if (this.pressed_button != other.pressed_button)
        {
            console.log("GraphState.difference pressed_button", this.pressed_button, other.pressed_button);
        }
    }
}

function sortedIndex(array, value) 
{
    let low = 0;
    let high = array.length;

    while (low < high) 
    {
        let mid = (low + high) >>> 1;

        if (array[mid] < value)
        {
            low = mid + 1;
        }
        else 
        {
            high = mid;
        }
    }

    return low;
}

function getGenerateDailyStatistics()
{
    return true;
}

function doNormalize()
{
    if (normalize_checkbox.checked)
    {
        return true;
    }

    return false;
}



function findKeyByValue(map, value_to_find) 
{
    for (let [key, value] of map.entries()) 
    {
        if (value === value_to_find) 
        {
            return key; // Return the first key that matches the value
        }
    }

    return undefined; // Return undefined if no match is found
}

function numberOfGenericOptions(select_element, all_values = ["ALL", "ANNUAL AVERAGE"]) 
{
    const options = Array.from(select_element.options);

    let number_of_generic_options = 0;

    for (let option of options)
    {
        if (all_values.includes(option.value.toUpperCase()) || all_values.includes(option.text.toUpperCase()))
        {
            number_of_generic_options++;
        }
    }

    return number_of_generic_options;
}

// function centerScrollingContainer(scroll_container, entry_number) 
// {
//     if (!scroll_container || entry_number <= 0) return;
    
//     const entries = scroll_container.children;

//     if (entries.length < entry_number) return;
    
//     const targetEntry = entries[entry_number - 1]; 
//     const containerHeight = scroll_container.clientHeight;
//     const entryHeight = targetEntry.offsetHeight;
    
//     const scrollPos = targetEntry.offsetTop - (containerHeight / 2) + (entryHeight / 2);
//     scroll_container.scrollTop = scrollPos;
// }

function centerScrollingContainer(scroll_container, entry_number) {
    if (!scroll_container || entry_number <= 0) return;
    
    const entries = scroll_container.children;
    if (entries.length < entry_number) return;
    
    const targetEntry = entries[entry_number - 1];
    const containerHeight = scroll_container.clientHeight;
    const entryHeight = targetEntry.offsetHeight;
    
    // Calculate desired scroll position
    let scrollPos = targetEntry.offsetTop - (containerHeight / 2) + (entryHeight / 2);
    
    // Get maximum possible scroll position
    const maxScroll = scroll_container.scrollHeight - containerHeight;
    
    // Ensure scroll position doesn't exceed bounds
    scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));
    
    scroll_container.scrollTop = scrollPos;
}




function createLabel(scroll_container, name, color)
{
    let label_container = document.createElement("div");

    label_container.style.position = "relative"; // For absolute positioning of the button
    label_container.style.width = g_scroll_container_width.toString() + "px";
    label_container.style.marginBottom = "2px"; 

    let series_label = document.createElement("input"); 
    series_label.value = name;
    series_label.style.fontWeight = "bold";
    series_label.style.font = "12px arial,serif";
    series_label.style.textAlign = "left";
    series_label.style.width = (g_scroll_container_width - 10).toString() + "px";
    series_label.style.padding = "0px";
    series_label.style.marginBottom = `${SCROLL_LABEL_MARGIN}px`; // Space between labels
    series_label.style.border = "none";
    series_label.style.height = `${SCROLL_LABEL_HEIGHT}px`;

    if (typeof color == "string")
    {
        series_label.style.color = color;
    }
    else
    {
        series_label.style.color = webGLToRGBHexString(color);
    }
    

    let delete_button = document.createElement("button");
    delete_button.innerHTML = "x";
    delete_button.style.position = "absolute";
    delete_button.style.bottom = "3px";
    delete_button.style.right = "30px";
    delete_button.style.textAlign = "right";
    delete_button.style.background = "transparent";
    delete_button.style.border = "none";
    delete_button.style.color = "#f00";  // Red color for 'x'
    delete_button.style.fontSize = "15px";
    delete_button.style.cursor = "pointer";
    delete_button.title = "Delete this series";

    label_container.appendChild(series_label);
    label_container.appendChild(delete_button);
    scroll_container.appendChild(label_container);        

    return [label_container, series_label, delete_button];
}

function drawSeriesLabels(series_list) 
{
    // Remove existing labels
    for (let label of g_series_labels) 
    {
        label.remove();
    }

    label_series_map.clear();
    g_series_labels.length = 0;

    // Create a container for the labels if it doesn't exist
    let scroll_container = document.getElementById("scroll_container");

    if (!scroll_container) 
    {
        scroll_container = document.createElement("div");
        scroll_container.id = "scroll_container";
        scroll_container.style.position = "absolute";
        scroll_container.style.top = `${g_main_viewport_borders.top + 20}px`; // Adjust based on your needs
        scroll_container.style.left = `${g_main_viewport.width + g_main_viewport_borders.left + 5}px`; // Adjust positioning
        scroll_container.style.width = g_scroll_container_width.toString() + "px";
        scroll_container.style.height = `${g_main_viewport.height - 30}px`; // Fixed height to create the scrolling effect
        scroll_container.style.overflowY = "auto"; // Enable vertical scrolling
        scroll_container.style.border = "1px solid #ccc"; // Optional: add a border for visibility
        scroll_container.style.padding = "5px";
        scroll_container.style.backgroundColor = CLEAR_COLOR_STRING; // Make it visually distinct
        ui_container.appendChild(scroll_container);
    }

    // Clear the container before adding new labels
    scroll_container.innerHTML = '';

    const is_all_numbers = str => /^\d+$/.test(str);
      
      // Example usage:
      // const select = document.getElementById('mySelect');
      // const hasAll = numberOfGenericOptions(select, ["ALL", "Select All", "*"]);

    for (let i = 0; i < series_list.length; i++) 
    {
        let series = series_list[i];
        let name = series.name;

        const MAX_LENGTH = 25;
        if (name.length > MAX_LENGTH) {
            name = name.slice(0, MAX_LENGTH) + '...'; // Truncate and add ellipsis
        }

        if (name == "Annual Average" && series_list.length > 1) 
        {
            // continue;
        }

        if (i > SCROLL_MAX_LABELS) 
        {
            // continue; // Skip if beyond MAX_LABELS
        }

        let scroll_container = document.getElementById("scroll_container");

        let [label_container, series_label, delete_button] = createLabel(scroll_container, series.name, series.color);
        // console.log("drawSeriesLabels series_select.length ", series_select.length);

        if (g_selected_series_list.length <= 1)
        {
            delete_button.style.display = 'none';
        }

        // Add event listener for deletion
        delete_button.addEventListener("click", function() 
        {
            // dont_draw = true;
            let series = label_series_map.get(series_label);

            if (series == g_series_to_highlight)
            {
                g_series_to_highlight = null;
            }

            console.log(`${series.name} clicked`);
            let option = findKeyByValue(g_option_series_map, series);

            if (series_select.length <= 1)
            {
                return;
            }

            for (let j = 0; j < series_select.length; j++)
            {
                if (option === series_select[j])
                {
                    console.log("drawSeriesLabels option_series_map.delete(option)", option);
                    // option_series_map.delete(option);
                    // series_select.remove(j);
                    deselectOption(option);
                    updateSelectedSeriesList();
                    // user_series_list = user_series_list.filter(item => item !== series);
                    console.log(g_user_series_list);
                    updateStatistics();
                    break;
                }
            }

            // dont_draw = false;
            document.dispatchEvent(draw_scene_event);
        });

        // scroll_container.appendChild(delete_button); // Append to the scroll container
        
        // scroll_container.appendChild(series_label); // Append to the scroll container

        // Append the label and button to the container
        g_series_labels.push(series_label);
        label_series_map.set(series_label, series);

        // Event listeners for hover and keydown
        series_label.addEventListener("mouseenter", (function(label) {
            let hoverTimer = null;
            
            return function() {
                if (!mouse_moved) {
                    return;
                }
                
                mouse_moved = false;
                
                // Start the hover timer
                hoverTimer = setTimeout(() => {
                    console.log("series_label mouseenter");
                    
                    if (draw_wide_series) {
                        // g_series_to_highlight = label_series_map.get(label);
                        setHighlightedSeries(label_series_map.get(label));
                        let series_index = getSeriesSelectIndex(g_series_to_highlight);
                        
                        if (series_index !== undefined) {
                            series_select.selectedIndex = series_index;
                            console.log("drawSeriesLabels calling updateSelectedSeriesStatistics");
                            updateSelectedSeriesStatistics();
                            console.log(`drawSeriesLabels series_select.selectedIndex ${series_select.selectedIndex}`);
                        } else {
                            console.log(`series index ${series_index} not found`);
                        }
                        
                        if (!g_dont_draw)
                        {
                            document.dispatchEvent(draw_scene_event);
                        }
                    }
                }, 300); // 300ms delay
                
                // Add mouseleave handler to cancel the timer if mouse leaves before timeout
                label.addEventListener("mouseleave", function clearHover() {
                    if (hoverTimer) {
                        clearTimeout(hoverTimer);
                        hoverTimer = null;
                    }
                    // Remove this mouseleave handler
                    label.removeEventListener("mouseleave", clearHover);
                });
            };
        })(series_label));

        series_label.addEventListener("focus", function() 
        {
            // console.log("drawSeriesLabels focus");
            g_label_container_has_focus = true;
            g_dont_draw = true;
            series_label.select();
        });

        series_label.addEventListener("mouseleave", function() 
        {
            // console.log("drawSeriesLabels mouseleave");
            updateSeriesLabel(series_label);
            g_label_container_has_focus = false;
            series_label.blur();
            g_dont_draw = false;
        });

        series_label.addEventListener("keydown", function(event) 
        {
            if (event.key === 'Enter') 
            {
                updateSeriesLabel(series_label);
            }
        });
    }
}

function updateSeriesLabel(series_label)
{
    let series = label_series_map.get(series_label);
    let option = findKeyByValue(g_option_series_map, series);
    series_label.value = series_label.value.replace(/,/g, '');

    if (series_label.value == "")
    {
        for (let j = 0; j < series_select.length; j++)
        {
            if (option === series_select[j])
            {
                series_select.remove(j);
            }
        }

        console.log("updateSeriesLabel option_series_map.delete(option)", option);
        g_option_series_map.delete(option);
        updateSelectedSeriesList();
        g_user_series_list = g_user_series_list.filter(item => item !== series);
        g_dont_draw = false;
        drawGraph();
    }
    else
    {
        option.value = series_label.value;
        option.text = series_label.value;
        series.name = series_label.value;
    }
}

function updateChartLabel(chart_label)
{
    let data_object = g_label_data_object_map.get(chart_label);
    console.log("updateChartLabel", chart_label.value, data_object);
    data_object.label = chart_label.value;

    // let series = label_series_map.get(series_label);
    // let option = findKeyByValue(g_option_series_map, series);
    // series_label.value = series_label.value.replace(/,/g, '');

    if (chart_label.value == "")
    {
    //     for (let j = 0; j < series_select.length; j++)
    //     {
    //         if (option === series_select[j])
    //         {
    //             series_select.remove(j);
    //         }
    //     }

    //     console.log("updateSeriesLabel option_series_map.delete(option)", option);
    //     g_option_series_map.delete(option);
    //     updateSelectedSeriesList();
    //     g_user_series_list = g_user_series_list.filter(item => item !== series);
    //     dont_draw = false;
    //     drawGraph();
    }
    else
    {
        // option.value = series_label.value;
        // option.text = series_label.value;
        // series.name = series_label.value;
    }
}


function updateMainTitleText() 
{
    const textInput = document.getElementById('main_title_input');
    const text = textInput.value.trim();
    const select = document.getElementById('main_title_text_select');

    if (text) 
    {
        let texts = JSON.parse(localStorage.getItem('saved_main_main_title_texts')) || [];
        // texts.sort();
        console.log(texts);

        // if (texts.includes(text))
        // {
        //     displayMainTitleTexts();
        //     return;
        // }

        if (select.value === '') {
            // Add new text
            texts.unshift(text);
        } else {
            // Update existing text
            texts[select.value] = text;
        }

        localStorage.setItem('saved_main_main_title_texts', JSON.stringify(texts));
        // displayMainTitleTexts();
        updateMainTitleDropdown();
        select.value = '';
    }
}

// function displayMainTitleTexts() 
// {
//     const select = document.getElementById('main_title_text_select');
//     const texts = JSON.parse(localStorage.getItem('saved_main_main_title_texts')) || [];
    
//     texts.sort().forEach((text, index) => 
//     {
//         const option = document.createElement('option');
//         option.value = text;
//         option.textContent = `${index + 1}. ${text}`;
//         select.appendChild(option);
//     });
// }
// function displayMainTitleTexts() 
// {
//     const savedTextsDiv = document.getElementById('main_title_text_select');
//     const texts = JSON.parse(localStorage.getItem('saved_main_main_title_texts')) || [];
//     texts.sort();

//     savedTextsDiv.innerHTML = 'Saved Main Title Texts:';
//     texts.forEach((text, index) => 
//     {
//         savedTextsDiv.innerHTML += `<p>${index + 1}. ${text}</p>`;
//     });
// }

function updateMainTitleDropdown() 
{
    const select = document.getElementById('main_title_text_select');
    const texts = JSON.parse(localStorage.getItem('saved_main_main_title_texts')) || [];
    // texts.sort();

    // Clear existing options
    select.innerHTML = '<option value="">Select a saved text from a list of previously used titles</option>';

    // Add new options
    texts.forEach((text, index) => 
    {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = text.substring(0, 60) + (text.length > 60 ? '...' : '');
        select.appendChild(option);
    });
}

function selectMainTitleText() 
{
    const select = document.getElementById('main_title_text_select');
    const textInput = document.getElementById('main_title_input');
    const texts = JSON.parse(localStorage.getItem('saved_main_main_title_texts')) || [];
    // texts.sort();

    if (select.value !== '') 
    {
        textInput.value = texts[select.value];
        main_title_label.innerHTML = texts[select.value];
    } else 
    {
        textInput.value = '';
    }
}


function deleteSelectedMainTitleText() 
{
    const select = document.getElementById('main_title_text_select');
    let texts = JSON.parse(localStorage.getItem('saved_main_main_title_texts')) || [];
    // texts.sort();

    if (select.value !== '') 
    {
        texts.splice(select.value, 1);
        localStorage.setItem('saved_main_main_title_texts', JSON.stringify(texts));
        // displayMainTitleTexts();
        updateMainTitleText();
        document.getElementById('main_title_input_label').value = '';
    }
}

// Load saved texts when the page loads
// window.onload = function() 
// {
//     displayMainTitleTexts();
//     updateMainTitleDropdown();
// };

// function updateMainTitleText()
// {

// }

// function selectMainTitleText()
// {

// }

// Frontend JavaScript
let OPENAPI_QUERY_URL = 'https://d2t-compute.com:3000'; // Replace with your actual server address and port

if (window.location.href.includes("visitech"))
{
    OPENAPI_QUERY_URL = 'https://app.visitech.ai:3000'
}
else if (window.location.href.includes("127.0.0.1"))
{
    OPENAPI_QUERY_URL = 'http://127.0.0.1:3000'
}

async function explainTextString(text) 
{
    const res = await fetch((`${OPENAPI_QUERY_URL}/api/analyze-text`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });
  
    const data = await res.json();
    console.log("explainCurrentGraph", data.analysis || data.error);

    const chatNow = new Date();
    const chatTime = chatNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function explainCurrentGraph(canvas)
{
    const blob = dataURItoBlob(canvas.toDataURL("image/png"));
    const formData = new FormData();
    formData.append("image", blob, "screenshot.png");

    const res = await fetch(`${OPENAPI_QUERY_URL}/api/explain-image`, {
    method: "POST",
    body: formData,
    });

    const data = await res.json();
    console.log("explainCurrentGraph", data.explanation || data.error);
    const chatNow = new Date();
    const chatTime = chatNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatAddMessage(data.explanation, 'other', chatTime);

}

async function explainImage(file) 
{
    // const file = document.getElementById('fileInput').files[0];
    const formData = new FormData();
    formData.append("image", file);
  
    const res = await fetch(`${OPENAPI_QUERY_URL}/api/explain-image`, 
    {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    console.log("explainImage", data.explanation || data.error);
    const chatNow = new Date();
    const chatTime = chatNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    chatAddMessage(data.explanation, 'other', chatTime);
    // document.getElementById("result").textContent = data.explanation || data.error;
  }

async function interpretAIQueryOld()
{
    const query = document.getElementById('AI_query_input').value;
    interpretAIQuery(query);
}

async function interpretAIQuery(query) 
{
    if (mic_is_recording)
    {
        AI_query_mic_button.click();
    }
    
    try 
    {
        console.log("Sending", query, "to", `${OPENAPI_QUERY_URL}/api/interpret`);
        let response = await fetch(`${OPENAPI_QUERY_URL}/api/interpret`, 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        });
        const data = await response.json();
        
        if (data.error) 
        {
            console.log(`Error: ${data.error} Interpretation: ${data.interpretation} Details: ${data.details}`);
            showDisappearingAlert(5000, "red", "Query Failed");
        } 
        else 
        {
            let json_string = JSON.stringify(data);
            console.log(json_string);
            let parsed_json = JSON.parse(json_string)
            console.log(parsed_json);

            // location : "Nebraska"
            // query : "most_days_above"
            // target : "90F"

            let location_string = parsed_json.location;

            if (state_abbreviations.includes(parsed_json.location))
            {
            }
            else if (state_name_to_abbreviation_map.has(parsed_json.location) )
            {
                location_string = state_name_to_abbreviation_map.get(parsed_json.location);
            }
            
            if (parsed_json.location == "Arctic" && parsed_json.query == "arctic_sea_ice")
            {
                // let file_url = 'https://d2t-compute.com/Scripts/Arctic/N_seaice_extent_daily_v3.0.csv';
                let file_url = 'https://d2t-compute.com/Scripts/Arctic/osisaf_nh_sie_daily.csv';
                query_file_name = "N_seaice_extent_daily_v3.0.csv";

                if (parsed_json.target == "OSI")
                {
                    file_url = "https://d2t-compute.com/Scripts/Arctic/osisaf_nh_sie_daily.csv";
                    query_file_name = "osisaf_nh_sie_daily.csv";                    
                }
                else if (parsed_json.target == "NSIDC")
                {
                    file_url = "https://d2t-compute.com/Scripts/Arctic/N_seaice_extent_daily_v3.0.csv";
                    query_file_name = "osisaf_nh_sie_daily.csv";                    
                }

                if (window.location.href.includes("visitech"))
                {
                    file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                }
                else if (window.location.href.includes("127.0.0.1"))
                {
                    file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");
                }

                try 
                {
                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.location == "Arctic" && parsed_json.query == "arctic_sea_ice_area")
            {
                let file_url = "https://d2t-compute.com/Scripts/Arctic/osisaf_nh_sia_daily.csv";
                
                if (window.location.href.includes("visitech"))
                {
                    file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                }
                else if (window.location.href.includes("127.0.0.1"))
                {
                    file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");

                }

                try 
                {
                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "osisaf_nh_sia_daily.csv";
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.location == "Earth" && parsed_json.query == "carbon_dioxide")
            {
                try 
                {
                    let file_url = 'https://d2t-compute.com/Scripts/CO2/co2_monthly_average.csv';

                    if (window.location.href.includes("visitech"))
                    {
                        file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                    }
                    else if (window.location.href.includes("127.0.0.1"))
                    {
                        file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");
                    }

                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "co2_monthly_average.csv";

                    let source_url = "https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.txt";
                    copyTextToClipboard(source_url);
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "population" && parsed_json.target == "US")
            {
                try 
                {
                    let file_url = 'https://d2t-compute.com/Scripts/Population/US_County_Population.csv';

                    if (window.location.href.includes("visitech"))
                    {
                        file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                    }
                    else if (window.location.href.includes("127.0.0.1"))
                    {
                        file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");
                    }

                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "US_County_Population.csv";

                    let source_url = "https://www2.census.gov/programs-surveys/popest/tables/2020-2023/counties/totals/co-est2023-pop.xlsx";
                    copyTextToClipboard(source_url);
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "crime_statistics" && parsed_json.target == "DC")
            {
                try 
                {
                    let file_url = 'https://d2t-compute.com/Scripts/Crime/Crime_Incidents_in_2025.csv';

                    if (window.location.href.includes("visitech"))
                    {
                        file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                    }
                    else if (window.location.href.includes("127.0.0.1"))
                    {
                        file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");
                    }

                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "Crime_Incidents_in_2025.csv";

                    let source_url = "https://catalog.data.gov/dataset/crime-incidents-in-2025";
                    copyTextToClipboard(source_url);
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.location == "Antarctic" && parsed_json.query == "antarctic_sea_ice")
            {
                try 
                {
                    let file_url = 'https://d2t-compute.com/Scripts/Arctic/osisaf_sh_sie_daily.csv';
                    

                    if (window.location.href.includes("visitech"))
                    {
                        file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                    }
                    else if (window.location.href.includes("127.0.0.1"))
                    {
                        file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");
                    }
            
                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "osisaf_sh_sie_daily.csv";
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.query == "pdsi_drought")
            {
                try 
                {
                    let file_url = 'https://d2t-compute.com/Scripts/Drought/PDSI.csv';

                    if (window.location.href.includes("visitech"))
                    {
                        file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                    }
                    else if (window.location.href.includes("127.0.0.1"))
                    {
                        file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");

                    }
            
                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "PDSI.csv";
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.query == "sunspots")
            {
                try 
                {
                    let file_url = 'https://d2t-compute.com/Scripts/Sunspots/sunspot_data.csv';

                    if (window.location.href.includes("visitech"))
                    {
                        file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                    }
                    else if (window.location.href.includes("127.0.0.1"))
                    {
                        file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");

                    }
            
                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "sunspot_data.csv";
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.query == "forest_fires")
            {
                try 
                {
                    let file_url = 'https://d2t-compute.com/Scripts/Fire/US-Burn-Area.csv';

                    if (window.location.href.includes("visitech"))
                    {
                        file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                    }
                    else if (window.location.href.includes("127.0.0.1"))
                    {
                        file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");

                    }
            
                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "US-Burn-Area.csv";
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.query == "enso")
            {
                try 
                {
                    let file_url = 'https://d2t-compute.com/Scripts/ENSO/ENSO.csv';

                    if (window.location.href.includes("visitech"))
                    {
                        file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                    }
                    else if (window.location.href.includes("127.0.0.1"))
                    {
                        file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");

                    }
            
                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "ENSO.csv";
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.query == "briffas_reconstruction")
            {
                try 
                {
                    let file_url = 'https://d2t-compute.com/data/Briffa.csv';

                    if (window.location.href.includes("visitech"))
                    {
                        file_url = file_url.replace("d2t-compute.com", "app.visitech.ai");
                    }
                    else if (window.location.href.includes("127.0.0.1"))
                    {
                        file_url = file_url.replace("https://d2t-compute.com", "http://127.0.0.1:9001/WebGL/graphing");

                    }
            
                    const content = await downloadAndCopyToClipboard(file_url);
                    await addClipboardDataButtonPressed();
                    query_file_name = "Briffa.csv";
                    let source_url = "https://www.ncei.noaa.gov/pub/data/paleo/treering/reconstructions/n_hem_temp/nhemtemp_data-noaa.txt";
                    copyTextToClipboard(source_url);
                } 
                catch (error) 
                {
                    console.error('An error occurred:', error);
                
                }
            }
            else if (parsed_json.location == "Stock" && parsed_json.query == "stock_price")
            {
                PROGRAM_NAME = "STOCKS";
                fetchStockData(parsed_json.target, "10y");
                
            }
            else if (parsed_json.location == "Earth" && parsed_json.query == "hurricanes")
            {
                console.log("Hurricanes");
                
                if (window.location.href.includes("visitech"))
                {
                    window.open("https://app.visitech.ai/hurricanes/hurricanes.html", "_blank");
                }
                else if (window.location.href.includes("d2t-compute"))
                {
                    window.open("https://d2t-compute.com/hurricanes/hurricanes.html", "_blank");
                }
                else if (window.location.href.includes("127.0.0.1"))
                {
                    window.open("http:127.0.0.1//WebGL/graphing/hurricanes/hurricanes.html", "_blank");
                }
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "plot_type" && parsed_json.target == "Yearly")
            {
                showLoading();
                let [visible_data_csv_string, year_daily_average_string] = generateCsvFromScreen(g_minimum, g_maximum);
                document.body.focus();
                await navigator.clipboard.writeText(year_daily_average_string);
                // await addClipboardDataButtonPressed();

                async function proceedAfterCliboardData() 
                {
                    series_select.length = 0;
                    g_user_series_list.length = 0;
                    addClipboardData(year_daily_average_string);
                    return "Operation completed";
                }
                
                proceedAfterCliboardData().then(result => 
                {
                    console.log(result);
                    // Proceed with more code here
                    g_minimum.x = 0;
                    g_maximum.x = 1;
                    resetZoom();
                    minimum_x_input.value = "1/1";
                    maximum_x_input.value = "12/31";
                    g_grid_dimensions.x = 12;
                    console.log("graph by year proceedAfterCliboardData about to call dimensionsChanged");
                    hideLoading();
                    dimensionsChanged();
                    show_all_series = false;
                    // drawGraph();
                }).then(createYearlyRecordsCSV());

                async function createYearlyRecordsCSV()
                {
                    let day_of_year_maximum_record_map = new Map();
                    let day_of_year_minimum_record_map = new Map();

                    for (const series of g_user_series_list)
                    {
                        let year = parseInt(series.name.split(/\s+/)[1]);
                        // console.log(series.name, year);
                        
                        for (let i = 0; i < series.graph_positions.length; i+=2)
                        {
                            let day_fraction = series.graph_positions[i];
                            let data = series.graph_positions[i+1];
                            let date = year + day_fraction;
                            let day_of_year = GraphingUtilities.dayOfYear(date);
                            // console.log(year, day_fraction, day_of_year);

                            if (day_of_year_maximum_record_map.has(day_of_year))
                            {
                                let day_record = day_of_year_maximum_record_map.get(day_of_year);
                                let record_value = day_record.value;

                                if (data > record_value)
                                {
                                    day_of_year_maximum_record_map.set(day_of_year, {year: year, value: data});
                                }
                            }
                            else
                            {
                                day_of_year_maximum_record_map.set(day_of_year, {year: year, value: data});
                            }

                            if (day_of_year_minimum_record_map.has(day_of_year))
                            {
                                let day_record = day_of_year_minimum_record_map.get(day_of_year);
                                let record_value = day_record.value;

                                if (data < record_value)
                                {
                                    day_of_year_minimum_record_map.set(day_of_year, {year: year, value: data});
                                }
                            }
                            else
                            {
                                day_of_year_minimum_record_map.set(day_of_year, {year: year, value: data});
                            }
                        }
                    }

                    // console.log(day_of_year_maximum_record_map);
                    let year_maximum_record_count_map = new Map();

                    for (const [day_of_year, record] of day_of_year_maximum_record_map) 
                    {
                        let year = record.year;

                        if (year_maximum_record_count_map.has(year))
                        {
                            year_maximum_record_count_map.set(year, year_maximum_record_count_map.get(year) + 1)
                        }
                        else
                        {
                            year_maximum_record_count_map.set(year, 1);
                        }
                    }

                    let sorted_year_maximum_record_count_map = new Map([...year_maximum_record_count_map.entries()].sort());
                    console.log("sorted_year_maximum_record_count_map", sorted_year_maximum_record_count_map);

                    let year_maximum_record_count_string = "Year,Maximum record count\n";

                    for (const [year, count] of sorted_year_maximum_record_count_map)
                    {
                        year_maximum_record_count_string += `${year},${count}\n`;
                    }

                    writeTextFile("maximum_daily_record_count.csv", year_maximum_record_count_string);

                    let year_minimum_record_count_map = new Map();

                    for (const [day_of_year, record] of day_of_year_minimum_record_map) 
                    {
                        let year = record.year;

                        if (year_minimum_record_count_map.has(year))
                        {
                            year_minimum_record_count_map.set(year, year_minimum_record_count_map.get(year) + 1)
                        }
                        else
                        {
                            year_minimum_record_count_map.set(year, 1);
                        }
                    }

                    let sorted_year_minimum_record_count_map = new Map([...year_minimum_record_count_map.entries()].sort());
                    console.log("sorted_year_minimum_record_count_map", sorted_year_minimum_record_count_map);

                    let year_minimum_record_count_string = "Year,Minimum record count\n";

                    for (const [year, count] of sorted_year_minimum_record_count_map)
                    {
                        year_minimum_record_count_string += `${year},${count}\n`;
                    }

                    writeTextFile("minimum_daily_record_count.csv", year_minimum_record_count_string);
                }
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "plot_type" && parsed_json.target == "Percent Gain")
            {
                let [visible_data_csv_string, year_daily_average_string] = generateCsvFromScreen(g_minimum, g_maximum);
                let [total_percent_string, daily_percent_string, running_slope_string] = generateStocksCsvFromScreen(visible_data_csv_string);
                await navigator.clipboard.writeText(total_percent_string);
                // await addClipboardDataButtonPressed();

                async function proceedAfterCliboardData() 
                {
                    // series_select.length = 0;
                    // user_series_list.length = 0;
                    addClipboardData(total_percent_string);
                    return "Operation completed";
                }
                
                proceedAfterCliboardData().then(result => 
                {
                    console.log(result);
                    // Proceed with more code here
                    // minimum.x = 0;
                    // maximum.x = 1;
                    // resetZoom();
                    // minimum_x_input.value = "1/1";
                    // maximum_x_input.value = "12/31";
                    // dimensionsChanged();
                    // show_all_series = false;
                    // drawGraph();
                });
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "plot_center")
            {      
                let target_number_string = parsed_json.target.match(/\D*(-?\d+)\D*/)[0];
                g_bar_chart_center_y_value = parseFloat(target_number_string);
                document.dispatchEvent(dimensions_changed_event);
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "horizontal_lines")
            {      
                let target_number_string = parsed_json.target.match(/\D*(-?\d+)\D*/)[0];
                g_grid_dimensions.y = parseFloat(target_number_string);
                document.dispatchEvent(dimensions_changed_event);
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "vertical_lines")
            {      
                let target_number_string = parsed_json.target.match(/\D*(-?\d+)\D*/)[0];
                g_grid_dimensions.x = parseFloat(target_number_string);
                document.dispatchEvent(dimensions_changed_event);
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "point_size")
            {      
                let target_number_string = parsed_json.target.match(/\D*(-?\d+)\D*/)[0];
                g_user_point_scaling = parseFloat(target_number_string);
                document.dispatchEvent(dimensions_changed_event);
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "lower_limit")
            {      
                let target_number_string = parsed_json.target.match(/\D*(-?\d+)\D*/)[0];
                minimum_y_input.value = target_number_string;
                document.dispatchEvent(dimensions_changed_event);
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "growth_rate")
            {      
                let series = g_selected_series_list[0];
                let delta_string = createDeltaString();
                console.log("interpretAIQuery growth_rate", delta_string);
                addSeriesFromTextString(delta_string, HYBRID_SERIES_TYPE);
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "two_series_difference")
            {   
                if (g_selected_series_list.length < 2)
                {
                    showDisappearingAlert(5000, "red", "Difference query requires 2 series");
                    return;
                }

                let series_0 = g_selected_series_list[0];
                let series_1 = g_selected_series_list[1];
                let [difference_string, inverse_difference_string] = createDifferenceString(series_0, series_1);
                addSeriesFromTextString(difference_string, HYBRID_SERIES_TYPE);
                addSeriesFromTextString(inverse_difference_string, HYBRID_SERIES_TYPE);
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "annual_range")
            {
                let year_range_string = createRangeString();
                addSeriesFromTextString(year_range_string, HYBRID_SERIES_TYPE);
                month_select.selectedIndex = 0;
                day_select.selectedIndex = 0;
                monthChanged();
                dayChanged();
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "annual_count")
            {
                let year_count_string = createYearlyCountString();
                let user_series_list = addSeriesFromTextString(year_count_string, HYBRID_SERIES_TYPE);

                if (user_series_list !== null)
                {
                    let count_series = user_series_list[0];
                    let percent_series = user_series_list[1];
                    let clear_list_first = true;
                    selectMultipleSeries([count_series, percent_series], clear_list_first);
                    month_select.selectedIndex = 0;
                    day_select.selectedIndex = 0;
                    monthChanged();
                    dayChanged();
                }
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "annual_records")
            {
                let year_count_string = createYearlyRecordCountString(g_selected_series_list);
                unselectAllSeries();
                addSeriesFromTextString(year_count_string, HYBRID_SERIES_TYPE);
                
                // let user_series_list = addSeriesFromTextString(year_count_string, HYBRID_SERIES_TYPE);

                // if (user_series_list !== null)
                // {
                //     let count_series = user_series_list[0];
                //     let percent_series = user_series_list[1];Ffunction tsvToCsv(tsvContent)
                //     let clear_list_first = true;
                //     selectMultipleSeries([count_series, percent_series], clear_list_first);
                //     month_select.selectedIndex = 0;
                //     day_select.selectedIndex = 0;
                //     monthChanged();
                //     dayChanged();
                // }
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "daily_total")
            {
                let day_total_string = createSumByDateString();
                console.log("interpretAIQuery daily_total\n", day_total_string);
                let user_series_list = addSeriesFromTextString(day_total_string, HYBRID_SERIES_TYPE);

                if (user_series_list !== null)
                {
                    let total_series = user_series_list[0];
                    selectOneSeries(total_series);
                }
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "rank_series")
            {
                let direction = parsed_json.target == "Reverse" ? "Reverse" : "Forward";
                let day_total_string = rankSeriesByAverageValue(direction);

                if (day_total_string !== undefined)
                {
                    console.log("interpretAIQuery daily_total\n", day_total_string);
                    let user_series_list = addSeriesFromTextString(day_total_string, HYBRID_SERIES_TYPE);
    
                    if (user_series_list !== null)
                    {
                        let total_series = user_series_list[0];
                        selectOneSeries(total_series);
                    }
                }
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "required_range")
            {
                filterRequiredRange(parsed_json.target);
                monthChanged();
                dayChanged();
            }
            else if (parsed_json.location == "Graph" && parsed_json.query == "upper_limit")
            {      
                let target_number_string = parsed_json.target.match(/\D*(-?\d+)\D*/)[0];
                maximum_y_input.value = target_number_string;
                document.dispatchEvent(dimensions_changed_event);
            }        
            else if (parsed_json.query == "plot_title")
            {      
                // console.log("interpretAIQuery plot_title", parsed_json.target);
                main_title_label.innerHTML = parsed_json.target;
                main_title_input.value = parsed_json.target;
                updateMainTitleText();
                // document.dispatchEvent(draw_scene_event);
            }        
            else if (parsed_json.query == "vertical_title")
            {      
                // console.log("interpretAIQuery vertical_title", parsed_json.target);
                // y_axis_label.innerHTML = parsed_json.target;
                // vertical_axis_title_input.value = verticalTitleStringToPlainText(parsed_json.target);
                
                // y_axis_label.innerHTML = getVerticalString(parsed_json.target);
                vertical_axis_title_input.value = parsed_json.target;
                verticalAxisLabelChanged();
                // document.dispatchEvent(draw_scene_event);
            }        
            else if (parsed_json.query == "horizontal_title")
            {      
                // console.log("interpretAIQuery horizontal_title", parsed_json.target);
                // x_axis_label.innerHTML = parsed_json.target;
                horizontal_axis_title_input.value = parsed_json.target;
                horizontalAxisLabelChanged();
                // document.dispatchEvent(draw_scene_event);
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "graph_screenshot")
            {      
                screenshot();
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "graph_select_all")
            {      
                selectAllSeries();
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "fft")
            {      
                let [x_list, y_list, x_y_list] = createPointListsFromVec3Array(g_visible_point_list);

                let fft_result = computeFFT(x_y_list).frequency_magnitude;

                let fft_string = "Frequency,FFT Magnitude\n"

                let dc_component = 0.25;

                for (let i = 0; i < fft_result.length; i += 2)
                {
                    let frequency = fft_result[i + 0];
                    let magnitude = fft_result[i + 1];

                    if (frequency > dc_component)
                    {
                        fft_string += frequency.toString();
                        fft_string += "," + magnitude.toString() + "\n";
                    }
                }

                addSeriesFromTextString(fft_string, HYBRID_SERIES_TYPE);

            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "plot_moving_average")
            {   
                if (!usingUserData())
                {
                    // console.log("interpretAIQuery g_visible_point_list", g_visible_point_list);
                    // showDisappearingAlert(3000, "red", "Mean generation not yet supported for temperature data");
                    // return;
                }
            
                let target_number = parsed_json.target.match(/\D*(\d+)\D*/)[1];
                let point_lists = createPointListsFromVec3Array(g_visible_point_list);
                let moving_average = centeredMovingAverage(point_lists[1], parseInt(target_number));
                console.log("interpretAIQuery moving_average", moving_average);

                let moving_average_string = `Date,${target_number} Moving Average\n`;

                for (let i = 0; i < point_lists[0].length; i++)
                {
                    let value = moving_average[i];
                    
                    if (!Number.isNaN(value))
                    {
                        moving_average_string += point_lists[0][i].toString();
                        moving_average_string += "," + value.toString() + "\n";
                    }
                }

                let screen_currently_locked = screenLocked();

                lockScreen();
                addSeriesFromTextString(moving_average_string, HYBRID_SERIES_TYPE);

                if (!screen_currently_locked)
                {
                    unlockScreen();
                }

            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "plot_trend_status")
            {      
                if (compareCaseInsensitive(parsed_json.target, "on"))
                {
                    plot_trend_checkbox.checked = true;
                }
                else
                {
                    plot_trend_checkbox.checked = false;
                }

                // glcanvas.click();
                plotTrendCheckboxChanged();
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "graph_select_visible")
            {      
               selectVisible();
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "plot_reset_zoom")
            {      
                reset_zoom_button.click();
            }        
            else if (parsed_json.location == "Earth" && parsed_json.query == "draw_map")
            {   
                if (compareCaseInsensitive(parsed_json.target, "map"))
                {
                    handleImages("e");
                }
                else if (compareCaseInsensitive(parsed_json.target, "compare"))
                {
                    handleImages("E");
                }
                else if (compareCaseInsensitive(parsed_json.target, "previous"))
                {
                    handleImages("ArrowLeft");
                }
                else if (compareCaseInsensitive(parsed_json.target, "next"))
                {
                    handleImages("ArrowRight");
                }                
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "plot_type")
            {      
                if (parsed_json.target == "bar_chart")
                {
                    draw_bar_chart_checkbox.checked = true;
                }
                else if (parsed_json.target == "line_graph")
                {
                    draw_bar_chart_checkbox.checked = false;
                    g_is_line_chart = true;
                }
                else if (parsed_json.target == "scatter_plot")
                {
                    draw_bar_chart_checkbox.checked = false;
                    g_is_line_chart = false;
                }
                document.dispatchEvent(dimensions_changed_event);
            }        
            else if (parsed_json.location == "Graph" && parsed_json.query == "plot_range")
            {
                console.log(`interpretAIQuery ${parsed_json.query} ${parsed_json.location} ${parsed_json.target}`);
                let [length_string, units] = parsed_json.target.split(/\s+/);
                console.log(`interpretAIQuery length ${length_string} units ${units}`);
                let length = parseInt(length_string);
                let [lower_left, upper_right] = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
                let [minimum, maximum] = allSeriesPointRange(g_selected_series_list);
                console.log("interpretAIQuery plot_range minimum maximum g_selected_series_list", minimum, maximum, g_selected_series_list);

                if (parseNumberRange(parsed_json.target) !== false)
                {
                    let limits = parseNumberRange(parsed_json.target);
                    lower_left.x = limits[0];
                    upper_right.x = limits[1];
                }
                else if (compareCaseInsensitive(parsed_json.target,"full"))
                {
                    lower_left.x = minimum.x;
                    upper_right.x = maximum.x;
                }
                else if (containsCaseInsensitiveSubstring(parsed_json.target,"start"))
                {
                    lower_left.x = parseFloat(parsed_json.target.split(" ")[1]);
                    // upper_right.x = maximum.x;
                    minimum_x_input.value = lower_left.x;
                    updateStatistics();
                }
                else if (containsCaseInsensitiveSubstring(parsed_json.target,"end"))
                {
                    upper_right.x = parseFloat(parsed_json.target.split(" ")[1]);
                    maximum_x_input.value = upper_right.x;
                    updateStatistics();
                }
                else if (units == "months")
                {
                    length *= 30;
                    lower_left.x = maximum.x - (length / 365);
                    upper_right.x = maximum.x;
                }
                else if (units == "years")
                {
                    length *= 365;
                    lower_left.x = maximum.x - (length / 365);
                    upper_right.x = maximum.x;
                }
                else if (units == "days")
                {
                    lower_left.x = maximum.x - (length / 365);
                    upper_right.x = maximum.x;
                }
                else if (units == "" || units === undefined)
                {
                    let start_date = parseFloat(length);
                    lower_left.x = start_date;
                    upper_right.x = start_date + 1;
                }

                zoomToNewScreenCorners(g_main_viewport, lower_left, upper_right, 0, g_scale, g_offset, g_minimum, g_maximum);
                update_statistics_next_time = true;
                updateStatistics();
                drawGraph();
            }
            else if (   parsed_json.query == "all_daily_maximum_temperatures" 
                || parsed_json.query == "all_daily_temperatures"
                || parsed_json.query == "all_maximum_temperatures_above"
                || parsed_json.query == "all_maximum_temperatures_below"
                || parsed_json.query == "all_daily_minimum_temperatures"
                || parsed_json.query == "most_days_above"
                || parsed_json.query == "longest_stretch_of_days_above"
                || parsed_json.query == "most_days_below"
                || parsed_json.query == "longest_stretch_of_days_below")
            {
                showGoogleMap();
                hide2DCanvas();
                showChat();

                if (country_name_to_abbreviation_map.has(parsed_json.location) )
                {
                    country_select.value = country_name_to_abbreviation_map.get(parsed_json.location);
                    countryChanged();
                    // series_select.value = "ALL";
                    // stationChanged();
                    // makeCallbackWhenReadyToDraw(conductSearch, parsed_json);
                    return;
                }
            
                // country_select.value = "US";
                // countryChanged();
                state_select.value = location_string;
                stateChanged();

                if (parsed_json.query == "all_daily_minimum_temperatures")
                {
                    type_select.value = "TMIN";
                }
                else
                {
                    type_select.value = "TMAX";
                }

                let make_call_to_station_changed = false;


                if (Array.from(series_select.options).some(option => option.value == "all"))
                {
                    series_select.value = "all";
                    make_call_to_station_changed = true;
                }
                else if (Array.from(series_select.options).some(option => option.value == "ALL"))
                {
                    series_select.value = "ALL";
                    make_call_to_station_changed = true;
                }

                if (make_call_to_station_changed)
                {
                    g_all_data_files_loaded = false;
                    graph_drawn = false;
                    country_select.value = "US";
                    stationChanged();

                    if (parsed_json.query == "all_maximum_temperatures_above")
                    {
                        makeCallbackWhenReadyToDraw(setYMinimum, parsed_json);
                    }
                    else if (parsed_json.query == "all_maximum_temperatures_below")
                    {
                        makeCallbackWhenReadyToDraw(setYMaximum, parsed_json);
                    }
                    else
                    {
                        makeCallbackWhenReadyToDraw(conductSearch, parsed_json);
                    }    
                }

            }
            else if (parsed_json.query == "explain_graph")
            {
                var ui_container = document.getElementById("ui_container");
                html2canvas(ui_container).then(explainCurrentGraph);
            }
            // else if (parsed_json.query == "unrecognized")
            else
            {
                console.log("interpretAIQuery unrecognized");
                const filename = "visitech.csv";

                let response = null;
                let data = null;
                let query_length = 0;
                let clean_query = query.replace(/(plot|graph|chat|chatbot)/g, "");

                if (g_new_user_data_loaded || g_statistics_updated)
                {
                    let visible_data_string = visibleDataString();
                    console.log("interpretAIQuery visible_data_string\n", visible_data_string);
                    let stripped_string = "";

                    if (getGraphingMode() == GRAPHING_MODE_TIME_SERIES && CHART_TYPE != COMPLEX_CHART_TYPE)
                    {
                        stripped_string = replaceWhitespaceInFirstLine(visible_data_string);
                        g_json_response = await csvToJSON(stripped_string, filename);
                    }
                    else
                    {
                        console.log("interpretAIQuery g_chart_text.length", g_chart_text.length);
                        console.log("interpretAIQuery g_chart_text", g_chart_text);
                        stripped_string = replaceWhitespaceInFirstLine(g_chart_text);
                        g_json_response = await csvToJSON(stripped_string, filename);
                    }
                    console.log("interpretAIQuery response\n", g_json_response);

                    let result_text = "";


                    duckLoadCsvData(stripped_string, result_text);

                    const number_of_rows = 5;
                    
                    query_length = g_json_response.length > number_of_rows ? number_of_rows : g_json_response.length;
    
                    data = await generateTablePrompt(g_json_response, query_length);
                    console.log("generate_table_prompt response\n", data);
                    g_table_prompt_data = data.table_prompt;
                    g_new_user_data_loaded = false;
                    g_statistics_updated = false;                
                }

                // console.log("interpretAIQuery g_table_prompt_data\n", g_table_prompt_data);
                data = await askChatbot(clean_query);
                
                let cleaned_sql = data.query.replace(/\n/g, ' ');
                console.log("ask2 response\n", cleaned_sql);

                let query_output = await runDuckQuery(cleaned_sql);
                console.log("interpretAIQuery runDuckQuery\n", query_output);
                data.data = query_output;

                chat_outer_container.style.visibility = "visible";

                if ('recommendations' in data) 
                {
                    console.log('Found recommendations:\n', data.recommendations.recommendations);
                    // chat_outer_container.innerHTML = data.recommendations.recommendations.replace(/\n/g, "<br>");
                    const chatNow = new Date();
                    const chatTime = chatNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                    chatAddMessage(data.recommendations.recommendations, 'other', chatTime);
                    
                } 
                else if ('data' in data) 
                {
                    // chat_outer_container.innerHTML = data.data;
                    // console.log('Found data:', json.data);
                    console.log('Response data:\n', data.data);
                    let sorted_data = sortObjectByDateIfPresent(data.data);
                    let data_error = typeof data.data == "string" && data.data.toLowerCase().includes("error");

                    if (data_error || sorted_data == undefined || sorted_data.length == 0)
                    {

                        let error_string = data_error ? data.data : "no data returned";
                        console.log("interpretAIQuery runDuckQuery error", error_string);
                        console.log("interpretAIQuery cleaned_sql", cleaned_sql);

                        data = await askChatbotRetry(cleaned_sql, error_string, clean_query, g_table_prompt_data)
                
                        cleaned_sql = data.query.replace(/\n/g, ' ');
                        console.log("repair_sql response\n", cleaned_sql);
        
                        query_output = await runDuckQuery(cleaned_sql);
                        console.log("interpretAIQuery runDuckQuery\n", query_output);
                        data.data = query_output;
                        sorted_data = sortObjectByDateIfPresent(data.data);
                    }

                    console.log('Sorted response data:\n', sorted_data);
    
                    let keys = Object.keys(sorted_data[0]);  
                     
                    console.log('Response data keys', keys);
    
                    let result_string = "";
    
                    for (let i = 0; i < keys.length; i++)
                    {
                        let key = keys[i];
                        result_string += key;
    
                        if (i < keys.length - 1)
                        {
                            result_string += ",";
                        }
                        else 
                        {
                            result_string += "\n";
                        }
                    }
    
                    for (let i = 0; i < sorted_data.length; i++)
                    {
                        let values = Object.values(sorted_data[i]);
                        
                        for (let j = 0; j < values.length; j++)
                        {
                            let value = values[j];

                            if (typeof(value) == 'string')
                            {
                                value = value.replace(/,/g, '');
                            }

                            result_string += value;
    
                            if (j < values.length - 1)
                            {
                                result_string += ",";
                            }
                            else 
                            {
                                result_string += "\n";
                            }
                        }
                    }
    
                    addSeriesFromTextString(result_string, HYBRID_SERIES_TYPE);
                    const chatNow = new Date();
                    const chatTime = chatNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                    chatAddMessage(result_string, 'other', chatTime);
                    chatAddMessage(`${sorted_data.length} lines`, 'other', chatTime);
                
                } 
            }
            // else
            // {
            //     showDisappearingAlert(5000, "red", "Unknown query " + parsed_json.query);
            // }

            updateMinimalStatistics();

            // drawGraph();
            // var ui_container = document.getElementById("ui_container");
            // html2canvas(ui_container).then(explainCurrentGraph);

            // explainTextString(g_chart_text);
        }
    } 
    catch (error) 
    {
        console.log(`Error: ${error.message}`);
        // alert(`Error: ${query} :: ${error.message}`);

        showDisappearingAlert(5000, "red", error.message);
    }
}

function sortObjectByDateIfPresent(arr) 
{
    if (!Array.isArray(arr) || arr.length === 0) return arr;
  
    const hasDateKey = 'date' in arr[0];
  
    if (hasDateKey) {
        return [...arr].sort((a, b) => a.date - b.date); // return a sorted copy
    }
  
    return arr; // return original array untouched
}

function setYMinimum(parsed_json)
{
    let target_number_string = parsed_json.target.match(/\D*(\d+)\D*/)[1];
    minimum_y_input.value = target_number_string;
    document.dispatchEvent(dimensions_changed_event);
}

function setYMaximum(parsed_json)
{
    let target_number_string = parsed_json.target.match(/\D*(\d+)\D*/)[1];
    maximum_y_input.value = target_number_string;
    document.dispatchEvent(dimensions_changed_event);
}

function conductSearch(parsed_json)
{
    console.log("conductSearch", parsed_json);

    if (parsed_json.query == "most_days_above")
    {
        search_type_select.value = MOST_DAYS_ABOVE;

        let target_number = parsed_json.target.match(/\D*(\d+)\D*/)[1];
        let target_units = parsed_json.target.replace(/\d/g, '');

        console.log(target_number, target_units);

        search_parameter_1_input.value = target_number;
        g_bar_chart_center_y_value = parseFloat(target_number);
        search();
    }
    else if (parsed_json.query == "longest_stretch_of_days_above")
    {
        search_type_select.value = LONGEST_STRETCH_ABOVE;

        let target_number = parsed_json.target.match(/\D*(\d+)\D*/)[1];
        let target_units = parsed_json.target.replace(/\d/g, '');

        console.log(target_number, target_units);

        search_parameter_1_input.value = target_number;
        g_bar_chart_center_y_value = parseFloat(target_number);
        search();
    }
    else if (parsed_json.query == "most_days_below")
    {
        search_type_select.value = MOST_DAYS_BELOW;

        let target_number = parsed_json.target.match(/\D*(\d+)\D*/)[1];
        let target_units = parsed_json.target.replace(/\d/g, '');

        console.log(target_number, target_units);

        search_parameter_1_input.value = target_number;
        g_bar_chart_center_y_value = parseFloat(target_number);
        search();
    }
    else if (parsed_json.query == "longest_stretch_of_days_below")
    {
        search_type_select.value = LONGEST_STRETCH_BELOW;

        let target_number = parsed_json.target.match(/\D*(\d+)\D*/)[1];
        let target_units = parsed_json.target.replace(/\d/g, '');

        console.log(target_number, target_units);

        search_parameter_1_input.value = target_number;
        g_bar_chart_center_y_value = parseFloat(target_number);
        search();
    }
}

function logMessage(message = "logMessage called")
{
    console.log(message);
}

async function pauseForOneSecond() 
{
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    console.log('Pausing for one second...');
}
  


function makeCallbackWhenReadyToDraw(callback, parsed_json, interval = 1000, max_count = 20) 
{
    function allConditionsTrue() 
    {
        return g_all_data_files_loaded && graph_drawn;
    }

    function poll() 
    {

        if (allConditionsTrue()) 
        {
            console.log('All conditions are true. Proceeding...');
            pauseForOneSecond();
            pauseForOneSecond();
            resetZoom();
            pauseForOneSecond();
            callback(parsed_json); // Call the callback function
        } 
        else if (poll_count < max_count)
        {
            console.log('Not all conditions are true yet. Checking again...');
            poll_count++;
            setTimeout(poll, interval); // Check again after the specified interval
        }
    }

    // Start polling
    var poll_count = 0;
    poll();
}


function proceedWhenEqual(a, b, callback) 
{
    if (a !== undefined && a === b) 
    {
        console.log('Both variables are equal. Proceeding...');
        callback();
        // Place your code here that should execute when the variables are equal
    } 
    else 
    {
        console.log('Variables are not equal yet. Checking again...');
        // Poll again after a short delay
        setTimeout(() => proceedWhenEqual(a, b, callback), 1000); // Check every second (1000 ms)
    }
}

async function downloadAndCopyToClipboard(url) 
{
    try 
    {
      // Fetch the file contents
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Read the response as text
      const content = await response.text();
      
      // Copy to clipboard
      await navigator.clipboard.writeText(content);
      
      console.log(`${url} File contents copied to clipboard successfully`);
    } 
    catch (error) 
    {
      console.error('Error:', error);
    }
}
  
function reload()
{
    window.location.reload();
}

function resetMinMax()
{
    console.log("resetMinMax");
    if (!dont_change_min_max)
    {
        g_minimum.x = Number.MAX_VALUE;
        g_minimum.y = Number.MAX_VALUE;
        g_maximum.x = 0.0;
        g_maximum.y = 0.0;
    }
}

function multipleDataFilesLoaded()
{
    number_of_multiple_data_files_loaded++;
    console.log("multipleDataFilesLoaded", number_of_multiple_data_files_loaded);

    if (number_of_multiple_data_files_loaded > number_of_multiple_data_files_to_load)
    {
        let break_here = true;
    }

    var data_text = this.responseText;

    if (series_to_load_list.length > 0)
    {
        showLoading();
    }

    if (data_text !== undefined)
    {
        var lines = splitIntoLines(data_text);
        var station_id = lines[0].split(",")[3];
        console.log(station_id);
    
        for (var i = 0; i < series_to_load_list.length; i++)
        {
            var station = series_to_load_list[i];
    
            if (station.id == station_id)
            {
                console.log(station);
    
                let smallest_delta_x = Number.MAX_SAFE_INTEGER;
                let previous_x = undefined;
    
                for (var j = 0; j < lines.length; j++)
                {
                    var data_strings = lines[j].split(",");
                    var x = parseFloat(data_strings[0]);
                    var y = parseFloat(data_strings[1]);
                    //console.log(x, y);
                    
                    if (isNaN(x) || isNaN(y))
                    {
                        continue;
                    }    

                    let rounded_y = Math.round(y);

                    if (Math.abs(y - rounded_y) < 0.1)
                    {
                        y = rounded_y;
                    }
    
                    if (previous_x !== undefined)
                    {
                        const delta_x = x - previous_x;
                        smallest_delta_x = Math.min(smallest_delta_x, delta_x);
                    }
    
                    if (!isNaN(x))
                    {
                        previous_x = x;
                    }
    
                    station.minimum.x = Math.min(x, station.minimum.x);
                    station.maximum.x = Math.max(x, station.maximum.x);
                    station.minimum.y = Math.min(y, station.minimum.y);
                    station.maximum.y = Math.max(y, station.maximum.y);
            
                    const graph_positions = getPositionArray(station);
                    const graph_indices = getIndexArray(station);
            
                    graph_positions.push(x, y);
                    graph_indices.push(i);
                }
    
                station.smallest_delta_x = smallest_delta_x;
                console.log("smallest_delta_x", station.smallest_delta_x);
    
    
                let position_buffer = getPositionBuffer(station);
                let index_buffer = getIndexBuffer(station);
                
                if (position_buffer == null || index_buffer == null)
                {
                    setPositionBuffer(station, gl.createBuffer());
                    position_buffer = getPositionBuffer(station);
                    setIndexBuffer(station, gl.createBuffer());
                    index_buffer = getIndexBuffer(station);
                }
        
                var position_array = new Float32Array(getPositionArray(station));
                loadVertexData(position_buffer, position_array);
            }
        }
    }

    if (number_of_multiple_data_files_loaded >= number_of_multiple_data_files_to_load)
    {
        g_dont_draw = false;
        g_all_data_files_loaded = true;
        hideLoading();
        prepareToDrawAfterDataLoaded();
    }
}


function dataFileLoaded()
{
    // When the station list is populated, it calls a load of the annual average.
    // This is a hack for the case where all stations are already loaded
    if (g_all_data_files_loaded)
    {
        return;
    }

    console.log("dataFileLoaded", selected_series);

    let [graph_positions, graph_indices] = getPositionIndexArrays(selected_series);

    graph_positions.length = 0;
    graph_indices.length = 0;
    var data_text = this.responseText;
    // console.log(data_text);
    var lines = splitIntoLines(data_text);
    // console.log(lines);

    if (data_text.search("File not found") >= 0 || (data_text.search("404 Not Found") >= 0))
    {
        console.log("File not found");
        let [lower_left, upper_right] = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);

        graph_positions.push(lower_left.x, lower_left.y);
        graph_indices.push(0);
        graph_positions.push(upper_right.x, upper_right.y);
        graph_indices.push(0);
    }
    else
    {
        let smallest_delta_x = Number.MAX_SAFE_INTEGER;
        let previous_x = undefined;
    
        for (var i = 0; i < lines.length; i++)
        {
            var data_strings = lines[i].split(",");
            var x = parseFloat(data_strings[0]);
            var y = parseFloat(data_strings[1]);
            //console.log(x, y);

            if (isNaN(x) || isNaN(y))
            {
                continue;
            }

            if (previous_x !== undefined)
            {
                const delta_x = x - previous_x;
                smallest_delta_x = Math.min(smallest_delta_x, delta_x);
            }
    
            if (!isNaN(x))
            {
                previous_x = x;
            }

            selected_series.minimum.x = Math.min(x, selected_series.minimum.x);
            selected_series.maximum.x = Math.max(x, selected_series.maximum.x);
            selected_series.minimum.y = Math.min(y, selected_series.minimum.y);
            selected_series.maximum.y = Math.max(y, selected_series.maximum.y);
    
            graph_positions.push(x);
            graph_positions.push(y);
            graph_indices.push(i);
        }

        selected_series.smallest_delta_x = smallest_delta_x;
        console.log("smallest_delta_x", selected_series.smallest_delta_x);
    }

    console.log(selected_series.minimum, selected_series.maximum, GraphingUtilities.dateString(x_at_minimum_y), GraphingUtilities.dateString(x_at_maximum_y));
    
    let position_array = getPositionArray(selected_series);
    let position_buffer = getPositionBuffer(selected_series);
    loadVertexData(position_buffer, position_array);

    prepareToDrawAfterDataLoaded();
}

function prepareToDrawAfterDataLoaded()
{
    // console.log("prepareToDrawAfterDataLoaded() dont_change_min_max = ", dont_change_min_max);
    resetMinMax();
    let update_graph = true;
    let add_margin = true;
    generateIndexListAndCalculateMinMax(month_select.value, day_select.value, g_minimum, g_maximum, update_graph, add_margin);
    month_label.innerHTML = GraphingUtilities.monthAbbreviation(parseInt(month_select.value));

    name_label.innerHTML = "";

    for (var i = 0; i < g_selected_series_list.length; i++)
    {
        var series = g_selected_series_list[i];
        name_label.innerHTML += series.name + "   ";
        const max_names = 3;

        if (i >= max_names)
        {
            break;
        }
    }

    if (name_label.innerHTML.length > 40)
    {
        name_label.innerHTML = name_label.innerHTML.substring(0, 40);
    }

    if (usingUserData())
    {
        let break_here = true;
    }
    else
    {
    
        if (country_select.value == state_select.value)
        {
            state_label.innerHTML = country_select.value;
        }
    }

    document.dispatchEvent(dimensions_changed_event);
    // document.dispatchEvent(draw_scene_event);
}

function bothShadersLoaded()
{
    if (graphing_vertex_shader_source.length == 0 || graphing_fragment_shader_source.length == 0)
    {
        return false;
    }

    return true;
}

function setupGL() 
{
    gl.viewport(g_main_viewport.x, g_main_viewport.y, g_main_viewport.width, g_main_viewport.height);
    gl.clearColor(g_clear_color.x, g_clear_color.y, g_clear_color.z, g_clear_color.w);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ZERO);

    graphing_shader_program = initShaderProgram(graphing_vertex_shader_source, graphing_fragment_shader_source);

    generateGraphingProgramInformation();

    setup_complete = true;
}


function drawScene()
{
    drawGraph();
}

function getSeriesBuffers(series)
{
    if (series.series_type === undefined || series.series_type == GENERIC_SERIES_TYPE || series.series_type == HYBRID_SERIES_TYPE)
    {
        return [series.position_buffer, series.index_buffer];
    }
    
    return [series.position_buffer[type_select.value], series.index_buffer[type_select.value]];
}

function createBarChartVertices(graph_positions, vertical_percent) 
{
    if (!Array.isArray(graph_positions) || graph_positions.length < 2) 
    {
        return [];
    }

    // Calculate minimum x delta
    let previous_x = undefined;
    let minimum_x_delta = Number.MAX_SAFE_INTEGER;
    let largest_y = Number.MIN_SAFE_INTEGER;

    for (let j = 0; j < graph_positions.length; j += 2) 
    {
        const x = graph_positions[j];
        const y = graph_positions[j + 1];
        
        if (previous_x !== undefined && !isNaN(x)) 
        {
            const delta = x - previous_x;
            minimum_x_delta = delta < minimum_x_delta ? delta : minimum_x_delta;
        }

        largest_y = Math.max(y, largest_y);
        
        if (!isNaN(x)) 
        {
            previous_x = x;
        }
    }


    const screen_corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
    const visible_range = 
    {
        x: screen_corners[1].x - screen_corners[0].x,
        y: screen_corners[1].y - screen_corners[0].y
    };

    const y_conversion = visible_range.y / largest_y * vertical_percent / 100;

    const bar_width = Math.max(minimum_x_delta, visible_range.x / g_main_viewport.width);
    const half_bar_width = (bar_width * 0.9) / 2;
    const one_pixel = onePixelDelta();

    // Filter visible bars and adjust heights
    const rectangle_list = [];
    const vertical_scale = vertical_percent / 100;

    for (let j = 0; j < graph_positions.length; j += 2) 
    {
        const x = graph_positions[j];
        let y = screen_corners[0].y + graph_positions[j + 1] * y_conversion;

        if (x < screen_corners[0].x || x > screen_corners[1].x) 
        {
            continue;
        }

        if (Math.abs(y) < 0.01) 
        {
            y = visible_range.y / g_main_viewport.height;
        }

        if (y >= screen_corners[0].y) 
        {
            y = Math.max(y, screen_corners[0].y + (2 * one_pixel.y));
        }


        y = Math.min(y, screen_corners[1].y);

        rectangle_list.push(x, y);
    }

    if (rectangle_list.length > MAX_BAR_CHART_BAR_COUNT) 
    {
        return [];
    }

    // Pre-allocate vertices array
    const corner_list = new Array(rectangle_list.length * 6);
    let cornerIndex = 0;

    // Generate vertices for each bar
    for (let j = 0; j < rectangle_list.length; j += 2) 
    {
        const x = rectangle_list[j];
        const y = rectangle_list[j + 1];
        
        const x1 = x - half_bar_width;
        const x2 = x + half_bar_width;
        const y1 = screen_corners[0].y;
        const y2 = y;

        // Bottom-left, bottom-right, top-left
        corner_list[cornerIndex++] = x1;
        corner_list[cornerIndex++] = y1;
        corner_list[cornerIndex++] = x2;
        corner_list[cornerIndex++] = y1;
        corner_list[cornerIndex++] = x1;
        corner_list[cornerIndex++] = y2;
        
        // Top-left, bottom-right, top-right
        corner_list[cornerIndex++] = x1;
        corner_list[cornerIndex++] = y2;
        corner_list[cornerIndex++] = x2;
        corner_list[cornerIndex++] = y1;
        corner_list[cornerIndex++] = x2;
        corner_list[cornerIndex++] = y2;
    }

    // console.log("createBarChartVertices corner_list", corner_list);
    return corner_list;
}

function clearGraph()
{
    gl.scissor(g_main_viewport.x, g_main_viewport.y, g_main_viewport.width, g_main_viewport.height);
    gl.enable(gl.SCISSOR_TEST);
    gl.clearColor(g_graph_clear_color.x, g_graph_clear_color.y, g_graph_clear_color.z, g_graph_clear_color.w); 
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(g_clear_color.x, g_clear_color.y, g_clear_color.z, g_clear_color.w); 
    gl.disable(gl.SCISSOR_TEST);
}

function drawGraph() 
{
    console.log("drawGraph");

    if (g_dont_draw)
    {
        console.log("drawGraph() not drawing because of dont_draw");
        return;
    }

    // ui_container.replaceChildren();

    // console.log("drawGraph option_series_map", option_series_map);

    // updateSelectedSeriesList();
    if (g_selected_series_list === null || g_selected_series_list === undefined)
    {
        console.log("drawGraph() not drawing because selected_series_list is null");
        return;
    }
    var series_list = g_selected_series_list;
    // console.log("drawGraph series_list length =", series_list.length);

    if (series_list === undefined || series_list.length == 0)
    {
        console.log("drawGraph() not drawing because of empty series list");
        return;
    }

    // console.log("drawGraph()");

    if (graphing_program_information === null)
    {
        return;
    }


    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (getGraphingMode() != GRAPHING_MODE_TIME_SERIES)
    {
        return;
    }

    clearGraph();

    // gl.scissor(g_main_viewport.x, g_main_viewport.y, g_main_viewport.width, g_main_viewport.height);
    // gl.enable(gl.SCISSOR_TEST);
    // gl.clearColor(g_graph_clear_color.x, g_graph_clear_color.y, g_graph_clear_color.z, g_graph_clear_color.w); 
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.clearColor(g_clear_color.x, g_clear_color.y, g_clear_color.z, g_clear_color.w); 
    // gl.disable(gl.SCISSOR_TEST);

    gl.useProgram(graphing_program_information.program);
    setupModelviewMatrix(g_scale, g_offset, graphing_program_information.uniform_locations.modelview_matrix, modelview_matrix);

    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const data_offset = 0;
    // console.log("minimum, maximum", minimum, maximum);

    let index_type = gl.UNSIGNED_INT;
    let buffer_offset = 0;
    let wide_series = undefined; 
    let wide_series_index_buffer = undefined;
    let wide_series_indices_length = 0;
    let screen_size_factor = 4000 / window.screen.width; 

    g_point_size = (g_scale.x * 2 * screen_size_factor) + 2;
    g_point_size = g_point_size > 4 ? 4 : g_point_size;
    g_point_size *= g_user_point_scaling;
    
    gl.uniform1f(graphing_program_information.uniform_locations.point_size, g_point_size);

    gl.uniform1f(graphing_program_information.uniform_locations.min_x, g_minimum.x);
    gl.uniform1f(graphing_program_information.uniform_locations.max_x, g_maximum.x);
    // console.log("drawGraph g_minimum g_maximum 1", g_minimum, g_maximum);
    gl.uniform1f(graphing_program_information.uniform_locations.min_y, g_minimum.y);
    gl.uniform1f(graphing_program_information.uniform_locations.max_y, g_maximum.y);
    gl.uniform1f(graphing_program_information.uniform_locations.x_offset, 0);
    gl.uniform1f(graphing_program_information.uniform_locations.y_offset, 0);
    gl.uniform1f(graphing_program_information.uniform_locations.z_offset, 0);
    gl.uniform4fv(graphing_program_information.uniform_locations.color, point_color.toArray());

    // gl.uniform4f(graphing_program_information.uniform_locations.borderColor, 0.0, 0.0, 0.0, 1.0); // Black border color
    // gl.uniform1f(graphing_program_information.uniform_locations.borderWidth, 0.02); // Border width in normalized coordinates
    // gl.uniform2f(graphing_program_information.uniform_locations.resolution, glcanvas_width, glcanvas_height);

    gl.uniformMatrix4fv(
        graphing_program_information.uniform_locations.modelview_matrix,
        false,
        modelview_matrix.value());

    // console.log("selected_series_list length =", selected_series_list.length);
    let bar_chart_drawn = false;

    let drawn_series_list = [];


    let red_corners_list = [];
    let blue_corners_list = [];

    main_title_label.innerHTML = main_title_input.value;
    verticalAxisLabelChanged();
    horizontalAxisLabelChanged();

    drawInnerAndOuterBorders(g_main_viewport, graphing_program_information.uniform_locations.modelview_matrix, graphing_program_information.attribute_locations.raw_coordinates, 
        graphing_program_information.uniform_locations.color, border_color, modelview_matrix, g_minimum, g_maximum);
    var use_integers = false;
    drawGrid(g_main_viewport, g_main_viewport_borders, g_scale, g_offset, g_minimum, g_maximum, graphing_program_information.attribute_locations.raw_coordinates, 
        graphing_program_information.uniform_locations.color, graphing_program_information.uniform_locations.modelview_matrix, modelview_matrix, use_integers);

    for (var i = 0; i < series_list.length; i++)
    {   
        let series_ = series_list[i];

        // console.log("drawGraph i series.minimum series.visible_minimum", i, series_.name, series_.minimum, series_.visible_minimum);

        if (barChart())
        {
                    // console.log("Bar chart");

            if (i < series_list.length)
            {
                let previous_x = undefined;
                let minimum_x_delta = Number.MAX_SAFE_INTEGER;
                let series = series_list[i];

                let graph_positions = getPositionArray(series);
                // console.log(graph_positions);

                let [visible_count, visible_average, visible_total, local_visible_point_list, total_point_count] = 
                    visiblePointList(g_main_viewport, [series], g_scale, g_offset, g_minimum, g_maximum);

                let visible_graph_positions = [];
                visible_point_count = visible_count;

                for (let j = 0; j < local_visible_point_list.length; j++)
                {
                    let point = local_visible_point_list[j];
                    visible_graph_positions.push(point.x, point.y);
                }


                graph_positions = visible_graph_positions;

                // if (local_visible_point_list.length * series_list.length < MAX_BAR_CHART_BAR_COUNT)
                {
                    for (let j = 0; j < graph_positions.length; j += 2)
                    {
                        let x = graph_positions[j];
    
                        if (previous_x !== undefined)
                        {
                            if (x - previous_x < minimum_x_delta)
                            {
                                minimum_x_delta = x - previous_x
                                // console.log("minimum_x_delta", minimum_x_delta);
                            }
                        }
    
                        if (!isNaN(x))
                        {
                            previous_x = x;
                        }
                                // console.log(x);
                    }
    
                    // console.log("minimum_x_delta", minimum_x_delta);
                    let screen_corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
                    let visible_range = new Vec2(screen_corners[1].x - screen_corners[0].x, screen_corners[1].y - screen_corners[0].y);
    
                    let bar_width = Math.max(minimum_x_delta, visible_range.x / g_main_viewport.width);
                    let bar_width_fraction = 0.9;
                    let half_bar_width = bar_width / 2 * bar_width_fraction;
                    // console.log("visible_range", visible_range, "screen_corners", screen_corners, "bar_width", bar_width);

                    let corners_list = [];
                    let colors = [];
                    let rectangle_list = [];

                    for (let j = 0; j < graph_positions.length; j += 2)
                    {
                        let x = graph_positions[j];
                        let y = graph_positions[j + 1];

                        if (x < screen_corners[0].x || x > screen_corners[1].x)
                        {
                            continue;
                        }
                        // if (y < screen_corners[0].y || y > screen_corners[1].y)
                        // {
                        //     continue;
                        // }

                        
                        if (Math.abs(y) < 0.01)
                        {
                            y = visible_range.y / g_main_viewport.height;
                        }

                        let one_pixel = onePixelDelta();

                        if (y >= screen_corners[0].y)
                        {
                            // Make sure the bar is visible
                            if ((y - screen_corners[0].y) < (2 * one_pixel.y))
                            {
                                y = screen_corners[0].y + (2 * one_pixel.y);
                            }
                        }

                        if (y > screen_corners[1].y)
                        {
                            y = screen_corners[1].y;
                        }

                        rectangle_list.push(x);
                        rectangle_list.push(y);
                    }

                    // if (rectangle_list.length <= MAX_BAR_CHART_BAR_COUNT)
                    {
                        for (let j = 0; j < rectangle_list.length; j += 2)
                        {
                            let x = rectangle_list[j];
                            let y = rectangle_list[j + 1];
                            
                            let start_corner = new Vec2(x - half_bar_width, g_bar_chart_center_y_value);
                            let end_corner = new Vec2(x + half_bar_width, y);
                            var corners = [start_corner, end_corner];
                            var color = [0.0, 0.0, 1.0, 0.40];
                            let red = [1.0, 0.0, 0.0, 1.0];
                            let blue = [0.0, 0.0, 1.0, 1.0];
    
                            // corners[0].x, corners[0].y, 
                            // corners[1].x, corners[0].y, 
                            // corners[0].x, corners[1].y,
                            // corners[0].x, corners[1].y,
                            // corners[1].x, corners[0].y,
                            // corners[1].x, corners[1].y, 
    
                            // corners_list.push(corners[0].x, corners[0].y);
                            // corners_list.push(corners[1].x, corners[0].y);
                            // corners_list.push(corners[0].x, corners[1].y);
                            // corners_list.push(corners[0].x, corners[1].y);
                            // corners_list.push(corners[1].x, corners[0].y);
                            // corners_list.push(corners[1].x, corners[1].y);

                            let color_corner_list = blue_corners_list;
    
                            let converted_y = units_select.value == "C" ? fToC(corners[1].y) : corners[1].y;
                            converted_y = corners[1].y;

                            if (converted_y > g_bar_chart_center_y_value)
                            {
                                colors.push(red);
                                color_corner_list = red_corners_list;
                            }
                            else
                            {
                                colors.push(blue);
                            }
    
                            color_corner_list.push(corners[0].x, corners[0].y);
                            color_corner_list.push(corners[1].x, corners[0].y);
                            color_corner_list.push(corners[0].x, corners[1].y);
                            color_corner_list.push(corners[0].x, corners[1].y);
                            color_corner_list.push(corners[1].x, corners[0].y);
                            color_corner_list.push(corners[1].x, corners[1].y);

                            // console.log("rectangle corners", corners);
                
                        }
    
                        // drawRectangles(main_viewport, corners_list, graphing_program_information.uniform_locations.color, colors, graphing_program_information.attribute_locations.raw_coordinates);
    
    
                        bar_chart_drawn = true;
                        drawn_series_list.push(series);
                    }
    
                }
                // else
                // {
                //     console.log("Too many points for bar chart", local_visible_point_list.length);
                // }
            }

        }

        if (!bar_chart_drawn)
        {
            let series = null;

            // console.log(`Series List length ${series_list.length} i = ${i}`);

            if (i == series_list.length)
            {
                if (last_hovered_series !== null && g_series_to_highlight !== null && draw_wide_series )
                {
                    series = g_series_to_highlight;
                }
                else
                {
                    break;
                }
            }
            else
            {
                series = series_list[i];
                // console.log(series.name);
            }

            if (series === null)
            {
                console.log("drawGraph() series === null");
                {
                    return;
                }
            }

            if (series.candlestick !== undefined)
            {
                console.log(`${series.name} is a candlestick`);
                drawCandlestick(series.candlestick);
            }

            var graph_index_list;

            if (doNormalize())
            {
                if (continuously_normalize)
                {
                    // console.log("drawGraph g_minimum g_maximum 2", i, g_minimum, g_maximum);
                    gl.uniform1f(graphing_program_information.uniform_locations.min_y, series.visible_minimum.y);
                    gl.uniform1f(graphing_program_information.uniform_locations.max_y, series.visible_maximum.y);
                }
                else
                {
                    // console.log("drawGraph g_minimum g_maximum 3", i, g_minimum, g_maximum);
                    gl.uniform1f(graphing_program_information.uniform_locations.min_y, series.minimum.y);
                    gl.uniform1f(graphing_program_information.uniform_locations.max_y, series.maximum.y);
                }
            }

            let position_buffer = getPositionBuffer(series);
            let index_buffer = getIndexBuffer(series);
            let graph_positions = getPositionArray(series);
            let graph_indices = getIndexArray(series);

            if (series.series_type === undefined || series.series_type == GENERIC_SERIES_TYPE || series.series_type == HYBRID_SERIES_TYPE)
            {
                graph_index_list = series.graph_index_list;
            }
            else if (series.series_type == TEMPERATURE_STATION_SERIES_TYPE)
            {
                graph_index_list = series.graph_index_list[type_select.value];
            }

            if (position_buffer == null)
            {
                continue;
            }

            try
            {
                if (position_buffer.length == 0)
                {
                    continue;
                }
            }
            catch
            {
                console.log("No position_buffer for", series.name);
            }

            try
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
            }
            catch
            {
                console.log("Error with position buffer", series.name);
            }

            gl.enableVertexAttribArray(graphing_program_information.attribute_locations.raw_coordinates);
            gl.vertexAttribPointer(
                graphing_program_information.attribute_locations.raw_coordinates,
                numComponents,
                type,
                normalize,
                stride,
                data_offset);

            let vertex_count = graph_positions.length;
            // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffers.position);
            // gl.drawArrays(gl.LINE_STRIP, buffer_offset, vertex_count);
            let index_count = graph_indices.length;
            // console.log(index_count);

            const segment_index_buffers = [];
        
            if (vertices_changed)
            {
                // var index_array = new Uint16Array(series.graph_indices[type_select.value]);
                loadIndexData(index_buffer, graph_indices);
                // loadVertexData(position_buffer, graph_positions);

                if (series_list.length < MAX_SEGMENTED_SERIES)
                {
                    for (segment_indices of graph_index_list)
                    {
                        const segment_index_buffer = gl.createBuffer();
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, segment_index_buffer);
                        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(segment_indices), gl.STATIC_DRAW);
                        segment_index_buffers.push(segment_index_buffer);
                    }
                }
                else
                {
                    segment_index_buffers.push(index_buffer);
                }

            }
        
            if (index_buffer == null)
            {
                console.log("No index buffer for ", series.name);
                var break_here = true;
            }
        
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
            gl.uniform4fv(graphing_program_information.uniform_locations.color, series.color);

            if (series.color[0] == 0 && series.color[1] == 0 && series.color[2] == 0)
            {
                var red = Math.random();
                var green = Math.random();
                var blue = Math.random();
                series.color = [red, green, blue, 1.0];    
                // console.log(Math.floor(red * 255), Math.floor(green * 255), Math.floor(blue * 255));    
            }

            let last_series = null;

            if (series == g_series_to_highlight && draw_wide_series)
            {
                wide_series = series;
                wide_series_indices_length = graph_indices.length;
                wide_series_index_buffer = series;

                series.color = [1.0, 0.0, 0.0, 1.0];
                gl.uniform1f(graphing_program_information.uniform_locations.point_size, g_point_size * 1.5);
                gl.uniform1f(graphing_program_information.uniform_locations.z_offset, 0.0);

                for (let i = 0; i < segment_index_buffers.length; i++)
                {
                    let index_buffer = segment_index_buffers[i];
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

                    if (series_list.length < MAX_SEGMENTED_SERIES)
                    {
                        let segment = graph_index_list[i];
                        // drawWideSeries(series, segment.length, index_type, buffer_offset);
                    }
                    else
                    {
                        // drawWideSeries(series, graph_indices.length, index_type, buffer_offset);
                        // drawWideSeries(wide_series, wide_series_indices_length, index_type, buffer_offset);
                    }
                }

            }
            else
            {
                gl.uniform1f(graphing_program_information.uniform_locations.point_size, g_point_size);
                gl.uniform1f(graphing_program_information.uniform_locations.z_offset, 1.0);
                series.color = series.original_color;

                if (g_series_to_highlight !== null) 
                {
                    // // series.color[0] = series.original_color[0] * g_red_transparency;
                    // // series.color[1] = series.original_color[1] * g_red_transparency;
                    // // series.color[2] = series.original_color[2] * g_red_transparency;
                    series.color[3] = g_red_transparency;
                }
                else
                {
                    series.color[3] = 1.0;
                }

                // console.log("drawGraph series.color", series.color);

                if (vertices_changed)
                {
                    // var index_array = new Uint16Array(series.graph_indices[type_select.value]);
                    for (let i = 0; i < segment_index_buffers.length; i++)
                    {
                        let index_buffer = segment_index_buffers[i];
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
                        if (series_list.length < MAX_SEGMENTED_SERIES)
                        {
                            let segment = graph_index_list[i];
                            drawSeries(series, segment.length, index_type, buffer_offset, g_is_line_chart, draw_points = true);
                        }
                        else
                        {
                            drawSeries(series, graph_indices.length, index_type, buffer_offset, g_is_line_chart, draw_points = true);
                        }
                    }
        
                }
            }

            if (!drawn_series_list.includes(series))
            {
                drawn_series_list.push(series);
                // console.log(`${i} Adding ${series.name} to drawn_series_list : length ${series_list.length} ${drawn_series_list.length}`);
            }

            if (i < MAX_SERIES_TREND_LINES && plot_trends_checkbox.checked && graph_positions.length > 1)
            {
                if (graph_positions.length > 0) 
                {
                    let width = 2;
                    let trend_series_list =[series];
                    let [series_count, series_average, series_total, series_visible_point_list] = 
                            visiblePointList(g_main_viewport, trend_series_list, g_scale, g_offset, g_minimum, g_maximum);

                    let result = createTrendLine(series_visible_point_list);

                    if (result !== null)
                    {
                        let [trend_line, a, b, y_average, y_sum] = result;
                        drawWideLine(trend_line, series.color, 
                                     graphing_program_information.attribute_locations.raw_coordinates, 
                                     graphing_program_information.uniform_locations.color, width);
                    }

                    gl.useProgram(graphing_program_information.program);
                }
            }
        }

        let series = series_list[i];
    
        if (series.associated_bar_chart_array !== undefined)
        {
            // console.log("drawGraph series.associated_bar_chart_array.length", series.name, series.associated_bar_chart_array.length)
            if (series.associated_bar_chart_array.length > 0)
            {
                let bar_chart_corners = createBarChartVertices(series.associated_bar_chart_array, series.associated_bar_chart_scaling);
                // console.log("drawGraph bar_chart_corners", series.name, bar_chart_corners);

                loadVertexData(associated_rectangle_bar_graph_buffer, bar_chart_corners);
            
                let buffer_offset = 0;
                let color_handle = graphing_program_information.uniform_locations.color;
            
                gl.bindBuffer(gl.ARRAY_BUFFER, associated_rectangle_bar_graph_buffer);
                gl.enableVertexAttribArray(graphing_program_information.attribute_locations.raw_coordinates);
                gl.vertexAttribPointer(
                    graphing_program_information.attribute_locations.raw_coordinates,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    data_offset);
                let color = series.color;

                gl.enable(gl.BLEND);
                gl.uniform4f(color_handle, color[0], color[1], color[2], 1.0);
                let vertex_count = bar_chart_corners.length / 2;
                gl.drawArrays(gl.TRIANGLES, buffer_offset, vertex_count);
                // console.log("drawGraph drew series.associated_bar_chart_array");
                gl.disable(gl.BLEND);
            }
        }
    }

    if (wide_series !== undefined)
    {
        let [position_buffer, index_buffer] = getSeriesBuffers(wide_series);
        gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

        gl.enableVertexAttribArray(graphing_program_information.attribute_locations.raw_coordinates);
        gl.vertexAttribPointer(
            graphing_program_information.attribute_locations.raw_coordinates,
            numComponents,
            type,
            normalize,
            stride,
            data_offset);

        wide_series.color = [1.0, 0.0, 0.0, 1.0];
        gl.uniform1f(graphing_program_information.uniform_locations.point_size, g_point_size * 1.5);
        gl.uniform1f(graphing_program_information.uniform_locations.z_offset, 0.0);
        drawWideSeries(wide_series, wide_series_indices_length, index_type, buffer_offset);

        // wide_series.color = wide_series.original_color;
    }

    if (bar_chart_drawn)
    {
        loadVertexData(red_bar_graph_buffer, red_corners_list);
        loadVertexData(blue_bar_graph_buffer, blue_corners_list);
    
        let red = [1.0, 0.0, 0.0, 1.0];
        let green = [0.0, 1.0, 0.0, 1.0];
        let blue = [0.0, 0.0, 1.0, 1.0];
        let buffer_offset = 0;
        let black = [0.0, 0.0, 0.0, 1.0];
        let color_handle = graphing_program_information.uniform_locations.color;
    
        gl.bindBuffer(gl.ARRAY_BUFFER, red_bar_graph_buffer);
        gl.enableVertexAttribArray(graphing_program_information.attribute_locations.raw_coordinates);
        gl.vertexAttribPointer(
            graphing_program_information.attribute_locations.raw_coordinates,
            numComponents,
            type,
            normalize,
            stride,
            data_offset);
        gl.uniform4fv(color_handle, red);
        let vertex_count = red_corners_list.length / 2;
        gl.drawArrays(gl.TRIANGLES, buffer_offset, vertex_count);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, blue_bar_graph_buffer);
        gl.enableVertexAttribArray(graphing_program_information.attribute_locations.raw_coordinates);
        gl.vertexAttribPointer(
            graphing_program_information.attribute_locations.raw_coordinates,
            numComponents,
            type,
            normalize,
            stride,
            data_offset);
        gl.uniform4fv(color_handle, blue);
        vertex_count = blue_corners_list.length / 2;
        gl.drawArrays(gl.TRIANGLES, buffer_offset, vertex_count);
    }

    if (plot_trend_checkbox.checked && global_trend_line !== undefined)
    {
        let width = 2;

        drawWideLine(global_trend_line, trend_color, 
            graphing_program_information.attribute_locations.raw_coordinates, 
            graphing_program_information.uniform_locations.color, width);
    }

    // if (PROGRAM_NAME == "STOCKS")
    // {
    //     drawStockLabels(drawn_series_list);
    // }
    if (PROGRAM_NAME == "GRAPHING" || PROGRAM_NAME == "STOCKS")
    {
        drawSeriesLabels(drawn_series_list);
    }    

    if (auto_update_statistics && !h_key_down && !v_key_down)
    {
        // updateStatistics();
    }
    else
    {
        // console.log("Not updating statistics")
    }

    graph_drawn = true;
}

function drawSeries(series, index_count, index_type, buffer_offset, draw_lines = true, draw_points = true)
{
    if (g_red_transparency < 1.0)
    {
        // gl.enable(gl.BLEND);
    }

    gl.uniform4fv(graphing_program_information.uniform_locations.color, series.color);
    // console.log("drawSeries series_color", series.name, series.color);

    if (draw_points)
    {
        gl.drawElements(gl.POINTS, index_count, index_type, buffer_offset);
    }

    if (draw_lines)
    {
        gl.drawElements(gl.LINE_STRIP, index_count, index_type, buffer_offset);
    }

    gl.disable(gl.BLEND);
}

function drawWideSeries(series, index_count, index_type, buffer_offset)
{
    let used_minimum = g_minimum;
    let used_maximum = g_maximum;

    if (doNormalize())
    {
        if (continuously_normalize)
        {
            used_minimum.y = series.visible_minimum.y;
            used_maximum.y = series.visible_maximum.y;
        }
        else
        {
            used_minimum.y = series.minimum.y;
            used_maximum.y = series.maximum.y;
        }
    }

    let screen_corners = screenCorners(g_main_viewport, g_scale, g_offset, used_minimum, used_maximum);
    let visible_range = new Vec2(screen_corners[1].x - screen_corners[0].x, screen_corners[1].y - screen_corners[0].y);
    let delta_x = visible_range.x / g_main_viewport.width;
    let delta_y = visible_range.y / g_main_viewport.height;
    let length = Math.sqrt((delta_x * delta_x) + (delta_y * delta_y));
    let sin = delta_y / length;
    let cos = delta_x / length;

    // console.log("drawWideLine", delta_x, delta_y, sin, cos);

    let x_multiplier = Math.min(2 * sin, 5);
    let y_multiplier = Math.min(2 * cos, 5);
    x_multiplier = 1.0;
    y_multiplier = 1.0;

    // console.log("drawWideSeries g_minimum g_maximum 1", g_minimum, g_maximum);
    gl.uniform1f(graphing_program_information.uniform_locations.min_y, used_minimum.y);
    gl.uniform1f(graphing_program_information.uniform_locations.max_y, used_maximum.y);

    let draw_lines = g_is_line_chart;
    let draw_points = true;

    for (let x_offset = -delta_x * x_multiplier; x_offset <= delta_x * x_multiplier; x_offset += delta_x)
    {
        for (let y_offset = -delta_y * y_multiplier; y_offset <= delta_y * y_multiplier; y_offset += delta_y)
        {
            gl.uniform1f(graphing_program_information.uniform_locations.x_offset, x_offset);
            gl.uniform1f(graphing_program_information.uniform_locations.y_offset, y_offset);
            drawSeries(series, index_count, index_type, buffer_offset, draw_lines, draw_points);
            // Only draw points once
            draw_points = false;
        }
    }

    gl.uniform1f(graphing_program_information.uniform_locations.x_offset, 0);
    gl.uniform1f(graphing_program_information.uniform_locations.y_offset, 0);
}

function randomPointColor()
{
    const MAX_POINT_COLOR = { r : 0.8, g : 0.7, b : 0.7};
    
    let r = Math.random() > 0.1 ? Math.random() * MAX_POINT_COLOR.r : 0;
    let g = Math.random() > 0.1 ? Math.random() * MAX_POINT_COLOR.g : 0;
    let b = Math.random() > 0.1 ? Math.random() * MAX_POINT_COLOR.b : 0;

    let result = [r, g, b, 1.0];

    // console.log("randomPointColor", result);
    return result;
}

function colorsNearPoint(x, y, viewport)
{
    var left_edge = (x == 0) ? true : false;
    var right_edge = (x == (viewport.width - 1)) ? true : false;
    var bottom_edge = (y == 0) ? true : false;
    var top_edge = (y == (viewport.height - 1)) ? true : false;

    var pixels = new Uint8Array(9 * 4);

    var screen_x = x + viewport.x;
    var screen_y = y + viewport.y;

    if (!left_edge && !right_edge && !bottom_edge && !top_edge)
    {
        gl.readPixels(screen_x-1, screen_y-1, 3, 3, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    // These should not be needed because there is always an empty border around the data
    else if (left_edge && !bottom_edge && !top_edge)
    {
        gl.readPixels(screen_x, screen_y-1, 2, 3, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    else if (left_edge && bottom_edge)
    {
        gl.readPixels(screen_x, screen_y, 2, 2, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    else if (left_edge && top_edge)
    {
        gl.readPixels(screen_x, screen_y-1, 2, 2, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    else if (right_edge && !bottom_edge && !top_edge)
    {
        gl.readPixels(screen_x-1, screen_y-1, 2, 3, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    else if (right_edge && bottom_edge)
    {
        gl.readPixels(screen_x-1, screen_y, 2, 2, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    else if (right_edge && top_edge)
    {
        gl.readPixels(screen_x-1, screen_y-1, 2, 2, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    else if (top_edge)
    {
        gl.readPixels(screen_x, screen_y-1, 3, 2, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    else if (bottom_edge)
    {
        gl.readPixels(screen_x, screen_y, 3, 2, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }

    return pixels;
}

function valuesAtPoint(x, y)
{
    var unzoomed_viewport_coordinates = unzoomedViewportCoordinates(g_main_viewport, x, y, g_scale, g_offset);
    // console.log("unzoomed_viewport_coordinates", unzoomed_viewport_coordinates, x, y);

    let pixels = colorsNearPoint(x, y, g_main_viewport);
    // console.log("PIXELS", pixels);

    var valid_point = false;
    var closest = new Vec2();
    var closest_valid_series = null;
    let non_background_pixel_found = false; 

    for (let i = 0; i < 9; i++)
    {
        let index = i * 4;
        let background_red = Math.round(g_graph_clear_color.x * 255);
        let background_green = Math.round(g_graph_clear_color.y * 255);
        let background_blue = Math.round(g_graph_clear_color.z * 255);

        if (pixels[index + 0] != background_red || pixels[index + 1] != background_green || pixels[index + 2] != background_blue)
        {
            let grid_red = Math.floor(grid_color[0] * 255);
            let grid_green = Math.floor(grid_color[1] * 255);
            let grid_blue = Math.floor(grid_color[2] * 255);

            // This is a hack which is needed because of grid blending
            let grid_color_actual = 112;

            if (pixels[index + 0] != grid_color_actual || pixels[index + 1] != grid_color_actual || pixels[index + 2] != grid_color_actual)
            {
                // console.log("pixels", grid_color, pixels[index + 0], pixels[index + 1], pixels[index + 2])
                non_background_pixel_found = true;
                // console.log("pixels", pixels[index + 0], pixels[index + 1], pixels[index + 2])
                break;
            }
        }
    }

    if (non_background_pixel_found)
    {
        for (var i = 0; i < g_selected_series_list.length; i++)
        {
            var series = g_selected_series_list[i];

            if (series === null)
            {
                continue;
            }

            var red = Math.round(series.color[0] * 255);
            var green = Math.round(series.color[1] * 255);
            var blue = Math.round(series.color[2] * 255);
            // console.log("series", red, green, blue);
        
            for (var j = 0; j < 9; j++)
            {
                index = j * 4;
        
                try
                {
                    // console.log(red, green, blue, pixels);
    
                    // console.log(pixels[index+0], pixels[index+1], pixels[index+2], red, green, blue);

                    if (g_selected_series_list.length == 1)
                    {
                        tolerance = 255;
                    }
                    else
                    {
                        tolerance = 2;
                    }

                    if (withinTolerance(tolerance, pixels[index + 0], red) &&
                        withinTolerance(tolerance, pixels[index + 1], green) &&
                        withinTolerance(tolerance, pixels[index + 2], blue))
                    {
                        valid_point = true;
                        var x_value = g_minimum.x + (unzoomed_viewport_coordinates.x / g_main_viewport.width) * range(g_minimum, g_maximum).x;
                        var y_value = g_minimum.y + (unzoomed_viewport_coordinates.y / g_main_viewport.height) * range(g_minimum, g_maximum).y;
                        // console.log("valuesAtPoint", x, y, x_value, y_value);
                        [closest_valid_series, closest] = findClosestData(g_main_viewport, x_value, y_value);

                        const ACCEPTABLE_TOLERANCE = 0.005;

                        if (Math.abs(closest.y - y_value) / range(g_minimum, g_maximum).y > ACCEPTABLE_TOLERANCE ||
                            Math.abs(closest.x - x_value) / range(g_minimum, g_maximum).x > ACCEPTABLE_TOLERANCE)
                        {
                            valid_point = false;
                        }


                        return [valid_point, closest_valid_series, closest];
                    }
                }
                catch
                {
    
                }
            }
        }    
    }

    return [valid_point, closest_valid_series, closest];
}

function findClosestData(viewport, x, y)
{
    var corners = screenCorners(viewport, g_scale, g_offset, g_minimum, g_maximum);
    var visible_range_vector = new Vec2(corners[1].x - corners[0].x, corners[1].y - corners[0].y);
    var closest = new Vec2(0, 0);
    var closest_length = Number.MAX_VALUE;
    var closest_valid_series;
    var point_offset;
    var data_x;
    var data_y;
    var x_length;
    var y_length;
    var length;

    for (var i = 0; i <g_selected_series_list.length; i++)
    {
        var series = g_selected_series_list[i];

        let graph_indices = getIndexArray(series);
        let graph_positions = getPositionArray(series);

        for (var j = 0; j < graph_indices.length; j++)
        {
            point_offset = graph_indices[j] * number_of_coordinates_per_point;
            data_x = graph_positions[point_offset];
            data_y = graph_positions[point_offset + 1];
            x_length = (data_x - x) / visible_range_vector.x;
            y_length = (data_y - y) / visible_range_vector.y;
            
            length = Math.sqrt((x_length * x_length) + (y_length * y_length));
    
            if (length < closest_length)
            {
                closest.x = data_x;
                closest.y = data_y;
                closest_length = length;
                closest_valid_series = series;
                // console.log(x, y, data_x, data_y, x_length, y_length, length, range_vector, corners);
            }
        }
    }


    return [closest_valid_series, closest];
}

function mouseWheelTurned(event)
{
    if (!mouseWithinViewport(g_main_viewport) || getGraphingMode() == GRAPHING_MODE_CHARTS)
    {
        return;
    }

    var mouse_location = viewportCoordinates(g_main_viewport, g_main_viewport_borders, event.x, event.y);
    var viewport_center = viewportCenter(g_main_viewport);
    var delta = Vec2.subtract(mouse_location, viewport_center);
    var unscaled_delta = Vec2.divide(delta, g_scale);
    // console.log(mouse_location, viewport_center, delta, unscaled_delta);

    if (!v_key_down)
    {
        g_scale.x += event.deltaY * -0.001 * g_scale.x;
    }

    if (!h_key_down)
    {
        g_scale.y += event.deltaY * -0.001 * g_scale.y;
    }

    // console.log(scale);

    // pressed_keys_label.innerHTML += " mouse wheel";

    var new_delta = Vec2.multiply(unscaled_delta, g_scale);
    var delta_change = Vec2.subtract(new_delta, delta);
    var viewport_dimensions = new Vec2(g_main_viewport.width, g_main_viewport.height);
    var offset_change = Vec2.divide(delta_change, viewport_dimensions);
    if (!v_key_down)
    {
        g_offset.x -= offset_change.x / g_scale.x * 2;
    }
    
    if (!h_key_down)
    {
        g_offset.y -= offset_change.y / g_scale.y * 2;
    }

    document.dispatchEvent(draw_scene_event);
}


function selectByKeyword(keyword)
{
    let option_list = [];

    for (var i = 0; i < series_select.length; i++)
    {
        var option = series_select[i];
        if (option.value.includes(keyword))
        {
            option_list.push(option);
        }
    }

    if (option_list.length > 0)
    {
        for (var i = 0; i < series_select.length; i++)
        {
            var option = series_select[i];
            if (option_list.includes(option))
            {
                selectOption(option);
            }
            else
            {
                deselectOption(option)
            }
        }
    }
}

function selectNext()
{
    for (var i = 0; i < series_select.length - 1; i++)
    {
        var option = series_select[i];
        if (optionIsSelected(option))
        {
            deselectOption(option);
            selectOption(series_select[i+1])
            i++;
        }
    }

    series_select.selectedIndex--;
}

function selectPrevious()
{
    for (var i = series_select.length - 1; i > 0; i--)
    {
        var option = series_select[i];
        if (optionIsSelected(option))
        {
            deselectOption(option);
            selectOption(series_select[i-1])
            i--;
        }
    }

    series_select.selectedIndex--;
}

function selectThird()
{
    for (var i = 0; i < series_select.length - 2; i++)
    {
        var option = series_select[i];
        if (optionIsSelected(option))
        {
            deselectOption(option);
            selectOption(series_select[i+3])

            if (optionIsSelected(series_select[i+1]))
            {
                deselectOption(series_select[i+1])
                selectOption(series_select[i+4])
            }

            break;
        }
    }
    series_select.selectedIndex += 3;
}

function selectPreviousThird()
{
    for (var i = series_select.length - 2; i > 1; i--)
    {
        var option = series_select[i];
        if (optionIsSelected(option))
        {
            deselectOption(option);
            selectOption(series_select[i-3])

            if (optionIsSelected(series_select[i-1]))
            {
                deselectOption(series_select[i-1])
                selectOption(series_select[i-4])
            }
                        break;
        }
    }

    series_select.selectedIndex -= 3;
}

function getSeriesFromOption(option)
{
    return g_option_series_map.get(option);
}

function selectVisible()
{
    let visible_series_list = visibleSeriesList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);
    console.log("visible_series_list", visible_series_list);
    
    for (let i = 0; i < series_select.length; i++)
    {
        let option = series_select[i];
        let series = getSeriesFromOption(option);

        if (visible_series_list.includes(series))
        {
            selectOption(option)
        }
        else
        {
            deselectOption(option);
        }
    }

    updateSelectedSeriesList();
    document.dispatchEvent(draw_scene_event);
}

function selectAll()
{
    g_selected_series_list.length = 0;

    for (var i = 0; i < series_select.length; i++)
    {
        var option = series_select[i];
        selectOption(option);
    }

    // multipleStationsSelected();
    document.dispatchEvent(draw_scene_event);
}

function getNSIDCMonthString(month)
{
    let url_month_string = "";

    if (month == 1)
    {
        url_month_string = "01_Jan";
    }
    else if (month == 2)
    {
        url_month_string = "02_Feb";
    }
    else if (month == 3)
    {
        url_month_string = "03_Mar";
    }
    else if (month == 4)
    {
        url_month_string = "04_Apr";
    }
    else if (month == 5)
    {
        url_month_string = "05_May";
    }
    else if (month == 6)
    {
        url_month_string = "06_Jun";
    }
    else if (month == 7)
    {
        url_month_string = "07_Jul";
    }
    else if (month == 8)
    {
        url_month_string = "08_Aug";
    }
    else if (month == 9)
    {
        url_month_string = "09_Sep";
    }
    else if (month == 10)
    {
        url_month_string = "10_Oct";
    }
    else if (month == 11)
    {
        url_month_string = "11_Nov";
    }
    else if (month == 12)
    {
        url_month_string = "12_Dec";
    }

    return url_month_string;
}

function clearAllFocus() 
{
    // Blur all elements that might have focus
    console.log("clearAllFocus()");
    if (document.activeElement) 
    {
        document.activeElement.blur();
    }
}

function hideLogoTooltip() 
{
    const tooltip = document.getElementById('visitech-tooltip');
    if (tooltip) 
    {
        tooltip.remove(); // Completely remove the tooltip element
    }
}

function mouseMove(event)
{
    mouse.previous_x = mouse.x;
    mouse.previous_y = mouse.y;
    mouse.x = viewportCoordinates(g_main_viewport, g_main_viewport_borders, event.x, event.y).x;
    mouse.y = viewportCoordinates(g_main_viewport, g_main_viewport_borders, event.x, event.y).y;
    // console.log(mouse);

    mouse_moved = true;
    // console.log("mouseMove mouse_moved");

    use_centigrade = units_select.value == "C";

    if (event.target.id === 'visitech_logo') 
    {
        event.preventDefault();
        // console.log("mouseMove visitech_logo");

        let tooltip = document.getElementById('visitech-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'visitech-tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'darkgrey';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '14px';
            tooltip.style.zIndex = '1000';
            tooltip.innerText = 'Go to visitech.ai home page';
            document.body.appendChild(tooltip);
        }
        
        // Position tooltip near cursor
        tooltip.style.left = (event.pageX + 10) + 'px';
        tooltip.style.top = (event.pageY + 10) + 'px';
        tooltip.style.display = 'block';
    }
    else
    {
        hideLogoTooltip();
    }


    if (mouseInViewportOrAbove(g_main_viewport))
    {
        // shift_key_down = false;
        // ctrl_key_down = false;
        // console.log("Shift key up");

        // console.log("ctrl_key_down", ctrl_key_down);
        // minimum_x_input.addEventListener('mouseleave', function() { this.blur(); } );
        // maximum_x_input.addEventListener('mouseleave', function() { this.blur(); } );
        // minimum_y_input.addEventListener('mouseleave', function() { this.blur(); } );
        // maximum_y_input.addEventListener('mouseleave', function() { this.blur(); } );
        minimum_x_input.blur();
        maximum_x_input.blur();
        minimum_y_input.blur();
        maximum_y_input.blur();
    }

    if (mouseInLabelContainer())
    {
        let scroll_container = document.getElementById("scroll_container");

        if (scroll_container === null)
        {
            return;
        }

        if (!g_label_container_has_focus)
        {
            // console.log("mouseMove mouseInLabelContainer clearAllFocus");
            clearAllFocus();

            if (ui_container.contains(x_y_label))
            {
                ui_container.removeChild(x_y_label);
            }

            // console.log("mouseMove scroll_container.focus()");
            scroll_container.focus();
        }
    }

    if (!mouseWithinViewport(g_main_viewport))
    {
        return;
    }

    AI_query_input.blur();
    main_title_input.blur();
    vertical_axis_title_input.blur();
    horizontal_axis_title_input.blur();

    // clearAllFocus();

    //console.log(event.x, event.y, mouse.x, mouse.y);

    var something_changed = false;

    try
    {
        if (ui_container.contains(x_y_label))
        {
            ui_container.removeChild(x_y_label);
        }
    }
    catch (error)
    {
        console.log("Exception at ui_container.removeChild(x_y_label)");
    }

    if (getGraphingMode() == GRAPHING_MODE_CHARTS)
    {
        let pixels = colorsNearPoint(mouse.x, mouse.y, g_main_viewport);
        // console.log("mouseMove Chart colors", pixels);

        for (let i = 0; i < pixels.length; i += 4)
        {
            let pixel = pixels.slice(i, i+4);
            let color_string = rgbaArrayToRGBHexString(pixel);

            if (color_string === CHART_CLEAR_COLOR_STRING)
            {
                continue;
            }

            // console.log("mouseMove color_string ", color_string);

            for (let j = 0; j < g_chart_data.length && i < MAX_CHART_ELEMENT_COUNT; j++)
            {
                let chart_data = g_chart_data[j];


                if (areColorsSimilar(chart_data.color, color_string, 1))
                {
                    // console.log("mouseMove chart data ", chart_data);
                    g_chart_highlighted_index = j;
                    drawCharts()
                    updateChartLabels(chart_data, "black", CHART_LABEL_TEXT_LENGTH);
                    return;
                }
            }
            // if (g_chart_color_data_map.has(color_string))
            // {
            //     let chart_data = g_chart_color_data_map.get(color_string);
            //     console.log("mouseMove chart data ", chart_data);
            //     return;
            // }
        }
        return;
    }

    if (mouse.pressed_button == "BUTTON_0")
    {
        // console.log("mouseMove thinks BUTTON_0 is pressed");
        if (mouse.y >= 0)
        {
            // console.log(mouse.pressed_button, mouse.changeSinceLastMove(), mouse.changeSinceButtonDown());
            g_offset.x += mouse.changeSinceLastMove()[0] / g_main_viewport.width / g_scale.x * 2;
            g_offset.y += mouse.changeSinceLastMove()[1] / g_main_viewport.height / g_scale.y * 2;
            something_changed = true;
            // console.log(offset_x);
        }
    }
    else if (mouse.pressed_button == BUTTON_2)
    {
        var start_corner = valuesAtPixel(g_main_viewport, mouse.pressed_x, mouse.pressed_y, g_scale, g_offset, g_minimum, g_maximum);
        var end_corner = valuesAtPixel(g_main_viewport, mouse.x, mouse.y, g_scale, g_offset, g_minimum, g_maximum);
        var corners = [start_corner, end_corner];
        var color = [0.0, 0.0, 1.0, 0.40];
        drawGraph();
        drawRectangle(g_main_viewport, corners, graphing_program_information.uniform_locations.color, color, graphing_program_information.attribute_locations.raw_coordinates);
        return;
    }
    else if (parseInt(count_label.innerHTML) < maximum_point_search_count)
    {
        let current_time = Date.now();

        if (current_time - previous_point_search_time >= minimum_time_between_point_searches )
        {
            let [valid, closest_valid_series, values_at_point] = valuesAtPoint(mouse.x, mouse.y);
            previous_point_search_time = Date.now();

            if (valid)
            {
                // console.log(mouse.x, mouse.y, closest_valid_series, values_at_point);
                // valuesAtPoint(mouse.x, mouse.y);
            }
        
            if (valid && mouse.pressed_button == NO_BUTTON)
            {
                var date = values_at_point.x;
                var date_string = GraphingUtilities.dateString(date); 

                if (series_select.value.includes("FFT"))
                {
                    date_string = date.toString();
                }
                var x_label = document.getElementById('x_label');
                x_label.innerHTML = date_string;
                var y_label = document.getElementById('y_label');
                var display_value = values_at_point.y;
                var units_string = "";
                var y_string = "";
                
                if (usingUserData())
                {
                    if (use_centigrade)
                    {
                        display_value = fToC(display_value);
                        units_string =  "C";
                    }    

                    y_string = (Math.round(display_value * 100) / 100).toFixed(2) + units_string;
                }
                else if (type_select.value == TMAX || type_select.value == TMIN)
                {
                    if (use_centigrade)
                    {
                        display_value = fToC(display_value);
                    }    
                    units_string =  use_centigrade ? "C" : "F";
                    y_string = (Math.round(display_value * 100) / 100).toFixed(2) + units_string;
                }
                else if (type_select.value == PRCP || type_select.value == SNOW)
                {
                    if (use_centigrade)
                    {
                        display_value = inchesToMM(display_value);
                    }
        
                    units_string =  use_centigrade ? " mm" : " in";
                    let [lower_left, upper_right] = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
                    let y_delta = upper_right.y - lower_left.y;
                    y_string = (Math.round(display_value * 100) / 100).toFixed(2) + units_string;
                }
                y_label.innerHTML = y_string;
                // console.log(mouse.x, mouse.y, viewport_coordinates, date_string, values_at_point.y);
                try
                {
                    ui_container.removeChild(x_y_label);
                }
                catch (error)
                {
        
                }
        
                if (valid && closest_valid_series != null && !mouseInLabelContainer())
                {
                    last_hovered_series = closest_valid_series;
                    setStationInformationLabel(closest_valid_series);
    
                    x_y_label = document.createElement("Label");
                    var label_string = closest_valid_series.name + "<br>" + date_string + " " + y_string;
                    x_y_label.innerHTML = label_string.trim();
                    x_y_label.style.position = "absolute";
                    x_y_label.style.fontSize = "20px";
                    x_y_label.style.fontStyle = "bold";
                    x_y_label.style.textAlign = "center";
                    x_y_label.style.width = x_y_label_dimensions.x.toString() + "px";

                    let label_height = x_y_label_dimensions.y;

                    if (label_string.length > 40)
                    {
                        label_height += 15;
                    }

                    if (label_string.length > 60)
                    {
                        label_height += 20;
                    }

                    x_y_label.style.height = label_height.toString() + "px";
                    x_y_label.style.zIndex = "1000";
            
                    // console.log(main_viewport.height, mouse, x_y_label_dimensions);
            
                    x_y_label.style.bottom = (mouse.y + g_main_viewport_borders.bottom + 10).toString() + "px";
                    // x_y_label_dimensions.y = 80;
                    // // console.log("x_y_label.innerHTML.length", x_y_label.innerHTML.length);
                    // if (x_y_label.innerHTML.length > 20)
                    // {
                    //     x_y_label_dimensions.y = 100;
                    // }s
    
                    var main_viewport_center = viewportCenter(g_main_viewport);
    
                    if (mouse.y < main_viewport_center.y)
                    {
                        {
                            x_y_label.style.bottom = (mouse.y + g_main_viewport_borders.bottom - x_y_label_dimensions.y + 50).toString() + "px";
                        }
                    }
                    else
                    {
                        {
                            x_y_label.style.bottom = (mouse.y + g_main_viewport_borders.bottom - x_y_label_dimensions.y - 1).toString() + "px";
                        }
                    }
            
                    if (mouse.x < main_viewport_center.x)
                    {
                        x_y_label.style.left = (mouse.x + g_main_viewport_borders.left + 10).toString() + "px";
                    }
                    else
                    {
                        x_y_label.style.left = (mouse.x + g_main_viewport_borders.left - x_y_label_dimensions.x - 10).toString() + "px";
                    }
                    x_y_label.style.text_outline = "1px black solid";
                    x_y_label.style.color = GraphingUtilities.rgbaStringFromArray(x_y_label_color)
                    x_y_label.style.background = GraphingUtilities.rgbaStringFromArray(x_y_label_background_color)
            
                    ui_container.appendChild(x_y_label);
                }
                else
                {
                    last_hovered_series = null;
                }
            }
            else
            {
                // last_hovered_series = null;
            }
        }
    }

    if (something_changed)
    {
        document.dispatchEvent(draw_scene_event);
    } 
}

function shaderLoaded()
{
    if (bothShadersLoaded())
    {
        setupGL();
    }
}

function loadData()
{
    loadTextFile("data/" + selected_series.name + ".csv", dataFileLoaded);
}

function onePixelDelta()
{
    let screen_corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
    let visible_range = new Vec2(screen_corners[1].x - screen_corners[0].x, screen_corners[1].y - screen_corners[0].y);
    let one_pixel = new Vec2(visible_range.x / g_main_viewport.width, visible_range.y / g_main_viewport.height);
    return one_pixel;
}

function keyDown(event) 
{
    const key_name = event.key;
    current_pressed_keys = event.key;
    console.log("keyDown", event.key);

    let key_down_string = "";

    if (shiftKeyDown())
    {
        key_down_string += "Shift ";
    }
    if (controlKeyDown())
    {
        key_down_string += "Ctrl ";
    }

    key_down_string += event.key == "Control" ? "Ctrl" : event.key;
    pressed_keys_label.innerHTML = key_down_string;


    let one_pixel = onePixelDelta();
    let screen_corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);

    if (mouseInLabelContainer())
    {
        let scroll_container = document.getElementById("scroll_container");

        if (event.key == "ArrowUp" || event.key == "ArrowDown")
        {
            handleLabelContainerNavigation(event);
        }
    }


    if (!mouseWithinViewport(g_main_viewport) && key_name != "Control" && key_name != "Shift")
    {
        key_pressed_since_last_timeout = false;
        key_released_since_last_timeout = false;
        console.log("Clearing key_pressed_since_last_timeout");
        
        return;
    }

    key_pressed_since_last_timeout = true;
    console.log("Setting key_pressed_since_last_timeout");

    const left_arrow = "37";
    const right_arrow = "39";

    if (key_name == "h")
    {
        h_key_down = true;
    }
    else if (key_name == "v")
    {
        v_key_down = true;
    }
    else if (key_name == "ArrowLeft" && !shiftKeyDown())
    {
        // offset.x -= 0.01  * scroll_speed / scale.x;
        screen_corners[0].x += (one_pixel.x * scroll_speed);
        screen_corners[1].x += (one_pixel.x * scroll_speed);
        zoomToNewScreenCorners(g_main_viewport, screen_corners[0], screen_corners[1], 0, g_scale, g_offset, g_minimum, g_maximum);
        // document.dispatchEvent(draw_scene_event);
    }
    else if (key_name == "ArrowRight" && !shiftKeyDown())
    {
        // offset.x += 0.01   * scroll_speed / scale.x;
        screen_corners[0].x -= (one_pixel.x * scroll_speed);
        screen_corners[1].x -= (one_pixel.x * scroll_speed);
        zoomToNewScreenCorners(g_main_viewport, screen_corners[0], screen_corners[1], 0, g_scale, g_offset, g_minimum, g_maximum);
        // document.dispatchEvent(draw_scene_event);
    }
    else if (key_name == "ArrowUp")
    {
        if (document.activeElement.toString().includes("HTMLSelectElement"))
        {
            return;
        }
        
        // offset.y += 0.01  * scroll_speed / scale.y;
        screen_corners[0].y -= (one_pixel.y * scroll_speed);
        screen_corners[1].y -= (one_pixel.y * scroll_speed);
        zoomToNewScreenCorners(g_main_viewport, screen_corners[0], screen_corners[1], 0, g_scale, g_offset, g_minimum, g_maximum);
        // document.dispatchEvent(draw_scene_event);
    }
    else if (key_name == "ArrowDown")
    {
        if (document.activeElement.toString().includes("HTMLSelectElement"))
        {
            return;
        }

        // offset.y -= 0.01   * scroll_speed / scale.y;
        screen_corners[0].y += (one_pixel.y * scroll_speed);
        screen_corners[1].y += (one_pixel.y * scroll_speed);
        zoomToNewScreenCorners(g_main_viewport, screen_corners[0], screen_corners[1], 0, g_scale, g_offset, g_minimum, g_maximum);
        // document.dispatchEvent(draw_scene_event);
    }
    else if (key_name == "Control")
    {
        if (!controlKeyDown())
        {
            ctrl_key_down = true;
            console.log("ctrl_key_down", ctrl_key_down);
        }
    }
    else if (key_name == "Shift")
    {
        shift_key_down = true;
        console.log("Shift key down");
    }
    
    if (controlKeyDown())
    {
        if (key_name == "Z")
        {
            resetZoom();
        }
        else if (key_name == "X")
        {
            generate_fft = false;
            screenshot();
        }
        else if (key_name == "F")
        {
            generate_fft = true;
            screenshot();
        }
        else if (key_name == "G")
        {
            generate_fft = false;
            generateCsvFromScreen(minimum_value, maximum_value);
        }
        else if (key_name == "Y")
        {
            if (USER_TIER <= USER_TIER_PAID)
            {
                copyToClipboard();
            }
        }
        else if (key_name == "H")
        {
            // help();
        }
        else if (key_name == "F")
        {
            dont_change_min_max = !dont_change_min_max;
            lock_screen_checkbox.checked = dont_change_min_max;
        }
        else if (key_name == "v")
        {
            if (USER_TIER <= USER_TIER_PAID)
            {
                console.log("keyDown calling addClipboardDataButtonPressed");
                addClipboardDataButtonPressed();
            }
        }
    }
    else
    {
        if (key_name == "y")
        {
            var corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
            corners[0].x += 1;
            corners[1].x += 1;
            setOffsetUsingScreenCorners(g_main_viewport, [corners[0], corners[1]], g_offset, g_minimum, g_maximum);
            document.dispatchEvent(draw_scene_event);
        }
        else if (key_name == "Y")
        {
            var corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
            corners[0].x -= 1;
            corners[1].x -= 1;
            setOffsetUsingScreenCorners(g_main_viewport, [corners[0], corners[1]], g_offset, g_minimum, g_maximum);
            document.dispatchEvent(draw_scene_event);
        }
        else if (key_name == "d")
        {
            var corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
            corners[0].x += 1 / 365;
            corners[1].x += 1 / 365;
            setOffsetUsingScreenCorners(g_main_viewport, [corners[0], corners[1]], g_offset, g_minimum, g_maximum);
            document.dispatchEvent(draw_scene_event);
        }
        else if (key_name == "D")
        {
            var corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
            corners[0].x -= 1 / 365;
            corners[1].x -= 1 / 365;
            setOffsetUsingScreenCorners(g_main_viewport, [corners[0], corners[1]], g_offset, g_minimum, g_maximum);
            document.dispatchEvent(draw_scene_event);
        }
        else if (key_name == "s")
        {
            console.log("s key pressed");
            var corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
            var screen_x_range = Math.round(corners[1].x - corners[0].x);
            corners[0].x += screen_x_range;
            corners[1].x += screen_x_range;
            setOffsetUsingScreenCorners(g_main_viewport, [corners[0], corners[1]], g_offset, g_minimum, g_maximum);
            document.dispatchEvent(draw_scene_event);
        }
        else if (key_name == "S")
        {
            var corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
            var screen_x_range = Math.round(corners[1].x - corners[0].x);
            corners[0].x -= screen_x_range;
            corners[1].x -= screen_x_range;
            setOffsetUsingScreenCorners(g_main_viewport, [corners[0], corners[1]], g_offset, g_minimum, g_maximum);
            document.dispatchEvent(draw_scene_event);
        }
        else if (
            (key_name == "e" || key_name == "E" || (key_name === "ArrowRight" && shiftKeyDown()) || (key_name === "ArrowLeft" && shiftKeyDown()))
             && mouseWithinViewport(g_main_viewport))
        {
            if (USER_TIER <= USER_TIER_PAID)
            {
                handleImages(key_name);
            }
        }
        else if (key_name == "w" && mouseWithinViewport(g_main_viewport))
        {
            draw_wide_series = !draw_wide_series;
            // console.log("draw_wide_series", draw_wide_series);
            document.dispatchEvent(draw_scene_event);
        }
        else if (key_name == "l")
        {
            calculateDeltas(g_selected_series_list[0]);
        }
        else if (key_name == "o")
        {
            MAX_SEGMENTED_SERIES = MAX_SEGMENTED_SERIES == 5 ? 0 : 5;
        }
        else if (key_name == "a")
        {
            selectByKeyword(" Adjusted");
        }
        else if (key_name == "j")
        {
            selectByKeyword(" Adjustment");
        }
        else if (key_name == "u")
        {
            selectByKeyword(" Measured");
        }
        else if (key_name == "n")
        {
            selectNext();
        }
        else if (key_name == "p")
        {
            selectPrevious();
        }
        else if (key_name == "t")
        {
            selectThird();
        }
        else if (key_name == "O")
        {
            signOut();
            // window.location.href = 'index.html';
        }
        else if (key_name == "T")
        {
            selectPreviousThird();
        }
        else if (key_name == "V")
        {
            selectVisible();
        }
        else if (key_name == "A")
        {
            selectAllSeries();
        }
        else if (key_name == "r")
        {
            // show_all_series = !show_all_series; 

            if (show_all_series)
            {
                // draw_wide_series = true;
            }
            
            createSelectedSeriesList();
            document.dispatchEvent(draw_scene_event);
        }

        const shifted_chars = {'!':'1','@':'2','#':'3','$':'4','%':'5',
                               '^':'6','&':'7','*':'8','(':'9',')':'0'};
        
        if (!event.shiftKey && parseInt(event.key) >= 0 && parseInt(event.key) <= 9) 
        {
            let transparency = parseFloat(event.key);
            g_red_transparency = transparency / 9;

            const m = (0.9 - 0.05) / (9 - 1);  // slope
            const b = 0.05 - (m * 1);          // y-intercept
            g_red_transparency =  Number((m * transparency + b).toFixed(2));
        } 
        else if (event.shiftKey) 
        {
            if (event.key in shifted_chars) 
            {
                scroll_speed = parseInt(shifted_chars[event.key]);
            }
        }
        // else if (event.key >= '0' && event.key <= '9') 
        // {
        //     console.log(`event.code ${event.code}`);
        //     if (shift_key_down)
        //     {
        //         scroll_speed = parseInt(event.key)
        //     }
        //     else
        //     {
        //         let transparency = parseFloat(event.key);
        //         red_transparency = transparency / 9;
        //     }
        // }
        // else if (event.key >= '0' && event.key <= '9')  
        // {
        //     scroll_speed = parseInt(event.key)
        // }

    }
}

function createStateMaps()
{
    state_abbreviation_to_name_map = new Map(state_abbreviations.map((key, index) => [key, state_names[index]]));
    state_name_to_abbreviation_map = new Map(state_names.map((key, index) => [key, state_abbreviations[index]]));
}

function createCountryMaps()
{
    country_abbreviation_to_name_map = new Map(country_abbreviations.map((key, index) => [key, country_names[index]]));
    country_name_to_abbreviation_map = new Map(country_names.map((key, index) => [key, country_abbreviations[index]]));
}


function image2DButton2Pressed()
{
    console.log("image2DButton2Pressed");
}

function getKeysByValue(map, search_value) 
{
    let keys = [];

    for (let [key, value] of map.entries()) 
    {
        if (value === search_value) 
        {
            keys.push(key);
        }
    }

    return keys;
}

function selectByOption(select_element, option) 
{
    for (let i = 0; i < select_element.options.length; i++) 
    {
        if (select_element.options[i] === option) 
        {
            select_element.selectedIndex = i;
            console.log("selectByOption selectedIndex", i);
            return true; // Option found and selected
        }
    }

    return false; // Option not found
}


function checkPressedKeys() 
{
    navigator.keyboard.getLayoutMap()
    .then(keyboard_layout_map =>
    {
        try 
        {
            const pressed_keys = [];

            for (const [key, value] of keyboard_layout_map.entries()) 
            {
                if (value === 'pressed') 
                {
                    pressed_keys.push(key);
                }
            }

            if (pressed_keys.length > 0) 
            {
                console.log('Pressed keys:', pressed_keys);
            } 
            else 
            {
                ctrl_key_down = false;
                shift_key_down = false;
                console.log("Shift key up");
            }
        } 
        catch (error) 
        {
            // console.error('Error getting keyboard layout map:', error);
        }
    })
}

function checkFirebaseStatus()
{
    const user = firebase.auth().currentUser;

    if (user) 
    {
        console.log('User is signed in');
        console.log('User ID:', user.uid);
    } 
    else 
    {
        console.log('No user is signed in');
        // window.location.href = 'index.html';
    }

}


function setDataInFirestore() {

    let message = "d2t firestore " + new Date().toString();
    firestore_db.collection("sample").doc("test").set({
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log('Data successfully set in Firestore!');
    })
    .catch((error) => {
        console.log(`Error setting data: ${error}`);
    });
}


async function graphingMain() 
{
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firestore_db = firebase.firestore();

    // chatInitialize('#chat-outer-container .chat-container');

    let window_scale_x = window.screen.width / 3000;
    let window_scale_y = window.screen.height / 2000;

    let alert_message = "If screen size is not optimal, resize with keyboard CTRL- or CTRL+";
    showDisappearingAlert(4000, "green", alert_message);

    // setWindowZoom(1, window_scale_y);

    try {
        await new Promise((resolve, reject) => 
        {
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) 
                {
                    g_current_user = user;
                    console.log("User is signed in:", user.email);
                    // updateUISignedIn();
                    await setDataInFirestore();

                    const user_ref = firestore_db.collection('users').doc(user.uid);
  
                    try 
                    {
                        const user_doc = await user_ref.get();

                        if (user_doc.exists) 
                        {
                            const data = user_doc.data();

                            if ("user_tier" in data && data.subscription_status !== undefined) 
                            {
                                if (data.subscription_status == "canceled")
                                {
                                    stripe_subscription_canceled = true;
                                    console.log("graphingMain() Subscription cancelled");
                                }
                            }

                            if ("user_tier" in data && data.subscription_end_date !== undefined) 
                            {
                                let timestamp = data.subscription_end_date;
                                USER_TIER = parseInt(data.user_tier);
                                console.log(`USER_TIER ${USER_TIER}`);

                                console.log("data.subscription_end_date", data.subscription_end_date);

                                // Calculate total milliseconds
                                let totalMilliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);

                                // Create a Date object from the milliseconds
                                let date = new Date(totalMilliseconds);

                                // Format the date to a human-readable format in UTC
                                let humanReadableUTC = date.toUTCString();

                                console.log(humanReadableUTC);
                            } 
                            else 
                            {
                                USER_TIER = USER_TIER_FREE;
                                await user_ref.set({user_tier: USER_TIER}, {merge: true});
                                console.log(`USER_TIER set to ${USER_TIER}`);
                            }

                            if (USER_TIER > USER_TIER_PAID)
                            {
                                console.log("Hiding settings and bug tracker because USER_TIER > USER_TIER_PAID");
                                settingsLink.style.display = "none";
                                bugTrackerLink.style.display = "none";
                                featureTrackerLink.style.display = "none";
                            }


                        }
                        else
                        {
                            await user_ref.set({email: user.email}, {merge: true});
                            USER_TIER = USER_TIER_FREE;
                            await user_ref.set({user_tier: USER_TIER}, {merge: true});
                            console.log(`USER_TIER set to ${USER_TIER}`);
                        }
                    } catch (error) {
                        console.error("Error checking user existence:", error);
                        reject(error);
                        return;
                    }
        
                    resolve();
                } 
                else 
                {
                    console.log("User is signed out");
                    // updateUISignedOut();
                    window.location.href = 'index.html';
                    resolve();
                }
            });
        });

        if (window.location.href.includes("visitech")) 
        {
            console.log("VISITECH");
        }
        else if (window.location.href.includes("d2t-compute")) 
        {
            console.log("d2t-compute");

            // D2T_TEST_MODE = true;

            if (USER_TIER > USER_TIER_ROOT && D2T_TEST_MODE == false)
            {
                console.log("graphingMain signing out of d2t-compute because of user tier > USER_TIER_ROOT", USER_TIER);
                window.location.href = "https://d2t-compute.com/index.html";
                await signOut();
            }
            else if (D2T_TEST_MODE)
            {
                showDisappearingAlert(5000, "green", "WARNING D2T_TEST_MODE");
            }
        }

        await initializeApplication();

        // displayMainTitleTexts();
        updateMainTitleDropdown();
    
        let current_date = new Date();
        console.log("Before generating Matrices", current_date);
        const matrices = generateMatrices();
        current_date = new Date();
        console.log("After generating Matrices", current_date);
        const result_matrix = await multiplyMatrix(matrices[0], matrices[1], MATRIX_SIZE);
        current_date = new Date();
        console.log("After multiplying Matrices on the GPU", current_date);
        const cpu_result_matrix = multiplyMatrixCpu(matrices[0], matrices[1], MATRIX_SIZE);
        current_date = new Date();
        console.log("After multiplying Matrices on the CPU", current_date);
        console.log("result_matrix", result_matrix);

        setupCanvasAndUI();
        setupWebGL();
        setupEventListeners();

        setInterval(tenMillisecondTimer, 10);

        await checkFirebaseStatus();
        await loadGraphingShadersAndSetupGL();
        createStateMaps();
        createCountryMaps();
        console.log(state_abbreviation_to_name_map, state_name_to_abbreviation_map);

        red_bar_graph_buffer = gl.createBuffer();
        blue_bar_graph_buffer = gl.createBuffer();
        associated_rectangle_bar_graph_buffer = gl.createBuffer();
    } catch (error) {
        console.error("An error occurred in graphingMain:", error);
    }
}

// ... rest of the code remains the same


function setupCanvasAndUI() 
{
    glcanvas = document.getElementById('glcanvas');
    body = document.getElementsByTagName("BODY")[0];
    body.style.margin = BODY_MARGIN.toString() + "px";
    glcanvas.width = glcanvas_width;
    glcanvas.height = glcanvas_height;
    // glcanvas.style.width = glcanvas_width.toString() + "px";
    // glcanvas.style.height = glcanvas.height.toString() + "px";
    // glcanvas.style.zIndex = "10000";
    glcanvas.style.borderRadius = "5px";
    g_main_viewport.x = g_main_viewport_borders.left;
    g_main_viewport.y = g_main_viewport_borders.bottom;
    g_main_viewport.width = glcanvas.width - g_main_viewport_borders.left - g_main_viewport_borders.right;
    g_main_viewport.height = glcanvas.height - g_main_viewport_borders.bottom - g_main_viewport_borders.top; 
    g_chart_viewport.x = g_main_viewport.x;
    g_chart_viewport.y = g_main_viewport.y;
    g_chart_viewport.width = g_main_viewport.width;
    g_chart_viewport.height = g_main_viewport.height - 10;
    g_chart_border_viewport = {x: g_chart_viewport.x - 60, y: 10, width: g_chart_viewport.width + 30, height:  g_chart_viewport.height + g_chart_viewport.y + 10};


    // setupCanvas2D('canvas2D');
    // setupCanvas2D('canvas2D_2');
    // setupCanvas2D('canvas2D_3');
    // setupCanvas2D('canvas2D_4');

    if (USER_TIER <= USER_TIER_PAID)
    {
        glcanvas.addEventListener('dragover', (event) => 
        {
            event.preventDefault();

            if (!glcanvas.classList.contains('dragover'))
            {
                let color = [0.1, 0.0, 0.1, 0.4];

                let viewport = getGraphingMode() == GRAPHING_MODE_TIME_SERIES ? g_main_viewport : g_chart_border_viewport;
                shadeViewport(viewport, color);
            }

            glcanvas.classList.add('dragover');
        });
    
        glcanvas.addEventListener('dragleave', () => 
        {
            glcanvas.classList.remove('dragover');
        });
    
        glcanvas.addEventListener('drop', (event) => 
        {
            event.preventDefault();
            glcanvas.classList.remove('dragover');
            const file = event.dataTransfer.files[0];
            if (file) 
            {
                console.log('File dropped:', file.name);
                // console.log(file);
                addUserDataFile(file);
                // Add your file processing logic here
            }
        });
    
        glcanvas.addEventListener('dragover', () => 
        {
            console.log("glcanvas dragover");
            glcanvas.style.backgroundColor = '#e0e0e0';
        });
    
        glcanvas.addEventListener('mouseout', () => 
        {
            // glcanvas.style.backgroundColor = PAID_USER_BUTTON_BACKGROUND_COLOR;

            if (getGraphingMode() == GRAPHING_MODE_TIME_SERIES)
            {
                document.dispatchEvent(draw_scene_event);
            }
        });
    }

    canvas2D = document.getElementById('canvas2D');
    canvas2D.style.left = (glcanvas_width + right_side_offset + 2).toString() + "px";
    canvas2D.style.top = g_main_viewport_borders.top.toString() + "px";
    canvas2D.style.backgroundColor = CANVAS_2D_BACKGROUND_COLOR;
    canvas2D.style.zIndex = "1";
    canvas2D_ctx = canvas2D.getContext("2d");

    canvas2D_2 = document.getElementById('canvas2D_2');
    canvas2D_2.style.left = canvas2D.style.left;
    canvas2D_2.style.backgroundColor = CANVAS_2D_BACKGROUND_COLOR;
    canvas2D_2.style.zIndex = "1";
    canvas2D_2_ctx = canvas2D_2.getContext("2d");

    canvas2D_3 = document.getElementById('canvas2D_3');
    canvas2D_3.style.left = canvas2D.style.left;
    canvas2D_3.style.backgroundColor = CANVAS_2D_BACKGROUND_COLOR;
    canvas2D_3.style.zIndex = "1";
    canvas2D_3_ctx = canvas2D_3.getContext("2d");

    canvas2D_4 = document.getElementById('canvas2D_4');
    canvas2D_4.style.left = canvas2D.style.left;
    canvas2D_4.style.backgroundColor = CANVAS_2D_BACKGROUND_COLOR;
    canvas2D_4.style.zIndex = "1";
    canvas2D_4_ctx = canvas2D_4.getContext("2d");

    hide2DCanvas();
    showChat();

    google_map_container = document.getElementById('google_map_container');
    ui_container = document.getElementById('ui_container');
    ui_container.style.position = "relative";
    ui_container.style.height = glcanvas.height.toString() + "px";
    ui_container.style.width = glcanvas.width.toString() + "px";

    instrumentation_container = document.getElementById('instrumentation_container');
    instrumentation_container.style.height = INSTRUMENTATION_CONTAINER_HEIGHT.toString() + "px";
}

function hideChat()
{
    if (USER_TIER > USER_TIER_PAID)
    {
        return;
    }

    if (chatHeader === undefined || chatHeader === null)
    {
        return;
    }

    chatHeader.style.visibility = "hidden";
    chatMessagesArea.style.visibility = "hidden";
    // chatContainer.style.backgroundColor = "#eaeaea"; 
}

function showChat()
{
    if (USER_TIER > USER_TIER_PAID)
    {
        return;
    }

    if (chatHeader === undefined || chatHeader === null)
    {
        return;
    }

    chatHeader.style.visibility = "visible";
    chatMessagesArea.style.visibility = "visible";
    hideGoogleMap();
    // chatContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
}

function showGoogleMap()
{
    if (USER_TIER > USER_TIER_PAID)
    {
        return;
    }

    if (google_map_container !== undefined && google_map_container !== null)
    {
        google_map_container.style.visibility = "visible";
    }
}

function hideGoogleMap()
{
    if (USER_TIER > USER_TIER_PAID)
    {
        return;
    }

    if (google_map_container !== undefined && google_map_container !== null)
    {
        google_map_container.style.visibility = "hidden";
    }
}

function hide2DCanvas()
{
    if (USER_TIER > USER_TIER_PAID)
    {
        return;
    }

    canvas2D.style.visibility = "hidden";
    canvas2D_2.style.visibility = "hidden";
    canvas2D_3.style.visibility = "hidden";
    canvas2D_4.style.visibility = "hidden";
    canvas2D.style.zIndex = "1";
    canvas2D_2.style.zIndex = "1";
    canvas2D_3.style.zIndex = "1";
    canvas2D_4.style.zIndex = "1";
}

function show2DCanvas()
{
    if (USER_TIER > USER_TIER_PAID)
    {
        return;
    }

    canvas2D.style.visibility = "visible";
    canvas2D_2.style.visibility = "visible";
    canvas2D_3.style.visibility = "visible";
    canvas2D_4.style.visibility = "visible";
    canvas2D.style.zIndex = "1001";
    canvas2D_2.style.zIndex = "1001";
    canvas2D_3.style.zIndex = "1001";
    canvas2D_4.style.zIndex = "1001";
    hideGoogleMap();
}

function setupCanvas2D(canvas, id) 
{
    if (USER_TIER > USER_TIER_PAID)
    {
        return;
    }

    canvas = document.getElementById(id);
    canvas.style.left = glcanvas_width.toString() + "px";
    canvas.stylebackgroundColor = CANVAS_2D_BACKGROUND_COLOR;
    if (id === 'canvas2D') {
        canvas.style.top = g_main_viewport_borders.top.toString() + "px";
    }
    window[id + '_ctx'] = canvas.getContext("2d");
}

function setupWebGL() {
    gl = glcanvas.getContext('webgl2', {preserveDrawingBuffer: true, antialias: false});

    if (!gl) {
        alert('Unable to initialize WebGL 2. Your browser or machine may not support it.');
        return;
    }

    position_buffer = gl.createBuffer();
    index_buffer = gl.createBuffer();

    let metadata = {country: "", id: "", latitude: "", longitude: "", elevation: ""};
    statistics_layers_map.set(YEARLY_MINIMUM, new Series(YEARLY_MINIMUM, "", metadata));
    statistics_layers_map.set(YEARLY_MAXIMUM, new Series(YEARLY_MAXIMUM, "", metadata));
    statistics_layers_map.set(YEARLY_AVERAGE, new Series(YEARLY_AVERAGE, "", metadata));
    statistics_layers_map.set(DAILY_AVERAGE, new Series(DAILY_AVERAGE, "", metadata));
    statistics_layers_map.set(DAILY_TOTAL, new Series(DAILY_TOTAL, "", metadata));

    vertex_buffers = {
        position: position_buffer,
        index: index_buffer
    };

    initializePieColumnChartShaders(gl);
    // setGraphingMode(GRAPHING_MODE_CHARTS);
    // drawGraph();
    // renderColumnChartWithWebGL(gl, g_chart_viewport, webglchart_dataSeries);
    // setGraphingMode(GRAPHING_MODE_TIME_SERIES);
    // console.log("Rendered test column chart");
}

function getGraphingMode()
{
    return GRAPHING_MODE;
}

function setGraphingMode(mode)
{
    if (mode == GRAPHING_MODE_CHARTS)
    {
        x_axis_label.style.visibility = "hidden";
        y_axis_label.style.visibility = "hidden";
        getChartLegendContainer().style.visibility = "visible";
        getGraphingColumnChartLabel().style.visibility = "visible";
        getGraphingPieChartLabel().style.visibility = "visible";
        getGraphingColumnMaxScaleLabel().style.visibility = "visible";
        getGraphingColumnMinScaleLabel().style.visibility = "visible";

        getInstrumentationContainer().style.visibility = "hidden";
        getGraphingControlsContainer().style.visibility = "hidden";
    }
    else
    {
        x_axis_label.style.visibility = "visible";
        y_axis_label.style.visibility = "visible";
        getChartLegendContainer().style.visibility = "hidden";
        getGraphingColumnChartLabel().style.visibility = "hidden";
        getGraphingPieChartLabel().style.visibility = "hidden";
        getGraphingColumnMaxScaleLabel().style.visibility = "hidden";
        getGraphingColumnMinScaleLabel().style.visibility = "hidden";

        getInstrumentationContainer().style.visibility = "visible";
        getGraphingControlsContainer().style.visibility = "visible";
    }

    GRAPHING_MODE = mode;
}

function setupEventListeners() 
{
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', buttonDown);
    window.addEventListener('mouseup', buttonUp);
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    document.addEventListener("draw_scene_event", drawGraph);
    document.addEventListener("graphing_shader_loaded_event", shaderLoaded);

    glcanvas.addEventListener("wheel", mouseWheelTurned);
    window.addEventListener("scroll", noScroll);
}

function showLoading() 
{
    // Spinning wheel
    document.getElementById('loadingPopup').style.display = 'flex';
}

  // Function to hide the loading popup
  function hideLoading() 
{
    document.getElementById('loadingPopup').style.display = 'none';
}

function optionIndex(select, option)
{
    for (let i = 0; i < select.length; i++)
    {
        let select_option = select[i];

        if (select_option === option)
        {
            return i;
        }
    }

    console.log("optionIndex option not found", option);
    return -1;
}

// Sidebar

const sidebar = document.querySelector('.sidebar-container');
const overlay = document.querySelector('.sidebar-overlay');
const triggerBtn = document.querySelector('.sidebar-trigger-btn');
const closeBtn = document.querySelector('.sidebar-close-btn');
const helpLink = document.querySelector('.sidebar-nav-link[target="_blank"]');
const settingsLink = document.querySelector('.sidebar-nav-link[onclick]');
const bugTrackerLink = document.querySelector('#bug-tracker-link');
const featureTrackerLink = document.querySelector('#feature-tracker-link');


console.log("SETTING UP SIDEBAR USER_TIER", USER_TIER);


let externalPageWindow = null;


bugTrackerLink.addEventListener('click', (event) => {
    event.preventDefault(); // Stop the default behavior of navigating to href

    const isAdmin = USER_TIER == 0;
    const userType = isAdmin ? '8f4e7d1c6a2b5938' : 'user';

    console.log("bug-tracker-link", userType);
    
    // Open bug tracker in new window
    externalPageWindow = window.open(`./bug-tracker.html?userType=${userType}`, '_blank');
    monitorExternalPage(); // Monitor tab closure
});

featureTrackerLink.addEventListener('click', (event) => {
    event.preventDefault(); // Stop the default behavior of navigating to href

    const isAdmin = USER_TIER == 0;
    const userType = isAdmin ? '8f4e7d1c6a2b5938' : 'user';

    console.log("feature-tracker-link", userType);
    
    // Open bug tracker in new window
    externalPageWindow = window.open(`./feature-tracker.html?userType=${userType}`, '_blank');
    monitorExternalPage(); // Monitor tab closure
});


// Open sidebar
triggerBtn.addEventListener('click', () => {
    sidebar.classList.add('sidebar-open');
    overlay.classList.add('sidebar-overlay-active');
    document.body.classList.add('no-scroll');
});

// Close sidebar
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

function closeSidebar() {
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('sidebar-overlay-active');
    document.body.classList.remove('no-scroll');
}

// Monitor external page closure
function monitorExternalPage() {
    const monitorTab = setInterval(() => {
        if (externalPageWindow && externalPageWindow.closed) {
            clearInterval(monitorTab); // Stop monitoring
            closeSidebar(); // Close the sidebar
        }
    }, 500); // Check every 500ms
}

// Open Help Page in a new tab and monitor
helpLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior
    const helpPageURL = event.target.href;

    externalPageWindow = window.open(helpPageURL, '_blank');
    monitorExternalPage(); // Start monitoring
});

// Open Settings Page in a new tab and monitor
settingsLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior
    // Assuming `openSettings()` returns a URL or logic to open a new tab
    const settingsPageURL = openSettings(); // Replace with your logic to get the URL
    if (settingsPageURL) {
        externalPageWindow = window.open(settingsPageURL, '_blank');
        monitorExternalPage(); // Start monitoring
    }
});


// Close sidebar with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarContainer.classList.contains('sidebar-open')) {
        closeSidebar();
    }
});

// End sidebar



// Add event listener for settings updates
window.addEventListener('message', function(event) {
    console.log('Message received:', event.data); // Debug log
    if (event.data.type === 'GRID_SETTINGS_UPDATE') {
        const { verticalLines, horizontalLines, pointSize, barChartCenterYValue } = event.data.settings;
        // Store current settings
        currentSettings = {
            verticalLines: verticalLines,
            horizontalLines: horizontalLines,
            pointSize: pointSize,
            barChartCenterYValue: barChartCenterYValue
        };
        console.log('New settings:', verticalLines, horizontalLines, pointSize, barChartCenterYValue);
        g_grid_dimensions.x = verticalLines;
        g_grid_dimensions.y = horizontalLines;
        g_user_point_scaling = pointSize; 
        g_bar_chart_center_y_value = barChartCenterYValue;
        document.dispatchEvent(draw_scene_event);
    }
});


// Function to open settings window with current values
function openSettings() {
    // Add variable to store current settings
    let currentSettings = {
        verticalLines: g_grid_dimensions.x,
        horizontalLines: g_grid_dimensions.y,
        pointSize: g_user_point_scaling,
        barChartCenterYValue: g_bar_chart_center_y_value
    };

    const params = new URLSearchParams({
        verticalLines: currentSettings.verticalLines,
        horizontalLines: currentSettings.horizontalLines,
        pointSize: currentSettings.pointSize,
        barChartCenterYValue: g_bar_chart_center_y_value
    });

    window.open(`settings.html?${params.toString()}`, 'Settings', 'width=500,height=600');
}

const custom_cursor = document.getElementById('custom-cursor');
        
document.addEventListener('mousemove', (e) => {
    custom_cursor.style.display = 'block';
    custom_cursor.style.left = e.clientX + 'px';
    custom_cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
    custom_cursor.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    custom_cursor.style.display = 'block';
});

function setCursorSize(size) {
    custom_cursor.style.width = size + 'px';
    custom_cursor.style.height = size + 'px';
}

function caseInsensitiveStringContains(mainString, searchString) {
    // Convert both strings to lowercase for case-insensitive comparison
    return mainString.toLowerCase().includes(searchString.toLowerCase());
}
