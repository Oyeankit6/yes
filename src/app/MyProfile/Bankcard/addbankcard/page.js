import React from "react";
import styles from "./BankCardForm.module.css";

const BankCardForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton}>← Add Bank Card</button>
      </div>
      <div className={styles.tabs}>
        <button className={styles.activeTab}>Select Bank Card</button>
        <button className={styles.tab}>Select UPI</button>
      </div>
      <form className={styles.form}>
        <label>
          Actual Name
          <input type="text" placeholder="Actual Name" />
        </label>
        <label>
          IFSC Code
          <input type="text" placeholder="IFSC Code" />
        </label>
        <label>
          Bank Name
          <input type="text" placeholder="Bank Name" />
        </label>
        <label>
          Bank Account
          <input type="text" placeholder="Bank Account" />
        </label>
        <label>
          Mobile Number
          <input type="text" placeholder="Mobile Number" />
        </label>
        <label>
          Email
          <input type="email" placeholder="Email" />
        </label>
        <div className={styles.otpSection}>
          <span>+918930522231</span>
          <button type="button" className={styles.otpButton}>
            OTP
          </button>
        </div>
        <p className={styles.infoText}>
          The verification code is sent to the above
        </p>
        <button type="submit" className={styles.continueButton}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default BankCardForm;
