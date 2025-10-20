import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdminDetails();
    }, []);

    const fetchAdminDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("https://bill-management-zk4k.onrender.com/user/admin", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAdmin(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch admin details.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!admin) return <p>Loading admin details...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <Toaster position="top-right" />
            <h1>Admin Details</h1>
            <div style={cardStyle}>
                <p><strong>Name:</strong> {admin.name}</p>
                <p><strong>Email:</strong> {admin.email}</p>
                <p><strong>Role:</strong> {admin.role === 1 ? "Admin" : "User"}</p>
            </div>

            <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
            </button>
        </div>
    );
};

const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "400px",
    marginTop: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const logoutButtonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "red",
    color: "#fff",
    cursor: "pointer",
};

export default AdminPage;
