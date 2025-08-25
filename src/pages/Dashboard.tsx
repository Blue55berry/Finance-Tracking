import React from 'react';
import Navbar from '../components/Navbar';
import AddTransactionForm from '../components/AddTransactionForm';
import TransactionList from '../components/TransactionList';
import { BudgetForm, BudgetProgress } from '../components/Budget';
import { GoalForm, GoalProgress } from '../components/Goal';
import { CategoryPieChart, IncomeExpenseLineChart } from '../components/Charts';
import { DebtForm, DebtList } from '../components/Debt';
import { useAppContext } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { 
    transactions, 
    budgets, 
    goals, 
    debts, 
    addTransaction, 
    addGoal, 
    addDebt, 
    fetchData 
  } = useAppContext();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <AddTransactionForm onAddTransaction={addTransaction} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <TransactionList transactions={transactions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Set Budgets</h2>
            <BudgetForm />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Budget Progress</h2>
            <BudgetProgress budgets={budgets} transactions={transactions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create Savings Goal</h2>
            <GoalForm />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Savings Goals</h2>
            <GoalProgress goals={goals} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Expense by Category</h2>
            <CategoryPieChart transactions={transactions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Income vs Expense Trend</h2>
            <IncomeExpenseLineChart transactions={transactions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Debt/Loan</h2>
            <DebtForm onAddDebt={addDebt} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Debts and Loans</h2>
            <DebtList debts={debts} onUpdate={fetchData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
