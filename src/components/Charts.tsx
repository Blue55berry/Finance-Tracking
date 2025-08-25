import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Brush } from 'recharts';
import { Transaction } from '../types/Transaction';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md">
        <p className="text-sm font-medium text-gray-900">{`${label} : $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

export const CategoryPieChart: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category.name);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category.name, value: t.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={expenseData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {expenseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const IncomeExpenseLineChart: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const data = transactions.reduce((acc, t) => {
    const date = new Date(t.date).toLocaleDateString();
    let entry = acc.find(e => e.date === date);
    if (!entry) {
      entry = { date, income: 0, expense: 0 };
      acc.push(entry);
    }
    if (t.type === 'income') {
      entry.income += t.amount;
    } else {
      entry.expense += t.amount;
    }
    return acc;
  }, [] as { date: string; income: number; expense: number }[]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#82ca9d" />
        <Line type="monotone" dataKey="expense" stroke="#8884d8" />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
