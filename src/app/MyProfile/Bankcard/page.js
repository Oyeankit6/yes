"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation
import axios from "axios";
import styles from "./BankCardList.module.css";

const BankCardList = () => {
  const [methods, setMethods] = useState({ bank: [], upi: [] }); // State to store bank and UPI methods
  const [expandedCard, setExpandedCard] = useState(null); // State to track expanded card
  const router = useRouter(); // Next.js router for navigation

  // Fetch user methods on component mount
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await axios.get("/api/getUserMethods"); // API call to fetch user methods
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
        console.error("Error fetching user methods:", error);
      }
    };

    fetchMethods();
  }, []);

  // Handle navigation to add a new bank card
  const handleAddCard = () => {
    router.push("/MyProfile/Bankcard/addbankcard");
  };

  // Toggle card expansion
  const toggleCardDetails = (index) => {
    setExpandedCard((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <span
          className={styles.backArrow}
          onClick={() => router.back()} // Navigate to the previous page
        >
          &larr;
        </span>
        <span className={styles.title}>Bank Card</span>
        <span className={styles.addIcon} onClick={handleAddCard}>
          +
        </span>
      </div>

      {/* Bank Card List Section */}
      <div className={styles.cardList}>
        {methods.bank.length > 0 ? (
          methods.bank.map((card, index) => (
            <div key={index} className={styles.cardItem}>
              {/* Bank Card Summary */}
              <div
                className={styles.cardSummary}
                onClick={() => toggleCardDetails(index)}
              >
                <span className={styles.cardIcon}>💳</span>
                <span className={styles.cardText}>
                  {card.bankDetails.bankName}
                </span>
                <span className={styles.infoIcon}>
                  {expandedCard === index ? "▲" : "ℹ️"}
                </span>
              </div>

              {/* Expanded Bank Card Details */}
              {expandedCard === index && (
                <div className={styles.cardDetails}>
                  <p>
                    <strong>Account Number:</strong>{" "}
                    {card.bankDetails.accountNumber}
                  </p>
                  <p>
                    <strong>IFSC:</strong> {card.bankDetails.ifsc}
                  </p>
                  <p>
                    <strong>Email:</strong> {card.bankDetails.email}
                  </p>
                  <p>
                    <strong>Mobile Number:</strong>{" "}
                    {card.bankDetails.mobileNumber}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles.noCardText}>No bank cards available.</p>
        )}
      </div>

      {/* UPI Section */}
      <div className={styles.cardList}>
        {methods.upi.length > 0 ? (
          methods.upi.map((upi, index) => (
            <div key={index} className={styles.cardItem}>
              <span className={styles.cardIcon}>💳</span>
              <span className={styles.cardText}>{upi.upiDetails.upiId}</span>
              <span className={styles.infoIcon2}>ℹ️</span>
            </div>
          ))
        ) : (
          <p className={styles.noCardText}>No UPI IDs available.</p>
        )}
      </div>
    </div>
  );
};

export default BankCardList;
