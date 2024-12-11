"use client";
import { useEffect, useState } from "react";

const RechargeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false); // Flag for ongoing updates

  // Function to fetch recharge requests
  const fetchRequests = async () => {
    try {
      setLoading(true); // Set loading state
      const response = await fetch("/api/rechargeRequest"); // Endpoint to get all recharge requests
      if (!response.ok) throw new Error("Failed to fetch requests");
      const data = await response.json();
      setRequests(data); // Update the requests state
    } catch (error) {
      setError("Error fetching recharge requests"); // Set error state
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch recharge requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle status update (approve or reject)
  const handleAction = async (id, amount, action) => {
    try {
      setUpdating(true); // Set updating state
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
        alert(result.message || `Recharge request ${action} successfully.`);
        // Re-fetch the latest requests to ensure data is up-to-date
        await fetchRequests();
      } else {
        alert(result.message || "Error updating recharge status.");
      }
    } catch (error) {
      alert("An error occurred while updating the recharge status.");
    } finally {
      setUpdating(false); // Reset updating state
    }
  };

  // Render loading or error state
  if (loading) return <p>Loading recharge requests...</p>;
  if (error) return <p>{error}</p>;

  // Render requests list
  return (
    <div>
      <h1>Recharge Requests</h1>
      <ul>
        {requests.map((req) => (
          <li key={req.userId}>
            <p>User ID: {req.userId}</p>
            <p>Amount: {req.amount}</p>
            <p>Status: {req.status}</p>
            <p>Balance: {req.balance}</p>
            <button
              disabled={updating} // Disable buttons during updates
              onClick={() => handleAction(req.userId, req.amount, "Approved")}
            >
              Approve
            </button>
            <button
              disabled={updating} // Disable buttons during updates
              onClick={() => handleAction(req.userId, req.amount, "Rejected")}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RechargeRequests;
