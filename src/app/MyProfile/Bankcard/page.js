"use client";

import React from "react";
import styles from "./BankCardList.module.css";

const BankCardList = () => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <span className={styles.backArrow}>&larr;</span>
        <span className={styles.title}>Bank Card</span>
        <span className={styles.addIcon}>+</span>
      </div>

      {/* Bank Card List Section */}
      <div className={styles.cardList}>
        {[
          "8168962691@paytm",
          "Ankithdfc2001@ybl",
          "ankithdfc2001@ybl",
          "HDFC BANK",
        ].map((card, index) => (
          <div key={index} className={styles.cardItem}>
            <span className={styles.cardIcon}>💳</span>
            <span className={styles.cardText}>{card}</span>
            <span className={styles.infoIcon}>ℹ️</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankCardList;
