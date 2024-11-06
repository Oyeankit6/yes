"use client";
import React from "react";
import styles from "./Promotion.module.css";

const Promotion = () => {
  const promotionCode = "529814";
  const promotionLink =
    "https://mantrishop.in/#/pages/person/register?r_code=529814";

  const copyLink = () => {
    navigator.clipboard.writeText(promotionLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <span className={styles.backArrow}>&larr;</span>
        <span className={styles.title}>Promotion</span>
      </div>

      {/* Bonus Section */}
      <div className={styles.bonusSection}>
        <div>Bonus: ₹ 3.36</div>
        <button className={styles.applyButton}>Apply to Balance</button>
      </div>

      {/* Level Navigation */}
      <div className={styles.levelNavigation}>
        <span className={`${styles.levelTab} ${styles.active}`}>Level1</span>
        <span className={styles.levelTab}>Level2</span>
      </div>

      {/* Statistics Section */}
      <div className={styles.statistics}>
        <div className={styles.statsItem}>
          <div>TotalPeople</div>
          <span className={styles.statsValue}>71</span>
        </div>
        <div className={styles.statsItem}>
          <div>Contribution</div>
          <span className={styles.statsValue}>3553.86</span>
        </div>
      </div>

      {/* Promotion Code Section */}
      <div className={styles.promotionDetails}>
        <span>My Promotion Code</span>
        <span className={styles.promotionCode}>{promotionCode}</span>
      </div>
      <div>
        <span>My Promotion Link</span>
        <span className={styles.promotionLink}>{promotionLink}</span>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button className={styles.copyButton} onClick={copyLink}>
          Copy Link
        </button>
        <button
          className={styles.openButton}
          onClick={() => window.open(promotionLink)}
        >
          Open Link
        </button>
      </div>
    </div>
  );
};

export default Promotion;
