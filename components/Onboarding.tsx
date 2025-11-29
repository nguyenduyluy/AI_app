
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (data: UserProfile) => void;
}

const GOAL_OPTIONS = [
    { id: '1_week', icon: 'view_week', label: 'Chi tiêu trong 1 tuần' },
    { id: '1_month', icon: 'calendar_month', label: 'Chi tiêu trong 1 tháng' },
    { id: '3_months', icon: 'date_range', label: 'Chi tiêu trong 3 tháng' },
    { id: 'other', icon: 'edit', label: 'Khác' }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(1);
  const [income, setIncome] = useState<number | ''>(''); // State stores pure Number (Integer) or empty
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [customGoal, setCustomGoal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleGoal = (goalId: string) => {
    if (selectedGoal === goalId) {
        setSelectedGoal(null);
    } else {
        setSelectedGoal(goalId);
    }
  };

  // SEPARATION OF CONCERNS LOGIC
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Capture the user's input string
    const inputValue = e.target.value;

    // 2. IMMEDIATELY strip out all commas (,)
    // Also stripping non-digits to ensure we can convert to a valid number
    const valueWithoutCommas = inputValue.replace(/,/g, '').replace(/[^0-9]/g, '');

    // 3. Check for empty string to allow clearing the field
    if (valueWithoutCommas === '') {
        setIncome('');
        return;
    }

    // 4. Convert the result back to a pure Number
    const rawNumber = Number(valueWithoutCommas);

    // 5. Update the `rawValue` state with this pure Number
    setIncome(rawNumber);
  };

  const handleFinish = () => {
    setIsAnalyzing(true);
    // Parse the state for submission
    const numericIncome = income === '' ? 0 : income;

    // Process goals: Map ID to label, handle 'other' custom text
    let processedGoals: string[] = [];
    if (selectedGoal) {
        if (selectedGoal === 'other') {
            processedGoals = [customGoal.trim() || 'Mục tiêu khác'];
        } else {
            const option = GOAL_OPTIONS.find(opt => opt.id === selectedGoal);
            processedGoals = option ? [option.label] : [selectedGoal];
        }
    }
    
    // Simulate API call delay
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-background-light p-6 text-center">
              <div className="relative size-32 mb-8">
                  <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary animate-pulse">
                        psychology
                    </span>
                  </div>
              </div>
              <h2 className="text-2xl font-bold text-[#111813] mb-2">AI đang phân tích...</h2>
              <p className="text-gray-500">Đang tối ưu hóa ngân sách và kế hoạch bữa ăn cho gia đình bạn.</p>
          </div>
      )
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light text-[#111813]">
      {/* Header */}
      <div className="flex items-center p-4 sticky top-0 bg-background-light z-10">
        <button className="p-2 rounded-full hover:bg-gray-100">
           <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <div className="flex-1 flex justify-center gap-2">
            <div className="h-1.5 w-12 rounded-full bg-primary"></div>
            <div className="h-1.5 w-12 rounded-full bg-primary/30"></div>
            <div className="h-1.5 w-12 rounded-full bg-primary/30"></div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 px-6 pb-24 pt-4">
        <h1 className="text-3xl font-bold mb-2">Chào mừng đến với FamPlan!</h1>
        <p className="text-gray-500 mb-8">Hãy thiết lập hồ sơ gia đình của bạn để bắt đầu.</p>

        {/* Family Size */}
        <section className="mb-8">
            <h3 className="text-xl font-bold mb-4">Gia đình bạn có bao nhiêu người?</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-medium">Người lớn</span>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setAdults(Math.max(1, adults - 1))} className="size-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                            <span className="material-symbols-outlined text-lg">remove</span>
                        </button>
                        <span className="text-xl font-bold w-6 text-center">{adults}</span>
                        <button onClick={() => setAdults(adults + 1)} className="size-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark">
                            <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-medium">Trẻ em</span>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setKids(Math.max(0, kids - 1))} className="size-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                            <span className="material-symbols-outlined text-lg">remove</span>
                        </button>
                        <span className="text-xl font-bold w-6 text-center">{kids}</span>
                        <button onClick={() => setKids(kids + 1)} className="size-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark">
                            <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Income - REFACTORED */}
        <section className="mb-8">
            <h3 className="text-xl font-bold mb-4">Tổng thu nhập hàng tháng?</h3>
            <div className="relative">
                <input 
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    // DISPLAY LOGIC: Only use .toLocaleString() here to visually format the raw Number state
                    value={income === '' ? '' : income.toLocaleString('en-US')}
                    onChange={handleIncomeChange}
                    className="w-full h-16 pl-4 pr-12 rounded-xl border border-gray-200 bg-white text-xl font-bold focus:border-primary focus:ring-primary outline-none placeholder:text-gray-300"
                    placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₫</span>
            </div>
            <p className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span className="material-symbols-outlined text-sm">lock</span>
                Dữ liệu tài chính của bạn được mã hóa và bảo mật.
            </p>
        </section>

        {/* Goals */}
        <section>
            <h3 className="text-xl font-bold mb-2">Mục tiêu tài chính chính?</h3>
            <p className="text-sm text-gray-500 mb-4">Chọn 1 mục tiêu</p>
            <div className="grid grid-cols-2 gap-3">
                {GOAL_OPTIONS.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => toggleGoal(item.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                            selectedGoal === item.id
                            ? 'border-primary bg-primary/10' 
                            : 'border-transparent bg-white shadow-sm'
                        }`}
                    >
                        <div className={`size-10 rounded-full flex items-center justify-center mb-2 ${
                             selectedGoal === item.id ? 'bg-white' : 'bg-background-light'
                        }`}>
                            <span className={`material-symbols-outlined ${
                                 selectedGoal === item.id ? 'text-primary' : 'text-gray-700'
                            }`}>{item.icon}</span>
                        </div>
                        <span className="text-sm font-bold text-center">{item.label}</span>
                    </button>
                ))}
            </div>
            
            {/* Custom Goal Input */}
            {selectedGoal === 'other' && (
                <div className="mt-4 animate-fade-in">
                    <label className="text-sm font-bold text-[#111813] mb-2 block">Nhập mục tiêu khác</label>
                    <input 
                        type="text"
                        value={customGoal}
                        onChange={(e) => setCustomGoal(e.target.value)}
                        placeholder="Ví dụ: Mua xe hơi mới..."
                        className="w-full h-14 pl-4 rounded-xl border border-gray-200 bg-white text-base focus:border-primary focus:ring-primary outline-none"
                    />
                </div>
            )}
        </section>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 w-full p-4 bg-background-light/90 backdrop-blur border-t border-gray-200">
          <button 
            onClick={handleFinish}
            disabled={income === '' || income === 0 || !selectedGoal}
            className={`w-full h-14 rounded-xl text-lg font-bold shadow-lg transition-all transform active:scale-[0.98] ${
                income === '' || income === 0 || !selectedGoal
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                : 'bg-primary text-[#111813] shadow-primary/25 hover:bg-primary-dark hover:text-white'
            }`}
          >
              Tiếp tục
          </button>
      </div>
    </div>
  );
};

export default Onboarding;
