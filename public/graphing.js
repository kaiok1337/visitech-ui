var gpu = undefined;
var cpu = undefined;

const MATRIX_SIZE = 4;
// console.log("MATRIX_SIZE", MATRIX_SIZE);

var compareIceKernel = undefined;
var convolutionKernel = undefined;

try
{
    gpu = new GPU({ mode: 'gpu' });
    cpu = new GPU({ mode: 'cpu' });
}
catch (error)
{
    gpu = new GPU.GPU({ mode: 'gpu' });
    cpu = new GPU.GPU({ mode: 'cpu' });
}

const multiplyMatrix = gpu.createKernel(function(a, b, matrix_size) 
{
    let sum = 0;
    for (let i = 0; i < matrix_size; i++) 
    {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
}).setOutput([MATRIX_SIZE, MATRIX_SIZE]);

const multiplyMatrixCpu = cpu.createKernel(function(a, b, matrix_size) 
{
    let sum = 0;
    for (let i = 0; i < matrix_size; i++) 
    {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
}).setOutput([MATRIX_SIZE, MATRIX_SIZE]);


  
  function handleImages(key_name)
  {
    let google_map_container = document.getElementById('google_map_container');
    hideGoogleMap();
    show2DCanvas();
    hideChat();
    // chat_outer_container.style.visibility = "hidden";

    if (usingUserData())
    {
        let year_string = x_label.innerHTML.split("/")[2];
        let day_string = x_label.innerHTML.split("/")[1];
        let month_string = x_label.innerHTML.split("/")[0];
        let year = parseInt(year_string)
        let month = parseInt(month_string);
        let day = parseInt(day_string);

        if (key_name == "e")
        {
            image_1_date = x_label.innerHTML;
        }
        else if (key_name == "E")
        {
            image_2_date = x_label.innerHTML;
        }
        else if (key_name === "ArrowRight")
        {
            console.log("Right Arrow");
            let visible_series_list = visibleSeriesList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

            // for (let series of visible_series_list)
            let series = visible_series_list[0];
            let graph_positions = series.graph_positions;
            let graph_indices = series.graph_indices;
            let choose_next = false;

            for (let i = 0; i < graph_indices.length; i++)
            {
                let index = graph_indices[i];
                let date = graph_positions[index * 2];
                let date_string = GraphingUtilities.dateString(date);

                let current_date = x_label.innerHTML;

                if (choose_next)
                {
                    image_1_date = date_string;
                    month_string = date_string.split("/")[0];
                    day_string = date_string.split("/")[1];
                    year_string = date_string.split("/")[2];
                    x_label.innerHTML = date_string;
                    console.log("choose_next", date_string);
                    break;
                }

                if (date_string == x_label.innerHTML)
                {
                    choose_next = true;
                }
            }
        }
        else if (key_name === "ArrowLeft")
        {
            console.log("Left Arrow");
            let visible_series_list = visibleSeriesList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

            // for (let series of visible_series_list)
            let series = visible_series_list[0];
            let graph_positions = series.graph_positions;
            let graph_indices = series.graph_indices;
            let choose_previous = false;

            for (let i = graph_indices.length - 1; i > 0; i--)
            {
                let index = graph_indices[i];
                let date = graph_positions[index * 2];
                let date_string = GraphingUtilities.dateString(date);

                let current_date = x_label.innerHTML;

                if (choose_previous)
                {
                    image_1_date = date_string;
                    month_string = date_string.split("/")[0];
                    day_string = date_string.split("/")[1];
                    year_string = date_string.split("/")[2];
                    x_label.innerHTML = date_string;
                    console.log("choose_previous", date_string);
                    break;
                }

                if (date_string == x_label.innerHTML)
                {
                    choose_previous = true;
                }
            }
        }
       

        let sea_ice_map = user_file_name.includes("sie_daily") 
            || user_file_name.includes("seaice_extent")
            || station_information_input.value.includes("Sea Ice Extent")
            || station_information_input.value.includes("OSI Antarctic");

        if (sea_ice_map || user_file_name == "pdsi.csv" || user_file_name == "PDSI.csv" || query_file_name == "PDSI.csv")
        {
            // console.log("Sea ice extent");

            if (user_file_name == "pdsi.csv" || user_file_name == "PDSI.csv" || query_file_name == "PDSI.csv")
            {
                canvas2D_2.style.visibility = "hidden";
                canvas2D_3.style.visibility = "hidden";
                canvas2D_4.style.visibility = "hidden";
            }
            else
            {
                canvas2D_2.style.visibility = "visible";
                canvas2D_3.style.visibility = "visible";
                canvas2D_4.style.visibility = "visible";
            }

            let url_month_string = getNSIDCMonthString(month);
            let padded_month = month_string.padStart(2, "0");
            let padded_day = day_string.padStart(2, "0");
            let padded_date_string = year_string + padded_month + padded_day;
            let url = "";
            let image_file_name = "";

            if (   station_information_input.value.includes("OSI Arctic")
                || station_information_input.value.includes("Arctic Sea Ice Extent"))
            {
                // https://noaadata.apps.nsidc.org/NOAA/G02135/north/daily/images/1996/04_Apr/N_19960402_extn_v3.0.png

                url = "https://noaadata.apps.nsidc.org/NOAA/G02135/north/daily/images/";
                url += year_string + "/" + url_month_string + "/N_" + padded_date_string + "_extn_v3.0.png";
                image_file_name = "N_" + padded_date_string + "_extn_v3.0.png";

                if (key_name == "E")
                {
                    compare_against_sea_ice_image_filename = image_file_name;
                }
            }
            else if (   station_information_input.value.includes("OSI Antarctic")
                     || station_information_input.value.includes("Antarctic Sea Ice Extent"))
            {
                // https://noaadata.apps.nsidc.org/NOAA/G02135/south/daily/images/1996/04_Apr/N_19960402_extn_v3.0.png

                url = "https://noaadata.apps.nsidc.org/NOAA/G02135/south/daily/images/";
                url += year_string + "/" + url_month_string + "/S_" + padded_date_string + "_extn_v3.0.png";
                image_file_name = "S_" + padded_date_string + "_extn_v3.0.png";

                if (key_name == "E")
                {
                    compare_against_sea_ice_image_filename = image_file_name;
                }
            }
            else if (user_file_name.includes("seaice_extent"))
            {
                // https://noaadata.apps.nsidc.org/NOAA/G02135/north/daily/images/1996/04_Apr/N_19960402_extn_v3.0.png

                url = "https://noaadata.apps.nsidc.org/NOAA/G02135/north/daily/images/";
                url += year_string + "/" + url_month_string + "/N_" + padded_date_string + "_extn_v3.0.png";
                image_file_name = "N_" + padded_date_string + "_extn_v3.0.png";
            }
            else if (user_file_name == "pdsi.csv" || user_file_name == "PDSI.csv" || query_file_name == "PDSI.csv")
            {
                url = "https://www.ncdc.noaa.gov/monitoring-content/sotc/drought/psi/psi-";
                url += year_string + month_string.padStart(2, "0");
                image_file_name = "psi-" + year_string + month_string.padStart(2, "0");

                if (year < 2018 || (year == 2018 && month <= 8))
                {
                    url += ".gif";
                    image_file_name += ".gif";
                }
                else
                {
                    url += ".png";
                    image_file_name += ".png";
                }
                
                // console.log(url);
                // window.open(url, "_blank");

                // https://www.ncdc.noaa.gov/monitoring-content/sotc/drought/psi/psi-193405.gif
            }

            // downloadImage(url, image_file_name);

            try
            {
                copyTextToClipboard(url);
            }
            catch (error)
            {
                console.log(`copyTextToClipboard failed with ${error}`);
            }
            
            console.log(url);
            // const proxy_url = 'http://localhost:8080/fetch-image';
            // const proxy_url = 'http://35.194.44.156:5000/fetch-image';
            var target_image_url = url;
            console.log(proxy_url,"\n", target_image_url);


            let canvas = key_name == "e" || key_name === "ArrowRight" || key_name === "ArrowLeft" ? canvas2D : canvas2D_2;

            if (canvas == canvas2D_2)
            {
                canvas.style.top = (g_main_viewport_borders.top + canvas2D.height + 10).toString() + "px";
            }

            let month_selected_count = numberOfSelectedOptions(month_select);
            let day_selected_count = numberOfSelectedOptions(day_select);
            console.log("month_selected_count", month_selected_count, "day_selected_count", day_selected_count, g_selected_series_list);
    
            fetch(proxy_url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: target_image_url }) })
            .then(response => response.arrayBuffer())
            .then(buffer => 
            {
                const uint8Array = new Uint8Array(buffer);
                const blob = new Blob([uint8Array], { type: 'image/png' });
                const image_url = URL.createObjectURL(blob);
                console.log("fetch URL loaded", target_image_url);
    
                const image_object = new Image();
                image_object.src = image_url;
                image_object.onload = () =>  
                { 
                    console.log("image_object loaded", target_image_url, image_object); 
                    canvas_2D_4_image_object = image_object;
                    draw2DImage(canvas, image_object)
                    .then(() => 
                    {

                    })

                    const data_url = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.href = data_url;
                    link.download = image_file_name;
                    link.click();
    
                    let ctx = canvas.getContext('2d', { willReadFrequently: true });
                    const image_data = ctx.getImageData(0, 0, image_object.width, image_object.height);
                    const pixelValues = document.getElementById('pixelValues');
    
                    // for (let i = 0; i < image_data.data.length; i += 4) 
                    // {
                    //     const red = image_data.data[i];
                    //     const green = image_data.data[i + 1];
                    //     const blue = image_data.data[i + 2];
                    //     const alpha = image_data.data[i + 3];
                    //     console.log(red, green, blue, alpha);
                    // }

                    if (canvas == canvas2D_2)
                    {
                        canvas2D_3.style.top = (g_main_viewport_borders.top).toString() + "px";
                        let left = glcanvas_width + 10 + image_object.width;
                        canvas2D_3.style.left = left.toString() + "px";
                        canvas2D_3.width = image_object.width;
                        canvas2D_3.height = image_object.height;
                        let ctx = canvas2D_3.getContext('2d', { willReadFrequently: true });
                        ctx.drawImage(image_object,  0, 0);
                        image_2 = image_data;

                        canvas2D_4.style.top = (g_main_viewport_borders.top + canvas2D_3.height + 10).toString() + "px";
                        canvas2D_4.style.left = left.toString() + "px";
                        canvas2D_4.width = image_object.width;
                        canvas2D_4.height = image_object.height;
                        ctx = canvas2D_4.getContext('2d', { willReadFrequently: true });
                        ctx.drawImage(image_object,  0, 0)
                    }
                    else
                    {
                        image_1 = image_data;
                    }

                    if (sea_ice_map && convolutionKernel !== undefined && image_1 !== undefined && image_2 !== undefined)
                    {
                        if (month_selected_count == 1 && day_selected_count == 1 && g_selected_series_list.length == 1 && false)
                        {
                            console.log("READY TO COMPARE ALL IMAGES");
                            let image_map = new Map();
                            getAllImagesFromIceSeries(g_selected_series_list[0], image_map);
                            console.log(image_map);
                        }

                        let ctx4 = canvas2D_4.getContext("2d");
                        // console.log("image_1", image_1.width, image_1.height, image_1.data);
                        let texture_2 = createGPUTextureArray(image_2);
                        // console.log(texture_1);

                        const sharpening_matrix = 
                        [
                            [0, -1, 0],
                            [-1, 5, -1],
                            [0, -1, 0]
                        ];

                        const gaussian_blur_matrix = 
                        [
                            [1, 2, 1],
                            [2, 4, 2],
                            [1, 2, 1]
                        ];

                        const gimp_blur_matrix = 
                        [
                            [1, 1, 1],
                            [1, 1, 1],
                            [1, 1, 1]
                        ];

                        const edge_enhance_matrix = 
                        [
                            [0, 0, 0],
                            [-1, 1, 0],
                            [0, 0, 0]
                        ];

                        const edge_detect_matrix = 
                        [
                            [0, 1, 0],
                            [1, -4, 1],
                            [0, 1, 0]
                        ];

                        const emboss_matrix = 
                        [
                            [-2, -1, 0],
                            [-1, 1, 1],
                            [0, 1, 2]
                        ];

                        const convolution_matrix = 
                        [
                            [1, 0, 1],
                            [0, 1, 0],
                            [1, 0, 1]
                        ];

                        const gaussian_blur_5x5_matrix =
                        [
                            [1,  4,  6,  4, 1],
                            [4, 16, 24, 16, 4],
                            [6, 24, 36, 24, 6],
                            [4, 16, 24, 16, 4],
                            [1,  4,  6,  4, 1]
                        ];
                        

                        // const result_image = convolutionKernel(texture_2, image_2.width, image_2.height, sharpening_matrix, 3, 1);
                        // const result_image = convolutionKernel(texture_2, image_2.width, image_2.height, gaussian_blur_matrix, 3, 1/16);
                        // const result_image = convolutionKernel(texture_2, image_2.width, image_2.height, gaussian_blur_5x5_matrix, 5, 1/256);
                        // const result_image = convolutionKernel(texture_2, image_2.width, image_2.height, edge_enhance_matrix, 3, 1);
                        // const result_image = convolutionKernel(texture_2, image_2.width, image_2.height, edge_detect_matrix, 3, 1);
                        // const result_image = convolutionKernel(texture_2, image_2.width, image_2.height, emboss_matrix, 3, 1);
                        const result_image = convolutionKernel(texture_2, image_2.width, image_2.height, convolution_matrix, 3, 1/5);
                        // const result_image = convolutionKernel(texture_2, image_2.width, image_2.height, gimp_blur_matrix, 3, 1/9);

                        const uint8_image_data = new Uint8ClampedArray(image_2.width * image_2.height * 4);

                        for (let y = 0; y < image_2.height; y++)
                        {
                            for (let x = 0; x < image_2.width; x++)
                            {
                                let rgba = result_image[y][x];
                                let index = ((y * image_2.width) + x) * 4;
                                uint8_image_data[index + 0] = rgba[0];
                                uint8_image_data[index + 1] = rgba[1];
                                uint8_image_data[index + 2] = rgba[2];
                                uint8_image_data[index + 3] = rgba[3];
                            }
                        }

                        // console.log(uint8_image_data);
                        
                        const image_data = new ImageData(uint8_image_data, image_2.width, image_2.height);
                        ctx4.putImageData(image_data, 0, 0);
                    }

                    if (compareIceKernel === undefined && image_1 !== undefined && image_2 !== undefined)
                    {
                        compareIceKernel = gpu.createKernel(function(image_1, image_2, ice_gain_color, ice_loss_color) 
                        {
                            const pixel_index = ((this.thread.y * this.output.x) + this.thread.x) * 4;
    
                            const r1 = image_1[pixel_index];
                            const g1 = image_1[pixel_index + 1];
                            const b1 = image_1[pixel_index + 2];
                            const a1 = image_1[pixel_index + 3] / 255;
                            let image_1_is_white = r1 == 255 && g1 == 255 && b1 == 255;
    
                            const r2 = image_2[pixel_index];
                            const g2 = image_2[pixel_index + 1];
                            const b2 = image_2[pixel_index + 2];
                            const a2 = image_2[pixel_index + 3] / 255;
                            let image_2_is_white = r2 == 255 && g2 == 255 && b2 == 255;
    
                            let r = 0;
                            let g = 0;
                            let b = 0;
    
                            if (image_1_is_white && image_2_is_white)
                            {
                                r = 255;
                                g = 255;
                                b = 255;
                            }
                            else if (image_1_is_white)
                            {
                                r = ice_loss_color[0];
                                g = ice_loss_color[1];
                                b = ice_loss_color[2];
                            }
                            else if (image_2_is_white)
                            {
                                r = ice_gain_color[0];
                                g = ice_gain_color[1];
                                b = ice_gain_color[2];
                            }
                            else 
                            {
                                r = Math.max(r1, r2);
                                g = Math.max(g1, g2);
                                b = Math.max(b1, b2);
                            }
    
                            return [r, g, b, 255];
                        }).setOutput([image_1.width, image_1.height]);
                    }
           
                    if (convolutionKernel === undefined)
                    {
                      // Create the GPU kernel function
                      convolutionKernel = gpu.createKernel(function(input_data, width, height, convolution_matrix, convolution_width, scale) 
                      {
                          const x = this.thread.x;
                          const y = this.thread.y;
                          const index = ((y * width) + x) * 4;
                          const convolution_half_width = Math.floor(convolution_width / 2.0);
                  
  
                          let r = 0, g = 0, b = 0;
        
                          for (let i = -convolution_half_width; i <= convolution_half_width; i++) 
                          {
                                for (let j = -convolution_half_width; j <= convolution_half_width; j++) 
                                {
                                    const px = x + j;
                                    const py = y + i;
                        
                                    if (px >= 0 && px < width && py >= 0 && py < height) 
                                    {
                                        const neighbor_index = ((py * width) + px) * 4;
                                        const weight = convolution_matrix[i + 1][j + 1] * scale;
                        
                                        r += input_data[neighbor_index] * weight;
                                        g += input_data[neighbor_index + 1] * weight;
                                        b += input_data[neighbor_index + 2] * weight;
                                    }
                                }
                          }
                  
                          // this.color(r, g, b, 255);
                          return [r, g, b, 255];
                        }).setOutput([image_1.width, image_1.height]);

                    }  

                    if (sea_ice_map && image_1 !== undefined && image_2 !== undefined)
                    {

                        let ctx3 = canvas2D_3.getContext("2d");
                        // console.log("image_1", image_1.width, image_1.height, image_1.data);
                        let texture_1 = createGPUTextureArray(image_1);
                        let texture_2 = createGPUTextureArray(image_2);
                        // console.log(texture_1);
                        const result_image = compareIceKernel(texture_1, texture_2, ice_gain_color, ice_loss_color);

                        const uint8_image_data = new Uint8ClampedArray(image_1.width * image_1.height * 4);

                        for (let y = 0; y < image_1.height; y++)
                        {
                            for (let x = 0; x < image_1.width; x++)
                            {
                                let rgba = result_image[y][x];
                                let index = ((y * image_1.width) + x) * 4;
                                uint8_image_data[index + 0] = rgba[0];
                                uint8_image_data[index + 1] = rgba[1];
                                uint8_image_data[index + 2] = rgba[2];
                                uint8_image_data[index + 3] = rgba[3];
                            }
                        }

                        // console.log(uint8_image_data);
                        
                        const ice_image_data = new ImageData(uint8_image_data, image_1.width, image_1.height);
                        ctx3.putImageData(ice_image_data, 0, 0);
                        let ctx4 = canvas2D_4.getContext("2d");
                        ctx4.putImageData(ice_image_data, 0, 0);

                        //////////////////


                        
                        ctx3.font = 'bold 20px Arial';
                        ctx3.fillStyle = rgbaArrayToHexString(ice_gain_color);
                        ctx3.strokeStyle = ctx3.fillStyle;
                        ctx3.lineWidth = 0;
                        let TEXT_LEFT = 30;

                        let image_1_date_numeric = GraphingUtilities.convertDateToDecimal(image_1_date);
                        let image_2_date_numeric = GraphingUtilities.convertDateToDecimal(image_2_date);
                        let first_date = image_1_date;
                        let second_date = image_2_date;

                        if (image_2_date_numeric < image_1_date_numeric)
                        {
                            first_date = image_2_date;
                            second_date = image_1_date;
                        }

                        // Add the text to the canvas
                        let text = 'Ice Gain From ' + first_date + " To " + second_date;
                        ctx3.fillText(text, TEXT_LEFT, 45); // Fill the text
                        ctx3.strokeText(text, TEXT_LEFT, 45);

                        ctx3.fillStyle = rgbaArrayToHexString(ice_loss_color);
                        ctx3.strokeStyle = ctx3.fillStyle;
                        ctx3.lineWidth = 0;
                        // ctx3.lineWidth = 5;
                        text = 'Ice Loss From ' + first_date + " To " + second_date;
                        ctx3.fillText(text, TEXT_LEFT, 65); // Fill the text
                        ctx3.strokeText(text, TEXT_LEFT, 65);
                    }

                }

            })
            .catch(error => { console.error('Error fetching image:', error); });
    
        }
        else
        {
            // googleEarth();
            showGoogleMap();
            hide2DCanvas();
            hideChat();
            let latitude = last_hovered_series.latitude.toString().trim();
            let longitude = last_hovered_series.longitude.toString().trim();
            let name = last_hovered_series.name.toString().trim();
            setGoogleMapCenter(latitude, longitude, name);
        }
    }
    else
    {
        // googleEarth();
        showGoogleMap();
        hide2DCanvas();
        hideChat();
        let latitude = last_hovered_series.latitude.toString().trim();
        let longitude = last_hovered_series.longitude.toString().trim();
        let name = last_hovered_series.name.toString().trim();
        setGoogleMapCenter(latitude, longitude, name);
    }
}
