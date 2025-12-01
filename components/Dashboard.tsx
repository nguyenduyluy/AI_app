
import React from 'react';
import { UserProfile, BudgetData, Transaction, PlannedMeal, Recipe } from '../types';
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
  onViewRecipe: (recipeId: string) => void;
  totalPeople: number;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  budget, 
  transactions, 
  plannedMeals, 
  onNavigate, 
  onReset,
  onToggleMealStatus,
  onViewRecipe,
}) => {
  
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const today = new Date();
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const spentToday = transactions
    .filter(t => new Date(t.date).toDateString() === today.toDateString())
    .reduce((sum, t) => sum + t.amount, 0);

  const remainingToday = budget.dailyLimit - spentToday;
  const percentUsed = Math.min(100, (spentToday / budget.dailyLimit) * 100);

  const todaysMeals = (plannedMeals[dateKey] || []).map(pm => {
      const recipe = RECIPES_DB[pm.recipeId];
      if (!recipe) return null;
      return { ...recipe, instanceId: pm.instanceId, status: pm.status };
  }).filter((item): item is Recipe & { instanceId: string, status: 'pending' | 'completed' } => Boolean(item));

  return (
    <div className="flex-1 pb-28 pt-8 px-5 bg-app-bg text-app-text font-body animate-fade-in min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden">
             <img src="https://i.pravatar.cc/150?img=12" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Chào buổi sáng,</p>
            <h2 className="text-lg font-bold text-app-text">Gia đình {user.name}</h2>
          </div>
        </div>
        <button onClick={onReset} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>

      {/* Main Budget Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-card mb-6 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-gray-500 font-bold text-sm mb-1">Ngân sách thực phẩm hôm nay</p>
                <h3 className="text-3xl font-display font-bold text-app-text tracking-tight">
                    {formatMoney(remainingToday)}
                </h3>
            </div>
            {remainingToday < budget.dailyLimit * 0.2 && (
                 <div className="bg-red-50 text-red-500 px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">warning</span>
                    Sắp đến giới hạn
                 </div>
            )}
        </div>

        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
            <span>Đã chi: <span className="text-app-text">{formatMoney(spentToday)}</span></span>
            <span>Giới hạn: {formatMoney(budget.dailyLimit)}</span>
        </div>

        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
             <div 
                className={`h-full rounded-full transition-all duration-1000 ${percentUsed > 100 ? 'bg-red-500' : 'bg-primary'}`}
                style={{ width: `${percentUsed}%` }}
             ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
          <button 
            onClick={() => {}} 
            className="flex-1 h-12 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-glow-green hover:bg-primary-dark transition-all transform active:scale-95"
          >
              <span className="material-symbols-outlined text-xl">add_circle</span>
              Thêm chi phí
          </button>
          <button 
            onClick={() => onNavigate('BUDGET')}
            className="flex-1 h-12 bg-white text-app-text border border-gray-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
          >
              <span className="material-symbols-outlined text-gray-500 text-xl">receipt_long</span>
              Xem chi tiêu
          </button>
      </div>

      {/* Info Cards Row (Mock Data for Visual Match) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className="bg-white p-4 rounded-2xl shadow-card border border-gray-50">
             <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Giới hạn hàng tuần</p>
             <p className="text-lg font-bold text-app-text">{formatMoney(budget.weeklyLimit)}</p>
             <p className="text-xs text-primary font-bold mt-1">An toàn</p>
         </div>
         <div className="bg-white p-4 rounded-2xl shadow-card border border-gray-50">
             <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Giới hạn hàng tháng</p>
             <p className="text-lg font-bold text-app-text">{formatMoney(budget.monthlyLimit)}</p>
             <p className="text-xs text-primary font-bold mt-1">Đề xuất bởi AI</p>
         </div>
      </div>

      {/* Meal Plan Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-app-text">Kế hoạch bữa ăn hôm nay</h3>
            <button onClick={() => onNavigate('MEALS')} className="text-primary text-xs font-bold hover:underline">Xem tất cả</button>
        </div>

        <div className="space-y-3">
            {todaysMeals.length > 0 ? (
                todaysMeals.map((meal) => (
                    <div 
                        key={meal.instanceId} 
                        className="bg-white p-3 rounded-2xl shadow-card flex items-center gap-3 border border-gray-50 group"
                    >
                        <div 
                            className="flex-1 flex items-center gap-3 cursor-pointer"
                            onClick={() => onViewRecipe(meal.id)}
                        >
                            <img src={meal.image} alt={meal.name} className={`w-16 h-16 rounded-xl object-cover ${meal.status === 'completed' ? 'grayscale opacity-50' : ''}`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">{meal.type}</p>
                                <h4 className={`font-bold text-sm text-app-text truncate ${meal.status === 'completed' ? 'line-through text-gray-400' : ''}`}>{meal.name}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-xs text-primary font-medium">{meal.calories} Kcal</p>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded">Xem chi tiết</span>
                                </div>
                            </div>
                        </div>

                        {/* Checkbox for status only */}
                        <div 
                            onClick={() => onToggleMealStatus(dateKey, meal.instanceId)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors cursor-pointer hover:bg-gray-50 ${meal.status === 'completed' ? 'bg-primary border-primary text-white hover:bg-primary-dark' : 'border-gray-200 text-gray-300'}`}
                        >
                             <span className="material-symbols-outlined text-sm">check</span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="bg-white p-5 rounded-2xl border border-dashed border-gray-200 text-center">
                    <div className="w-10 h-10 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="material-symbols-outlined">smart_toy</span>
                    </div>
                    <h4 className="font-bold text-app-text text-sm">Gợi ý từ AI</h4>
                    <p className="text-xs text-gray-500 mb-3">Bún chả Hà Nội - 30 phút. Món ăn cân bằng.</p>
                    <button onClick={() => onNavigate('MEALS')} className="bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-glow-green">Thêm bữa ăn</button>
                </div>
            )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-app-text">Giao dịch gần đây</h3>
            <button className="text-primary text-xs font-bold hover:underline">Xem tất cả</button>
        </div>
        <div className="space-y-3">
            {transactions.slice(0, 3).map(t => (
                <div key={t.id} className="bg-white p-4 rounded-2xl shadow-card flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-xl">{t.icon}</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-app-text">{t.merchant}</p>
                            <p className="text-xs text-gray-400">{t.categoryName}</p>
                        </div>
                    </div>
                    <span className="font-bold text-app-text text-sm">- {formatMoney(t.amount)}</span>
                </div>
            ))}
             {transactions.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-4">Chưa có giao dịch nào</p>
            )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
