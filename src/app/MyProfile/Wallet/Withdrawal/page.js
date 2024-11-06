"use client";
import React, { useState } from "react";
import styles from "./Withdrawal.module.css";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <span className={styles.backArrow}>&larr;</span>
        <span className={styles.title}>Withdrawal</span>
        <span className={styles.menuIcon}>☰</span>
      </div>

      {/* Balance Section */}
      <div className={styles.balance}>
        <span>Balance: ₹1.64</span>
      </div>

      {/* Input Section */}
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>
          <span className={styles.icon}>💬</span>
          <input
            type="number"
            className={styles.inputBox}
            placeholder="please input number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <p className={styles.feeInfo}>Fee: 0, to account 0</p>
      </div>

      {/* Payout Methods */}
      <div className={styles.payoutSection}>
        <p>payout</p>
        <div className={styles.dropdown}>
          <span>bank card withdrawal</span>
          <span className={styles.dropdownArrow}>▼</span>
        </div>
        <div className={styles.dropdown}>
          <span>upi withdrawal</span>
          <span className={styles.dropdownArrow}>▼</span>
        </div>
      </div>

      {/* Password Section */}
      <div className={styles.passwordSection}>
        <label>enter your withdrawal password</label>
        <div className={styles.passwordInputContainer}>
          <span className={styles.passwordIcon}>👁️</span>
          <input
            type="password"
            className={styles.passwordInput}
            placeholder="Withdrawal Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="#" className={styles.resetLink}>
          Reset Withdrawal Password
        </a>
      </div>

      {/* Withdrawal Button */}
      <button className={styles.withdrawButton}>Withdrawal</button>
    </div>
  );
};

export default Withdrawal;
