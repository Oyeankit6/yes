"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RechargeRequests.css";

export default function RechargeRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/api/rechargeRequest?page=${page}&limit=10`
      );
      setRequests(response.data.requests);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      setError("Failed to fetch recharge requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, amount, status) => {
    try {
      const response = await axios.post("/api/rechargeStatus", {
        id,
        amount,
        status,
      });
      if (response.status === 200) {
        alert(`Recharge request ${status.toLowerCase()} successfully!`);
        fetchRequests(currentPage);
      }
    } catch (err) {
      alert("Failed to update recharge status. Please try again.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="recharge-container">
      <h1 className="recharge-title">Recharge Requests</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <table className="recharge-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Amount (₹)</th>
                <th>utrNumber</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{request.userId || "N/A"}</td>
                  <td>{request.userPhone || "N/A"}</td>
                  <td>{request.userEmail || "N/A"}</td>
                  <td>{request.amount}</td>
                  <td>{request.utrNumber}</td>
                  <td>
                    <span
                      className={`status ${
                        request.status === "Approved"
                          ? "status-approved"
                          : request.status === "Rejected"
                          ? "status-rejected"
                          : "status-pending"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.status === "Pending" && (
                      <div className="action-buttons">
                        <button
                          className="btn btn-approve"
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
                          className="btn btn-reject"
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
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`page-btn ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => fetchRequests(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
