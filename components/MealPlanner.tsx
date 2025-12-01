
import React, { useState, useMemo } from 'react';
import { Transaction, Recipe, PlannedMeal } from '../types';
import { RECIPES_DB, suggestSingleMeal } from '../services/geminiService';

const CATEGORY_ICONS: Record<string, string> = {
    'Thịt & Hải sản': 'set_meal',
    'Rau củ quả': 'nutrition',
    'Đồ khô & Bún': 'rice_bowl',
    'Gia vị': 'kitchen',
    'Khác': 'shopping_basket'
};

const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

interface MealPlannerProps {
    onAddTransaction?: (t: Omit<Transaction, 'id'>) => void;
    plannedMeals: Record<string, PlannedMeal[]>;
    onUpdatePlannedMeals: (meals: Record<string, PlannedMeal[]>) => void;
    dailyLimit: number;
    onMarkAsShopped: (startDate: Date, endDate: Date) => void;
    totalPeople: number;
}

const MealPlanner: React.FC<MealPlannerProps> = ({ onAddTransaction, plannedMeals, onUpdatePlannedMeals, dailyLimit, onMarkAsShopped, totalPeople = 1 }) => {
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date()); 
    const [displayMonth, setDisplayMonth] = useState<Date>(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    
    const [showDayModal, setShowDayModal] = useState(false);
    const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    };

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // SCALE COST BY FAMILY SIZE
    const calculateRecipeCost = (recipe: Recipe) => {
        return recipe.ingredients.reduce((sum, ing) => sum + ing.price, 0) * totalPeople;
    };

    const addMeal = (recipeId: string, dateObj: Date) => {
        const key = formatDateKey(dateObj);
        const newMeal: PlannedMeal = {
            instanceId: Math.random().toString(36).substr(2, 9),
            recipeId: recipeId,
            status: 'pending',
            isShopped: false
        };

        const existing = plannedMeals[key] || [];
        const recipe = RECIPES_DB[recipeId];
        const isTypePresent = existing.some(m => RECIPES_DB[m.recipeId]?.type === recipe?.type);
        
        if (!isTypePresent && recipe) {
            onUpdatePlannedMeals({
                ...plannedMeals,
                [key]: [...existing, newMeal]
            });
        }
    };

    const handleSuggestSingleMeal = async (type: 'Bữa sáng' | 'Bữa trưa' | 'Bữa tối') => {
        // Calculate remaining budget for this meal slot
        const ratio = type === 'Bữa sáng' ? 0.2 : 0.4;
        const maxBudgetForMeal = dailyLimit * ratio;

        const currentKey = formatDateKey(selectedDate);
        const currentMeals = plannedMeals[currentKey] || [];
        const currentTotal = currentMeals.reduce((sum, m) => {
             const r = RECIPES_DB[m.recipeId];
             return sum + (r ? calculateRecipeCost(r) : 0);
        }, 0);

        if (currentTotal > dailyLimit * 0.95) {
             alert(`Ngân sách ngày hôm nay (${formatMoney(dailyLimit)}) đã gần hết. Không thể thêm món mới.`);
             return;
        }

        setIsSuggesting(true);
        
        // Pass totalPeople to service so it can filter recipes based on per-person cost
        const recipeId = await suggestSingleMeal(type, maxBudgetForMeal, totalPeople, true);
        
        if (recipeId) {
            addMeal(recipeId, selectedDate);
        } else {
            alert(`Không tìm thấy món ${type} nào phù hợp với ngân sách còn lại (${formatMoney(maxBudgetForMeal)}) cho ${totalPeople} người.`);
        }
        setIsSuggesting(false);
    };

    const currentWeekRange = useMemo(() => {
        const d = new Date(selectedDate);
        const day = d.getDay(); 
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        
        const monday = new Date(d);
        monday.setDate(diff);
        
        const week = [];
        const dayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(monday);
            nextDay.setDate(monday.getDate() + i);
            week.push({
                day: dayLabels[i],
                dateObj: nextDay,
                dateStr: nextDay.getDate(),
                key: formatDateKey(nextDay)
            });
        }
        return week;
    }, [selectedDate]);

    const shoppingList = useMemo(() => {
        const list: Record<string, { qty: number, unit: string, price: number, category: string }> = {};
        const key = formatDateKey(selectedDate);
        const meals = plannedMeals[key];

        if (meals) {
            meals.forEach(meal => {
                if (meal.isShopped) return; 

                const recipe = RECIPES_DB[meal.recipeId];
                if (recipe) {
                    recipe.ingredients.forEach(ing => {
                        // Scale quantity and price by totalPeople
                        const scaledQty = ing.qty * totalPeople;
                        const scaledPrice = ing.price * totalPeople;

                        if (list[ing.name]) {
                            list[ing.name].qty += scaledQty;
                            list[ing.name].price += scaledPrice;
                        } else {
                            list[ing.name] = { 
                                ...ing,
                                qty: scaledQty,
                                price: scaledPrice
                            };
                        }
                    });
                }
            });
        }

        const grouped: Record<string, Array<{ name: string, qtyDisplay: string, priceDisplay: string }>> = {};

        Object.entries(list)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([name, item]) => {
                const cat = item.category || 'Khác';
                if (!grouped[cat]) grouped[cat] = [];
                
                grouped[cat].push({
                    name,
                    qtyDisplay: item.qty >= 1000 && item.unit === 'g' 
                        ? `${(item.qty / 1000).toFixed(1).replace('.0','')}kg` 
                        : `${item.qty}${item.unit}`,
                    priceDisplay: formatMoney(item.price)
                });
            });

        return grouped;
    }, [plannedMeals, selectedDate, totalPeople]);

    const getDailyCost = (date: Date) => {
        const key = formatDateKey(date);
        const meals = plannedMeals[key] || [];
        const total = meals.reduce((sum, meal) => {
            const recipe = RECIPES_DB[meal.recipeId];
            return sum + (recipe ? calculateRecipeCost(recipe) : 0);
        }, 0);
        return formatMoney(total);
    };

    const cartTotal = useMemo(() => {
        let total = 0;
        const key = formatDateKey(selectedDate);
        const meals = plannedMeals[key] || [];
        
        meals.forEach(meal => {
            if (meal.isShopped) return;
            const recipe = RECIPES_DB[meal.recipeId];
            if (recipe) total += calculateRecipeCost(recipe);
        });
        
        return total;
    }, [plannedMeals, selectedDate, totalPeople]);

    const handleCheckoutClick = () => {
        if (!onAddTransaction || cartTotal === 0) return;
        setShowCheckoutConfirm(true);
    };

    const confirmCheckout = () => {
        if (!onAddTransaction) return;

        onAddTransaction({
            amount: cartTotal,
            merchant: `Đi chợ (${selectedDate.getDate()}/${selectedDate.getMonth() + 1})`,
            categoryId: 'groceries',
            categoryName: 'Hàng tạp hóa',
            date: new Date(),
            icon: 'shopping_cart',
            color: 'bg-green-100'
        });

        onMarkAsShopped(selectedDate, selectedDate);
        setShowCheckoutConfirm(false);
    };

    const nextMonth = () => {
        const next = new Date(displayMonth);
        next.setMonth(next.getMonth() + 1);
        setDisplayMonth(next);
    };

    const prevMonth = () => {
        const prev = new Date(displayMonth);
        prev.setMonth(prev.getMonth() - 1);
        setDisplayMonth(prev);
    };

    const renderCalendar = () => {
        const year = displayMonth.getFullYear();
        const month = displayMonth.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
        const cells = [];

        for (let i = 0; i < startOffset; i++) {
            cells.push(<div key={`empty-${i}`} className="h-12 w-full"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateObj = new Date(year, month, i);
            const key = formatDateKey(dateObj);
            const isSelected = isSameDay(dateObj, selectedDate);
            const isToday = isSameDay(dateObj, new Date()); 
            const hasPlan = !!plannedMeals[key] && plannedMeals[key].length > 0;

            cells.push(
                <button
                    key={key}
                    onClick={() => {
                        setSelectedDate(dateObj);
                        if (viewMode === 'month') {
                            setShowDayModal(true);
                        }
                    }}
                    className={`
                        h-12 w-full rounded-xl flex flex-col items-center justify-center relative transition-all duration-200
                        ${isSelected 
                            ? 'bg-primary text-[#111813] shadow-md shadow-primary/20 font-bold ring-2 ring-primary ring-offset-2' 
                            : 'hover:bg-gray-50 text-gray-700'}
                        ${isToday && !isSelected ? 'bg-primary/5 text-primary font-bold border border-primary/20' : ''}
                    `}
                >
                    <span className="text-sm z-10 leading-none">{i}</span>
                    {hasPlan && (
                        <div className={`size-1.5 rounded-full mt-1 z-10 transition-colors ${isSelected ? 'bg-[#111813]' : 'bg-primary'}`}></div>
                    )}
                </button>
            );
        }
        return cells;
    };

    const displayMonthLabel = new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(displayMonth);
    const currentWeekNumber = Math.ceil(currentWeekRange[0].dateObj.getDate() / 7);


    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
                <div className="flex size-12 shrink-0 items-center">
                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#111813] dark:text-white/90 gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                        <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                    </button>
                </div>
                <h1 className="text-[#111813] dark:text-white/90 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Lập kế hoạch bữa ăn</h1>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#111813] dark:text-white/90 gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                        <span className="material-symbols-outlined text-2xl">calendar_month</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 pb-28">
                <div className="px-4 pt-5 pb-3">
                    <div className="flex items-center justify-center text-center">
                        <button className="p-2"><span className="material-symbols-outlined">chevron_left</span></button>
                        <div className="flex-1">
                            <p className="text-lg font-bold text-[#111813] dark:text-white/90">Tuần này</p>
                            <p className="text-sm text-gray-500 dark:text-white/60">08/07 - 14/07</p>
                        </div>
                        <button className="p-2"><span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                </div>

                <div className="flex overflow-x-auto gap-3 px-4 py-2 scrollbar-hide">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, idx) => (
                        <div key={idx} className={`flex flex-col items-center gap-1 p-2 rounded-lg min-w-[56px] ${idx === 0 ? 'bg-primary' : 'bg-white dark:bg-gray-800'}`}>
                            <p className={`font-bold text-sm ${idx === 0 ? 'text-black' : 'text-[#111813] dark:text-white/90'}`}>{day}</p>
                            <p className={`font-bold text-xl ${idx === 0 ? 'text-black' : 'text-[#111813] dark:text-white/90'}`}>{8 + idx}</p>
                        </div>
                    ))}
                </div>

                <div className="px-4 py-4">
                    <div className="flex flex-col gap-4 rounded-xl p-4 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-background-dark">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#111813] dark:text-white/90">Bữa ăn hôm nay</h3>
                            <p className="text-sm text-gray-500 dark:text-white/60">Ước tính: <span className="font-bold text-[#111813] dark:text-white/90">250.000₫</span></p>
                        </div>
                        <div className="flex flex-col gap-4">
                            {plannedMeals && Object.keys(plannedMeals).length > 0 ? (
                                Object.values(plannedMeals)
                                    .flat()
                                    .slice(0, 2)
                                    .map((meal) => (
                                        <div key={meal.id} className="flex items-center gap-4">
                                            <div className="size-16 rounded-lg object-cover bg-gray-200"></div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500 dark:text-white/60">{meal.mealType === 'breakfast' ? 'Bữa sáng' : meal.mealType === 'lunch' ? 'Bữa trưa' : 'Bữa tối'}</p>
                                                <p className="text-base font-bold text-[#111813] dark:text-white/90">{meal.recipe.name}</p>
                                            </div>
                                            <button className="text-gray-400 dark:text-white/50"><span className="material-symbols-outlined">more_vert</span></button>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-white/60 text-center py-4">Chưa có bữa ăn nào được lập kế hoạch</p>
                            )}
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-white/20 py-4 text-gray-500 dark:text-white/60">
                                <span className="material-symbols-outlined">add_circle</span>
                                <span className="font-bold">Thêm bữa ăn</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-2">
                    <div className="flex flex-col gap-4 rounded-xl p-4 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-background-dark">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#111813] dark:text-white/90">Gợi ý từ AI</h3>
                            <a className="text-primary font-bold text-sm">Làm mới</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="size-24 rounded-lg object-cover bg-gray-200"></div>
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-500 dark:text-white/60">Bữa tối • 30 phút</p>
                                <p className="text-base font-bold text-[#111813] dark:text-white/90">Bún Chả Hà Nội</p>
                                <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Một món ăn cân bằng, tốt cho sức khỏe và phù hợp với ngân sách của bạn.</p>
                                <div className="flex gap-2 mt-3">
                                    <button className="flex min-w-[40px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-4 bg-primary text-[#111813] text-sm font-bold leading-normal tracking-[0.015em] gap-2">Thêm</button>
                                    <button className="flex min-w-[40px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-4 bg-[#f0f4f2] dark:bg-white/10 dark:text-white/90 text-[#111813] text-sm font-bold leading-normal tracking-[0.015em] gap-2">Xem chi tiết</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 pt-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-[#111813] dark:text-white/90">Danh sách mua sắm</h3>
                        <a className="text-primary font-bold text-sm">Xem tất cả</a>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="size-5 rounded border-gray-300 text-primary focus:ring-primary" />
                                <div>
                                    <p className="font-bold text-[#111813] dark:text-white/90">Thịt bò</p>
                                    <p className="text-sm text-gray-500 dark:text-white/60">500g</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-white/70">~ 125.000₫</p>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="size-5 rounded border-gray-300 text-primary focus:ring-primary" />
                                <div>
                                    <p className="font-bold text-[#111813] dark:text-white/90">Bánh phở</p>
                                    <p className="text-sm text-gray-500 dark:text-white/60">1kg</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-white/70">~ 25.000₫</p>
                        </div>
                    </div>
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-black/10 dark:border-white/10 flex justify-around items-center px-4">
                <a className="flex flex-col items-center gap-1 text-gray-500 dark:text-white/60">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-xs">Bảng điều khiển</span>
                </a>
                <a className="flex flex-col items-center gap-1 text-gray-500 dark:text-white/60">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                    <span className="text-xs">Ngân sách</span>
                </a>
                <a className="flex flex-col items-center gap-1 text-primary">
                    <span className="material-symbols-outlined">restaurant_menu</span>
                    <span className="text-xs font-bold">Bữa ăn</span>
                </a>
                <a className="flex flex-col items-center gap-1 text-gray-500 dark:text-white/60">
                    <span className="material-symbols-outlined">bar_chart</span>
                    <span className="text-xs">Báo cáo</span>
                </a>
            </nav>
        </div>
    );
};

export default MealPlanner;