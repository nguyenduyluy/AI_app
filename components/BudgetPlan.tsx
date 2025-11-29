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

    // SVG Circle Math
    // Dash array is "Value, 100". 
    const dashArray = `${totalSpentPercent}, 100`;

    return (
        <div className="flex-1 flex flex-col pb-24 bg-background-light animate-fade-in">
             <header className="flex items-center p-4 bg-background-light sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
                    <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
                </button>
                <h1 className="flex-1 text-center font-bold text-lg">Kế hoạch Ngân sách</h1>
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-gray-200">
                    <span className="text-sm font-bold text-primary-dark">Tháng này</span>
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                </div>
            </header>

            <main className="px-4 pt-2 space-y-6">
                
                {/* Circular Chart - Dynamic */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="relative size-32 shrink-0">
                         <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-gray-100"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className="text-primary transition-all duration-1000"
                                strokeDasharray={dashArray}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-[#111813]">{totalSpentPercent}%</span>
                            <span className="text-xs text-gray-500">đã chi</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Ngân sách tháng</p>
                        <p className="text-2xl font-bold text-[#111813]">{formatMoney(budget.monthlyLimit)}</p>
                        <p className="text-sm text-green-600 mt-1">Còn lại: {formatMoney(budget.monthlyLimit - budget.spent)}</p>
                    </div>
                </div>

                {/* AI Smart Alert - Conditional */}
                {totalSpentPercent > 0 && (
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3 items-start">
                        <span className="material-symbols-outlined text-primary mt-0.5">lightbulb</span>
                        <div className="flex-1">
                            <p className="text-sm text-[#111813] font-medium leading-relaxed">
                                Hãy bắt đầu ghi lại chi tiêu để AI có thể phân tích và đưa ra lời khuyên.
                            </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                )}
                {totalSpentPercent === 0 && (
                     <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                        <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
                        <div className="flex-1">
                            <p className="text-sm text-[#111813] font-medium leading-relaxed">
                                Ngân sách tháng này đã sẵn sàng. Hãy bắt đầu thêm chi tiêu để theo dõi!
                            </p>
                        </div>
                    </div>
                )}

                {/* Categories - Dynamic */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Chi tiết danh mục</h3>
                    {budget.categoryBreakdown.map((cat, idx) => {
                        const catPercent = cat.limit > 0 ? (cat.spent / cat.limit) * 100 : 0;
                        const remaining = cat.limit - cat.spent;

                        return (
                            <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700">
                                            <span className="material-symbols-outlined">{cat.icon}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#111813]">{cat.name}</p>
                                            <p className="text-xs text-gray-500">còn lại {formatMoney(remaining)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-[#111813]">{formatMoney(cat.spent)}</p>
                                        <p className="text-xs text-gray-400">trên {formatMoney(cat.limit)}</p>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ${catPercent > 100 ? 'bg-red-500' : 'bg-primary'}`} 
                                        style={{ width: `${Math.min(catPercent, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </main>

            <button className="fixed bottom-24 right-5 size-14 bg-primary text-[#111813] rounded-full shadow-lg shadow-primary/40 flex items-center justify-center hover:scale-105 transition-transform z-20">
                <span className="material-symbols-outlined text-3xl">add</span>
            </button>
        </div>
    );
};

export default BudgetPlan;