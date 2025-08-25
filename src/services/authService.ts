import { User } from '../types/User';

const USERS_KEY = 'finance-tracker-users';

const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const register = (user: Omit<User, 'id'>): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      if (users.find(u => u.email === user.email)) {
        return reject(new Error('User with this email already exists'));
      }
      const newUser = { ...user, id: Date.now().toString() };
      users.push(newUser);
      saveUsers(users);
      resolve(newUser);
    }, 500);
  });
};

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('finance-tracker-user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

export const logout = () => {
  localStorage.removeItem('finance-tracker-user');
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('finance-tracker-user');
  return user ? JSON.parse(user) : null;
};
