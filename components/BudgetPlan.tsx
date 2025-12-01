import React from 'react';
import { BudgetData } from '../types';

interface BudgetPlanProps {
  budget: BudgetData;
  onBack: () => void;
}

const BudgetPlan: React.FC<BudgetPlanProps> = ({ budget, onBack }) => {
    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Calculate dynamic percentage
    const totalSpentPercent = budget.monthlyLimit > 0 
        ? Math.round((budget.spent / budget.monthlyLimit) * 100) 
        : 0;

    return (
        <div className="flex-1 flex flex-col pb-24 bg-background-light dark:bg-background-dark">
             <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
                <div className="flex size-12 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-text-primary-light dark:text-text-primary-dark" style={{fontSize: "28px"}}>arrow_back_ios_new</span>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-text-primary-light dark:text-text-primary-dark">Kế hoạch Ngân sách</h2>
                <div className="flex w-auto items-center justify-end">
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-2 pr-2">
                        <p className="text-base font-bold leading-normal tracking-[0.015em] shrink-0 text-text-secondary-light dark:text-text-secondary-dark">Tháng này</p>
                        <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">expand_more</span>
                    </div>
                </div>
            </header>

            <main className="flex flex-col gap-6 px-4 py-4">
                {/* Monthly Budget Progress */}
                <div className="flex min-w-72 flex-1 flex-col gap-4 rounded-xl bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
                    <p className="text-base font-medium leading-normal text-text-secondary-light dark:text-text-secondary-dark">Ngân sách hàng tháng</p>
                    <div className="flex items-center gap-4">
                        <div className="relative size-24">
                            <svg className="size-full" height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg">
                                <circle className="stroke-primary/20" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                <circle 
                                    className="stroke-primary" 
                                    cx="18" 
                                    cy="18" 
                                    fill="none" 
                                    r="16" 
                                    strokeDasharray={`${totalSpentPercent} 100`}
                                    strokeDashoffset="25" 
                                    strokeLinecap="round" 
                                    strokeWidth="3"
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">{totalSpentPercent}%</span>
                                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">đã chi</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="tracking-light text-[32px] font-bold leading-tight truncate text-text-primary-light dark:text-text-primary-dark">{formatMoney(budget.spent)}</p>
                            <p className="text-base font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark">Còn lại {formatMoney(budget.monthlyLimit - budget.spent)}</p>
                        </div>
                    </div>
                </div>

                {/* Smart Alert */}
                <div className="flex gap-3 px-1 overflow-x-hidden">
                    <div className="flex w-full items-center justify-start gap-x-2 rounded-lg bg-primary/20 p-3">
                        <span className="material-symbols-outlined text-primary" style={{fontSize: "20px"}}>lightbulb</span>
                        <p className="text-sm font-medium leading-normal text-text-primary-light dark:text-text-primary-dark flex-1">Bạn đang có xu hướng chi tiêu quá mức cho 'Ăn ngoài' trong tháng này.</p>
                        <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark cursor-pointer" style={{fontSize: "20px"}}>close</span>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="flex flex-col gap-2">
                    {budget.categoryBreakdown.map((cat, idx) => {
                        const catPercent = cat.limit > 0 ? (cat.spent / cat.limit) * 100 : 0;
                        const remaining = cat.limit - cat.spent;

                        return (
                            <div key={idx} className="flex flex-col gap-4 rounded-xl bg-surface-light dark:bg-surface-dark px-4 py-3 justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center rounded-lg bg-background-light dark:bg-background-dark shrink-0 size-12">
                                        <span className="material-symbols-outlined text-text-primary-light dark:text-text-primary-dark" style={{fontSize: "24px"}}>{cat.icon || 'shopping_cart'}</span>
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center">
                                        <p className="text-base font-medium leading-normal text-text-primary-light dark:text-text-primary-dark">{cat.name}</p>
                                        <p className="text-sm font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark">còn lại {formatMoney(remaining)}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className="text-base font-medium leading-normal text-text-primary-light dark:text-text-primary-dark">{formatMoney(cat.spent)}</p>
                                        <p className="text-sm font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark">trên {formatMoney(cat.limit)}</p>
                                    </div>
                                </div>
                                <div className="w-full overflow-hidden rounded-full bg-primary/20 h-1.5">
                                    <div className="h-full rounded-full bg-primary" style={{width: `${Math.min(catPercent, 100)}%`}}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <button className="fixed bottom-24 right-6 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                <span className="material-symbols-outlined" style={{fontSize: "32px"}}>add</span>
            </button>

            <div className="sticky bottom-0 mt-auto flex justify-around border-t border-primary/20 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm p-2">
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-primary">
                    <span className="material-symbols-outlined">home</span>
                    <p className="text-xs font-bold">Trang chủ</p>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="material-symbols-outlined">restaurant_menu</span>
                    <p className="text-xs font-medium">Kế hoạch bữa ăn</p>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="material-symbols-outlined">bar_chart</span>
                    <p className="text-xs font-medium">Báo cáo</p>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="material-symbols-outlined">settings</span>
                    <p className="text-xs font-medium">Cài đặt</p>
                </div>
            </div>
        </div>
    );
};

export default BudgetPlan;