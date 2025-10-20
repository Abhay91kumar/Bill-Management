import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./Admin/UserForm";        
import LoginForm from "./Admin/LoginForm";      
import PaymentForm from "./Payments/PaymentForm"; 
import PaymentHistory from "./Payments/PaymentHistory";
import AdminPage from "./Admin/AdminPage"; 
import Navbar from "./Navbar";
import PrivateRoute from "./Admin/PrivateRoute";
import PrivateAdminRoute from "./Admin/PrivateAdminRoute";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/payment"
          element={
            <PrivateAdminRoute>
              <PaymentForm />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <PaymentHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminPage />
            </PrivateAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
