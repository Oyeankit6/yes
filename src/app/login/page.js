"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("+91");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const loginDetails = { mobileNumber, password };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Login Successful!");
      } else {
        const errorData = await res.json();
        toast.error(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);

      router.push("/Win");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Login to your account</p>
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile Number</label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button
            style={loading ? styles.buttonDisabled : styles.button}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div style={styles.links}>
            <button
              style={styles.link}
              onClick={() => router.push("/Register")}
            >
              Register
            </button>
            <button style={styles.link}>Forgot Password?</button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",

    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#718096",
    marginBottom: "30px",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    outline: "none",
    transition: "border-color 0.3s",
  },
  inputFocus: {
    borderColor: "#3182ce",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3182ce",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#a0aec0",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed",
  },
  links: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    background: "none",
    border: "none",
    color: "#3182ce",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
