"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { StoreContext } from "@/app/Context/AccountContext";

const Gameheader = () => {
  const { loggedinUser, setLoggedinUser, balance } = useContext(StoreContext);

  // Adjust balance to show only three digits after the decimal point
  const formattedBalance = balance?.toFixed(3);

  return (
    <div
      style={{
        backgroundColor: "#0099FF",
        display: "flex",
        alignItems: "center",
        height: "100px",
        borderRadius: "5px",
        padding: "10px",
        margin: "35px 10px  10px 10px ",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div style={{ margin: "15px 20px 20px 0", fontSize: "16px" }}>
          Available balance: ₹{formattedBalance}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "90vw",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <div>
              <Link href="/MyProfile/Recharge">
                <button
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                >
                  Recharge{" "}
                </button>
              </Link>
              <button
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Read Rule
              </button>
            </div>
            <div>
              <div>
                <span style={{ fontSize: "20px" }}>&#8635;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gameheader;
