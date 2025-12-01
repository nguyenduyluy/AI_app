
export enum Screen {
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  BUDGET = 'BUDGET',
  MEALS = 'MEALS',
  REPORTS = 'REPORTS'
}

export interface UserProfile {
  name: string;
  email: string;
  familyMembers: {
    adults: number;
    kids: number;
  };
  monthlyIncome: number;
  financialGoals: string[];
}

export interface CategoryItem {
  id: string; // Added ID for linking
  name: string;
  spent: number;
  limit: number;
  icon: string;
}

export interface BudgetData {
  totalBudget: number;
  spent: number;
  remaining: number;
  dailyLimit: number; // Renamed from dailyFoodBudget to reflect total daily spending
  weeklyLimit: number;
  monthlyLimit: number;
  categoryBreakdown: CategoryItem[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner';
  cost: number;
  image: string;
  calories?: number;
}

export interface Ingredient {
  name: string;
  qty: number;
  unit: string;
  price: number;
  category: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  type: string;
  time?: string;
  calories?: number;
  desc?: string;
  ingredients: Ingredient[];
  instructions: string[]; // New: Detailed cooking steps
  mainIngredient?: string; // New: For protein rotation logic (e.g., 'pork', 'chicken', 'fish')
  imageKeyword?: string;   // New: For AI image generation simulation
}

export interface PlannedMeal {
  instanceId: string;
  recipeId: string;
  status: 'pending' | 'completed';
  isShopped?: boolean;
}

export interface Transaction {
  id: string;
  merchant: string;
  categoryId: string; // Link to CategoryItem.id
  categoryName: string;
  amount: number;
  date: Date;
  icon: string;
  color?: string;
}
