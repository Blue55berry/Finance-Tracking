export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
}
