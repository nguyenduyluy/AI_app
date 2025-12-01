
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (data: UserProfile) => void;
}

const GOAL_OPTIONS = [
    { id: 'savings', icon: 'savings', label: 'Xây dựng quỹ khẩn cấp' },
    { id: 'vacation', icon: 'beach_access', label: 'Tiết kiệm cho kỳ nghỉ' },
    { id: 'debt', icon: 'credit_card_off', label: 'Trả hết nợ' },
    { id: 'purchase', icon: 'home', label: 'Tiết kiệm cho một khoản mua sắm lớn' }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(1);
  const [income, setIncome] = useState<number | ''>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [step, setStep] = useState(1);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : prev.length < 3 ? [...prev, goalId] : prev
    );
  };

  // SEPARATION OF CONCERNS LOGIC
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const valueWithoutCommas = inputValue.replace(/,/g, '').replace(/[^0-9]/g, '');

    if (valueWithoutCommas === '') {
        setIncome('');
        return;
    }

    const rawNumber = Number(valueWithoutCommas);
    setIncome(rawNumber);
  };

  const handleFinish = () => {
    setIsAnalyzing(true);
    const numericIncome = income === '' ? 0 : income;

    const processedGoals: string[] = selectedGoals.map(goalId => {
        const option = GOAL_OPTIONS.find(opt => opt.id === goalId);
        return option ? option.label : goalId;
    });
    
    setTimeout(() => {
        onComplete({
            name: 'Gia đình',
            email: 'test@example.com',
            familyMembers: { adults, kids },
            monthlyIncome: numericIncome,
            financialGoals: processedGoals
        });
    }, 2000);
  };

  if (isAnalyzing) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f8f6] dark:bg-background-dark p-6 text-center">
              <div className="relative size-32 mb-8">
                  <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary animate-pulse">
                        psychology
                    </span>
                  </div>
              </div>
              <h2 className="text-2xl font-bold text-[#111813] dark:text-white mb-2">AI đang phân tích...</h2>
              <p className="text-gray-500 dark:text-gray-400">Đang tối ưu hóa ngân sách và kế hoạch bữa ăn cho gia đình bạn.</p>
          </div>
      )
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f8f6] dark:bg-background-dark text-[#111813] dark:text-gray-200">
      {/* Header */}
      <div className="flex items-center p-4 sticky top-0 bg-[#f6f8f6] dark:bg-background-dark z-10">
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
           <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <div className="flex-1 flex justify-center gap-3">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-primary/30'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-primary/30'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-primary/30'}`}></div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 px-4 pb-24 pt-4">
        {step === 1 ? (
          <>
            <h1 className="text-[#111813] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left">Chào mừng đến với FamPlan!</h1>
            <p className="text-[#111813] dark:text-gray-300 text-base font-normal leading-normal pt-2">Hãy thiết lập hồ sơ gia đình của bạn để bắt đầu.</p>
            
            <div className="pt-8">
              <h3 className="text-[#111813] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] text-left">Gia đình bạn có bao nhiêu người?</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 p-4">
                  <span className="font-medium text-base text-[#111813] dark:text-gray-200">Người lớn</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30 dark:text-white">
                      <span className="material-symbols-outlined text-xl">remove</span>
                    </button>
                    <span className="text-xl font-bold w-4 text-center text-[#111813] dark:text-white">{adults}</span>
                    <button onClick={() => setAdults(adults + 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white dark:bg-primary dark:text-black">
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 p-4">
                  <span className="font-medium text-base text-[#111813] dark:text-gray-200">Trẻ em</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setKids(Math.max(0, kids - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30 dark:text-white">
                      <span className="material-symbols-outlined text-xl">remove</span>
                    </button>
                    <span className="text-xl font-bold w-4 text-center text-[#111813] dark:text-white">{kids}</span>
                    <button onClick={() => setKids(kids + 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white dark:bg-primary dark:text-black">
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : step === 2 ? (
          <>
            <h3 className="text-[#111813] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] text-left">Tổng thu nhập hàng tháng của bạn là bao nhiêu?</h3>
            <div className="relative mt-4">
              <input 
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={income === '' ? '' : income.toLocaleString('en-US')}
                onChange={handleIncomeChange}
                className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-4 pl-4 pr-12 text-base text-[#111813] dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                placeholder="20,000,000"
              />
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 dark:text-gray-400">₫</span>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
              <span className="material-symbols-outlined text-sm mt-0.5">lock</span> Dữ liệu tài chính của bạn được mã hóa và bảo mật.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-[#111813] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] text-left">Mục tiêu tài chính chính của bạn là gì?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 pt-1">Chọn tối đa 3</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {GOAL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleGoal(option.id)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                    selectedGoals.includes(option.id)
                      ? 'border-primary bg-primary/20 dark:bg-primary/30'
                      : 'border-transparent bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    selectedGoals.includes(option.id)
                      ? 'bg-white dark:bg-gray-700'
                      : 'bg-[#f6f8f6] dark:bg-background-dark'
                  }`}>
                    <span className={`material-symbols-outlined text-3xl ${
                      selectedGoals.includes(option.id)
                        ? 'text-primary dark:text-primary'
                        : 'text-[#111813] dark:text-gray-200'
                    }`}>
                      {option.icon}
                    </span>
                  </div>
                  <span className="font-medium text-sm text-[#111813] dark:text-white">{option.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 w-full p-4 bg-[#f6f8f6] dark:bg-background-dark/80 dark:backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => {
                if (step < 3) setStep(step + 1);
                else handleFinish();
              }}
              disabled={
                (step === 1 ? false : step === 2 ? income === '' : selectedGoals.length === 0)
              }
              className={`w-full rounded-xl py-4 text-center text-base font-bold transition-all transform active:scale-[0.98] ${
                (step === 1 ? false : step === 2 ? income === '' : selectedGoals.length === 0)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                  : 'bg-primary text-black dark:text-black shadow-lg hover:bg-opacity-90'
              }`}
            >
              {step === 3 ? 'Tiếp tục' : 'Tiếp tục'}
            </button>
            <button className="w-full rounded-xl py-2 text-center text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              Bỏ qua
            </button>
          </div>
      </div>
    </div>
  );
};

export default Onboarding;
