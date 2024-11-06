"use client";
import React, { useState } from "react";
import styles from "../../styles/BonusRecord.module.css"; // Import the corresponding CSS module

const BonusRecord = () => {
  const [activeTab, setActiveTab] = useState("LEVEL1");

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <button className={styles.backButton}>&#8592;</button>
        <h1 className={styles.title}>Bonus Record</h1>
      </div>

      {/* Tab Section */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "LEVEL1" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("LEVEL1")}
        >
          LEVEL1
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "LEVEL2" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("LEVEL2")}
        >
          LEVEL2
        </button>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <p className={styles.noDataText}>No data available</p>
      </div>

      {/* Pagination Section */}
      <div className={styles.pagination}>
        <span className={styles.paginationText}>1-0 of 0</span>
        <button className={styles.pageButton}>&#8592;</button>
        <button className={styles.pageButton}>&#8594;</button>
      </div>
    </div>
  );
};

export default BonusRecord;
