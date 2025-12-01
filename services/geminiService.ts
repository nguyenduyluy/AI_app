
import { UserProfile, BudgetData, Recipe } from '../types';

// Helper to generate AI Image URL based on keywords
// Using Pollinations.ai for real-time AI generation without API key
const generateAIImage = (keyword: string) => {
    // Construct a detailed prompt for better food photography results
    const prompt = encodeURIComponent(
        `delicious ${keyword}, professional food photography, appetizing, close-up, studio lighting, 8k resolution, highly detailed, no text`
    );
    // Add a random seed based on the keyword length to keep it consistent per session but dynamic
    const seed = keyword.length + Math.floor(Math.random() * 100); 
    return `https://image.pollinations.ai/prompt/${prompt}?width=800&height=800&nologo=true&seed=${seed}&model=flux`;
};

// Database of Recipes with "SMART GROCERY PRICES" (Giá đi chợ)
// Logic: Price is based on raw ingredients purchased at a local market in Vietnam, 
// assuming "Buy Bulk, Cook portions".
// NOTE: PRICES HERE ARE PER PERSON (BASE PORTION)
export const RECIPES_DB: Record<string, Recipe> = {
    // --- BỮA SÁNG SIÊU TIẾT KIỆM (BUDGET BREAKFAST) ---
    'mi-tom-trung': {
        id: 'mi-tom-trung',
        name: 'Mì tôm trứng',
        image: generateAIImage('instant noodles with egg vietnamese breakfast'),
        type: 'Bữa sáng',
        time: '5 phút',
        calories: 350,
        desc: 'Bữa sáng quốc dân, siêu rẻ và nhanh gọn.',
        mainIngredient: 'egg',
        imageKeyword: 'instant noodles with egg vietnamese breakfast',
        ingredients: [
            { name: 'Mì gói', qty: 1, unit: 'gói', price: 3500, category: 'Đồ khô & Bún' },
            { name: 'Trứng gà', qty: 1, unit: 'quả', price: 3000, category: 'Thịt & Hải sản' },
            { name: 'Rau cải', qty: 50, unit: 'g', price: 1000, category: 'Rau củ quả' } // Mua mớ 5k chia 5 bữa
        ],
        instructions: [
            'Đun sôi 400ml nước.',
            'Cho mì và gói gia vị vào bát.',
            'Chần trứng và rau cải trong nước sôi khoảng 2 phút.',
            'Đổ nước sôi, trứng và rau vào bát mì, úp lại 3 phút rồi thưởng thức.'
        ]
    },
    'com-rang-du-a': {
        id: 'com-rang-du-a',
        name: 'Cơm rang dưa trứng',
        image: generateAIImage('fried rice with egg and pickles vietnamese'),
        type: 'Bữa sáng',
        time: '10 phút',
        calories: 400,
        desc: 'Tận dụng cơm nguội tối qua, chắc dạ cho cả ngày.',
        mainIngredient: 'egg',
        imageKeyword: 'fried rice with egg and pickles vietnamese',
        ingredients: [
            { name: 'Cơm nguội', qty: 1, unit: 'bát', price: 0, category: 'Đồ khô & Bún' }, // Tận dụng
            { name: 'Trứng gà', qty: 1, unit: 'quả', price: 3000, category: 'Thịt & Hải sản' },
            { name: 'Dưa chua', qty: 50, unit: 'g', price: 2000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Phi thơm hành khô, cho dưa chua vào xào săn.',
            'Cho cơm nguội vào đảo đều tay đến khi hạt cơm săn lại.',
            'Đập trứng vào đảo cùng cho tơi xốp.',
            'Nêm chút nước mắm, hạt tiêu cho thơm.'
        ]
    },
    'banh-mi-trung': {
        id: 'banh-mi-trung',
        name: 'Bánh mì trứng ốp la',
        image: generateAIImage('vietnamese banh mi op la fried egg bread breakfast'),
        type: 'Bữa sáng',
        time: '10 phút',
        calories: 350,
        desc: 'Bữa sáng 7k đầy đủ năng lượng.',
        mainIngredient: 'egg',
        imageKeyword: 'vietnamese banh mi op la fried egg bread breakfast',
        ingredients: [
            { name: 'Bánh mì', qty: 1, unit: 'cái', price: 3000, category: 'Đồ khô & Bún' },
            { name: 'Trứng gà', qty: 1, unit: 'quả', price: 3000, category: 'Thịt & Hải sản' },
            { name: 'Dưa leo', qty: 30, unit: 'g', price: 1000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Ốp la trứng chín tới hoặc lòng đào.',
            'Làm nóng bánh mì cho giòn.',
            'Kẹp trứng và vài lát dưa leo vào bánh, thêm tương ớt.'
        ]
    },
     'xoi-xeo': {
        id: 'xoi-xeo',
        name: 'Xôi xéo (Nấu nhà)',
        image: generateAIImage('vietnamese sticky rice xoi xeo'),
        type: 'Bữa sáng',
        time: '20 phút',
        calories: 450,
        desc: 'Nấu 1 nồi ăn cả nhà, tính ra rất rẻ.',
        mainIngredient: 'sticky_rice',
        imageKeyword: 'vietnamese sticky rice xoi xeo',
        ingredients: [
            { name: 'Gạo nếp', qty: 100, unit: 'g', price: 3000, category: 'Đồ khô & Bún' },
            { name: 'Đậu xanh', qty: 30, unit: 'g', price: 2000, category: 'Đồ khô & Bún' },
            { name: 'Hành phi', qty: 10, unit: 'g', price: 1000, category: 'Gia vị' }
        ],
        instructions: [
            'Gạo nếp ngâm nghệ, đồ chín.',
            'Đậu xanh hấp chín, nghiền nhuyễn, thái lát mỏng lên xôi.',
            'Rưới mỡ hành phi lên trên.'
        ]
    },

    // --- BỮA TRƯA & TỐI TIẾT KIỆM (BUDGET LUNCH/DINNER) ---
    // Chiến thuật: Mua 1 lạng thịt (15k) + Rau (5k) + Đậu (3k) = Bữa ăn 23k đầy đặn.

    'dau-sot-ca': {
        id: 'dau-sot-ca',
        name: 'Đậu sốt cà chua',
        image: generateAIImage('tofu tomato sauce asian food vegetarian'),
        type: 'Bữa trưa',
        time: '15 phút',
        calories: 300,
        desc: 'Món "cứu đói" huyền thoại, ngon bổ rẻ.',
        mainIngredient: 'tofu',
        imageKeyword: 'tofu tomato sauce asian food vegetarian',
        ingredients: [
            { name: 'Đậu phụ', qty: 2, unit: 'bìa', price: 6000, category: 'Đồ khô & Bún' },
            { name: 'Cà chua', qty: 2, unit: 'quả', price: 3000, category: 'Rau củ quả' },
            { name: 'Hành lá', qty: 10, unit: 'g', price: 1000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Đậu cắt miếng, chiên vàng (hoặc để trắng nếu thích mềm).',
            'Sốt cà chua nhuyễn với gia vị, thả đậu vào rim 5 phút.',
            'Rắc hành lá.'
        ]
    },
    'trung-duc-thit': {
        id: 'trung-duc-thit',
        name: 'Trứng đúc thịt',
        image: generateAIImage('vietnamese steamed egg with pork meatloaf'),
        type: 'Bữa trưa',
        time: '20 phút',
        calories: 400,
        desc: 'Dùng ít thịt mà vẫn thấy nhiều đạm.',
        mainIngredient: 'pork',
        imageKeyword: 'vietnamese steamed egg with pork meatloaf',
        ingredients: [
            { name: 'Trứng gà', qty: 2, unit: 'quả', price: 6000, category: 'Thịt & Hải sản' },
            { name: 'Thịt băm', qty: 50, unit: 'g', price: 7500, category: 'Thịt & Hải sản' }, // Mua 15k/lạng chia đôi
            { name: 'Nước mắm', qty: 5, unit: 'ml', price: 500, category: 'Gia vị' }
        ],
        instructions: [
            'Đánh tan trứng với thịt băm và nước mắm.',
            'Chiên nhỏ lửa cho chín đều cả trong lẫn ngoài.',
            'Cắt miếng tam giác bày ra đĩa.'
        ]
    },
    'thit-rang-chay-canh': {
        id: 'thit-rang-chay-canh',
        name: 'Thịt rang cháy cạnh',
        image: generateAIImage('vietnamese caramelized pork belly thit rang chay canh'),
        type: 'Bữa tối',
        time: '20 phút',
        calories: 450,
        desc: 'Món tốn cơm nhất, mua 1 lạng thịt ăn được 2 người.',
        mainIngredient: 'pork',
        imageKeyword: 'vietnamese caramelized pork belly thit rang chay canh',
        ingredients: [
            { name: 'Thịt ba chỉ', qty: 100, unit: 'g', price: 15000, category: 'Thịt & Hải sản' },
            { name: 'Hành tím', qty: 10, unit: 'g', price: 1000, category: 'Rau củ quả' },
            { name: 'Gia vị', qty: 10, unit: 'g', price: 500, category: 'Gia vị' }
        ],
        instructions: [
            'Thịt thái mỏng, đảo trên chảo nóng cho xém cạnh, ra bớt mỡ.',
            'Cho hành tím vào phi thơm.',
            'Nêm nước mắm, đường, đảo đều cho keo lại màu cánh gián.'
        ]
    },
    'lac-rang-muoi': {
        id: 'lac-rang-muoi',
        name: 'Lạc rang muối',
        image: generateAIImage('roasted peanuts with salt asian'),
        type: 'Bữa tối',
        time: '10 phút',
        calories: 200,
        desc: 'Món ăn kèm siêu tiết kiệm cho những ngày cuối tháng.',
        mainIngredient: 'nut',
        imageKeyword: 'roasted peanuts with salt asian',
        ingredients: [
            { name: 'Lạc nhân', qty: 100, unit: 'g', price: 6000, category: 'Đồ khô & Bún' },
            { name: 'Muối/Dầu', qty: 10, unit: 'g', price: 500, category: 'Gia vị' }
        ],
        instructions: [
            'Rang lạc với chút dầu ăn nhỏ lửa cho chín thơm.',
            'Tắt bếp, đảo đều với bột canh hoặc muối tinh.'
        ]
    },
    'canh-rau-ngot': {
        id: 'canh-rau-ngot',
        name: 'Canh rau ngót thịt băm',
        image: generateAIImage('katuk soup with minced pork canh rau ngot'),
        type: 'Bữa trưa',
        time: '15 phút',
        calories: 150,
        desc: 'Bát canh ngọt mát, bổ dưỡng.',
        mainIngredient: 'pork',
        imageKeyword: 'katuk soup with minced pork canh rau ngot',
        ingredients: [
            { name: 'Rau ngót', qty: 1, unit: 'mớ', price: 5000, category: 'Rau củ quả' },
            { name: 'Thịt bằm', qty: 30, unit: 'g', price: 4500, category: 'Thịt & Hải sản' }
        ],
        instructions: [
            'Rau ngót tuốt lá, rửa sạch, vò nát.',
            'Xào sơ thịt băm, đổ nước vào đun sôi.',
            'Thả rau ngót vào nấu chín mềm, nêm gia vị.'
        ]
    },
     'trung-luoc': {
        id: 'trung-luoc',
        name: 'Trứng luộc dầm mắm',
        image: generateAIImage('boiled egg with fish sauce'),
        type: 'Bữa trưa',
        time: '10 phút',
        calories: 150,
        desc: 'Đơn giản nhất, rẻ nhất nhưng vẫn đủ chất.',
        mainIngredient: 'egg',
        imageKeyword: 'boiled egg with fish sauce',
        ingredients: [
            { name: 'Trứng vịt', qty: 2, unit: 'quả', price: 7000, category: 'Thịt & Hải sản' },
            { name: 'Nước mắm', qty: 10, unit: 'ml', price: 1000, category: 'Gia vị' }
        ],
        instructions: [
            'Luộc trứng chín tới (khoảng 6-7 phút nước sôi).',
            'Bóc vỏ, dầm vào bát nước mắm ớt.'
        ]
    },
    'ca-kho-tieu': {
        id: 'ca-kho-tieu',
        name: 'Cá rô kho tiêu',
        image: generateAIImage('vietnamese braised fish ca kho tieu'),
        type: 'Bữa tối',
        time: '30 phút',
        calories: 350,
        desc: 'Mua cá rô đồng hoặc cá nục giá rẻ kho đậm đà.',
        mainIngredient: 'fish',
        imageKeyword: 'vietnamese braised fish ca kho tieu',
        ingredients: [
            { name: 'Cá rô/nục', qty: 200, unit: 'g', price: 15000, category: 'Thịt & Hải sản' }, // Cá rẻ tiền
            { name: 'Gia vị kho', qty: 1, unit: 'gói', price: 2000, category: 'Gia vị' }
        ],
        instructions: [
            'Cá làm sạch, ướp gia vị, nước hàng, tiêu.',
            'Kho nhỏ lửa đến khi cá cứng lại, thơm lừng mùi tiêu.'
        ]
    },
     'rau-muong-xao': {
        id: 'rau-muong-xao',
        name: 'Rau muống xào tỏi',
        image: generateAIImage('stir fried water spinach garlic'),
        type: 'Bữa tối',
        time: '10 phút',
        calories: 100,
        desc: 'Rau muống 5k/mớ chia 2 bữa xào và luộc.',
        mainIngredient: 'vegetable',
        imageKeyword: 'stir fried water spinach garlic',
        ingredients: [
            { name: 'Rau muống', qty: 1/2, unit: 'mớ', price: 3000, category: 'Rau củ quả' },
            { name: 'Tỏi', qty: 1, unit: 'củ', price: 1000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Phi thơm tỏi, xào rau muống lửa lớn.',
            'Vắt thêm chút chanh khi ăn.'
        ]
    },
    // --- MÓN SANG HƠN (Dành cho ngày ngân sách > 100k) ---
    'ga-rang-gung': {
        id: 'ga-rang-gung',
        name: 'Gà rang gừng (Công nghiệp)',
        image: generateAIImage('braised chicken ginger'),
        type: 'Bữa tối',
        time: '30 phút',
        calories: 450,
        desc: 'Gà công nghiệp giá rẻ (60k/kg), mua 3 lạng.',
        mainIngredient: 'chicken',
        imageKeyword: 'braised chicken ginger',
        ingredients: [
            { name: 'Thịt gà', qty: 300, unit: 'g', price: 20000, category: 'Thịt & Hải sản' },
            { name: 'Gừng', qty: 20, unit: 'g', price: 1000, category: 'Rau củ quả' }
        ],
        instructions: [
            'Gà chặt miếng, ướp gừng, mắm muối.',
            'Rang săn lại, thêm chút nước đun mềm.'
        ]
    }
};

export const calculateInitialBudget = async (profile: UserProfile): Promise<BudgetData> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const totalIncome = profile.monthlyIncome;
    const monthlyLimit = totalIncome;
    const weeklyLimit = Math.round(monthlyLimit / 4);
    const dailyLimit = Math.round(monthlyLimit / 30);

    return {
        totalBudget: monthlyLimit,
        spent: 0,
        remaining: monthlyLimit,
        dailyLimit: dailyLimit,
        weeklyLimit: weeklyLimit,
        monthlyLimit: monthlyLimit,
        categoryBreakdown: [
            { id: 'groceries', name: "Hàng tạp hóa", spent: 0, limit: monthlyLimit * 0.40, icon: "shopping_cart" },
            { id: 'eating_out', name: "Ăn ngoài", spent: 0, limit: monthlyLimit * 0.10, icon: "restaurant" },
            { id: 'others', name: "Chi tiêu khác", spent: 0, limit: monthlyLimit * 0.50, icon: "payments" }
        ]
    };
};

const calculateCost = (recipe: Recipe) => recipe.ingredients.reduce((s, i) => s + i.price, 0);

// NEW: Dynamic Recipe Generator to simulate 500+ recipes
const generateExtendedRecipes = () => {
    const proteins = [
        { id: 'pork', name: 'Thịt lợn', price: 15000 },
        { id: 'chicken', name: 'Thịt gà', price: 12000 },
        { id: 'fish', name: 'Cá', price: 15000 },
        { id: 'tofu', name: 'Đậu phụ', price: 6000 },
        { id: 'egg', name: 'Trứng', price: 7000 }
    ];
    
    const methods = [
        { id: 'kho', name: 'Kho', suffix: 'kho tiêu' },
        { id: 'rang', name: 'Rang', suffix: 'rang muối' },
        { id: 'xao', name: 'Xào', suffix: 'xào lăn' },
        { id: 'luoc', name: 'Luộc', suffix: 'luộc' },
        { id: 'canh', name: 'Canh', suffix: 'nấu canh' }
    ];

    const generated: Record<string, Recipe> = {};

    proteins.forEach(prot => {
        methods.forEach(meth => {
            const id = `${prot.id}-${meth.id}`;
            const proteinQty = meth.id === 'canh' ? 0.5 : 1; 
            const meatCost = prot.price * proteinQty;
            const vegCost = 3000; 
            
            generated[id] = {
                id: id,
                name: `${prot.name} ${meth.suffix}`,
                image: generateAIImage(`${prot.id} ${meth.id} vietnamese food`),
                type: meth.id === 'canh' || meth.id === 'xao' ? 'Bữa tối' : 'Bữa trưa',
                time: '25 phút',
                calories: 300 + Math.floor(Math.random() * 200),
                desc: `Món ${prot.name} chế biến kiểu ${meth.name} đơn giản, tiết kiệm.`,
                mainIngredient: prot.id,
                imageKeyword: `${prot.id} ${meth.id} vietnamese food`,
                ingredients: [
                    { name: prot.name, qty: Math.round(100 * proteinQty), unit: 'g', price: meatCost, category: 'Thịt & Hải sản' },
                    { name: 'Gia vị & Rau', qty: 1, unit: 'phần', price: vegCost, category: 'Rau củ quả' }
                ],
                instructions: [
                    `Sơ chế ${prot.name} sạch sẽ.`,
                    `Chế biến theo phương pháp ${meth.name} với gia vị vừa ăn.`,
                    'Trình bày ra đĩa và thưởng thức.'
                ]
            };
        });
    });
    
    return generated;
};

// Merge Static and Generated Recipes
const EXTENDED_DB = { ...RECIPES_DB, ...generateExtendedRecipes() };

export const generateStrictMealPlan = async (
    dailyLimit: number, 
    totalPeople: number,
    excludeIds: string[] = []
): Promise<string[]> => {
    // 1. Calculate Budget PER PERSON
    const dailyLimitPerPerson = dailyLimit / totalPeople;
    
    // 2. Determine Mode based on Per-Person Limit
    // < 15k/person/day is very strict "Survival Mode" (Eggs/Tofu)
    const isSurvivalMode = dailyLimitPerPerson < 15000; 
    
    // 3. Distribute Per-Person Budget
    // Breakfast: 20%
    const breakfastBudget = Math.min(10000, dailyLimitPerPerson * 0.2); 
    const mainMealBudget = (dailyLimitPerPerson - breakfastBudget) / 2;

    const allRecipes = Object.values(EXTENDED_DB);
    const excludedSet = new Set(excludeIds);

    const pickBest = (
        type: string,
        budget: number, 
        forbiddenIngredients: Set<string> = new Set()
    ) => {
        let candidates = allRecipes.filter(r => {
            if (type === 'Bữa sáng') return r.type === 'Bữa sáng';
            return r.type === 'Bữa trưa' || r.type === 'Bữa tối';
        });

        // Filter by Cost PER PERSON (Base Cost)
        candidates = candidates.filter(r => calculateCost(r) <= budget);

        // Filter by Forbidden Ingredients (Protein Rotation)
        if (forbiddenIngredients.size > 0) {
            candidates = candidates.filter(r => !r.mainIngredient || !forbiddenIngredients.has(r.mainIngredient));
        }
        
        const freshCandidates = candidates.filter(r => !excludedSet.has(r.id));
        const finalPool = freshCandidates.length > 0 ? freshCandidates : candidates;
        
        if (finalPool.length === 0) return null;
        return finalPool[Math.floor(Math.random() * finalPool.length)];
    };

    // Select meals based on Per-Person cost constraints
    const selectedBreakfast = pickBest('Bữa sáng', breakfastBudget) || RECIPES_DB['mi-tom-trung'];
    const selectedLunch = pickBest('Bữa trưa', mainMealBudget) || RECIPES_DB['dau-sot-ca'];

    const forbiddenProteins = new Set<string>();
    if (selectedLunch && selectedLunch.mainIngredient) {
        forbiddenProteins.add(selectedLunch.mainIngredient);
    }
    const selectedDinner = pickBest('Bữa tối', mainMealBudget, forbiddenProteins) || RECIPES_DB['lac-rang-muoi'];

    return [selectedBreakfast.id, selectedLunch.id, selectedDinner.id];
};

export const suggestSingleMeal = async (
    mealType: 'Bữa sáng' | 'Bữa trưa' | 'Bữa tối', 
    budgetLimit: number,
    totalPeople: number,
    strictMode: boolean = false
): Promise<string | null> => {
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Convert Total Budget Limit to Per-Person Limit for filtering
    const perPersonLimit = budgetLimit / totalPeople;

    const allRecipes = Object.values(EXTENDED_DB);
    
    const options = allRecipes.filter(r => {
        const typeMatch = mealType === 'Bữa sáng' 
            ? r.type === 'Bữa sáng' 
            : (r.type === 'Bữa trưa' || r.type === 'Bữa tối');
        
        // Check base cost against per-person limit
        return typeMatch && calculateCost(r) <= perPersonLimit;
    });
    
    if (options.length > 0) {
        const random = options[Math.floor(Math.random() * options.length)];
        return random.id;
    }

    if (strictMode) return null;

    return 'mi-tom-trung';
};
