"use client";
import { useState } from "react";
import styles from "../../styles/RegisterForm.module.css";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mobileNumber, setMobileNumber] = useState("+91");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleRegister = async () => {
    if (!mobileNumber || !email || !password || !checked) {
      setError("Please fill out all fields and agree to the privacy policy.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    let registerData = {
      mobileNumber,
      email,
      password,
    };

    try {
      let res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (res.ok) {
        setSuccess("Registration successful!");
        setMobileNumber("+91");
        setEmail("");
        setPassword("");
        setChecked(false);
      } else {
        let result = await res.json();
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        +<button className={styles.backButton}>&larr;</button>
        <h1>Register</h1>
      </header>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="mobile" style={{ fontSize: "18px" }}>
            📱{" "}
          </label>
          <input
            type="tel"
            id="mobile"
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" style={{ fontSize: "18px" }}>
            📧
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" style={{ fontSize: "18px" }}>
            🔒
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.privacyPolicy}>
          <input
            type="checkbox"
            id="agree"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor="agree">
            I agree to the <a href="#">PRIVACY POLICY</a>
          </label>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <div className={styles.buttonBox}>
          <button
            className={styles.registerButton}
            disabled={loading}
            onClick={handleRegister}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
