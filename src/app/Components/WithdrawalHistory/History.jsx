"use client"; // Ensure it's only client-side

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WithdrawalHistory.module.css"; // You can create your own styles

const WithdrawalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Withdrawal History from the API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/getWithdrawalHistory`); // Replace with actual API
        setHistory(response.data);
      } catch (error) {
        setError("Failed to fetch withdrawal history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span
          className={styles.backArrow}
          onClick={() => window.history.back()}
        >
          &larr; Back
        </span>
        <h2 className={styles.title}>Withdrawal History</h2>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((transaction) => (
                <tr key={transaction.id}>
                  <td>₹{transaction.amount}</td>
                  <td>{transaction.method}</td>
                  <td
                    className={
                      transaction.status === "Success"
                        ? styles.success
                        : styles.failed
                    }
                  >
                    {transaction.status}
                  </td>
                  <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>
                  No withdrawal history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalHistory;
