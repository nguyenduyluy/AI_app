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

const Dashboard: React.FC<DashboardProps> = ({ 
  user, budget, transactions, plannedMeals, onAddTransaction, onNavigate, onReset, onToggleMealStatus, totalPeople = 1 
}) => {
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
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const todayMeals = safePlannedMeals[dateKey] || [];
    return {
      breakfastMeals: todayMeals.filter(m => m.mealType === 'breakfast'),
      lunchMeals: todayMeals.filter(m => m.mealType === 'lunch'),
      dinnerMeals: todayMeals.filter(m => m.mealType === 'dinner')
    };
  }, [plannedMeals]);

  const recentTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  }, [transactions]);

  const handleAddTransaction = () => {
    if (amount && merchant) {
      onAddTransaction({
        amount: parseFloat(amount),
        merchant,
        category: selectedCatId,
        date: new Date().toISOString(),
        note: ''
      });
      setAmount('');
      setMerchant('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header */}
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gray-300"></div>
        </div>
        <h1 className="text-[#111813] dark:text-white/90 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Chào buổi sáng, {user.name || 'Gia đình'}!
        </h1>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#111813] dark:text-white/90 gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <span className="material-symbols-outlined text-2xl">settings</span>
          </button>
        </div>
      </header>

      <main className="flex-1 pb-4">
        {/* Budget Card */}
        <div className="px-4 pt-5 pb-3">
          <div className="rounded-xl bg-white dark:bg-white/5 p-4 border border-[#dbe6df] dark:border-white/10 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-white/60">Ngân sách thực phẩm hôm nay</p>
                <p className="text-[#111813] dark:text-white/90 tracking-light text-[28px] font-bold leading-tight">{formatMoney(todayStats.spentToday)}</p>
              </div>
              {todayStats.percentSpentToday > 80 && (
                <div className="flex items-center gap-1 text-sm text-[#e72a08] font-medium bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-base">warning</span>
                  <span>Sắp đến giới hạn</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="rounded-full bg-black/10 dark:bg-white/10 h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-primary transition-all" 
                  style={{width: `${todayStats.percentSpentToday}%`}}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-600 dark:text-white/70">Đã chi: <span className="font-bold text-[#111813] dark:text-white/90">{formatMoney(todayStats.spentToday)}</span></p>
                <p className="text-gray-600 dark:text-white/70">Còn lại: <span className="font-bold text-[#111813] dark:text-white/90">{formatMoney(Math.max(0, todayStats.remainingToday))}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-stretch">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-[#111813] text-base font-bold leading-normal tracking-[0.015em] flex-1 gap-2 hover:bg-opacity-90"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span className="truncate">Thêm chi phí</span>
            </button>
            <button 
              onClick={() => onNavigate('budget')}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#f0f4f2] dark:bg-white/10 dark:text-white/90 text-[#111813] text-base font-bold leading-normal tracking-[0.015em] flex-1 gap-2 hover:bg-opacity-80"
            >
              <span className="material-symbols-outlined">receipt_long</span>
              <span className="truncate">Xem Chi tiêu</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-4 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-background-dark">
            <p className="text-[#111813] dark:text-white/80 text-sm font-medium leading-normal">Giới hạn chi tiêu hàng tuần</p>
            <p className="text-[#111813] dark:text-white/90 tracking-light text-2xl font-bold leading-tight">{formatMoney(budget.weeklyLimit)}</p>
            <p className="text-[#078829] text-xs font-medium leading-normal">Đề xuất bởi AI</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-4 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-background-dark">
            <p className="text-[#111813] dark:text-white/80 text-sm font-medium leading-normal">Giới hạn hàng tháng</p>
            <p className="text-[#111813] dark:text-white/90 tracking-light text-2xl font-bold leading-tight">{formatMoney(budget.monthlyLimit)}</p>
            <p className="text-[#078829] text-xs font-medium leading-normal">Đề xuất bởi AI</p>
          </div>
        </div>

        {/* Meal Plans */}
        {(breakfastMeals.length > 0 || lunchMeals.length > 0 || dinnerMeals.length > 0) && (
          <div className="px-4 py-2">
            <div className="flex flex-col gap-4 rounded-xl p-4 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-background-dark">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#111813] dark:text-white/90">Kế hoạch bữa ăn hôm nay</h3>
                <a 
                  onClick={() => onNavigate('meal')}
                  className="text-primary font-bold text-sm cursor-pointer"
                >
                  Xem tất cả
                </a>
              </div>
              {breakfastMeals.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="size-24 rounded-lg object-cover bg-gray-200"></div>
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500 dark:text-white/60">Bữa sáng</p>
                    <p className="text-base font-bold text-[#111813] dark:text-white/90">{breakfastMeals[0].recipe.name}</p>
                    <a className="text-primary font-bold text-sm mt-1 cursor-pointer">Xem công thức →</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#111813] dark:text-white/90">Giao dịch gần đây</h3>
            <a 
              onClick={() => onNavigate('transactions')}
              className="text-primary font-bold text-sm cursor-pointer"
            >
              Xem tất cả
            </a>
          </div>
          <div className="flex flex-col gap-3">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#111813] dark:text-white/90">{transaction.merchant}</p>
                    <p className="text-sm text-gray-500 dark:text-white/60">{transaction.category}</p>
                  </div>
                </div>
                <p className="font-bold text-[#111813] dark:text-white/90">-{formatMoney(transaction.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Thêm chi phí</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tên cửa hàng"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="number"
                placeholder="Số tiền"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <select
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                {budget.categoryBreakdown.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border rounded-lg p-2"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddTransaction}
                  className="flex-1 bg-primary text-white rounded-lg p-2 font-bold"
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
