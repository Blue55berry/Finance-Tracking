import React, { useState, useEffect } from 'react';
import { Budget } from '../types/Budget';
import { Category } from '../types/Transaction';
import { useAppContext } from '../context/AppContext';

const categories: Category[] = [
  { id: '2', name: 'Groceries' },
  { id: '3', name: 'Bills' },
  { id: '4', name: 'Entertainment' },
  { id: '5', name: 'Other' },
];

export const BudgetForm: React.FC = () => {
  const { budgets, saveBudgets } = useAppContext();
  const [localBudgets, setLocalBudgets] = useState<Budget[]>(budgets);

  useEffect(() => {
    setLocalBudgets(budgets);
  }, [budgets]);

  const handleBudgetChange = (categoryId: string, amount: string) => {
    const newBudgets = [...localBudgets];
    let budget = newBudgets.find(b => b.category.id === categoryId);
    if (budget) {
      budget.amount = parseFloat(amount) || 0;
    } else {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        budget = { id: Date.now().toString(), userId: '', category, amount: parseFloat(amount) || 0, spent: 0 };
        newBudgets.push(budget);
      }
    }
    setLocalBudgets(newBudgets);
  };

  const handleSaveBudgets = () => {
    saveBudgets(localBudgets);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(category => (
          <div key={category.id}>
            <label htmlFor={category.id} className="block text-sm font-medium text-gray-700">{category.name}</label>
            <input
              type="number"
              id={category.id}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={localBudgets.find(b => b.category.id === category.id)?.amount || ''}
              onChange={(e) => handleBudgetChange(category.id, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleSaveBudgets}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Budgets
      </button>
    </div>
  );
};

const LinearProgressWithLabel = (props: any) => {
  const { value, color } = props;
  let bgColorClass = 'bg-gray-200';
  let progressColorClass = 'bg-blue-500';

  if (color === 'error') progressColorClass = 'bg-red-500';
  else if (color === 'warning') progressColorClass = 'bg-yellow-500';
  else if (color === 'success') progressColorClass = 'bg-green-500';

  return (
    <div className="flex items-center">
      <div className="w-full mr-2">
        <div className={`${bgColorClass} h-2 rounded-full overflow-hidden`}>
          <div
            className={`${progressColorClass} h-full rounded-full`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
      <div className="min-w-[35px]">
        <span className="text-sm text-gray-600">{`${Math.round(value)}%`}</span>
      </div>
    </div>
  );
};

export const BudgetProgress: React.FC<{ budgets: Budget[], transactions: any[] }> = ({ budgets, transactions }) => {
  const calculateSpent = (categoryId: string) => {
    return transactions
      .filter(t => t.type === 'expense' && t.category.id === categoryId)
      .reduce((acc, t) => acc + t.amount, 0);
  };

  const getProgressColor = (progress: number) => {
    if (progress > 80) return 'error';
    if (progress > 50) return 'warning';
    return 'success';
  }

  return (
    <div className="space-y-4">
      {budgets.map(budget => {
        const spent = calculateSpent(budget.category.id);
        const progress = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
        const remaining = budget.amount - spent;
        return (
          <div key={budget.id} className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">{budget.category.name}</h3>
            <LinearProgressWithLabel value={progress} color={getProgressColor(progress)} />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>${spent.toFixed(2)} / ${budget.amount.toFixed(2)}</span>
              <span>${remaining.toFixed(2)} remaining</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};