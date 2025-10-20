import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://bill-management-zk4k.onrender.com/user/login", formData);

      localStorage.setItem("token", res.data.accesstoken || res.data.token);

      toast.success("✅ Login successful! Redirecting to payment...");

      setTimeout(() => navigate("/payment"), 1500); 
    } catch (err) {
      console.error("Login error:", err);
      if (!err.response) {
        toast.error("Cannot connect to backend. Check server or CORS.");
      } else if (err.response.data?.msg) {
        toast.error(err.response.data.msg);
      } else {
        toast.error("Invalid credentials.");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <Toaster position="top-right" reverseOrder={false} />

      <h1 style={{ marginBottom: "20px" }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <br />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link to="/" style={{ color: "#007BFF", textDecoration: "none" }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  textAlign: "center",
  padding: "30px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9",
};

const inputStyle = {
  width: "90%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "95%",
  padding: "12px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007BFF",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
};

export default LoginForm;
