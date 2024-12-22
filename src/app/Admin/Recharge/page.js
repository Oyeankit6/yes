"use client";
import React, { useState, useEffect } from "react";
import "./RechargeRequests.css"; // Import the external CSS file

export default function RechargeRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch recharge requests
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/rechargeRequest", { method: "GET" });
      if (!response.ok) throw new Error("Failed to fetch requests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      setError("Error fetching recharge requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, amount, action) => {
    try {
      const response = await fetch("/api/rechargeStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, amount, status: action }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || `Recharge request ${action} successfully.`);
        // Refetch data after successful action
        await fetchRequests();
      } else {
        alert(result.message || "Error updating recharge status.");
      }
    } catch (error) {
      alert("An error occurred while updating the recharge status.");
    }
  };

  // Sort requests so that pending requests appear at the top
  const sortedRequests = requests.sort((a, b) => {
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;
    return 0; // Maintain original order for other statuses
  });

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
              <th>User Number</th>
              <th>Email</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests.map((request, index) => (
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
