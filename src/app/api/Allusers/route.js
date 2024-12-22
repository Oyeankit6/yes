"use client";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch user data from the API
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true); // Start loading before the request
        const response = await fetch("/api/Allusers", { method: "GET" }); // Replace with your API endpoint

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setUsers(data); // Set the fetched user data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading indicator
      }
    }

    fetchUsers(); // Fetch the data initially

    // Optional: Use a setInterval to refresh data every 5 minutes (300000 ms)
    const interval = setInterval(fetchUsers, 300000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container">
      <header className="header">
        <h1>Admin Dashboard</h1>
        <p>User List with Phone Numbers</p>
      </header>

      <main className="main">
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Id</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.userId}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total">
              <p>
                Total Users: <span>{users.length}</span>
              </p>
            </div>
          </>
        )}
      </main>

      <style jsx>{`
        /* General Styling */
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

        .header h1 {
          font-size: 2rem;
        }

        .header p {
          font-size: 1rem;
        }

        .main {
          margin-top: 2rem;
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }

        .user-table th,
        .user-table td {
          text-align: left;
          padding: 0.75rem;
          border: 1px solid #dbeafe;
        }

        .user-table th {
          background: #1e3a8a;
          color: white;
        }

        .total {
          text-align: right;
          margin-top: 1rem;
          font-weight: bold;
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .user-table th,
          .user-table td {
            font-size: 0.9rem;
            padding: 0.5rem;
          }

          .total {
            text-align: center;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
