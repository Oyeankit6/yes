"use client";
import { useState } from "react";

export default function ComplaintPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaint: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic, such as sending the data to an API
    try {
      const response = await fetch("/api/submit-complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", complaint: "" });
      } else {
        alert("Failed to submit complaint. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>Complaint Page</h1>
      {submitted ? (
        <div style={{ textAlign: "center", color: "green" }}>
          <h2>Thank you for your feedback!</h2>
          <p>We will review your complaint and get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="complaint"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Complaint:
            </label>
            <textarea
              id="complaint"
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              required
              rows="5"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Submit Complaint
          </button>
        </form>
      )}
    </div>
  );
}
