import { Category } from './Transaction';

export interface Budget {
  id: string;
  userId: string;
  category: Category;
  amount: number;
  spent: number;
}

export interface Goal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}
