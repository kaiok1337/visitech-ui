var NO_BUTTON = "NO_BUTTON";
var BUTTON_0 = "BUTTON_0";
var BUTTON_1= "BUTTON_1";
var BUTTON_2 = "BUTTON_2";
var BUTTON_NAMES = [BUTTON_0, BUTTON_1, BUTTON_2, NO_BUTTON];

var dont_change_min_max = false;
var border_color = [0.0, 0.3, 0.3, 1.0];
var outer_border_color = [1.0, 0.0, 0.0, 1.0];
var x_y_label;
var x_y_label_color = [255, 255, 0, 255];
var x_y_label_background_color = [0, 0, 0, 0.3];
var g_x_grid_labels = [];
var g_y_grid_labels = [];
var grid_labels = [];

var g_google_map = undefined;
var google_map_container;
var google_map_marker;
var g_google_map_marker_list = [];

var chat_outer_container;

graphing_program_initialized = false;

var g_visitech_chatbot_id = "";
var g_new_user_data_loaded = false;
var g_statistics_updated = false;
var g_table_prompt_data = null;
var g_json_response = [];

const CHATBOT_API_URL = 'https://d2t-compute.com:8005';  


class GraphingUtilities 
{
    static NUMBER_OF_MONTHS = 12;
    static month_day_count_list = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    static leap_year_month_day_count_list = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    static month_day_lookup_table = [0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
    ];
    
    static leap_year_month_day_lookup_table = [0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
    ];
    
    static day_of_month_lookup_table = [0,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ];
    
    static leap_year_day_of_month_lookup_table = [0,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ];

    static state_abbreviations = [
        "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "ID",
        "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI",
        "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",
        "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
        "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "AB", "BC",
        "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK",
        "YT",
        "NOSTATE"    
    ];

    static state_names = [
        "Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
        "Delaware", "Florida", "Georgia", "Idaho", "Illinois", "Indiana",
        "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
        "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
        "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland", "Nova Scotia",
        "Northwest Territories", "Nunavat", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
        "Yukon"
    ];

    static month_list = 
    [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    static month_name_map = 
    {
        "January" : "JAN",
        "February" : "FEB",
        "March" : "MAR",
        "April" : "APR",
        "May" : "MAY",
        "June" : "JUN",
        "July" : "JUL",
        "August" : "AUG",
        "September" : "SEP",
        "October" : "OCT",
        "November" : "NOV",
        "December" : "DEC"
    };

    static monthAbbreviation(month)
    {
        if (month == 0)
        {
            return "ALL";
        }
        
        var month_name = this.month_list[month - 1];
        return this.month_name_map[month_name];
    }

    static monthList()
    {
        return this.month_list;
    }

    static stateID(state_abbreviation)
    {
        var i = 0;

        do
        {
            if (state_abbreviation == this.state_abbreviations[i])
            {
                return i + 1;
            }

            i++;
        } while (this.state_abbreviations[i] != "NOSTATE");
    
        return -1;
    }

    static stateName(state_abbreviation)
    {
        if (state_abbreviation = "  ")
        {
            return state_abbreviation;
        }

        var state_id = this.stateID(state_abbreviation) - 1;
        return this.state_names[state_id];
    }
    
    static month(date)
    {
        var year = parseInt(date);
        var day_of_year = this.dayOfYear(date);
        var leap_year = this.leapYear(year);
    
        if (leap_year)
        {
            return this.leap_year_month_day_lookup_table[day_of_year];
        }
        else
        {
            return this.month_day_lookup_table[day_of_year];
        }
    }
    

    static leapYear(year)
    {
        if ( (year % 400) == 0 )
        {
            return true;
        }
        if ( (year % 100) == 0 )
        {
            return false;
        }
        if ( (year % 4) == 0 )
        {
    
            return true;
        }
    
        return false;    
    }

    static dayOfYear(date)
    {
        if (typeof date == "string")
        {
            var decimal_date= this.convertDateToDecimal(date);
            var day_of_year = this.dayOfYear(decimal_date);
            return day_of_year;
        }

        var year = parseInt(date);
        var fraction = date - parseFloat(year);


        if (this.leapYear(year))
        {
            if (fraction > 365 / 366)
            {
                return 366;
            }

            return parseInt(Math.round(366.0 * fraction) + 1.0);
        }

        if (fraction > 364 / 365)
        {
            return 365;
        }

        return parseInt(Math.round(365.0 * fraction) + 1.0);
    }



    static dateString(date)
    {
        if (!isFinite(date))
        {
            return "";
        }

        try 
        {
            var date_string = "";

            if (use_whole_year_labels)
            {
                date_string = Math.round(date).toString();
            }
            else
            {
                var month;
                var day;
                var year;
                var month_name = "";
        
                [month_name, month, day, year] = this.monthDayYear(date);
        
                if (year == 0)
                {
                    date_string = month.toString() + "/" + day.toString();
                }
                else
                {
                    date_string = month.toString() + "/" + day.toString() + "/" + year.toString();
                }
            }
 
            return date_string;
        }
        catch (error)
        {
            return "";
        }
    }

    static monthDayYear(date)
    {
        var day_of_year = this.dayOfYear(date);
        var year = parseInt(date);
        var leap_year = this.leapYear(year);
        var month_name = ""
        var month = 0;
        var day = 0;

        if (leap_year)
        {
            month = this.leap_year_month_day_lookup_table[day_of_year];
            day = this.leap_year_day_of_month_lookup_table[day_of_year];
        }
        else
        {
            month = this.month_day_lookup_table[day_of_year];
            day = this.day_of_month_lookup_table[day_of_year];
        }
    
        if (month >= 1 && month <= 12)
        {
            month_name = this.month_list[month - 1];
        }
        else
        {
            month_name = "";
        }
    
        return [month_name, month, day, year];
    }


    static convertDateToDecimal(date_string)
    {
        var delimiter = "/"

        if (date_string.includes("-"))
        {
            delimiter = "-";
        }
        else if (!date_string.includes("/"))
        {
            return -1;
        }

        var month_day_year = date_string.split(delimiter);
        var month = parseInt(month_day_year[0]);
        var day = parseInt(month_day_year[1]);

        var year = 0;
        
        if (month_day_year.length == 3)
        {
            year = parseInt(month_day_year[2]);
        }

        return this.convertMonthDayYearToDecimal(month, day, year);
    }

    static convertMonthDayYearToDecimal(month, day, year)
    {
        var leap_year = this.leapYear(year);
        var number_of_days = 365;
        var day_count = -1;
        var number_of_days_per_month = this.month_day_count_list;
    
        if (leap_year)
        {
            number_of_days_per_month = this.leap_year_month_day_count_list;
            number_of_days = 366;
        }
    
        for (var month_number = 1; month_number <= this.NUMBER_OF_MONTHS; month_number++)
        {
            if (month_number < month)
            {
                day_count += number_of_days_per_month[month_number- 1];
            }
            else
            {
                day_count += parseInt(day);
                break;
            }
        }
    
        return year + (day_count / number_of_days);
    }

    static convertDayOfYearToDecimal(day, year)
    {
        var number_of_days = this.leapYear(year) ? 366 : 365;
        var date = parseFloat(year) + (parseFloat(day - 1) / parseFloat(number_of_days));
        return date;
    }

    static previousMonthDayYearString(current_date_string)
    {
        var month_day_year = current_date_string.split("/");
        var month = parseInt(month_day_year[0]);
        var day = parseInt(month_day_year[1]);
        var year = parseInt(month_day_year[2]);
        var previous_date_string = "";

        if (day > 1)
        {
            day--;
            previous_date_string = month.toString() + "/" + day.toString() + "/" + year.toString();
            return previous_date_string;
        }
    
        if (month == 1)
        {
            year--;
            month = 12;
            day = 31;
            previous_date_string = month.toString() + "/" + day.toString() + "/" + year.toString();
            return previous_date_string;
        }
    
        month--;

        if (this.leapYear(year))
        {
            day = this.leap_year_month_day_count_list[month - 1];
        }
        else
        {
            day = this.month_day_count_list[month - 1];
        }
    
        previous_date_string = month.toString() + "/" + day.toString() + "/" + year.toString();    
        return previous_date_string;
    }
 
    static nextMonthDayYearString(current_date_string)
    {
        var month_day_year = current_date_string.split("/");
        var month = parseInt(month_day_year[0]);
        var day = parseInt(month_day_year[1]);
        var year = parseInt(month_day_year[2]);
        var next_date_string = "";

        var day_count_list = this.leapYear(year) ? this.leap_year_month_day_count_list : this.month_day_count_list;
        var last_day_of_month = day == day_count_list[month - 1];

        if (!last_day_of_month)
        {
            day++;
            next_date_string =  month.toString() + "/" + day.toString() + "/" + year.toString();
            return next_date_string;
        }
    
        if (month == 12)
        {
            year++;
            month = 1;
            day = 1;
            next_date_string =  month.toString() + "/" + day.toString() + "/" + year.toString();
            return next_date_string;
        }
    
        month++;
        day = 1;
        next_date_string =  month.toString() + "/" + day.toString() + "/" + year.toString();
        return next_date_string;
    }

    static rgbaStringFromArray(color)
    {
        var return_string = 
        "rgba(" + 
        color[0].toString() + ", " + 
        color[1].toString() + ", " +  
        color[2].toString() + ", " + 
        color[3].toString() + ")";

        return return_string;
    }
    
}

class Mouse
{
    constructor()
    {
        this.reset();
    }

    reset()
    {
        this.pressed_button = "NO_BUTTON";
        // this.x = 0;
        // this.y = 0;
        this.pressed_x = 0;
        this.pressed_y = 0;
        this.previous_x = 0;
        this.previous_y = 0;
    }

    changeSinceLastMove()
    {
        return [this.x - this.previous_x, this.y - this.previous_y];
    }

    changeSinceButtonDown()
    {
        return [this.x - this.pressed_x, this.y - this.pressed_y];
    }

    // buttonName(button_number)
    // {
    //     if (button_number >= 0 && button_number < BUTTON_NAMES.length)
    //     {
    //         return BUTTON_NAMES[button_number];
    //     }

    //     return "NO_BUTTON";
    // }
}


class Vec2
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    set(x, y)
    {
        this.x = x;
        this.y = y;
    }

    static copy(a)
    {
        var result = new Vec2();
        result.x = a.x;
        result.y = a.y;
        return result;
    }

    static distance(a = 0, b = 0)
    {
        const delta_x = a.x - b.x;
        const delta_y = a.y - b.y;
        return Math.hypot(delta_x, delta_y);
    }

    static add(a, b)
    {
        return Vec2.sum(a, b);
    }

    static sum(a, b)
    {
        var result = new Vec2();
        result.x = a.x + b.x;
        result.y = a.y + b.y;
        return result;
    }

    static scalarSum(a, b)
    {
        var result = new Vec2();
        result.x = a.x + b;
        result.y = a.y + b;
        return result;
    }

    static subtract(a, b)
    {
        var result = new Vec2();
        result.x = a.x - b.x;
        result.y = a.y - b.y;
        return result;
    }

    static scalarSubtract(a, b)
    {
        var result = new Vec2();
        result.x = a.x - b;
        result.y = a.y - b;
        return result;
    }

    static multiply(a, b)
    {
        var result = new Vec2();
        result.x = a.x * b.x;
        result.y = a.y * b.y;
        return result;
    }

    static scalarMultiply(a, b)
    {
        var result = new Vec2();
        result.x = a.x * b;
        result.y = a.y * b;
        return result;
    }

    static divide(a, b)
    {
        var result = new Vec2();
        result.x = a.x / b.x;
        result.y = a.y / b.y;
        return result;
    }

    static scalarDivide(a, b)
    {
        var result = new Vec2();
        result.x = a.x / b;
        result.y = a.y / b;
        return result;
    }

    static equal(a, b)
    {
        if (a.x == b.x && a.y == b.y)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    static abs(a)
    {
        var result = new Vec2();
        result.x = Math.abs(a.x);
        result.y = Math.abs(a.y);
        return result;
    }
}

class Vec3
{
    constructor(x = 0, y = 0, z = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static copy(a)
    {
        var result = new Vec3();
        result.x = a.x;
        result.y = a.y;
        result.z = a.z;
        return result;
    }

    static add(a, b)
    {
        return Vec3.sum(a, b);
    }

    static sum(a, b)
    {
        var result = new Vec3();
        result.x = a.x + b.x;
        result.y = a.y + b.y;
        result.z = a.z + b.z;
        return result;
    }

    static subtract(a, b)
    {
        var result = new Vec3();
        result.x = a.x - b.x;
        result.y = a.y - b.y;
        result.z = a.z - b.z;
        return result;
    }

    static multiply(a, b)
    {
        var result = new Vec3();
        result.x = a.x * b.x;
        result.y = a.y * b.y;
        result.z = a.z * b.z;
        return result;
    }

    static scalarMultiply(a, b)
    {
        var result = new Vec3();
        result.x = a.x * b;
        result.y = a.y * b;
        result.z = a.z * b;
        return result;
    }

    static divide(a, b)
    {
        var result = new Vec3();
        result.x = a.x / b.x;
        result.y = a.y / b.y;
        result.z = a.z / b.z;
        return result;
    }

    static scalarDivide(a, b)
    {
        var result = new Vec3();
        result.x = a.x / b;
        result.y = a.y / b;
        result.z = a.z / b;
        return result;
    }

    static abs(a)
    {
        var result = new Vec3();
        result.x = Math.abs(a.x);
        result.y = Math.abs(a.y);
        result.z = Math.abs(a.z);
        return result;
    }
}

class Vec4
{
    constructor(x, y, z, w)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    static vec2(a)
    {
        var result = new Vec2();
        result.x = a.x;
        result.y = a.y;
        return result;
    }

    toArray()
    {
        return [this.x, this.y, this.z, this.w]
    }
}

class Matrix4x4
{
    constructor()
    {
        this.data = new Float32Array(16);
        this.identity();
    }

    static copy(a)
    {
        var result = new Matrix4x4();

        for (var i = 0; i < 16; i++)
        {
            result.data[i] = a.data[i];
        }

        return result;
    }

    value()
    {
        return this.data;
    }

    identity()
    {
        this.data[0] = 1;
        this.data[1] = 0;
        this.data[2] = 0;
        this.data[3] = 0;
        this.data[4] = 0;
        this.data[5] = 1;
        this.data[6] = 0;
        this.data[7] = 0;
        this.data[8] = 0;
        this.data[9] = 0;
        this.data[10] = 1;
        this.data[11] = 0;
        this.data[12] = 0;
        this.data[13] = 0;
        this.data[14] = 0;
        this.data[15] = 1;
    }

    translate(vector)
    {
        try
        {
            this.data[12] += (this.data[0] * vector.x) + (this.data[4] * vector.y);
            this.data[13] += (this.data[1] * vector.x) + (this.data[5] * vector.y);
            this.data[14] += (this.data[2] * vector.x) + (this.data[6] * vector.y);
            this.data[15] += (this.data[3] * vector.x) + (this.data[7] * vector.y);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    scale(vector)
    {
        try
        {
            this.data[0] *= vector.x;
            this.data[1] *= vector.x;
            this.data[2] *= vector.x;
            this.data[3] *= vector.x;
            this.data[4] *= vector.y;
            this.data[5] *= vector.y;
            this.data[6] *= vector.y;
            this.data[7] *= vector.y;
            this.data[8] *= vector.z;
            this.data[9] *= vector.z;
            this.data[10] *= vector.z;
            this.data[11] *= vector.z;
        }
        catch (error)
        {

        }
    }
}

let load_text_file_count = 0;

function loadTextFile(file_path, callback) 
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = callback;
    load_text_file_count++ 
    console.log("loadTextFile", load_text_file_count, file_path);
    xhttp.open("GET", file_path);
    xhttp.send();
}

// This is needed if the images are not on the same domain
// NOTE: The server providing the images must give CORS permissions
// in order to be able to use the image with WebGL. Most sites
// do NOT give permission.
// See: https://webglfundamentals.org/webgl/lessons/webgl-cors-permission.html
function requestCORSIfNotSameOrigin(image, url) 
{
    if ((new URL(url, window.location.href)).origin !== window.location.origin) 
    {
        image.crossOrigin = "";
    }
}

function drawRectangle(viewport, corners, color_handle, color, raw_coordinates_handle)
{
    // console.log("drawRectangle", "corners", corners);
    var vertex_positions = 
    [
        corners[0].x, corners[0].y, 
        corners[1].x, corners[0].y, 
        corners[0].x, corners[1].y,
        corners[0].x, corners[1].y,
        corners[1].x, corners[0].y,
        corners[1].x, corners[1].y, 
    ];

    var rectangle_position_array = new Float32Array(vertex_positions);
    var rectangle_position_buffer = gl.createBuffer();

    gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangle_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, rectangle_position_array, gl.STATIC_DRAW);

    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const data_offset = 0;

    gl.vertexAttribPointer(
        raw_coordinates_handle,
        numComponents,
        type,
        normalize,
        stride,
        data_offset);

    gl.enableVertexAttribArray(raw_coordinates_handle);

    gl.uniform4fv(color_handle, color);

    const buffer_offset = 0;
    const vertex_count = vertex_positions.length / 2;

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffers.position);
    gl.drawArrays(gl.TRIANGLES, buffer_offset, vertex_count);
    gl.disable(gl.BLEND);
    gl.deleteBuffer(rectangle_position_buffer);
    gl.enable(gl.DEPTH_TEST);
}

function drawRectangles(viewport, vertex_positions, color_handle, colors, raw_coordinates_handle)
{
    for (i = 0; i < vertex_positions.length; i+=12)
    {
        let corners = [];

        corners.push(new Vec2(vertex_positions[i], vertex_positions[i+1]));
        corners.push(new Vec2(vertex_positions[i+10], vertex_positions[i+11]));

        let index = i / 12;

        drawRectangle(viewport, corners, color_handle, colors[index], raw_coordinates_handle);
    }
}

function loadImageFile(url, callback)
{
    var image = new Image();
    requestCORSIfNotSameOrigin(image, url);
    image.src = url;
    image.onload = callback;
    return image;
}

function createEmptyTexture()
{
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    return texture;
}

function createTextureFromImage(image)
{
    var texture = createEmptyTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
}

function splitIntoLines(text)
{
    return text.split(/\r\n|\n/);
}

function getNextSmallestPowerOf2(size)
{
    for (let i = 1; i < 32; i++)
    {
        if (2**i < size && 2**(i+1) > size)
        {
            return 2**i;
        }
    }

    return 0;
}

function updateUrl() 
{
    var url = buildUrl();
    window.history.pushState({}, "", url);
}

function screenshot()
{
    var ui_container = document.getElementById("ui_container");
    html2canvas(ui_container).then(screenshotHandler);
}


function copyCanvasToClipboard(blob)
{
    var clipboard_object = navigator.clipboard;

    if (clipboard_object && window.isSecureContext)
    {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]); 
    }
    else
    {
        // TODO handle the copy
    }
}

function downloadImage(url, fileName) 
{
    fetch(url)
      .then(response => response.blob())
      .then(blob => 
    {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    })
      .catch(error => 
    {
        console.error('Error downloading image:', error);
    });

    // // Usage example
    // const image_url = 'https://example.com/image.jpg';
    // const fileName = 'downloaded-image.jpg';
    // downloadImage(image_url, fileName);
  }
  
function downloadURI(uri, name) 
{
    var link = document.createElement("a");
    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

function getQueryParameterByName(name) 
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);

    if (results === null) 
    {
        return "";
    } 
    else 
    {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}


function fToC(temperature_f)
{
    var temperature_c = (temperature_f - 32) / 1.8;
    return temperature_c;
}

function inchesToMM(length_in)
{
    var length_mm = length_in * 25.4;
    return length_mm;
}

function cToF(temperature_c)
{
    var temperature_f = (temperature_c * 1.8) + 32;
    return temperature_f;
}

function linearRegression(x_y_array)
{
    var x_sum = 0.0;
    var y_sum = 0.0;
    var x_average = 0.0;
    var y_average = 0.0;
    var length = x_y_array.length;

    let data_type = typeof x_y_array[0];

    if (data_type == "number")
    {
        length /= 2;
    }

    if (length == 0)
    {
        return;
    }

    for (var index = 0; index < length; index++)
    {
        let x_value = undefined;
        let y_value = undefined;

        if (data_type == "number")
        {
            let array_index = index * 2;
            x_value = x_y_array[array_index];
            y_value = x_y_array[array_index + 1];
            // x_sum += x_y_array[array_index];
            // y_sum += x_y_array[array_index + 1];
        }
        else
        {
            x_value = x_y_array[index].x;
            y_value = x_y_array[index].y;
            // x_sum += x_y_array[index].x;
            // y_sum += x_y_array[index].y;
        }

        if (x_value === undefined || isNaN(x_value) || y_value === undefined || isNaN(y_value))
        {
            continue;
        }

        x_sum += x_value;
        y_sum += y_value;
    }


    x_average = x_sum / length;
    y_average = y_sum / length;

    var v1 = 0.0;
    var v2 = 0.0;

    for (var index = 0; index < length; index++)
    {
        let x_value = undefined;
        let y_value = undefined;

        if (data_type == "number")
        {
            let array_index = index * 2;
            x_value = x_y_array[array_index];
            y_value = x_y_array[array_index + 1];
            // v1 += (x_y_array[array_index] - x_average) * (x_y_array[array_index + 1] - y_average);
            // v2 += Math.pow(x_y_array[array_index]- x_average, 2);
        }
        else
        {
            x_value = x_y_array[index].x;
            y_value = x_y_array[index].y;
            // v1 += (x_y_array[index].x - x_average) * (x_y_array[index].y - y_average);
            // v2 += Math.pow(x_y_array[index].x- x_average, 2);
        }
        if (x_value === undefined || isNaN(x_value) || y_value === undefined || isNaN(y_value))
        {
            continue;
        }

        v1 += (x_value - x_average) * (y_value - y_average);
        v2 += Math.pow(x_value - x_average, 2);
    }


    if (v2 == 0.0)
    {
        return[0, 0, 0, 0];
    }

    var a = v1 / v2;
    var b = y_average - (a * x_average);
    return [a, b, y_average, y_sum];
}

function sortMapToArray(map, compare_function) 
{
    // Convert the Map to an array of [key, value] pairs
    let sorted_array = Array.from(map.entries());
  
    // Sort the array
    sorted_array.sort(compare_function);
  
    // Create a new Map from the sorted array
    return [new Map(sorted_array), sorted_array];
}

function withinTolerance(tolerance, value_0, value_1, range = 1)
{
    // console.log("withinTolerance", tolerance, value_0, value_1, range);

    let difference = Math.abs(value_1 - value_0);

    if (difference / range <= tolerance)
    {
        return true;
    }

    return false;
}

function pointIsInsideRectangle(point, corners)
{
    let inside_rectangle = new Vec2();

    inside_rectangle.x = point.x >= corners[0].x && point.x <= corners[1].x;
    inside_rectangle.y = point.y >= corners[0].y && point.y <= corners[1].y;
    
    return inside_rectangle;
}

function pointIsOnScreen(viewport, point, scale_value, offset_value, minimum_value, maximum_value)
{
    if (doNormalize())
    {
        // return true;
    }

    var corners = screenCorners(viewport, scale_value, offset_value, minimum_value, maximum_value);
    return pointIsInsideRectangle(point, corners);
}


// function pointIsOnScreen(viewport, point, scale_value, offset_value, minimum_value, maximum_value)
// {
//     var corners = screenCorners(viewport, scale_value, offset_value, minimum_value, maximum_value);

//     if (point.x >= corners[0].x && point.x <= corners[1].x &&
//         point.y >= corners[0].y && point.y <= corners[1].y)
//     {
//         return true;
//     } 

//     return false;
// }

function unzoomedViewportCoordinates(viewport, x, y, scale_value, offset_value)
{
    try
    {
        var viewport_center = viewportCenter(viewport)

        var x_origin = viewport_center.x - (viewport_center.x * offset_value.x);
        var x_offset = (x - viewport_center.x) / scale_value.x;
        var unzoomed_x = x_offset + x_origin;
    
        var y_origin = viewport_center.y - (viewport_center.y * offset_value.y);
        var y_offset = (y - viewport_center.y) / scale_value.y;
        var unzoomed_y = y_offset + y_origin;
    
        var unzoomed_viewport_coordinates = new Vec2(unzoomed_x, unzoomed_y);
        return unzoomed_viewport_coordinates;
    }
    catch
    {
        console.log("unzoomedViewportCoordinates exception");
    }
}

function viewportCoordinates(viewport, viewport_borders, x, y)
{
    var viewport_x = x - viewport_borders.left;
    var viewport_y = y - viewport_borders.top;
    var viewport_coordinates = new Vec2(viewport_x, viewport.height - viewport_y);
    return viewport_coordinates;
}

function viewportCenter(viewport)
{
    var viewport_center = new Vec2(viewport.width / 2.0, viewport.height / 2.0);
    return viewport_center;
}

function range(minimum_value, maximum_value)
{
    var range = new Vec2(maximum_value.x - minimum_value.x, maximum_value.y - minimum_value.y);
    return range;
}

function zoomedRange(minimum_value, maximum_value, scale_value)
{
    var zoomed_range = new Vec2(range(minimum_value, maximum_value).x / scale_value.x, range(minimum_value, maximum_value).y / scale_value.y);
    return zoomed_range;
}

function halfRange(minimum_value, maximum_value)
{
    var half_range = new Vec2(range(minimum_value, maximum_value).x / 2, range(minimum_value, maximum_value).y / 2);
    return half_range;
}

function unzoomedCenter(minimum_value, maximum_value)
{
    var unzoomed_center = new Vec2(minimum_value.x + halfRange(minimum_value, maximum_value).x, minimum_value.y + halfRange(minimum_value, maximum_value).y);
    return unzoomed_center;
}

function setOffsetUsingRectangleCenter(viewport, rectangle_center, offset_value)
{
    var offset_x = rectangle_center.x - (viewport.width / 2);
    offset_x /= -viewport.width / 2;
    var offset_y = rectangle_center.y - (viewport.height / 2);
    offset_y /= -viewport.height / 2;
    offset_value.x = offset_x;
    offset_value.y = offset_y;
}

function getUnzoomedViewportCoordinatesFromValues(viewport, values, minimum_value, maximum_value)
{
    var viewport_coordinates = new Vec2();
    viewport_coordinates.x = (values.x - minimum_value.x) / (maximum_value.x - minimum_value.x) * viewport.width;
    viewport_coordinates.y = (values.y - minimum_value.y) / (maximum_value.y - minimum_value.y) * viewport.height;
    return viewport_coordinates;
}

function setOffsetUsingScreenCorners(viewport, new_screen_corners, offset_value, minimum_value, maximum_value)
{
    var center = new Vec2();
    center.x = (new_screen_corners[0].x + new_screen_corners[1].x) / 2;
    center.y = (new_screen_corners[0].y + new_screen_corners[1].y) / 2;
    // console.log("setOffsetUsingScreenCorners center = ", center, new_screen_corners);
    var rectangle_center = getUnzoomedViewportCoordinatesFromValues(viewport, center, minimum_value, maximum_value);
    setOffsetUsingRectangleCenter(viewport, rectangle_center, offset_value);
}

function valuesAtPixel(viewport, x, y, scale_value, offset_value, minimum_value, maximum_value)
{
    try
    {
        var unzoomed_viewport_coordinates = unzoomedViewportCoordinates(viewport, x, y, scale_value, offset_value);
        var x_value = minimum_value.x + (unzoomed_viewport_coordinates.x / viewport.width) * range(minimum_value, maximum_value).x;
        var y_value = minimum_value.y + (unzoomed_viewport_coordinates.y / viewport.height) * range(minimum_value, maximum_value).y;
        var result = new Vec2(x_value, y_value);
        return result;
    }
    catch
    {
        break_here = true;
    }
}

function screenCorners(viewport, scale_value, offset_value, minimum_value, maximum_value)
{
    var lower_left = valuesAtPixel(viewport, 0, 0, scale_value, offset_value, minimum_value, maximum_value);
    var upper_right = valuesAtPixel(viewport, viewport.width, viewport.height, scale_value, offset_value, minimum_value, maximum_value);
    return [lower_left, upper_right];
}

function loadVertexData(vertex_buffer, vertex_data)
{
    let float32_vertex_data = new Float32Array(vertex_data);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, float32_vertex_data, gl.STATIC_DRAW);
}

function loadIndexData(index_buffer, index_data)
{
    let uint32_index_array = new Uint32Array(index_data);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, uint32_index_array, gl.STATIC_DRAW);
}

function noScroll() 
{   
    window.scrollTo(0, 0); 
}

function sortMap(map)
{
    return new Map([...map.entries()].sort());
}

function isAStatisticsSeries(series)
{
    for (const [name, statistics_series] of statistics_layers_map)
    {
        if (series === statistics_series)
        {
            return true;
        }
    }

    return false;
}

function allSeriesPointRange(series_list)
{
    let minimum = new Vec2(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    let maximum = new Vec2(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

    for (var i = 0; i < series_list.length; i++)
    {
        var series = series_list[i];

        if (series === undefined)
        {
            continue;
        }

        // console.log("allSeriesPointRange minimum", series.name, series.minimum);
        minimum.x = Math.min(series.minimum.x, minimum.x);
        maximum.x = Math.max(series.maximum.x, maximum.x);
        minimum.y = Math.min(series.minimum.y, minimum.y);
        maximum.y = Math.max(series.maximum.y, maximum.y);
    }

    return [minimum, maximum];
}

function visiblePointList(viewport, series_list, scale_value, offset_value, minimum_value, maximum_value)
{
    // console.log("visiblePointList");
    let local_visible_point_list = [];
    let actual_visible_point_list = [];
    var visible_count = 0;
    var visible_total = 0;
    var total_count = 0;
    let year_count_map = new Map();
    let used_minimum = minimum_value;
    let used_maximum = maximum_value;

    for (var i = 0; i < series_list.length; i++)
    {
        var series = series_list[i];

        if (series === undefined)
        {
            continue;
        }

        if (normalize_checkbox.checked) 
        {
            used_minimum = series.minimum;
            used_maximum = series.maximum;

            let screen_corners = screenCorners(viewport, scale_value, offset_value, minimum_value, maximum_value);
            let new_used_minimum = screen_corners[0].y;
            let new_used_maximum = screen_corners[1].y;

            let data = getPositionArray(series);

            let normalized_data = normalizeTimeseries(data, { method: 'minmax', targetMin: new_used_minimum, targetMax: new_used_maximum });
            console.log("visiblePointList normalized_data", series.name, normalized_data);


            // console.log(series.name, series.minimum_value, series.maximum_value);
        }

        series.visible_point_list = [];
        series.actual_visible_point_list = [];
        series.visible_minimum = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
        series.visible_maximum = new Vec2(Number.MIN_VALUE, Number.MIN_VALUE);


        if (isAStatisticsSeries(series))
        {
            continue;
        }

        let graph_indices = getIndexArray(series);
        let graph_positions = getPositionArray(series);

        try
        {
            for (var j = 0; j < graph_indices.length; j++)
            {
                var index = graph_indices[j] * number_of_coordinates_per_point;
                var point = new Vec3(graph_positions[index], graph_positions[index + 1], i);

                let year = getFourDigitBeforeDecimal(point.x);

                if (year != null)
                {
                    if (year_count_map.has(year))
                    {
                        let current_count = year_count_map.get(year);
                        year_count_map.set(year, current_count + 1);
                    }
                    else
                    {
                        year_count_map.set(year, 1);
                    }
                }

                let point_is_on_screen = pointIsOnScreen(viewport, point, scale_value, offset_value, used_minimum, used_maximum);
        
                if (point_is_on_screen.x && (barChart() || point_is_on_screen.y))
                {
                    local_visible_point_list.push(point);
                    series.visible_point_list.push(point);

                    if (point_is_on_screen.x && point_is_on_screen.y)
                    {
                        visible_count++;
                        visible_total += point.y;
                        actual_visible_point_list.push(point);
                        series.actual_visible_point_list.push(point);
                    }

                    series.visible_minimum.x = Math.min(series.visible_minimum.x, point.x);
                    series.visible_minimum.y = Math.min(series.visible_minimum.y, point.y);
                    series.visible_maximum.x = Math.max(series.visible_maximum.x, point.x);
                    series.visible_maximum.y = Math.max(series.visible_maximum.y, point.y);
                }
    
                total_count++;
            }
        }
        catch
        {
            console.log("Problem with graph_indices");
        }
    }

    var visible_average = visible_total / visible_count;
    // console.log("visiblePointList returning local_visible_point_list", local_visible_point_list);
    return [visible_count, visible_average, visible_total, local_visible_point_list, total_count, actual_visible_point_list, year_count_map];
}


function getFourDigitBeforeDecimal(number) 
{
    // Convert to string to handle the decimal
    const numStr = number.toString();
    
    // Split at decimal point if it exists
    const parts = numStr.split('.');
    const wholeNumber = parts[0];
    
    // Remove any negative sign if present and convert to number
    const absoluteWhole = Number(wholeNumber.replace('-', ''));
    
    // Check if it's a four-digit number
    if (/^\d{4}$/.test(wholeNumber.replace('-', ''))) {
        return absoluteWhole;
    }
    return null;
}


function visibleDataList()
{
    let visible_series_list = visibleSeriesList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    let visible_data_list = [];

    for (series of visible_series_list)
    {
        let graph_positions = series.graph_positions;
        let graph_indices = series.graph_indices;
    
        for (let i = 0; i < graph_indices.length; i++)
        {
            let index = graph_indices[i];
            let date = graph_positions[index * 2];
            let value = graph_positions[(index * 2) + 1]
            visible_data_list.push(date, value);
        }
    }

    return visible_data_list;
}

function visibleSeriesList(viewport, series_list, scale_value, offset_value, minimum_value, maximum_value)
{
    var visible_series_list = [];

    for (var i = 0; i < series_list.length; i++)
    {
        var series = series_list[i];

        if (doNormalize())
        {
            visible_series_list.push(series);
            continue;
        }

        var graph_indices = getIndexArray(series)
        var graph_positions = getPositionArray(series);

        try
        {
            for (var j = 0; j < graph_indices.length; j++)
            {
                var index = graph_indices[j] * number_of_coordinates_per_point;
                var point = new Vec3(graph_positions[index], graph_positions[index + 1], i);

                let point_is_on_screen = pointIsOnScreen(viewport, point, scale_value, offset_value, minimum_value, maximum_value);

                if (point_is_on_screen.x && (barChart() || point_is_on_screen.y))
                {
                    visible_series_list.push(series);
                    break;
                }
            }
        }
        catch
        {
            console.log("Problem with graph_indices");
        }
    }

    return visible_series_list;
}

function zoomToNewScreenCorners(viewport, lower_left, upper_right, margin = 5, scale_value, offset_value, minimum_value, maximum_value, keep_proportions = false)
{
    console.log("zoomToNewScreenCorners");
    var unzoomed_lower_left_viewport_coordinates = getUnzoomedViewportCoordinatesFromValues(viewport, lower_left, minimum_value, maximum_value);
    var unzoomed_upper_right_viewport_coordinates = getUnzoomedViewportCoordinatesFromValues(viewport, upper_right, minimum_value, maximum_value);
    var unzoomed_rectangle_dimensions = Vec2.subtract(unzoomed_upper_right_viewport_coordinates, unzoomed_lower_left_viewport_coordinates);
    var half_unzoomed_rectangle_dimensions = Vec2.scalarDivide(unzoomed_rectangle_dimensions, 2);
    var unzoomed_rectangle_center = Vec2.sum(half_unzoomed_rectangle_dimensions, unzoomed_lower_left_viewport_coordinates);
    setOffsetUsingRectangleCenter(viewport, unzoomed_rectangle_center, offset_value);
    var unzoomed_rectangle_size = Vec2.abs(unzoomed_rectangle_dimensions);
    var rectangle_borders = Vec2.scalarMultiply(unzoomed_rectangle_size, margin / 100);
    unzoomed_rectangle_size = Vec2.add(unzoomed_rectangle_size, rectangle_borders);
    scale_value.x = viewport.width / unzoomed_rectangle_size.x;
    scale_value.y = viewport.height / unzoomed_rectangle_size.y;

    if (keep_proportions)
    {
        var min_scale = Math.min(scale_value.x, scale_value.y);
        scale_value.x = min_scale;
        scale_value.y = min_scale;
    }

    document.dispatchEvent(draw_scene_event);
}

function centerValue(offset_value, minimum_value, maximum_value)
{
    var center_offset = new Vec2(halfRange(minimum_value, maximum_value).x * -offset_value.x, halfRange(minimum_value, maximum_value).y * -offset_value.y)
    var center_value = new Vec2(minimum_value.x + halfRange(minimum_value, maximum_value).x + center_offset.x, minimum_value.y + halfRange(minimum_value, maximum_value).y + center_offset.y);
    return center_value;
}

function addGraphMargin(minimum_value, maximum_value, margin_percent)
{
    if (!dont_change_min_max)
    {
        const x_range = maximum_value.x - minimum_value.x;
        const y_range = maximum_value.y - minimum_value.y;
        minimum_value.x -= x_range / 100 * margin_percent;
        minimum_value.y -= y_range / 100 * margin_percent;
        maximum_value.x += x_range / 100 * margin_percent;
        maximum_value.y += y_range / 100 * margin_percent;
    }
}

function setupModelviewMatrix(scale_value, offset_value, modelview_matrix_handle, matrix)
{
    // try
    {
        matrix.identity();

        if (scale_before_translate)
        {
            matrix.translate(offset_value);
            matrix.scale(scale_value);
        }
        else
        {
            matrix.scale(scale_value);
            matrix.translate(offset_value);
        }
    
        gl.uniformMatrix4fv(
            modelview_matrix_handle,
            // program_information.uniform_locations.modelview_matrix,
            false,
            matrix.value());
    }
    // catch
    {
        var break_here = true;
    }
    // console.log(modelview_matrix);

}

function removeGridLabels()
{
    for (let i = g_x_grid_labels.length - 1; i >= 0; i--) 
    {
        let label = g_x_grid_labels[i];
        ui_container.removeChild(label);
        g_x_grid_labels.splice(i, 1);
    }

    for (let i = g_y_grid_labels.length - 1; i >= 0; i--) 
    {
        let label = g_y_grid_labels[i];
        ui_container.removeChild(label);
        g_y_grid_labels.splice(i, 1);
    }
}

function drawGrid(viewport, viewport_borders, scale_value, offset_value, 
                  minimum_value, maximum_value, raw_coordinates_handle, 
                  color_handle, modelview_matrix_handle, modelview_matrix_value,
                  use_integers)
{
    setupModelviewMatrix(scale_value, offset_value, modelview_matrix_handle, modelview_matrix_value);

    var screen_corners = screenCorners(viewport, scale_value, offset_value, minimum_value, maximum_value);
    // console.log("drawGrid screen_corners", screen_corners);
    var visible_range = new Vec2(screen_corners[1].x - screen_corners[0].x, screen_corners[1].y - screen_corners[0].y);
    var spacing = new Vec2(visible_range.x / g_grid_dimensions.x, Math.round(visible_range.y / g_grid_dimensions.y * 100) / 100);
    // console.log("drawGrid spacing", spacing, "visible_range.y", visible_range.y, screen_corners[0].y, screen_corners[1].y, minimum_value, maximum_value);
    var grid_lines = [];
    var value = screen_corners[0].x;
    try
    {
        var label_position = graph_viewport_frame.left + viewport_borders.left - (grid_label_dimensions.x / 2);
    }
    catch (error)
    {
        console.log("drawGrid", error);
    }
    
    var label_spacing = viewport.width / g_grid_dimensions.x;

    let MINIMUM_DATE = 1500;

    if (value < 0)
    {
        // value = 0;
    }

    value = Math.abs(value) < 0.01 ? 0 : value;

    if (value < MINIMUM_DATE && screen_corners[1].x > 10)
    {
        use_whole_year_labels = true;
    }
    else
    {
        use_whole_year_labels = false;
    }

    // x_grid_labels.length = 0;
    // y_grid_labels.length = 0;

    // When x range is 0 to 1 it is aassumed to represent days of the year
    let is_day_of_year = value == 0 && withinTolerance(0.01, screen_corners[1].x, 1);

    removeGridLabels();

    for (var i = 0; i <= g_grid_dimensions.x; i++)
    {
        grid_lines.push(value); grid_lines.push(screen_corners[0].y);
        grid_lines.push(value); grid_lines.push(screen_corners[1].y);

        var grid_label;

        if (g_x_grid_labels.length < g_grid_dimensions.x + 1)
        {
            grid_label = document.createElement("Label");
            grid_label.style.position = "absolute";
            // grid_label.style.font = "Georgia,serif";
            if (g_grid_dimensions.x > 10)
            {
                grid_label.style.fontSize = (12 * g_x_scale_factor).toString() + "px";
            }
            else
            {
                grid_label.style.fontSize = (14 * g_x_scale_factor).toString() + "px";
            }
            
            grid_label.style.fontStyle = "bold";
            grid_label.style.textAlign = "center";
            grid_label.style.width = grid_label_dimensions.x.toString() + "px";
            grid_label.style.height = grid_label_dimensions.y.toString() + "px";
            grid_label.style.zIndex = "1000";
            grid_label.style.color = text_color;
            grid_label.style.left = label_position.toString() + "px";
    
            // console.log(main_viewport.height, mouse, grid_label_dimensions)
            grid_label.style.bottom = (graph_viewport_frame.bottom + viewport_borders.bottom - grid_label_dimensions.y - 3).toString() + "px";
            ui_container.appendChild(grid_label);
            g_x_grid_labels.push(grid_label);
        }
        else
        {
            grid_label = g_x_grid_labels[i];
        }
        // grid_label.innerHTML = (parseInt(value * 100) / 100).toString();

        if ((visible_range.x > 1.5 || screen_corners[0].x > 1) && visible_range.x < 20 && screen_corners[0].x < 500)
        {
            grid_label.innerHTML = value.toFixed(2);
        }
        else if ((Number.isInteger(value) && !is_day_of_year) || use_whole_year_labels /*|| (series_select != undefined && series_select.value.includes("FFT"))*/)
        {
            grid_label.innerHTML = Math.round(value);
        }
        else 
        {
            grid_label.innerHTML = GraphingUtilities.dateString(value);
        }
        
        label_position += label_spacing;
        value += spacing.x;
    }

    // console.log(`drawGrid x grid lines ${grid_lines}`);

    value = screen_corners[0].y;

    if (visible_range.y >= 1000)
    {
        use_integers = true;
    }

    let grid_tolerance = 0.01;

    if (minimum_y_input !== undefined)
    {
        let lower_limit = parseFloat(minimum_y_input.value);
        let upper_limit = parseFloat(maximum_y_input.value);
        let range = upper_limit - lower_limit;

        // lower_limit = lower_limit - onePixelDelta().y;

        let compare_value = use_centigrade ? fToC(value) : value;
        compare_value = value;
        
        if (!isNaN(lower_limit) && withinTolerance(grid_tolerance, lower_limit, compare_value, range))
        {
            value = lower_limit;
            console.log("drawGrid lower_limit value", value);
        }
    }

    label_position = graph_viewport_frame.bottom + viewport_borders.bottom;
    label_spacing = viewport.height / g_grid_dimensions.y;

    for (var i = 0; i <= g_grid_dimensions.y; i++)
    {
        var grid_label;

        if (g_y_grid_labels.length < g_grid_dimensions.y + 1)
        {
            grid_label = document.createElement("Label");
            grid_label.style.position = "absolute";
            // grid_label.style.font = "Georgia,serif";

            grid_label.style.fontStyle = "bold";
            grid_label.style.textAlign = "center";
            grid_label.style.width = grid_label_dimensions.x.toString() + "px";
            grid_label.style.height = grid_label_dimensions.y.toString() + "px";
            grid_label.style.zIndex = "1000";
            grid_label.style.color = text_color;
            grid_label.style.bottom = label_position.toString() + "px";
            grid_label.style.left = (graph_viewport_frame.left+ viewport_borders.left - grid_label_dimensions.x - 3).toString() + "px";
            ui_container.appendChild(grid_label);
            g_y_grid_labels.push(grid_label);
        }
        else
        {
            grid_label = g_y_grid_labels[i];
        }

        if (maximum_y_input !== undefined)
        {
            let lower_limit = parseFloat(minimum_y_input.value);
            let upper_limit = parseFloat(maximum_y_input.value);
            let range = upper_limit - lower_limit;

            if (i == g_grid_dimensions.y && !isNaN(upper_limit) && withinTolerance(grid_tolerance, upper_limit, value, range))
            {
                value = upper_limit;
            }
        }

        // if (Math.abs(value) <= 0.01) 
        // {
        //     value = 0;
        // }

        var display_value = formatToTwoSignificantDigits(value);
        // console.log("drawGrid y labels", i, display_value);

        try
        {
            if (type_select.value == TMAX || type_select.value == TMIN)
            {
                if (use_centigrade)
                {
                    display_value = Math.round(fToC(display_value) * 100) / 100;
                }
            }
            else if (type_select.value == PRCP || type_select.value == SNOW)
            {
                if (use_centigrade)
                {
                    display_value = inchesToMM(display_value);
                }
            }

            if (g_maximum.y >= 1000000)
            {
                grid_label.style.fontSize = (14 * g_x_scale_factor).toString() + "px";
                use_integers = true;
            }
            else
            {
                grid_label.style.fontSize = (16 * g_x_scale_factor).toString() + "px";
            }

        }
        catch
        {
            var break_here = true;
        }

        // console.log("drawGrid display_value 1", display_value);
        // display_value = parseInt(display_value * 100) / 100;
        // // console.log("drawGrid display_value 2", display_value);
        // display_value = roundIfClose(display_value, spacing.y);
        // // console.log("drawGrid display_value 3", display_value);
        // // console.log("drawGrid 2 y labels", i, display_value);

        if (use_integers)
        {
            display_value = Math.round(display_value);
        }

        grid_label.innerHTML = display_value.toString();
        label_position += label_spacing;
        value += spacing.y;
    }

    value = screen_corners[0].y + spacing.y;

    for (var i = 0; i < g_grid_dimensions.y - 1; i++)
    {
        grid_lines.push(screen_corners[0].x, value);
        grid_lines.push(screen_corners[1].x, value);
        value += spacing.y;
    }

    // console.log(visible_range, spacing, grid_lines);
    drawLines(grid_lines, grid_color, gl.LINES, raw_coordinates_handle, color_handle);
    // console.log("grid_color", grid_color);
}

function roundIfClose(number, tolerance = 0.05) 
{
    let floor = Math.floor(number);
    let ceil = Math.ceil(number);

    if (Math.abs(number - floor) < tolerance) 
    {
        return floor;
    } 
    else if (Math.abs(number - ceil) < tolerance) 
    {
        return ceil;
    } 
    else 
    {
        let fractional_number = Math.abs(number - floor);

        if (Math.abs(fractional_number - 0.5) < tolerance)
        {
            // number = floor + 0.5;
        }
        
        // If not close to either floor or ceil, you can return the number as is or implement another rounding strategy
        return number; // or Math.round(number) for standard rounding
    }
}

function shadeViewport(viewport, color)
{
    let color_handle = graphing_program_information.uniform_locations.color;
    let raw_coordinates_handle = graphing_program_information.attribute_locations.raw_coordinates;
    let corners = [g_minimum, g_maximum];
    gl.enable(gl.BLEND);
    drawRectangle(viewport, corners, color_handle, color, raw_coordinates_handle);
    gl.disable(gl.BLEND);
    gl.viewport(g_main_viewport.x, g_main_viewport.y, g_main_viewport.width, g_main_viewport.height);
}

function drawInnerAndOuterBorders(viewport, modelview_matrix_handle, raw_coordinates_handle, color_handle, border_color, matrix, minimum_value, maximum_value)
{ 
    // try
    {
        matrix.identity();
    }
    // catch
    {
        var break_here = true;
    }

    gl.uniformMatrix4fv(
        modelview_matrix_handle,
        false,
        matrix.value());

    var range = Vec2.subtract(maximum_value, minimum_value);
    var viewport_dimensions = new Vec2(viewport.width, viewport.height);
    var borders_vertices = []; 
    var border_offset = Vec2.divide(range, viewport_dimensions);
    var border_offset_maximum = Vec2.scalarMultiply(border_offset, 1.3);
    var border_minimum = Vec2.sum(minimum_value, border_offset);
    var border_maximum = Vec2.subtract(maximum_value, border_offset_maximum);
    // border_maximum.y += border_offset;

    borders_vertices.push(border_minimum.x); borders_vertices.push(border_minimum.y); 
    borders_vertices.push(border_maximum.x); borders_vertices.push(border_minimum.y); 
    borders_vertices.push(border_maximum.x); borders_vertices.push(border_maximum.y); 
    borders_vertices.push(border_minimum.x); borders_vertices.push(border_maximum.y); 
    borders_vertices.push(border_minimum.x); borders_vertices.push(border_minimum.y); 

    gl.viewport(g_main_viewport.x, g_main_viewport.y, g_main_viewport.width, g_main_viewport.height);
    drawLines(borders_vertices, border_color, gl.LINE_STRIP, raw_coordinates_handle, color_handle);

    gl.viewport(g_full_viewport.x, g_full_viewport.y, g_full_viewport.width, g_full_viewport.height);
    drawLines(borders_vertices, outer_border_color, gl.LINE_STRIP, raw_coordinates_handle, color_handle);
    // drawWideLines(borders_vertices, border_color, raw_coordinates_handle, color_handle, 2);

    gl.viewport(g_main_viewport.x, g_main_viewport.y, g_main_viewport.width, g_main_viewport.height);
}

function initShaderProgram(vertex_shader_source, fragment_shader_source) 
{
    vertex_shader = createShader(gl.VERTEX_SHADER, vertex_shader_source);
    fragment_shader = createShader(gl.FRAGMENT_SHADER, fragment_shader_source);
    var program = gl.createProgram();
    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) 
    {
        console.log("Shader program compiled successfully");
    }
    else
    {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
        return null;
    }

    return program;
}

function createShader(type, source) 
{
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
    {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function loadGraphingShadersAndSetupGL()
{
    loadTextFile("./shaders/graphing.vs", graphingVertexShaderLoaded);
    loadTextFile("./shaders/graphing.fs", graphingFragmentShaderLoaded);
}

function graphingVertexShaderLoaded() 
{
    graphing_vertex_shader_source = this.responseText;
    document.dispatchEvent(graphing_shader_loaded_event);
}

function graphingFragmentShaderLoaded() 
{
    graphing_fragment_shader_source = this.responseText;
    document.dispatchEvent(graphing_shader_loaded_event);
}

function generateGraphingProgramInformation()
{
    graphing_program_information = 
    {
        program: graphing_shader_program,
        attribute_locations:
        {
            raw_coordinates: gl.getAttribLocation(graphing_shader_program, 'raw_coordinates'),
        },
        uniform_locations:
        {
            color: gl.getUniformLocation(graphing_shader_program, 'u_color'),
            borderColor: gl.getUniformLocation(graphing_shader_program, 'u_borderColor'),
            borderWidth: gl.getUniformLocation(graphing_shader_program, 'u_borderWidth'),
            resolution: gl.getUniformLocation(graphing_shader_program, 'u_resolution'),      
            
            point_size: gl.getUniformLocation(graphing_shader_program, 'point_size'),
            min_x: gl.getUniformLocation(graphing_shader_program, 'min_x'),
            max_x: gl.getUniformLocation(graphing_shader_program, 'max_x'),
            min_y: gl.getUniformLocation(graphing_shader_program, 'min_y'),
            max_x: gl.getUniformLocation(graphing_shader_program, 'max_x'),
            max_y: gl.getUniformLocation(graphing_shader_program, 'max_y'),
            x_offset: gl.getUniformLocation(graphing_shader_program, 'x_offset'),
            y_offset: gl.getUniformLocation(graphing_shader_program, 'y_offset'),
            z_offset: gl.getUniformLocation(graphing_shader_program, 'z_offset'),
            modelview_matrix: gl.getUniformLocation(graphing_shader_program, 'modelview_matrix'),
        },
    };

    graphing_program_initialized = true;
}

function drawLines(points, color, line_type, raw_coordinates_handle, color_handle)
{
    if (points === undefined || points.length < 2)
    {
        return;
    }

    var vertex_positions = [];

    for (var i = 0; i < points.length; i++)
    {
        vertex_positions.push(points[i]);
    };

    var line_position_array = new Float32Array(vertex_positions);
    var line_position_buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, line_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, line_position_array, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(raw_coordinates_handle);

    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const data_offset = 0;

    gl.vertexAttribPointer(
        raw_coordinates_handle,
        numComponents,
        type,
        normalize,
        stride,
        data_offset);

    gl.uniform4fv(color_handle, color);

    const buffer_offset = 0;
    const vertex_count = vertex_positions.length / 2;

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindBuffer(gl.ARRAY_BUFFER, line_position_buffer);
    gl.drawArrays(line_type, buffer_offset, vertex_count);
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.deleteBuffer(line_position_buffer);
}

function hexToRGBAList(hex_number)
{
    const a = parseFloat(hex_number & 0xff) / 255;
    const b = parseFloat((hex_number >> 8) & 0xff) / 255;
    const g = parseFloat((hex_number >> 16) & 0xff) / 255;
    const r = parseFloat((hex_number >> 24) & 0xff) / 255;

    return [r, g, b, a];
}

function decToHex(dec) 
{
    return dec.toString(16);
}
  
function padToTwo(str) 
{
    return str.padStart(2, "0");
}

function glColorToString(color)
{
    let r = Math.round(color[0] * 255);
    let g = Math.round(color[1] * 255);
    let b = Math.round(color[2] * 255);
    let a = Math.round(color[3] * 255);
    
    return rgbaToHexString(r, g, b, a);
}

function hexToString(number)
{
    let r = (number >> 24) & 0xff;
    let g = (number >> 16) & 0xff;
    let b = (number >>  8) & 0xff;
    let a = (number >>  0) & 0xff;
    return rgbaToHexString(r, g, b, a);
}

function vec4ColorToHexString(color)
{
    let r = Math.round(color.x * 255.0);
    let g = Math.round(color.y * 255.0);
    let b = Math.round(color.z * 255.0);
    let a = Math.round(color.w * 255.0);
    return rgbaToHexString(r, g, b, a);
}

function rgbaListToHexString(rgba_list)
{
    return rgbaToHexString(rgba_list[0], rgba_list[1], rgba_list[2], rgba_list[3]);
}
  
function rgbaArrayToHexString(colors)
{
    return rgbToHex(colors[0], colors[1], colors[2], colors[3]);
}

function rgbaToHexString(r, g, b, a) 
{
    // const hexR = padToTwo(decToHex(r));
    // const hexG = padToTwo(decToHex(g));
    // const hexB = padToTwo(decToHex(b));
    // const hexA = padToTwo(decToHex(a));
    const hexR = decToHex(r);
    const hexG = decToHex(g);
    const hexB = decToHex(b);
    const hexA = decToHex(a);
    const color_string = `#${hexR}${hexG}${hexB}${hexA}`
  
    return color_string;
}

function rgbToHex(r, g, b, a) 
{
    const hexR = padToTwo(decToHex(r));
    const hexG = padToTwo(decToHex(g));
    const hexB = padToTwo(decToHex(b));
    const hexA = padToTwo(decToHex(a));
  
    return `#${hexR}${hexG}${hexB}${hexA}`;
}

function getAllImagesFromIceSeries(series, image_map)
{
    // console.log(series);
    let url = "";
    let image_file_name = "";
    let url_list = [];

    for (let i = 0; i < series.graph_indices.length; i++)
    {
        let index = series.graph_indices[i];
        let date = series.graph_positions[index * 2];
        let date_string = GraphingUtilities.dateString(date);
        // console.log(date_string);

        let month_string = date_string.split("/")[0];
        let url_month_string = getNSIDCMonthString(parseInt(month_string));
        let day_string = date_string.split("/")[1];
        let year_string = date_string.split("/")[2];
        // console.log(month_string, day_string, year_string);
        let padded_month = month_string.padStart(2, "0");
        let padded_day = day_string.padStart(2, "0");
        let padded_date_string = year_string + padded_month + padded_day;
        // console.log(padded_date_string);

        if (series.name.includes("OSI Arctic"))
        {
            console.log("Arctic");
            url = "https://noaadata.apps.nsidc.org/NOAA/G02135/north/daily/images/";
            url += year_string + "/" + url_month_string + "/N_" + padded_date_string + "_extn_v3.0.png";
            image_file_name = "N_" + padded_date_string + "_extn_v3.0.png";
    }
        else if (series.name.includes("OSI Antarctic"))
        {
            console.log("Antarctic");
            url = "https://noaadata.apps.nsidc.org/NOAA/G02135/south/daily/images/";
            url += year_string + "/" + url_month_string + "/S_" + padded_date_string + "_extn_v3.0.png";
            image_file_name = "S_" + padded_date_string + "_extn_v3.0.png";
        }
        else if (series.name.includes("NSIDC Arctic Sea Ice Extent"))
        {
            url = "https://noaadata.apps.nsidc.org/NOAA/G02135/north/daily/images/";
            url += year_string + "/" + url_month_string + "/N_" + padded_date_string + "_extn_v3.0.png";
            image_file_name = "N_" + padded_date_string + "_extn_v3.0.png";
        }


        // console.log(url);

        url_list.push(url);
    }

    // Duplicate the last entry.
    url_list.push(url_list[-1]);

    console.log(url_list);

    // const fetch_promises = url_list.map(url => fetchAndDrawURL(url, image_map));

    // const responses = fetchImagesSequentially(url_list);
    // console.log("fetchImagesSequentially responses = ", responses);

    // fetchImagesSequentially(url_list)
    // .then(responses => 
    // {
    //     console.log('All fetches complete:', responses);
    // })
    // .catch(error => 
    // {
    //     console.error('Error fetching:', error);
    // });


    const fetch_promises = url_list.map((url, index) => 
    {
        return new Promise((resolve) => 
        {
          setTimeout(() => 
          {
              const image_object = new Image();
              const save_images = true;
              fetchAndDrawURL(canvas2D_2, url, image_map, image_object, save_images)
              .then((returned_image_object) => 
              {
                console.log("fetchAndDrawURL.then", url, fetch_promises, "\nreturned_image_object", returned_image_object);
                // let ctx = draw2DImage(canvas2D_4, returned_image_object);
                // let ctx = draw2DImage(canvas2D_4, canvas_2D_4_image_object);
                // const data_url = canvas2D_4.toDataURL('image/png');
                // const link = document.createElement('a');
                // link.href = data_url;
                // // link.download = image_file_name;
                // link.click();

                resolve(returned_image_object);
              })
              .catch(error => 
              {
                console.error(`Error fetching ${url}:`, error);
                resolve(null); // Resolve with null to continue with other fetches
              });
          }, index * 500); // Delay each fetch by 1000ms (adjust as needed)
        });
    });

    console.log(fetch_promises);
    let minimum_ice_loss_pixel_count = Number.MAX_SAFE_INTEGER;
    let minimum_ice_gain_pixel_count = Number.MAX_SAFE_INTEGER;
    let closest_matched_image_data = undefined;
    let closest_matched_image_name = "";


    Promise.all(fetch_promises).then(results =>
    {

        // All fetch requests have completed successfully
        console.log('All data fetched:');
        console.log("image_map", image_map);
        // Process the fetched data here
        console.log("compare_against_sea_ice_image_filename", compare_against_sea_ice_image_filename);

        if (image_map.has(compare_against_sea_ice_image_filename))
        {
            const compare_image = image_map.get(compare_against_sea_ice_image_filename).image_object;
            let ctx = canvas2D_4.getContext('2d', { willReadFrequently: true });
            draw2DImage(canvas2D_4, compare_image)
            .then(() => 
            {
                const compare_image_data = ctx.getImageData(0, 0, compare_image.width, compare_image.height);
                let texture_2 = createGPUTextureArray(compare_image_data);
        
                for (const image_name of image_map.keys())
                {
                    console.log("image_name", image_name);
                    console.log(image_name, image_map.get(image_name));
                    const image = image_map.get(image_name).image_object;
        
                    if (image !== undefined && compare_image !== undefined)
                    {
                        if (image_name != compare_against_sea_ice_image_filename)
                        {
                            let ctx = canvas2D_4.getContext('2d', { willReadFrequently: true });
                            draw2DImage(canvas2D_4, image);
                            // .then(() =>
                            {
                                const image_data = ctx.getImageData(0, 0, image.width, image.height);
                                let texture_1 = createGPUTextureArray(image_data);
                                const result_image = compareIceKernel(texture_1, texture_2, ice_gain_color, ice_loss_color);
                                const uint8_image_data = new Uint8ClampedArray(image.width * image.height * 4);
    
                                let ice_loss_pixel_count = 0;
                                let ice_gain_pixel_count = 0;
                
                                for (let y = 0; y < image.height; y++)
                                {
                                    for (let x = 0; x < image.width; x++)
                                    {
                                        let rgba = result_image[y][x];
                                        let index = ((y * image.width) + x) * 4;
                                        let r = rgba[0];
                                        let g = rgba[1];
                                        let b = rgba[2];
                                        let a = rgba[3];
                                        
                                        uint8_image_data[index + 0] = r;
                                        uint8_image_data[index + 1] = g;
                                        uint8_image_data[index + 2] = b;
                                        uint8_image_data[index + 3] = a;
    
                                        if (r == ice_loss_color[0] &&
                                            g == ice_loss_color[1] &&
                                            b == ice_loss_color[2])
                                        {
                                            ice_loss_pixel_count++;
                                        }
                                        else if (r == ice_gain_color[0] &&
                                            g == ice_gain_color[1] &&
                                            b == ice_gain_color[2])
                                        {
                                            ice_gain_pixel_count++;
                                        }
                                    }
                                }
    
                                const ice_image_data = new ImageData(uint8_image_data, image.width, image.height);
    
    
                                if (ice_loss_pixel_count + ice_gain_pixel_count < minimum_ice_loss_pixel_count + minimum_ice_gain_pixel_count)
                                {
                                    minimum_ice_loss_pixel_count = ice_loss_pixel_count;
                                    minimum_ice_gain_pixel_count = ice_gain_pixel_count;
                                    closest_matched_image_data = ice_image_data;
                                    closest_matched_image_name = image_name;
                                    console.log("Closest match image_name", "ice_loss_pixel_count", ice_loss_pixel_count, "ice_gain_pixel_count", ice_gain_pixel_count);
                                }
    
                                let ctx4 = canvas2D_4.getContext("2d");
                                ctx4.putImageData(ice_image_data, 0, 0);
                                console.log("Drew ", image_name);
                            }
                            // })
    
                        }
                    }
                }
    
                let ctx4 = canvas2D_4.getContext("2d");
                ctx4.putImageData(closest_matched_image_data, 0, 0);
                // console.log("Drew ", image_name);
    
                let image_name_date_string = closest_matched_image_name.split("_")[1];
                let compare_against_date_string = compare_against_sea_ice_image_filename.split("_")[1];
                let image_1_date = dateStringFromUnformatted(image_name_date_string);
                let image_2_date = dateStringFromUnformatted(compare_against_date_string);
    
                ctx4.font = 'bold 20px Arial';
                ctx4.fillStyle = rgbaArrayToHexString(ice_gain_color);
                ctx4.strokeStyle = ctx4.fillStyle;
                ctx4.lineWidth = 0;
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
                ctx4.fillText(text, TEXT_LEFT, 45); // Fill the text
                ctx4.strokeText(text, TEXT_LEFT, 45);
    
                ctx4.fillStyle = rgbaArrayToHexString(ice_loss_color);
                ctx4.strokeStyle = ctx4.fillStyle;
                ctx4.lineWidth = 0;
                // ctx4.lineWidth = 5;
                text = 'Ice Loss From ' + first_date + " To " + second_date;
                ctx4.fillText(text, TEXT_LEFT, 65); // Fill the text
                ctx4.strokeText(text, TEXT_LEFT, 65);
    
    
        
            })
    
        }

    })
    .catch(error => 
    {
        // At least one fetch request failed
        console.error('Error fetching data:', error);
    });

}

async function fetchImagesSequentially(urls) 
{
    const responses = [];
    const proxy_url = 'http://localhost:5000/fetch-image';

    for (const url of urls) 
    {
        try 
        {
            const response = await fetch(proxy_url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url }) })

            if (!response.ok) 
            {
                throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            }
            
            responses.push(await response.arrayBuffer());
        } 
        catch (error) 
        {
            console.error(error);
            responses.push(null); // Push null if fetch failed
        }
    }

    return responses;
}

function hasDateSubstring(str) 
{
    // const date_regex = /\d{4}-\d{2}-\d{2}/;
    const date_regex = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/;
    return date_regex.test(str);
}

async function fetchAndDrawURL(canvas, url, image_map, image_object, save_files)
{

    console.log("fetchAndDrawURL", url);

    await fetch(proxy_url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url }) })
    .then(response => response.arrayBuffer())
    .then(buffer => 
    {
        if (url !== undefined)
        {
            const uint8Array = new Uint8Array(buffer);
            const blob = new Blob([uint8Array], { type: 'image/png' });
            const image_url = URL.createObjectURL(blob);
            console.log("url = ", url);
            let image_file_name = url.split("/").at(-1);
            // const img = document.getElementById('fetchedImage');
            // img.src = image_url;
            // console.log(img);
            console.log("fetchAndDrawURL about to call image_object.onload ");
    
            image_object.src = image_url;
            image_object.onload = () => 
            { 
                console.log("image_object onload", url); 
                image_map.set(image_file_name, {image_object: image_object});
                console.log("image_object onload", image_object);
                let ctx = canvas.getContext('2d', { willReadFrequently: true });
                draw2DImage(canvas, image_object)
                .then(() =>
                {
                    
    
                    if (save_files)
                    {
                        const data_url = canvas.toDataURL('image/png');
                        const link = document.createElement('a');
                        link.href = data_url;
                        link.download = image_file_name;
                        link.click();
                    }
        
                    // const image_data = ctx.getImageData(0, 0, image_object.width, image_object.height);
        
                    // let ice_gain_pixel_count = 0;
                    // let ice_loss_pixel_count = 0;
        
                    // for (let i = 0; i < image_data.data.length; i += 4) 
                    // {
                    //     const red = image_data.data[i];
                    //     const green = image_data.data[i + 1];
                    //     const blue = image_data.data[i + 2];
                    //     const alpha = image_data.data[i + 3];
        
                    //     if (red == ice_gain_color[0] && green == ice_gain_color[1] && blue == ice_gain_color[2])
                    //     {
                    //         ice_gain_pixel_count++;
                    //     }
                    //     if (red == ice_loss_color[0] && green == ice_loss_color[1] && blue == ice_loss_color[2])
                    //     {
                    //         ice_loss_pixel_count++;
                    //     }
                    //     // console.log(red, green, blue, alpha);
                    // }
        
                    return image_object;
                    // return new Promise((resolve, reject) =>
                    // {
                    //     resolve(image_object);
                    // });
                })
            }
                
        }

    })
    // .then(data => { resolve(data);})
    .catch(error => { console.error('Error fetching image:', error); });

}

async function draw2DImage(canvas, image)
{
    main_visitech_logo.style.display = "none";
    canvas.width = image.width;
    canvas.height = image.height;
    let ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(image, 0, 0);
    // .then(() => 
    // {
    //     return new Promise((resolve, reject) => {
    //         // Perform some asynchronous operation
    //         // ...
            
    //         // If the operation is successful, resolve the promise
    //         resolve(ctx);
            
    //         // If an error occurs, reject the promise
    //         // reject(error);
    //       });
    // })

    return new Promise((resolve, reject) => 
    {
        // Perform some asynchronous operation
        // ...
        
        // If the operation is successful, resolve the promise
        resolve(ctx);
        
        // If an error occurs, reject the promise
        // reject(error);
    });
    
}

function drawWideLines(points, color, raw_coordinates_handle, color_handle, width)
{
    for (i = 0; i < points.length; i += 4)
    {
        let line_points = points.slice(i, i + 4);
        drawWideLine(line_points, color, raw_coordinates_handle, color_handle, width);
    }
}

function drawWideLine(points, color, raw_coordinates_handle, color_handle, width)
{
    let screen_corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);
    let visible_range = new Vec2(screen_corners[1].x - screen_corners[0].x, screen_corners[1].y - screen_corners[0].y);
    const x0 = points[0];
    const y0 = points[1];
    const x1 = points[2];
    const y1 = points[3];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const length = Math.sqrt((dx * dx) + (dy * dy));
    const sin = dy / length;
    const cos = dx / length;


    let delta_x = visible_range.x / g_main_viewport.width * width;
    let delta_y = visible_range.y / g_main_viewport.height * width;

    // console.log("drawWideLine", screen_corners, visible_range, "delta_x", delta_x, delta_y);




    let triangle_points = [];
    triangle_points.push(x0 + delta_x);
    triangle_points.push(y0 - delta_y);

    triangle_points.push(x1 + delta_x);
    triangle_points.push(y1 - delta_y);

    triangle_points.push(x0 - delta_x);
    triangle_points.push(y0 + delta_y);

    triangle_points.push(x1 - delta_x);
    triangle_points.push(y1 + delta_y);

    gl.uniform1f(graphing_program_information.uniform_locations.x_offset, 0);
    gl.uniform1f(graphing_program_information.uniform_locations.y_offset, 0);

    let line_width = 0.1;
    
    drawLines(triangle_points, color, gl.TRIANGLE_STRIP, raw_coordinates_handle, color_handle);
}

function centeredMovingAverage(values, interval) 
{
    if (values.length === 0 || interval > values.length) 
    {
        console.log("centeredMovingAverage can't calculate for values interval", values, interval);
        return [];
        // throw new Error("Invalid input");
    }

    // Preallocate the results array
    let results = new Array(values.length).fill(NaN);

    // Calculate the radius of the interval
    const radius = Math.floor(interval / 2);

    // Iterate over the input array
    for (let i = radius; i < values.length - radius; i++) {
        // Extract a slice of values from the original array
        const slice = values.slice(i - radius, i + radius + 1);
        
        // Calculate the sum of this slice
        const sum = slice.reduce((prev, curr) => prev + curr, 0);
        
        // Calculate and store the average
        results[i] = sum / slice.length;
    }

    return results;
}

// function simpleMovingAverage(values, interval)
// {
//     let index = interval - 1;
//     const length = values.length + 1;
//     let results = [];
  
//     while (index < (length - interval)) 
//     {
//         index = index + 1;
//         const interval_slice = values.slice(index - interval, index);
//         const sum = interval_slice.reduce((prev, curr) => prev + curr, 0);
//         results.push(sum / interval);
//     }
  
//     return results;
// }

// Function to calculate the number of days between two dates
function daysBetweenDates(date1, date2) 
{
    // Convert both dates to UTC to ensure consistent calculation
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(utc2 - utc1);

    // Convert the difference from milliseconds to days
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

// // Example dates
// const date1 = new Date('2023-02-01'); // First date
// const date2 = new Date('2023-02-10'); // Second date

// // Calculate the number of days between the two dates
// const daysDifference = daysBetweenDates(date1, date2);

// console.log("Number of days between the two dates:", daysDifference);

function standardDeviation(array) 
{
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}

function secondDerivateFromPointList(point_list)
{
    let x_list = [];
    let y_list = [];
    
    for (let i = 0; i < point_list.length; i++)
    {
        let point = point_list[i];
        x_list.push(point.x);
        y_list.push(point.y);
    }

    return secondDerivative(x_list, y_list);
}

function secondDerivateFromXYList(point_list, interval)
{  
    let x_list = [];
    let y_list = [];
    
    for (let i = 0; i < point_list.length; i += 2)
    {
        let index = i;
        x_list.push(point_list[index]);
        y_list.push(point_list[index + 1]);
    }

    let x_average_list = centeredMovingAverage(x_list, interval);
    let y_average_list = centeredMovingAverage(y_list, interval);

    let [unused, x_date_list, y_data_list]  = secondDerivative(x_average_list, y_average_list);

    x_average_list = centeredMovingAverage(x_date_list, interval);
    y_average_list = centeredMovingAverage(y_data_list, interval);

    let derivate_list = [];

    for (let i = 1; i < x_average_list.length - 1; i++)
    {
        derivate_list.push(x_average_list[i], y_average_list[i]);
    }

    return [derivate_list, x_average_list, y_average_list];
}

function secondDerivative(x, y) 
{
    // Ensure x and y arrays have the same length
    if (x.length !== y.length) 
    {
        throw new Error('x and y arrays must have the same length');
    }

    const n = x.length;
    const derivative = [];
    const derivative_dates = [];
    const derivative_data = [];

    // Calculate the second derivative using the three-point central difference formula
    for (let i = 1; i < n - 1; i++) 
    {
        const h1 = x[i] - x[i - 1];
        const h2 = x[i + 1] - x[i];
        const h = h1 + h2;
        
        const d1 = (y[i + 1] - y[i]) / h2;
        const d2 = (y[i] - y[i - 1]) / h1;

        derivative.push(x[i]);
        derivative.push(2 * (d1 - d2) / h);
        derivative_dates.push(x[i]);
        derivative_data.push(2 * (d1 - d2) / h);
    }

    return [derivative, derivative_dates, derivative_data];
}

// // Example usage:
// const x = [1, 2, 3, 4, 5];
// const y = [2, 4, 6, 8, 10];

// const secondDerivativeValues = secondDerivative(x, y);
// console.log("Second derivative values:", secondDerivativeValues);

function copyTextToClipboard(text) 
{
    try 
    {
        navigator.clipboard.writeText(text)
        .then(() => { console.log('Text copied to clipboard');  })
        .catch((error) => { console.error('Failed to copy text: ', error); });
    }
    catch
    {
        console.log("copyTextToClipboard failed", text);
    }
}  


// function createGPUTextureArray(img)
// {
//     let data = img.data;
//     let texture_data = [];

//     for (let y = 0; y < img.height; y++) 
//     {
//         texture_data[y] = [];

//         for (let x = 0; x < img.width; x++) 
//         {
//             const index = (y * img.width + x) * 4;
//             const red = data[index] / 255; // Normalize to [0, 1] range
//             const green = data[index + 1] / 255;
//             const blue = data[index + 2] / 255;
//             const alpha = data[index + 3] / 255;
//             texture_data[y][x] = [red, green, blue, alpha]; // Create a 4-component vector
//         }
//     }

//     return texture_data;
// }

function createGPUTextureArray(img)
{
    let data = img.data;
    let texture_data = [];

    for (let y = 0; y < img.height; y++) 
    {
        for (let x = 0; x < img.width; x++) 
        {
            const index = (y * img.width + x) * 4;
            const red = parseInt(data[index]);
            const green = parseInt(data[index + 1]);
            const blue = parseInt(data[index + 2]);
            const alpha = parseInt(data[index + 3]);
            texture_data.push(red);
            texture_data.push(green);
            texture_data.push(blue);
            texture_data.push(alpha);
        }
    }

    return texture_data;
}

function dateStringFromUnformatted(unformatted)
{
    const year = unformatted.slice(0, 4);
    const month = unformatted.slice(4, 6);
    const day = unformatted.slice(6);
    
    return `${month}/${day}/${year}`;
}

function wideLineCoordinates(points, width)
{
    const x0 = points[0];
    const y0 = points[1];
    const x1 = points[2];
    const y1 = points[3];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const length = Math.sqrt((dx * dx) + (dy * dy));
    const sin = dy / length;
    const cos = dx / length;

    let rectangle_coordinates = new Array(8);
    rectangle_coordinates[0] = x0 + (sin * width);
    rectangle_coordinates[1] = y0 - (cos * width);

    rectangle_coordinates[2] = x1 + (sin * width);
    rectangle_coordinates[3] = y1 - (cos * width);

    rectangle_coordinates[4] = x0 - (sin * width);
    rectangle_coordinates[5] = y0 + (cos * width);

    rectangle_coordinates[6] = x1 - (sin * width);
    rectangle_coordinates[7] = y1 + (cos * width);

    return rectangle_coordinates;
}

function yahooFinanceDateToDecimalDate(dateString) 
{
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const start_of_year = new Date(Date.UTC(year, 0, 1));
    const diff = date - start_of_year;
    const ms_in_year = (isLeapYear(year) ? 366 : 365) * 24 * 60 * 60 * 1000;
    
    return year + (diff / ms_in_year);
}

function isLeapYear(year) 
{
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}


function glColorToHexString(color) 
{
    // Convert float values to integers (0-255)
    const ri = Math.round(color.x * 255);
    const gi = Math.round(color.y * 255);
    const bi = Math.round(color.z * 255);
    const ai = Math.round(color.w * 255);
  
    // Convert to hex and ensure two digits
    const rHex = ri.toString(16).padStart(2, '0');
    const gHex = gi.toString(16).padStart(2, '0');
    const bHex = bi.toString(16).padStart(2, '0');
    const aHex = ai.toString(16).padStart(2, '0');
  
    // Return the hex string
    return `#${rHex}${gHex}${bHex}${aHex}`;
  }

  class SortedMap {
    constructor(comparator = (a, b) => a > b ? 1 : -1) {
      this.map = new Map();
      this.comparator = comparator;
    }
  
    set(key, value) {
      this.map.set(key, value);
      this.sort();
    }
  
    get(key) {
      return this.map.get(key);
    }
  
    delete(key) {
      const result = this.map.delete(key);
      this.sort();
      return result;
    }
  
    has(key) {
      return this.map.has(key);
    }
  
    clear() {
      this.map.clear();
    }
  
    sort() {
      this.map = new Map([...this.map.entries()].sort((a, b) => this.comparator(a[0], b[0])));
    }
  
    *[Symbol.iterator]() {
      yield* this.map;
    }
  
    get size() {
      return this.map.size;
    }
  }

  function seriesData(series)
  {
    var graph_index_list;

    let position_buffer = getPositionBuffer(series);
    let index_buffer = getIndexBuffer(series);
    let graph_positions = getPositionArray(series);
    let graph_indices = getIndexArray(series);

    if (series.series_type == GENERIC_SERIES_TYPE)
    {
        graph_index_list = series.graph_index_list;
    }
    else if (series.series_type == TEMPERATURE_STATION_SERIES_TYPE)
    {
        graph_index_list = series.graph_index_list[type_select.value];
    }

    return [position_buffer, index_buffer, graph_positions, graph_indices, graph_index_list];
  }

  function arraysEqual(arr1, arr2) 
  {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) 
    {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  
function fetchStockData(symbol, period) 
{
    symbol = symbol.toUpperCase();
    // const url = `http://your-app-url:8080/fetch-stock?symbol=${encodeURIComponent(symbol)}&period=${encodeURIComponent(period)}`;
    const url = `https://d2tcode.uc.r.appspot.com/fetch-stock?symbol=${encodeURIComponent(symbol)}&period=${encodeURIComponent(period)}`;

    console.log(url);

    fetch(url)
    .then(response => 
    {
        if (!response.ok) 
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => 
    {
        console.log('Stock data:', data);
        // Process your data here
        handleStockData(data, symbol);
    })
    .catch(error => 
    {
        console.error('Error fetching stock data:', error);
    });
}

function handleStockData(data, symbol)
{

    let price_string = "Date," + symbol + " Closing Price\n";
    let percent_string = "Date," + symbol + " Percent Change\n";
    let total_percent_string = "Date," + symbol.split(/\s+/)[0]; + " % Gain\n";
    let first_value = undefined;
    let previous_value = undefined;
    let date_price_map = new Map();

    console.log("handleStockData data", data);

    let date_volume_array = [];
    let date_volume_string = "Date," + symbol + " Volume\n";

    for (let key in data) 
    {
        if (key.includes("Close"))
        {
            let date_price_pairs = data[key];
            // console.log("handleStockData key", key, date_price_pairs);
            for (let [date, value] of Object.entries(date_price_pairs))
            {
                // console.log("handleStockData date, value", date, value);
                let numeric_date = yahooFinanceDateToDecimalDate(date);
                date_price_map.set(date, {close: value});
                // console.log("Close", numeric_date, ",", value);
                price_string += numeric_date + "," + value + "\n";
        
                if (previous_value === undefined)
                {
                    percent_string += numeric_date + "," + "0\n";
                }
                else
                {
                    percent_string += numeric_date + "," + ((value - previous_value) * 100.0) + "\n";
                }
        
                if (first_value === undefined)
                {
                    total_percent_string += numeric_date + "," + "0\n";
                    first_value = value;
                }
                else
                {
                    total_percent_string += numeric_date + "," + ((value - first_value) * 100.0) + "\n";
                }
        
                previous_value = value;
            }
        }
        else if (key.includes("Open"))
        {
            let date_price_pairs = data[key];

            for (let [date, value] of Object.entries(date_price_pairs))
            {
                date_price_map.get(date).open = value;
            }
        }
        else if (key.includes("Low"))
        {
            let date_price_pairs = data[key];

            for (let [date, value] of Object.entries(date_price_pairs))
            {
                date_price_map.get(date).low = value;
            }
        }
        else if (key.includes("High"))
        {
            let date_price_pairs = data[key];

            for (let [date, value] of Object.entries(date_price_pairs))
            {
                date_price_map.get(date).high = value;
            }
        }
        else if (key.includes("Volume"))
        {
            let date_volume_pairs = data[key];

            for (let [date, volume] of Object.entries(date_volume_pairs))
            {
                let numeric_date = yahooFinanceDateToDecimalDate(date);
                date_volume_array.push(numeric_date, volume);
                date_volume_string += numeric_date.toString() + "," + volume.toString() + "\n"
            };
        }
    }

    // for (let [date, value] of Object.entries(data.Close))
    // {
    //     let numeric_date = yahooFinanceDateToDecimalDate(date);
    //     date_price_map.set(date, {close: value});
    //     // console.log("Close", numeric_date, ",", value);
    //     price_string += numeric_date + "," + value + "\n";

    //     if (previous_value === undefined)
    //     {
    //         percent_string += numeric_date + "," + "0\n";
    //     }
    //     else
    //     {
    //         percent_string += numeric_date + "," + ((value - previous_value) * 100.0) + "\n";
    //     }

    //     if (first_value === undefined)
    //     {
    //         total_percent_string += numeric_date + "," + "0\n";
    //         first_value = value;
    //     }
    //     else
    //     {
    //         total_percent_string += numeric_date + "," + ((value - first_value) * 100.0) + "\n";
    //     }

    //     previous_value = value;
    // }

    // for (let [date, value] of Object.entries(data.Open))
    // {
    //     date_price_map.get(date).open = value;
    // }

    // for (let [date, value] of Object.entries(data.Low))
    // {
    //     date_price_map.get(date).low = value;
    // }

    // for (let [date, value] of Object.entries(data.High))
    // {
    //     date_price_map.get(date).high = value;
    // }

    console.log(date_price_map);

    let candlestick = new Candlestick(date_price_map);

    let full_price_string = `Date,${symbol} open,${symbol} close,${symbol} low,${symbol} high\n`;

    for (const [date, values] of date_price_map.entries()) 
    {
        let numeric_date = yahooFinanceDateToDecimalDate(date);
        full_price_string += `${numeric_date},`;
        full_price_string += `${values.open},`;
        full_price_string += `${values.close},`;
        full_price_string += `${values.low},`;
        full_price_string += `${values.high},`;
        full_price_string += "\n";
    }

    console.log("price_string", price_string);
    console.log("percent_string", percent_string);
    console.log("total_percent_string", total_percent_string);

    addSeriesFromTextString(price_string);
    const new_series = g_user_series_list[g_user_series_list.length - 1];
    new_series.candlestick = candlestick;

    // let volume_string = "Date," + symbol + " Volume\n";

    // const date_volume_array = Object.entries(data.Volume).flatMap(([date, volume]) => [
    //     yahooFinanceDateToDecimalDate(date),
    //     volume
    // ]);

    new_series.associated_bar_chart_array = _.cloneDeep(date_volume_array);
    new_series.associated_bar_chart_scaling = GRAPH_BAR_CHART_VERTICAL_PERCENT;

    // console.log("handleStockData date_volume_array", date_volume_array);
    // console.log("new_series.associated_bar_chart_array", new_series.associated_bar_chart_array);
    // createBarChartVertices(date_volume_array, GRAPH_BAR_CHART_VERTICAL_PERCENT);
    
    // volume_string += date_volume_array.reduce((str, val, i) => str + val + (i % 2 ? '\n' : ','), '');
    writeTextFile(symbol + "_volume.csv", date_volume_string);

    document.dispatchEvent(draw_scene_event);
}

function generateStocksCsvFromScreen(visible_data_csv_string)
{
    // console.log("generateStocksCsvFromScreen", visible_data_csv_string);

    let lines = visible_data_csv_string.split("\n");
    // console.log("generateStocksCsvFromScreen", lines);

    while (lines[0].substring(0,1) == "#" || lines[0].length == 0)
    {
        lines.shift();
    }

    let fields = lines[0].split(",");
    let stock_map = new Map();

    for (let i = 1; i < fields.length; i++) 
    {
        let field = fields[i];
        // console.log(field);
        // let stock_name = field.split(" ")[0];
        let stock_name = field;  
        stock_map.set(stock_name, []);
    }

    let stock_keys_list = Array.from(stock_map.keys());

    if (stock_keys_list.length == 0)
    {
        return ["", "", ""];
    }

    for (let i = 1; i < lines.length; i++)
    {
        let fields = lines[i].split(",");
        let date = fields[0];

        for (let j = 1; j < fields.length; j++)
        {
            let value = fields[j];
            let stock_name = stock_keys_list[j-1];
            stock_map.get(stock_name).push(date, value);
        }
    }

    // console.log(stock_map);

    let total_percent_string = "";
    let daily_percent_string = "";
    let running_slope_string = "";

    for (let [symbol, data] of stock_map)
    {
        let first_value = undefined;
        let previous_value = undefined;
        total_percent_string += "Date," + String(symbol.split(/\s+/)[0]) + " % Change\n";
        daily_percent_string += "Date," + String(symbol) + " Daily Percent Change\n";  
        running_slope_string += "Date," + String(symbol) + " Running Slope\n";

        for (let i = 0; i < data.length; i+=2)
        {
            let date = data[i];
            let price = parseFloat(data[i+1]);

            if (first_value === undefined)
            {
                total_percent_string += String(date) + ",0\n";
                first_value = price;
            }
            else
            {
                let percent = (price - first_value) / first_value * 100;
                total_percent_string += String(date) + "," + String(percent) + "\n";
            }

            if (previous_value === undefined)
            {
                daily_percent_string += String(date) + ",0\n";
            }
            else
            {
                let percent = (price - previous_value) / previous_value * 100;
                daily_percent_string += String(date) + "," + String(percent) + "\n";
            }

            previous_value = price;

            const SLOPE_LENGTH = 60;
            let slope_vector = [];

            for (let j = i; j < i + (SLOPE_LENGTH * 2) && j < data.length; j+=2)
            {
                slope_vector.push(parseFloat(data[j]), parseFloat(data[j+1]));
            }

            let [slope, b, y_average, y_sum] = linearRegression(slope_vector);
            running_slope_string += String(date) + "," + String(slope) + "\n";
        }
    }

    return [total_percent_string, daily_percent_string, running_slope_string];
}

function drawStockLabels(series_list)
{
    let label_height = 30;
    
    for (label of stock_labels)
    {
        label.remove();
    }

    stock_labels.length = 0;

    let top = g_main_viewport.height + g_main_viewport_borders.top - label_height - 10;

    for (let i = 0; i < series_list.length; i++)
    {
        let series = series_list[i];
        let name = series.name;

        if (name == "Annual Average")
        {
            continue;
        }

        let color = glColorToHexString(series.color);
        console.log(`Index : ${i} Series name : ${series.name} Color : ${color}`)
        let stock_label = document.createElement("Label");
        stock_label.innerHTML = name;
        stock_label.style.position = "absolute";
        stock_label.style.fontSize = "12px";
        stock_label.style.fontStyle = "bold";
        stock_label.style.font = "12px arial,serif";
        stock_label.style.textAlign = "left";
        stock_label.style.width = "500px";
        stock_label.style.height = `${label_height}px`;
        let left = g_main_viewport.width + g_main_viewport_borders.left + 10;
        stock_label.style.left = `${String(left)}px`;
        stock_label.style.top = `${String(top)}px`;
        stock_label.style.color = color;
        // document.body.appendChild(stock_label);
        ui_container.appendChild(stock_label);
        top -= label_height;
        stock_labels.push(stock_label);
    }
}

class Candlestick
{
    constructor(date_price_map)
    {
        this.low_high_buffer = gl.createBuffer();
        this.red_buffer = gl.createBuffer();
        this.green_buffer = gl.createBuffer();
        this.low_high_vertex_data = [];
        this.red_vertex_data = [];
        this.green_vertex_data = [];

        let number_of_entries = date_price_map.size;

        for (const [date, values] of date_price_map.entries()) 
        {
            let numeric_date = yahooFinanceDateToDecimalDate(date);
            this.low_high_vertex_data.push(numeric_date, Number(values.low.toFixed(4)));
            this.low_high_vertex_data.push(numeric_date, Number(values.high.toFixed(4)));
        }

        loadVertexData(this.low_high_buffer, this.low_high_vertex_data);

        let first_date = this.low_high_vertex_data[0];
        let last_date = this.low_high_vertex_data[this.low_high_vertex_data.length - 2];
        let date_delta = (last_date - first_date) / number_of_entries / 2 * 5/7;

        // console.log(first_date, last_date, number_of_entries, date_delta);

        for (const [date, values] of date_price_map.entries()) 
        {
            let numeric_date = yahooFinanceDateToDecimalDate(date);
            let lower_left = new Vec2(numeric_date - date_delta, Number(values.open.toFixed(4)));
            let lower_right = new Vec2(numeric_date + date_delta, Number(values.open.toFixed(4)));
            let upper_left = new Vec2(numeric_date - date_delta, Number(values.close.toFixed(4)));
            let upper_right = new Vec2(numeric_date + date_delta, Number(values.close.toFixed(4)));
            let vertex_list = this.green_vertex_data;
                            
            if (values.close < values.open)
            {
                vertex_list = this.red_vertex_data;
            }

            vertex_list.push(lower_left.x, lower_left.y);
            vertex_list.push(lower_right.x, lower_right.y);
            vertex_list.push(upper_right.x, upper_right.y);
            vertex_list.push(upper_right.x, upper_right.y);
            vertex_list.push(upper_left.x, upper_left.y);
            vertex_list.push(lower_left.x, lower_left.y);
        }

        loadVertexData(this.red_buffer, this.red_vertex_data);
        loadVertexData(this.green_buffer, this.green_vertex_data);
    }
}

function drawCandlestick(candlestick)
{
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const data_offset = 0;

    let buffer_offset = 0;
    let black = [0.0, 0.0, 0.0, 1.0];
    let red = [1.0, 0.0, 0.0, 1.0];
    let green = [0.0, 1.0, 0.0, 1.0];
    let color_handle = graphing_program_information.uniform_locations.color;

    gl.bindBuffer(gl.ARRAY_BUFFER, candlestick.red_buffer);
    gl.enableVertexAttribArray(graphing_program_information.attribute_locations.raw_coordinates);
    gl.vertexAttribPointer(
        graphing_program_information.attribute_locations.raw_coordinates,
        numComponents,
        type,
        normalize,
        stride,
        data_offset);
    gl.uniform4fv(color_handle, red);
    let vertex_count = candlestick.red_vertex_data.length / 2;
    gl.drawArrays(gl.TRIANGLES, buffer_offset, vertex_count);

    gl.bindBuffer(gl.ARRAY_BUFFER, candlestick.green_buffer);
    gl.vertexAttribPointer(
        graphing_program_information.attribute_locations.raw_coordinates,
        numComponents,
        type,
        normalize,
        stride,
        data_offset);
    gl.uniform4fv(color_handle, green);
    vertex_count = candlestick.green_vertex_data.length / 2;
    gl.drawArrays(gl.TRIANGLES, buffer_offset, vertex_count);

    gl.bindBuffer(gl.ARRAY_BUFFER, candlestick.low_high_buffer);
    gl.vertexAttribPointer(
        graphing_program_information.attribute_locations.raw_coordinates,
        numComponents,
        type,
        normalize,
        stride,
        data_offset);
    
    gl.uniform4fv(color_handle, black);
    vertex_count = candlestick.low_high_vertex_data.length / 2;
    gl.drawArrays(gl.LINES, buffer_offset, vertex_count);

}

function selectTextIfNeeded(input_element) 
{
    let selection_length = input_element.selectionEnd - input_element.selectionStart;

    if (document.activeElement !== input_element || selection_length == 0)
    {
        input_element.select();
    }
    // // Check if the selection is already active in the input
    // if (!isTextSelected(input_element)) 
    // {
    //   // If not, select all text in the input
    //   input_element.select();
    // }
}

function isTextSelected(input_element) 
{
    let selection_length = input_element.selectionEnd - input_element.selectionStart;
    return (selection_length > 0);
}

function getSeriesSelectIndex(series)
{
    let series_option = findKeyByValue(g_option_series_map, series);
    let series_index = optionIndex(series_select, series_option);
    return series_index;
}

function getCallerName() {
    const error = new Error();
    const stack = error.stack.split('\n');
    if (stack.length > 2) {
        // The third line in the stack trace (index 2) represents the caller of this function
        const callerLine = stack[2];
        const callerMatch = callerLine.match(/at (.*?) /);
        return callerMatch ? callerMatch[1] : 'unknown';
    }
    return 'unknown';
}

function calledFunction() {
    const callerName = getCallerName();
    console.log(`Called function: ${calledFunction.name}`);
    console.log(`Calling function: ${callerName}`);
}

function callingFunction() {
    calledFunction();
}

// callingFunction();

function showUnsubscribeModal() {
    document.getElementById('unsubscribeModalOverlay').style.display = 'block';
    document.getElementById('unsubscribeModalOverlay').style.zIndex = "10000000";
}

function hideUnsubscribeModal() {
    document.getElementById('unsubscribeModalOverlay').style.display = 'none';
}

async function handleUnsubscribeConfirm() {
    // Add your unsubscribe logic here
    console.log('User confirmed unsubscribe');
    hideUnsubscribeModal();

    try {
        const user_id = firebase.auth().currentUser.uid;
        const { message, error } = await createCancelSubscriptionSession(user_id);
        
        if (error) {
            console.error(error);
            // Show error message to user
            return;
        }

        console.log("createCancelSubscriptionSession", message);
        let url = "./stripe-unsubscribe-success.html";
        window.location.href = url;
        
        // Show success message or redirect
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function generateStatisticsFromScreen(canvas)
{
    let [visible_data_csv_string, year_daily_average_string] = generateCsvFromScreen(g_minimum, g_maximum);

    canvas.toBlob(copyCanvasToClipboard);

    let [total_percent_string, daily_percent_string, running_slope_string] = generateStocksCsvFromScreen(visible_data_csv_string);
    return [total_percent_string, daily_percent_string, running_slope_string];
}

function compareCaseInsensitive(str1, str2) 
{
    return str1.toLowerCase() === str2.toLowerCase();
}

function parseNumberRange(str) 
{
    // Check if input contains exactly one hyphen
    if ((str.match(/-/g) || []).length !== 1) {
        return false;
    }
    
    const [num1, num2] = str.split('-').map(Number);
    
    // Check if both parts are valid numbers
    if (isNaN(num1) || isNaN(num2)) {
        return false;
    }
    
    return [num1, num2];
}

function containsCaseInsensitiveSubstring(str, substr) 
{
    return str.toLowerCase().includes(substr.toLowerCase());
}

function isNumber(str) 
{
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function createPointListsFromVec3Array(vec_3_array)
{
    const x_point_list = new Array(vec_3_array.length).fill(0); 
    const y_point_list = new Array(vec_3_array.length).fill(0); 
    const x_y_point_list = []; 
    const x_y_z_point_list = []; 

    let index = 0;

    for (let i = 0; i < vec_3_array.length; i++)
    {
        let x = vec_3_array[i].x;
        let y = vec_3_array[i].y;
        let z = vec_3_array[i].z;
        x_point_list[i] = x;
        y_point_list[i] = y;

        x_y_point_list.push(x, y);
        x_y_z_point_list.push(x, y, z)
    }

    return [x_point_list, y_point_list, x_y_point_list, x_y_z_point_list];
}

function createDeltaString()
{
    let previous_value = 0;
    let chart_title = main_title_input.value.replace(/ /g, "_").replace(/,/g, "");
    let delta_string = `Date,${chart_title}_Delta\n`;

    let [visible_count, visible_average, visible_total, visible_point_list, total_count, actual_visible_point_list] = 
            visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);
    
    // console.log(actual_visible_point_list);

    for (let i = 0; i < actual_visible_point_list.length; i++)
    {
        let date = actual_visible_point_list[i].x;
        let value = actual_visible_point_list[i].y;

        // console.log(date, value);
        
        if (i >= 1)
        {
            let delta = value - previous_value;
            delta_string += `${date},${delta}\n`;
        }

        previous_value = value;
    }

    return delta_string;
}

function createRangeString()
{
    let [visible_count, visible_average, visible_total, visible_point_list, total_count, actual_visible_point_list] = 
        visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    const [daily_data_map, yearly_data_map, series_name_list, series_visible_count_map, day_year_data_map, day_year_record_map, year_day_record_count_list] = 
        calculateDetailedStatistics(g_selected_series_list, visible_point_list);  

    console.log("interpretAIQuery visible_point_list, yearly_data_map", visible_point_list, yearly_data_map)

    let chart_title = main_title_input.value.replace(/ /g, "_");
    let year_range_string = `Date,${chart_title}_Range,${chart_title}_Change\n`;
        
    for (const [year, year_data] of yearly_data_map)
    {
        year_range_string += (year + 0.5) + "," + (year_data.maximum - year_data.minimum).toFixed(2);
        year_range_string += "," + (year_data.last_value - year_data.first_value).toFixed(2) + "\n";
    }

    console.log("year_range_string", year_range_string);

    return year_range_string;
}

function convertVec3ToArray(vecData) 
{
    const result = [];
    
    // Extract x and y values from each Vec3 object and add to result array
    for (const key in vecData) {
      const vec = vecData[key];
      result.push(vec.x, vec.y);
    }
    
    return result;
}
  

function createSumByDateString()
{
    let [visible_count, visible_average, visible_total, visible_point_list, total_count, actual_visible_point_list, year_count_map] = 
        visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    let visible_point_array = convertVec3ToArray(visible_point_list);
    let result_array = sumValuesByDate(visible_point_array);

    let chart_title = main_title_input.value.replace(/ /g, "_");
    let day_total_string = `Date,${chart_title}_Total\n`;

    for (let i = 0; i < result_array.length; i += 2)
    {
        let date_string = result_array[i].toString();
        let total_string = result_array[i + 1].toString();
        day_total_string +=  + date_string + "," + total_string + "\n";
    }

    return day_total_string;
}

let microphone_timeout_id;

function triggerMicrophone() 
{
    clearTimeout(microphone_timeout_id); // Clear any existing timeout
    microphone_timeout_id = setTimeout(() => {
        chatToggleMicrophone(); // Call your function after 500ms of no further triggers
    }, 500);
}

let lastToggleTime = 0;
const COOLDOWN_MS = 500;

function toggleMicrophoneWithCooldown() {
  const currentTime = Date.now();
  
  // Check if enough time has passed since the last toggle
  if (currentTime - lastToggleTime >= COOLDOWN_MS) {
    // Update the last toggle time
    lastToggleTime = currentTime;
    
    // Perform the actual microphone toggle
    chatToggleMicrophone();
  }
}

let isFirstToggle = true;

function smartToggleMicrophone() 
{
    if (isFirstToggle) 
    {
        chatToggleMicrophone();
        isFirstToggle = false;
    }
    else
    {
        setTimeout(() => 
        {
            chatToggleMicrophone();
            isFirstToggle = true;
        }, COOLDOWN_MS);
    }
}


function rankSeriesByAverageValue(forward_reverse = "forward")
{
    let unsorted_map = new Map();

    if (getGraphingMode() == GRAPHING_MODE_TIME_SERIES)
    {
        for (let i = 0; i < g_selected_series_list.length; i++)
        {
            let series = g_selected_series_list[i];
            let [visible_count, visible_average, visible_total, visible_point_list, total_count, actual_visible_point_list, year_count_map] = 
                visiblePointList(g_main_viewport, [series], g_scale, g_offset, g_minimum, g_maximum);
            let visible_point_array = convertVec3ToArray(visible_point_list);
    
            let sum = 0.0;
    
            for (let j = 1; j < visible_point_array.length; j+=2)
            {
                sum += visible_point_array[j];
            }
    
            let average = sum / visible_point_array.length;
            unsorted_map.set(series, average)
        }
    
        const sorted_map = new Map([...unsorted_map].sort((a, b) => b[1] - a[1]));
        const sorted_array = Array.from(sorted_map.entries());
    
        const reverse_sorted_map = new Map([...unsorted_map].sort((a, b) => a[1] - b[1]));
        const reverse_sorted_array = Array.from(reverse_sorted_map.entries());
    
        console.log("rankSeriesByAverageValue\n", sorted_array);
    
        series_select.length = 0;
        let used_array = forward_reverse == "Forward" ? sorted_array : reverse_sorted_array;
    
        for (let i = 0; i < used_array.length; i++)
        {
            let series = sorted_array[i][0];
            let option = series.option;
            series_select.appendChild(option);
        }
    
        updateSelectedSeriesList();
        drawGraph();
    }
    else if (getGraphingMode() == GRAPHING_MODE_CHARTS)
    {
        if (forward_reverse == "Forward")
        {
            g_chart_data.sort((a, b) => b.value - a.value);
        }
        else
        {
            g_chart_data.sort((a, b) => a.value - b.value);
        }
        drawCharts();
    }

}

function createYearlyCountString()
{
    let [visible_count, visible_average, visible_total, visible_point_list, total_count, actual_visible_point_list, year_count_map] = 
        visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    const [daily_data_map, yearly_data_map, series_name_list, series_visible_count_map, day_year_data_map, day_year_record_map, year_day_record_count_list] = 
        calculateDetailedStatistics(g_selected_series_list, visible_point_list);  

    console.log("createYearlyCountString visible_point_list, yearly_data_map", visible_point_list, yearly_data_map)

    // let chart_title = main_title_input.value.replace(/ /g, "_");
    let name = series_select[series_select.selectedIndex].text.slice(0, 10);
    let year_count_string = `Date,${name} Count,${name} Percent\n`;
        
    for (const [year, year_data] of yearly_data_map)
    {
        year_count_string += (year + 0.5) + "," + year_data.count.toString();
        let percent = year_data.count / year_count_map.get(year) * 100;
        year_count_string += `,${percent}\n`;
    }

    console.log("year_count_string", year_count_string);

    return year_count_string;
}

function decimalDateToMonthDay(decimalDate) 
{
    // Extract year and fractional part
    const year = Math.floor(decimalDate);
    const fraction = decimalDate - year;
    
    // Calculate total days in the year (account for leap year)
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const daysInYear = isLeapYear ? 366 : 365;
    
    // Convert fraction to day of year
    let dayOfYear = Math.round(fraction * daysInYear);
    
    // Create a date object starting at Jan 1 of the year
    const date = new Date(year, 0, 1);
    
    // Add the calculated days
    date.setDate(date.getDate() + dayOfYear);
    
    // Get month name and day
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    
    return `${month}-${day}`;
}

function createYearlyRecordCountString(series_list)
{
    let [visible_count, visible_average, visible_total, visible_point_list, total_count, actual_visible_point_list, year_count_map] = 
        visiblePointList(g_main_viewport, g_selected_series_list, g_scale, g_offset, g_minimum, g_maximum);

    let [x_list, y_list, x_y_list, x_y_z_list] = createPointListsFromVec3Array(g_visible_point_list);

    console.log("createYearlyRecordCountString visible_point_list\n", visible_point_list);

    let current_date = Number.MAX_SAFE_INTEGER;
    let current_maximum = Number.MIN_SAFE_INTEGER;
    let current_minimum = Number.MAX_SAFE_INTEGER;
    let current_maximum_date = Number.MIN_SAFE_INTEGER;
    let current_minimum_date = Number.MIN_SAFE_INTEGER;
    let current_series_index = -1;
    let series = null;
    let current_year = Number.MIN_SAFE_INTEGER;
    let current_year_total = 0;
    let current_year_count = 0;
    let MISSING_NUMBER = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < series_list.length; i++)
    {
        let series = series_list[i];
        series.year_visible_average_map = new Map();
    }

    for (let j = 0; j < x_y_z_list.length; j += 3)
    {
        let date = x_y_z_list[j];
        let day_of_year = GraphingUtilities.dayOfYear(date) - 1;
        let value = x_y_z_list[j+1];
        let series_index = x_y_z_list[j+2]
        let year = parseInt(date);
        series = series_list[series_index];
        
        if (series_index != current_series_index)
        {
            // New series
            series.date_maximum_array = Array(366).fill().map(() => ({year: Number.MIN_SAFE_INTEGER, value: Number.MIN_SAFE_INTEGER}));
            series.date_minimum_array = Array(366).fill().map(() => ({year: Number.MIN_SAFE_INTEGER, value: Number.MAX_SAFE_INTEGER}));

            if (current_series_index >= 0)
            {
                let series = series_list[current_series_index];

                console.log("createYearlyRecordCountString", series.name, current_maximum, 
                            convertNumericDateToString(current_maximum_date)[0], current_minimum, convertNumericDateToString(current_minimum_date)[0]);
                series.visible_maximum = current_maximum;
                series.visible_maximum_date = current_maximum_date;
                series.visible_minimum = current_minimum;
                series.visible_minimum_date = current_minimum_date; 
                let average = current_year_count >= 350 ? current_year_total / current_year_count : MISSING_NUMBER;
                series.year_visible_average_map.set(current_year, average);

                current_maximum = Number.MIN_SAFE_INTEGER;
                current_minimum = Number.MAX_SAFE_INTEGER;
                current_maximum_date = Number.MIN_SAFE_INTEGER;
                current_minimum_date = Number.MIN_SAFE_INTEGER;
                current_year = year;
                current_year_total = value;
                current_year_count = 1;
            }

            current_series_index = series_index;
        }

        if (year != current_year)
        {
            let average = current_year_count >= 350 ? current_year_total / current_year_count : MISSING_NUMBER;
            series.year_visible_average_map.set(current_year, average);
            current_year_total = value;
            current_year_count = 1;
            current_year = year;
        }
        else
        {
            current_year_total += value;
            current_year_count++;
        }

        if (value > current_maximum)
        {
            current_maximum = value;
            current_maximum_date = date;
        }
  
        if (value < current_minimum)
        {
            current_minimum = value;
            current_minimum_date = date;
        }

        if (value > series.date_maximum_array[day_of_year].value)
        {
            series.date_maximum_array[day_of_year].value = value;
            series.date_maximum_array[day_of_year].year = year
        }
    
        if (value < series.date_minimum_array[day_of_year].value)
        {
            series.date_minimum_array[day_of_year].value = value;
            series.date_minimum_array[day_of_year].year = year
        }
    }

    console.log("createYearlyRecordCountString", series.name, current_maximum, 
                 convertNumericDateToString(current_maximum_date)[0], current_minimum, convertNumericDateToString(current_minimum_date)[0]); 
    series.visible_maximum = current_maximum;
    series.visible_maximum_date = current_maximum_date;
    series.visible_minimum = current_minimum;
    series.visible_minimum_date = current_minimum_date;
    let average = current_year_count >= 350 ? current_year_total / current_year_count : MISSING_NUMBER;
    series.year_visible_average_map.set(current_year, average);

    let corners = screenCorners(g_main_viewport, g_scale, g_offset, g_minimum, g_maximum);

    let first_year = parseInt(corners[0].x);
    let last_year = parseInt(corners[1].x);
    let year_range = last_year - first_year;

    let record_highs_per_year_array = Array(year_range).fill(0);
    let record_daily_highs_per_year_array = Array(year_range).fill(0);
    let record_lows_per_year_array = Array(year_range).fill(0);
    let record_daily_lows_per_year_array = Array(year_range).fill(0);


    for (let j = 0; j < series_list.length; j++)
    {
        let series = series_list[j];
        let record_high_year = parseInt(series.visible_maximum_date);
        let offset = record_high_year - first_year;
        record_highs_per_year_array[offset] ++;
        let record_low_year = parseInt(series.visible_minimum_date);
        offset = record_low_year - first_year;
        record_lows_per_year_array[offset]++;

        for (let day_of_year = 0; day_of_year < 366; day_of_year++)
        {
            let record_year = series.date_maximum_array[day_of_year].year;
            let offset = record_year - first_year;
            record_daily_highs_per_year_array[offset]++;

            record_year = series.date_minimum_array[day_of_year].year;
            offset = record_year - first_year;
            record_daily_lows_per_year_array[offset]++;
        }

        console.log("createYearlyRecordCountString year_visible_average_map\n", series.name, series.year_visible_average_map);
    }

    console.log("createYearlyRecordCountString record_highs_per_year_array, record_lows_per_year_array\n", record_highs_per_year_array, record_lows_per_year_array );
    console.log("createYearlyRecordCountString record_daily_highs_per_year_array, record_daily_lows_per_year_array\n", record_daily_highs_per_year_array, record_daily_lows_per_year_array );

    let record_series_string = "Year, Yearly Maximum Records\n";
    for (let i = 0; i < year_range; i++)
    {
        let year = first_year + i;
        record_series_string += year.toString() + "," + record_highs_per_year_array[i].toString() + "\n";
    }

    record_series_string += "Year, Yearly Minimum Records\n";
    for (let i = 0; i < year_range; i++)
    {
        let year = first_year + i;
        record_series_string += year.toString() + "," + record_lows_per_year_array[i].toString() + "\n";
    }

    record_series_string += "Year, Daily Maximum Records\n";
    for (let i = 0; i < year_range; i++)
    {
        let year = first_year + i;
        record_series_string += year.toString() + "," + record_daily_highs_per_year_array[i].toString() + "\n";
    }

    record_series_string += "Year, Daily Minimum Records\n";
    for (let i = 0; i < year_range; i++)
    {
        let year = first_year + i;
        record_series_string += year.toString() + "," + record_daily_lows_per_year_array[i].toString() + "\n";
    }


    // console.log("createYearlyRecordCountString record_series_string", record_series_string);

    return record_series_string;

    // console.log("createYearlyRecordCountString series_annual_maximum_map\n", series_annual_maximum_map); 
    // console.log("createYearlyRecordCountString series_date_maximum_map series_date_minimum_map\n", series_date_maximum_map, series_date_minimum_map); 

    // const [daily_data_map, yearly_data_map, series_name_list, series_visible_count_map, day_year_data_map, day_year_record_map, year_day_record_count_list] = 
    //     calculateDetailedStatistics(g_selected_series_list, visible_point_list);  

    // console.log("createYearlyCountString visible_point_list, yearly_data_map", visible_point_list, yearly_data_map)

    // // let chart_title = main_title_input.value.replace(/ /g, "_");
    // let name = series_select[series_select.selectedIndex].text.slice(0, 10);
    // let year_count_string = `Date,${name} Count,${name} Percent\n`;
        
    // for (const [year, year_data] of yearly_data_map)
    // {
    //     year_count_string += (year + 0.5) + "," + year_data.count.toString();
    //     let percent = year_data.count / year_count_map.get(year) * 100;
    //     year_count_string += `,${percent}\n`;
    // }

    // console.log("year_count_string", year_count_string);

    // return year_count_string;
}

function stringIsInteger(str)
{
    // Check if both inputs are strings
    if (typeof str !== 'string') 
    {
        return false;
    }
    
    // Regular expression to match integers (including negative numbers)
    const integerPattern = /^-?\d+$/;
    
    // Test both strings against the pattern
    return integerPattern.test(str);
}

function filterRequiredRange(target_string)
{
    console.log("filterRequiredRange", target_string);
    let delimeter = ":";

    if (target_string.includes(delimeter))
    {
        let required_first_year = target_string.split(delimeter)[0];
        let required_last_year = target_string.split(delimeter)[1];

        if (stringIsInteger(required_first_year) && stringIsInteger(required_last_year))
        {
            console.log("filterRequiredRange", required_first_year, required_last_year);
        }

        for (series of g_selected_series_list)
        {
            let [series_start, series_end] = getSeriesStartEndDates(series);
            let option = findKeyByValue(g_option_series_map, series);

            if (parseInt(series_start) <= parseInt(required_first_year) && parseInt(series_end) >= parseInt(required_last_year))
            {
                console.log("filterRequiredRange", series.name, series_start, series_end, typeof(series_start), typeof(series_end));
                selectOption(option);
            }
            else
            {
                deselectOption(option);
            }
        }

        updateSelectedSeriesList();
    }
}


function handleLabelContainerNavigation(event) 
{
    const scrollAmount = SCROLL_LABEL_HEIGHT + (SCROLL_LABEL_MARGIN * 2);
    let selectedIndex = series_select.selectedIndex;

    // Determine direction
    let step = event.key === "ArrowUp" ? -1 : 1;

    if (getGraphingMode() == GRAPHING_MODE_TIME_SERIES)
    {
        // Navigate through options
        do {
            selectedIndex += step;

            if (selectedIndex < 0 || selectedIndex >= series_select.length)
            {
                return;
            }

            const option = series_select[selectedIndex];
            if (!optionIsSelected(option)) continue;
            
            break; // Stop navigating once we find a valid option
        } while ((step === -1 && selectedIndex >= 0) || (step === 1 && selectedIndex < series_select.length));

        // Ensure index is within bounds
        if (selectedIndex < 0 || selectedIndex >= series_select.length) return;

        // Update selection and perform actions
        series_select.selectedIndex = selectedIndex;
        
        const selectedOption = series_select[selectedIndex];
        if (g_option_series_map.has(selectedOption)) {
            // g_series_to_highlight = option_series_map.get(selectedOption);
            setHighlightedSeries(g_option_series_map.get(selectedOption));
            updateSelectedSeriesStatistics();
            
            // Only scroll if necessary
            if ((event.key === "ArrowUp" && scroll_container.scrollTop > 0) ||
                (event.key === "ArrowDown" && scroll_container.scrollTop < scroll_container.scrollHeight - scroll_container.offsetHeight)) {
                if (event.key === "ArrowUp") {
                    scroll_container.scrollTop -= scrollAmount;
                } else if (event.key === "ArrowDown") {
                    scroll_container.scrollTop += scrollAmount;
                }
            }
            
            mouse_moved = false;
            document.dispatchEvent(draw_scene_event);
        }
    }
    else 
    {
        if (step == 1 && g_chart_highlighted_index < g_chart_data.length - 1)
        {
            g_chart_highlighted_index++;
        }
        else if (step == -1 && g_chart_highlighted_index > 0)
        {
            g_chart_highlighted_index--;
        }
        else
        {
            return;
        }

        drawCharts();
    }
}

function showDisappearingAlert(time, color, message) 
{
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '40%';
    alertBox.style.left = '40%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.padding = '20px';
    alertBox.style.borderRadius = '10px';
    alertBox.style.backgroundColor = color;
    alertBox.style.color = '#ffffff'; // white
    if (color === '#ffffff' || color === 'white') {
      alertBox.style.color = '#000000'; // black
    }
    document.body.appendChild(alertBox);
  
    setTimeout(() => {
      document.body.removeChild(alertBox);
    }, time); // remove after specified time
}

function removeNaNLines(text) 
{
    return text.split('\n')
               .filter(line => !line.includes('NaN'))
               .join('\n');
}

function convertWhitespaceToUnderscore(str) {
    // Replace all types of whitespace with an underscore
    return str.replace(/\s+/g, '_');
}

async function createGoogleMap() {
    // Default coordinates (New York)
    let latitude = 40.7128;
    let longitude = -74.0060;
    
    // try {
    //     // Wait for location before creating map
    //     const location = await getClientLocation();
    //     latitude = location.latitude;
    //     longitude = location.longitude;
    // } catch (error) {
    //     console.error('Using default location:', error.message);
    // }

    // Map options
    const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    };

    let google_map_container = document.getElementById('google_map_container');
    // google_map_container.style.height = (canvas2D_2.offsetHeight + canvas2D_4.offsetHeight).toString() + "px";
    // Create the map instance
    g_google_map = new google.maps.Map(
        google_map_container,
        mapOptions
    );

    // // Add a marker at the current location
    // const marker = new google.maps.Marker({
    //     position: mapOptions.center,
    //     map: google_map,
    //     title: 'Current Location'
    // });

    // return google_map; // Return the map instance for further use if needed
}

// Usage:
// createGoogleMap().then(map => {
//     // Map is ready and centered on client location
//     // You can add additional map features here
// });
// Load the Google Maps script
async function loadGoogleMapsScript() 
{
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCVBQ2UJLDUuSmp5VLqSo54rH_Q7RBSN8o&callback=createGoogleMap&libraries=geometry';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

function setSetGoogleMapType(map, type) {
    // Validate map instance
    if (!(map instanceof google.maps.Map)) {
        console.error('Invalid map instance provided');
        return;
    }

    // Available map types
    const validTypes = {
        'roadmap': google.maps.MapTypeId.ROADMAP,
        'satellite': google.maps.MapTypeId.SATELLITE,
        'hybrid': google.maps.MapTypeId.HYBRID,
        'terrain': google.maps.MapTypeId.TERRAIN
    };

    // Get the proper map type ID
    const mapTypeId = validTypes[type.toLowerCase()] || google.maps.MapTypeId.ROADMAP;

    // Set the map type
    map.setMapTypeId(mapTypeId);
}

// Usage examples:
// setMapType(g_google_map, 'satellite');
// setMapType(g_google_map, 'hybrid');
// setMapType(g_google_map, 'terrain');
// setMapType(g_google_map, 'roadmap');

function setGoogleMapCenter(latitude, longitude, marker_name)
{
    if (g_google_map.getStreetView().getVisible()) 
    {
        g_google_map.getStreetView().setVisible(false);
    }

    g_google_map.setCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    g_google_map.setZoom(17);
    setSetGoogleMapType(g_google_map, "hybrid");

    // g_google_map.setMapTypeId('satellite');

    // addGoogleMapMarker(latitude, longitude, marker_name)
}

const getClientLocation = () => {
    return new Promise((resolve, reject) => {
      // Check if geolocation is supported by the browser
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser")
        // console.log('Geolocation is not supported by your browser'));
        return;
      }
  
      // Request location
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy // in meters
          });
        },
        // Error callback
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log('User denied the request for geolocation');
              break;
            case error.POSITION_UNAVAILABLE:
              console.log('Location information is unavailable');
              break;
            case error.TIMEOUT:
              console.log('The request to get user location timed out');
              break;
            default:
              console.log('An unknown error occurred');
          }
        },
        // Options
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 5000,           // Wait 5 seconds before timing out
          maximumAge: 0            // Don't use cached position
        }
      );
    });
};

function addGoogleMapMarker(latitude, longitude, marker_name, scale = 7)
{
    // console.log("addGoogleMapMarker google google.maps", google, google.maps);
    if (google === undefined || google.maps === undefined)
    {
        console.error("addGoogleMapMarker google google.maps", google, google.maps);
        return;
    }

    // g_google_map.setMapTypeId('satellite');
    setSetGoogleMapType(g_google_map, "hybrid");


    let lat_lon = new google.maps.LatLng(latitude, longitude);
    let new_google_map_marker = new google.maps.Marker({
            position: lat_lon,
            map: g_google_map,
            title: marker_name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,  // or use a custom image
                scale: scale,
                fillColor: "#FFFF00",
                fillOpacity: 1,
                strokeWeight: 1,
                labelOrigin: new google.maps.Point(0, 2)  // x: 0 (centered), y: 8 (below)
            },
            label: {
                text: marker_name,
                color: "#FFFF00",
                fontSize: "18px",
                fontWeight: "bold"
            }
        });

    new_google_map_marker.setMap(g_google_map);
    g_google_map_marker_list.push(new_google_map_marker);
    // console.log("addGoogleMapMarker google_map_marker_list", g_google_map_marker_list);
    return new_google_map_marker;
}


/**
 * Removes a single marker from the Google Map.
 * @param {google.maps.Marker} marker - The marker to remove.
 */
function removeGoogleMapMarker(marker) {
    if (marker && marker instanceof google.maps.Marker) {
        marker.setMap(null);
    } else {
        console.error('Invalid marker provided to removeGoogleMapMarker');
    }
}

/**
 * Clears all markers from the Google Map.
 * @param {Array} google_map_marker_list - The array containing all markers to be removed.
 */
function clearAllGoogleMapMarkers(marker_list) {
    if (Array.isArray(marker_list)) {
        for (let marker of marker_list) {
            removeGoogleMapMarker(marker);
        }
        // Clear the array after removing all markers
        marker_list.length = 0;
    } else {
        console.error('marker_list is not an array');
    }
}

  
// /**
//  * Calculates the center and zoom level for a Google Map to fit all given markers.
//  * @param {Array} markers - List of Google Map markers.
//  * @returns {Object} An object containing the center (LatLng) and zoom level (number).
//  */
// function fitMapToMarkers(markers) {
//     if (markers.length === 0) {
//         console.error('No markers provided to fitMapToMarkers');
//         return { center: null, zoom: null };
//     }

//     // Create a new bounds object
//     let bounds = new google.maps.LatLngBounds();

//     // Extend the bounds to include each marker's position
//     for (let marker of markers) {
//         if (marker instanceof google.maps.Marker) {
//             bounds.extend(marker.getPosition());
//         } else {
//             console.error('Invalid marker in list', marker);
//         }
//     }

//     // Calculate center
//     let center = bounds.getCenter();

//     // Calculate zoom
//     // Here we use the map's fitBounds method to get the zoom level. 
//     // We need to create a temporary map instance for this calculation.
//     let tempMap = new google.maps.Map(document.createElement('div'), { zoom: 1 });
//     tempMap.fitBounds(bounds);
//     let zoom = tempMap.getZoom();

//     tempMap = null;

//     return { center: center, zoom: zoom };
// }

function fitMapToMarkers(markers, map = null) {
    if (!Array.isArray(markers) || markers.length === 0) {
        console.error('No valid markers provided to fitMapToMarkers');
        return { center: null, zoom: null };
    }

    // Create a new bounds object
    const bounds = new google.maps.LatLngBounds();
    let validMarkerCount = 0;

    // Extend the bounds to include each marker's position
    for (const marker of markers) {
        if (marker instanceof google.maps.Marker) {
            bounds.extend(marker.getPosition());
            validMarkerCount++;
        } else {
            console.warn('Invalid marker in list:', marker);
        }
    }

    if (validMarkerCount === 0) {
        console.error('No valid markers found in the provided list');
        return { center: null, zoom: null };
    }

    // If a map instance is provided, use it to fit bounds
    if (map instanceof google.maps.Map) {
        map.fitBounds(bounds);
        return {
            center: bounds.getCenter(),
            zoom: map.getZoom()
        };
    }

    // If no map provided, calculate approximate zoom based on bounds
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;

    function latRad(lat) {
        const sin = Math.sin(lat * Math.PI / 180);
        const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        // Add 1 to the calculated zoom to get a tighter fit
        return Math.floor(Math.log2(mapPx / worldPx / fraction)) + 1;
    }

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;
    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    const latZoom = zoom(400, WORLD_DIM.height, latFraction);
    const lngZoom = zoom(400, WORLD_DIM.width, lngFraction);

    return {
        center: bounds.getCenter(),
        zoom: Math.min(Math.min(latZoom, lngZoom), ZOOM_MAX)
    };
}

// Usage examples:
// 
// 1. With an existing map instance:
// const boundsData = fitMapToMarkers(markers, myGoogleMap);
// 
// 2. Without a map (just calculate bounds):
// const boundsData = fitMapToMarkers(markers);
// myGoogleMap.setCenter(boundsData.center);
// myGoogleMap.setZoom(boundsData.zoom);

function findGoogleMapMarkerByCoordinates(markers, latitude, longitude, tolerance = 0.0001) {
    if (!Array.isArray(markers) || markers.length === 0) {
        return null;
    }

    // Convert input coordinates to numbers to ensure proper comparison
    const targetLat = Number(latitude);
    const targetLng = Number(longitude);

    if (isNaN(targetLat) || isNaN(targetLng)) {
        console.error('Invalid coordinates provided');
        return null;
    }

    for (const marker of markers) {
        if (!(marker instanceof google.maps.Marker)) {
            continue;
        }

        const position = marker.getPosition();
        const markerLat = position.lat();
        const markerLng = position.lng();

        // Check if coordinates match within tolerance
        // Using tolerance because floating point exact equality is unreliable
        if (Math.abs(markerLat - targetLat) <= tolerance && 
            Math.abs(markerLng - targetLng) <= tolerance) {
            return marker;
        }
    }

    return null;
}

// Usage example:
// const foundMarker = findMarkerByCoordinates(markersList, 40.7128, -74.0060);
// if (foundMarker) {
//     foundMarker.setIcon('highlighted-icon.png');
// }

function updateGoogleMapMarkerColors(markers, targetMarker) {
    if (!Array.isArray(markers) || markers.length === 0) {
        console.error('Invalid or empty markers array');
        return;
    }

    if (!(targetMarker instanceof google.maps.Marker)) {
        console.error('Invalid target marker');
        return;
    }

    for (const marker of markers) {
        if (!(marker instanceof google.maps.Marker)) {
            continue;
        }

        const isTarget = marker === targetMarker;
        const fillColor = isTarget ? '#FF0000' : '#FFFF00';
        
        // Update marker icon
        const icon = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: fillColor,
            fillOpacity: 1.0,
            strokeWeight: 1,
            strokeColor: '#000000',
            scale: 8,
            labelOrigin: new google.maps.Point(0, 2)
        };

        // Get current label and preserve all its properties except color
        const currentLabel = marker.getLabel();
        marker.setIcon(icon);
        marker.setLabel({
            ...currentLabel,
            color: fillColor
        });
    }
}

// Usage example:
// updateMarkerColors(markersList, selectedMarker);

function addLabelClickHandler(marker, callback) {
    // Get the label element and add a click listener
    google.maps.event.addListener(marker, 'click', function(event) {
        const position = marker.getPosition();
        callback({
            lat: position.lat(),
            lng: position.lng()
        });
    });
}

function onGoogleMapChartLabelClick(coords) 
{
    console.log("onGoogleMapChartLabelClick");
}

function onGoogleMapSeriesLabelClick(coords) 
{
    console.log('Label clicked at:', coords.lat, coords.lng);
    const all_series_array = Array.from(g_option_series_map.values());
    console.log("onGoogleMapLabelClick all_series_array", all_series_array);

    let clicked_series = findSeriesByCoordinates(all_series_array, coords.lat, coords.lng);
    console.log("onGoogleMapLabelClick", clicked_series);

    if (clicked_series !== null)
    {
        g_series_to_highlight = null;
        let option_index = getSeriesSelectIndex(clicked_series);
        series_select.selectedIndex = option_index;
        g_dont_deselect_anything = true;
        seriesSelectClicked();
        g_dont_deselect_anything = false;
        console.log("onGoogleMapLabelClick setting highlighted series", clicked_series.name);
        selectOption(series_select[option_index]);
        updateSelectedSeriesList();
        setHighlightedSeries(clicked_series);
        let scroll_container = document.getElementById("scroll_container");
        centerScrollingContainer(scroll_container, option_index);
        document.dispatchEvent(draw_scene_event);
    }
}
//
// For a single marker:
// addLabelClickHandler(marker, onGoogleMapLabelClick);
//
// For multiple markers:
// markers.forEach(marker => addLabelClickHandler(marker, onGoogleMapLabelClick));

function findSeriesByCoordinates(series_list, latitude, longitude, tolerance = 0.0001) {
    if (!Array.isArray(series_list) || series_list.length === 0) {
        return null;
    }

    // Convert input coordinates to numbers to ensure proper comparison
    const target_latitude = Number(latitude);
    const target_longitude = Number(longitude);

    if (isNaN(target_latitude) || isNaN(target_longitude)) {
        console.error('Invalid coordinates provided');
        return null;
    }

    for (const series of series_list) {
        // if (!(marker instanceof google.maps.Marker)) {
        //     continue;
        // }

        // Check if coordinates match within tolerance
        // Using tolerance because floating point exact equality is unreliable
        if (Math.abs(Number(series.latitude) - target_latitude) <= tolerance && 
            Math.abs(Number(series.longitude) - target_longitude) <= tolerance) {
            return series;
        }
    }

    return null;
}

// ------------------------------Normalization ---------------------------------

/**
 * Normalize a single time series with interleaved date-value pairs
 * @param {Array} series - Time series as [date1, value1, date2, value2, ...]
 * @param {Object} options - Normalization options
 * @param {string} [options.method='minmax'] - Normalization method: 'minmax', 'zscore', 'robust', or 'decimal'
 * @param {number} [options.targetMin=0] - Target minimum value for normalized data
 * @param {number} [options.targetMax=1] - Target maximum value for normalized data
 * @returns {Array} Normalized series in same format: [date1, normalizedValue1, date2, normalizedValue2, ...]
 */
function normalizeTimeseries(series, options = {}) {
    const {
        method = 'minmax',
        targetMin = 0,
        targetMax = 1
    } = options;

    if (targetMin >= targetMax) {
        throw new Error('targetMin must be less than targetMax');
    }

    // Helper functions for array operations
    const min = arr => Math.min(...arr);
    const max = arr => Math.max(...arr);
    const mean = arr => arr.reduce((sum, val) => sum + val, 0) / arr.length;
    const std = arr => {
        const mu = mean(arr);
        const variance = arr.reduce((sum, val) => sum + Math.pow(val - mu, 2), 0) / arr.length;
        return Math.sqrt(variance);
    };
    const percentile = (arr, p) => {
        const sorted = [...arr].sort((a, b) => a - b);
        const index = (p / 100) * (sorted.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        const weight = index % 1;
        
        if (upper === lower) return sorted[index];
        return sorted[lower] * (1 - weight) + sorted[upper] * weight;
    };

    // Function to rescale normalized values to target range
    const rescale = (value, currentMin, currentMax) => {
        return (value - currentMin) * (targetMax - targetMin) / (currentMax - currentMin) + targetMin;
    };

    // Input validation
    if (!Array.isArray(series)) {
        throw new Error('Input must be an array');
    }
    if (series.length % 2 !== 0) {
        throw new Error('Series must have even length (date-value pairs)');
    }

    // Extract values (every second element)
    const values = series.filter((_, i) => i % 2 === 1);
    
    // Normalize values based on selected method
    let normalizedValues;

    switch (method) {
        case 'minmax':
            const minVal = min(values);
            const maxVal = max(values);
            normalizedValues = values.map(x => 
                rescale((x - minVal) / (maxVal - minVal), 0, 1)
            );
            break;

        case 'zscore':
            const seriesMean = mean(values);
            const seriesStd = std(values);
            const zScores = values.map(x => (x - seriesMean) / seriesStd);
            // Rescale z-scores to target range
            const zMin = min(zScores);
            const zMax = max(zScores);
            normalizedValues = zScores.map(z => rescale(z, zMin, zMax));
            break;

        case 'robust':
            const seriesMedian = percentile(values, 50);
            const seriesIqr = percentile(values, 75) - percentile(values, 25);
            const robustScores = values.map(x => (x - seriesMedian) / seriesIqr);
            // Rescale robust scores to target range
            const rMin = min(robustScores);
            const rMax = max(robustScores);
            normalizedValues = robustScores.map(r => rescale(r, rMin, rMax));
            break;

        case 'decimal':
            const scale = Math.pow(10, Math.floor(Math.log10(max(values.map(Math.abs)))));
            const decimalScores = values.map(x => x / scale);
            // Rescale decimal scores to target range
            const dMin = min(decimalScores);
            const dMax = max(decimalScores);
            normalizedValues = decimalScores.map(d => rescale(d, dMin, dMax));
            break;

        default:
            throw new Error(`Unknown normalization method: ${method}`);
    }

    // Pre-allocate and fill result array
    const result = new Array(series.length);
    for (let i = 0; i < series.length; i += 2) {
        result[i] = series[i];                   // date
        result[i + 1] = normalizedValues[i / 2]; // normalized value
    }

    return result;
}

// // Example usage:
// const timeSeries = [
//     '2024-01-01', 100,
//     '2024-01-02', 120,
//     '2024-01-03', 140,
//     '2024-01-04', 160,
//     '2024-01-05', 180
// ];

// // Example with different target ranges
// const examples = [
//     { method: 'minmax', targetMin: 0, targetMax: 1 },
//     { method: 'minmax', targetMin: -1, targetMax: 1 },
//     { method: 'minmax', targetMin: 0, targetMax: 100 }
// ];

// examples.forEach(options => {
//     console.log(`\nNormalization method: ${options.method}`);
//     console.log(`Target range: [${options.targetMin}, ${options.targetMax}]`);
//     const result = normalizeTimeseries(timeSeries, options);
//     console.log('Original series:', timeSeries);
//     console.log('Normalized series:', result);
// });
// ------------------------------End Normalization ---------------------------------

function controlKeyDown()
{
    if (pressed_keys_label.innerHTML.includes("Ctrl"))
    {
        return true;
    }

    return false;
}

function shiftKeyDown()
{
    if (pressed_keys_label.innerHTML.includes("Shift"))
    {
        return true;
    }

    return false;
}

function stringIsNumeric(str) 
{
    return !isNaN(parseFloat(str)) && isFinite(str);
}
  
// const moment = require('moment');

function hasNumericFirstField(csvString) 
{
    const lines = csvString.trim().split(/\r?\n/);
  
    for (const line of lines) {
      if (line.trim() === '') continue; // Skip empty lines
  
      // Split on first comma, space, or tab
      const match = line.match(/^[^\s,\t;]+/); // Match the first field (up to first sep)
      const firstField = match ? match[0] : '';
  
      if (firstField !== '' && !isNaN(firstField)) {
        return true;
      }
    }
  
    return false;
}

function removeCommasInQuotes(str) 
{
    // Match any quoted string and remove commas within it
    return str.replace(/"([^"]*)"/g, (match, content) => {
      // Remove all commas within the quoted content
      return `"${content.replace(/,/g, '')}"`;
    });
  }

function suggestChartType(csvString) 
{
    const rows = csvString.trim().split('\n');
    let found_possible_chart = false;
    let found_possible_time_series = false;
    let found_non_header_row = false;
    let found_complex_type = false;

    for (let i = 0; i < rows.length; i++)
    {
        let row = rows[i];
        let columns = row.split(",");

        if (columns[0] == "" || columns[0].trim()[0] == "#")
        {
            continue;
        }

        let column_0_is_date_or_number = stringIsDate(columns[0]) || isNumber(columns[0]);
        let column_1_is_number = isNumber(columns[1]);

        if (column_0_is_date_or_number)
        {
            for (let j = 1; j < columns.length; j++)
            {
                let column_value = columns[j];
                if (!isNumber(column_value) && !Number.isNaN(column_value) && column_value.length > 0)
                {
                    found_complex_type = true;

                    if (j == 1)
                    {
                        return UNKNOWN_CHART_TYPE;
                    }
                }
            }
        }

        if (column_0_is_date_or_number && column_1_is_number)
        {
            // return TIME_SERIES_TYPE;
            found_possible_time_series = true;
        }

        if (!column_0_is_date_or_number && column_1_is_number && found_non_header_row)
        {
            // It could be the header row
            found_possible_chart = true;
        }

        found_non_header_row = true;
    }

    if (found_complex_type)
    {
        // return COMPLEX_CHART_TYPE;
        return UNKNOWN_CHART_TYPE;
    }

    if (found_possible_chart)
    {
        return COLUMN_CHART_TYPE;
    }

    if (found_possible_time_series)
    {
        return TIME_SERIES_CHART_TYPE;
    }

    return UNKNOWN_CHART_TYPE;
}

function stringContainsDateInFirstField(csvString) {
    // Split the CSV string into rows
    const rows = csvString.trim().split('\n');
    let found_a_date = false;
    
    // Regular expressions for common date formats
    const datePatterns = [
        /\b\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}\b/,        // MM/DD/YYYY or DD/MM/YYYY or variations
        /\b\d{4}[-\/]\d{1,2}[-\/]\d{1,2}\b/,          // YYYY-MM-DD or YYYY/MM/DD
        /\b\d{1,2}[-\/]\d{1,2}[-\/]\d{4}\b/,          // DD-MM-YYYY or MM-DD-YYYY
        /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}\b/i,  // Month DD, YYYY
        /\b\d{4}\b(?!\.\d)/,                          // Standalone 4-digit year (not followed by decimal)
        /\b\d{4}\.\d+\b/                              // Year with decimal (like 1970.136)
    ];

    for (let row of rows) {
        // Split row into fields, handling quoted values
        const fields = row.split(/[,;\t]/).map(field => field.trim().replace(/^"|"$/g, ""));
        
        // Skip empty rows
        if (fields.length === 0 || fields.every(field => field === '')) {
            continue;
        }

        if (isNumber(fields[0]))
        {
            return true;
        }
        
        // Check if row contains any dates
        const hasAnyDate = fields.some(field => 
            field !== '' && 
            datePatterns.some(pattern => pattern.test(field))
        );
        
        // Skip rows with no dates
        if (!hasAnyDate) {
            continue;
        }

        found_a_date = true;
        
        // Check if first non-empty field is a date
        const firstField = fields.find(field => field !== '');
        if (firstField) {
            const isDate = datePatterns.some(pattern => pattern.test(firstField));
            if (!isDate) {
                return false;  // First field exists but isn't a date
            }
        }
    }
    
    // All rows with dates have date in first field (or all rows ignored)
    return found_a_date;
}
  
function stringContainsDate(str) 
{
    // Regular expressions for common date formats
    const datePatterns = [
        /\b\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}\b/,        // MM/DD/YYYY or DD/MM/YYYY or variations
        /\b\d{4}[-\/]\d{1,2}[-\/]\d{1,2}\b/,          // YYYY-MM-DD or YYYY/MM/DD
        /\b\d{1,2}[-\/]\d{1,2}[-\/]\d{4}\b/,          // DD-MM-YYYY or MM-DD-YYYY
        /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}\b/i,  // Month DD, YYYY
        /\b\d{4}\b(?!\.\d)/,                          // Standalone 4-digit year (not followed by decimal)
        /\b\d{4}\.\d+\b/                              // Year with decimal (like 1970.136)
    ];
    
    // Test each pattern against the string
    return datePatterns.some(pattern => pattern.test(str));
}

function stringIsDate(str) {
    // Regular expressions for complete date strings
    const datePatterns = [
        /^\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}$/,        // MM/DD/YYYY or DD/MM/YYYY or variations
        /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}$/,          // YYYY-MM-DD or YYYY/MM/DD
        /^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}$/,          // DD-MM-YYYY or MM-DD-YYYY
        /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}$/i,  // Month DD, YYYY
        /^\d{4}$(?!\.\d)/,                          // Standalone 4-digit year (not followed by decimal)
        /^\d{4}\.\d+$/                              // Year with decimal (like 1970.136)
    ];
    
    // Test each pattern against the full string
    return datePatterns.some(pattern => pattern.test(str));
}

function hasNumericFirstField(csvString) {
    // Split the CSV string into rows
    const rows = csvString.trim().split('\n');
    let found_a_date = false;
    
    for (let row of rows) {
        // Split row into fields, handling quoted values
        const fields = row.split(/[,;\t]/).map(field => field.trim().replace(/^"|"$/g, ""));
        
        // Skip empty rows
        if (fields.length === 0 || fields.every(field => field === '')) {
            continue;
        }
        
        // Check if row contains any numeric values
        const hasAnyNumeric = fields.some(field => 
            field !== '' && 
            !isNaN(field) && 
            field !== 'Infinity' && 
            field !== '-Infinity'
        );
        
        // Skip rows with no numeric values
        if (!hasAnyNumeric) {
            continue;
        }
        
        found_a_date = true;

        // Check if first non-empty field is numeric
        const firstField = fields.find(field => field !== '');
        if (firstField && (!isNaN(firstField) && firstField !== 'Infinity' && firstField !== '-Infinity')) {
            continue;
        } else if (firstField) {
            return false;  // First field exists but isn't numeric
        }
    }
    
    // All rows with numbers have numeric first field (or all rows ignored)
    return found_a_date;
}

function hasNonNumericFields(csvString) {
    // Split the CSV string into rows
    const rows = csvString.trim().split('\n');
    
    for (let row of rows) {
        // Split row into fields, handling quoted values
        const fields = row.split(/[,;\t]/).map(field => field.trim().replace(/^"|"$/g, ""));
        
        // Count numeric and non-numeric fields
        let hasNumeric = false;
        let allEmpty = true;
        
        for (let field of fields) {
            if (field !== '') {
                allEmpty = false;
                if (!isNaN(field) && field !== 'Infinity' && field !== '-Infinity') {
                    hasNumeric = true;
                    break;
                }
            }
        }
        
        // Skip if all fields are non-numeric or all empty
        if (!hasNumeric && !allEmpty) {
            // Check if any field is non-numeric when we know there are no numeric fields
            continue;
        } else if (!allEmpty) {
            // Check each field if we have at least one numeric value
            for (let field of fields) {
                if (field === '') continue;
                if (isNaN(field) || field === 'Infinity' || field === '-Infinity') {
                    return true;
                }
            }
        }
    }
    
    return false;
}

function hasNumericInColumn(csvString, colIndex) {
    // Split the CSV string into rows
    const rows = csvString.trim().split('\n');
    
    // Check each row
    for (let row of rows) {
        // Split row into fields
        const fields = row
            .split(/[,;\t]/)
            .map(field => field.trim().replace(/^"|"$/g, ""));
        
        // Skip if column index is invalid for this row
        if (colIndex < 0 || colIndex >= fields.length) {
            continue;
        }
        
        const field = fields[colIndex];
        
        // Check if the field is numeric
        if (field !== '' && 
            !isNaN(field) && 
            field !== 'Infinity' && 
            field !== '-Infinity') {
            return true;
        }
    }
    
    return false;
}

function suggestChartTypeOld(csvString) 
{
    if (stringContainsDateInFirstField(csvString))
    {
        if (hasNonNumericFields(csvString))
        {
            return UNKNOWN_CHART_TYPE;
        }
        
        return TIME_SERIES_CHART_TYPE;
    }
    else if (hasNumericInColumn(csvString, 1))
    {
        return COLUMN_CHART_TYPE;
    }

    return UNKNOWN_CHART_TYPE;
}

// const csvData = `Date,Value,Category
// 1/1/2024,10,Type A
// 12-6-1913,15,Type A
// 2023-1-3,8,Type B`;

// console.log(suggestChartType(csvData));


function isListOfLists(arr) {
    // Check if it's an array and has at least one element
    if (!Array.isArray(arr) || arr.length === 0) {
        return false;
    }
    // Check if every element is an array
    return arr.every(item => Array.isArray(item));
}

function sumValuesByDate(arrays, tolerance = 0.001) {
    // Initialize result object
    const result = {};

    let number_of_arrays = isListOfLists(arrays) ? arrays.length : 1;
    
    let date_value_total_map = new Map();
    
    // Process each array
    for (let i = 0; i < number_of_arrays; i++) {
      const array = number_of_arrays == 1 ? arrays : arrays[i];
      
      // Process date-value pairs
      for (let j = 0; j < array.length; j += 2) 
      {
          let date = array[j];
          date = makeDecimalDateReliable(date);
          let value = array[j + 1];

          if (date_value_total_map.has(date))
          {
            let current_total = date_value_total_map.get(date);
            date_value_total_map.set(date, current_total + value);
          }
          else
          {
            date_value_total_map.set(date, value);
          }
      }
    }

    const result_array = [];

    for (const [date, value] of date_value_total_map)
    {
        result_array.push(date, value);
    }

    return result_array;
  }
  

  /**
 * Normalizes dates from various formats to a decimal year representation
 * Handles different date formats, including ISO, MM/DD/YYYY, DD-MM-YYYY, timestamps, etc.
 * Accounts for leap years in calculations
 * 
 * @param {string|number|Date} dateInput - Date in various formats
 * @returns {number} - Date as decimal year (e.g., 2023.25 for March 31st, 2023)
 */
function normalizeDate(dateInput) {
    let date;
    
    // Handle different input types
    if (dateInput instanceof Date) {
      // Already a Date object
      date = dateInput;
    } else if (typeof dateInput === 'number') {
      // Handle numeric input
      if (dateInput > 1000) {
        // Likely a timestamp
        date = new Date(dateInput);
      } else {
        // Already a decimal year
        return dateInput;
      }
    } else if (typeof dateInput === 'string') {
      // Handle various string formats
      // Try to parse the date
      const trimmedDate = dateInput.trim();
      
      // Check if it's already in decimal year format (e.g., "2023.25")
      if (/^\d+\.\d+$/.test(trimmedDate)) {
        return parseFloat(trimmedDate);
      }
      
      // Check for MM/DD/YYYY format
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmedDate)) {
        const parts = trimmedDate.split('/');
        date = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
      } 
      // Check for DD-MM-YYYY format
      else if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(trimmedDate)) {
        const parts = trimmedDate.split('-');
        date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      }
      // Check for YYYY-MM-DD format
      else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(trimmedDate)) {
        const parts = trimmedDate.split('-');
        date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      }
      // Check for YYYYMMDD format
      else if (/^\d{8}$/.test(trimmedDate)) {
        const year = parseInt(trimmedDate.substring(0, 4));
        const month = parseInt(trimmedDate.substring(4, 6)) - 1;
        const day = parseInt(trimmedDate.substring(6, 8));
        date = new Date(year, month, day);
      }
      // Default: let JavaScript try to parse it
      else {
        date = new Date(trimmedDate);
      }
    } else {
      throw new Error('Unsupported date format');
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date: ' + dateInput);
    }
    
    // Convert to decimal year
    return makeDecimalDateReliable(date);
  }
  
  /**
   * Converts a Date object to decimal year format
   * Accounts for leap years
   * 
   * @param {Date} date - The date to convert
   * @returns {number} - The date as decimal year
   */
  function makeDecimalDateReliable(date) {
    // Assuming decimalDateToDateObject exists and returns a Date object
    let date_object = decimalDateToDateObject(date);
    
    const year = Math.floor(date);
    const startOfYear = new Date(year, 0, 1); // Jan 1st
    const endOfYear = new Date(year + 1, 0, 1); // Jan 1st next year
    
    // Calculate total milliseconds and days in the year
    const millisecondsInYear = endOfYear - startOfYear;
    const daysInYear = millisecondsInYear / (1000 * 60 * 60 * 24);
    
    // Calculate milliseconds since start of year
    const millisecondsSinceStartOfYear = date_object - startOfYear;
    const dayOfYear = millisecondsSinceStartOfYear / (1000 * 60 * 60 * 24);
    
    // Calculate year fraction and round to 4 decimal places
    const yearFraction = Number((dayOfYear / daysInYear).toFixed(4));

    let return_value = year + yearFraction;

    console.log("makeDecimalDateReliable", date, GraphingUtilities.dateString(date), return_value)
    
    return return_value;
}
  
  /**
   * Checks if two dates are within the specified tolerance
   * 
   * @param {string|number|Date} date1 - First date in any supported format
   * @param {string|number|Date} date2 - Second date in any supported format
   * @param {number} tolerance - Tolerance in years (default 0.001 ≈ 8.76 hours)
   * @returns {boolean} - True if dates are within tolerance
   */
  function areDatesWithinTolerance(date1, date2, tolerance = 0.001) {
    const decimalDate1 = normalizeDate(date1);
    const decimalDate2 = normalizeDate(date2);
    
    return Math.abs(decimalDate1 - decimalDate2) <= tolerance;
  }
  
  // Examples:
  // console.log(normalizeDate("2023-03-15"));      // ISO format
  // console.log(normalizeDate("03/15/2023"));      // MM/DD/YYYY
  // console.log(normalizeDate("15-03-2023"));      // DD-MM-YYYY
  // console.log(normalizeDate("20230315"));        // YYYYMMDD
  // console.log(normalizeDate(new Date(2023, 2, 15))); // Date object
  // console.log(normalizeDate(1678838400000));     // Timestamp (ms)
  // console.log(normalizeDate(2023.25));           // Already decimal
  
  // Check if dates are within tolerance:
  // console.log(areDatesWithinTolerance("2023-01-01 00:00", "2023-01-01 08:00", 0.001)); // Within ~8.76 hours
  // console.log(areDatesWithinTolerance("2023-01-01", "2023-01-02", 0.001)); // Not within tolerance

  function decimalDateToDateObject(decimalYear) {
    // Extract the year and fractional part
    const year = Math.floor(decimalYear);
    const fraction = decimalYear - year;

    // Define the start and end of the year
    const startOfYear = new Date(year, 0, 1); // January 1st
    const endOfYear = new Date(year + 1, 0, 1); // January 1st of next year
    const millisecondsInYear = endOfYear - startOfYear;

    // Calculate the exact date by adding the fractional part of the year
    const millisecondsToAdd = fraction * millisecondsInYear;
    const resultDate = new Date(startOfYear.getTime() + millisecondsToAdd);

    return resultDate;
}

function getChartLegendContainer()
{
    return document.getElementById('webgl_chart_legend_container');
}

function getInstrumentationContainer()
{
    return document.getElementById('instrumentation_container');
}

function getGraphingControlsContainer()
{
    return document.getElementById('graphing_controls_container');
}

function getGraphingColumnChartLabel()
{
    return document.getElementById('column_chart_highlighted_label');
}

function getGraphingColumnMaxScaleLabel()
{
    return document.getElementById('column_chart_max_scale_label');
}

function getGraphingColumnMinScaleLabel()
{
    return document.getElementById('column_chart_min_scale_label');
}

function getGraphingPieChartLabel()
{
    return document.getElementById('pie_chart_highlighted_label');
}

function detectCsvSeparator(csvString) {
    // Count occurrences of potential separators in the first line
    const firstLine = csvString.split('\n')[0];
    
    const commaCount = (firstLine.match(/,/g) || []).length;
    const semicolonCount = (firstLine.match(/;/g) || []).length;
    const tabCount = (firstLine.match(/\t/g) || []).length;

    // Determine which separator appears most frequently
    const separators = [
        { sep: ',', count: commaCount },
        { sep: ';', count: semicolonCount },
        { sep: '\t', count: tabCount }
    ];

    // Sort by count in descending order
    separators.sort((a, b) => b.count - a.count);

    // If no separators found, return null or default to comma
    if (separators[0].count === 0) {
        return null; // or ',' as a default
    }

    // Additional validation: check if the separator creates consistent columns
    const lines = csvString.split('\n').filter(line => line.trim() !== '');
    const separator = separators[0].sep;
    
    // Check if the number of fields is consistent across lines
    const columnCounts = lines.map(line => 
        line.split(separator).length
    );
    
    // If column counts are inconsistent, it might not be the right separator
    const isConsistent = columnCounts.every(count => count === columnCounts[0]);
    
    if (!isConsistent) {
        // Try the next most frequent separator
        if (separators[1].count > 0) {
            const nextSeparator = separators[1].sep;
            const nextColumnCounts = lines.map(line => 
                line.split(nextSeparator).length
            );
            const isNextConsistent = nextColumnCounts.every(count => 
                count === nextColumnCounts[0]
            );
            if (isNextConsistent) {
                return nextSeparator;
            }
        }
        return null; // Inconsistent columns, unable to determine
    }

    return separator;
}

// Example usage:
// const csv1 = "name,age,city\nJohn,25,New York\nMary,30,London";
// const csv2 = "name;age;city\nJohn;25;New York\nMary;30;London";
// const csv3 = "name\tage\tcity\nJohn\t25\tNew York\nMary\t30\tLondon";

// console.log(detectCsvSeparator(csv1));  // Outputs: ","
// console.log(detectCsvSeparator(csv2));  // Outputs: ";"
// console.log(detectCsvSeparator(csv3));  // Outputs: "\t"

function stringToWebGLChartData(inputString) {
    // Check if input is valid
    if (!inputString || typeof inputString !== 'string') {
        throw new Error('Input must be a non-empty string');
    }

    // Split the input csv string into lines and filter out empty lines
    const lines = inputString.trim().split('\n').filter(line => line.trim() !== '');
    
    // Map each line to an object with label, value, and color properties
    const chart_data = lines.map((line, index) => {
        try 
        {
            let separator = line.includes("\t") ? "\t" : line.includes(";") ? ";" : ",";

            // Split each line by sparator and trim whitespace
            const parts = line.split(separator).map(item => item.trim());
            
            // Require at least label and value
            if (parts.length < 2) {
                throw new Error(`Invalid format at line ${index + 1}`);
            }

            // Extract label and value
            const label = parts[0].replace(/\.(\d+)/, ",$1");
            const value = parseInt(parts[1], 10);
            
            // Validate value
            if (isNaN(value)) {
                throw new Error(`Invalid number at line ${index + 1} ${line}`);
            }

            const isValidHexColor = (str) => /^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{8}$/.test(str);

            // Generate random hex color with restricted brightness
            const color = (parts.length >= 3 && parts[2] && isValidHexColor(`#${parts[2]}`)) 
                ? `#${parts[2]}` 
                : (() => {
                    // Generate RGB values between 50 and 200 for darker, readable colors
                    const r = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
                    const g = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
                    const b = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
                    return `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')}`;
                })();

            return {
                label,
                value,
                color
            };
        } 
        catch (error) 
        {
            if (index > 0)
            {
                console.warn(`Error processing line ${index + 1}: ${line[index+1]} ${error.message}`);
            }

            return null;
        }
    }).filter(item => item !== null); // Remove failed entries


    calculateChartPercents(chart_data);
    
    return chart_data;
}


let g_last_random_color = null;

function createRandomColor() 
{
    const upper_limit = 220;
    const minDifference = 150;
    const maxRedLimit = 180; // Maximum allowed red when green and blue are low
    
    function generateColor() {
        let r, g, b;
        do {
            r = Math.floor(Math.random() * upper_limit);
            g = r > 120 ? Math.floor(Math.random() * 180) : Math.floor(Math.random() * upper_limit);
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
    } while (getColorDifference(newColor, g_last_random_color) < minDifference && attempts < maxAttempts);
    
    const hexColor = "#" + 
        newColor.r.toString(16).padStart(2, "0") + 
        newColor.g.toString(16).padStart(2, "0") + 
        newColor.b.toString(16).padStart(2, "0");
    
    g_last_random_color = newColor;
    return hexColor;
}

function rgbaArrayToRGBHexString(rgbaArray) 
{
    // Extract R, G, B, A values from the array
    const [r, g, b, a] = rgbaArray;
    
    // Convert each value to hexadecimal
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    const aHex = a.toString(16).padStart(2, '0');
    
    // Combine into a hex string with # prefix
    return `#${rHex}${gHex}${bHex}`.toUpperCase();
}

function webGLToRGBHexString(rgbaArray) 
{
    // Extract R, G, B, A values from the array
    const [r, g, b, a] = rgbaArray;
    
    // Convert each value to hexadecimal
    const rHex = Math.round(r * 255).toString(16).padStart(2, '0');
    const gHex = Math.round(g * 255).toString(16).padStart(2, '0');
    const bHex = Math.round(b * 255).toString(16).padStart(2, '0');
    const aHex = Math.round(a * 255).toString(16).padStart(2, '0');
    
    // Combine into a hex string with # prefix
    return `#${rHex}${gHex}${bHex}`.toUpperCase();
}

function areColorsSimilar(hex1, hex2, threshold = 50) {
    // Remove # if present and convert to RGB

    if (hex1.toUpperCase() === hex2.toUpperCase())
    {
        return true;
    }

    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    
    // If conversion failed, return false
    if (!rgb1 || !rgb2) return false;

    if (rgb1 === rgb2)
    {
        return true;
    }
    
    // Calculate Euclidean distance between colors
    const distance = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
    
    // Return true if distance is less than threshold
    return distance <= threshold;
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    // Remove # and handle shorthand hex (e.g., #FFF)
    hex = hex.slice(1);
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    
    // Validate hex string
    // if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return null;
    
    // Convert to RGB
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
    };
}

// function tsvToCsv(tsvContent) 
// {
//     // Check if input seems like TSV (contains tabs, not just commas)
//     const isTSV = tsvContent.includes('\t');
//     if (!isTSV) 
//     {
//         return tsvContent;
//     }

//     // Split into lines
//     const lines = tsvContent.trim().split('\n');
    
//     // Process each line
//     const csvLines = lines.map(line => {
//         // Split by tabs
//         const fields = line.split('\t');
        
//         // Clean each field: remove commas and trim whitespace
//         const cleanedFields = fields.map(field => 
//             field
//                 .replace(/,/g, '') // Remove all commas
//                 .trim()
//                 // Escape quotes for CSV and wrap field in quotes if it contains special characters
//                 .replace(/"/g, '""')
//         );

//         // Join fields with commas for CSV
//         return cleanedFields.map(field => `${field}`).join(',');
//     });

//     // Join lines with newlines
//     return csvLines.join('\n');
// }

const removeQuotesFromNumber = value => 
{
    if (typeof value === 'string' && /^"\d+"$/.test(value)) {
      return value.replace(/^"|"$/g, '');
    }
    return value;
};

function unquoteNumbers(str) 
{
    return str.replace(/"(-?\d*\.?\d+)"|"-?\d*\.?\d+"/g, function(match) {
      return match.replace(/^"|"$/g, '');
    });
}

function tsvToCsv(tsvContent) 
{
    let cleaned_tsv_content = unquoteNumbers(tsvContent);
    // Normalize and split into lines
    const lines = cleaned_tsv_content.trim().split(/\r\n|\r|\n/);
    if (!lines.length) return '';

    // Helper to check if a string is a valid number
    const isNumber = (str) => /^-?\d+(\.\d+)?$/.test(str);

    let filtered_lines = [];
    
    for (let i = 0; i < lines.length; i++)
    {
        let line = lines[i];
        let trimmed_line = line.trim();

        if (trimmed_line.startsWith("#"))
        {
            filtered_lines.push(trimmed_line);
        }
        else if (trimmed_line.includes('\t'))
        {
            filtered_lines.push(trimmed_line.split("\t"));
        }
        else if (trimmed_line.includes(','))
        {
            filtered_lines.push(trimmed_line.split(","));
        }
        else if (trimmed_line.includes(';'))
        {
            filtered_lines.push(trimmed_line.split(";"));
        }
        else if (trimmed_line.includes(" "))
        {
            filtered_lines.push(trimmed_line.split(/\s+/));
        }

    }

    // Filter out lines that don't start with # and only have one field
    const filteredLines = lines.filter(line => {
        const trimmedLine = line.trim();
        
        // Keep lines that start with #
        if (trimmedLine.startsWith('#')) return true;
        
        // For TSV, check if there's a tab character
        if (trimmedLine.includes('\t')) {
            return trimmedLine.split('\t').length > 1;
        }
        
        // For TSV, check if there's a , character
        if (trimmedLine.includes(',')) {
            return trimmedLine.split(',').length > 1;
        }
        
        // For TSV, check if there's a ; character
        if (trimmedLine.includes(';')) {
            return trimmedLine.split(';').length > 1;
        }
        
        // For space-separated data, check if there's more than one field
        return trimmedLine.split(/\s+/).length > 1;
    });

    // Identify lines with no numbers and not starting with '#'
    const nonNumberLines = filteredLines.map((line, index) => {
        const fields = line.trim().split(/[\s,;]+/);
        const hasNumber = fields.some(field => isNumber(field));
        const startsWithHash = line.trim().startsWith('#');
        return { index, line, qualifies: !hasNumber && !startsWithHash };
    }).filter(item => item.qualifies);

    // If multiple qualifying lines, keep only the last one
    if (nonNumberLines.length > 1) 
    {
        for (let i = 0; i < filteredLines.length; i++)
        {
            let line = filteredLines[i];

            if (line != nonNumberLines[0].line)
            {
                filteredLines.shift();
            }
            else
            {
                break;
            }
        }

        // const lastQualifyingIndex = nonNumberLines[nonNumberLines.length - 1].index;
        // const newLines = [];
        // for (let i = 0; i < filteredLines.length; i++) {
        //     if (i === lastQualifyingIndex || !nonNumberLines.some(item => item.index === i)) {
        //         newLines.push(filteredLines[i]);
        //     }
        // }
        // filteredLines.splice(0, filteredLines.length, ...newLines);
    }

    // Check for space-separated numbers (any line qualifies)
    const isSpaceSeparatedNumbers = filteredLines.some(line => {
        const fields = line.trim().split(/\s+/);
        return fields.length > 1 && fields.every(field => isNumber(field));
    });

    // Process space-separated numbers
    if (isSpaceSeparatedNumbers) {
        const csvLines = filteredLines.map(line => {
            const fields = line.trim().split(/\s+/);
            return fields.join(',');
        });
        return csvLines.join('\n');
    }

    // Check for TSV (contains tabs)
    const isTSV = filteredLines.some(line => line.includes('\t'));
    if (!isTSV) {
        return filteredLines.join('\n'); // Return modified lines if not TSV
    }

    // Process TSV
    const fieldCount = filteredLines[0].split('\t').length;
    if (filteredLines.some(line => line.split('\t').length !== fieldCount)) {
        return filteredLines.join('\n'); // Inconsistent TSV, return modified lines
    }

    const csvLines = filteredLines.map(line => {
        const fields = line.split('\t');
        const cleanedFields = fields.map(field => {
            const cleaned = field.replace(/,/g, '').trim().replace(/"/g, '""');
            return cleaned === '' ? '' : /[,\n"]/.test(cleaned) ? `"${cleaned}"` : cleaned;
        });
        return cleanedFields.join(',');
    });

    return csvLines.join('\n');
}

/**
 * Simple CSV to JSON converter with no external dependencies
 * @param {string} csvData - The CSV data as a string
 * @param {object} options - Optional configuration settings
 * @returns {array} An array of objects representing the CSV data
 */
function simpleCsvToJson(csvData, options = {}) {
    const defaultOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimiter: ','
    };
    
    const parseOptions = { ...defaultOptions, ...options };
    const lines = csvData.split(/\r\n|\n|\r/).filter(line => 
      parseOptions.skipEmptyLines ? line.trim() !== '' : true
    );
    
    if (lines.length === 0) return [];
    
    const delimiter = parseOptions.delimiter;
    let headers = [];
    let startIndex = 0;
    
    if (parseOptions.header) {
      headers = lines[0].split(delimiter).map(h => h.trim());
      startIndex = 1;
    }
    
    return lines.slice(startIndex).map(line => {
      // Split the line by delimiter, respecting quotes
      const values = [];
      let inQuotes = false;
      let currentValue = '';
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === delimiter && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      // Add the last value
      values.push(currentValue.trim());
      
      // Convert types if needed
      if (parseOptions.dynamicTyping) {
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          
          if (value === '') {
            values[i] = null;
          } else if (value.toLowerCase() === 'true') {
            values[i] = true;
          } else if (value.toLowerCase() === 'false') {
            values[i] = false;
          } else if (!isNaN(value)) {
            values[i] = Number(value);
          }
        }
      }
      
      // Return array or object
      if (parseOptions.header) {
        const obj = {};
        headers.forEach((header, index) => {
          if (index < values.length) {
            obj[header] = values[index];
          } else {
            obj[header] = null;
          }
        });
        return obj;
      } else {
        return values;
      }
    });
  }
  
  // Example usage:
  // const csvString = 'name,age,city\nJohn,30,New York\nJane,25,"Los Angeles, CA"';
  // const jsonData = simpleCsvToJson(csvString);
  // console.log(JSON.stringify(jsonData, null, 2));

// Helper function to upload CSV string to the server
async function csvToJSON(csvString, filename) 
{
    console.log('[DEBUG] Uploading CSV string with filename\:', csvString, filename);

    let clean_data_string = stripCommentsAndHashtagLines(csvString);

    let json_string = simpleCsvToJson(clean_data_string);
    console.log("uploadCsvStringToChatbot json_string", json_string);

    return json_string;
}

    // Update fetchWithAuth function
async function fetchWithAuth(endpoint, options = {}) 
{
    console.log('Starting fetchWithAuth...');
    let current_token = null;

    try {
        if (!g_current_user) {
            console.error('No user is signed in');
            window.location.href = '/login';
            return;
        }

        const url = `${CHATBOT_API_URL}${endpoint}`;  // Construct full URL
        console.log('Making request to:', url);

        // Always get a fresh token
        try {
            current_token = await g_current_user.getIdToken(true);
            console.log('Token refreshed:', current_token.substring(0, 20) + '...');
        } catch (error) {
            console.error('Error getting token:', error);
            throw error;
        }

        const headers = new Headers({
            'Authorization': `Bearer ${current_token}`,
            ...(options.headers || {})
        });

        console.log('Request headers:', {
            ...Object.fromEntries(headers.entries()),
            'Authorization': headers.get('Authorization').substring(0, 20) + '...'
        });

        const response = await fetch(url, {
            ...options,
            headers: headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(errorData.detail || 'Request failed');
        }

        return response;
    } catch (error) {
        console.error('fetchWithAuth error:', error);
        throw error;
    }
}

function stripCommentsAndHashtagLines(jsString) 
{
    return jsString
        .replace(/\/\/.*$/gm, '')           // Remove // comments until end of line
        .replace(/\/\*[\s\S]*?\*\//g, '')   // Remove /* */ comments
        .replace(/^.*#[^\s#].*$/gm, '')     // Remove entire lines with hashtags
        .replace(/^\s*[\r\n]/gm, '');       // Remove empty lines
}

function replaceNewlinesWithBR(text) 
{
    return text.replace(/\n/g, "<br>");
}
  
function formatToTwoSignificantDigits(number) {
    // Handle special cases
    if (number === 0) return "0.00";
    if (!Number.isFinite(number)) return String(number);
    
    // Count significant digits in the integer part
    const integerPart = Math.floor(Math.abs(number)).toString();
    const significantDigitsInInteger = integerPart.replace(/^0+/, '').length || 0;
    
    // If integer part has 2 or more significant digits
    if (significantDigitsInInteger >= 2) {
        const fixed = number.toFixed(3);
        // Remove trailing zeros and decimal point if it's a whole number
        return Number(fixed).toString();
    }
    
    // For numbers with fewer than 2 significant digits in integer part
    // Ensure at least 2 total significant digits, max 3 decimal places
    const fixedNumber = number.toFixed(Math.min(3, 2 - significantDigitsInInteger));
    return fixedNumber;
}

function replaceWhitespaceInFirstLine(str) 
{
    // Split the string into lines
    const lines = str.split('\n');
    
    // Replace all whitespace in the first line with underscores
    lines[0] = lines[0].replace(/\s+/g, '_');
    
    // Join the lines back together
    return lines.join('\n');
}

async function generateTablePrompt(query, query_length)
{
    let response = await fetchWithAuth('/generate_table_prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            table_name: ["data"],
            sample_data: query.slice(0, query_length)
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        displayMessage('Sorry, I encountered an error processing your request. Please try rephrasing your question.', 'system');
        return;
    }

    data = await response.json();
    return data;
}

async function askChatbot(clean_query)
{
    response = await fetchWithAuth('/ask2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: clean_query,
            table_names: ["data"],
            table_prompts: {"data": g_table_prompt_data}
        })
    });

    data = await response.json();

    return data;
}

async function askChatbotRetry(cleaned_sql, error_string, clean_query, table_prompt_data)
{
    response = await fetchWithAuth('/repair_sql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: cleaned_sql,
            error: error_string,
            table_names: ["data"],
            user_question: clean_query,
            table_prompts: {"data": table_prompt_data}
        })
    });

    data = await response.json();

    return data;
}
