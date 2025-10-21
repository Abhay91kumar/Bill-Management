import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "./PaymentHistory.css";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://bill-management-zk4k.onrender.com/api/payment",
        { headers: { Authorization: token},withCredentials: true });
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
      toast.error("Failed to fetch payment history.");
    }
  };

  // Helper to format date nicely
  const formatDate = (dateString) => {
    const options = { 
      year: "numeric", 
      month: "short", 
      day: "numeric", 
      hour: "2-digit", 
      minute: "2-digit" 
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="payment-history-container">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="payment-history-title">Payment History</h1>

      <div className="payment-history-nav">
        <Link to="/payment" className="payment-history-link">
          ← Back to Payment Form
        </Link>
      </div>

      {payments.length > 0 ? (
        <div className="table-wrapper">
          <table className="payment-history-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Purpose</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Phone</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.fatherName}</td>
                  <td>{p.amount}</td>
                  <td>{p.mode}</td>
                  <td>{p.phone}</td>
                  <td>{formatDate(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-records">No payment records found.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
