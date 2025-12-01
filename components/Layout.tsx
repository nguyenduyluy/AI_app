import React from 'react';
import { Screen } from '../types';

interface LayoutProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentScreen, onNavigate, children }) => {
  const navItems = [
    { id: Screen.DASHBOARD, icon: 'grid_view', label: 'Trang chủ' },
    { id: Screen.BUDGET, icon: 'account_balance_wallet', label: 'Ngân sách' },
    { id: Screen.MEALS, icon: 'restaurant', label: 'Bữa ăn' },
    { id: Screen.REPORTS, icon: 'bar_chart', label: 'Báo cáo' },
  ];

  return (
    <div className="relative min-h-screen bg-app-bg mx-auto max-w-lg shadow-2xl overflow-hidden">
      {children}
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white h-[80px] px-6 flex justify-between items-center z-50 rounded-t-[30px] shadow-[0_-5px_30px_rgba(0,0,0,0.04)] border-t border-gray-50 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className="flex flex-col items-center gap-1 w-16 group"
            >
              <div className={`transition-all duration-300 ${isActive ? 'text-primary -translate-y-1' : 'text-gray-300 group-hover:text-gray-400'}`}>
                <span 
                    className={`material-symbols-outlined text-[26px] ${isActive ? 'font-variation-fill' : ''}`}
                >
                    {item.icon}
                </span>
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-gray-300'}`}>
                  {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  );
};

export default Layout;