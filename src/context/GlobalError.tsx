import React, { useEffect, useState } from 'react';
import { useAppContext } from './AppContext';

const GlobalError: React.FC = () => {
  const { error, clearError } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        clearError();
      }, 6000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [error, clearError]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm">
      <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
        <span>{error}</span>
        <button onClick={clearError} className="ml-4 text-white font-bold">&times;</button>
      </div>
    </div>
  );
};

export default GlobalError;