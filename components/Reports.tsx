
import React, { useMemo } from 'react';
import { BudgetData, Transaction } from '../types';

interface ReportsProps {
  transactions: Transaction[];
  budget: BudgetData;
}

const Reports: React.FC<ReportsProps> = ({ transactions, budget }) => {
    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // --- Data Processing for Bar Chart (Last 7 Days) ---
    const last7DaysData = useMemo(() => {
        const days = [];
        const today = new Date();
        const dataMap = new Map<string, number>();

        // Initialize last 7 days with 0
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const key = d.toLocaleDateString('vi-VN'); // dd/mm/yyyy
            // Store short day name (e.g., T2)
            const dayName = new Intl.DateTimeFormat('vi-VN', { weekday: 'short' }).format(d);
            days.push({ key, label: dayName, amount: 0, fullDate: d });
            dataMap.set(key, 0);
        }

        // Aggregate transactions
        transactions.forEach(t => {
            const tKey = t.date.toLocaleDateString('vi-VN');
            if (dataMap.has(tKey)) {
                dataMap.set(tKey, (dataMap.get(tKey) || 0) + t.amount);
            }
        });

        // Map back to array and find max for scaling
        let maxAmount = 100000; // Minimum scale
        const chartData = days.map(d => {
            const amount = dataMap.get(d.key) || 0;
            if (amount > maxAmount) maxAmount = amount;
            return { ...d, amount };
        });

        return { chartData, maxAmount };
    }, [transactions]);

    // --- Data Processing for Donut Chart (Category Split) ---
    const categoryData = useMemo(() => {
        const catMap = new Map<string, { name: string, amount: number, color: string }>();
        
        // Initialize with budget categories to ensure colors match
        const colors = ['#13ec5b', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];
        budget.categoryBreakdown.forEach((cat, index) => {
            catMap.set(cat.id, { 
                name: cat.name, 
                amount: 0, 
                color: colors[index % colors.length] 
            });
        });

        // Sum actual transactions
        transactions.forEach(t => {
            if (catMap.has(t.categoryId)) {
                const entry = catMap.get(t.categoryId)!;
                entry.amount += t.amount;
            } else {
                // Fallback for unknown categories
                catMap.set('other', { 
                    name: 'Khác', 
                    amount: (catMap.get('other')?.amount || 0) + t.amount,
                    color: '#94a3b8' 
                });
            }
        });

        // Convert to array and calculate percentages for Conic Gradient
        const total = Array.from(catMap.values()).reduce((sum, item) => sum + item.amount, 0);
        let currentDeg = 0;
        
        const segments = Array.from(catMap.values())
            .filter(item => item.amount > 0)
            .map(item => {
                const percent = (item.amount / total) * 100;
                const deg = (item.amount / total) * 360;
                const segmentStr = `${item.color} ${currentDeg}deg ${currentDeg + deg}deg`;
                currentDeg += deg;
                return { ...item, percent, segmentStr };
            });
        
        return { segments, total, conicGradient: segments.map(s => s.segmentStr).join(', ') };
    }, [transactions, budget]);

    // --- Top Expenses ---
    const topExpenses = useMemo(() => {
        return [...transactions]
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 3);
    }, [transactions]);

    return (
        <div className="flex-1 flex flex-col pb-24 bg-background-light animate-fade-in font-display">
            <header className="p-4 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                <h1 className="text-xl font-bold text-[#111813] text-center">Báo cáo tài chính</h1>
            </header>

            <main className="p-4 space-y-6">
                
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Tổng chi tiêu</p>
                        <p className="text-xl font-bold text-[#111813]">{formatMoney(budget.spent)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">TB Chi tiêu/Ngày</p>
                        <p className="text-xl font-bold text-[#111813]">
                            {transactions.length > 0 
                                ? formatMoney(budget.spent / Math.max(1, new Set(transactions.map(t => t.date.toDateString())).size)) 
                                : formatMoney(0)}
                        </p>
                    </div>
                </div>

                {/* Daily Spending Trend - Bar Chart */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-[#111813]">Xu hướng 7 ngày qua</h3>
                    </div>
                    
                    {transactions.length > 0 ? (
                        <div className="flex items-end justify-between h-40 gap-2">
                            {last7DaysData.chartData.map((d, i) => {
                                const heightPercent = (d.amount / last7DaysData.maxAmount) * 100;
                                return (
                                    <div key={i} className="flex flex-col items-center flex-1 group relative">
                                        {/* Tooltip */}
                                        <div className="absolute -top-8 bg-[#111813] text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                            {formatMoney(d.amount)}
                                        </div>
                                        
                                        <div 
                                            className={`w-full max-w-[30px] rounded-t-lg transition-all duration-500 ease-out ${d.amount > 0 ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-100'}`}
                                            style={{ height: `${Math.max(4, heightPercent)}%` }}
                                        ></div>
                                        <span className="text-xs text-gray-400 font-bold mt-2">{d.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                         <div className="h-40 flex items-center justify-center text-gray-400 text-sm italic bg-gray-50 rounded-xl">
                            Chưa có dữ liệu chi tiêu tuần này
                        </div>
                    )}
                </div>

                {/* Category Breakdown - Donut Chart */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg text-[#111813] mb-6">Cơ cấu chi tiêu</h3>
                    
                    {budget.spent > 0 ? (
                        <div className="flex items-center gap-6">
                            <div className="relative size-36 shrink-0">
                                {/* Conic Gradient Donut */}
                                <div 
                                    className="size-full rounded-full"
                                    style={{ background: `conic-gradient(${categoryData.conicGradient})` }}
                                ></div>
                                {/* Inner Circle for Donut effect */}
                                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-inner">
                                    <span className="text-xs font-medium text-gray-500">Tổng chi</span>
                                </div>
                            </div>
                            
                            {/* Legend */}
                            <div className="flex-1 space-y-3">
                                {categoryData.segments.map((seg, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full" style={{ backgroundColor: seg.color }}></div>
                                            <span className="text-gray-600 font-medium">{seg.name}</span>
                                        </div>
                                        <span className="font-bold text-[#111813]">{Math.round(seg.percent)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 text-center text-gray-400 bg-gray-50 rounded-xl">
                            Chưa có dữ liệu phân tích
                        </div>
                    )}
                </div>

                {/* Top Expenses */}
                <div>
                    <h3 className="font-bold text-lg text-[#111813] mb-4">Chi tiêu lớn nhất</h3>
                    {topExpenses.length > 0 ? (
                        <div className="space-y-3">
                            {topExpenses.map(t => (
                                <div key={t.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                                            <span className="material-symbols-outlined">trending_up</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#111813] text-sm">{t.merchant}</p>
                                            <p className="text-xs text-gray-500">{t.date.toLocaleDateString('vi-VN')}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-red-600">-{formatMoney(t.amount)}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm italic">Chưa có giao dịch lớn nào.</p>
                    )}
                </div>

            </main>
        </div>
    );
};

export default Reports;
