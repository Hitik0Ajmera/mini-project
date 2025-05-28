import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Signup from './Components/Authentication/Signup';
import Login from './Components/Authentication/Login';
import UserProfile from './Components/UserProfile/UserProfile';
import ProductListing from './Components/ProductListing/ProductListing';
import Header from './Components/Header/Header';

function App() {
  const location = useLocation();

  // Define routes where the Header should not appear
  const hideHeaderRoutes = ['/', '/login'];

  return (
    <>
      {/* Conditionally render the Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/products" element={<ProductListing />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
