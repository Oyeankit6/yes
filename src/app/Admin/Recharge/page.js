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
        const response = await fetch("/api/rechargeRequest");
        if (!response.ok) throw new Error("Failed to fetch requests");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching recharge requests:", error);
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

      const result = await response.json();
      if (response.ok) {
        // Update the UI
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.userId === id
              ? { ...req, status: action, balance: result.updatedUser?.balance }
              : req
          )
        );
        alert(result.message || `Recharge request ${action} successfully.`);
      } else {
        alert(result.message || "Error updating recharge status.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred while updating the status.");
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
              <th>User Phone</th>
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
    </div>
  );
}
