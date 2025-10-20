import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode"; 
import "./index.css"


const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === 1;
    } catch (err) {
      console.error("Token decode error:", err);
      isAdmin = false;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">Admin Panel</div>
      <ul className="navbar-links">
        {isAdmin && (
          <>
            <li>
              <Link to="/payment">Payment</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/history">Payment History</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
