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

    const percentSpent = Math.min(100, Math.round((budget.spent / budget.monthlyLimit) * 100));
    const dashArray = `${percentSpent}, 100`;

    return (
        <div className="flex-1 pb-28 pt-6 bg-app-bg animate-fade-in font-body min-h-screen">
            
            {/* Header */}
            <div className="flex items-center px-5 mb-6">
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-gray-600 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
                </button>
                <div className="flex-1 text-center">
                    <h1 className="font-bold text-lg text-app-text">Kế hoạch Ngân sách</h1>
                    <button className="text-xs font-bold text-gray-400 flex items-center justify-center gap-1 mx-auto mt-0.5">
                        Tháng này <span className="material-symbols-outlined text-xs">expand_more</span>
                    </button>
                </div>
                <div className="w-10"></div>
            </div>

            <div className="px-5 space-y-6">
                
                {/* 1. Main Circular Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-card">
                    <div className="flex items-center gap-6">
                         {/* Circle Chart */}
                        <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="text-gray-100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    className="text-primary drop-shadow-md transition-all duration-1000 ease-out"
                                    strokeDasharray={dashArray}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-app-text">{percentSpent}%</span>
                            </div>
                        </div>

                        {/* Text Info */}
                        <div className="flex-1">
                            <p className="text-gray-400 font-bold text-xs uppercase mb-1">Ngân sách hàng tháng</p>
                            <p className="text-2xl font-bold text-app-text mb-2 tracking-tight">{formatMoney(budget.spent)}</p>
                            <p className="text-xs font-bold text-gray-500">
                                Còn lại <span className="text-primary ml-1 text-sm">{formatMoney(budget.remaining)}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Insights Banner */}
                {percentSpent > 50 && (
                    <div className="bg-primary-light border border-primary/20 rounded-2xl p-4 flex items-start gap-3 relative">
                        <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-app-text leading-relaxed">
                                Bạn đang có xu hướng chi tiêu <span className="font-bold text-green-700">hiệu quả</span>. Hãy tiếp tục phát huy!
                            </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                )}

                {/* 3. Category List */}
                <div className="space-y-4">
                    {budget.categoryBreakdown.map((cat, idx) => {
                        const remaining = cat.limit - cat.spent;
                        const percent = Math.min(100, (cat.spent / cat.limit) * 100);
                        
                        return (
                            <div key={idx} className="bg-white p-5 rounded-2xl shadow-card flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-app-text text-sm">{cat.name}</p>
                                            <p className="text-xs text-gray-400 font-bold mt-0.5">
                                                còn lại <span className="text-primary">{formatMoney(remaining)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-app-text text-sm">{formatMoney(cat.spent)}</p>
                                        <p className="text-[10px] text-gray-400 font-bold mt-0.5">trên {formatMoney(cat.limit)}</p>
                                    </div>
                                </div>
                                {/* Mini Progress Bar */}
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-primary h-full rounded-full transition-all duration-500" 
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
};

export default BudgetPlan;