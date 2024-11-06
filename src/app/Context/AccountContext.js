import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
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
  useEffect(() => {
    const getUser = async () => {
      let res = await fetch("/api/getUser");
      res = await res.json();

      setLoggedinUser(res.data);
      if (res.data.balance) {
        setBalance(res.data.balance);
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
    bets,
    setBets,
    balance,
    setBalance,
    setResults,
    loggedinUser,
    setLoggedinUser,
    activeCategory,
    setActiveCategory,
    remainingTime,
    setRemainingTime,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
