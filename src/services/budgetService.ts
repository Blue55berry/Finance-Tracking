import { Budget, Goal } from '../types/Budget';
import { getCurrentUser } from './authService';

const BUDGETS_KEY = 'finance-tracker-budgets';
const GOALS_KEY = 'finance-tracker-goals';

// Budgets
const getBudgets = (): Budget[] => {
  const budgets = localStorage.getItem(BUDGETS_KEY);
  return budgets ? JSON.parse(budgets) : [];
};

const saveBudgets = (budgets: Budget[]) => {
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
};

export const getMyBudgets = (): Promise<Budget[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        return resolve([]);
      }
      const budgets = getBudgets();
      resolve(budgets.filter(b => b.userId === user.id));
    }, 500);
  });
};

export const saveMyBudgets = (budgets: Budget[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        return reject(new Error('User not found'));
      }
      const allBudgets = getBudgets();
      const otherUserBudgets = allBudgets.filter(b => b.userId !== user.id);
      const newBudgets = [...otherUserBudgets, ...budgets];
      saveBudgets(newBudgets);
      resolve();
    }, 500);
  });
};

// Goals
const getGoals = (): Goal[] => {
  const goals = localStorage.getItem(GOALS_KEY);
  return goals ? JSON.parse(goals) : [];
};

const saveGoals = (goals: Goal[]) => {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};

export const getMyGoals = (): Promise<Goal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        return resolve([]);
      }
      const goals = getGoals();
      resolve(goals.filter(g => g.userId === user.id));
    }, 500);
  });
};

export const addGoal = (goal: Omit<Goal, 'id' | 'userId'>): Promise<Goal> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        return reject(new Error('User not found'));
      }
      const goals = getGoals();
      const newGoal = { ...goal, id: Date.now().toString(), userId: user.id };
      goals.push(newGoal);
      saveGoals(goals);
      resolve(newGoal);
    }, 500);
  });
};
