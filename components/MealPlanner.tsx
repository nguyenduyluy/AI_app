
import React, { useState, useMemo } from 'react';
import { Transaction, Recipe, PlannedMeal } from '../types';
import { RECIPES_DB, suggestSingleMeal, generateStrictMealPlan } from '../services/geminiService';

const CATEGORY_ICONS: Record<string, string> = {
    'Thịt & Hải sản': 'set_meal',
    'Rau củ quả': 'nutrition',
    'Đồ khô & Bún': 'rice_bowl',
    'Gia vị': 'kitchen',
    'Khác': 'shopping_basket'
};

// Helper function outside component for initialization usage
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
}

const MealPlanner: React.FC<MealPlannerProps> = ({ onAddTransaction, plannedMeals, onUpdatePlannedMeals, dailyLimit }) => {
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
    
    // TABBED NAVIGATION STATE
    const [activeTab, setActiveTab] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');

    // Initialize with Real Time (Today)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date()); 
    const [displayMonth, setDisplayMonth] = useState<Date>(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    
    const [showDayModal, setShowDayModal] = useState(false);
    const [hasCheckedOut, setHasCheckedOut] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    };

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const calculateRecipeCost = (recipe: Recipe) => {
        return recipe.ingredients.reduce((sum, ing) => sum + ing.price, 0);
    };

    const addMeal = (recipeId: string, dateObj: Date) => {
        const key = formatDateKey(dateObj);
        const newMeal: PlannedMeal = {
            instanceId: Math.random().toString(36).substr(2, 9),
            recipeId: recipeId,
            status: 'pending'
        };

        const existing = plannedMeals[key] || [];
        // Only add if not already present for this exact meal type to avoid duplicates in the same slot
        const recipe = RECIPES_DB[recipeId];
        const isTypePresent = existing.some(m => RECIPES_DB[m.recipeId].type === recipe.type);
        
        if (!isTypePresent) {
            onUpdatePlannedMeals({
                ...plannedMeals,
                [key]: [...existing, newMeal]
            });
        }
    };

    const handleSuggestSingleMeal = async (type: 'Bữa sáng' | 'Bữa trưa' | 'Bữa tối') => {
        setIsSuggesting(true);
        // Distribution Logic: 20% Morning, 40% Noon, 40% Evening
        const ratio = type === 'Bữa sáng' ? 0.2 : 0.4;
        const budgetForMeal = dailyLimit * ratio;

        const recipeId = await suggestSingleMeal(type, budgetForMeal);
        
        if (recipeId) {
            addMeal(recipeId, selectedDate);
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
        
        currentWeekRange.forEach(d => {
            const meals = plannedMeals[d.key];
            if (meals) {
                meals.forEach(meal => {
                    const recipe = RECIPES_DB[meal.recipeId];
                    if (recipe) {
                        recipe.ingredients.forEach(ing => {
                            if (list[ing.name]) {
                                list[ing.name].qty += ing.qty;
                                list[ing.name].price += ing.price;
                            } else {
                                list[ing.name] = { ...ing };
                            }
                        });
                    }
                });
            }
        });

        // Group items by category
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
    }, [plannedMeals, currentWeekRange]);

    const getDailyCost = (date: Date) => {
        const key = formatDateKey(date);
        const meals = plannedMeals[key] || [];
        const total = meals.reduce((sum, meal) => {
            const recipe = RECIPES_DB[meal.recipeId];
            return sum + (recipe ? calculateRecipeCost(recipe) : 0);
        }, 0);
        return formatMoney(total);
    };

    const weeklyTotalNum = useMemo(() => {
        let total = 0;
        currentWeekRange.forEach(d => {
            const meals = plannedMeals[d.key] || [];
            meals.forEach(meal => {
                const recipe = RECIPES_DB[meal.recipeId];
                if (recipe) total += calculateRecipeCost(recipe);
            });
        });
        return total;
    }, [plannedMeals, currentWeekRange]);

    const weeklyCost = formatMoney(weeklyTotalNum);

    const handleCheckout = () => {
        if (!onAddTransaction || weeklyTotalNum === 0) return;
        
        onAddTransaction({
            amount: weeklyTotalNum,
            merchant: 'Đi chợ tuần này',
            categoryId: 'groceries', // Matches ID in geminiService
            categoryName: 'Hàng tạp hóa',
            date: new Date(),
            icon: 'shopping_cart',
            color: 'bg-green-100'
        });
        
        setHasCheckedOut(true);
        setTimeout(() => setHasCheckedOut(false), 3000); // Reset feedback after 3s
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
    
    // TABBED RENDER LOGIC
    const renderMealList = (date: Date) => {
        const key = formatDateKey(date);
        const meals = plannedMeals[key] || [];
        const dailyCost = getDailyCost(date);

        // Map tab internal keys to Data "Type" strings (must match services/geminiService.ts)
        const tabMap: Record<string, 'Bữa sáng' | 'Bữa trưa' | 'Bữa tối'> = {
            'breakfast': 'Bữa sáng',
            'lunch': 'Bữa trưa',
            'dinner': 'Bữa tối'
        };

        const targetType = tabMap[activeTab];
        
        // FIND (Don't Map) the single meal for this slot
        const currentMeal = meals.find(m => {
            const recipe = RECIPES_DB[m.recipeId];
            return recipe && recipe.type === targetType;
        });

        // Resolve Recipe Data
        const recipe = currentMeal ? RECIPES_DB[currentMeal.recipeId] : null;

        return (
            <div className="flex flex-col gap-4">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-[#111813]">
                            Bữa ăn ngày {date.getDate()}/{date.getMonth() + 1}
                    </h3>
                    <p className="text-sm text-gray-500">Ước tính: <span className="font-bold text-gray-900">{dailyCost}</span></p>
                </div>

                {/* TAB HEADER */}
                <div className="flex p-1 bg-gray-100 rounded-xl mb-2">
                    {[
                        { id: 'breakfast', label: 'Sáng' },
                        { id: 'lunch', label: 'Trưa' },
                        { id: 'dinner', label: 'Tối' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                                activeTab === tab.id 
                                ? 'bg-white text-[#111813] shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT - CONDITIONAL RENDERING */}
                <div className="min-h-[120px]">
                    {currentMeal && recipe ? (
                        <div className={`flex gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm animate-fade-in transition-all ${currentMeal.status === 'completed' ? 'opacity-60 bg-gray-50' : ''}`}>
                            <img src={recipe.image} className={`size-20 rounded-lg object-cover ${currentMeal.status === 'completed' ? 'grayscale' : ''}`} alt={recipe.name} />
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 font-medium uppercase mb-1">{recipe.type}</p>
                                <p className={`font-bold text-[#111813] mb-1 text-lg ${currentMeal.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{recipe.name}</p>
                                <p className={`text-sm font-medium ${currentMeal.status === 'completed' ? 'text-gray-400' : 'text-primary-dark'}`}>{formatMoney(calculateRecipeCost(recipe))}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-32 bg-gray-50 rounded-xl border border-dashed border-gray-200 gap-3">
                            <span className="text-gray-400 text-sm">Chưa có món cho {targetType.toLowerCase()}</span>
                            <button 
                                onClick={() => handleSuggestSingleMeal(targetType)}
                                disabled={isSuggesting}
                                className="px-4 py-2 bg-[#111813] text-white text-xs font-bold rounded-full hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSuggesting ? (
                                    <span className="inline-block size-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                )}
                                Gợi ý món ăn
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const shoppingListKeys = Object.keys(shoppingList).sort();
    const hasShoppingItems = shoppingListKeys.length > 0;

    return (
        <div className="flex-1 flex flex-col pb-24 bg-background-light animate-fade-in">
             <header className="flex items-center justify-between p-4 bg-background-light sticky top-0 z-10">
                <button className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
                </button>
                <h1 className="flex-1 text-center font-bold text-lg text-[#111813]">Lập kế hoạch bữa ăn</h1>
                <button 
                    onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
                    className={`p-2 -mr-2 rounded-full transition-colors ${
                        viewMode === 'month' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <span className="material-symbols-outlined text-xl">
                        {viewMode === 'week' ? 'calendar_month' : 'view_week'}
                    </span>
                </button>
            </header>

            <main className="flex-col flex gap-6">
                
                {viewMode === 'week' ? (
                    <div className="bg-white pb-4 pt-2 border-b border-gray-100 animate-fade-in">
                         <div className="flex items-center justify-center gap-4 mb-4">
                            <span className="material-symbols-outlined text-gray-400">chevron_left</span>
                            <div className="text-center">
                                <p className="font-bold text-lg text-[#111813] capitalize">
                                    Tuần {currentWeekNumber}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {currentWeekRange[0].dateObj.getDate()}/{currentWeekRange[0].dateObj.getMonth() + 1} - {currentWeekRange[6].dateObj.getDate()}/{currentWeekRange[6].dateObj.getMonth() + 1}
                                </p>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                         </div>
                         <div className="flex justify-between px-4 overflow-x-auto scrollbar-hide gap-2">
                            {currentWeekRange.map((d) => {
                                const isPlanned = !!plannedMeals[d.key] && plannedMeals[d.key].length > 0;
                                const isSelected = isSameDay(d.dateObj, selectedDate);
                                return (
                                <button 
                                    key={d.key}
                                    onClick={() => setSelectedDate(d.dateObj)}
                                    className={`flex flex-col items-center justify-center min-w-[50px] py-3 rounded-xl transition-all relative ${
                                        isSelected ? 'bg-primary text-[#111813] shadow-md shadow-primary/20' : 'bg-transparent text-gray-500'
                                    }`}
                                >
                                    <span className="text-xs font-bold mb-1">{d.day}</span>
                                    <span className="text-xl font-bold">{d.dateStr}</span>
                                    {isPlanned && !isSelected && (
                                         <div className="absolute bottom-2 size-1 bg-green-500 rounded-full"></div>
                                    )}
                                </button>
                            )})}
                         </div>
                    </div>
                ) : (
                    <div className="bg-white p-4 border-b border-gray-100 animate-fade-in shadow-sm">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
                                <span className="material-symbols-outlined text-gray-400">chevron_left</span>
                            </button>
                            <p className="font-bold text-lg text-[#111813] capitalize">{displayMonthLabel}</p>
                            <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
                                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                                <div key={d} className="text-xs font-bold text-gray-400 py-1">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                            {renderCalendar()}
                        </div>
                    </div>
                )}

                {/* Main Meal Content Area (Replaces old list) */}
                {viewMode === 'week' && (
                    <div className="px-4">
                        {renderMealList(selectedDate)}
                    </div>
                )}

                {/* Featured Recipe - Kept as a separate section below the main plan */}
                <div className="px-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-[#111813]">Món ăn nổi bật</h3>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex gap-4">
                        <img src={RECIPES_DB['bun-cha'].image} className="size-24 rounded-lg object-cover" alt="Bun Cha" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1">{RECIPES_DB['bun-cha'].time}</p>
                            <h4 className="font-bold text-base mb-1">{RECIPES_DB['bun-cha'].name}</h4>
                            <div className="flex gap-2 mt-3">
                                <button 
                                    onClick={() => addMeal('bun-cha', selectedDate)}
                                    className="px-4 py-1.5 bg-primary text-xs font-bold rounded-full text-[#111813] hover:bg-primary-dark hover:text-white transition-colors"
                                >
                                    Thêm
                                </button>
                                <button className="px-4 py-1.5 bg-gray-100 text-xs font-bold rounded-full text-[#111813]">Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-[#111813]">Danh sách mua sắm</h3>
                            <p className="text-xs text-gray-500">
                                Tổng: <span className="font-bold text-[#111813]">{weeklyCost}</span>
                            </p>
                        </div>
                        <button className="text-primary font-bold text-sm">Xem tất cả</button>
                    </div>
                    {hasShoppingItems ? (
                        <div className="space-y-6">
                            {shoppingListKeys.map((category) => (
                                <div key={category} className="animate-fade-in">
                                    <h4 className="font-bold text-gray-500 text-xs uppercase mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">{CATEGORY_ICONS[category] || 'shopping_basket'}</span>
                                        {category}
                                    </h4>
                                    <div className="space-y-2">
                                        {shoppingList[category].map((item, idx) => (
                                            <label key={`${category}-${idx}`} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer">
                                                <input type="checkbox" className="size-5 rounded border-gray-300 text-primary focus:ring-primary" />
                                                <div className="flex-1">
                                                    <p className="font-bold text-[#111813] text-sm">{item.name}</p>
                                                    <p className="text-xs text-gray-500">{item.qtyDisplay}</p>
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">~ {item.priceDisplay}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <button 
                                onClick={handleCheckout}
                                disabled={hasCheckedOut}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-4 ${
                                    hasCheckedOut 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-[#111813] text-white hover:bg-gray-900 shadow-lg shadow-black/20'
                                }`}
                            >
                                {hasCheckedOut ? (
                                    <>
                                        <span className="material-symbols-outlined">check_circle</span>
                                        Đã trừ vào ngân sách
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                        Hoàn tất mua sắm ({weeklyCost})
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                         <div className="p-6 text-center text-gray-400">
                             Chưa có mục nào trong danh sách cho tuần này
                         </div>
                    )}
                </div>

            </main>

            {showDayModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowDayModal(false)}></div>
                    <div className="bg-background-light w-full max-w-md rounded-t-3xl p-6 pb-10 animate-slide-up shadow-2xl relative z-10 max-h-[80vh] overflow-y-auto">
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
                        {renderMealList(selectedDate)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealPlanner;
