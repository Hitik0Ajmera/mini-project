import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to store user data

    const login = (userData) => {
        setUser(userData); // Set user data on login
    };

    const logout = () => {
        setUser(null); // Clear user data on logout
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};