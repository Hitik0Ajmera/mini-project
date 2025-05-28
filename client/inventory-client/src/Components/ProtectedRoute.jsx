import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the children (protected content)
  return children;
};

export default ProtectedRoute;