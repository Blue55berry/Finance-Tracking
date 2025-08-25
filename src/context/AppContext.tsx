import React, { createContext, useState, useEffect, useContext } from 'react';
import { Transaction } from '../types/Transaction';
import { Budget, Goal } from '../types/Budget';
import { Debt } from '../types/Debt';
import { getMyTransactions, addTransaction } from '../services/transactionService';
import { getMyBudgets, saveMyBudgets } from '../services/budgetService';
import { getMyGoals, addGoal } from '../services/budgetService';
import { getMyDebts, addDebt, updateDebtStatus } from '../services/debtService';

interface AppContextProps {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  debts: Debt[];
  loading: boolean;
  error: string | null;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId'>) => Promise<void>;
  saveBudgets: (budgets: Budget[]) => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id' | 'userId'>) => Promise<void>;
  addDebt: (debt: Omit<Debt, 'id' | 'userId' | 'status'>) => Promise<void>;
  updateDebtStatus: (debtId: string, status: 'paid' | 'unpaid') => Promise<void>;
  fetchData: () => void;
  clearError: () => void;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [myTransactions, myBudgets, myGoals, myDebts] = await Promise.all([
        getMyTransactions(),
        getMyBudgets(),
        getMyGoals(),
        getMyDebts(),
      ]);
      setTransactions(myTransactions);
      setBudgets(myBudgets);
      setGoals(myGoals);
      setDebts(myDebts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    setLoading(true);
    try {
      await addTransaction(transaction);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBudgets = async (budgets: Budget[]) => {
    setLoading(true);
    try {
      await saveMyBudgets(budgets);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (goal: Omit<Goal, 'id' | 'userId'>) => {
    setLoading(true);
    try {
      await addGoal(goal);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDebt = async (debt: Omit<Debt, 'id' | 'userId' | 'status'>) => {
    setLoading(true);
    try {
      await addDebt(debt);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDebtStatus = async (debtId: string, status: 'paid' | 'unpaid') => {
    setLoading(true);
    try {
      await updateDebtStatus(debtId, status);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AppContext.Provider value={{
      transactions,
      budgets,
      goals,
      debts,
      loading,
      error,
      addTransaction: handleAddTransaction,
      saveBudgets: handleSaveBudgets,
      addGoal: handleAddGoal,
      addDebt: handleAddDebt,
      updateDebtStatus: handleUpdateDebtStatus,
      fetchData,
      clearError,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);