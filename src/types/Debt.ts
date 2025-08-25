export interface Debt {
  id: string;
  userId: string;
  name: string;
  amount: number;
  interestRate: number;
  dueDate: string;
  status: 'paid' | 'unpaid';
}