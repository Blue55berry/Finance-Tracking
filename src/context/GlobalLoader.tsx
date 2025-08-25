import React from 'react';
import { useAppContext } from './AppContext';

const GlobalLoader: React.FC = () => {
  const { loading } = useAppContext();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default GlobalLoader;