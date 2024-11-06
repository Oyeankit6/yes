import React from "react";

const Loading = () => {
  return (
    <>
      {/* Inline CSS for keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.overlay}>
        <div style={styles.loader}></div>
        <p style={styles.text}>loading...</p>
      </div>
    </>
  );
};

const styles = {
  overlay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
    zIndex: 9999, // Ensures it appears on top of other elements
  },
  loader: {
    border: "16px solid #f3f3f3", // Light grey
    borderTop: "16px solid #3498db", // Blue color
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 2s linear infinite", // Spin animation
  },
  text: {
    marginTop: "20px",
    color: "#fff",
    fontSize: "20px",
  },
};

export default Loading;
