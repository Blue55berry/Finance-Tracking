import { Debt } from '../types/Debt';
import { getCurrentUser } from './authService';

const DEBTS_KEY = 'finance-tracker-debts';

const getDebts = (): Debt[] => {
  const debts = localStorage.getItem(DEBTS_KEY);
  return debts ? JSON.parse(debts) : [];
};

const saveDebts = (debts: Debt[]) => {
  localStorage.setItem(DEBTS_KEY, JSON.stringify(debts));
};

export const getMyDebts = (): Promise<Debt[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        return resolve([]);
      }
      const debts = getDebts();
      resolve(debts.filter(d => d.userId === user.id));
    }, 500);
  });
};

export const addDebt = (debt: Omit<Debt, 'id' | 'userId' | 'status'>): Promise<Debt> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        return reject(new Error('User not found'));
      }
      const debts = getDebts();
      const newDebt = { ...debt, id: Date.now().toString(), userId: user.id, status: 'unpaid' as 'unpaid' };
      debts.push(newDebt);
      saveDebts(debts);
      resolve(newDebt);
    }, 500);
  });
};

export const updateDebtStatus = (debtId: string, status: 'paid' | 'unpaid'): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        return reject(new Error('User not found'));
      }
      const debts = getDebts();
      const debtIndex = debts.findIndex(d => d.id === debtId && d.userId === user.id);
      if (debtIndex === -1) {
        return reject(new Error('Debt not found'));
      }
      debts[debtIndex].status = status;
      saveDebts(debts);
      resolve();
    }, 500);
  });
};