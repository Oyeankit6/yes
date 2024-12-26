"use client";
import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "@/app/Context/AccountContext";
import axios from "axios";
import { FaWallet } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Updated import for the App Router
import "./TransactionPage.css";

const TransactionPage = () => {
  const router = useRouter(); // Using useRouter from next/navigation
  const { loggedinUser } = useContext(StoreContext); // Context for logged-in user
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch transactions for the logged-in user
        const response = await axios.get(`/api/transactions`, {
          headers: {
            Authorization: `Bearer ${loggedinUser?.token}`, // Pass token for authentication
          },
        });

        setTransactions(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    if (loggedinUser) {
      fetchTransactions();
    }
  }, [loggedinUser]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const getStatusLabel = (status) => {
    switch (status) {
      case "Approved":
        return "Success";
      case "Rejected":
        return "Failed";
      case "Pending":
        return "Wait";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="transaction-container">
      <header className="transaction-header">
        <button className="back-button" onClick={() => router.back()}>
          ←
        </button>
        <h4>Recharge Record</h4>
      </header>

      <div className="transaction-list">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction._id} className="transaction-item">
              <div className="transaction-icon">
                <FaWallet
                  className={`transaction-wallet-icon ${getStatusLabel(
                    transaction.status
                  ).toLowerCase()}`}
                />
              </div>
              <div className="transaction-details">
                <div className="transaction-amount-status">
                  <span className="transaction-amount">
                    ₹{transaction.amount}
                  </span>
                  <span
                    className={`transaction-status ${getStatusLabel(
                      transaction.status
                    ).toLowerCase()}`}
                  >
                    {getStatusLabel(transaction.status)}
                  </span>
                </div>
                <div className="transaction-meta">
                  <p className="transaction-time">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
