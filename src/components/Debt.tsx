import React, { useState } from 'react';
import { Debt } from '../types/Debt';
import { useAppContext } from '../context/AppContext';

export const DebtForm: React.FC = () => {
  const { addDebt } = useAppContext();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addDebt({ name, amount: parseFloat(amount), interestRate: parseFloat(interestRate), dueDate });
    setName('');
    setAmount('');
    setInterestRate('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="debt-name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="debt-name"
          id="debt-name"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="debt-amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          name="debt-amount"
          id="debt-amount"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
        <input
          type="number"
          name="interest-rate"
          id="interest-rate"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="due-date" className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          name="due-date"
          id="due-date"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Debt
      </button>
    </form>
  );
};

export const DebtList: React.FC<{ debts: Debt[] }> = ({ debts }) => {
  const { updateDebtStatus } = useAppContext();

  const handleMarkAsPaid = async (debtId: string) => {
    await updateDebtStatus(debtId, 'paid');
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {debts.map((debt) => (
            <tr key={debt.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{debt.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${debt.amount.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{debt.interestRate}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(debt.dueDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${debt.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {debt.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {debt.status === 'unpaid' && (
                  <button
                    onClick={() => handleMarkAsPaid(debt.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Mark as Paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};