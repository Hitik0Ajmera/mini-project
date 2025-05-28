import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');


  return (
    <AuthContext.Provider value={{ }}>
      {children}
    </AuthContext.Provider>
  );
};