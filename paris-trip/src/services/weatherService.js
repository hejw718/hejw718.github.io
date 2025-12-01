/**
 * Weather Service - 使用 WeatherAPI.com 抓取天氣資料
 */

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * 天氣狀況圖示對應
 */
const weatherIcons = {
    'Sunny': '☀️',
    'Clear': '🌙',
    'Partly cloudy': '⛅',
    'Cloudy': '☁️',
    'Overcast': '☁️',
    'Mist': '🌫️',
    'Patchy rain possible': '🌦️',
    'Patchy snow possible': '🌨️',
    'Patchy sleet possible': '🌨️',
    'Patchy freezing drizzle possible': '🌨️',
    'Thundery outbreaks possible': '⛈️',
    'Blowing snow': '🌨️',
    'Blizzard': '🌨️',
    'Fog': '🌫️',
    'Freezing fog': '🌫️',
    'Patchy light drizzle': '🌦️',
    'Light drizzle': '🌦️',
    'Freezing drizzle': '🌨️',
    'Heavy freezing drizzle': '🌨️',
    'Patchy light rain': '🌦️',
    'Light rain': '🌧️',
    'Moderate rain at times': '🌧️',
    'Moderate rain': '🌧️',
    'Heavy rain at times': '🌧️',
    'Heavy rain': '🌧️',
    'Light freezing rain': '🌨️',
    'Moderate or heavy freezing rain': '🌨️',
    'Light sleet': '🌨️',
    'Moderate or heavy sleet': '🌨️',
    'Patchy light snow': '🌨️',
    'Light snow': '🌨️',
    'Patchy moderate snow': '🌨️',
    'Moderate snow': '🌨️',
    'Patchy heavy snow': '🌨️',
    'Heavy snow': '🌨️',
    'Ice pellets': '🌨️',
    'Light rain shower': '🌦️',
    'Moderate or heavy rain shower': '🌧️',
    'Torrential rain shower': '🌧️',
    'Light sleet showers': '🌨️',
    'Moderate or heavy sleet showers': '🌨️',
    'Light snow showers': '🌨️',
    'Moderate or heavy snow showers': '🌨️',
    'Light showers of ice pellets': '🌨️',
    'Moderate or heavy showers of ice pellets': '🌨️',
    'Patchy light rain with thunder': '⛈️',
    'Moderate or heavy rain with thunder': '⛈️',
    'Patchy light snow with thunder': '⛈️',
    'Moderate or heavy snow with thunder': '⛈️'
};

/**
 * 根據溫度、天氣狀況和降雨機率生成穿著建議
 */
function getSuggestion(temp, condition, rainChance, maxTemp, minTemp) {
    const avgTemp = temp;
    const tempDiff = maxTemp - minTemp;
    const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle');
    const isCloudy = condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast');
    const isSunny = condition.toLowerCase().includes('sunny') || condition.toLowerCase().includes('clear');
    const isSnowy = condition.toLowerCase().includes('snow');

    let suggestion = '';

    // 基本穿著建議
    if (avgTemp < 5) {
        suggestion = '建議穿著厚外套、圍巾和手套';
        if (isSnowy) suggestion += ',可能有降雪';
    } else if (avgTemp < 10) {
        suggestion = '建議穿著厚外套和保暖衣物';
        if (tempDiff > 8) suggestion += ',早晚溫差大';
    } else if (avgTemp < 15) {
        suggestion = '建議穿著薄外套或毛衣';
        if (isSunny) suggestion += ',適合戶外活動';
    } else if (avgTemp < 20) {
        suggestion = '天氣溫和,穿著輕便舒適的衣物';
        if (isSunny) suggestion += ',是觀光的好天氣';
    } else {
        suggestion = '天氣溫暖,建議穿著涼爽透氣的衣物';
    }

    // 降雨建議
    if (isRainy || rainChance > 50) {
        suggestion += ',記得攜帶雨具';
    } else if (rainChance > 30) {
        suggestion += ',建議備妥雨具';
    }

    // 特殊天氣提醒
    if (isCloudy && !isRainy && rainChance < 30) {
        suggestion += ',多雲但適合出遊';
    }

    return suggestion;
}

/**
 * 取得天氣圖示
 */
function getWeatherIcon(condition) {
    return weatherIcons[condition] || '⛅';
}

/**
 * 抓取特定日期的天氣預報
 * @param {string} date - 日期格式: YYYY-MM-DD
 * @returns {Promise<Object>} 天氣資料
 */
export async function fetchWeatherForDate(date) {
    if (!API_KEY) {
        console.warn('WeatherAPI key not found, using default weather data');
        return getDefaultWeather();
    }

    try {
        const response = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=Paris&dt=${date}&lang=zh_tw`
        );

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();

        // 驗證資料結構
        if (!data.forecast || !data.forecast.forecastday || data.forecast.forecastday.length === 0) {
            throw new Error('Invalid forecast data structure');
        }

        const forecast = data.forecast.forecastday[0];

        if (!forecast.day) {
            throw new Error('Missing day data in forecast');
        }

        const day = forecast.day;

        return {
            temp: `${Math.round(day.avgtemp_c)}°C`,
            high: `${Math.round(day.maxtemp_c)}°C`,
            low: `${Math.round(day.mintemp_c)}°C`,
            condition: day.condition.text,
            icon: getWeatherIcon(day.condition.text),
            rain: `${Math.round(day.daily_chance_of_rain)}%`,
            suggestion: getSuggestion(
                day.avgtemp_c,
                day.condition.text,
                day.daily_chance_of_rain,
                day.maxtemp_c,
                day.mintemp_c
            )
        };
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        return getDefaultWeather();
    }
}

/**
 * 批次抓取多個日期的天氣
 * @param {Array<string>} dates - 日期陣列
 * @returns {Promise<Array<Object>>} 天氣資料陣列
 */
export async function fetchWeatherForDates(dates) {
    const promises = dates.map(date => fetchWeatherForDate(date));
    return Promise.all(promises);
}

/**
 * 預設天氣資料（當 API 失敗時使用）
 */
function getDefaultWeather() {
    return {
        temp: '8°C',
        high: '10°C',
        low: '5°C',
        condition: '多雲',
        icon: '⛅',
        rain: '20%',
        suggestion: '建議穿著厚外套，早晚溫差大'
    };
}

/**
 * 取得巴黎旅遊期間的所有天氣資料
 * @returns {Promise<Object>} 以日期為 key 的天氣資料物件
 */
export async function getParisWeather() {
    // 使用當前日期加上偏移量來獲取未來幾天的天氣預報
    // 因為 WeatherAPI 免費版本只能查詢未來 3 天
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        dates.push(dateStr);
    }

    try {
        const weatherData = await fetchWeatherForDates(dates);

        return {
            1: weatherData[0],
            2: weatherData[1],
            3: weatherData[2],
            4: weatherData[3],
            5: weatherData[4]
        };
    } catch (error) {
        console.error('Failed to fetch Paris weather:', error);
        // 返回預設值
        return {
            1: getDefaultWeather(),
            2: getDefaultWeather(),
            3: getDefaultWeather(),
            4: getDefaultWeather(),
            5: getDefaultWeather()
        };
    }
}
