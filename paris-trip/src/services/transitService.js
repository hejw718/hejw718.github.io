/**
 * Transit Service - 使用 Google Maps Directions API 查詢交通路線
 */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
const BASE_URL = 'https://maps.googleapis.com/maps/api/directions/json';

/**
 * 交通方式對應的圖示
 */
const modeIcons = {
    'TRANSIT': '🚇',
    'WALKING': '🚶',
    'DRIVING': '🚗',
    'BICYCLING': '🚴'
};

/**
 * 格式化時間(秒轉為分鐘)
 */
function formatDuration(seconds) {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
        return `${minutes} 分鐘`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} 小時 ${mins} 分鐘` : `${hours} 小時`;
}

/**
 * 格式化距離(公尺轉為公里或公尺)
 */
function formatDistance(meters) {
    if (meters < 1000) {
        return `${meters} 公尺`;
    }
    const km = (meters / 1000).toFixed(1);
    return `${km} 公里`;
}

/**
 * 提取並格式化路線步驟
 */
function formatRouteSteps(steps, mode) {
    if (mode === 'WALKING') {
        // 步行只顯示距離
        const totalDistance = steps.reduce((sum, step) => sum + step.distance.value, 0);
        return `步行 ${formatDistance(totalDistance)}`;
    }

    if (mode === 'TRANSIT') {
        // 提取大眾運輸資訊
        const transitSteps = steps
            .filter(step => step.travel_mode === 'TRANSIT')
            .map(step => {
                const transit = step.transit_details;
                const line = transit.line;
                const departure = transit.departure_stop.name;
                const arrival = transit.arrival_stop.name;

                // 地鐵/公車線路資訊
                let lineInfo = line.short_name || line.name;
                if (line.vehicle.type === 'SUBWAY') {
                    lineInfo = `M${lineInfo}`;
                }

                return `${departure} → ${arrival} (${lineInfo})`;
            });

        return transitSteps.length > 0
            ? transitSteps.join('<br>')
            : '大眾運輸';
    }

    return '路線資訊';
}

/**
 * 查詢交通路線
 * @param {string} origin - 起點
 * @param {string} destination - 終點
 * @param {string} mode - 交通方式 (TRANSIT, WALKING, DRIVING)
 * @returns {Promise<Object>} 格式化的交通資料
 */
export async function fetchDirections(origin, destination, mode = 'TRANSIT') {
    if (!API_KEY) {
        console.warn('Google Maps API key not found, using default transit data');
        return getDefaultTransit(mode);
    }

    try {
        // 注意: Google Maps Directions API 不支援從瀏覽器直接呼叫(CORS 限制)
        // 實際使用時需要透過後端代理或使用 Google Maps JavaScript API
        const params = new URLSearchParams({
            origin,
            destination,
            mode: mode.toLowerCase(),
            key: API_KEY,
            language: 'zh-TW'
        });

        const response = await fetch(`${BASE_URL}?${params}`);

        if (!response.ok) {
            throw new Error(`Directions API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
            throw new Error(`No routes found: ${data.status}`);
        }

        const route = data.routes[0];
        const leg = route.legs[0];

        return {
            icon: modeIcons[mode] || '🚇',
            duration: formatDuration(leg.duration.value),
            distance: formatDistance(leg.distance.value),
            route: formatRouteSteps(leg.steps, mode),
            origin: leg.start_address,
            destination: leg.end_address
        };
    } catch (error) {
        console.error('Failed to fetch directions:', error);
        return getDefaultTransit(mode);
    }
}

/**
 * 批次查詢多個路線
 * @param {Array<Object>} routes - 路線陣列 [{origin, destination, mode}]
 * @returns {Promise<Array<Object>>} 交通資料陣列
 */
export async function fetchMultipleDirections(routes) {
    const promises = routes.map(route =>
        fetchDirections(route.origin, route.destination, route.mode)
    );
    return Promise.all(promises);
}

/**
 * 預設交通資料(API 失敗時使用)
 */
function getDefaultTransit(mode = 'TRANSIT') {
    return {
        icon: modeIcons[mode] || '🚇',
        duration: '計算中...',
        distance: '',
        route: '路線查詢中...',
        origin: '',
        destination: ''
    };
}
