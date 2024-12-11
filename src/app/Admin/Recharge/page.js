"use client";
import React, { useState, useEffect } from "react";

export default function RechargeRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recharge requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/rechargeRequest"); // Endpoint to get all recharge requests
        if (!response.ok) throw new Error("Failed to fetch requests");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        setError("Error fetching recharge requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle status update (approve or reject)
  const handleAction = async (id, amount, action) => {
    try {
      // Send request to the API
      const response = await fetch("/api/rechargeStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          amount,
          status: action, // Approved or Rejected
        }),
      });

      // Parse the response
      const result = await response.json();

      if (response.ok) {
        // Update the UI based on the action
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.userId === id
              ? { ...req, status: action, balance: result.updatedUser?.balance }
              : req
          )
        );

        // Show success message
        alert(result.message || `Recharge request ${action} successfully.`);
      } else {
        // Handle errors returned from the server
        alert(result.message || "Error updating recharge status.");
      }
    } catch (error) {
      // Catch and display network or unexpected errors
      alert("An error occurred while updating the recharge status.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <header className="header">
        <h1>Recharge Requests</h1>
        <p>Manage recharge requests submitted by users</p>
      </header>

      <main className="main">
        <table className="requests-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.userId}>
                <td>{index + 1}</td>
                <td>{request.userId}</td>
                <td>{request.userPhone}</td>
                <td>{request.userEmail}</td>
                <td>{request.amount}</td>
                <td className={`status ${request.status.toLowerCase()}`}>
                  {request.status}
                </td>
                <td>
                  {request.status === "Pending" && (
                    <div className="actions">
                      <button
                        className="btn approve"
                        onClick={() =>
                          handleAction(
                            request.userId,
                            request.amount,
                            "Approved"
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn reject"
                        onClick={() =>
                          handleAction(
                            request.userId,
                            request.amount,
                            "Rejected"
                          )
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <style jsx>{`
        /* Styling */
        body {
          font-family: "Arial", sans-serif;
          background-color: #f4faff;
          color: #333;
        }

        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1rem;
        }

        .header {
          text-align: center;
          background-color: #1e3a8a;
          color: white;
          padding: 1rem;
          border-radius: 8px;
        }

        .main {
          margin-top: 2rem;
        }

        .requests-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }

        .requests-table th,
        .requests-table td {
          text-align: left;
          padding: 0.75rem;
          border: 1px solid #dbeafe;
        }

        .requests-table th {
          background: #1e3a8a;
          color: white;
        }

        .status {
          font-weight: bold;
          text-transform: capitalize;
        }

        .status.pending {
          color: #f59e0b; /* Yellow */
        }

        .status.approved {
          color: #10b981; /* Green */
        }

        .status.rejected {
          color: #ef4444; /* Red */
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn {
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn.approve {
          background-color: #10b981; /* Green */
          color: white;
        }

        .btn.approve:hover {
          background-color: #059669; /* Darker Green */
        }

        .btn.reject {
          background-color: #ef4444; /* Red */
          color: white;
        }

        .btn.reject:hover {
          background-color: #dc2626; /* Darker Red */
        }

        @media (max-width: 768px) {
          .requests-table th,
          .requests-table td {
            font-size: 0.9rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
