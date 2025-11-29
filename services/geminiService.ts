
import { UserProfile, BudgetData, Recipe } from '../types';

// Database of Recipes with Strict Budgeting Data
export const RECIPES_DB: Record<string, Recipe> = {
    'banh-mi': {
        id: 'banh-mi',
        name: 'Bánh mì ốp la',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20banh%20mi%20op%20la%20fried%20egg%20bread%20breakfast%20close%20up',
        type: 'Bữa sáng',
        time: '10 phút',
        calories: 350,
        desc: 'Bữa sáng nhanh gọn, đầy đủ năng lượng và tiết kiệm.',
        mainIngredient: 'egg',
        imageKeyword: 'vietnamese banh mi op la fried egg bread breakfast close up',
        ingredients: [
            { name: 'Bánh mì', qty: 1, unit: 'cái', price: 3000, category: 'Đồ khô & Bún' },
            { name: 'Trứng gà', qty: 2, unit: 'quả', price: 6000, category: 'Thịt & Hải sản' },
            { name: 'Dưa leo', qty: 50, unit: 'g', price: 1000, category: 'Rau củ quả' },
            { name: 'Xì dầu', qty: 10, unit: 'ml', price: 500, category: 'Gia vị' }
        ],
        instructions: [
            'Làm nóng chảo với một chút dầu ăn hoặc bơ.',
            'Đập 2 quả trứng vào chảo, chiên ốp la theo độ chín mong muốn (lòng đào hoặc chín kỹ).',
            'Rửa sạch dưa leo, thái lát mỏng vừa ăn.',
            'Làm nóng bánh mì bằng lò nướng hoặc áp chảo cho giòn.',
            'Bày trứng và dưa leo vào đĩa hoặc kẹp vào bánh mì. Rưới thêm xì dầu hoặc tương ớt tùy khẩu vị.'
        ]
    },
    'xoi-xeo': {
        id: 'xoi-xeo',
        name: 'Xôi xéo',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20sticky%20rice%20xoi%20xeo%20yellow%20mung%20bean%20onion%20close%20up',
        type: 'Bữa sáng',
        time: '15 phút',
        calories: 450,
        desc: 'Món ăn sáng chắc dạ, thơm mùi hành phi và đậu xanh.',
        mainIngredient: 'sticky_rice',
        imageKeyword: 'vietnamese sticky rice xoi xeo yellow mung bean onion close up',
        ingredients: [
            { name: 'Gạo nếp', qty: 150, unit: 'g', price: 5000, category: 'Đồ khô & Bún' },
            { name: 'Đậu xanh', qty: 50, unit: 'g', price: 3000, category: 'Đồ khô & Bún' },
            { name: 'Hành khô', qty: 10, unit: 'g', price: 2000, category: 'Rau củ quả' },
            { name: 'Mỡ gà', qty: 10, unit: 'ml', price: 1000, category: 'Gia vị' }
        ],
        instructions: [
            'Ngâm gạo nếp với nước nghệ khoảng 6-8 tiếng cho ngấm màu vàng, sau đó đồ chín thành xôi.',
            'Đậu xanh ngâm mềm, đồ chín rồi giã nhuyễn, nắm thành từng nắm tròn chặt tay.',
            'Hành khô thái lát mỏng, phi thơm với mỡ gà cho đến khi vàng giòn.',
            'Khi ăn, xới xôi ra bát, dùng dao thái lát đậu xanh mỏng phủ lên trên.',
            'Rưới mỡ gà và rắc hành phi lên trên cùng rồi thưởng thức.'
        ]
    },
    'bun-rieu': {
        id: 'bun-rieu',
        name: 'Bún riêu cua',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20crab%20noodle%20soup%20bun%20rieu%20delicious',
        type: 'Bữa sáng',
        time: '30 phút',
        calories: 400,
        desc: 'Vị chua thanh của giấm bỗng và ngọt đậm đà của cua đồng.',
        mainIngredient: 'crab',
        imageKeyword: 'vietnamese crab noodle soup bun rieu delicious',
        ingredients: [
            { name: 'Cua đồng xay', qty: 100, unit: 'g', price: 15000, category: 'Thịt & Hải sản' },
            { name: 'Bún', qty: 150, unit: 'g', price: 3000, category: 'Đồ khô & Bún' },
            { name: 'Cà chua', qty: 2, unit: 'quả', price: 3000, category: 'Rau củ quả' },
            { name: 'Rau sống', qty: 50, unit: 'g', price: 2000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Lọc cua xay với nước, đun nhỏ lửa. Khi gạch cua nổi lên thì vớt ra để riêng.',
            'Phi thơm hành, xào cà chua cho mềm để tạo màu.',
            'Đổ cà chua vào nước dùng cua, nêm nếm gia vị, thêm chút giấm bỗng cho chua dịu.',
            'Chần bún qua nước sôi, cho vào bát.',
            'Xếp gạch cua, chan nước dùng nóng hổi, ăn kèm với rau sống tươi ngon.'
        ]
    },
    'banh-cuon': {
        id: 'banh-cuon',
        name: 'Bánh cuốn',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20steamed%20rice%20rolls%20banh%20cuon%20breakfast',
        type: 'Bữa sáng',
        time: '15 phút',
        calories: 320,
        desc: 'Bánh tráng mỏng mềm, nhân thịt mộc nhĩ thơm ngon.',
        mainIngredient: 'pork',
        imageKeyword: 'vietnamese steamed rice rolls banh cuon breakfast',
        ingredients: [
            { name: 'Bánh cuốn ướt', qty: 300, unit: 'g', price: 15000, category: 'Đồ khô & Bún' },
            { name: 'Chả lụa', qty: 50, unit: 'g', price: 10000, category: 'Thịt & Hải sản' },
            { name: 'Rau thơm', qty: 20, unit: 'g', price: 2000, category: 'Rau củ quả' },
            { name: 'Hành phi', qty: 10, unit: 'g', price: 2000, category: 'Gia vị' }
        ],
        instructions: [
            'Hấp nóng bánh cuốn (nếu mua sẵn).',
            'Thái chả lụa thành lát vừa ăn.',
            'Rửa sạch rau thơm, giá đỗ chần sơ.',
            'Pha nước chấm chua ngọt nhạt.',
            'Xếp bánh cuốn ra đĩa, rắc hành phi, ăn kèm chả lụa và nước chấm.'
        ]
    },
    'mi-quang': {
        id: 'mi-quang',
        name: 'Mì Quảng',
        image: 'https://source.unsplash.com/800x600/?mi%20quang%20vietnamese%20turmeric%20noodles%20shrimp%20pork',
        type: 'Bữa sáng',
        time: '35 phút',
        calories: 450,
        desc: 'Đặc sản miền Trung với sợi mì vàng ươm và nước dùng đậm đà.',
        mainIngredient: 'shrimp',
        imageKeyword: 'mi quang vietnamese turmeric noodles shrimp pork',
        ingredients: [
            { name: 'Mì Quảng', qty: 150, unit: 'g', price: 5000, category: 'Đồ khô & Bún' },
            { name: 'Tôm', qty: 50, unit: 'g', price: 15000, category: 'Thịt & Hải sản' },
            { name: 'Thịt ba chỉ', qty: 50, unit: 'g', price: 10000, category: 'Thịt & Hải sản' },
            { name: 'Bánh đa', qty: 1, unit: 'cái', price: 3000, category: 'Đồ khô & Bún' }
        ],
        instructions: [
            'Tôm thịt rửa sạch, ướp gia vị, nghệ.',
            'Phi thơm hành tỏi, xào tôm thịt cho săn, thêm chút nước rim đậm đà.',
            'Chần mì Quảng qua nước sôi.',
            'Cho mì vào bát, xếp tôm thịt, chan nước rim xăm xắp.',
            'Rắc lạc rang, hành lá, ăn kèm bánh đa nướng và rau sống.'
        ]
    },
    'pho-bo': {
        id: 'pho-bo',
        name: 'Phở bò',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20beef%20noodle%20soup%20pho%20bo%20flat%20lay',
        type: 'Bữa trưa',
        time: '45 phút',
        calories: 500,
        desc: 'Món ăn quốc hồn quốc túy, thơm ngon bổ dưỡng.',
        mainIngredient: 'beef',
        imageKeyword: 'vietnamese beef noodle soup pho bo flat lay',
        ingredients: [
            { name: 'Thịt bò', qty: 150, unit: 'g', price: 40000, category: 'Thịt & Hải sản' },
            { name: 'Bánh phở', qty: 200, unit: 'g', price: 10000, category: 'Đồ khô & Bún' },
            { name: 'Hành tây', qty: 50, unit: 'g', price: 2000, category: 'Rau củ quả' },
            { name: 'Rau thơm', qty: 20, unit: 'g', price: 3000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Ninh xương bò để lấy nước dùng ngọt. Nướng gừng và hành tây cho thơm rồi thả vào nồi nước dùng.',
            'Thái thịt bò thành lát mỏng.',
            'Chần bánh phở qua nước sôi rồi cho vào bát tô.',
            'Xếp thịt bò (có thể chần tái hoặc chín tùy ý), hành tây thái mỏng, hành lá lên trên.',
            'Chan nước dùng đang sôi sùng sục vào bát phở và thưởng thức nóng.'
        ]
    },
    'bun-bo-hue': {
        id: 'bun-bo-hue',
        name: 'Bún bò Huế',
        image: 'https://source.unsplash.com/800x600/?bun%20bo%20hue%20spicy%20beef%20noodle%20soup%20vietnam',
        type: 'Bữa trưa',
        time: '50 phút',
        calories: 550,
        desc: 'Hương vị cay nồng đặc trưng của miền Trung.',
        mainIngredient: 'beef',
        imageKeyword: 'bun bo hue spicy beef noodle soup vietnam',
        ingredients: [
            { name: 'Bắp bò', qty: 100, unit: 'g', price: 30000, category: 'Thịt & Hải sản' },
            { name: 'Bún to', qty: 200, unit: 'g', price: 5000, category: 'Đồ khô & Bún' },
            { name: 'Giò heo', qty: 100, unit: 'g', price: 20000, category: 'Thịt & Hải sản' },
            { name: 'Mắm ruốc', qty: 10, unit: 'g', price: 2000, category: 'Gia vị' }
        ],
        instructions: [
            'Hầm giò heo và bắp bò với sả đập dập cho mềm. Vớt bắp bò ra thái lát.',
            'Phi thơm sả băm, ớt bột để làm sa tế.',
            'Hòa mắm ruốc với nước lạnh, để lắng rồi lấy phần nước trong cho vào nồi nước dùng.',
            'Nêm nếm gia vị cho đậm đà, thêm sa tế.',
            'Cho bún sợi to vào bát, xếp thịt bò, móng giò, chan nước dùng và ăn kèm rau chuối, giá đỗ.'
        ]
    },
    'com-tam': {
        id: 'com-tam',
        name: 'Cơm tấm sườn bì',
        image: 'https://source.unsplash.com/800x600/?com%20tam%20vietnam%20broken%20rice%20grilled%20pork',
        type: 'Bữa trưa',
        time: '40 phút',
        calories: 600,
        desc: 'Sài Gòn đặc biệt, sườn nướng thơm lừng.',
        mainIngredient: 'pork',
        imageKeyword: 'com tam vietnam broken rice grilled pork',
        ingredients: [
            { name: 'Gạo tấm', qty: 150, unit: 'g', price: 4000, category: 'Đồ khô & Bún' },
            { name: 'Sườn cốt lết', qty: 120, unit: 'g', price: 25000, category: 'Thịt & Hải sản' },
            { name: 'Bì heo', qty: 30, unit: 'g', price: 5000, category: 'Thịt & Hải sản' },
            { name: 'Dưa chua', qty: 50, unit: 'g', price: 2000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Nấu cơm tấm bằng nồi cơm điện hoặc hấp.',
            'Ướp sườn cốt lết với mật ong, nước mắm, tỏi, hành tím băm khoảng 30 phút.',
            'Nướng sườn trên than hoa hoặc lò nướng cho chín vàng đều.',
            'Làm nước mắm chua ngọt kẹo.',
            'Xới cơm ra đĩa, đặt sườn nướng, bì heo, chả trứng (nếu có) và dưa chua, chan nước mắm lên trên.'
        ]
    },
    'thit-luoc-ca-phao': {
        id: 'thit-luoc-ca-phao',
        name: 'Thịt luộc Cà pháo',
        image: 'https://source.unsplash.com/800x600/?boiled%20pork%20asian%20cuisine%20vietnamese%20food',
        type: 'Bữa trưa',
        time: '25 phút',
        calories: 400,
        desc: 'Món ăn dân dã, mát lành cho ngày hè.',
        mainIngredient: 'pork',
        imageKeyword: 'boiled pork asian cuisine vietnamese food',
        ingredients: [
            { name: 'Thịt ba chỉ', qty: 250, unit: 'g', price: 35000, category: 'Thịt & Hải sản' },
            { name: 'Cà pháo', qty: 100, unit: 'g', price: 5000, category: 'Rau củ quả' },
            { name: 'Rau sống', qty: 50, unit: 'g', price: 3000, category: 'Rau củ quả' },
            { name: 'Mắm tôm', qty: 30, unit: 'g', price: 2000, category: 'Gia vị' }
        ],
        instructions: [
            'Thịt rửa sạch, luộc chín với chút muối và hành tím.',
            'Thái thịt thành miếng mỏng vừa ăn.',
            'Pha mắm tôm với chanh, đường, ớt đánh bông lên.',
            'Ăn kèm cơm trắng, cà pháo muối giòn và rau sống.'
        ]
    },
    'ca-kho-to': {
        id: 'ca-kho-to',
        name: 'Cá lóc kho tộ',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20caramelized%20fish%20claypot%20ca%20kho%20to',
        type: 'Bữa trưa',
        time: '40 phút',
        calories: 450,
        desc: 'Cá kho tộ đậm đà, ăn với cơm trắng rất tốn cơm.',
        mainIngredient: 'fish',
        imageKeyword: 'vietnamese caramelized fish claypot ca kho to',
        ingredients: [
            { name: 'Cá lóc', qty: 300, unit: 'g', price: 30000, category: 'Thịt & Hải sản' },
            { name: 'Thịt ba chỉ', qty: 50, unit: 'g', price: 10000, category: 'Thịt & Hải sản' },
            { name: 'Hành tím', qty: 20, unit: 'g', price: 2000, category: 'Rau củ quả' },
            { name: 'Gia vị kho', qty: 1, unit: 'gói', price: 3000, category: 'Gia vị' }
        ],
        instructions: [
            'Cá làm sạch, cắt khúc vừa ăn, ướp với gia vị kho khoảng 20 phút.',
            'Thịt ba chỉ thái miếng nhỏ, đảo cháy cạnh.',
            'Xếp cá vào nồi đất (nếu có), cho thịt ba chỉ lên trên.',
            'Thêm nước hàng, nước mắm, ớt, đun nhỏ lửa liu riu.',
            'Kho đến khi nước sốt keo lại, rắc hành lá và hạt tiêu rồi tắt bếp.'
        ]
    },
    'canh-bi-do': {
        id: 'canh-bi-do',
        name: 'Canh bí đỏ thịt bằm',
        image: 'https://source.unsplash.com/800x600/?pumpkin%20soup%20minced%20pork%20asian%20style',
        type: 'Bữa trưa',
        time: '20 phút',
        calories: 250,
        desc: 'Món canh ngọt mát, bổ dưỡng cho cả gia đình.',
        mainIngredient: 'pork',
        imageKeyword: 'pumpkin soup minced pork asian style',
        ingredients: [
            { name: 'Bí đỏ', qty: 300, unit: 'g', price: 5000, category: 'Rau củ quả' },
            { name: 'Thịt bằm', qty: 100, unit: 'g', price: 15000, category: 'Thịt & Hải sản' },
            { name: 'Hành ngò', qty: 10, unit: 'g', price: 2000, category: 'Rau củ quả' },
            { name: 'Gia vị', qty: 10, unit: 'g', price: 1000, category: 'Gia vị' }
        ],
        instructions: [
            'Bí đỏ gọt vỏ, rửa sạch, thái miếng vuông vừa ăn.',
            'Thịt bằm ướp chút hạt nêm, hành tím băm.',
            'Phi thơm hành, cho thịt bằm vào xào săn, đổ nước vào đun sôi.',
            'Thả bí đỏ vào nấu chín mềm. Nêm nếm gia vị vừa miệng.',
            'Rắc hành ngò thái nhỏ rồi tắt bếp.'
        ]
    },
    'ga-rang-gung': {
        id: 'ga-rang-gung',
        name: 'Gà rang gừng',
        image: 'https://source.unsplash.com/800x600/?braised%20chicken%20ginger%20asian%20food',
        type: 'Bữa tối',
        time: '30 phút',
        calories: 450,
        desc: 'Món ăn đưa cơm, ấm bụng ngày mưa.',
        mainIngredient: 'chicken',
        imageKeyword: 'braised chicken ginger asian food',
        ingredients: [
            { name: 'Thịt gà', qty: 200, unit: 'g', price: 20000, category: 'Thịt & Hải sản' },
            { name: 'Gừng', qty: 20, unit: 'g', price: 1000, category: 'Rau củ quả' },
            { name: 'Gia vị', qty: 10, unit: 'g', price: 1000, category: 'Gia vị' }
        ],
        instructions: [
            'Thịt gà rửa sạch, chặt miếng vừa ăn. Ướp với nước mắm, hạt tiêu, gừng thái sợi khoảng 15 phút.',
            'Làm nóng chảo với chút dầu ăn, cho gà vào đảo đều tay cho săn lại.',
            'Thêm một chút nước, đun nhỏ lửa cho gà chín mềm và ngấm gia vị.',
            'Khi nước cạn sền sệt, gà có màu vàng đẹp mắt thì tắt bếp.',
            'Múc ra đĩa, rắc thêm chút lá chanh thái chỉ nếu thích.'
        ]
    },
    'dau-sot-ca': {
        id: 'dau-sot-ca',
        name: 'Đậu phụ sốt cà chua',
        image: 'https://source.unsplash.com/800x600/?tofu%20tomato%20sauce%20asian%20food%20vegetarian',
        type: 'Bữa tối',
        time: '20 phút',
        calories: 300,
        desc: 'Món chay thanh đạm, siêu tiết kiệm.',
        mainIngredient: 'tofu',
        imageKeyword: 'tofu tomato sauce asian food vegetarian',
        ingredients: [
            { name: 'Đậu phụ', qty: 3, unit: 'bìa', price: 9000, category: 'Đồ khô & Bún' },
            { name: 'Cà chua', qty: 2, unit: 'quả', price: 3000, category: 'Rau củ quả' },
            { name: 'Hành lá', qty: 10, unit: 'g', price: 1000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Đậu phụ cắt miếng vuông, chiên vàng đều các mặt rồi vớt ra.',
            'Cà chua thái hạt lựu. Phi thơm đầu hành, cho cà chua vào xào mềm nhừ.',
            'Thêm một chút nước và gia vị vào sốt cà chua, đun sôi.',
            'Cho đậu phụ đã chiên vào chảo sốt, hạ nhỏ lửa đun khoảng 5-7 phút cho ngấm.',
            'Rắc hành lá thái nhỏ vào rồi tắt bếp, múc ra đĩa.'
        ]
    },
    'salad-ga': {
        id: 'salad-ga',
        name: 'Salad Gà & Diêm mạch',
        image: 'https://source.unsplash.com/800x600/?chicken%20quinoa%20salad%20healthy%20food',
        type: 'Bữa tối',
        time: '20 phút',
        calories: 320,
        desc: 'Bữa tối nhẹ bụng, giàu chất xơ và vitamin.',
        mainIngredient: 'chicken',
        imageKeyword: 'chicken quinoa salad healthy food',
        ingredients: [
            { name: 'Ức gà', qty: 200, unit: 'g', price: 25000, category: 'Thịt & Hải sản' },
            { name: 'Diêm mạch', qty: 50, unit: 'g', price: 15000, category: 'Đồ khô & Bún' },
            { name: 'Xà lách', qty: 100, unit: 'g', price: 5000, category: 'Rau củ quả' },
            { name: 'Cà chua bi', qty: 50, unit: 'g', price: 5000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Ức gà luộc hoặc áp chảo chín tới, xé sợi hoặc thái miếng vuông.',
            'Diêm mạch (quinoa) nấu chín theo hướng dẫn trên bao bì.',
            'Rau xà lách rửa sạch, cắt khúc. Cà chua bi cắt đôi.',
            'Pha nước sốt dầu giấm hoặc sốt mè rang.',
            'Trộn đều ức gà, diêm mạch, rau củ với nước sốt trong một bát lớn rồi thưởng thức.'
        ]
    },
    'bun-cha': {
        id: 'bun-cha',
        name: 'Bún Chả Hà Nội',
        image: 'https://source.unsplash.com/800x600/?bun%20cha%20hanoi%20pork%20noodle',
        type: 'Bữa tối',
        time: '30 phút',
        calories: 600,
        desc: 'Hương vị đậm đà, hài hòa chua cay mặn ngọt.',
        mainIngredient: 'pork',
        imageKeyword: 'bun cha hanoi pork noodle',
        ingredients: [
            { name: 'Thịt ba chỉ', qty: 150, unit: 'g', price: 30000, category: 'Thịt & Hải sản' },
            { name: 'Bún tươi', qty: 200, unit: 'g', price: 5000, category: 'Đồ khô & Bún' },
            { name: 'Nước mắm', qty: 30, unit: 'ml', price: 2000, category: 'Gia vị' },
            { name: 'Đu đủ xanh', qty: 50, unit: 'g', price: 3000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Thịt ba chỉ thái miếng mỏng, ướp với hành khô băm, nước mắm, đường, nước hàng.',
            'Nướng thịt trên than hoa cho thơm (hoặc dùng nồi chiên không dầu).',
            'Đu đủ xanh, cà rốt tỉa hoa, ngâm giấm đường làm dưa góp.',
            'Pha nước chấm chua ngọt tỏi ớt theo tỉ lệ vàng.',
            'Thả thịt nướng vào bát nước chấm ấm nóng, ăn kèm bún và rau sống.'
        ]
    },
    'canh-chua': {
        id: 'canh-chua',
        name: 'Canh chua cá lóc',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20sour%20soup%20canh%20chua%20ca%20loc',
        type: 'Bữa tối',
        time: '35 phút',
        calories: 400,
        desc: 'Vị chua thanh mát, giải nhiệt cho bữa tối.',
        mainIngredient: 'fish',
        imageKeyword: 'vietnamese sour soup canh chua ca loc',
        ingredients: [
            { name: 'Cá lóc', qty: 200, unit: 'g', price: 30000, category: 'Thịt & Hải sản' },
            { name: 'Bạc hà', qty: 50, unit: 'g', price: 3000, category: 'Rau củ quả' },
            { name: 'Đậu bắp', qty: 50, unit: 'g', price: 3000, category: 'Rau củ quả' },
            { name: 'Me chua', qty: 20, unit: 'g', price: 2000, category: 'Gia vị' }
        ],
        instructions: [
            'Cá lóc làm sạch, cắt khúc. Ướp chút gia vị.',
            'Phi thơm tỏi, cho cà chua vào xào, đổ nước sôi vào.',
            'Lọc nước cốt me chua cho vào nồi canh. Thả cá vào đun chín.',
            'Thêm dứa, đậu bắp, bạc hà, giá đỗ vào đun sôi lại.',
            'Nêm nếm vừa ăn, rắc rau ngổ, mùi tàu thái nhỏ và ớt tươi rồi tắt bếp.'
        ]
    },
    'thit-kho': {
        id: 'thit-kho',
        name: 'Thịt kho tàu',
        image: 'https://source.unsplash.com/800x600/?thit%20kho%20tau%20braised%20pork%20belly%20egg',
        type: 'Bữa tối',
        time: '60 phút',
        calories: 700,
        desc: 'Món ăn truyền thống, đậm đà đưa cơm.',
        mainIngredient: 'pork',
        imageKeyword: 'thit kho tau braised pork belly egg',
        ingredients: [
            { name: 'Thịt ba chỉ', qty: 200, unit: 'g', price: 40000, category: 'Thịt & Hải sản' },
            { name: 'Trứng vịt', qty: 2, unit: 'quả', price: 8000, category: 'Thịt & Hải sản' },
            { name: 'Nước dừa', qty: 200, unit: 'ml', price: 5000, category: 'Gia vị' },
            { name: 'Gia vị kho', qty: 1, unit: 'gói', price: 3000, category: 'Gia vị' }
        ],
        instructions: [
            'Thịt ba chỉ thái miếng to vuông vức, chần sơ qua nước sôi.',
            'Ướp thịt với nước mắm, đường, hành tỏi băm khoảng 30 phút.',
            'Trứng vịt luộc chín, bóc vỏ. (Có thể chiên sơ trứng nếu thích).',
            'Thắng nước hàng (nước màu) hoặc dùng gói gia vị kho.',
            'Cho thịt vào nồi, đổ nước dừa tươi vào kho nhỏ lửa. Khi thịt mềm thì cho trứng vào kho cùng đến khi nước cạn sệt.'
        ]
    },
    'tom-rim': {
        id: 'tom-rim',
        name: 'Tôm rim thịt',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20braised%20pork%20and%20shrimp%20tom%20rim%20thit',
        type: 'Bữa tối',
        time: '30 phút',
        calories: 500,
        desc: 'Tôm thịt đậm đà, màu sắc bắt mắt, rất đưa cơm.',
        mainIngredient: 'shrimp',
        imageKeyword: 'vietnamese braised pork and shrimp tom rim thit',
        ingredients: [
            { name: 'Tôm đất', qty: 200, unit: 'g', price: 30000, category: 'Thịt & Hải sản' },
            { name: 'Thịt ba chỉ', qty: 150, unit: 'g', price: 20000, category: 'Thịt & Hải sản' },
            { name: 'Hành tỏi', qty: 10, unit: 'g', price: 2000, category: 'Rau củ quả' },
            { name: 'Nước màu', qty: 5, unit: 'ml', price: 1000, category: 'Gia vị' }
        ],
        instructions: [
            'Tôm rửa sạch, cắt râu. Thịt ba chỉ thái miếng nhỏ vừa ăn.',
            'Ướp thịt và tôm với nước mắm, đường, hành tỏi băm.',
            'Phi thơm hành, cho thịt vào xào săn lại.',
            'Cho tôm vào đảo cùng, thêm chút nước màu và nước xâm xấp.',
            'Rim nhỏ lửa đến khi nước cạn sệt, tôm thịt thấm gia vị đậm đà thì rắc hạt tiêu và tắt bếp.'
        ]
    },
    'muop-dang': {
        id: 'muop-dang',
        name: 'Canh mướp đắng nhồi thịt',
        image: 'https://source.unsplash.com/800x600/?stuffed%20bitter%20melon%20soup%20kho%20qua%20nhoi%20thit',
        type: 'Bữa tối',
        time: '40 phút',
        calories: 350,
        desc: 'Món canh thanh mát, giải nhiệt, vị đắng hậu ngọt.',
        mainIngredient: 'pork',
        imageKeyword: 'stuffed bitter melon soup kho qua nhoi thit',
        ingredients: [
            { name: 'Mướp đắng', qty: 2, unit: 'quả', price: 6000, category: 'Rau củ quả' },
            { name: 'Thịt bằm', qty: 150, unit: 'g', price: 20000, category: 'Thịt & Hải sản' },
            { name: 'Mộc nhĩ', qty: 10, unit: 'g', price: 2000, category: 'Đồ khô & Bún' },
            { name: 'Hành lá', qty: 10, unit: 'g', price: 1000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Mướp đắng cắt khúc, bỏ ruột. Mộc nhĩ ngâm nở, băm nhỏ.',
            'Trộn thịt bằm với mộc nhĩ, hành tím, gia vị, hạt tiêu.',
            'Nhồi nhân thịt vào từng khúc mướp đắng.',
            'Đun sôi nồi nước (có thể dùng nước hầm xương), thả mướp đắng vào hầm mềm.',
            'Nêm nếm gia vị vừa ăn, rắc hành lá rồi tắt bếp.'
        ]
    },
    'rau-xao': {
        id: 'rau-xao',
        name: 'Rau muống xào tỏi',
        image: 'https://source.unsplash.com/800x600/?stir%20fried%20water%20spinach%20garlic%20morning%20glory',
        type: 'Bữa trưa',
        time: '10 phút',
        calories: 150,
        desc: 'Đơn giản, nhanh gọn và bổ sung chất xơ.',
        mainIngredient: 'vegetable',
        imageKeyword: 'stir fried water spinach garlic morning glory',
        ingredients: [
            { name: 'Rau muống', qty: 300, unit: 'g', price: 5000, category: 'Rau củ quả' },
            { name: 'Tỏi', qty: 1, unit: 'củ', price: 2000, category: 'Rau củ quả' },
            { name: 'Dầu ăn', qty: 20, unit: 'ml', price: 1000, category: 'Gia vị' },
            { name: 'Gia vị', qty: 10, unit: 'g', price: 500, category: 'Gia vị' }
        ],
        instructions: [
            'Rau muống nhặt sạch, rửa nhiều lần với nước, để ráo.',
            'Tỏi bóc vỏ, đập dập.',
            'Chần rau qua nước sôi với chút muối để rau xanh, vớt ra ngâm nước đá lạnh.',
            'Phi thơm tỏi với dầu ăn, cho rau vào xào lửa lớn thật nhanh tay.',
            'Nêm gia vị vừa ăn, đảo đều rồi tắt bếp ngay để rau giữ độ giòn.'
        ]
    },
    'vit-om-sau': {
        id: 'vit-om-sau',
        name: 'Vịt om sấu',
        image: 'https://source.unsplash.com/800x600/?duck%20stew%20dracontomelon%20vietnamese%20vit%20om%20sau',
        type: 'Bữa tối',
        time: '50 phút',
        calories: 550,
        desc: 'Vịt béo ngậy kết hợp với vị chua thanh của sấu.',
        mainIngredient: 'duck',
        imageKeyword: 'duck stew dracontomelon vietnamese vit om sau',
        ingredients: [
            { name: 'Thịt vịt', qty: 300, unit: 'g', price: 40000, category: 'Thịt & Hải sản' },
            { name: 'Sấu', qty: 5, unit: 'quả', price: 2000, category: 'Rau củ quả' },
            { name: 'Khoai sọ', qty: 200, unit: 'g', price: 5000, category: 'Rau củ quả' },
            { name: 'Rau ngổ', qty: 10, unit: 'g', price: 1000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Vịt rửa sạch với gừng và rượu, chặt miếng vừa ăn.',
            'Ướp vịt với gia vị, sả, tỏi băm khoảng 20 phút.',
            'Xào săn thịt vịt, đổ nước vào đun sôi, thả sấu vào.',
            'Khi vịt mềm, cho khoai sọ vào nấu cùng đến khi bở tơi.',
            'Dầm sấu lấy độ chua, rắc rau ngổ, mùi tàu rồi tắt bếp.'
        ]
    },
    'muc-xao': {
        id: 'muc-xao',
        name: 'Mực xào dứa',
        image: 'https://source.unsplash.com/800x600/?stir%20fried%20squid%20pineapple%20muc%20xao%20dua',
        type: 'Bữa tối',
        time: '20 phút',
        calories: 300,
        desc: 'Món hải sản giòn ngọt, kết hợp dứa chua dịu.',
        mainIngredient: 'squid',
        imageKeyword: 'stir fried squid pineapple muc xao dua',
        ingredients: [
            { name: 'Mực tươi', qty: 200, unit: 'g', price: 40000, category: 'Thịt & Hải sản' },
            { name: 'Dứa', qty: 1/2, unit: 'quả', price: 5000, category: 'Rau củ quả' },
            { name: 'Cần tây', qty: 50, unit: 'g', price: 3000, category: 'Rau củ quả' },
            { name: 'Tỏi tây', qty: 20, unit: 'g', price: 2000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Mực làm sạch, khía vảy rồng, thái miếng vừa ăn.',
            'Dứa thái miếng, cần tây tỏi tây cắt khúc.',
            'Phi thơm tỏi, xào mực với lửa lớn cho săn rồi trút ra đĩa.',
            'Xào dứa và rau củ chín tới, đổ mực vào đảo cùng.',
            'Nêm gia vị, rắc hạt tiêu và tắt bếp.'
        ]
    },
    'trung-ran': {
        id: 'trung-ran',
        name: 'Trứng rán ngải cứu',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20wormwood%20omelet%20trung%20ga%20ngai%20cuu',
        type: 'Bữa tối',
        time: '15 phút',
        calories: 250,
        desc: 'Món ăn bài thuốc, tốt cho sức khỏe.',
        mainIngredient: 'egg',
        imageKeyword: 'vietnamese wormwood omelet trung ga ngai cuu',
        ingredients: [
            { name: 'Trứng gà', qty: 3, unit: 'quả', price: 10000, category: 'Thịt & Hải sản' },
            { name: 'Ngải cứu', qty: 100, unit: 'g', price: 3000, category: 'Rau củ quả' },
            { name: 'Hành tím', qty: 10, unit: 'g', price: 1000, category: 'Rau củ quả' },
            { name: 'Gia vị', qty: 10, unit: 'g', price: 500, category: 'Gia vị' }
        ],
        instructions: [
            'Ngải cứu nhặt lấy lá non, rửa sạch, thái nhỏ.',
            'Đập trứng ra bát, thêm ngải cứu, thịt băm (nếu thích) và gia vị, đánh đều.',
            'Làm nóng chảo dầu, đổ trứng vào chiên vàng đều hai mặt.',
            'Cắt miếng vừa ăn, dùng nóng.'
        ]
    },
    'canh-ngao': {
        id: 'canh-ngao',
        name: 'Canh ngao nấu chua',
        image: 'https://source.unsplash.com/800x600/?clam%20sour%20soup%20vietnamese%20canh%20ngao',
        type: 'Bữa tối',
        time: '20 phút',
        calories: 200,
        desc: 'Ngọt mát vị hải sản, chua dịu vị dứa me.',
        mainIngredient: 'clam',
        imageKeyword: 'clam sour soup vietnamese canh ngao',
        ingredients: [
            { name: 'Ngao', qty: 500, unit: 'g', price: 15000, category: 'Thịt & Hải sản' },
            { name: 'Dứa', qty: 1/4, unit: 'quả', price: 3000, category: 'Rau củ quả' },
            { name: 'Cà chua', qty: 2, unit: 'quả', price: 3000, category: 'Rau củ quả' },
            { name: 'Rau răm', qty: 10, unit: 'g', price: 1000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Ngao ngâm sạch cát, luộc há miệng, tách lấy thịt, lọc nước trong.',
            'Phi thơm hành, xào cà chua, cho thịt ngao vào đảo sơ.',
            'Đổ nước luộc ngao vào đun sôi, thêm dứa.',
            'Nêm nếm gia vị chua ngọt vừa ăn.',
            'Rắc rau răm, thì là, hành lá rồi tắt bếp.'
        ]
    },
    'nem-ran': {
        id: 'nem-ran',
        name: 'Nem rán (Chả giò)',
        image: 'https://source.unsplash.com/800x600/?vietnamese%20spring%20rolls%20nem%20ran%20cha%20gio',
        type: 'Bữa tối',
        time: '60 phút',
        calories: 600,
        desc: 'Món ăn truyền thống không thể thiếu trong mâm cỗ.',
        mainIngredient: 'pork',
        imageKeyword: 'vietnamese spring rolls nem ran cha gio',
        ingredients: [
            { name: 'Thịt băm', qty: 150, unit: 'g', price: 20000, category: 'Thịt & Hải sản' },
            { name: 'Bánh đa nem', qty: 1, unit: 'tệp', price: 5000, category: 'Đồ khô & Bún' },
            { name: 'Trứng gà', qty: 1, unit: 'quả', price: 3000, category: 'Thịt & Hải sản' },
            { name: 'Miến, mộc nhĩ', qty: 20, unit: 'g', price: 3000, category: 'Đồ khô & Bún' }
        ],
        instructions: [
            'Miến, mộc nhĩ ngâm nở, thái nhỏ. Cà rốt, củ đậu thái sợi.',
            'Trộn đều thịt băm, trứng, miến, mộc nhĩ, rau củ và gia vị.',
            'Gói nhân vào bánh đa nem thành cuộn tròn.',
            'Chiên ngập dầu lửa vừa cho đến khi vàng giòn.',
            'Pha nước chấm chua ngọt, ăn kèm bún và rau sống.'
        ]
    }
};

export const calculateInitialBudget = async (profile: UserProfile): Promise<BudgetData> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const totalIncome = profile.monthlyIncome;
    const monthlyLimit = totalIncome;
    const weeklyLimit = Math.round(monthlyLimit / 4);
    const dailyLimit = Math.round(monthlyLimit / 30);

    const categoryBreakdown = [
        { id: 'groceries', name: "Hàng tạp hóa", spent: 0, limit: monthlyLimit * 0.30, icon: "shopping_cart" },
        { id: 'eating_out', name: "Ăn ngoài", spent: 0, limit: monthlyLimit * 0.10, icon: "restaurant" },
        { id: 'entertainment', name: "Giải trí", spent: 0, limit: monthlyLimit * 0.10, icon: "confirmation_number" },
        { id: 'transport', name: "Di chuyển", spent: 0, limit: monthlyLimit * 0.10, icon: "directions_bus" },
        { id: 'bills', name: "Hóa đơn & Tiện ích", spent: 0, limit: monthlyLimit * 0.20, icon: "receipt_long" },
        { id: 'savings', name: "Tiết kiệm", spent: 0, limit: monthlyLimit * 0.20, icon: "savings" }
    ];
    
    return {
        totalBudget: monthlyLimit,
        spent: 0,
        remaining: monthlyLimit,
        dailyLimit: dailyLimit,
        weeklyLimit: weeklyLimit,
        monthlyLimit: monthlyLimit,
        categoryBreakdown: categoryBreakdown
    };
};

const calculateCost = (recipe: Recipe) => recipe.ingredients.reduce((s, i) => s + i.price, 0);

// NEW: Advanced Logic with Diversity Rules
export const generateStrictMealPlan = async (dailyLimit: number, excludeIds: string[] = []): Promise<string[]> => {
    // 1. Budget Distribution
    const breakfastBudget = dailyLimit * 0.2;
    const lunchBudget = dailyLimit * 0.4;
    const dinnerBudget = dailyLimit * 0.4;

    const allRecipes = Object.values(RECIPES_DB);
    const excludedSet = new Set(excludeIds);

    // Helper to pick best option
    const pickBest = (
        recipes: Recipe[], 
        excluded: Set<string>, 
        budget: number, 
        forbiddenIngredients: Set<string> = new Set()
    ) => {
        // Filter 1: Budget & Repetition & Ingredients
        let candidates = recipes.filter(r => 
            calculateCost(r) <= budget && 
            !excluded.has(r.id) &&
            (!r.mainIngredient || !forbiddenIngredients.has(r.mainIngredient))
        );

        // Fallback 1: Relax Ingredient Restriction
        if (candidates.length === 0 && forbiddenIngredients.size > 0) {
            candidates = recipes.filter(r => 
                calculateCost(r) <= budget && 
                !excluded.has(r.id)
            );
        }

        // Fallback 2: Relax Exclusion (Yesterday's meals)
        if (candidates.length === 0) {
             candidates = recipes.filter(r => calculateCost(r) <= budget);
        }
        
        // Fallback 3: Budget only (Cheapest)
        if (candidates.length === 0) {
             candidates = recipes.sort((a,b) => calculateCost(a) - calculateCost(b)).slice(0, 1);
        }

        if (candidates.length === 0) return null;

        // Random pick for diversity
        return candidates[Math.floor(Math.random() * candidates.length)];
    };

    // 2. Select Breakfast
    const breakfastRecipes = allRecipes.filter(r => r.type === 'Bữa sáng');
    const selectedBreakfast = pickBest(breakfastRecipes, excludedSet, breakfastBudget) || breakfastRecipes[0];
    
    // 3. Select Lunch
    const lunchRecipes = allRecipes.filter(r => r.type === 'Bữa trưa');
    const selectedLunch = pickBest(lunchRecipes, excludedSet, lunchBudget) || lunchRecipes[0];

    // 4. Select Dinner (Rotating Protein based on Lunch)
    const dinnerRecipes = allRecipes.filter(r => r.type === 'Bữa tối');
    
    // Create forbidden set from lunch protein
    const forbiddenProteins = new Set<string>();
    if (selectedLunch && selectedLunch.mainIngredient) {
        forbiddenProteins.add(selectedLunch.mainIngredient);
    }

    const selectedDinner = pickBest(dinnerRecipes, excludedSet, dinnerBudget, forbiddenProteins) || dinnerRecipes[0];

    // Return IDs
    return [
        selectedBreakfast.id,
        selectedLunch.id,
        selectedDinner.id
    ];
};

export const suggestSingleMeal = async (mealType: 'Bữa sáng' | 'Bữa trưa' | 'Bữa tối', budgetLimit: number): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Sim delay

    const allRecipes = Object.values(RECIPES_DB);
    
    // Filter by type and strict budget
    const affordableOptions = allRecipes.filter(r => r.type === mealType && calculateCost(r) <= budgetLimit);
    
    if (affordableOptions.length > 0) {
        // Return a random affordable option
        const random = affordableOptions[Math.floor(Math.random() * affordableOptions.length)];
        return random.id;
    }

    // Fallback: If no meal fits the strict budget, return the cheapest meal of that type
    const cheapestOption = allRecipes
        .filter(r => r.type === mealType)
        .sort((a, b) => calculateCost(a) - calculateCost(b))[0];
    
    return cheapestOption ? cheapestOption.id : 'banh-mi';
};
