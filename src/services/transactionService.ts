import { Transaction } from '../types/Transaction';
import { getCurrentUser } from './authService';

const TRANSACTIONS_KEY = 'finance-tracker-transactions';

const getTransactions = (): Transaction[] => {
  const transactions = localStorage.getItem(TRANSACTIONS_KEY);
  return transactions ? JSON.parse(transactions) : [];
};

const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const getMyTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        return resolve([]);
      }
      const transactions = getTransactions();
      resolve(transactions.filter(t => t.userId === user.id));
    }, 500);
  });
};

export const addTransaction = (transaction: Omit<Transaction, 'id' | 'userId'>): Promise<Transaction> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        return reject(new Error('User not found'));
      }
      const transactions = getTransactions();
      const newTransaction = { ...transaction, id: Date.now().toString(), userId: user.id };
      transactions.push(newTransaction);
      saveTransactions(transactions);
      resolve(newTransaction);
    }, 500);
  });
};
