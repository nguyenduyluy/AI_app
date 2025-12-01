import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (data: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(1);
  const [income, setIncome] = useState<number | ''>(''); 
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    setIncome(val === '' ? '' : Number(val));
  };

  const handleFinish = () => {
    onComplete({
        name: 'FamPlan',
        email: 'user@example.com',
        familyMembers: { adults, kids },
        monthlyIncome: Number(income),
        financialGoals: selectedGoal ? [selectedGoal] : []
    });
  };

  return (
    <div className="min-h-screen bg-app-bg text-app-text flex flex-col font-body">
      {/* Header */}
      <div className="p-5 flex items-center">
        <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600">
             <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
        </button>
        <div className="flex-1"></div>
      </div>

      <div className="flex-1 px-6 pt-2 pb-24 max-w-md mx-auto w-full">
        <h1 className="text-3xl font-display font-bold mb-3 tracking-tight text-app-text">Chào mừng đến với FamPlan!</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">Hãy thiết lập hồ sơ gia đình của bạn để bắt đầu hành trình tiết kiệm.</p>

        {/* Section 1: Members */}
        <div className="mb-8 animate-fade-in">
            <h3 className="font-bold text-sm mb-3 text-app-text">Gia đình bạn có bao nhiêu người?</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-card border border-white">
                    <span className="font-bold text-gray-700 text-sm">Người lớn</span>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-lg">remove</span>
                        </button>
                        <span className="font-bold text-lg w-4 text-center">{adults}</span>
                        <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors shadow-glow-green">
                            <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-card border border-white">
                    <span className="font-bold text-gray-700 text-sm">Trẻ em</span>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setKids(Math.max(0, kids - 1))} className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-lg">remove</span>
                        </button>
                        <span className="font-bold text-lg w-4 text-center">{kids}</span>
                        <button onClick={() => setKids(kids + 1)} className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors shadow-glow-green">
                            <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 2: Income */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-sm mb-3 text-app-text">Tổng thu nhập hàng tháng?</h3>
            <div className="relative">
                <input 
                    type="text" 
                    value={income === '' ? '' : income.toLocaleString('en-US')}
                    onChange={handleIncomeChange}
                    placeholder="20,000,000"
                    className="w-full h-16 pl-5 pr-12 text-xl font-bold rounded-2xl border-2 border-transparent focus:border-primary bg-white shadow-card outline-none text-app-text placeholder-gray-300 transition-all"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₫</span>
            </div>
        </div>

        {/* Section 3: Goals */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold text-sm mb-3 text-app-text">Mục tiêu chính của bạn?</h3>
            <div className="grid grid-cols-2 gap-3">
                {[
                    { id: 'week', icon: 'date_range', label: 'Chi tiêu 1 tuần' },
                    { id: 'month', icon: 'calendar_month', label: 'Chi tiêu 1 tháng' },
                    { id: 'quarter', icon: 'event_repeat', label: 'Chi tiêu 3 tháng' },
                    { id: 'other', icon: 'more_horiz', label: 'Khác' },
                ].map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => setSelectedGoal(item.id)}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all h-28 ${
                            selectedGoal === item.id 
                            ? 'border-primary bg-primary-light shadow-sm' 
                            : 'border-transparent bg-white shadow-card hover:bg-gray-50'
                        }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${selectedGoal === item.id ? 'bg-white text-primary' : 'bg-gray-50 text-gray-500'}`}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <span className={`text-xs font-bold text-center ${selectedGoal === item.id ? 'text-primary-dark' : 'text-gray-600'}`}>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>

      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 max-w-lg mx-auto">
          <button 
            onClick={handleFinish}
            className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-glow-green hover:bg-primary-dark transition-all transform active:scale-[0.98]"
          >
              Tiếp tục
          </button>
      </div>

    </div>
  );
};

export default Onboarding;