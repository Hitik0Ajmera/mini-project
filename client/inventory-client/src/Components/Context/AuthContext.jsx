import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const[isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};