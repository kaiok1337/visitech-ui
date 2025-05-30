var application_name = "Temperature";
var state_map = {};
var selected_series;
var g_selected_series_list = [];
var series_to_load_list = [];
var reset_zoom_button;
var help_button;
var country_select;
var state_select;
var series_select;
var series_select_passthrough_button;
var type_select;
var month_select;
var month_select_passthrough_button;
var selected_month_list = [];
var day_select;
var day_select_passthrough_button;
var selected_day_list = [];
var right_side_offset = 5;
var units_select;
var main_title_label;
var y_axis_label;
var x_axis_label;
var search_type_select;
var search_parameter_1_input;
var search_button;
var minimum_x_label;
var minimum_x_input;
var maximum_x_label;
var maximum_x_input;
var minimum_y_label;
var minimum_y_input;
var maximum_y_label;
var maximum_y_input;
var screenshot_button;
var reset_button;
var add_data_button;
var subscribe_button;
var cancel_subscription_button;
var add_clipboard_data_button;
var pressed_keys_label;
var refresh_button;
// var google_earth_button;
var visitech_logo;
var main_visitech_logo;
var right_side_controls_container;
var plot_trend_checkbox;
var plot_trends_checkbox;
var plot_trend_label;
var plot_trends_label;
var yearly_stats_label;
var yearly_stats_checkbox;
var daily_stats_label;
var daily_stats_checkbox;
var lock_screen_label;
var lock_screen_checkbox;
var draw_bar_chart_label;
var draw_bar_chart_checkbox;
var normalize_label;
var normalize_checkbox;
var station_information_label;
var station_information_input;
var main_title_input_label;
var main_title_input;
var main_title_text_select;
var main_title_text_delete_button;
var vertical_axis_title_input_label;
var vertical_axis_title_input;
var horizontal_axis_title_input_label;
var horizontal_axis_title_input;
var AI_controls_container;
var AI_query_mic_button;
var mic_button_recording_color = "#ff4444";
var mic_button_not_recording_color = "#44ff44";
var mic_is_recording;
var AI_query_input_label;
var AI_query_input;
var AI_query_button;
// var logout_button;
var average_name_label;
var sum_name_label;
// var realclimatescience_button;
var count_label;
var count_name_label;
var average_label;
var selected_average_label;
var average_name_label;
var sum_label;
var selected_sum_label;
var sum_name_label;
var trend_label;
var selected_trend_label;
var trend_name_label;
// var curvature_label;
// var curvature_name_label;
var series_count_name_label;
var series_count_label;
var day_count_label;
var day_count_name_label;
var disclaimer_label;

var body;
var TMAX = "TMAX";
var TMIN = "TMIN";
var PRCP = "PRCP";
var SNOW = "SNOW";
var tmax_string_f = "T E M P E R A T U R E - F";
var tmax_string_c = "T E M P E R A T U R E - C";
var tmin_string_f = "T E M P E R A T U R E - F";
var tmin_string_c = "T E M P E R A T U R E - C";
var prcp_string_in = "P R E C I P I T A T I O N - I N";
var prcp_string_mm = "P R E C I P I T A T I O N - M M";
var snow_string_in = "S N O W - I N";
var snow_string_MM = "S N O W - M M";

var type_list = [TMAX, TMIN, PRCP, SNOW];

const draw_scene_event = new Event("draw_scene_event");
const station_list_loaded_event = new Event("station_list_loaded_event");
const dimensions_changed_event = new Event("dimensions_changed_event");

var vertices_changed = false;

var x_label;
var y_label;
var name_label;
var state_label;
var month_label;
var day_label;

var use_centigrade = false;
var temporary_text_area;
var country_dict = [];
const selected_option_background_color = "green";
const selected_option_font_size = "20px";
const unselected_option_background_color = "black";
const unselected_option_font_size = "16px";
var use_whole_year_labels = false;

const MOST_DAYS_ABOVE = "Most days above";
const LONGEST_STRETCH_ABOVE = "Longest stretch above";
const LONGEST_SEASON_ABOVE = "Longest season above";
const FIRST_DAY_ABOVE = "Earliest first day above";
const LAST_DAY_ABOVE = "Latest last day above";
const MOST_DAYS_BELOW = "Most days below";
const LONGEST_STRETCH_BELOW = "Longest stretch below";

var already_initialized = false;

var user_data_symbol = "--";
var user_data_name = "User Data";
var NOAA_DAILY_TEMPERATURES_URL = "https://www.ncei.noaa.gov/pub/data/ghcn/daily/all/";

var series_select_open = false;

var DOWN_ARROW_HAT= "∨";
var MAX_SEGMENTED_SERIES = 5;


class Settings 
{
    //offset_x=NaN&offset_y=NaN&scale_x=NaN&scale_y=NaN&country=FR&state=FR&id=ANNUAL&type=TMAX&month=0&day=0&units=F
}

var initial_settings = new Settings();

class Station
{
    constructor(id, name, country_name, state_abbreviation, state_name, latitude, longitude, elevation)    
    {
        this.series_type = TEMPERATURE_STATION_SERIES_TYPE;
        this.id = id;
        this.name = name.trim();
        this.state_abbreviation = state_abbreviation;
        this.country_name = country_name;
        this.state_name = state_name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.elevation = elevation;
        this.position_buffer = {TMAX : null, TMIN : null, PRCP : null, SNOW : null};
        this.index_buffer = {TMAX : null, TMIN : null, PRCP : null, SNOW : null};
        this.graph_positions = {TMAX : [], TMIN : [], PRCP : [], SNOW : []};
        this.graph_indices = {TMAX : [], TMIN : [], PRCP : [], SNOW : []};
        this.graph_index_list = {TMAX : [], TMIN : [], PRCP : [], SNOW : []};
        this.color = randomPointColor();
        this.original_color = _.cloneDeep(this.color);

        this.minimum = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
        this.maximum = new Vec2(Number.MIN_VALUE, Number.MIN_VALUE);
        this.visible_point_list = [];
        this.visible_minimum = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
        this.visible_maximum = new Vec2(Number.MIN_VALUE, Number.MIN_VALUE);
    }
}

class Country
{
    constructor(abbreviation, name, station_file_path)
    {
        this.abbreviation = abbreviation;
        this.name = name;
        this.station_file_path = station_file_path;
        // console.log(this);
        this.state_list = [];
    }
}

class State
{
    constructor(abbreviation, name)
    {
        this.abbreviation = abbreviation;
        this.name = name;
        // console.log(this);
        this.station_list = [];
    }

    stationName(id)
    {
        for (var i = 0; i < this.station_list.length; i++)
        {
            var station = this.station_list[i];

            if (station.id == id)
            {
                return station.name;
            }
        }

        return "";
    }

    station(id)
    {
        for (var i = 0; i < this.station_list.length; i++)
        {
            var station = this.station_list[i];

            // console.log(`State station(id) i ${i} id ${id} station.name ${station.name} station.id ${station.id}`);

            if (station.id == id)
            {
                return station;
            }

            // FIXME - not sure why this is necessary
            if (station.name == id)
            {
                return station;
            }
        }

        return null;
    }

    getStationFromName(name)
    {
        for (var i = 0; i < this.station_list.length; i++)
        {
            var station = this.station_list[i];

            if (station.name == name)
            {
                return station;
            }
        }

        return null;
    }
}

function realClimateScienceButtonPressed()
{
    window.open("https://realclimatescience.com", '_blank');
}

async function createCheckoutSession(priceId, userId) 
{
    const response = await fetch('https://d2tcode.uc.r.appspot.com/create-checkout-session', 
    // const response = await fetch('https://d2tcode.uc.r.appspot.com/create-checkout-session-test-xya', 
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        price_id: priceId,
        user_id: userId,
        }),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }
    
    return await response.json();
}
    
async function createCancelSubscriptionSession(userId) 
{
    const response = await fetch('https://d2tcode.uc.r.appspot.com/cancel-subscription', 
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        user_id: userId,
        }),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }
    
    return await response.json();
}

async function handleDisclaimerAccepted() 
{
    try 
    {
        showLoading();
        const user_id = firebase.auth().currentUser.uid;
        // const price_id = "price_1Q3NXG06Up2HuqFkdXtYKXBq";

        // Test
        // const price_id = "price_1Q05OX06Up2HuqFkUV7xl68D";

        // const price_id = "price_1Qi03d06Up2HuqFkRzpcB2F9";
        const price_id = "price_1QiIHX06Up2HuqFkegfLW77y";
        // const price_id = "TESTING100%OFF_x23642x3432461223";

        const { sessionId, publicKey } = await createCheckoutSession(price_id, user_id);
        const stripe = Stripe(publicKey);
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) 
        {
            console.error(error);
        }
    } 
    catch (error) 
    {
        console.error('Error:', error.message);
        // Handle error (e.g., show error message to user)
    }

    hideLoading();
}

// Function to position the delete button
function positionMainTitleDeleteButton() 
{
    main_title_text_delete_button.style.position = 'absolute';
    main_title_text_delete_button.style.left = `${main_title_text_select.offsetLeft + main_title_text_select.offsetWidth + 5}px`;
}

function positionAIQueryButton()
{
    AI_query_button.style.position = 'absolute';
    AI_query_button.style.left = `${AI_query_input_label.offsetLeft + AI_query_input_label.offsetWidth + 5}px`;
    console.log("positionAIQueryButton", AI_query_button.style.left );
}


    
async function initializeApplication()
{   
    body = document.getElementById("body");
    body.style.height = "100%";
    body.classList.add("stop-scrolling");
    body.style.overflow = "hidden";

    ui_container = document.getElementById("ui_container");
    ui_container.addEventListener("contextmenu", (event) => {event.preventDefault(); });

    parseURL(initial_settings);
    console.log(initial_settings);
    x_label = document.getElementById("x_label");
    x_label.style.left = (5 * g_x_scale_factor).toString() + "px";
    x_label.style.width = (90 * g_x_scale_factor).toString() + "px";
    y_label = document.getElementById("y_label");
    y_label.style.left = (110 * g_x_scale_factor).toString() + "px";
    y_label.style.width = (90 * g_x_scale_factor).toString() + "px";
    name_label = document.getElementById("name_label");
    name_label.style.left = (210 * g_x_scale_factor).toString() + "px";
    name_label.style.width = (250 * g_x_scale_factor).toString() + "px";
    state_label = document.getElementById("state_label");
    state_label.style.left = (470 * g_x_scale_factor).toString() + "px";
    state_label.style.width = (45 * g_x_scale_factor).toString() + "px";
    state_label.innerHTML = "AL";
    month_label = document.getElementById("month_label");
    month_label.style.left = (525 * g_x_scale_factor).toString() + "px";
    month_label.style.width = (80 * g_x_scale_factor).toString() + "px";
    month_label.style.fontSize = (20 * g_x_scale_factor).toString() + "px";
    day_label = document.getElementById("day_label");
    day_label.style.left = (615 * g_x_scale_factor).toString() + "px";
    day_label.style.width = (45 * g_x_scale_factor).toString() + "px";
    day_label.style.fontSize = (20 * g_x_scale_factor).toString() + "px";

    var spacing = 5 * g_x_scale_factor;
    var x = spacing;

    reset_zoom_button = document.getElementById('reset_zoom_button');
    reset_zoom_button.style.left = x.toString() + "px";
    reset_zoom_button.style.width = (120 * g_x_scale_factor).toString() + "px";

    x += reset_zoom_button.offsetWidth + spacing;

    help_button = document.getElementById('help_button');
    help_button.style.left = x.toString() + "px";
    help_button.style.width = (70 * g_x_scale_factor).toString() + "px";
    x += help_button.offsetWidth + spacing * 3;

    country_select = document.getElementById('country_select');
    country_select.addEventListener("change", countryChanged);
    country_select.style.left = x.toString() + "px";
    country_select.style.width = (60 * g_x_scale_factor).toString() + "px";
    x += country_select.offsetWidth + spacing;
    country_dict["US"] = new Country("US", "United States", "data/us-stations.txt");
    country_dict["AR"] = new Country("AR", "Argentina", "data/ar-stations.txt");
    country_dict["AS"] = new Country("AS", "Australia", "data/as-stations.txt");
    country_dict["BR"] = new Country("BR", "Brazil", "data/br-stations.txt");
    country_dict["CA"] = new Country("CA", "Canada", "data/ca-stations.txt");
    country_dict["CF"] = new Country("CF", "Congo (Brazzaville)", "data/cf-stations.txt");
    country_dict["CG"] = new Country("CG", "Congo (Kinshasa)", "data/cg-stations.txt");
    country_dict["CH"] = new Country("CH", "China)", "data/ch-stations.txt");
    country_dict["CS"] = new Country("CS", "Costa Rica", "data/cs-stations.txt");
    country_dict["FI"] = new Country("FI", "Finland", "data/fi-stations.txt");
    country_dict["FR"] = new Country("FR", "France", "data/fr-stations.txt");
    country_dict["GM"] = new Country("GM", "Germany", "data/gm-stations.txt");
    country_dict["IC"] = new Country("IC", "Iceland", "data/ic-stations.txt");
    country_dict["IN"] = new Country("IN", "India", "data/in-stations.txt");
    country_dict["IT"] = new Country("IT", "Italy", "data/it-stations.txt");
    country_dict["JA"] = new Country("JA", "Japan", "data/ja-stations.txt");
    country_dict["KE"] = new Country("KE", "Kenya)", "data/ke-stations.txt");
    country_dict["KN"] = new Country("KN", "Korea", "data/kn-stations.txt");
    country_dict["MX"] = new Country("MX", "Mexico", "data/mx-stations.txt");
    country_dict["NI"] = new Country("NI", "Nigeria)", "data/ni-stations.txt");
    country_dict["SP"] = new Country("SP", "Spain", "data/sp-stations.txt");
    country_dict["TH"] = new Country("TH", "Thailand", "data/th-stations.txt");
    country_dict["UK"] = new Country("UK", "United Kingdom", "data/uk-stations.txt");
    country_dict["UP"] = new Country("UP", "Ukraine", "data/up-stations.txt");
    country_dict.sort();
    populateCountrySelect();

    if (initial_settings.country != undefined)
    {
        country_select.value = initial_settings.country;
    }

    state_select = document.getElementById('state_select');
    state_select.addEventListener("change", stateChanged);
    state_select.style.left = x.toString() + "px";
    state_select.style.width = (60 * g_x_scale_factor).toString() + "px";
    x += state_select.offsetWidth + spacing;

    series_select_passthrough_button = document.getElementById('series_select_passthrough_button');
    series_select_passthrough_button.style.pointerEvents = "none";
    series_select_passthrough_button.addEventListener("click", seriesSelectButtonClicked);
    series_select_passthrough_button.style.left = x.toString() + "px";
    series_select_passthrough_button.style.width = (200 * g_x_scale_factor).toString() + "px";
    series_select_passthrough_button.innerHTML = "Station " + DOWN_ARROW_HAT;

    series_select = document.getElementById('series_select');
    // series_select.addEventListener("click", seriesSelectClicked);
    series_select.addEventListener("change", seriesSelectClicked);
    // series_select.addEventListener("blur", seriesSelectBlurred);
    // series_select.addEventListener("focusin", stationSelectFocused);
    series_select.style.left = x.toString() + "px";
    series_select.style.width = (200 * g_x_scale_factor).toString() + "px";
    x += series_select.offsetWidth + spacing;

    type_select = document.getElementById('type_select');
    type_select.style.left = x.toString() + "px";
    type_select.style.width = (80 * g_x_scale_factor).toString() + "px";
    type_select.style.fontSize = (14 * g_x_scale_factor).toString() + "px";
    populateTypeSelect();
    type_select.addEventListener("change", stationChanged);
    x += type_select.offsetWidth + spacing * 3;

    month_select_passthrough_button = document.getElementById('month_select_passthrough_button');
    month_select_passthrough_button.style.pointerEvents = "none";
    month_select_passthrough_button.style.left = x.toString() + "px";
    month_select_passthrough_button.style.width = (90 * g_x_scale_factor).toString() + "px";
    month_select_passthrough_button.innerHTML = "Month " + DOWN_ARROW_HAT;

    month_select = document.getElementById('month_select');
    month_select.style.left = x.toString() + "px";
    month_select.style.width = (90 * g_x_scale_factor).toString() + "px";
    //month_select.addEventListener("click", monthSelectClicked);
    month_select.addEventListener("change", monthSelectClicked);
    x += month_select.offsetWidth + spacing;

    day_select_passthrough_button = document.getElementById('day_select_passthrough_button');
    day_select_passthrough_button.style.pointerEvents = "none";
    day_select_passthrough_button.style.left = x.toString() + "px";
    day_select_passthrough_button.style.width = (80 * g_x_scale_factor).toString() + "px";
    day_select_passthrough_button.innerHTML = "Day " + DOWN_ARROW_HAT;

    day_select = document.getElementById('day_select');
    day_select.style.left = x.toString() + "px";
    day_select.style.width = (80 * g_x_scale_factor).toString() + "px";
    // day_select.addEventListener("click", dayChanged);
    day_select.addEventListener("change", dayChanged);
    x += day_select.offsetWidth + spacing * 2;

    main_title_label = document.getElementById('main_title_label');
    main_title_label.style.position = "absolute";
    main_title_label.style.backgroundColor = "#4C4C4C";
    main_title_label.style.backgroundColor = vec4ColorToHexString(g_clear_color);
    main_title_label.style.color = "black";
    main_title_label.style.zIndex = "100";
    var main_title_label_height = 40;
    var main_title_label_top = g_main_viewport_borders.top - main_title_label_height;
    main_title_label.style.left = g_main_viewport_borders.left.toString() + "px";
    main_title_label.style.top = main_title_label_top.toString() + "px";
    main_title_label.style.width = (glcanvas_width - g_main_viewport_borders.left - g_main_viewport_borders.right - 1).toString() + "px";
    main_title_label.style.height = main_title_label_height.toString() + "px";
    main_title_label.style.fontSize = "28px";
    main_title_label.style.textAlign = "center"

    y_axis_label = document.getElementById('y_axis_label');
    y_axis_label.style.backgroundColor = main_title_label.style.backgroundColor;
    var y_axis_label_height = g_main_viewport.height;
    var y_axis_label_top = g_main_viewport_borders.top + (g_main_viewport.height / 2) - (y_axis_label_height / 2);
    y_axis_label.style.left = "25px";
    y_axis_label.style.top = y_axis_label_top.toString() + "px";
    y_axis_label.style.width = "15px";
    y_axis_label.style.height = y_axis_label_height.toString() + "px";
    y_axis_label.style.fontSize = "18px";

    x_axis_label = document.getElementById('x_axis_label');
    x_axis_label.style.position = "absolute";
    x_axis_label.style.backgroundColor = main_title_label.style.backgroundColor;
    var x_axis_label_height = main_title_label_height;
    var x_axis_label_bottom = g_main_viewport_borders.bottom - x_axis_label_height - 25;
    x_axis_label.style.left = g_main_viewport_borders.left.toString() + "px";
    x_axis_label.style.bottom = x_axis_label_bottom.toString() + "px";
    x_axis_label.style.width = main_title_label.style.width
    x_axis_label.style.height = x_axis_label_height.toString() + "px";
    x_axis_label.style.fontSize = "18px";
    x_axis_label.style.textAlign = "center"


    average_name_label = document.getElementById("average_name_label");
    sum_name_label = document.getElementById("sum_name_label");
    // realclimatescience_button = document.getElementById("realclimatescience_button");
    // realclimatescience_button.style.display = "none";


    units_select = document.getElementById('units_select');
    units_select.style.left = x.toString() + "px";
    var f_option = newOption("F", "F");
    units_select.appendChild(f_option);
    var c_option = newOption("C", "C");
    units_select.appendChild(c_option);
    units_select.addEventListener("change", unitsChanged)
    x += units_select.offsetWidth + (spacing * 2);

    screenshot_button = document.getElementById('screenshot_button');
    screenshot_button.style.left = x.toString() + "px";
    screenshot_button.style.width = (110 * g_x_scale_factor).toString() + "px";
    x += screenshot_button.offsetWidth + (spacing * 10);

    reset_button = document.getElementById('reset_button');
    reset_button.style.left = x.toString() + "px";
    reset_button.style.width = (60 * g_x_scale_factor).toString() + "px";
    reset_button.style.backgroundColor = "red";
    x += reset_button.offsetWidth + 30 - (spacing * 4);

    visitech_logo = document.getElementById('visitech_logo');
    visitech_logo.style.position = "absolute";
    visitech_logo.style.left = (g_main_viewport.width - visitech_logo.offsetWidth - 15).toString() + "px";
    visitech_logo.style.top = (spacing / 2).toString() + "px";
    visitech_logo.style.zIndex = "100";
    x += visitech_logo.offsetWidth + 50 + (spacing * 2);
    x = g_main_viewport.width + (spacing * 4);

    var right_side_controls_container = document.getElementById('right_side_controls_container');
    right_side_controls_container.style.position = "absolute";
    right_side_controls_container.style.left = (g_main_viewport.width + right_side_offset).toString() + "px";
    right_side_controls_container.style.height = (g_main_viewport_borders.top - 2).toString() + "px";
    right_side_controls_container.style.width = "40%";
    right_side_controls_container.style.border = "2px solid #000";

    x = 30;

    plot_trend_checkbox = document.getElementById('plot_trend_checkbox');
    plot_trend_checkbox.addEventListener("change", plotTrendCheckboxChanged);
    plot_trend_label = document.getElementById('plot_trend_label');
    plot_trend_label.style.left = x.toString() + "px";
    plot_trend_checkbox.style.left = (x + ((plot_trend_label.offsetWidth - plot_trend_checkbox.offsetWidth) / 2)).toString() + "px";
    x += plot_trend_checkbox.offsetWidth * 2 + spacing * 2;

    plot_trends_checkbox = document.getElementById('plot_trends_checkbox');
    plot_trends_checkbox.addEventListener("change", plotTrendsCheckboxChanged);
    plot_trends_label = document.getElementById('plot_trends_label');
    plot_trends_label.style.left = x.toString() + "px";
    plot_trends_checkbox.style.left = (x + ((plot_trends_label.offsetWidth - plot_trends_checkbox.offsetWidth) / 2)).toString() + "px";
    x += plot_trends_label.offsetWidth + spacing *2 ;


    // yearly_stats_checkbox = document.getElementById('yearly_stats_checkbox');
    // yearly_stats_checkbox.addEventListener("change", yearlyStatsCheckboxChanged);
    // yearly_stats_label = document.getElementById('yearly_stats_label');
    // yearly_stats_label.style.left = x.toString() + "px";
    // yearly_stats_checkbox.style.left = (x + ((yearly_stats_label.offsetWidth - yearly_stats_checkbox.offsetWidth) / 2)).toString() + "px";
    // x += yearly_stats_checkbox.offsetWidth * 2 + spacing * 2;

    // daily_stats_checkbox = document.getElementById('daily_stats_checkbox');
    // daily_stats_checkbox.addEventListener("change", dailyStatsCheckboxChanged);
    // daily_stats_label = document.getElementById('daily_stats_label');
    // daily_stats_label.style.left = x.toString() + "px";
    // daily_stats_checkbox.style.left = (x + ((daily_stats_label.offsetWidth - daily_stats_checkbox.offsetWidth) / 2)).toString() + "px";
    // x += daily_stats_checkbox.offsetWidth * 2 + spacing * 2;

    lock_screen_checkbox = document.getElementById('lock_screen_checkbox');
    lock_screen_checkbox.addEventListener("change", lockScreenCheckboxChanged);
    lock_screen_label = document.getElementById('lock_screen_label');
    lock_screen_label.style.left = x.toString() + "px";
    lock_screen_checkbox.style.left = (x + ((lock_screen_label.offsetWidth - lock_screen_checkbox.offsetWidth) / 2)).toString() + "px";
    x += lock_screen_checkbox.offsetWidth * 2 + spacing * 2;

    draw_bar_chart_checkbox = document.getElementById('draw_bar_chart_checkbox');
    draw_bar_chart_checkbox.addEventListener("change", drawBarChartCheckboxChanged);
    draw_bar_chart_label = document.getElementById('draw_bar_chart_label');
    draw_bar_chart_label.style.left = x.toString() + "px";
    draw_bar_chart_checkbox.style.left = (x + ((draw_bar_chart_label.offsetWidth - draw_bar_chart_checkbox.offsetWidth * 2) / 2)).toString() + "px";
    x += draw_bar_chart_label.offsetWidth + spacing * 2;

    normalize_checkbox = document.getElementById('normalize_checkbox');
    normalize_checkbox.addEventListener("change", normalizeCheckboxChanged);
    normalize_label = document.getElementById('normalize_label');
    normalize_label.style.left = x.toString() + "px";
    normalize_checkbox.style.left = (x + ((normalize_label.offsetWidth - normalize_checkbox.offsetWidth) / 2)).toString() + "px";
    x += normalize_label.offsetWidth * 2 + spacing * 2;

    add_data_button = document.getElementById('add_data_button');
    add_data_button.style.position = "absolute";
    add_data_button.style.width = "15%";
    add_data_button.style.left = x.toString() + "px";
    add_data_button.style.color = PAID_USER_BUTTON_FOREGROUND_COLOR;
    add_data_button.style.backgroundColor = PAID_USER_BUTTON_BACKGROUND_COLOR;

    if (USER_TIER <= USER_TIER_PAID)
    {
        x += add_data_button.offsetWidth + spacing;
    }

    add_data_button.addEventListener('dragover', (event) => 
    {
        event.preventDefault();
        add_data_button.classList.add('dragover');
    });

    add_data_button.addEventListener('dragleave', () => 
    {
        add_data_button.classList.remove('dragover');
    });

    add_data_button.addEventListener('drop', (event) => 
    {
        event.preventDefault();
        add_data_button.classList.remove('dragover');
        const file = event.dataTransfer.files[0];
        if (file) 
        {
            console.log('File dropped:', file.name);
            // console.log(file);
            addUserDataFile(file);
            // Add your file processing logic here
        }
    });

    add_data_button.addEventListener('dragover', () => {
        add_data_button.style.backgroundColor = '#e0e0e0';
    });

    add_data_button.addEventListener('mouseout', () => {
        add_data_button.style.backgroundColor = PAID_USER_BUTTON_BACKGROUND_COLOR;
    });


    add_clipboard_data_button = document.getElementById('add_clipboard_data_button');
    add_clipboard_data_button.style.position = "absolute";
    add_clipboard_data_button.style.width = "15%";
    add_clipboard_data_button.style.left = x.toString() + "px";
    add_clipboard_data_button.style.color = PAID_USER_BUTTON_FOREGROUND_COLOR;
    add_clipboard_data_button.style.backgroundColor = PAID_USER_BUTTON_BACKGROUND_COLOR;

    console.log("add_clipboard_data_button.offsetWidth ", add_clipboard_data_button.offsetWidth);
    console.log("add_clipboard_data_button Display style:", window.getComputedStyle(add_clipboard_data_button).display);

    if (USER_TIER <= USER_TIER_PAID)
    {
        x += add_clipboard_data_button.offsetWidth + 5 + spacing;
    }

    subscribe_button = document.getElementById('subscribe_button');
    cancel_subscription_button = document.getElementById('cancel_subscription_button');

    if (USER_TIER > USER_TIER_PAID || stripe_subscription_canceled)
    {
        cancel_subscription_button.style.display = "none";

        if (USER_TIER > USER_TIER_PAID)
        {
            add_data_button.style.display = "none";
            add_clipboard_data_button.style.display = "none";
        }

        subscribe_button.style.position = "absolute";
        subscribe_button.style.top = "5px";
        subscribe_button.style.width = "15%";
        subscribe_button.style.height = "30px";
        subscribe_button.style.left = x.toString() + "px";
        subscribe_button.style.color = PAID_USER_BUTTON_FOREGROUND_COLOR;
        subscribe_button.style.backgroundColor = PAID_USER_BUTTON_BACKGROUND_COLOR;
        subscribe_button.style.backgroundColor = "red";

        subscribe_button.addEventListener('click', async () => 
        {
            try 
            {
                window.open('./disclaimer.html', '_blank', 'width=800,height=700');
                // const user_id = firebase.auth().currentUser.uid;
                // // const price_id = "price_1Q3NXG06Up2HuqFkdXtYKXBq";
                // const price_id = "price_1Q05OX06Up2HuqFkUV7xl68D";

                // const { sessionId, publicKey } = await createCheckoutSession(price_id, user_id);
                // const stripe = Stripe(publicKey);
                // const { error } = await stripe.redirectToCheckout({ sessionId });

                // if (error) 
                // {
                //     console.error(error);
                // }
            } 
            catch (error) 
            {
                console.error('Error:', error.message);
                // Handle error (e.g., show error message to user)
            }
        });
    }
    else if (USER_TIER == USER_TIER_PAID)
    {
        if (stripe_subscription_canceled == false)
        {
            subscribe_button.style.display = "none";
            cancel_subscription_button.style.position = "absolute";
            cancel_subscription_button.style.top = "5px";
            cancel_subscription_button.style.width = "15%";
            cancel_subscription_button.style.height = "50px";
            cancel_subscription_button.style.left = x.toString() + "px";
            cancel_subscription_button.style.color = PAID_USER_BUTTON_FOREGROUND_COLOR;
            cancel_subscription_button.style.backgroundColor = PAID_USER_BUTTON_BACKGROUND_COLOR;
            cancel_subscription_button.style.backgroundColor = "red";
    
            cancel_subscription_button.addEventListener('click', async () => {
    
                showUnsubscribeModal();
            });
        }
    }
    else
    {
        subscribe_button.style.display = "none";
        cancel_subscription_button.style.display = "none";
    }

    pressed_keys_label = document.getElementById('pressed_keys_label');
    pressed_keys_label.style.position = "absolute";
    pressed_keys_label.style.top = "55%";
    pressed_keys_label.style.height = "40%";
    pressed_keys_label.style.width = "180px";
    pressed_keys_label.style.font = "24px arial,serif,bold";
    pressed_keys_label.style.color = "red";
    pressed_keys_label.style.left = "1%";
    pressed_keys_label.style.border = "1px solid #ccc";

    x += pressed_keys_label.offsetWidth + spacing;


    refresh_button = document.getElementById('refresh_button');
    refresh_button.style.position = "absolute";
    refresh_button.style.width = "100px";
    refresh_button.style.left = x.toString() + "px";
    x += refresh_button.offsetWidth + spacing;

    main_visitech_logo = document.getElementById('main_visitech_logo');
    main_visitech_logo.style.position = "absolute";
    main_visitech_logo.style.left = (glcanvas_width + 100).toString() + "px";
    main_visitech_logo.style.top = "200px";
    main_visitech_logo.style.zIndex = "3";
    main_visitech_logo.style.opacity = "0.2";


    refresh_button.style.display = "none";

    // google_earth_button = document.getElementById('google_earth_button');
    // google_earth_button.style.position = "absolute";
    // google_earth_button.style.width = "100px";
    // google_earth_button.style.left = x.toString() + "px";
    // x += google_earth_button.offsetWidth + spacing;

    populateMonthList();
    selectAllMonths();
    createSelectedMonthList();
    populateDayList();
    selectAllDays();
    createSelectedDayList();

    document.addEventListener("station_list_loaded_event", parseUrlParameters);

    x = spacing;
    var y = 0;

    search_type_select = document.getElementById('search_type_select');
    search_type_select.style.width = (200 * g_x_scale_factor).toString() + "px";

    search_type_select.addEventListener("change", searchTypeChanged);
    search_type_select.addEventListener("focusin", searchTypeFocused);
    search_type_select.style.left = x.toString() + "px";
    search_type_select.style.top = y.toString() + "px";
    var option = newOption(MOST_DAYS_ABOVE, MOST_DAYS_ABOVE);
    search_type_select.appendChild(option);
    option = newOption(LONGEST_STRETCH_ABOVE, LONGEST_STRETCH_ABOVE);
    search_type_select.appendChild(option);
    option = newOption(LONGEST_SEASON_ABOVE, LONGEST_SEASON_ABOVE);
    search_type_select.appendChild(option);
    option = newOption(FIRST_DAY_ABOVE, FIRST_DAY_ABOVE);
    search_type_select.appendChild(option);
    option = newOption(LAST_DAY_ABOVE, LAST_DAY_ABOVE);
    search_type_select.appendChild(option);
    option = newOption(MOST_DAYS_BELOW, MOST_DAYS_BELOW);
    search_type_select.appendChild(option);
    option = newOption(LONGEST_STRETCH_BELOW, LONGEST_STRETCH_BELOW);
    search_type_select.appendChild(option);
    x += search_type_select.offsetWidth + spacing;

    search_parameter_1_input = document.getElementById('search_parameter_1_input');
    search_parameter_1_input.style.position = "absolute";
    search_parameter_1_input.style.left = x.toString() + "px";
    search_parameter_1_input.style.width = (80 * g_x_scale_factor).toString() + "px";
    // search_parameter_1_input.style.height = "20px";
    search_parameter_1_input.style.top = y.toString() + "px";
    search_parameter_1_input.style.font = "16px arial,serif";
    x += search_parameter_1_input.offsetWidth + spacing;

    search_button = document.getElementById('search_button');
    search_button.style.left = x.toString() + "px";
    search_button.style.width = (60 * g_x_scale_factor).toString() + "px";
    // search_button.style.height = "18px";
    search_button.style.backgroundColor = "lightgreen";
    search_button.style.top = y.toString() + "px";
    search_button.style.fontSize = (14 * g_x_scale_factor).toString() + "px";
    x += search_button.offsetWidth + spacing;

    minimum_x_label = document.getElementById('minimum_x_label');
    minimum_x_input = document.getElementById('minimum_x_input');
    minimum_x_input.style.width = (80 * g_x_scale_factor).toString() + "px";
    minimum_x_label.style.position = "absolute";
    minimum_x_label.style.left = x.toString() + "px";
    minimum_x_label.style.top = y.toString() + "px";
    minimum_x_label.style.font = "16px arial,serif";
    minimum_x_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
    minimum_x_label.setAttribute('size', '20');
    minimum_x_label.addEventListener("change", dimensionsChanged);
    // minimum_x_input.addEventListener('mouseleave', function() { this.blur(); } );        
    x += minimum_x_label.offsetWidth + spacing;

    maximum_x_label = document.getElementById('maximum_x_label');
    maximum_x_input = document.getElementById('maximum_x_input');
    maximum_x_input.style.width = (80 * g_x_scale_factor).toString() + "px";
    maximum_x_label.style.position = "absolute";
    maximum_x_label.style.left = x.toString() + "px";
    maximum_x_label.style.top = y.toString() + "px";
    maximum_x_label.style.font = "16px arial,serif";
    maximum_x_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
    maximum_x_label.addEventListener("change", dimensionsChanged);
    // maximum_x_input.addEventListener('mouseleave', function() { this.blur(); } );        
    x += maximum_x_label.offsetWidth + spacing;

    minimum_y_label = document.getElementById('minimum_y_label');
    minimum_y_input = document.getElementById('minimum_y_input');
    minimum_y_input.style.width = (80 * g_x_scale_factor).toString() + "px";
    minimum_y_label.style.position = "absolute";
    minimum_y_label.style.left = x.toString() + "px";
    minimum_y_label.style.top = y.toString() + "px";
    minimum_y_label.style.font = "16px arial,serif";
    minimum_y_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
    minimum_y_label.setAttribute('size', '20');
    minimum_y_label.addEventListener("change", dimensionsChanged);
    // minimum_y_input.addEventListener('mouseleave', function() { this.blur(); } );        
    x += minimum_y_label.offsetWidth + spacing;

    maximum_y_label = document.getElementById('maximum_y_label');
    maximum_y_input = document.getElementById('maximum_y_input');
    maximum_y_input.style.width = (80 * g_x_scale_factor).toString() + "px";
    maximum_y_label.style.position = "absolute";
    maximum_y_label.style.left = x.toString() + "px";
    maximum_y_label.style.top = y.toString() + "px";
    maximum_y_label.style.font = "16px arial,serif";
    maximum_y_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
    maximum_y_label.addEventListener("change", dimensionsChanged);
    // maximum_y_input.addEventListener('mouseleave', function() { this.blur(); } );        
    x += maximum_y_label.offsetWidth + spacing;

    document.addEventListener("dimensions_changed_event", dimensionsChanged);

    x = spacing;
    y += maximum_y_label.offsetHeight + (spacing * 1);
    station_information_label = document.getElementById('station_information_label');
    // station_information_label.style.width = "1000px";
    station_information_label.style.position = "absolute";
    station_information_label.style.left = x.toString() + "px";
    station_information_label.style.top = y.toString() + "px";
    station_information_label.style.font = "16px arial,serif";
    station_information_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
    // station_information_label.style.color = "black";
    y += station_information_label.offsetHeight + (spacing * 4);

    station_information_input = document.getElementById('station_information_input');
    station_information_input.style.borderRadius = "5px";

    main_title_input_label = document.getElementById('main_title_input_label');
    main_title_input_label.style.position = "absolute";
    main_title_input_label.style.left = x.toString() + "px";
    main_title_input_label.style.height = (40 * g_x_scale_factor).toString() + "px";
    main_title_input_label.style.top = y.toString() + "px";
    main_title_input_label.style.font = "16px arial,serif";
    main_title_input_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
    main_title_input = document.getElementById('main_title_input');
    main_title_input.style.borderRadius = "5px";
    // main_title_input.style.width = "1095px";
    // main_title_input.style.height = "30px";
    main_title_input.addEventListener("input", titleChanged);

    // main_title_input.addEventListener('click', function() {this.select();});

    if (USER_TIER <= 1)
    {
        main_title_input.addEventListener("blur", updateMainTitleText);
    }

    y += main_title_input_label.offsetHeight + spacing;

    vertical_axis_title_input_label = document.getElementById('vertical_axis_title_input_label');
    vertical_axis_title_input_label.style.position = "absolute";
    vertical_axis_title_input_label.style.left = x.toString() + "px";
    vertical_axis_title_input_label.style.height = (40 * g_x_scale_factor).toString() + "px";
    vertical_axis_title_input_label.style.top = y.toString() + "px";
    vertical_axis_title_input_label.style.font = "16px arial,serif";
    vertical_axis_title_input_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
    vertical_axis_title_input_label.addEventListener("input", verticalAxisLabelChanged);
    vertical_axis_title_input = document.getElementById('vertical_axis_title_input');
    vertical_axis_title_input.style.borderRadius = "5px";
    // vertical_axis_title_input.style.width = "1015px";
    // vertical_axis_title_input.addEventListener('click', function() {this.select();});
    y += vertical_axis_title_input_label.offsetHeight + spacing;

    horizontal_axis_title_input_label = document.getElementById('horizontal_axis_title_input_label');
    horizontal_axis_title_input_label.style.position = "absolute";
    horizontal_axis_title_input_label.style.left = x.toString() + "px";
    horizontal_axis_title_input_label.style.height = (40 * g_x_scale_factor).toString() + "px";
    horizontal_axis_title_input_label.style.top = y.toString() + "px";
    horizontal_axis_title_input_label.style.font = "16px arial,serif";
    horizontal_axis_title_input_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
    horizontal_axis_title_input_label.addEventListener("input", horizontalAxisLabelChanged);
    horizontal_axis_title_input = document.getElementById('horizontal_axis_title_input');
    horizontal_axis_title_input.style.borderRadius = "5px";
    // horizontal_axis_title_input.style.width = "997px";
    // horizontal_axis_title_input.addEventListener('click', function() {this.select();});

    y += horizontal_axis_title_input_label.offsetHeight + (spacing * 6);

    main_title_text_select = document.getElementById('main_title_text_select');
    main_title_text_select.style.borderRadius = "5px";
    
    main_title_text_select.style.position = "absolute";
    // main_title_text_select.style.left = (x).toString() + "px";
    main_title_text_select.style.left = "3%";
    main_title_text_select.style.top = y.toString() + "px";
    main_title_text_select.style.width = "37%";
    main_title_text_select.style.height = (50 * g_x_scale_factor).toString() + "px";
    main_title_text_select.style.font = "16px arial,serif";
    main_title_text_select.style.fontSize = (16 * g_x_scale_factor).toString() + "px";


    
    window.addEventListener('resize', positionMainTitleDeleteButton);
    
    main_title_text_delete_button = document.getElementById('main_title_text_delete_button');
    main_title_text_delete_button.style.position = "absolute";
    main_title_text_delete_button.style.width = "110px";
    main_title_text_delete_button.style.width = "110px";
    positionMainTitleDeleteButton();
    main_title_text_delete_button.style.height = (50 * g_x_scale_factor).toString() + "px";
    main_title_text_delete_button.style.top = y.toString() + "px";
    main_title_text_delete_button.style.color = PAID_USER_BUTTON_FOREGROUND_COLOR;
    main_title_text_delete_button.style.backgroundColor = PAID_USER_BUTTON_BACKGROUND_COLOR;
    main_title_text_delete_button.style.borderRadius = "5px";
    main_title_text_delete_button.style.fontSize = "14px";
    y += main_title_text_select.offsetHeight + (2 * spacing);    

    google_map_container = document.getElementById('google_map_container');
    chat_outer_container = document.getElementById('chat-outer-container');

    if (USER_TIER <= USER_TIER_PAID)
    {
        await loadGoogleMapsScript();
        main_visitech_logo.style.visibility = "hidden";
        let top_offset = 110;
        google_map_container.style.position = "absolute";
        google_map_container.style.left = (g_main_viewport.width + right_side_offset).toString() + "px";
        google_map_container.style.top = top_offset.toString() + "px"
        google_map_container.style.width = "40%";
        google_map_container.style.height = (g_main_viewport.height - top_offset).toString() + "px";
        google_map_container.style.height = "75%";
        google_map_container.style.zIndex = "1000";
        google_map_container.style.border = "1px solid red";

        chat_outer_container.style.position = google_map_container.style.position;
        chat_outer_container.style.left = google_map_container.style.left;
        chat_outer_container.style.top = google_map_container.style.top;
        chat_outer_container.style.width = google_map_container.style.width;
        chat_outer_container.style.height = "85%";
        chat_outer_container.style.zIndex = (parseInt(google_map_container.style.zIndex) - 1).toString();
        chat_outer_container.style.border = google_map_container.style.border;
        // chat_outer_container.style.padding = "10px";
        chat_outer_container.style.backgroundColor = "#ffffff";
        chat_outer_container.style.fontFamily = "bold, 'Copernicus";
        chat_outer_container.style.fontSize = "20px";
        hideGoogleMap();
        showChat();

        chatInitialize('#chat-outer-container .chat-container');
    }
    else
    {
        main_title_text_select.style.display = "none";
        main_title_text_delete_button.style.display = "none";
        hideGoogleMap();
        // chat_outer_container.style.visibility = "hidden";
    }

    AI_controls_container = document.getElementById('AI_controls_container');
    AI_controls_container.style.width = "33%";
    // AI_controls_container.style.left = "50%";

    AI_query_mic_button = document.getElementById('AI_query_mic_button');
    AI_query_input_label = document.getElementById('AI_query_input_label');
    AI_query_button = document.getElementById('AI_query_button');

    AI_query_mic_button.style.position = "absolute";
    AI_query_mic_button.style.left = x.toString() + "px";
    AI_query_mic_button.style.top = (y + (spacing * 2)).toString() + "px";
    AI_query_mic_button.style.height = (40 * g_x_scale_factor).toString() + "px";
    AI_query_mic_button.style.width = (40 * g_x_scale_factor).toString() + "px";
    AI_query_mic_button.style.zIndex = "10000";
    x += AI_query_mic_button.offsetWidth + spacing;

    AI_query_input_label.style.position = "absolute";
    AI_query_input_label.style.left = AI_query_mic_button.offsetWidth.toString() + "px";
    AI_query_input_label.style.left = "5px";
    AI_query_input_label.style.width = "33%";
    AI_query_input_label.style.height = (40 * g_x_scale_factor).toString() + "px";
    AI_query_input_label.style.top = y.toString() + "px";
    AI_query_input_label.style.font = "16px arial,serif";
    AI_query_input_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
    AI_query_input_label.style.textAlign = "right";

    AI_query_input = document.getElementById('AI_query_input');
    AI_query_input.style.borderRadius = "5px";
    // x += AI_query_input.offsetWidth + (spacing * 10);
    // AI_query_input.style.width = "82%";
    // AI_query_input.addEventListener('click', selectTextIfNeeded(AI_query_input));

    AI_query_input.style.visibility = "hidden";
    AI_query_input_label.style.visibility = "hidden";
    AI_query_mic_button.style.visibility = "hidden";
    AI_query_button.style.visibility = "hidden";

    AI_query_input.addEventListener('click', function() 
    {
        selectTextIfNeeded(AI_query_input);
    });

    

    // AI_query_input.addEventListener("blur", aiQuery);

    window.addEventListener('resize', positionAIQueryButton);

    // AI_query_button.style.position = "absolute";
    // let AI_query_input_label_text_width = AI_query_input_label.offsetWidth - AI_query_input.offsetWidth;
    // AI_query_button.style.left = (AI_query_input.offsetWidth + AI_query_input_label_text_width).toString() + "px";
    // AI_query_button.style.left = (x).toString() + "px";
    positionAIQueryButton();
    AI_query_button.style.width = "110px";
    AI_query_button.style.height = (40 * g_x_scale_factor).toString() + "px";
    AI_query_button.style.top = (y + 10).toString() + "px";
    AI_query_button.style.color = PAID_USER_BUTTON_FOREGROUND_COLOR;
    AI_query_button.style.backgroundColor = PAID_USER_BUTTON_BACKGROUND_COLOR;
    AI_query_button.style.borderRadius = "5px";
    y += AI_query_input.offsetHeight + spacing * 3;  
    
    // logout_button = document.getElementById('logout_button');
    // logout_button.style.position = "absolute";
    // logout_button.style.left = ((g_main_viewport.width) / 2 - 100).toString() + "px";
    // logout_button.style.left = "5px";
    // logout_button.style.top = (y + spacing).toString() + "px";
    // logout_button.style.height = "35px";
    // logout_button.style.width = "60px";
    // logout_button.style.color = "white";
    // logout_button.style.backgroundColor = "red";
    // y += logout_button.offsetHeight + spacing; 


    if (USER_TIER <= USER_TIER_PAID)
    {
        AI_query_input.addEventListener('keydown', function(event) 
        {
            if (event.key === 'Enter') 
            {
                const query = document.getElementById('AI_query_input').value;
                interpretAIQuery(query);
            }
        });    

        if ('webkitSpeechRecognition' in window) 
        {
            const recognition = new webkitSpeechRecognition();
            
            // Set properties
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            
            let finalTranscript = '';
            mic_is_recording = false;
            
            recognition.onresult = (event) => 
            {
              let interimTranscript = '';
              
              for (let i = event.resultIndex; i < event.results.length; i++) 
              {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) 
                {
                  finalTranscript += transcript + ' ';
                  AI_query_input.value = finalTranscript;
                } 
                else 
                {
                  interimTranscript += transcript;
                  AI_query_input.value = interimTranscript;
                }
              }
              
              
            };
            
            recognition.onend = () => 
            {
              console.log("webkitSpeechRecognition recognition.onend");
              mic_is_recording = false;
              AI_query_mic_button.style.backgroundColor = mic_button_not_recording_color;
              AI_query_input.value = finalTranscript;
            };
            
            // Toggle recognition
            AI_query_mic_button.addEventListener('click', () => 
            {
              console.log("AI_query_mic_button clicked");
              if (mic_is_recording) 
              {
                recognition.stop();
                mic_is_recording = false;
                AI_query_mic_button.style.backgroundColor = mic_button_not_recording_color;
                AI_query_input.value = finalTranscript;
            } 
              else 
              {
                recognition.start();
                mic_is_recording = true;
                AI_query_mic_button.style.backgroundColor = mic_button_recording_color;
                finalTranscript = "";
                AI_query_input.value = "";
                AI_query_input.focus();
              }
            });
          } 
          else 
          {
            console.log('Web Speech API is not supported in this browser.');
            AI_query_mic_button.style.display = 'none';
          }
    }
    else
    {
        AI_query_input_label.style.display = "none";;
        AI_query_input.style.display = "none";;
        AI_query_button.style.display = "none";;
        AI_query_mic_button.style.display = "none";;
    }
// AI_query_input.addEventListener("blur", aiQuery);

    x = 670 * g_x_scale_factor;
    y = 0;
    count_label = document.getElementById("count_label");
    count_label.style.left = (x).toString() + "px";
    count_label.style.width = (95 * g_x_scale_factor).toString() + "px";
    count_label.style.bottom = y.toString() + "px";
    count_name_label = document.getElementById("count_name_label");
    count_name_label.style.left = (x).toString() + "px";
    count_name_label.style.width = (95 * g_x_scale_factor).toString() + "px";
    count_name_label.style.bottom = y.toString() + "px";
    x += count_label.offsetWidth + spacing;

    average_label = document.getElementById("average_label");
    average_label.style.left = (x).toString() + "px";
    average_label.style.width = (100 * g_x_scale_factor).toString() + "px";
    average_label.style.bottom = y.toString() + "px";
    average_name_label = document.getElementById("average_name_label");
    average_name_label.style.left = (x).toString() + "px";
    average_name_label.style.width = (100 * g_x_scale_factor).toString() + "px";
    average_name_label.style.bottom = y.toString() + "px";
    selected_average_label = document.getElementById("selected_average_label");
    selected_average_label.style.left = (x).toString() + "px";
    selected_average_label.style.width = (1* g_x_scale_factor * 100).toString() + "px";
    selected_average_label.style.bottom = (y + average_label.offsetHeight).toString() + "px";
    x += selected_average_label.offsetWidth + spacing;

    sum_label = document.getElementById("sum_label");
    sum_label.style.left = x.toString() + "px";
    sum_label.style.width = (100 * g_x_scale_factor).toString() + "px";
    sum_label.style.bottom = y.toString() + "px";
    sum_name_label = document.getElementById("sum_name_label");
    sum_name_label.style.left = x.toString() + "px";
    sum_name_label.style.width = (100 * g_x_scale_factor).toString() + "px";
    sum_name_label.style.bottom = y.toString() + "px";
    selected_sum_label = document.getElementById("selected_sum_label");
    selected_sum_label.style.left = x.toString() + "px";
    selected_sum_label.style.width = (100 * g_x_scale_factor).toString() + "px";
    selected_sum_label.style.bottom = (y + sum_label.offsetHeight).toString() + "px";

    x += sum_label.offsetWidth + spacing;

    trend_label = document.getElementById("trend_label");
    trend_label.style.left = x.toString() + "px";
    trend_label.style.width = (100 * g_x_scale_factor).toString() + "px";
    trend_label.style.bottom = y.toString() + "px";
    trend_name_label = document.getElementById("trend_name_label");
    trend_name_label.style.left = x.toString() + "px";
    trend_name_label.style.width = (100 * g_x_scale_factor).toString() + "px";
    trend_name_label.style.bottom = y.toString() + "px";
    selected_trend_label = document.getElementById("selected_trend_label");
    selected_trend_label.style.left = x.toString() + "px";
    selected_trend_label.style.width = (100 * g_x_scale_factor).toString() + "px";
    selected_trend_label.style.bottom = (y + trend_label.offsetHeight).toString() + "px";

    x += trend_label.offsetWidth + spacing;

    // curvature_label = document.getElementById("curvature_label");
    // curvature_label.style.left = x.toString() + "px";
    // curvature_label.style.bottom = y.toString() + "px";
    // curvature_name_label = document.getElementById("curvature_name_label");
    // curvature_name_label.style.left = x.toString() + "px";
    // curvature_name_label.style.bottom = y.toString() + "px";
    // x += curvature_label.offsetWidth + spacing;

    series_count_label = document.getElementById("series_count_label");
    series_count_label.style.left = x.toString() + "px";
    series_count_label.style.width = (80 * g_x_scale_factor).toString() + "px";
    series_count_label.style.bottom = y.toString() + "px";
    series_count_name_label = document.getElementById("series_count_name_label");
    series_count_name_label.style.left = x.toString() + "px";
    series_count_name_label.style.width = (80 * g_x_scale_factor).toString() + "px";
    series_count_name_label.style.bottom = y.toString() + "px";
    x += series_count_label.offsetWidth + spacing;

    day_count_label = document.getElementById("day_count_label");
    day_count_label.style.left = x.toString() + "px";
    day_count_label.style.width = (80 * g_x_scale_factor).toString() + "px";
    day_count_label.style.bottom = y.toString() + "px";
    day_count_name_label = document.getElementById("day_count_name_label");
    day_count_name_label.style.left = x.toString() + "px";
    day_count_name_label.style.width = (80 * g_x_scale_factor).toString() + "px";
    day_count_name_label.style.bottom = y.toString() + "px";
    x += day_count_label.offsetWidth + spacing;

    y -= 25;
    let disclaimer_width = 400;
    disclaimer_label = document.getElementById("disclaimer_label");
    disclaimer_label.style.left = ((g_main_viewport.width - disclaimer_width) / 2).toString() + "px";
    disclaimer_label.style.bottom = y.toString() + "px";
    disclaimer_label.style.width = disclaimer_width.toString() + "px";

    const toggleHamburger = document.getElementById('toggleHamburger');
    const controls_container = document.getElementById('controls_container');
    const toggleText = document.getElementById('toggleText');
    controls_container.classList.toggle('hidden');

    // Add click event listener to the hamburger icon
    toggleHamburger.addEventListener('click', function() 
    {
        // Toggle the active class on the hamburger
        this.classList.toggle('active');
        
        // Toggle the hidden class on the container
        controls_container.classList.toggle('hidden');
        
        // Update text based on container visibility
        if (controls_container.classList.contains('hidden')) 
        {
            toggleText.textContent = 'Show Controls';
        } else 
        {
            toggleText.textContent = 'Hide Controls';
        }
    });
    

    if (usingUserData())
    {
        already_initialized = true;
    }
    else
    {
        // The URL can't be parsed and selects set until the station list is loaded
        loadTextFile(country_dict[country_select.value].station_file_path, stationListLoaded);
    }

    if (PROGRAM_NAME == "STOCKS")
    {
        setupStocksUI();
    }
}

function refresh()
{
    console.log("refresh");
    window.location.reload();
}

function usingUserData()
{
    return country_select.value == user_data_symbol ? true : false;
}

function setUsingUserData()
{
    country_select.value = user_data_symbol;
}

function clearMinMaxInputs()
{
    minimum_x_input.value = "";
    maximum_x_input.value = "";
    minimum_y_input.value = "";
    maximum_y_input.value = "";
}

function selectOneSeries(series)
{
    g_selected_series_list.length = 0;
    g_selected_series_list.push(series);
    // option_series_map.clear();
    console.log("selectOneSeries cleared option_series_map");

    for (var i = 0; i < series_select.options.length; i++)
    {
        var option = series_select.options[i];

        if (option.value == series.id || option.value == series.name)
        {
            // option.selected = true;
            option.setAttribute('selected', 'selected');
            option.selected = true;
            selectOption(option);
            // $("series_select").val(i).trigger("change");
            console.log($("series_select").val());
            // option.style.backgroundColor = "green";
            // addToOptionSeriesMap(option, series);
            console.log(series, option);
        }
        else
        {
            option.selected = false;
            deselectOption(option);
            // option.style.backgroundColor = "black";
        }

        name_label.innerHTML = series.name;
        setStationInformationLabel(series);
    }
}

function selectMultipleSeries(series_list, clear_list = false)
{
    if (clear_list)
    {
        g_selected_series_list.length = 0;
    }

    g_selected_series_list.push(...series_list);
    // option_series_map.clear();
    console.log("selectOneSeries cleared option_series_map");

    let selected_name_list = [];

    for (series of series_list)
    {
        selected_name_list.push(series.id, series.name);
    }

    for (var i = 0; i < series_select.options.length; i++)
    {
        var option = series_select.options[i];

        if (selected_name_list.includes(option.value))
        {
            // option.selected = true;
            option.setAttribute('selected', 'selected');
            option.selected = true;
            selectOption(option);
            // $("series_select").val(i).trigger("change");
            console.log($("series_select").val());
            // option.style.backgroundColor = "green";
            // addToOptionSeriesMap(option, series);
            console.log(series, option);
        }
        else if (clear_list)
        {
            option.selected = false;
            deselectOption(option);
            // option.style.backgroundColor = "black";
        }

        name_label.innerHTML = series.name;
        setStationInformationLabel(series);
    }
}

function plotTrendCheckboxChanged()
{
    update_statistics_next_time = true;
    console.log("calling updateStatistics() from plotTrendCheckboxChanged()");
    updateStatistics();
    drawGraph();
}

function plotTrendsCheckboxChanged()
{
    update_statistics_next_time = true;
    console.log("calling updateStatistics() from plotTrendsCheckboxChanged()");
    updateStatistics();
    drawGraph();
}

function yearlyStatsCheckboxChanged()
{
    if (yearly_stats_checkbox.checked)
    {
        let yearly_average_series = statistics_layers_map.get(YEARLY_AVERAGE);
        let yearly_maximum_series = statistics_layers_map.get(YEARLY_MAXIMUM);
        let yearly_minimum_series = statistics_layers_map.get(YEARLY_MINIMUM);
        let average_option = addSeriesToSeriesSelect(yearly_average_series, true)
        let maximum_option = addSeriesToSeriesSelect(yearly_maximum_series, true)
        let minimum_option = addSeriesToSeriesSelect(yearly_minimum_series, true)
        addToOptionSeriesMap(average_option, yearly_average_series);
        addToOptionSeriesMap(maximum_option, yearly_maximum_series);
        addToOptionSeriesMap(minimum_option, yearly_minimum_series);
        console.log("calling updateStatistics() from yearlyStatsCheckboxChanged()");
        updateStatistics()
        updateSelectedSeriesList();

    }
}
function dailyStatsCheckboxChanged()
{
    if (daily_stats_checkbox.checked)
    {
        
    }
}

function lockScreenCheckboxChanged()
{
    dont_change_min_max = screenLocked();
}

function barChart()
{
    return draw_bar_chart_checkbox.checked;
}

function drawBarChartCheckboxChanged()
{
    console.log("drawBarChartCheckboxChanged");
    document.dispatchEvent(draw_scene_event);
    updateMinimalStatistics();
}

function normalizeCheckboxChanged()
{
    console.log("normalizeCheckboxChanged", arguments.callee.name);
    document.dispatchEvent(draw_scene_event);
}

function unitsChanged()
{
    use_centigrade = units_select.value == "C";

    var label_text = y_axis_label.innerHTML;

    var minimum_y = parseFloat(minimum_y_input.value);
    var maximum_y = parseFloat(maximum_y_input.value);

    if (use_centigrade)
    {
        label_text = label_text.replace("F", "C");
        average_name_label.innerHTML = average_name_label.innerHTML.replace("F", "C");
        sum_name_label.innerHTML = sum_name_label.innerHTML.replace("F", "C");

        if (!isNaN(minimum_y))
        {
            minimum_y_input.value = fToC(minimum_y).toFixed(2);
        }
        if (!isNaN(maximum_y))
        {
            maximum_y_input.value = fToC(maximum_y).toFixed(2);
        }
    }
    else
    {
        label_text = label_text.replace("C", "F");
        average_name_label.innerHTML = average_name_label.innerHTML.replace("F", "C");
        sum_name_label.innerHTML = sum_name_label.innerHTML.replace("C", "F");

        if (!isNaN(minimum_y))
        {
            minimum_y_input.value = cToF(minimum_y).toFixed(2);
        }
        if (!isNaN(maximum_y))
        {
            maximum_y_input.value = cToF(maximum_y).toFixed(2);
        }
    }

    updateMinimalStatistics();
    y_axis_label.innerHTML = label_text;
    setUnitsLabelString();
    setAverageValueLabelString();
    document.dispatchEvent(draw_scene_event);
}

function generateIndexListAndCalculateMinMax(month_filter, day_filter, minimum_value, maximum_value, update_graph = false, add_margin = true)
{
    console.log("generateIndexListAndCalculateMinMax", minimum_value, maximum_value);
    month_filter = parseInt(month_filter);
    day_filter = parseInt(day_filter);
    vertices_changed = true;

    let series_list = g_selected_series_list;

    if (usingUserData())
    {
        series_list = g_user_series_list;
    }

    // console.log(series_list);
    for (let i = 0; i < series_list.length; i++)
    {
        var series = series_list[i];

        if (series === null)
        {
            console.log("generateIndexListAndCalculateMinMax series === null");
            continue;
        }

        var graph_index_list;

        let graph_indices = getIndexArray(series);
        let graph_positions = getPositionArray(series);


        if (usingUserData() || series.series_type == GENERIC_SERIES_TYPE || series.series_type == HYBRID_SERIES_TYPE)
        {
            graph_index_list = series.graph_index_list;
        }
        else
        {
            graph_index_list = series.graph_index_list[type_select.value];
        }

        graph_indices.length = 0;
        graph_index_list.length = 0;
        graph_index_list.push([]);
        var index = 0;
        let previous_x = undefined;
        let delta_x = undefined;

        let user_defined_minimum_y = stringIsNumeric(minimum_y_input.value) ? Number(minimum_y_input.value) : null;
        let user_defined_maximum_y = stringIsNumeric(maximum_y_input.value) ? Number(maximum_y_input.value) : null;

        for (let j = 0; j < graph_positions.length; j += number_of_coordinates_per_point)
        {
            var month_name;
            var month;
            var day;
            var year;
            var date = graph_positions[j];

            if (isNaN(date))
            {
                index++;
                continue;
            }

            var x = date;
            var y = graph_positions[j + 1];

            if (previous_x !== undefined)
            {
                delta_x = x - previous_x;

                if (delta_x > series.smallest_delta_x * 2 && delta_x >= 1)
                {
                    // Start a new index list
                    graph_index_list.push([])
                }
            }

            previous_x = x;
    
            if (!dont_change_min_max)
            {
    
                if (x > maximum_value.x) 
                { 
                    maximum_value.x = x 
                }
                if (x < minimum_value.x) 
                { 
                    minimum_value.x = x 
                }
                if (y > maximum_value.y && user_defined_maximum_y === null) 
                { 
                    maximum_value.y = y 
                    x_at_maximum_y = x;
                }
                if (y < minimum_value.y && user_defined_minimum_y === null) 
                { 
                    minimum_value.y = y 
                    x_at_minimum_y = x;
                }
            }
    
    
            [month_name, month, day, year] = GraphingUtilities.monthDayYear(date);

            if (selected_month_list.includes(month) && selected_day_list.includes(day))
            {
                graph_indices.push(index);
                graph_index_list.at(-1).push(index);
            }
    
            index++;
        }

        if (user_defined_maximum_y !== null)
        {
            maximum_value.y = user_defined_maximum_y;
        }
        if (user_defined_minimum_y !== null)
        {
            minimum_value.y = user_defined_minimum_y;
        }

        // console.log("graph_index_list", graph_index_list);
    }

    if (add_margin)
    {
        addGraphMargin(minimum_value, maximum_value, GRAPH_MARGIN_PERCENT);
    }

    console.log("generateIndexListAndCalculateMinMax", minimum_value, maximum_value, g_minimum, g_maximum);
    current_minimum = g_minimum;
    current_maximum = g_maximum;

    // console.log(graph_indices);
    if (update_graph)
    {
        document.dispatchEvent(draw_scene_event);
    }
    
}

function populateTypeSelect()
{
    for (var i = 0; i < type_list.length; i++)
    {
        var type = type_list[i];
        var option = newOption(type, type);
        type_select.appendChild(option);
    }
}

function stationListLoaded()
{
    var temperature_stations_source = this.responseText;
    var station_list = splitIntoLines(temperature_stations_source);
    console.log("stationListLoaded station_list.length", station_list.length);
    state_select.length = 0;
    state_map = {};
    var state_list = [];

    for (var i = 0; i < station_list.length; i++)
    {
        var line = station_list[i];

        if (line.length == 0)
        {
            continue
        }

        var id = line.substring(0, 11);
        var latitude = line.substring(12, 20);
        var longitude = line.substring(21, 30);
        var elevation = line.substring(31, 37);
        var state_abbreviation = line.substring(38, 40);
        var state_name =  GraphingUtilities.stateName(state_abbreviation);
        var name = line.substring(41, 75);

        if (state_abbreviation != "  ")
        {
            if (state_abbreviation in state_map)
            {
    
            }
            else
            {
                state_map[state_abbreviation] = new State(state_abbreviation);
                state_list.push(state_abbreviation);
                // var option = newOption(state_abbreviation, state_abbreviation);
                // state_select.appendChild(option);

                var station = new Station("ANNUAL", "Annual Average", country_select.value, state_abbreviation, state_name, 0, 0);
                console.log("stationListLoaded 1 Added station", station);
                var state = state_map[state_abbreviation];
                state.station_list.push(station);

                station = new Station("ALL", "ALL", country_select.value, state_abbreviation, state_name, 0, 0);
                state.station_list.push(station);            }
        }
        else
        {
            state_abbreviation = country_select.value;

            if (state_abbreviation in state_map)
            {

            }
            else
            {
                state_map[state_abbreviation] = new State(state_abbreviation);
                state_list.push(state_abbreviation);
                // var option = newOption(state_abbreviation, state_abbreviation);
                // state_select.appendChild(option);

                var station = new Station("ANNUAL", "Annual Average", country_select.value, state_abbreviation, state_name, 0, 0);
                console.log("stationListLoaded 2 Added station", station);
                var state = state_map[state_abbreviation];
                state.station_list.push(station);

                station = new Station("ALL", "ALL", country_select.value, state_abbreviation, state_name, 0, 0);
                state.station_list.push(station);
            }                                              
        }

        var station = new Station(id, name, country_select.value, state_abbreviation, state_name, parseFloat(latitude), parseFloat(longitude), parseFloat(elevation));
        // console.log(id, name);
        var state = state_map[state_abbreviation];
        state.station_list.push(station);
    }

    state_list.sort();

    for (var i = 0; i < state_list.length; i++)
    {
        var state_abbreviation = state_list[i];
        var option = newOption(state_abbreviation, state_abbreviation);
        state_select.appendChild(option);
    }

    if (initial_settings.state != undefined) 
    {
        var state = initial_settings.state;
        
        for (i = 0; i < state_select.length; i++)
        {
            if (state_select.options[i].value == state)
            {
                state_select.value = state;
                state_label.innerHTML = state;
            }
        }
    }
    else
    {
        state_select.value = state_select[0].value;
    }

    console.log("stationListLoaded state_list.length =", state_list.length, "state_map =", state_map);
    if (state_list.length == 1 && state_list[0] == country_select.value)
    {
        state_select.value =  country_select.value;
    }

    // if (country_select.value != state_select.value)
    {
        state_label.innerHTML = state_select.value;
    }    

    console.log("stationListLoaded state_select.value", state_select.value);
    populateStationList(state_map[state_select.value]);

    document.dispatchEvent(station_list_loaded_event);
}

function verticalTitleStringToPlainText(vertical_string) {
    let plain_text = "";
    let in_parenthesis = false;
    
    // Split by spaces since the vertical string has padding
    let characters = vertical_string.split(" ").filter(char => char !== "");
    
    for (let i = 0; i < characters.length; i++) {
        let character = characters[i];
        
        if (character === "-") {
            // Convert dash back to space (when outside parentheses)
            plain_text += " ";
        }
        else if (character === "\u26AC") { // ⚬ (White Bullet)
            // Convert back to period
            plain_text += ".";
        }
        else if (character === "\u2040") { // ⁀ (Character Tie)
            // Convert back to opening parenthesis
            in_parenthesis = true;
            plain_text += "(";
        }
        else if (character === "\u203F") { // ‿ (Undertie)
            // Convert back to closing parenthesis
            in_parenthesis = false;
            plain_text += ")";
        }
        else {
            // Convert back to lowercase for regular characters
            plain_text += character.toLowerCase();
        }
    }
    
    return plain_text;
}

function getVerticalString(horizontal_string)
{
    // console.log("\"", horizontal_string, "\"");

    let vertical_string = "";
    let in_parenthesis = false;

    for (let i = 0; i < horizontal_string.length; i++)
    {
        let character = horizontal_string[i].toUpperCase();
        
        if (character == " ")
        {
            if (in_parenthesis)
            {
                // Keep space as is when inside parentheses
            }
            else
            {
                character = "-";
            }
        }
        else if (character == ".")
        {
            character = "\u26AC"; // ⚬ (White Bullet)
        }
        else if (character == "(")
        {
            in_parenthesis = true; // Fixed variable name here
            character = "\u2040"; // ⁀ (Character Tie)
        }
        else if (character == ")")
        {
            in_parenthesis = false;
            character = "\u203F"; // ‿ (Undertie)
        }

        let padding = " ";
        vertical_string += character + padding;
    }

    return vertical_string;
}

function countryChanged(event)
{
    setGraphingMode(GRAPHING_MODE_TIME_SERIES);

    hideChat();
    hide2DCanvas();
    showGoogleMap();

    if (usingUserData())
    {
        populateUserDataSelect();
        var option = series_select[0];
        selectOption(option);
        // var tmax_string_c = "T E M P E R A T U R E - C";
        let units_string = g_user_series_list[0].y_units;
        let vertical_string = getVerticalString(units_string);
        y_axis_label.innerHTML = vertical_string;
        stationChanged();    
    }
    else
    {
        setAverageValueLabelString();
        setUnitsLabelString();
        console.log("countryChanged", country_dict[country_select.value].station_file_path);
        loadTextFile(country_dict[country_select.value].station_file_path, stationListLoaded);
    }
}


function stateChanged(event)
{
    setGraphingMode(GRAPHING_MODE_TIME_SERIES);
    var state_abbreviation = state_select.value;
    var state = state_map[state_abbreviation];
    state_label.innerHTML = state.abbreviation;
    setUnitsLabelString();
    setAverageValueLabelString();

    // console.log(state);
    populateStationList(state);
    hideChat();
    hide2DCanvas();
    showGoogleMap();
}

function populateUserDataSelect()
{
    console.log("populateUserDataSelect");
    series_select.length = 0;
    g_option_series_map.clear();
    console.log("populateUserDataSelect cleared option_series_map");


    for (let i = 0; i < g_user_series_list.length; i++)
    {
        let series = g_user_series_list[i];
        console.log(series);
        addSeriesToSeriesSelect(series, false);
    }
}

function populateStationList(state)
{
    series_select.length = 0;
    g_selected_series_list.length = 0;
    g_option_series_map.clear();
    console.log("populateStationList cleared option_series_map");

    if (USER_TIER <= USER_TIER_PAID)
    {

        if (g_google_map !== undefined && g_google_map.getStreetView().getVisible()) 
        {
            g_google_map.getStreetView().setVisible(false);
        }
    
        clearAllGoogleMapMarkers(g_google_map_marker_list);
    }

    try
    {
        selected_series = state.station(state.station_list[0].id);
    }
    catch
    {
        var break_here = true;
    }
    

    let annual_average_station = undefined;

    for (var i = 0; i < state.station_list.length; i++)
    {
        var station = state.station_list[i];

        if (station.id == "ANNUAL")
        {
            annual_average_station = station;
        }
        
        if (station.latitude !== undefined && station.longitude !== undefined && (station.latitude != "0" || station.longitude != 0))
        {
            if (USER_TIER <= USER_TIER_PAID)
            {
                console.log("populateStationList adding google map marker", station.latitude, station.longitude, station.name);
                let new_google_map_marker = addGoogleMapMarker(station.latitude, station.longitude, station.name);
                station.google_map_marker = new_google_map_marker;
            }
        }

        console.log("populateStationList", station.id, station.name);
        var option = newOption(station.id, station.name);
        series_select.appendChild(option);
        addToOptionSeriesMap(option, station);
        // console.log("populateStationList addToOptionSeriesMap(option, station)", option, station);
    }

    if (USER_TIER <= USER_TIER_PAID)
    {
        g_google_map_marker_list.forEach(marker => addLabelClickHandler(marker, onGoogleMapSeriesLabelClick));

        let center_zoom = fitMapToMarkers(g_google_map_marker_list, g_google_map);

        // Check if the function returned valid results
        if (center_zoom.center && center_zoom.zoom !== null && g_google_map !== undefined)  
        {
            // Set the map center to the calculated center
            g_google_map.setCenter(center_zoom.center);
            
            // Set the map zoom to the calculated zoom level
            g_google_map.setZoom(center_zoom.zoom);
        } else {
            console.error("Failed to calculate map center and zoom");
        }
    }
    

    // const options = Array.from(series_select.options);
    // options.sort((a, b) => a.text.localeCompare(b.text));

    // const options = Array.from(series_select.options);

    // options.sort((a, b) => 
    // {
    //     if (a.value === "Annual") return -1;
    //     if (b.value === "Annual") return 1;
    //     if (a.value === "ALL") return -1;
    //     if (b.value === "ALL") return 1;
    //     return a.text.localeCompare(b.text);
    // });

    // options.forEach(option => series_select.appendChild(option));

    // Move annual average and all to the top of the select

    const options = Array.from(series_select.options)
        .filter(option => option.value !== "ALL")
        .sort((a, b) => a.text.localeCompare(b.text));
        
    options.forEach(option => series_select.appendChild(option));
    // option = newOption("ANNUAL", "Annual Average"); 

    if (annual_average_station !== undefined)
    {
        // addToOptionSeriesMap(option, annual_average_station);
    }

    // console.log("stationListLoaded 3 Added option", option);
    // options.unshift(option);
    option = newOption("ALL", "ALL");
    options.unshift(option);

    // Clear the existing options
    series_select.innerHTML = '';

    // Append the sorted options back to the select element
    options.forEach(option => 
    {
        series_select.appendChild(option);
    });

    // var option = newOption("ANNUAL", "Annual Average");
    // series_select.appendChild(option);

    if (getQueryParameterByName("id") !== "") 
    {
        var id = getQueryParameterByName("id");

        if (id == "ANNUAL" && !usingUserData())
        {
            use_whole_year_labels = true;
        }
        else
        {
            use_whole_year_labels = false;
        }

        if (state.station(id) != null && id != "ALL")
        {
            selected_series = state.station(id);
        }
    }

    if (getQueryParameterByName("type") !== "") 
    {
        type_select.value = getQueryParameterByName("type");
    }

    for (let i = 0; i < series_select.options.length; i++)
    {
        var option = series_select.options[i];

        if (option.value == selected_series.id)
        {
            // option.selected = true;
            option.setAttribute('selected', 'selected');
            option.selected = true;
            selectOption(option)
            // option.style.backgroundColor = selected_option_background_color;
            // $("series_select").val(i).trigger("change");
            // console.log("populateStationList", $("series_select").val());
            // option.style.backgroundColor = "green";
            // console.log("populateStationList", selected_series, option);
            series_select_passthrough_button.innerHTML = series_select[i].innerHTML + "  " + DOWN_ARROW_HAT;
        }
        else
        {
            option.selected = false;
            deselectOption(option);
            // option.style.backgroundColor = unselected_option_background_color;
            // option.style.backgroundColor = "black";
        }
    }

    // series_select.value = selected_series.id;
    g_selected_series_list.push(state.station(selected_series.id));

    if (getPositionBuffer(selected_series) == null)
    {
        setPositionBuffer(selected_series, gl.createBuffer());
        setIndexBuffer(selected_series, gl.createBuffer());
        console.log("Created buffers for", selected_series.name, type_select.value);
    }

    console.log(series_select.value);

    // if (series_select.value == "ALL")
    // {

    // }
    // else
    {
        var type_string = typeString();
        var data_file_path = "data/" + country_select.value + "/" + type_string + "/" + state.abbreviation + "/" + selected_series.id + ".csv";
        loadTextFile(data_file_path, dataFileLoaded);
    }
}

function populateCountrySelect()
{
    var option = newOption(user_data_symbol, user_data_symbol);
    option.title = user_data_name;
    country_select.appendChild(option);

    for (var key in country_dict)
    {
        var country = country_dict[key];
        var option = newOption(country.abbreviation, country.abbreviation);
        option.title = country.name;
        // option.title.style.fontSize = "18px";
        country_select.appendChild(option);
    }
    
    country_select.selectedIndex = 1;
}

function populateMonthList()
{
    var option = newOption(0, "ALL");
    month_select.appendChild(option);

    for (var i = 0; i < GraphingUtilities.monthList().length; i++)
    {
        var month = GraphingUtilities.monthList()[i];
        var month_abbreviation = GraphingUtilities.month_name_map[month];
        var option = newOption(i + 1, month_abbreviation);
        month_select.appendChild(option);
    }
}

function populateDayList()
{
    var option = newOption(0, "ALL");
    day_select.appendChild(option);

    for (var i = 0; i < 31; i++)
    {
        var option = newOption(i + 1, (i + 1).toString());
        day_select.appendChild(option);
    }
}

function newOption(value, text)
{
    var option = document.createElement("option");
    option.value = value;
    option.text = text;
    option.style.color = "white";
    // option.style.fontWeight = "bold";
    option.style.backgroundColor = "black";
    option.style.fontSize = unselected_option_font_size;
    option.style.height = (unselected_option_font_size - 15).toString() + "px";
    return option;
}

function stationSelectFocused()
{
    // console.log("stationSelectFocused", Math.random());
    // series_select.selectedIndex = -1;
}

function setUnitsLabelString()
{
    if (PROGRAM_NAME == "STOCKS")
    {
        y_axis_label.innerHTML = "D O L L A R S";
    }
    else if (type_select.value == TMAX)
    {
        y_axis_label.innerHTML = use_centigrade ? tmax_string_c : tmax_string_f;
    }
    else if (type_select.value == TMIN)
    {
        y_axis_label.innerHTML = use_centigrade ? tmin_string_c : tmin_string_f;
    }
    else if (type_select.value == PRCP)
    {
        y_axis_label.innerHTML = use_centigrade ? prcp_string_mm : prcp_string_in;
    }
    else if (type_select.value == SNOW)
    {
        y_axis_label.innerHTML = use_centigrade ? snow_string_mm : snow_string_in;
    }
}

function setAverageValueLabelString()
{
    const use_centigrade = units_select.value == "C";
    var units_string = "";

    if (type_select.value == TMAX || type_select.value == TMIN)
    {
        units_string = use_centigrade ? "C" : "F";
    }
    else if (type_select.value == PRCP || type_select.value == SNOW)
    {
        units_string = use_centigrade ? "mm" : "in";
    }

    average_name_label.innerHTML = "Average (" + units_string + ")";
    sum_name_label.innerHTML = "Sum (" + units_string + ")";
}

function searchTypeChanged(event)
{
    var search_parameter_1 = parseFloat(search_parameter_1_input.value);
}

function searchTypeFocused()
{
    console.log("searchTypeFocused", Math.random());
    search_type_select.selectedIndex = -1;
}

function selectAllMonths()
{
    for (let i = 1; i < month_select.length; i++)
    {
        let option = month_select[i];
        selectOption(option);
    }
}

function selectAllDays()
{
    for (let i = 1; i < day_select.length; i++)
    {
        let option = day_select[i];
        selectOption(option);
    }
}

function selectAllSeries()
{
    //dont_draw = true;
    g_selected_series_list.length = 0;
    series_to_load_list.length = 0;
    var state_abbreviation = state_select.value;
    var state = state_map[state_abbreviation];

    for (var i = 0; i < series_select.length; i++)
    {
        var station_option = series_select[i];

        let selected_series = undefined;

        if (usingUserData())
        {
            selected_series = g_user_series_list[i];
        }
        else
        {
            selected_series = state.station(station_option.value);

            if (selected_series === null)
            {
                selected_series = state.getStationFromName(station_option.value);
            }
        }

        if (selected_series === null)
        {
            console.log("selectAllSeries selected_series === null", station_option.value);
            continue;
        }

        console.log("selectAllSeries", station_option.value, station_option.style.fontSize);
    
        if (station_option.value != "ANNUAL" && station_option.value != "ALL")
        {
            selectOption(station_option);
            g_selected_series_list.push(selected_series);

            if (getPositionBuffer(selected_series) == null)
            {
                series_to_load_list.push(selected_series);
                console.log("selectAllSeries() added ", selected_series.name, " to series_to_load_list");
            }
        }
        else
        {
            deselectOption(station_option);
            // station_option.style.backgroundColor = unselected_option_background_color;
        }
    }

    multipleStationsSelected();
}

function unSelectAllStations()
{
    g_selected_series_list.length = 0;
    var state_abbreviation = state_select.value;
    var state = state_map[state_abbreviation];

    for (var i = 0; i < series_select.length; i++)
    {
        var station_option = series_select[i];
        deselectOption(station_option);
        // station_option.style.backgroundColor = unselected_option_background_color;
        g_selected_series_list.push(state.station(station_option.value));
    }
}

function multipleStationsSelected()
{
    number_of_multiple_data_files_to_load = series_to_load_list.length;
    console.log(`multipleStationsSelected number_of_multiple_data_files_to_load ${number_of_multiple_data_files_to_load}`);

    if (series_to_load_list.length == 0)
    {
        g_dont_draw = false;
        // all_data_files_loaded = true;
        multipleDataFilesLoaded();
        resetZoom();
        prepareToDrawAfterDataLoaded();
        return;
    }

    var state_abbreviation = state_select.value;
    var type_string = typeString();

    try
    {
        number_of_multiple_data_files_loaded = 0;
        // showLoading();

        for (var i = 0; i < series_to_load_list.length; i++)
        {
            var station = g_selected_series_list[i];
            var data_file_path = "data/" + country_select.value + "/" + type_string + "/" + state_abbreviation + "/" + station.id + ".csv";
            console.log("multipleStationsSelected calling loadTextFile", i, data_file_path);
            
            loadTextFile(data_file_path, multipleDataFilesLoaded);
        }
    }
    catch
    {
        var pause_here = true;
    }
}

function optionIsSelected(option)
{
    return    option.style.backgroundColor == selected_option_background_color 
           || option.style.fontSize == selected_option_font_size;
}

function deselectOption(option)
{
    // console.log("deselectOption", arguments.callee.name);
    option.style.backgroundColor = unselected_option_background_color;
    option.style.fontSize = unselected_option_font_size;
}

function selectOption(option)
{
    // console.log("selectOption", option.text, "CONTROL KEY", ctrl_key_down ? "DOWN" : "UP");
    option.style.backgroundColor = selected_option_background_color;
    option.style.fontSize = selected_option_font_size;
}

function seriesSelectBlurred(event)
{
    // console.log("seriesSelectBlurred");
}

function seriesSelectButtonClicked(event)
{
    console.log("seriesSelectButtonClicked()");
    series_select.focus();
    series_select.click();
}



function monthSelectClicked(event)
{
    console.log("monthSelectClicked", month_select.value, month_select.selectedIndex, event);

    if (month_select.selectedIndex >= 0)
    {
        monthChanged(event);
    }

    // month_select.selectedIndex = -1;
    // console.log("monthSelectClicked set month_select.selectedIndex to -1");
}

function seriesSelectClicked(event)
{
    console.log("seriesSelectClicked", series_select.value, series_select.selectedIndex, event);

    if (series_select.selectedIndex >= 0)
    {
        stationChanged(event);

        if (show_all_series)
        {
            name_label.innerHTML = series_select.value;
        }
    }

    // series_select.selectedIndex = -1;
}

function createSelectedMonthList()
{
    console.log("createSelectedMonthList");
    selected_month_list.length = 0;

    for (let i = 0; i < month_select.length; i++)
    {
        let option = month_select[i];

        if (optionIsSelected(option))
        {
            selected_month_list.push(parseInt(option.value));
        }
    }
}

function createSelectedDayList()
{
    selected_day_list.length = 0;

    for (let i = 0; i < day_select.length; i++)
    {
        let option = day_select[i];

        if (optionIsSelected(option))
        {
            selected_day_list.push(parseInt(option.value));
        }
    }
}

function getCurrentlyHighlightedSeries()
{
    return g_series_to_highlight;

    console.log("getCurrentlyHighlightedSeries series_select.selectedIndex", series_select.selectedIndex);
    if (series_select.selectedIndex < 0)
    {
        console.log("getCurrentlyHighlightedSeries series_select.selectedIndex < 0", series_select.selectedIndex);
        return;
    }

    if (usingUserData())
    {
        return g_user_series_list[series_select.selectedIndex];
    }
    else
    {
        let state_abbreviation = state_select.value;
        let state = state_map[state_abbreviation];
        let station = state.getStationFromName(series_select[series_select.selectedIndex].value);

        if (station === null)
        {
            // This is a hack.  Sometimes the station select option value is the name, and sometimes it is the ID
            console.log("getCurrentlyHighlightedSeries hack");
            station = state.station(series_select[series_select.selectedIndex].value);
        }

        return station;
    }
}

function setHighlightedSeries(series)
{
    if (series === undefined)
    {
        return;
    }

    console.log("setHighlightedSeries", series);

    g_series_to_highlight = series;

    if (series === null)
    {
        return;
    }

    let highlighted_series_marker = findGoogleMapMarkerByCoordinates(g_google_map_marker_list, series.latitude, series.longitude)
    updateGoogleMapMarkerColors(g_google_map_marker_list, highlighted_series_marker);
}

function unselectOptionByName(name)
{
    for (let i = 0; i < series_select.length; i++)
    {
        let series_option = series_select[i];
        
        if (containsCaseInsensitiveSubstring(series_option.innerHTML, name))
        {
            deselectOption(series_option);
        }
    }
}

function unselectAllSeries()
{
    for (let i = 0; i < series_select.length; i++)
    {
        let series_option = series_select[i];
        deselectOption(series_option);
    }
}

function createSelectedSeriesList()
{
    g_selected_series_list.length = 0;
    let state_abbreviation = state_select.value;
    let state = state_map[state_abbreviation];
    let last_selected_index = -1;


    if (show_all_series)
    {
        let highlighted_series = getCurrentlyHighlightedSeries();
        setHighlightedSeries(highlighted_series);
        selectAll();
    }

    for (let i = 0; i < series_select.length; i++)
    {
        let series_option = series_select[i];
        let series = g_option_series_map.get(series_option);

        if (optionIsSelected(series_option))
        {
            if (usingUserData() || series.series_type == GENERIC_SERIES_TYPE || series.series_type == HYBRID_SERIES_TYPE)
            {
                // let selected_series = g_user_series_list[i];
                // console.log(`createSelectedSeriesList usingUserData ${series_option.value} ${selected_series}`);
                g_selected_series_list.push(series);
            }
            else
            {
                let selected_series = state.station(series_option.value);

                if (selected_series === null)
                {
                    console.log(`createSelectedSeriesList null i ${i} series_option.value ${series_option.value}`);
                }

                // console.log(`createSelectedSeriesList ${series_option.value} ${selected_series}`);
                g_selected_series_list.push(selected_series);
            }

            last_selected_index = i;
        }
    }

    if (g_selected_series_list.length > 1)
    {
        series_select_passthrough_button.innerHTML = "Station " + DOWN_ARROW_HAT;
    }
    else if (last_selected_index >= 0)
    {
        series_select_passthrough_button.innerHTML = series_select[last_selected_index].innerHTML + " " + DOWN_ARROW_HAT;
    }

    // console.log("selected_series_list", selected_series_list);
}

function selectChanged(select)
{
    console.log("selectChanged ctrl_key_down", ctrl_key_down);
    var number_selected = 0;
    let currently_highlighted_series = g_series_to_highlight;

    for (var i = 0; i < select.length; i++)
    {
        var option = select[i];

        if (optionIsSelected(option))
        {
            number_selected++;
        }
    }

    for (let i = 0; i < select.length; i++)
    {
        let option = select[i];

        if (controlKeyDown())
        {
            if (i == select.selectedIndex)
            {
                if (optionIsSelected(option))
                {
                    if (number_selected > 1)
                    {
                        deselectOption(option);
                    }
                }
                else
                {
                    selectOption(option);
                }
            }
        }
        else if (shift_key_down)
        {
            if (i == select.selectedIndex)
            {
                // Find the previous selected index
                let previously_selected_index = 0;

                for (let j = i - 1; j >= 0; j--)
                {
                    if (optionIsSelected(select[j]))
                    {
                        previously_selected_index = j;
                    }
                }

                for (let j = previously_selected_index; j <= i; j++)
                {
                    selectOption(select[j]);
                }
            }
        }
        else
        {
            // console.log("selectChanged control key up");
            if (i == select.selectedIndex)
            {
                selectOption(option);
            }
            else
            {
                let series = g_option_series_map.get(option);
                
                let force_deselect = series == null || caseInsensitiveStringContains(series.name, "annual average");

                if (currently_highlighted_series !== series && (!g_dont_deselect_anything || force_deselect))
                {
                    deselectOption(option);
                }
            }
        }
    }
}

function stationChanged(event)
{
    var first_selected = null;
    var currently_selected_name = series_select.value;
    g_selected_series_list.length = 0;

    setGraphingMode(GRAPHING_MODE_TIME_SERIES);


    // console.log("ctrl_key_down", ctrl_key_down);

    if (usingUserData())
    {
        use_whole_year_labels = false;
    }
    else
    {
        setUnitsLabelString();
        setAverageValueLabelString();
    
        if (currently_selected_name == "ANNUAL" || currently_selected_name.includes("FFT"))
        {
            use_whole_year_labels = true;
        }
        else
        {
            use_whole_year_labels = false;
        }
    
        if (currently_selected_name == "ALL")
        {
            selectAllSeries(); 
            series_select_passthrough_button.innerHTML = "Station " + DOWN_ARROW_HAT;
            return;
        }

        console.log($("#series_select").val());
        var state_abbreviation = state_select.value;
        var type_string = typeString();
    
        var data_file_path = "data/" + country_select.value + "/" + type_string + "/" + state_abbreviation + "/" + currently_selected_name + ".csv";
    
        // console.log(currently_selected_name);
        // var state = state_map[state_abbreviation];
        // selected_series = state.station(currently_selected_name);
        selected_series = g_option_series_map.get(series_select[series_select.selectedIndex]);
        console.log("stationChanged g_option_series_map", g_option_series_map);
    }

    selectChanged(series_select);
    createSelectedSeriesList();

    // series_select.blur();
    // console.log("-------------", currently_selected_name, state, selected_series, data_file_path, "selected_series_list", selected_series_list);

    let statistics_updated = false;

    if (usingUserData())
    {
        prepareToDrawAfterDataLoaded();
        new_user_data = false;
    }
    else
    {
        if (g_selected_series_list.length > 0)
        {
            var first_station = g_selected_series_list[0];
            setStationInformationLabel(first_station);
        }

        if (selected_series === null || selected_series === undefined)
        {
            console.log("stationChanged bad selected_series");
            return;
        }

        let position_buffer = getPositionBuffer(selected_series);
        let index_buffer = getIndexBuffer(selected_series);
    
        if (position_buffer === null || position_buffer === undefined)
        {
            position_buffer = gl.createBuffer();
            index_buffer = gl.createBuffer();
            setPositionBuffer(selected_series, position_buffer);
            setIndexBuffer(selected_series, index_buffer);
            console.log("stationChanged calling loadTextFile", data_file_path);
            g_all_data_files_loaded = false;
            loadTextFile(data_file_path, dataFileLoaded);
        }
        else
        {
            prepareToDrawAfterDataLoaded();
            statistics_updated = true;
        }
    }

    document.dispatchEvent(draw_scene_event);

    if (!statistics_updated)
    {
        console.log("calling updateStatistics() from stationChanged()");
        updateStatistics();
    }
    // drawGraph();
}

function getPositionBuffer(series)
{
    if (series.series_type == HYBRID_SERIES_TYPE || series.series_type == GENERIC_SERIES_TYPE)
    {
        return series.position_buffer;
    }
    else
    {
        return series.position_buffer[type_select.value];
    }
}

function getIndexBuffer(series)
{
    if (series.series_type == HYBRID_SERIES_TYPE || series.series_type == GENERIC_SERIES_TYPE)
    {
        return series.index_buffer;
    }
    else
    {
        return series.index_buffer[type_select.value];
    }
}

function setPositionBuffer(series, position_buffer)
{
    if (series.series_type == HYBRID_SERIES_TYPE || series.series_type == GENERIC_SERIES_TYPE)
    {
        series.position_buffer = position_buffer;
    }
    else
    {
        series.position_buffer[type_select.value] = position_buffer;
    }
}

function setIndexBuffer(series, index_buffer)
{
    if (series.series_type == HYBRID_SERIES_TYPE || series.series_type == GENERIC_SERIES_TYPE)
    {
        series.index_buffer = index_buffer;
    }
    else
    {
        series.index_buffer[type_select.value] = index_buffer;
    }
}

function getPositionIndexBuffers(series)
{
    let position_buffer = null;
    let index_buffer = null;

    if (series.series_type == HYBRID_SERIES_TYPE || series.series_type == GENERIC_SERIES_TYPE)
    {
        position_buffer = series.position_buffer;
        index_buffer = series.index_buffer;
    }
    else
    {
        position_buffer = series.position_buffer[type_select.value];
        index_buffer = series.index_buffer[type_select.value];
    }

    return position_buffer, index_buffer;
}


function setPositionIndexBuffers(series, position_buffer, index_buffer)
{
    if (series.series_type == HYBRID_SERIES_TYPE || series.series_type == GENERIC_SERIES_TYPE)
    {
        series.position_buffer = position_buffer;
        series.index_buffer = index_buffer;
    }
    else
    {
        series.position_buffer[type_select.value] = position_buffer;
        series.index_buffer[type_select.value] = index_buffer;
    }
}

function getPositionIndexArrays(series)
{
    let position_array = null;
    let index_array = null;

    if (series.series_type == HYBRID_SERIES_TYPE || series.series_type == GENERIC_SERIES_TYPE)
    {
        position_array = series.graph_positions;
        index_array = series.graph_indices;
    }
    else
    {
        position_array = series.graph_positions[type_select.value];
        index_array = series.graph_indices[type_select.value];
    }

    return [position_array, index_array];
}

function getPositionArray(series)
{
    if (series.series_type == HYBRID_SERIES_TYPE || series.series_type == GENERIC_SERIES_TYPE)
    {
        return series.graph_positions;
    }
    else
    {
        return series.graph_positions[type_select.value];
    }
}

function getIndexArray(series)
{
    if (series.series_type == HYBRID_SERIES_TYPE || series.series_type == GENERIC_SERIES_TYPE)
    {
        return series.graph_indices;
    }
    else
    {
        return series.graph_indices[type_select.value];
    }
}


function setStationInformationLabel(station)
{
    if (station === null || station === undefined)
    {
        console.log("setStationInformationLabel bad station");
        return;
    }

    if (usingUserData())
    {
        let file_name_string_length = Math.min(user_file_name.length, 40);
        let state_name = stateNameFromUserFileName(user_file_name);

        station_information_input.value = station.name;

        if (station.country !== null)
        {
            station_information_input.value += ", " + state_name + ", " + station.country;
        }

        station_information_input.value += " " + station.id;


        if (station.latitude !== null && 
            station.longitude !== null && station.elevation !== null)
        {
            station_information_input.value += "   lat/lon: " + station.latitude;
            station_information_input.value += " " + station.longitude;
            station_information_input.value += "   elev: " + station.elevation + " m";
        }

        station_information_input.value += " " + user_file_name.substring(0, file_name_string_length);
        return;
    }

    station_information_input.value = NOAA_DAILY_TEMPERATURES_URL;
    station_information_input.value += station.id + ".dly";
    station_information_input.value += "   name: " + station.name;
    station_information_input.value += "   lat/lon: " + station.latitude;
    station_information_input.value += " " + station.longitude;
    station_information_input.value += "   elev: " + station.elevation + " "; 
}

function stateNameFromUserFileName(file_name)
{
    for (let i = 0; i < GraphingUtilities.state_names.length; i++)
    {
        let state_name = GraphingUtilities.state_names[i];

        if (file_name.includes(state_name))
        {
            return state_name;
        }
    }

    return "";
}

function typeString()
{
    var type = type_select.value;
    var type_string = type == TMAX ? "tmax" : type == TMIN ? "tmin" : type == PRCP ? "prcp" : "snow";
    return type_string;
}

async function copyToClipboard()
{
    var text_string = x_label.innerHTML + " " + y_label.innerHTML + " " + name_label.innerHTML + " " + state_label.innerHTML + "\n";
    text_string += dataSourceString() + "\n";
    text_string += webUrlString() + "\n";

    var clipboard_object = navigator.clipboard;

    if (clipboard_object && window.isSecureContext)
    {
        return clipboard_object.writeText(text_string).then(copyToClipboardSucceeded).catch(copyToClipboardFailed);
    }
    else
    {
        temporary_text_area = document.createElement("textarea");
        temporary_text_area.value = text_string;
        // make the temporary_text_area out of viewport
        temporary_text_area.style.position = "fixed";
        temporary_text_area.style.left = "-999999px";
        temporary_text_area.style.top = "-999999px";
        document.body.appendChild(temporary_text_area);
        temporary_text_area.focus();
        temporary_text_area.select();
        let copy_to_clipboard_promise = new Promise(copyToClipboardResolution);
        copy_to_clipboard_promise.then(copyToClipboardSucceeded).catch(copyToClipboardFailed);
    } 
}

function copyToClipboardResolution(resolve, fail)
{
    document.execCommand('copy') ? resolve() : fail();
    temporary_text_area.remove();
}

function copyToClipboardSucceeded()
{
    // console.log("copyToClipboardSucceeded");
}

function copyToClipboardFailed()
{
    console.log("copyToClipboardFailed");
}

function webUrlString()
{
    return "http://realclimatetools.com/apps/graphing/" + buildUrl();
}

function dataSourceString()
{
    return NOAA_DAILY_TEMPERATURES_URL + series_select.value + ".dly";
}

function parseURL(settings)
{
    if (getQueryParameterByName("offset_x") !== "") 
    {
        settings.offset_x = parseFloat(getQueryParameterByName("offset_x"));
    }
    if (getQueryParameterByName("offset_y") !== "") 
    {
        settings.offset_y = parseFloat(getQueryParameterByName("offset_y"));
    }
    if (getQueryParameterByName("scale_x") !== "") 
    {
        settings.scale_x = parseFloat(getQueryParameterByName("scale_x"));
    }
    if (getQueryParameterByName("scale_y") !== "") 
    {
        settings.scale_y = parseFloat(getQueryParameterByName("scale_y"));
    }
    if (getQueryParameterByName("country") !== "") 
    {
        settings.country = getQueryParameterByName("country");
    }
    if (getQueryParameterByName("state") !== "") 
    {
        settings.state = getQueryParameterByName("state");
    }
    if (getQueryParameterByName("type") !== "") 
    {
        settings.type = getQueryParameterByName("type");
    }
    if (getQueryParameterByName("month") !== "") 
    {
        settings.month = parseInt(getQueryParameterByName("month"));
    }
    if (getQueryParameterByName("day") !== "") 
    {
        settings.day = parseInt(getQueryParameterByName("day"));
    }
    if (getQueryParameterByName("units") !== "") 
    {
        settings.units = getQueryParameterByName("units");
    }
}

// function openSettings()
// {
//     let newWin = window.open("https://www.amazon.com/", "hello", "width=500,height=500,left=200,top=300");

//     // newWin.document.write("<script>window.opener.document.body.innerHTML = 'Test'<\/script>");
// }


function aiQuery()
{
    console.log("aiQuery");
}

  
  // Example usage
  // cancelStripeSubscription('sub_1234567890')
  //   .then(result => console.log(result))
  //   .catch(error => console.error(error));

function getSeriesStartEndDates(series)
{
    let graph_positions = getPositionArray(series);

    if (graph_positions === undefined)
    {
        return [undefined, undefined];
    }

    let start_index = 0;
    let start = graph_positions[start_index];

    while (isNaN(start) && start_index < graph_positions.length)
    {
        start_index += 2;
        start = graph_positions[start_index];
    }

    if (start_index >= length)
    {
        return [undefined, undefined];
    }
    
    let end_index = graph_positions.length - 2;
    let end = graph_positions[end_index];

    while (isNaN(end) && start_index >= 0)
    {
        end_index -= 2;
        end = graph_positions[end_index];
    }

    if (end_index <= 0)
    {
        return [undefined, undefined];
    }
    

    return [start, end];
}

