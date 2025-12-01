
import React, { useState, useEffect } from 'react';
import { Screen, UserProfile, BudgetData, Transaction, PlannedMeal } from './types';
import { calculateInitialBudget } from './services/geminiService';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import BudgetPlan from './components/BudgetPlan';
import MealPlanner from './components/MealPlanner';
import Reports from './components/Reports';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.AUTH);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [budget, setBudget] = useState<BudgetData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [plannedMeals, setPlannedMeals] = useState<Record<string, PlannedMeal[]>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper to get total family members
  const totalPeople = user ? (user.familyMembers.adults + user.familyMembers.kids) : 1;

  // 1. Load Data from LocalStorage on Mount
  useEffect(() => {
    const savedUser = localStorage.getItem('famplan_user');
    const savedBudget = localStorage.getItem('famplan_budget');
    const savedTransactions = localStorage.getItem('famplan_transactions');
    const savedMeals = localStorage.getItem('famplan_meals');

    if (savedUser && savedBudget) {
      setUser(JSON.parse(savedUser));
      setBudget(JSON.parse(savedBudget));
      if (savedTransactions) {
        const parsedTx = JSON.parse(savedTransactions).map((t: any) => ({
            ...t,
            date: new Date(t.date)
        }));
        setTransactions(parsedTx);
      }
      if (savedMeals) {
        try {
            const parsed = JSON.parse(savedMeals);
            const sampleKey = Object.keys(parsed)[0];
            if (sampleKey && parsed[sampleKey].length > 0 && typeof parsed[sampleKey][0] === 'string') {
                setPlannedMeals({});
            } else {
                setPlannedMeals(parsed);
            }
        } catch (e) {
            setPlannedMeals({});
        }
      }
      setCurrentScreen(Screen.DASHBOARD);
    }
    setIsInitialized(true);
  }, []);

  // 2. Save Data to LocalStorage on Change
  useEffect(() => {
    if (isInitialized) {
        if (user) localStorage.setItem('famplan_user', JSON.stringify(user));
        if (budget) localStorage.setItem('famplan_budget', JSON.stringify(budget));
        if (transactions) localStorage.setItem('famplan_transactions', JSON.stringify(transactions));
        if (plannedMeals) localStorage.setItem('famplan_meals', JSON.stringify(plannedMeals));
    }
  }, [user, budget, transactions, plannedMeals, isInitialized]);

  useEffect(() => {
    if (user && !budget && isInitialized) {
      const loadBudget = async () => {
        const data = await calculateInitialBudget(user);
        setBudget(data);
      };
      loadBudget();
    }
  }, [user, budget, isInitialized]);

  const getDaysRemainingInMonth = () => {
    const now = new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const daysLeft = lastDayOfMonth.getDate() - now.getDate();
    return Math.max(1, daysLeft);
  };

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    if (!budget) return;

    const tx: Transaction = {
        ...newTx,
        id: Math.random().toString(36).substr(2, 9),
    };

    setTransactions(prev => [tx, ...prev]);

    setBudget(prevBudget => {
        if (!prevBudget) return null;

        const amount = tx.amount;
        
        const updatedCategories = prevBudget.categoryBreakdown.map(cat => {
            if (cat.id === tx.categoryId) {
                return { ...cat, spent: cat.spent + amount };
            }
            return cat;
        });

        const newTotalSpent = prevBudget.spent + amount;
        const newRemaining = prevBudget.monthlyLimit - newTotalSpent;

        const daysRemaining = getDaysRemainingInMonth();
        const newDailyBudget = Math.max(0, Math.round(newRemaining / daysRemaining));

        return {
            ...prevBudget,
            spent: newTotalSpent,
            remaining: newRemaining,
            dailyLimit: newDailyBudget,
            categoryBreakdown: updatedCategories
        };
    });
  };

  const handleToggleMealStatus = (dateKey: string, instanceId: string) => {
    setPlannedMeals(prev => {
        const mealsForDay = prev[dateKey] || [];
        const updatedMeals = mealsForDay.map(meal => 
            meal.instanceId === instanceId 
                ? { ...meal, status: (meal.status === 'completed' ? 'pending' : 'completed') as 'pending' | 'completed' }
                : meal
        );
        return {
            ...prev,
            [dateKey]: updatedMeals
        };
    });
  };

  const handleMarkAsShopped = (startDate: Date, endDate: Date) => {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      setPlannedMeals(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(key => {
              const [y, m, d] = key.split('-').map(Number);
              const dateObj = new Date(y, m - 1, d);
              if (dateObj >= start && dateObj <= end) {
                  updated[key] = updated[key].map(meal => ({ ...meal, isShopped: true }));
              }
          });
          return updated;
      });
  };

  const handleLogin = () => {
    setCurrentScreen(Screen.ONBOARDING);
  };

  const handleOnboardingComplete = (data: UserProfile) => {
    setUser(data);
    setCurrentScreen(Screen.DASHBOARD);
  };

  const handleReset = () => {
      if (window.confirm("Bạn có chắc muốn đăng xuất và xóa dữ liệu trên thiết bị này không?")) {
        localStorage.clear();
        setUser(null);
        setBudget(null);
        setTransactions([]);
        setPlannedMeals({});
        setCurrentScreen(Screen.AUTH);
      }
  };

  if (!isInitialized) return null;

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.AUTH:
        return <Auth onLogin={handleLogin} />;
      case Screen.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case Screen.DASHBOARD:
        return (
          <Layout currentScreen={Screen.DASHBOARD} onNavigate={setCurrentScreen}>
             {user && budget ? (
                <Dashboard 
                    user={user} 
                    budget={budget} 
                    transactions={transactions}
                    plannedMeals={plannedMeals}
                    onAddTransaction={addTransaction}
                    onNavigate={setCurrentScreen}
                    onReset={handleReset}
                    onToggleMealStatus={handleToggleMealStatus}
                    totalPeople={totalPeople}
                />
             ) : <div>Loading...</div>}
          </Layout>
        );
      case Screen.BUDGET:
        return (
          <Layout currentScreen={Screen.BUDGET} onNavigate={setCurrentScreen}>
             {budget ? <BudgetPlan budget={budget} onBack={() => setCurrentScreen(Screen.DASHBOARD)} /> : <div>Loading...</div>}
          </Layout>
        );
      case Screen.MEALS:
        return (
            <Layout currentScreen={Screen.MEALS} onNavigate={setCurrentScreen}>
                <MealPlanner 
                    onAddTransaction={addTransaction}
                    plannedMeals={plannedMeals}
                    onUpdatePlannedMeals={setPlannedMeals}
                    dailyLimit={budget ? budget.dailyLimit : 0}
                    onMarkAsShopped={handleMarkAsShopped}
                    totalPeople={totalPeople}
                />
            </Layout>
        );
      case Screen.REPORTS:
        return (
            <Layout currentScreen={Screen.REPORTS} onNavigate={setCurrentScreen}>
                {budget ? (
                    <Reports transactions={transactions} budget={budget} />
                ) : <div>Loading...</div>}
            </Layout>
        );
      default:
        return (
            <Layout currentScreen={Screen.DASHBOARD} onNavigate={setCurrentScreen}>
                 {user && budget ? (
                    <Dashboard 
                        user={user} 
                        budget={budget} 
                        transactions={transactions}
                        plannedMeals={plannedMeals}
                        onAddTransaction={addTransaction}
                        onNavigate={setCurrentScreen}
                        onReset={handleReset}
                        onToggleMealStatus={handleToggleMealStatus}
                        totalPeople={totalPeople}
                    />
                 ) : <div>Loading...</div>}
            </Layout>
        );
    }
  };

  return (
    <>
      {renderScreen()}
    </>
  );
};

export default App;
