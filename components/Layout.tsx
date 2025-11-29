
import React from 'react';
import { Screen } from '../types';

interface LayoutProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentScreen, onNavigate, children }) => {
  const navItems = [
    { id: Screen.DASHBOARD, icon: 'dashboard', label: 'Bảng tin' },
    { id: Screen.BUDGET, icon: 'account_balance_wallet', label: 'Ngân sách' },
    { id: Screen.MEALS, icon: 'restaurant_menu', label: 'Bữa ăn' },
    { id: Screen.REPORTS, icon: 'bar_chart', label: 'Báo cáo' },
  ];

  return (
    <div className="relative min-h-screen bg-background-light">
      {children}
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface-light/95 backdrop-blur-md border-t border-gray-200 h-20 px-6 flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              currentScreen === item.id ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span 
                className={`material-symbols-outlined text-2xl ${currentScreen === item.id ? 'font-variation-fill' : ''}`}
                style={{ fontVariationSettings: currentScreen === item.id ? "'FILL' 1" : "'FILL' 0" }}
            >
                {item.icon}
            </span>
            <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
