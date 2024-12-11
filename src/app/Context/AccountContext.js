"use client";

import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [openBetSlip, setOpenBetSlip] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedNumber, setselectedNumber] = useState("");
  const [period, setPeriod] = useState(null);
  const [betPlace, setbetPlace] = useState([]);
  const [results, setResults] = useState([]);
  const [bets, setBets] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState([]);
  const [balance, setBalance] = useState();
  const [remainingTime, setRemainingTime] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Parity");
  const [rechargeData, setRechargeData] = useState(null);

  useEffect(() => {
    // Simulating API fetch for user data
    const getUser = async () => {
      try {
        const response = await fetch("/api/getUser");
        const data = await response.json();

        setLoggedinUser(data.data);
        if (data.data.balance) {
          setBalance(data.data.balance);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);

  const ContextValue = {
    openBetSlip,
    setOpenBetSlip,
    selectedColor,
    setSelectedColor,
    selectedNumber,
    setselectedNumber,
    betPlace,
    setbetPlace,
    period,
    setPeriod,
    results,
    setResults,
    bets,
    setBets,
    balance,
    setBalance,
    loggedinUser,
    setLoggedinUser,
    remainingTime,
    setRemainingTime,
    activeCategory,
    setActiveCategory,
    rechargeData,
    setRechargeData,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
