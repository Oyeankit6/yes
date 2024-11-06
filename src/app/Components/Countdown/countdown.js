"use client";
import React, { useState, useEffect, useContext } from "react";
import "../Countdown/Countdown.css";
import { io } from "socket.io-client";
import { StoreContext } from "@/app/Context/AccountContext";

const ContDown = () => {
  let socket;
  const {
    setOpenBetSlip,
    setSelectedColor,
    setselectedNumber,
    period,
    setPeriod,
    remainingTime,
    setRemainingTime,
    setResults,
    activeCategory,
    setActiveCategory,
  } = useContext(StoreContext);

  const isDisabled = remainingTime < 30;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io("wss://cashhh.onrender.com", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.on("timer", (data) => {
      console.log("Received data:", data);
      setPeriod(data.period);
      setRemainingTime(data.remainingTime);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <div className="Main-Container">
      <div className="">
        <div className="header">
          <div
            className={`category-item ${
              activeCategory === "Parity" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("Parity")}
          >
            Parity
          </div>
          <div
            className={`category-item ${
              activeCategory === "Sapre" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("Sapre")}
          >
            Sapre
          </div>
          <div
            className={`category-item ${
              activeCategory === "Bcone" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("Bcone")}
          >
            Bcone
          </div>
          <div
            className={`category-item ${
              activeCategory === "Emerd" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("Emerd")}
          >
            Emerid
          </div>
        </div>
      </div>
      <div className="main1">
        <div className="period">
          <p className="period-text">🏆 Period</p>
          <p className="countdown-text">Count Down</p>
        </div>
        <div className="period" style={{ padding: "10px 10px 0px" }}>
          <p className="period-number">{period}</p>
          <p className="countdown-number">{formatTime(remainingTime)}</p>
        </div>
      </div>

      <div className="btn-clr">
        <button
          style={{ background: "#39b54a" }}
          onClick={() => {
            setselectedNumber("");
            setOpenBetSlip(true);
            setSelectedColor("green");
          }}
          disabled={isDisabled}
        >
          Join Green
        </button>
        <button
          style={{ background: "#6739b6" }}
          onClick={() => {
            setselectedNumber("");
            setOpenBetSlip(true);
            setSelectedColor("violet");
          }}
          disabled={isDisabled}
        >
          Join Violet
        </button>
        <button
          style={{ background: "#e54d42" }}
          onClick={() => {
            setselectedNumber("");
            setOpenBetSlip(true);
            setSelectedColor("red");
          }}
          disabled={isDisabled}
        >
          Join Red
        </button>
      </div>
    </div>
  );
};

export default ContDown;
