import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/authService';
import GlobalLoader from './context/GlobalLoader';
import GlobalError from './context/GlobalError';

function App() {
  const user = getCurrentUser();
  return (
    <>
      <GlobalLoader />
      <GlobalError />
      {user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
    </>
  );
}

export default App;