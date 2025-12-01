export const itineraryData = {
    0: {
        title: 'Day 0 | 出發前往巴黎',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: '台北桃園機場 (TPE)',
                destination: '巴黎戴高樂機場 (CDG)',
                icon: '✈️',
                duration: '去程航班',
                route: '2/14 (六) TPE Terminal 2 → SIN Terminal 3<br>16:40 - 21:30 | 新加坡航空 SQ879 | Boeing 787-10<br><br>轉機時間: 2小時45分鐘<br><br>2/15 (日) SIN Terminal 3 → CDG Terminal 1<br>00:15 - 07:15 | 新加坡航空 SQ336 | Airbus A350-900',
                ticketUrl: ''
            }
        ]
    },
    1: {
        title: 'Day 1 | 抵達巴黎、瑪黑區 & 蒙馬特',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Leonardo Boutique Hotel Paris Opera',
                destination: 'Café Charlot Paris',
                icon: '🚇',
                duration: '15 分鐘',
                route: '從飯店前往 Café Charlot<br>Grands Boulevards → Filles du Calvaire (M8)'
            },
            {
                type: 'card',
                category: '早餐',
                title: 'Café Charlot',
                time: '08:30',
                description: '瑪黑區經典咖啡廳,抵達後的第一餐',
                hours: ['通常營業時間:每日 08:00 開始'],
                location: 'Café Charlot Paris',
                image: 'https://images.unsplash.com/photo-1627941014589-983375b63750?w=800'
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Café Charlot Paris',
                destination: 'Place des Vosges Paris',
                icon: '🚶',
                duration: '12 分鐘',
                route: '前往沃日廣場 (950公尺)'
            },
            {
                type: 'card',
                category: '景點',
                title: '沃日廣場',
                time: '09:45',
                description: '拍攝精緻紅磚建築,在廣場上閒晃',
                hours: ['公園開放時間:通常 08:00 - 20:00'],
                location: 'Place des Vosges Paris',
                image: 'https://images.unsplash.com/photo-1549479366-c956c38722b5?w=800'
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Place des Vosges Paris',
                destination: 'BHV Marais Paris',
                icon: '🚶',
                duration: '15 分鐘',
                route: '前往 BHV 百貨 (1.2公里)'
            },
            {
                type: 'card',
                category: '購物',
                title: 'BHV Marais 百貨',
                time: '11:00',
                description: '可利用 10% 折價券。外國遊客憑護照領取',
                hours: ['週一至週六 10:00 - 20:00', '週日 11:00 - 19:00'],
                location: 'BHV Marais Paris',
                image: 'https://images.unsplash.com/photo-1629838779948-433e147d337a?w=800'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'BHV Marais Paris',
                destination: 'Ober Mamma Paris',
                icon: '🚇',
                duration: '12 分鐘',
                route: '前往 Ober Mamma<br>Hôtel de Ville (M11) → Oberkampf (M5)'
            },
            {
                type: 'card',
                category: '午餐',
                title: 'Ober Mamma',
                time: '12:00',
                description: '人氣義式餐廳,建議提早排隊',
                hours: ['通常 12:00 開始營業'],
                location: 'Ober Mamma Paris',
                image: 'https://images.unsplash.com/photo-1582239339097-9e4a3b19280d?w=800'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Ober Mamma Paris',
                destination: 'Sacré-Cœur Paris',
                icon: '🚇',
                duration: '30 分鐘',
                route: '前往聖心堂<br>Oberkampf (M5) → Gare du Nord → Anvers (M2)'
            },
            {
                type: 'card',
                category: '景點',
                title: '聖心堂',
                time: '14:30',
                description: '俯瞰巴黎全景',
                hours: ['教堂每日 06:00 - 22:30'],
                location: 'Sacré-Cœur Paris',
                image: 'https://images.unsplash.com/photo-1558235284-18090516629c?w=800'
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Sacré-Cœur Paris',
                destination: 'Le Mur des Je t\'aime Paris',
                icon: '🚶',
                duration: '8 分鐘',
                route: '前往愛牆 (550公尺)'
            },
            {
                type: 'card',
                category: '拍照',
                title: '愛牆',
                time: '15:30',
                description: '蒙馬特人氣景點,311種語言的我愛你',
                hours: ['位於公園內,依公園時間開放'],
                location: 'Le Mur des Je t\'aime Paris',
                image: 'https://images.unsplash.com/photo-1579808386348-e867d716493b?w=800'
            },
            {
                type: 'card',
                category: '晚餐',
                title: 'Pink Mamma',
                time: '18:30',
                description: '網紅義式餐廳,玻璃屋頂',
                hours: ['需提前預約'],
                location: 'Pink Mamma Paris',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'
            }
        ]
    },
    2: {
        title: 'Day 2 | 蒙聖米歇爾 Mont Saint-Michel',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Leonardo Boutique Hotel Paris Opera',
                destination: 'Gare Montparnasse',
                icon: '🚇',
                duration: '20 分鐘',
                route: '從飯店前往蒙帕納斯車站<br>Grands Boulevards (M8/M9) → Montparnasse Bienvenüe'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Gare Montparnasse',
                destination: 'Mont Saint-Michel',
                icon: '🚂',
                duration: '06:48 - 10:00',
                route: '前往蒙聖米歇爾<br>06:48 TGV → 08:15 雷恩 → 08:45 接駁巴士 → 10:00 抵達',
                ticketUrl: 'https://www.kkday.com/zh-tw/order/orderlist?tab=ON-GOING&type=recentOrder&page=1'
            },
            {
                type: 'card',
                category: '景點',
                title: '蒙聖米歇爾修道院',
                time: '10:00 - 17:00',
                description: '世界遺產,全天觀光',
                hours: ['09:30 - 18:00'],
                location: 'Mont Saint-Michel Abbey',
                image: 'https://images.unsplash.com/photo-1583838271701-d700e3e96191?w=800'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Mont Saint-Michel',
                destination: 'Leonardo Boutique Hotel Paris Opera',
                icon: '🚂',
                duration: '17:00 - 21:16',
                route: '返回巴黎<br>17:00 巴士發車 → 18:15 雷恩 → 19:35 TGV → 21:16 抵達巴黎'
            }
        ]
    },
    3: {
        title: 'Day 3 | 凱旋門、遊船與左岸',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Leonardo Boutique Hotel Paris Opera',
                destination: 'Arc de Triomphe Paris',
                icon: '🚇',
                duration: '25 分鐘',
                route: '從飯店出發前往凱旋門<br>Grands Boulevards → Charles de Gaulle Étoile'
            },
            {
                type: 'card',
                category: '景點',
                title: '凱旋門',
                time: '10:00',
                description: '登頂俯瞰香榭麗舍大道',
                hours: ['每日 10:00 - 22:30'],
                location: 'Arc de Triomphe Paris',
                image: 'https://images.unsplash.com/photo-1549117652-3a521c7d2c3e?w=800'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Arc de Triomphe Paris',
                destination: 'Pont Alexandre III Paris',
                icon: '🚇',
                duration: '10 分鐘',
                route: '前往亞歷山大三世橋<br>Charles de Gaulle Étoile → Champs-Élysées - Clemenceau'
            },
            {
                type: 'card',
                category: '景點',
                title: '亞歷山大三世橋',
                time: '14:50',
                description: '巴黎最華麗的橋樑,適合拍照',
                hours: ['全天開放'],
                location: 'Pont Alexandre III Paris',
                image: 'https://images.unsplash.com/photo-1523588288593-1e5e04e8d35e?w=800'
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Pont Alexandre III Paris',
                destination: 'Bateaux Parisiens',
                icon: '🚶',
                duration: '21 分鐘',
                route: '前往遊船碼頭 (1.6公里)'
            },
            {
                type: 'card',
                category: '活動',
                title: '塞納河遊船',
                time: '16:45',
                description: 'Bateaux Parisiens,享受黃昏遊船',
                hours: ['建議提前15分鐘抵達'],
                location: 'Bateaux Parisiens',
                image: 'https://images.unsplash.com/photo-1580979848130-b3e1a0b3f86e?w=800'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Bateaux Parisiens',
                destination: 'Le Crépuscule Paris',
                icon: '🚇',
                duration: '25 分鐘',
                route: '前往晚餐地點<br>Iéna (M9) → École Militaire (M8)'
            },
            {
                type: 'card',
                category: '晚餐',
                title: 'Le Crépuscule',
                time: '18:15',
                description: '道地法式可麗餅 (鹹/甜)',
                hours: ['請查閱官網確認'],
                location: 'Le Crépuscule Paris',
                image: 'https://images.unsplash.com/photo-1577782390886-07469a4c14c5?w=800'
            }
        ]
    },
    4: {
        title: 'Day 4 | 巴黎迪士尼 + Outlet',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Leonardo Boutique Hotel Paris Opera',
                destination: 'Disneyland Paris',
                icon: '🚈',
                duration: '出發',
                route: '從飯店出發前往迪士尼<br>RER A 線:往 Marne-la-Vallée – Chessy'
            },
            {
                type: 'card',
                category: '景點',
                title: '巴黎迪士尼',
                time: '09:30',
                description: '全天遊玩',
                hours: ['09:30 - 22:00'],
                location: 'Disneyland Paris',
                image: 'https://images.unsplash.com/photo-1596700813936-7c913c9e6d8a?w=800',
                ticketUrl: 'https://www.klook.com/zh-TW/bookings/'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Disneyland Paris',
                destination: 'La Vallée Village',
                icon: '🚈',
                duration: '15 分鐘',
                route: '前往 Outlet<br>RER A 線:1 站 (Val d\'Europe)'
            },
            {
                type: 'card',
                category: '購物',
                title: '山谷購物村',
                time: '15:15',
                description: 'La Vallée Village Outlet',
                hours: ['每日 10:00 - 20:00'],
                location: 'La Vallée Village',
                image: 'https://images.unsplash.com/photo-1599026466981-d1a1b1a0e1b1?w=800'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'La Vallée Village',
                destination: 'Disneyland Paris',
                icon: '🚈',
                duration: '17 分鐘',
                route: '返回迪士尼<br>RER A 線:1 站'
            },
            {
                type: 'card',
                category: '活動',
                title: '迪士尼煙火秀',
                time: '22:00',
                description: '閉園煙火與燈光秀',
                hours: ['時間請依 App 為準'],
                location: 'Disneyland Paris',
                image: 'https://images.unsplash.com/photo-1606555541094-a10c14c5c2a1?w=800'
            }
        ]
    },
    5: {
        title: 'Day 5 | 羅浮宮、奧賽、塞納河畔',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Leonardo Boutique Hotel Paris Opera',
                destination: 'Louvre Museum Paris',
                icon: '🚇',
                duration: '12 分鐘',
                route: '從飯店出發前往羅浮宮<br>Grands Boulevards → Palais Royal - Musée du Louvre'
            },
            {
                type: 'card',
                category: '景點',
                title: '羅浮宮',
                time: '09:15',
                description: '週四開放,務必預約',
                hours: ['09:00 - 18:00'],
                location: 'Louvre Museum Paris',
                image: 'https://images.unsplash.com/photo-1549722736-218044738734?w=800'
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Louvre Museum Paris',
                destination: 'Jardin des Tuileries Paris',
                icon: '🚶',
                duration: '11 分鐘',
                route: '前往杜樂麗花園 (800公尺)'
            },
            {
                type: 'card',
                category: '活動',
                title: '杜樂麗花園',
                time: '14:00',
                description: '買輕食野餐',
                hours: ['07:30 - 19:30'],
                location: 'Jardin des Tuileries Paris',
                image: 'https://images.unsplash.com/photo-1570779836365-a6e5b22b109c?w=800'
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Jardin des Tuileries Paris',
                destination: 'Musée d\'Orsay Paris',
                icon: '🚶',
                duration: '5 分鐘',
                route: '前往奧賽美術館 (過橋)'
            },
            {
                type: 'card',
                category: '景點',
                title: '奧賽美術館',
                time: '15:15',
                description: '欣賞印象派畫作',
                hours: ['09:30 - 18:00 (週四至 21:45)'],
                location: 'Musée d\'Orsay Paris',
                image: 'https://images.unsplash.com/photo-1550992388-517f8b9e6918?w=800'
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Musée d\'Orsay Paris',
                destination: 'Shakespeare and Company Paris',
                icon: '🚶',
                duration: '28 分鐘',
                route: '前往莎士比亞書店 (2公里)'
            },
            {
                type: 'card',
                category: '書店',
                title: '莎士比亞書店',
                time: '18:00',
                description: '左岸傳奇書店',
                hours: ['10:00 - 21:00'],
                location: 'Shakespeare and Company Paris',
                image: 'https://images.unsplash.com/photo-1517487213459-a5e2b0a3c267?w=800'
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Shakespeare and Company Paris',
                destination: 'Chez René Paris',
                icon: '🚶',
                duration: '10 分鐘',
                route: '前往餐廳'
            },
            {
                type: 'card',
                category: '晚餐',
                title: 'Chez René',
                time: '18:35',
                description: '左岸經典法式料理',
                hours: ['12:00–14:30, 19:30–22:30'],
                location: 'Chez René Paris',
                image: 'https://images.unsplash.com/photo-1577782390886-07469a4c14c5?w=800'
            }
        ]
    },
    6: {
        title: 'Day 6 | 返回台灣',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: '巴黎戴高樂機場 (CDG)',
                destination: '台北桃園機場 (TPE)',
                icon: '✈️',
                duration: '回程航班',
                route: '2/22 (日) CDG Terminal 1 → SIN Terminal 3<br>10:40 - 06:15+1 | 新加坡航空 SQ335 | Airbus A350-900<br><br>轉機時間: 1小時55分鐘<br><br>2/23 (一) SIN Terminal 3 → TPE Terminal 2<br>08:10 - 12:55 | 新加坡航空 SQ876 | Boeing 787-10',
                ticketUrl: ''
            }
        ]
    }
};
