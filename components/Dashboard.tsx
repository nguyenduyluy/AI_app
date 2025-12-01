
import React, { useState, useMemo } from 'react';
import { BudgetData, UserProfile, Transaction, Recipe, PlannedMeal } from '../types';
import { RECIPES_DB } from '../services/geminiService';

interface DashboardProps {
  user: UserProfile;
  budget: BudgetData;
  transactions: Transaction[];
  plannedMeals: Record<string, PlannedMeal[]>;
  onAddTransaction: (t: Omit<Transaction, 'id'>) => void;
  onNavigate: (screen: any) => void;
  onReset: () => void;
  onToggleMealStatus: (dateKey: string, instanceId: string) => void;
  totalPeople: number;
}

const Dashboard: React.FC<DashboardProps> = ({ user, budget, transactions, plannedMeals, onAddTransaction, onNavigate, onReset, onToggleMealStatus, totalPeople = 1 }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(budget.categoryBreakdown[0]?.id || 'groceries');

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const todayStats = useMemo(() => {
    const today = new Date();
    const spentToday = transactions
        .filter(t => {
            const d = new Date(t.date);
            return d.getDate() === today.getDate() &&
                   d.getMonth() === today.getMonth() &&
                   d.getFullYear() === today.getFullYear();
        })
        .reduce((sum, t) => sum + t.amount, 0);
    
    const remainingToday = budget.dailyLimit - spentToday;
    const percentSpentToday = budget.dailyLimit > 0 
        ? Math.min(100, (spentToday / budget.dailyLimit) * 100) 
        : 0;

    return { spentToday, remainingToday, percentSpentToday };
  }, [transactions, budget.dailyLimit]);

  const { breakfastMeals, lunchMeals, dinnerMeals } = useMemo(() => {
    const safePlannedMeals = plannedMeals || {};
    const allMeals: Array<Recipe & { instanceId: string, status: 'pending' | 'completed', dateKey: string }> = [];

    Object.entries(safePlannedMeals).forEach(([dateKey, meals]) => {
        (meals as PlannedMeal[]).forEach(meal => {
            const recipe = RECIPES_DB[meal.recipeId];
            if (recipe) {
                allMeals.push({
                    ...recipe,
                    instanceId: meal.instanceId,
                    status: meal.status,
                    dateKey: dateKey
                });
            }
        });
    });
    
    return {
        breakfastMeals: allMeals.filter(m => m.type === 'Bữa sáng'),
        lunchMeals: allMeals.filter(m => m.type === 'Bữa trưa'),
        dinnerMeals: allMeals.filter(m => m.type === 'Bữa tối'),
    };
  }, [plannedMeals]);

  // Scale cost by family size
  const calculateCost = (recipe: Recipe) => {
      return recipe.ingredients.reduce((sum, i) => sum + i.price, 0) * totalPeople;
  };

  const handleSaveTransaction = () => {
    if (!amount || !merchant) return;
    
    const category = budget.categoryBreakdown.find(c => c.id === selectedCatId);
    
    onAddTransaction({
        merchant: merchant,
        amount: parseInt(amount.replace(/[^0-9]/g, '')),
        categoryId: selectedCatId,
        categoryName: category?.name || 'Khác',
        date: new Date(),
        icon: category?.icon || 'receipt',
        color: 'bg-gray-100'
    });

    setAmount('');
    setMerchant('');
    setShowAddModal(false);
  };

  const MealCard: React.FC<{ meal: Recipe & { instanceId: string, status: 'pending' | 'completed', dateKey: string } }> = ({ meal }) => {
    const isCompleted = meal.status === 'completed';

    return (
        <div className={`flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 ${isCompleted ? 'bg-gray-50 opacity-60' : ''}`}>
            <div className="relative size-16 shrink-0">
                <img src={meal.image} alt={meal.name} className={`size-full rounded-lg object-cover transition-all ${isCompleted ? 'grayscale' : ''}`} />
                {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                        <span className="material-symbols-outlined text-white text-2xl drop-shadow-md">check</span>
                    </div>
                )}
            </div>
            
            <div className="flex-1 min-w-0">
                <p className={`text-base font-bold text-[#111813] truncate transition-all ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                    {meal.name}
                </p>
                <div className="flex items-center gap-2">
                    <p className={`text-xs font-bold transition-colors ${isCompleted ? 'text-gray-400' : 'text-primary-dark'}`}>
                        {formatMoney(calculateCost(meal))}
                    </p>
                    <span className="text-[10px] text-gray-400">• {meal.dateKey.split('-').reverse().slice(0, 2).join('/')}</span>
                </div>
            </div>
            
            <div className="flex flex-col gap-1">
                <button 
                    onClick={() => onToggleMealStatus(meal.dateKey, meal.instanceId)}
                    className={`p-2 rounded-full transition-colors ${
                        isCompleted 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-300 hover:text-green-500 hover:bg-green-50'
                    }`}
                    title={isCompleted ? "Đánh dấu chưa ăn" : "Đánh dấu đã ăn"}
                >
                    <span className={`material-symbols-outlined ${isCompleted ? 'font-variation-fill' : ''}`} style={{ fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0" }}>
                        check_circle
                    </span>
                </button>
                <button 
                    onClick={() => setSelectedRecipe(meal)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                    title="Xem chi tiết"
                >
                    <span className="material-symbols-outlined">visibility</span>
                </button>
            </div>
        </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col pb-24 animate-fade-in relative">
      <header className="flex items-center justify-between p-4 bg-background-light sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://picsum.photos/id/64/200/200" alt="Family" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#111813] leading-tight">Chào buổi sáng,</h1>
            <p className="text-sm text-gray-500">{user.name}</p>
          </div>
        </div>
        <button 
            onClick={onReset}
            className="p-2 rounded-lg hover:bg-white/50"
            title="Cài đặt / Đăng xuất"
        >
          <span className="material-symbols-outlined text-2xl text-[#111813]">settings</span>
        </button>
      </header>

      <main className="px-4 space-y-6 pt-2">
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            <p className="text-sm text-gray-500 font-medium mb-1">Ngân sách chi tiêu hôm nay</p>
            
            <div className="flex justify-between items-center mb-4">
                <p className="text-3xl font-bold text-[#111813] tracking-tight">{formatMoney(todayStats.remainingToday)}</p>
                {todayStats.percentSpentToday > 90 && (
                    <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">warning</span>
                        <span>Sắp giới hạn</span>
                    </div>
                )}
            </div>
            
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
                <div 
                    className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-1000" 
                    style={{ width: `${todayStats.percentSpentToday}%` }}
                ></div>
            </div>

            <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                    Đã chi <span className="font-bold text-gray-900">{formatMoney(todayStats.spentToday)}</span>
                </span>
                <span className="text-gray-500">
                    Tổng ngày: <span className="font-bold text-primary-dark">{formatMoney(budget.dailyLimit)}</span>
                </span>
            </div>
        </div>

        <div className="flex gap-3">
            <button 
                onClick={() => setShowAddModal(true)}
                className="flex-1 h-14 bg-primary text-[#111813] rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-primary-dark hover:text-white transition-colors"
            >
                <span className="material-symbols-outlined">add_circle</span>
                Thêm chi phí
            </button>
            <button 
                onClick={() => onNavigate('BUDGET')}
                className="flex-1 h-14 bg-white border border-gray-100 text-[#111813] rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-gray-50 transition-colors"
            >
                <span className="material-symbols-outlined">receipt_long</span>
                Xem Chi tiêu
            </button>
        </div>

        <div className="space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-[#111813]">Thực đơn đã lên kế hoạch</h3>
                <button onClick={() => onNavigate('MEALS')} className="text-primary font-bold text-sm">Quản lý</button>
            </div>
            
            {breakfastMeals.length > 0 && (
                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">bakery_dining</span> Bữa sáng
                    </h4>
                    <div className="space-y-2">
                        {breakfastMeals.map(m => <MealCard key={m.instanceId} meal={m} />)}
                    </div>
                </div>
            )}

            {lunchMeals.length > 0 && (
                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">lunch_dining</span> Bữa trưa
                    </h4>
                    <div className="space-y-2">
                        {lunchMeals.map(m => <MealCard key={m.instanceId} meal={m} />)}
                    </div>
                </div>
            )}

            {dinnerMeals.length > 0 && (
                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">dinner_dining</span> Bữa tối
                    </h4>
                    <div className="space-y-2">
                        {dinnerMeals.map(m => <MealCard key={m.instanceId} meal={m} />)}
                    </div>
                </div>
            )}

            {breakfastMeals.length === 0 && lunchMeals.length === 0 && dinnerMeals.length === 0 && (
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-200">
                    <p className="text-gray-500 mb-2">Chưa có thực đơn nào được lên kế hoạch.</p>
                    <button onClick={() => onNavigate('MEALS')} className="text-primary font-bold text-sm">
                        + Tạo thực đơn ngay
                    </button>
                </div>
            )}
        </div>

        <div>
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-[#111813]">Giao dịch gần đây</h3>
                <button onClick={() => onNavigate('BUDGET')} className="text-primary font-bold text-sm">Xem tất cả</button>
            </div>
            <div className="space-y-3">
                {transactions.length > 0 ? (
                    transactions.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-50 hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className={`size-12 rounded-full flex items-center justify-center bg-gray-100`}>
                                    <span className="material-symbols-outlined text-gray-600">{t.icon}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-[#111813]">{t.merchant}</p>
                                    <p className="text-sm text-gray-500">{t.categoryName} • {t.date.toLocaleDateString('vi-VN')}</p>
                                </div>
                            </div>
                            <p className="font-bold text-[#111813]">- {formatMoney(t.amount)}</p>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <div className="size-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="material-symbols-outlined text-gray-400">receipt_long</span>
                        </div>
                        <p className="text-gray-500 font-medium">Chưa có giao dịch nào.</p>
                    </div>
                )}
            </div>
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowAddModal(false)}></div>
            <div className="bg-background-light w-full max-w-md rounded-t-3xl p-6 pb-10 animate-slide-up shadow-2xl relative z-10">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-[#111813] mb-6">Thêm giao dịch mới</h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Số tiền</label>
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="w-full h-14 pl-4 rounded-xl border border-gray-200 text-xl font-bold focus:border-primary focus:ring-primary outline-none"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Tên giao dịch / Cửa hàng</label>
                        <input 
                            type="text" 
                            value={merchant}
                            onChange={(e) => setMerchant(e.target.value)}
                            placeholder="Ví dụ: Siêu thị Go!"
                            className="w-full h-14 pl-4 rounded-xl border border-gray-200 text-base focus:border-primary focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Danh mục</label>
                        <div className="grid grid-cols-2 gap-2">
                            {budget.categoryBreakdown.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCatId(cat.id)}
                                    className={`p-3 rounded-xl border flex items-center gap-2 ${
                                        selectedCatId === cat.id 
                                        ? 'border-primary bg-primary/10 text-primary-dark' 
                                        : 'border-gray-200 bg-white text-gray-600'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                                    <span className="text-sm font-bold">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleSaveTransaction}
                    className="w-full mt-8 h-14 bg-primary text-[#111813] text-lg font-bold rounded-xl hover:bg-primary-dark hover:text-white transition-colors"
                >
                    Lưu giao dịch
                </button>
            </div>
        </div>
      )}

      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedRecipe(null)}></div>
            <div className="bg-background-light w-full max-w-md rounded-t-3xl p-0 animate-slide-up shadow-2xl relative z-10 h-[85vh] flex flex-col">
                <div className="relative h-64 w-full shrink-0">
                    <img src={selectedRecipe.image} className="w-full h-full object-cover rounded-t-3xl" alt={selectedRecipe.name} />
                    <button 
                        onClick={() => setSelectedRecipe(null)}
                        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 backdrop-blur"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                         <h3 className="text-2xl font-bold text-white mb-1">{selectedRecipe.name}</h3>
                         <div className="flex items-center gap-4 text-white/90 text-sm">
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {selectedRecipe.time}</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">local_fire_department</span> {selectedRecipe.calories} kcal</span>
                         </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <h4 className="font-bold text-lg text-[#111813]">Giá ước tính ({totalPeople} người)</h4>
                             <span className="text-xl font-bold text-primary-dark">{formatMoney(calculateCost(selectedRecipe))}</span>
                        </div>
                        <p className="text-gray-500 text-sm italic">{selectedRecipe.desc || 'Công thức này chưa có mô tả chi tiết.'}</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg text-[#111813] mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">grocery</span> Nguyên liệu
                        </h4>
                        <ul className="space-y-3">
                            {selectedRecipe.ingredients.map((ing, idx) => (
                                <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-2">
                                        <div className="size-1.5 rounded-full bg-primary"></div>
                                        <span className="text-[#111813]">{ing.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-gray-500 text-sm mr-2">
                                            {ing.qty * totalPeople} {ing.unit}
                                        </span>
                                        <span className="font-bold text-sm text-[#111813]">
                                            {formatMoney(ing.price * totalPeople)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                         <h4 className="font-bold text-lg text-[#111813] mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">menu_book</span> Cách làm
                        </h4>
                        <div className="bg-gray-50 rounded-xl p-4 text-gray-600 text-sm leading-relaxed border border-gray-100">
                            {selectedRecipe.instructions && selectedRecipe.instructions.length > 0 ? (
                                selectedRecipe.instructions.map((step, idx) => (
                                    <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                                        {idx + 1}. {step}
                                    </p>
                                ))
                            ) : (
                                <>
                                    <p>1. Sơ chế tất cả các nguyên liệu sạch sẽ.</p>
                                    <p className="mt-2">2. Chế biến theo công thức gia truyền (dữ liệu cách làm đang được cập nhật).</p>
                                    <p className="mt-2">3. Trình bày ra đĩa và thưởng thức cùng gia đình.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                    <button onClick={() => setSelectedRecipe(null)} className="w-full h-12 bg-primary text-[#111813] font-bold rounded-xl hover:bg-primary-dark hover:text-white transition-colors">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
