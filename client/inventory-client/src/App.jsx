import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// import Signup from "./Components/Authentication/Signup";
// import UserProfile from "./components/UserProfile/UserProfile";
import ProductListing from "./Components/ProductListing/ProductListing";
import Header from "./Components/Header/Header";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import Register from "./components/Authentication/Register";
// import Login from "./components/Authentication/Login";
import UserProfile from "./components/UserProfile/UserProfile";
import Login from "./Components/Authentication/Login";


function App() {
  const location = useLocation();

  // Define routes where the Header should not appear
  const hideHeaderRoutes = ["/", "/login"];

  return (
    <>
      {/* Conditionally render the Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Register />} />
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
