// 迪士尼樂園攻略資料
export const disneylandData = {
    // 熱門設施推薦
    attractions: [
        {
            name: '印第安納瓊斯',
            nameEn: 'Indiana Jones and the Temple of Peril',
            rating: 4,
            description: '巴黎限定，較為刺激的室外過山車。',
            thrillLevel: 100
        },
        {
            name: '巨雷山',
            nameEn: 'Big Thunder Mountain Railroad',
            rating: 4,
            description: '熱門設施，較印第安納瓊斯溫和一點的室外過山車。',
            thrillLevel: 85
        },
        {
            name: '星際大戰太空山',
            nameEn: 'Star Wars Hyperspace Mountain',
            rating: 4,
            description: '星際大戰主題的室內過山車。',
            thrillLevel: 100
        },
        {
            name: '星際冒險',
            nameEn: 'Star Tours-The Adventure Continue',
            rating: 3.5,
            description: '星際大戰電影的4D體驗。',
            thrillLevel: 0
        },

        {
            name: '馳車天地',
            nameEn: 'Autopia',
            rating: 2,
            description: '在固定軌道上行駛汽車，適合爸媽陪同小朋友體驗開車。',
            thrillLevel: 0
        },
        {
            name: '園遊花車',
            nameEn: 'Disney Stars on Parade',
            rating: 3.5,
            description: '雖然氣氛感染力沒有日本迪士尼濃烈，但還是可以拍一拍照。',
            thrillLevel: 0
        },
        {
            name: '夜間煙火秀',
            nameEn: 'Disney Illuminations',
            rating: 5,
            description: '必看，值得留下來等待，並以此劃下巴黎迪士尼的完美句號。',
            thrillLevel: 0
        }
    ],

    // 詳細一日遊時間表（無快速通關版本）
    schedule: [
        {
            time: '08:30',
            title: '入園準備與開園衝刺',
            description: '提早到達過安檢,開園後第一時間衝刺熱門設施',
            category: '入園'
        },
        {
            time: '09:40',
            title: '巨雷山雲霄飛車',
            nameEn: 'Big Thunder Mountain Railroad',
            type: '🎢 戶外雲霄飛車',
            description: '開園後第一個玩,此時排隊約15-20分鐘。戶外雲霄飛車,快速翻轉、超長軌道超好玩',
            category: '邊疆世界',
            thrillLevel: 85,
            waitTime: '15-20分鐘'
        },
        {
            time: '10:10',
            title: '幽靈公館',
            nameEn: 'Phantom Manor',
            type: '🏚️ 暗黑騎乘',
            description: '巴黎限定版本,比美國版更陰森。同區域接著玩,排隊約15-20分鐘',
            category: '邊疆世界',
            thrillLevel: 20,
            waitTime: '15-20分鐘'
        },
        {
            time: '10:40',
            title: '印第安那瓊斯雲霄飛車',
            nameEn: 'Indiana Jones and the Temple of Peril',
            type: '🎢 戶外雲霄飛車',
            description: '趁人潮還沒湧入,玩第二個熱門設施。刺激度100%,戶外雲霄飛車,有360度翻轉',
            category: '探險世界',
            thrillLevel: 100,
            waitTime: '20-30分鐘'
        },
        {
            time: '11:20',
            title: '加勒比海盜船',
            nameEn: 'Pirates of the Caribbean',
            type: '🚣 室內船遊',
            description: '同區域接著玩,排隊約20-25分鐘。搭船看海盜故事場景,場景較暗、氣氛陰森',
            category: '探險世界',
            thrillLevel: 20,
            waitTime: '20-25分鐘'
        },
        {
            time: '11:50',
            title: 'Disney Stars on Parade遊行',
            description: '大約30分鐘,有米奇米妮、玩具總動員、公主系列等。找面向城堡左側的位置,可以拍遊行和城堡',
            category: '遊行',
            duration: 30
        },
        {
            time: '12:30',
            title: '愛麗絲迷宮',
            nameEn: 'Alice\'s Curious Labyrinth',
            type: '🌳 步行迷宮',
            description: '巴黎迪士尼特色景點,步行迷宮可俯瞰城堡。適合拍照,幾乎不用排隊',
            category: '幻想世界',
            thrillLevel: 0,
            waitTime: '免排隊'
        },
        {
            time: '12:55',
            title: '小小世界',
            nameEn: 'It\'s a Small World',
            type: '🚣 室內船遊',
            description: '迪士尼經典中的經典!同區域接著玩,排隊約15-20分鐘。坐船環遊世界,輕鬆又療癒',
            category: '幻想世界',
            thrillLevel: 0,
            waitTime: '15-20分鐘'
        },
        {
            time: '13:25',
            title: '拍粉紅城堡',
            description: '午後光線柔和,沿著美國小鎮大街,一路拍到灰姑娘城堡',
            category: '拍照'
        },
        {
            time: '13:45',
            title: '星際大戰雲霄飛車',
            nameEn: 'Star Wars Hyperspace Mountain',
            type: '🎢 室內雲霄飛車',
            description: '下午人潮較多,預估排隊40-60分鐘。星際大戰主題室內雲霄飛車,快速又刺激',
            category: '明日世界',
            thrillLevel: 100,
            waitTime: '40-60分鐘'
        },
        {
            time: '14:55',
            title: '星際冒險',
            nameEn: 'Star Tours: The Adventures Continue',
            type: '🎬 4D模擬器',
            description: '同區域接著玩,排隊約15-20分鐘。星際大戰電影的4D體驗,適合休息',
            category: '明日世界',
            thrillLevel: 0,
            waitTime: '15-20分鐘'
        },
        {
            time: '15:15',
            title: '離開迪士尼前往 Outlet',
            description: '搭乘 RER A 線,1 站即可抵達 Val d\'Europe',
            category: '交通'
        },
        {
            time: '15:30',
            title: 'La Vallée Village Outlet + Val d\'Europe Mall',
            nameEn: 'Shopping Time',
            description: '逛精品 Outlet 與大型購物中心。建議在此享用晚餐 (推薦 Big Fernand 或麥當勞)',
            category: '購物',
            duration: 270
        },
        {
            time: '20:00',
            title: '返回迪士尼準備觀賞煙火',
            description: '搭乘 RER A 線返回 Marne-la-Vallée - Chessy 站,直接前往城堡前方佔位',
            category: '交通'
        },
        {
            time: '20:30',
            title: '夜間煙火秀',
            nameEn: 'Disney Illuminations',
            description: '必看！結合燈光、投影和煙火的精彩表演,是巴黎迪士尼的完美句點',
            category: '煙火秀',
            thrillLevel: 0,
            duration: 30
        }
    ],
    // 溫馨提示（無快速通關策略）
    tips: [
        '⏰ 開園時間衝刺最重要！開園後立刻前往最想玩的設施，此時排隊時間最短',
        '📱 務必下載迪士尼官方App，隨時查看各設施的即時排隊時間，彈性調整行程',
        '🐻 想見小熊維尼?每逢整點和30分在 Main Street U.S.A. 都有 Meet Winnie The Pooh 見面會',
        '🍽️ 利用午餐和晚餐時間玩設施，因為大部分遊客都在用餐，排隊人數會減少',
        '🎢 依照刺激度和體力分配：早上玩刺激設施（體力充沛），下午穿插溫和設施休息',
        '🎬 遊行和表演時段，其他設施排隊人數會減少，可以把握機會',
        '💧 園區很大很耗體力，記得隨時補充水分，可自備零食節省時間和金錢',
        '🎆 夜間煙火秀是重點！建議20:00就開始找位置，城堡正前方視野最佳',
        '👥 如果願意分開坐，可以使用Single Rider單人通道，通常排隊時間較短'
    ]
}
