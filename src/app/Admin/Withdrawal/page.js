"use client";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Withdrawal.module.css"; // Import CSS for styling

export default function Withdrawal() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [isCopied, setIsCopied] = useState(false); // State to manage copy status

  // Fetch withdrawal requests from the backend
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await fetch("/api/AdminWithdrawal");
        const data = await res.json();
        // Sort withdrawals so that Pending requests come first
        data.sort((a, b) => (a.status === "Pending" ? -1 : 1));
        setWithdrawals(data);
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
      }
    };

    fetchWithdrawals();
  }, []);

  // Function to copy UPI ID to clipboard
  const copyToClipboard = (upiId) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(upiId)
        .then(() => {
          setIsCopied(true); // Set copy status to true
          setTimeout(() => setIsCopied(false), 2000); // Reset the copy status after 2 seconds
        })
        .catch((error) => {
          console.error("Failed to copy:", error); // Handle errors
        });
    } else {
      alert("Clipboard not supported in this environment.");
    }
  };

  // Function to update withdrawal request status
  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch("/api/AdminWithdrawal", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const updatedRequest = await res.json();
      setWithdrawals((prev) =>
        prev.map((request) =>
          request._id === updatedRequest._id ? updatedRequest : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Manage Withdrawal Requests - Betting App</title>
        <meta
          name="description"
          content="Manage all withdrawal requests in one place."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <h1>BettingApp Admin</h1>
          </div>
          <nav className={styles.nav}>
            <Link href="/Admin">Dashboard</Link>
            <Link href="/Admin/Recharge">Recharge Requests</Link>
            <Link href="/Admin/Withdrawal" className={styles.active}>
              Withdrawal Requests
            </Link>
          </nav>
        </header>

        <main className={styles.main}>
          <h2 className={styles.pageTitle}>Withdrawal Requests</h2>

          {/* Table for Withdrawal Requests */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Email</th>
                  <th>Date Requested</th>
                  <th>UPI ID</th> {/* Added UPI ID column */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((request) => (
                  <tr key={request._id}>
                    <td>{request.userId.userId}</td>
                    <td>{request.amount}</td>
                    <td>
                      <span
                        className={
                          request.status === "Pending"
                            ? styles.statusPending
                            : styles.statusApproved
                        }
                      >
                        {request.status}
                      </span>
                    </td>
                    <td>{request.userId.email}</td>
                    <td>
                      {new Date(request.createdAt).toLocaleDateString()}
                      <br />
                      {new Date(request.createdAt).toLocaleTimeString()}
                    </td>
                    <td>
                      <span className={styles.upiId}>
                        {request.paymentDetails[0]}
                      </span>
                      <button
                        className={styles.copyBtn}
                        onClick={() =>
                          copyToClipboard(request.paymentDetails[0])
                        }
                      >
                        {isCopied ? "Copied!" : "Copy"}
                      </button>
                    </td>
                    <td>
                      {/* Conditional rendering of action buttons */}
                      {request.status === "Pending" && (
                        <>
                          <button
                            className={styles.approveBtn}
                            onClick={() =>
                              handleStatusChange(request._id, "Approved")
                            }
                          >
                            Approve
                          </button>
                          <button
                            className={styles.denyBtn}
                            onClick={() =>
                              handleStatusChange(request._id, "Denied")
                            }
                          >
                            Deny
                          </button>
                        </>
                      )}
                      {/* If the request is already approved or denied, no buttons will be shown */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <Link href="/Admin" className={styles.backBtn}>
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
