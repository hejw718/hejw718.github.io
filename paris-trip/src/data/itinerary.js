export const itineraryData = {
    1: {
        title: 'Day 1 | 出發前往巴黎',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: '台北桃園機場 (TPE)',
                destination: '巴黎戴高樂機場 (CDG)',
                icon: '✈️',
                duration: '去程航班',
                route: [
                    '【第一段】2/14 (六)',
                    '時間：16:40 - 21:30',
                    '航廈：TPE Terminal 2 → SIN Terminal 3',
                    '航班：新加坡航空 SQ879',
                    '機型：Boeing 787-10',
                    '',
                    '轉機時間：2小時45分鐘',
                    '',
                    '【第二段】2/15 (日)',
                    '時間:00:15 - 07:15',
                    '航廈:SIN Terminal 3 → CDG Terminal 1',
                    '航班:新加坡航空 SQ336',
                    '機型:Airbus A350-900'
                ],
                ticketUrl: ''
            },
            {
                type: 'card',
                category: '住宿',
                title: 'HÔTEL EXCELSIOR PARIS OPÉRA',
                time: '抵達後 Check-in',
                description: '位於歌劇院區的精品飯店，交通便利，步行可達多個地鐵站',
                hours: ['Check-in: 15:00', 'Check-out: 12:00'],
                location: '5 Rue La Fayette, 75009 Paris, France',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
            },
            {
                type: 'card',
                category: '票券/景點',
                title: '巴黎歌劇院 (Palais Garnier) & Navigo 週票',
                time: '下午',
                description: '參觀壯麗的歌劇院。同時建議在此購買 Navigo Découverte 週票（需準備 1 吋照片一張）。',
                hours: ['歌劇院參觀: 10:00–17:00', '地鐵站票務櫃檯可購買 Navigo'],
                location: 'Pl. de l\'Opéra, 75009 Paris, France',
                image: 'https://images.unsplash.com/photo-1590490359854-dfba1d223847?w=800'
            }
        ]
    },
    2: {
        title: 'Day 2 | 抵達巴黎、瑪黑區 & 蒙馬特 (2/15)',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'HÔTEL EXCELSIOR PARIS OPÉRA',
                destination: 'Café Charlot Paris',
                icon: '🚇',
                duration: '約 20 分鐘',
                route: '從飯店前往 Café Charlot<br>搭乘 M9 至 République 站，下車後步行 5 分鐘'
            },
            {
                type: 'card',
                category: '早餐',
                title: 'Café Charlot',
                time: '08:30 - 09:30',
                description: '瑪黑區經典咖啡廳, 享受早晨柔和光線 ',
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
                duration: '約 12 分鐘',
                route: '前往沃日廣場 (步行 950 公尺)'
            },
            {
                type: 'card',
                category: '景點',
                title: '沃日廣場 (Place des Vosges)',
                time: '09:45 - 10:45',
                description: '拍攝精緻紅磚建築、廣場對稱構圖 ',
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
                duration: '約 10 分鐘',
                route: '沿 Rue des Francs-Bourgeois & Rue Vieille du Temple 散步 (約 700 公尺)'
            },
            {
                type: 'card',
                category: '購物',
                title: 'BHV Marais 百貨',
                time: '10:45 - 11:00',
                description: '可利用 10% 折價券。外國遊客憑護照領取 ',
                hours: ['週一至週六 10:00 - 20:00', '週日 11:00 - 19:00'],
                location: 'BHV Marais Paris',
                image: 'https://images.unsplash.com/photo-1629838779948-433e147d337a?w=800'
            },
            {
                type: 'card',
                category: '市集',
                title: '紅孩兒市集 (Marché des Enfants Rouges)',
                time: '11:00 - 12:00',
                description: '巴黎最古老有頂市集，可拍攝市集美食 ',
                hours: ['週二至週六 8:30–20:30；週日 8:30–17:30 (週一休)'],
                location: 'Marché des Enfants Rouges',
                image: 'https://images.unsplash.com/photo-1549479366-c956c38722b5?w=800'
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Marché des Enfants Rouges',
                destination: 'Ober Mamma',
                icon: '🚶',
                duration: '約 10 分鐘',
                route: '步行前往 Ober Mamma<br>沿著 Rue de Bretagne 向東步行至 Blvd Richard-Lenoir'
            },
            {
                type: 'card',
                category: '午餐',
                title: 'Ober Mamma',
                time: '12:30 - 14:00',
                description: '人氣義大利餐廳，以玻璃屋頂和美味的拿坡里披薩聞名。',
                hours: ['週一至週五 12:00–14:30, 18:45–22:45', '週六日 12:00–15:30, 18:45–23:00'],
                location: '107 Boulevard Richard-Lenoir, 75011 Paris',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'
            },
            {
                type: 'card',
                category: '甜點',
                title: 'Le Comptoir de Madeleine',
                time: '14:15 - 14:30',
                description: '購買瑪德琳蛋糕，可外帶作下午小點心 ',
                hours: ['請依現場營業時間為準'],
                location: 'Le Comptoir de Madeleine',
                image: 'https://images.unsplash.com/photo-1629838779948-433e147d337a?w=800' // 使用 BHV 圖片替代
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Ober Mamma',
                destination: 'Sacré-Cœur Paris',
                icon: '🚇',
                duration: '約 25 分鐘',
                route: '前往聖心堂<br>搭乘 M5 從 Richard-Lenoir 站至 Gare du Nord 轉 M4 至 Château Rouge，或步行至 Saint-Sébastien - Froissart 搭乘 M8/M9'
            },
            {
                type: 'card',
                category: '景點',
                title: '聖心堂 (Sacré-Cœur)',
                time: '14:30 - 15:30',
                description: '俯瞰巴黎全景、拍攝教堂建築 ',
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
                duration: '約 7 分鐘',
                route: '前往愛牆 (步行 550 公尺)'
            },
            {
                type: 'card',
                category: '拍照',
                title: '愛牆 (Le Mur des Je t\'aime)',
                time: '15:30 - 16:00',
                description: '蒙馬特人氣景點, 311種語言的我愛你 ',
                hours: ['位於公園內, 依公園時間開放'],
                location: 'Le Mur des Je t\'aime Paris',
                image: 'https://images.unsplash.com/photo-1579808386348-e867d716493b?w=800'
            },
            {
                type: 'card',
                category: '景點',
                title: '小街與粉紅屋 (Place du Tertre / La Maison Rose)',
                time: '16:00 - 16:30',
                description: '蒙馬特特色小街、藝術廣場與粉紅屋拍照 ',
                hours: ['全天開放'],
                location: 'La Maison Rose, 2 Rue de l\'Abreuvoir, 75018 Paris, France',
                image: 'https://images.unsplash.com/photo-1517487213459-a5e2b0a3c267?w=800'
            },
            {
                type: 'card',
                category: '點心',
                title: '法式薄餅與甜點 (Crêperie Brocéliande / Les Petits Mitrons)',
                time: '16:30 - 17:00',
                description: '享用法式薄餅或在小麵包店買甜點 ',
                hours: ['請依現場營業時間為準'],
                location: 'Crêperie Brocéliande / Les Petits Mitrons (蒙馬特地區)',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800' // 使用 Pink Mamma 圖片替代
            },
            {
                type: 'card',
                category: '晚餐',
                title: 'Abuela Pigalle',
                time: '19:00 - 20:30',
                description: '道地的西班牙料理與 Tapas，裝潢充滿復古風格。',
                hours: ['每日 11:30–01:00'],
                location: '10 Boulevard de Clichy, 75018 Paris',
                image: 'https://images.unsplash.com/photo-1582239339097-9e4a3b19280d?w=800'
            }
        ]
    },
    3: {
        title: 'Day 3 | 蒙聖米歇爾 Mont Saint-Michel (2/16)',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'HÔTEL EXCELSIOR PARIS OPÉRA',
                destination: 'Gare Montparnasse',
                icon: '🚇',
                duration: '約 25 分鐘',
                route: '從飯店前往蒙帕納斯車站<br>Chaussée d\'Antin - La Fayette (M9/M7) 轉乘至 Montparnasse Bienvenue'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Gare Montparnasse',
                destination: 'Mont Saint-Michel',
                icon: '🚂',
                duration: '06:48 - 10:00',
                route: '前往蒙聖米歇爾<br>06:48 TGV (OUIGO No. 7611) → 08:15 雷恩 (Rennes) <br>08:45 雷恩接駁巴士 → 10:00 抵達 ',
                ticketUrl: 'https://www.kkday.com/zh-tw/order/orderlist?tab=ON-GOING&type=recentOrder&page=1'
            },
            {
                type: 'card',
                category: '景點',
                title: '蒙聖米歇爾修道院與村莊觀光',
                time: '10:00 - 17:00',
                description: '世界遺產, 全天散步、拍照、可自備簡餐或沿街小吃 ',
                hours: ['09:30 - 18:00'],
                location: 'Mont Saint-Michel Abbey',
                image: 'https://images.unsplash.com/photo-1583838271701-d700e3e96191?w=800'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Mont Saint-Michel',
                destination: 'Rennes Station',
                icon: '🚌',
                duration: '17:00 - 18:15',
                route: '搭乘巴士返回雷恩車站 '
            },
            {
                type: 'card',
                category: '晚餐購買',
                title: '雷恩車站附近',
                time: '18:15 - 19:20',
                description: '推薦在車站附近購買麵包、熟食或外帶餐點 ',
                hours: ['請依現場營業時間為準'],
                location: 'Rennes Station',
                image: 'https://images.unsplash.com/photo-1549479366-c956c38722b5?w=800' // 使用沃日廣場圖片替代
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Rennes Station',
                destination: 'HÔTEL EXCELSIOR PARIS OPÉRA',
                icon: '🚂',
                duration: '19:35 - 21:16',
                route: '返回巴黎 (Montparnasse)<br>19:35 TGV INOUI 8736 → 21:16 抵達巴黎 '
            }
        ]
    },
    4: {
        title: 'Day 4 | 凱旋門、奧賽與左岸 (2/17)',
        weather: null,
        items: [
            {
                type: 'card',
                category: '早餐',
                title: 'Azur Café',
                time: '08:30 - 09:00',
                description: '必吃可頌、咖啡、熱巧克力；建議早點到避免人多 ',
                hours: ['請查閱官網確認'],
                location: 'Azur Café Paris',
                image: 'https://images.unsplash.com/photo-1570779836365-a6e5b22b109c?w=800' // 使用杜樂麗花園圖片替代
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'HÔTEL EXCELSIOR PARIS OPÉRA',
                destination: 'Arc de Triomphe Paris',
                icon: '🚇',
                duration: '約 20 分鐘',
                route: '從飯店出發前往凱旋門<br>Chaussée d\'Antin - La Fayette (M9) 直達 Charles de Gaulle Étoile'
            },
            {
                type: 'card',
                category: '景點',
                title: '凱旋門 (Arc de Triomphe)',
                time: '10:00 - 11:00',
                description: '登頂俯瞰香榭麗舍大道全景；10:00 開放，建議先排隊 ',
                hours: ['每日 10:00 - 22:30'],
                location: 'Arc de Triomphe Paris',
                image: 'https://images.unsplash.com/photo-1549117652-3a521c7d2c3e?w=800'
            },
            {
                type: 'card',
                category: '購物/散步',
                title: '蒙田大道 (Avenue Montaigne)',
                time: '11:00 - 12:00',
                description: '沿路精品林立 (LV、Dior、Chanel) ',
                hours: ['請依各店營業時間為準'],
                location: 'Avenue Montaigne, 75008 Paris, France',
                image: 'https://images.unsplash.com/photo-1629838779948-433e147d337a?w=800' // 使用 BHV 圖片替代
            },
            {
                type: 'card',
                category: '午餐',
                title: 'Chez Savy',
                time: '12:00 - 13:20',
                description: '經典法式小館, 必吃牛排、洋蔥湯 ',
                hours: ['請查閱官網確認'],
                location: 'Chez Savy, 23 Rue du Cherche-Midi, 75006 Paris, France',
                image: 'https://images.unsplash.com/photo-1582239339097-9e4a3b19280d?w=800' // 使用 Ober Mamma 圖片替代
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Chez Savy',
                destination: 'Musée d\'Orsay Paris',
                icon: '🚇',
                duration: '約 15 分鐘',
                route: '步行至 Sèvres - Babylone (M10) 或 Saint-Sulpice (M4) → Solférino 站'
            },
            {
                type: 'card',
                category: '景點',
                title: '奧賽美術館 (Musée d\'Orsay)',
                time: '13:30 - 14:30',
                description: '欣賞印象派畫作, 必拍大鐘窗景 ',
                hours: ['09:30 - 18:00 (週四至 21:45)'],
                location: 'Musée d\'Orsay Paris',
                image: 'https://images.unsplash.com/photo-1550992388-517f8b9e6918?w=800'
            },
            {
                type: 'card',
                category: '冰淇淋',
                title: 'Amorino Gelato',
                time: '14:40 - 15:00',
                description: '必吃招牌手工義式冰淇淋，玫瑰造型 ',
                hours: ['請依現場營業時間為準'],
                location: 'Amorino Gelato – Paris Huchette',
                image: 'https://images.unsplash.com/photo-1580979848130-b3e1a0b3f86e?w=800' // 使用遊船圖片替代
            },
            {
                type: 'card',
                category: '點心採買',
                title: '葡式蛋塔 (Nossa Churrasqueira Paris 5)',
                time: '15:10 - 15:30',
                description: '必吃葡式蛋塔 (可選) ',
                hours: ['請依現場營業時間為準'],
                location: 'Nossa Churrasqueira Paris 5',
                image: 'https://images.unsplash.com/photo-1577782390886-07469a4c14c5?w=800' // 使用 Chez René 圖片替代
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Nossa Churrasqueira Paris 5',
                destination: 'Shakespeare and Company Paris',
                icon: '🚶',
                duration: '約 8 分鐘',
                route: '前往莎士比亞書店 (步行 600 公尺)'
            },
            {
                type: 'card',
                category: '書店/拍照',
                title: '莎士比亞書店 (Shakespeare and Company)',
                time: '15:40 - 16:10',
                description: '左岸傳奇書店, 必拍門口招牌 ',
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
                duration: '約 8 分鐘',
                route: '前往晚餐地點 (步行 600 公尺)'
            },
            {
                type: 'card',
                category: '晚餐',
                title: 'Chez René',
                time: '18:00 - 19:00',
                description: '拉丁區經典法式小館, 必吃家常料理 ',
                hours: ['12:00–14:30, 19:30–22:30'],
                location: 'Chez René Paris',
                image: 'https://images.unsplash.com/photo-1577782390886-07469a4c14c5?w=800'
            }
        ]
    },
    5: {
        title: 'Day 5 | 巴黎迪士尼 + Outlet (2/18)',
        weather: null,
        items: [
            {
                type: 'card',
                category: '早餐',
                title: '飯店附近咖啡館/麵包',
                time: '07:30 - 08:15',
                description: '建議吃簡單早餐，並攜帶水與小零食備用 。',
                hours: ['請依現場營業時間為準'],
                location: 'HÔTEL EXCELSIOR PARIS OPÉRA 附近',
                image: 'https://images.unsplash.com/photo-1570779836365-a6e5b22b109c?w=800' // 使用杜樂麗花園圖片替代
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'HÔTEL EXCELSIOR PARIS OPÉRA',
                destination: 'Disneyland Paris',
                icon: '🚈',
                duration: '約 50 分鐘',
                route: '從飯店出發前往迪士尼<br>步行至 Auber 站 → RER A 線 (紅線) 往 Marne-la-Vallée – Chessy (終點站)'
            },
            {
                type: 'card',
                category: '景點',
                title: '巴黎迪士尼 (Disneyland Park)',
                time: '09:30 - 15:00',
                description: '上午與中午遊玩主要設施與拍照，可於園區內午餐。建議使用官方 App 查排隊時間 。',
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
                duration: '約 5 分鐘',
                route: '前往 Outlet<br>RER A 線:1 站 (Val d\'Europe)'
            },
            {
                type: 'card',
                category: '購物',
                title: '山谷購物村 (La Vallée Village Outlet) + Val d’Europe Mall',
                time: '15:15 - 18:30',
                description: '逛精品 Outlet 與大型購物中心。建議在此享用晚餐 (推薦 Big Fernand 或麥當勞) 。',
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
                duration: '約 5 分鐘',
                route: '返回迪士尼<br>RER A 線:1 站'
            },
            {
                type: 'card',
                category: '活動',
                title: '迪士尼夜間遊玩與休息',
                time: '18:45 - 21:45',
                description: '可再玩設施、欣賞夜景、吃點心或拍照 。',
                hours: ['請依 App 為準'],
                location: 'Disneyland Paris',
                image: 'https://images.unsplash.com/photo-1606555541094-a10c14c5c2a1?w=800'
            },
            {
                type: 'card',
                category: '活動',
                title: '迪士尼煙火秀',
                time: '22:00 - 22:30',
                description: '閉園煙火與燈光秀，建議提前佔位 。',
                hours: ['時間請依 App 為準'],
                location: 'Disneyland Paris',
                image: 'https://images.unsplash.com/photo-1606555541094-a10c14c5c2a1?w=800'
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Disneyland Paris',
                destination: 'HÔTEL EXCELSIOR PARIS OPÉRA',
                icon: '🚈',
                duration: '約 60 分鐘',
                route: '搭乘 RER A 線返回 Auber 站，步行 5 分鐘回飯店'
            }
        ]
    },
    6: {
        title: 'Day 6 | 羅浮宮、塞納河遊船與左岸 (2/19)',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Leonardo Boutique Hotel Paris Opera',
                destination: 'Café Joyeux – Opéra',
                icon: '🚶',
                duration: '約 5 分鐘',
                route: '從飯店步行到咖啡廳 (約 400 公尺)'
            },
            {
                type: 'card',
                category: '早餐',
                title: 'Café Joyeux – Opéra',
                time: '08:00 - 08:25',
                description: '必吃可頌、熱巧克力；氣氛溫馨、快速用餐 。',
                hours: ['請查閱官網確認'],
                location: 'Café Joyeux – Opéra',
                image: 'https://images.unsplash.com/photo-1570779836365-a6e5b22b109c?w=800' // 使用杜樂麗花園圖片替代
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Café Joyeux – Opéra',
                destination: 'Louvre Museum Paris',
                icon: '🚇',
                duration: '約 15 分鐘',
                route: '從飯店前往羅浮宮<br>Chaussée d\'Antin - La Fayette (M7) 直達 Palais Royal - Musée du Louvre'
            },
            {
                type: 'card',
                category: '景點',
                title: '羅浮宮 (Louvre Museum)',
                time: '08:45 - 11:30',
                description: '週四開放 (請務必預約)，必拍蒙娜麗莎、勝利女神、米洛的維納斯。<br>備註：去羅浮宮要從這個路口進去 <a href="https://maps.app.goo.gl/wS4FCX7nv6cJYsEy5?g_st=il" target="_blank">查看地圖</a>',
                hours: ['09:00 - 18:00'],
                location: 'Louvre Museum Paris',
                image: 'https://images.unsplash.com/photo-1549722736-218044738734?w=800'
            },
            {
                type: 'card',
                category: '拍照',
                title: '兩柱之間/玻璃金字塔 (Colonnes de Buren)',
                time: '11:30 - 11:45',
                description: '羅浮宮出口，必拍柱框金字塔，上午光線最佳 。',
                hours: ['全天開放'],
                location: 'Colonnes de Buren, 2 Rue de Montpensier, 75001 Paris, France',
                image: 'https://images.unsplash.com/photo-1549722736-218044738734?w=800' // 使用羅浮宮圖片替代
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Louvre Museum Paris',
                destination: 'Comptoir de la Gastronomie',
                icon: '🚶',
                duration: '約 20 分鐘',
                route: '慢步前往午餐餐廳 (步行 1.5 公里)'
            },
            {
                type: 'card',
                category: '午餐',
                title: 'Comptoir de la Gastronomie',
                time: '12:30 - 13:30',
                description: '必吃鴨肝、鴨肉義大利麵；可購買鴨肝罐頭 。',
                hours: ['請查閱官網確認'],
                location: 'Comptoir de la Gastronomie, 34 Rue Montmartre, 75001 Paris, France',
                image: 'https://images.unsplash.com/photo-1582239339097-9e4a3b19280d?w=800' // 使用 Ober Mamma 圖片替代
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Comptoir de la Gastronomie',
                destination: 'Invalides',
                icon: '🚇',
                duration: '約 25 分鐘',
                route: '搭地鐵 8號線 → Invalides 站'
            },
            {
                type: 'card',
                category: '景點',
                title: '榮軍院 (Invalides) 外拍',
                time: '14:00 - 14:30',
                description: '必拍金色圓頂建築 。',
                hours: ['07:30 - 19:30 (教堂參觀時間不同)'],
                location: 'Invalides',
                image: 'https://images.unsplash.com/photo-1523588288593-1e5e04e8d35e?w=800' // 使用亞歷山大三世橋圖片替代
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Invalides',
                destination: 'Pont Alexandre III Paris',
                icon: '🚶',
                duration: '約 8 分鐘',
                route: '步行前往亞歷山大三世橋 (約 600 公尺)'
            },
            {
                type: 'card',
                category: '景點',
                title: '亞歷山大三世橋 (Pont Alexandre III)',
                time: '14:30 - 15:30',
                description: '巴黎最華麗的橋樑, 必拍金色雕像＋遠景艾菲爾鐵塔 ',
                hours: ['全天開放'],
                location: 'Pont Alexandre III Paris',
                image: 'https://images.unsplash.com/photo-1523588288593-1e5e04e8d35e?w=800'
            },
            {
                type: 'card',
                category: '休息/小吃',
                title: 'Amorino',
                time: '15:30 - 16:00',
                description: '休息或享用玫瑰花造型冰淇淋 。',
                hours: ['請依現場營業時間為準'],
                location: 'Amorino (附近分店)',
                image: 'https://images.unsplash.com/photo-1580979848130-b3e1a0b3f86e?w=800' // 使用遊船圖片替代
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Pont Alexandre III Paris',
                destination: 'Bateaux Parisiens',
                icon: '🚶',
                duration: '約 20 分鐘',
                route: '前往遊船碼頭 (步行 1.6 公里)'
            },
            {
                type: 'card',
                category: '活動',
                title: '塞納河遊船 (Bateaux Parisiens)',
                time: '17:00 - 18:00',
                description: '船程約 1 小時，建議提前 15 分鐘排隊登船 。',
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
                duration: '約 20 分鐘',
                route: '前往晚餐地點<br>Iéna (M9) → École Militaire (M8)'
            },
            {
                type: 'card',
                category: '晚餐',
                title: 'Le Crépuscule',
                time: '18:10 - 19:30',
                description: '道地法式可麗餅 (必吃鹹薄餅＋甜可麗餅) ',
                hours: ['請查閱官網確認'],
                location: 'Le Crépuscule Paris',
                image: 'https://images.unsplash.com/photo-1577782390886-07469a4c14c5?w=800'
            }
        ]
    },
    7: {
        title: 'Day 7 | 凡爾賽宮、艾菲爾鐵塔 (2/20)',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Leonardo Boutique Hotel Paris Opera',
                destination: 'Château de Versailles',
                icon: '🚈',
                duration: '約 60 分鐘',
                route: '前往凡爾賽宮<br>搭乘 RER C 線至 Versailles Château Rive Gauche 站，步行 10 分鐘'
            },
            {
                type: 'card',
                category: '景點',
                title: '凡爾賽宮 (Château de Versailles)',
                time: '09:00 - 11:30',
                description: '參觀鏡廳、國王/皇后寢宮。預約最早場，建議提早安檢。',
                hours: ['09:00 - 17:30 (週一休)'],
                location: 'Place d\'Armes, 78000 Versailles',
                image: 'https://images.unsplash.com/photo-1545494097-1545e22ee88c?w=800'
            },
            {
                type: 'card',
                category: '景點',
                title: '凡爾賽花園 (Gardens of Versailles)',
                time: '11:30 - 13:00',
                description: '漫步花園與運河。花園腹地大，可租高爾夫球車或搭小火車。',
                hours: ['08:00 - 18:00'],
                location: 'Gardens of Versailles',
                image: 'https://images.unsplash.com/photo-1574092049969-e7722797e870?w=800' // 修正為花園或類似圖片
            },
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: 'Château de Versailles',
                destination: 'Le Bistrot des Fables',
                icon: '🚈',
                duration: '約 60-70 分鐘',
                route: '返回巴黎市區<br>搭乘 RER C 線返回，轉乘地鐵至餐廳或春天百貨附近'
            },
            {
                type: 'card',
                category: '購物',
                title: '春天百貨 (Printemps Haussmann)',
                time: '14:30 - 16:30',
                description: '位於飯店隔壁的經典百貨公司。出示此邀請函可享 95 折優惠與 12% 退稅。',
                hours: ['週一至週六 10:00 - 20:00', '週日 11:00 - 20:00'],
                location: '64 Bd Haussmann, 75009 Paris, France',
                image: './images/printemps-voucher.png'
            },
            {
                type: 'card',
                category: '晚餐',
                title: 'Le Bistrot des Fables',
                time: '17:00 - 18:15',
                description: '米其林推薦餐廳，建議提前訂位。',
                hours: ['12:00–14:30, 19:00–22:30 (請確認營業時間)'],
                location: '139 Rue Saint-Dominique, 75007 Paris',
                image: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=800'
            },
            {
                type: 'card',
                category: '拍照',
                title: 'L\'Howea 花店 & 比爾阿克姆橋 (Pont de Bir-Hakeim)',
                time: '19:00 - 19:30',
                description: '巴黎最美花店與《全面啟動》電影場景橋樑拍照。',
                hours: ['全天開放'],
                location: 'Pont de Bir-Hakeim',
                image: 'https://images.unsplash.com/photo-1471623320832-752e8bbf8413?w=800' // 使用巴黎街景
            },
            {
                type: 'transit',
                mode: 'WALKING',
                origin: 'Pont de Bir-Hakeim',
                destination: 'Champ de Mars',
                icon: '🚶',
                duration: '約 10 分鐘',
                route: '步行前往戰神廣場'
            },
            {
                type: 'card',
                category: '景點/拍照',
                title: '戰神廣場 (Champ de Mars)',
                time: '19:30 - 20:30',
                description: '拍攝艾菲爾鐵塔全景的最佳地點。',
                hours: ['全天開放'],
                location: 'Champ de Mars',
                image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?w=800'
            },
            {
                type: 'card',
                category: '景點',
                title: '艾菲爾鐵塔 (Eiffel Tower)',
                time: '20:30 - 21:30',
                description: '近距離欣賞鐵塔，尋找最佳拍攝點。',
                hours: ['09:30 - 22:45'],
                location: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
                image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800'
            },
            {
                type: 'card',
                category: '拍照/夜景',
                title: '夏佑宮 (Palais de Chaillot)',
                time: '21:30 - 21:50',
                description: '與艾菲爾鐵塔對望的絕佳觀景平台，適合拍點燈夜景。',
                hours: ['全天開放'],
                location: 'Place du Trocadéro',
                image: 'https://images.unsplash.com/photo-1549479366-c956c38722b5?w=800' // 暫用通用圖
            },
            {
                type: 'card',
                category: '宵夜',
                title: 'La Villa',
                time: '22:00 - 23:00',
                description: '享受巴黎夜晚的隨性自在，酒吧/宵夜。',
                hours: ['請依現場營業時間為準'],
                location: 'La Villa Paris',
                image: 'https://images.unsplash.com/photo-1577782390886-07469a4c14c5?w=800'
            }
        ]
    },
    8: {
        title: 'Day 8 | 返回台灣 (2/21 - 2/22)',
        weather: null,
        items: [
            {
                type: 'transit',
                mode: 'TRANSIT',
                origin: '巴黎戴高樂機場 (CDG)',
                destination: '台北桃園機場 (TPE)',
                icon: '✈️',
                duration: '回程航班',
                route: [
                    '【第一段】2/21 (六)',
                    '時間：10:40 - 06:15+1',
                    '航廈：CDG Terminal 1 → SIN Terminal 3',
                    '航班：新加坡航空 SQ335',
                    '機型：Airbus A350-900',
                    '',
                    '轉機時間：1小時55分鐘',
                    '',
                    '【第二段】2/22 (日)',
                    '時間：08:10 - 12:55',
                    '航廈：SIN Terminal 3 → TPE Terminal 2',
                    '航班：新加坡航空 SQ876',
                    '機型：Boeing 787-10'
                ],
                ticketUrl: ''
            }
        ]
    }
};