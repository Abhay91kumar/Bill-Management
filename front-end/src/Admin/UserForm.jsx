import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://bill-management-zk4k.onrender.com/user/register", formData);
      if (res.data.msg) {
        toast.success( res.data.msg)

        setFormData({ name: "", email: "", password: "", role: 0 });
        setTimeout(() => navigate("/login"), 1500);
      }

    } catch (err) {
      console.error("Axios error:", err);

      if (!err.response) {
        toast.error("Cannot connect to backend. Check server or CORS.");
      } else if (err.response.data?.msg) {
        toast.error(err.response.data.msg);
      } else {
        toast.error(`Server error: ${err.response.status}`);
      }
    }
  };

  return (
    <div style={containerStyle}>
      <Toaster position="top-right" reverseOrder={false} />

      <h1 style={{ marginBottom: "20px" }}>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <br />
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
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value={0}>User</option>
          <option value={1}>Admin</option>
        </select>
        <br />
        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#007BFF", textDecoration: "none" }}>
          Login here
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

export default UserForm;
