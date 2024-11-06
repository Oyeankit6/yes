"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [mobileNumber, setmobileNumber] = useState("+91");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const loginDetails = {
      mobileNumber,
      password,
    };

    try {
      let res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(loginDetails),
      });

      if (res.ok) {
        toast.success("Login Successful!");
        setTimeout(() => {
          router.push("/Win");
        }, 1000); // Show success message before redirecting
      } else {
        const errorData = await res.json();
        toast.error(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <span style={styles.backIcon}>&lt;</span>
        <h2>Login</h2>
      </div>
      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <span style={styles.icon}>📱</span>
          <input
            type="text"
            placeholder="+91xxxxxxxxxx"
            value={mobileNumber}
            onChange={(e) => setmobileNumber(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrapper}>
          <span style={styles.icon}>💬</span>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          style={styles.loginButton}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
          <span style={styles.loadingText}>loading...</span>
        </div>
      )}
      <div style={styles.footer}>
        <button style={styles.footerButton}>Register</button>
        <button style={styles.footerButton}>Forgot Password?</button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f7f8fc ",
  },
  navbar: {
    display: "flex",
    width: "100%",
    backgroundColor: "#3498db ",
    justifyContent: "center",
    padding: "10px",
    backgroundColor: "#3498db",
    borderBottom: "1px solid #ddd",
    position: "relative",
  },
  backIcon: {
    position: "absolute",
    left: "20px",
    fontSize: "20px",
    cursor: "pointer",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",

    marginTop: "50px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid #ddd",
  },
  icon: {
    padding: "10px",
    fontSize: "20px",
    color: "#666",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  loginButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "400px",
    marginTop: "20px",
  },
  footerButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
  },
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "5px solid rgba(255, 255, 255, 0.2)",
    borderTop: "5px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#fff",
    marginTop: "10px",
    fontSize: "16px",
  },
};

export default Login;
