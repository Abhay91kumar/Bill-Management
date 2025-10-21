import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    amount: "",
    mode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://bill-management-zk4k.onrender.com/api/payment/create",
        formData,
         {headers: { Authorization: token}, withCredentials: true } 
      );
      alert("Payment record saved successfully!");
      setFormData({
  name: "",
  fatherName: "",
  amount: "",
  mode: "",
  phone: "",
});
      
    } catch (err) {
      console.error("Axios error:", err);

      if (!err.response) {
        alert("Cannot connect to backend. Check if server is running or CORS is enabled.");
      } else {
        alert(`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`);
      }
    }

  };

  return (
    <>
      <div className="payment-form-container">
        <h1>नवजागृती समिति, खरटी</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="fatherName"
            placeholder="Purpose"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
          </select>

          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
