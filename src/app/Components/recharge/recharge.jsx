"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import "./recharge.css";
import { StoreContext } from "@/app/Context/AccountContext";

export default function RechargePage() {
  const { loggedinUser } = useContext(StoreContext);
  const balance = loggedinUser.balance; // Example balance, replace with actual balance if needed
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("superpay");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // Predefined amounts
  const amounts = [100, 300, 500, 1000, 2000, 5000, 10000, 50000];

  // Predefined payment methods
  const paymentMethods = [
    { value: "superpay", label: "Superpay (₹100 - ₹50000)" },
    { value: "phonepay", label: "Phonepay (₹100 - ₹50000)" },
    { value: "gpay", label: "GPAY (₹100 - ₹50000)" },
  ];

  const handleRecharge = () => {
    // Validate selected amount
    if (!selectedAmount || selectedAmount < 100 || selectedAmount > 50000) {
      setErrorMessage("Please select a valid amount between ₹100 and ₹50000.");
      return;
    }

    setErrorMessage("");

    // Append data to URL as query parameters
    const queryParams = new URLSearchParams({
      amount: selectedAmount.toString(),
      paymentMethod: selectedPaymentMethod,
      userBalance: balance.toString(),
    }).toString();

    // Navigate to the scanner page with query parameters
    router.push(`/MyProfile/Recharge/scanner?${queryParams}`);
  };

  return (
    <div className="recharge-container">
      <header className="header">
        <button
          className="back-btn"
          onClick={() => router.back()} // Navigate back
        >
          ←
        </button>
        <h3>Recharge</h3>
      </header>

      <div className="">
        {/* Balance Display */}
        <h2 className="balance">
          Balance: ₹{balance !== undefined ? balance : "Loading..."}
        </h2>

        {/* Recharge Amount Input */}
        <input
          type="number"
          placeholder="Enter or Select recharge amount"
          className="recharge-input"
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(Number(e.target.value))}
          min={100}
          max={50000}
        />

        {/* Predefined Amount Buttons */}
        <div className="amount-buttons">
          {amounts.map((amount) => (
            <button
              key={amount}
              className={`amount-btn ${
                selectedAmount === amount ? "selected" : ""
              }`}
              onClick={() => setSelectedAmount(amount)}
            >
              ₹{amount}
            </button>
          ))}
        </div>
        <footer className="tips">
          <p style={{ backgroundColor: "white" }}>
            Tips: Please contact{" "}
            <a href="mailto:mantrimaal001@gmail.com">mantrimaal001@gmail.com</a>{" "}
            if you have any questions about the order or payment failure.
          </p>
        </footer>

        {/* Payment Method Selection */}
        <div className="payment-methods">
          <h3 style={{ backgroundColor: "#ffffff" }}>Select Payment Method</h3>
          {paymentMethods.map((method) => (
            <label key={method.value}>
              <input
                type="radio"
                name="payment"
                value={method.value}
                checked={selectedPaymentMethod === method.value}
                onChange={() => setSelectedPaymentMethod(method.value)}
              />
              <p className="gpay"> {method.label}</p>
            </label>
          ))}
        </div>

        {/* Error Message */}
        {errorMessage && <p className="error">{errorMessage}</p>}

        {/* Recharge Button */}

        <div className="btncont">
          <button className="recharge-btn" onClick={handleRecharge}>
            Recharge
          </button>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}
