"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { StoreContext } from "@/app/Context/AccountContext"; // Assuming you have a context for the logged-in user
import styles from "@/app/styles/BankCardForm.module.css";

const BankCardForm = () => {
  const router = useRouter(); // To handle back navigation
  const { loggedinUser } = useContext(StoreContext); // Access logged-in user's data
  const [isBankCard, setIsBankCard] = useState(true); // State to toggle between Bank Card and UPI form
  const [formData, setFormData] = useState({
    name: "",
    ifsc: "",
    bankName: "",
    accountNumber: "",
    mobileNumber: "",
    email: "",
    upiId: "", // For UPI, we store the UPI ID
  });

  // Toggle between Bank Card and UPI forms
  const toggleForm = () => {
    setIsBankCard(!isBankCard);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const dataToSend = isBankCard
      ? {
          ...formData,
          userId: loggedinUser._id,
          type: "bank", // 'bank' for Bank Card
        }
      : {
          upiId: formData.upiId,
          userId: loggedinUser._id,
          type: "upi", // 'upi' for UPI
        };

    try {
      const response = await axios.post("/api/saveBankOrUPI", dataToSend);
      alert("Form submitted successfully!");
      console.log("Form submitted successfully:", response);
    } catch (error) {
      alert("Failed to submit the form. Please check your details.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => router.back()} // Navigate to the previous page
          title="Go back"
        >
          ← Add Bank Card / UPI
        </button>
      </div>

      {/* Tab Selection */}
      <div className={styles.tabs}>
        <button
          className={isBankCard ? styles.activeTab : styles.tab}
          onClick={toggleForm}
        >
          Select Bank Card
        </button>
        <button
          className={!isBankCard ? styles.activeTab : styles.tab}
          onClick={toggleForm}
        >
          Select UPI
        </button>
      </div>

      {/* Form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        {isBankCard ? (
          <>
            <label>
              Actual Name
              <input
                type="text"
                placeholder="Actual Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              IFSC Code
              <input
                type="text"
                placeholder="IFSC Code"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Bank Name
              <input
                type="text"
                placeholder="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Bank Account
              <input
                type="text"
                placeholder="Bank Account"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Mobile Number
              <input
                type="text"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </>
        ) : (
          <>
            <label>
              UPI ID
              <input
                type="text"
                placeholder="UPI ID"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}

        <button type="submit" className={styles.continueButton}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default BankCardForm;
