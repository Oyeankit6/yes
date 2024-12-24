"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // For navigation
import styles from "./Withdrawal.module.css";
import { StoreContext } from "@/app/Context/AccountContext";
import Link from "next/link";

const Withdrawal = () => {
  const router = useRouter(); // For navigating back
  const { loggedinUser } = useContext(StoreContext);
  const [amount, setAmount] = useState(""); // State for amount
  const [password, setPassword] = useState(""); // State for password
  const [selectedMethod, setSelectedMethod] = useState(""); // Track selected method
  const [methods, setMethods] = useState({ bank: [], upi: [] }); // Store payment methods
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedUPI, setSelectedUPI] = useState([]); // Track selected UPI IDs
  const [selectedBank, setSelectedBank] = useState([]); // Track selected bank cards

  // Fetch payment methods on component mount
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await axios.get("/api/getUserMethods"); // Your API endpoint
        const bankDetails = response.data.bankDetails.filter(
          (item) => item.type === "bank"
        );
        const upiDetails = response.data.bankDetails.filter(
          (item) => item.type === "upi"
        );
        setMethods({
          bank: bankDetails,
          upi: upiDetails,
        });
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchMethods();
  }, []);

  // Handle selection of the payment method
  const handleMethodClick = (method) => {
    setSelectedMethod(method);
  };

  // Handle UPI ID selection
  const handleUPISelect = (upiId) => {
    setSelectedUPI((prevSelected) =>
      prevSelected.includes(upiId)
        ? prevSelected.filter((id) => id !== upiId)
        : [...prevSelected, upiId]
    );
  };

  // Handle Bank Card selection
  const handleBankSelect = (accountNumber) => {
    setSelectedBank((prevSelected) =>
      prevSelected.includes(accountNumber)
        ? prevSelected.filter((num) => num !== accountNumber)
        : [...prevSelected, accountNumber]
    );
  };

  // Handle withdrawal request
  const handleWithdrawal = async () => {
    if (!selectedMethod) {
      alert("Please select a payout method!");
      return;
    }

    if (!amount || !password) {
      alert("Please enter the amount and password!");
      return;
    }

    if (parseFloat(amount) < 230) {
      alert("Withdrawal amount should not be less than ₹230.");
      return;
    }

    // Add ₹30 fee to the withdrawal amount
    const finalAmount = parseFloat(amount) + 30;

    const dataToSend = {
      amount: finalAmount,
      password,
      loggedinUser,
      method: selectedMethod,
      paymentDetails: selectedMethod === "bank" ? selectedBank : selectedUPI,
    };

    setLoading(true);

    try {
      const response = await axios.post("/api/processWithdrawal", dataToSend);
      alert("Withdrawal successful!");
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      alert("Failed to process withdrawal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span
          className={styles.backArrow}
          onClick={() => router.back()} // Navigate to the previous page
        >
          &larr;
        </span>
        <span className={styles.title}>Withdrawal</span>
        <Link href="/MyProfile/WithdrawalHistory">
          <span className={styles.menuIcon}>☰</span>
        </Link>
      </div>

      {/* Balance */}
      <div className={styles.balance}>
        <span>Balance: ₹{loggedinUser.balance}</span>
      </div>

      {/* Amount Input */}
      <div className={styles.inputContainer}>
        <input
          type="number"
          className={styles.inputBox}
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <p className={styles.feeInfo}>Fee: ₹30.00</p>
      </div>

      {/* Payment Method Selection */}
      <div className={styles.methodSelection}>
        <h3>Select Payment Method</h3>
        <div
          className={`${styles.card} ${
            selectedMethod === "bank" ? styles.selected : ""
          }`}
          onClick={() => handleMethodClick("bank")}
        >
          <h4>Bank Card Withdrawal</h4>
          <p>Choose a saved bank card</p>
        </div>
        <div
          className={`${styles.card} ${
            selectedMethod === "upi" ? styles.selected : ""
          }`}
          onClick={() => handleMethodClick("upi")}
        >
          <h4>UPI Withdrawal</h4>
          <p>Choose a saved UPI ID</p>
        </div>
      </div>

      {/* Display Payment Method Details */}
      {selectedMethod === "bank" && (
        <div className={styles.methodDetails}>
          <h4>Saved Bank Cards</h4>
          {methods.bank.length > 0 ? (
            methods.bank.map((card, index) => (
              <div key={index} className={styles.cardDetails}>
                <input
                  type="checkbox"
                  checked={selectedBank.includes(
                    card.bankDetails.accountNumber
                  )}
                  onChange={() =>
                    handleBankSelect(card.bankDetails.accountNumber)
                  }
                />
                <p>
                  <strong>Bank Name:</strong> {card.bankDetails.bankName}
                </p>
                <p>
                  <strong>Account No:</strong> {card.bankDetails.accountNumber}
                </p>
                <p>
                  <strong>IFSC:</strong> {card.bankDetails.ifsc}
                </p>
                <p>
                  <strong>Email:</strong> {card.bankDetails.email}
                </p>
                <p>
                  <strong>Mobile No:</strong> {card.bankDetails.mobileNumber}
                </p>
              </div>
            ))
          ) : (
            <p>No bank cards available.</p>
          )}
        </div>
      )}

      {selectedMethod === "upi" && (
        <div className={styles.methodDetails}>
          <h4>Saved UPI IDs</h4>
          {methods.upi.length > 0 ? (
            methods.upi.map((upi, index) => (
              <div key={index} className={styles.cardDetails}>
                <input
                  type="checkbox"
                  checked={selectedUPI.includes(upi.upiDetails.upiId)}
                  onChange={() => handleUPISelect(upi.upiDetails.upiId)}
                />
                <p>
                  <strong>UPI ID:</strong> {upi.upiDetails.upiId}
                </p>
              </div>
            ))
          ) : (
            <p>No UPI IDs available.</p>
          )}
        </div>
      )}

      {/* Password Input */}
      <div className={styles.passwordSection}>
        <input
          type="password"
          className={styles.passwordInput}
          placeholder="Enter your withdrawal password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#" className={styles.resetLink}>
          Reset Withdrawal Password
        </a>
      </div>

      {/* Withdrawal Button */}
      <button
        className={styles.withdrawButton}
        onClick={handleWithdrawal}
        disabled={loading}
      >
        {loading ? "Processing..." : "Withdraw"}
      </button>
    </div>
  );
};

export default Withdrawal;
