import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import UserProfile from "./Components/UserProfile/UserProfile";
import ProductListing from "./Components/ProductListing/ProductListing";
import Header from "./Components/Header/Header";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";


function App() {
  const location = useLocation();

  // Define routes where the Header should not appear
  const hideHeaderRoutes = ["/", "/login"];

  return (
    <>
      {/* Conditionally render the Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductListing />
            </ProtectedRoute>
          }
        />
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
