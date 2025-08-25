import React, { useState } from 'react';
import { Goal } from '../types/Budget';
import { useAppContext } from '../context/AppContext';

export const GoalForm: React.FC = () => {
  const { addGoal } = useAppContext();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addGoal({ name, targetAmount: parseFloat(targetAmount), currentAmount: 0 });
    setName('');
    setTargetAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="goal-name" className="block text-sm font-medium text-gray-700">Goal Name</label>
        <input
          type="text"
          name="goal-name"
          id="goal-name"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="target-amount" className="block text-sm font-medium text-gray-700">Target Amount</label>
        <input
          type="number"
          name="target-amount"
          id="target-amount"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Goal
      </button>
    </form>
  );
};

const LinearProgressWithLabel = (props: any) => {
  const { value } = props;
  return (
    <div className="flex items-center">
      <div className="w-full mr-2">
        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full"
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

export const GoalProgress: React.FC<{ goals: Goal[] }> = ({ goals }) => {
  return (
    <div className="space-y-4">
      {goals.map(goal => {
        const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
        const remaining = goal.targetAmount - goal.currentAmount;
        return (
          <div key={goal.id} className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">{goal.name}</h3>
            <LinearProgressWithLabel value={progress} />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}</span>
              <span>${remaining.toFixed(2)} remaining</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};