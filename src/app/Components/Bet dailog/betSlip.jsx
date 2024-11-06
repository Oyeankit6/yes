import React, { useContext, useEffect, useState } from "react";
import styles from "./DialogBox.module.css";
import { StoreContext } from "@/app/Context/AccountContext";

const DialogBox = () => {
  const [number, setNumber] = useState(1);
  const [selectedMoney, setSelectedMoney] = useState(10);
  const [lowBalancePopup, setLowBalancePopup] = useState(false); // Add this state

  const {
    openBetSlip,
    selectedNumber,
    betPlace,
    setbetPlace,
    period,
    loggedinUser,
    balance,
    setBalance,
    setLoggedinUser,
    activeCategory, // Added to capture the selected category (e.g., Parity, Sapre, Bcone, Emerd)
    setOpenBetSlip,
    selectedColor,
  } = useContext(StoreContext);

  const handleNumberChange = (value) => {
    if (number + value > 0) {
      setNumber(number + value);
    }
  };

  const handleMoneyChange = (value) => {
    setSelectedMoney(value);
  };

  if (!openBetSlip) {
    return null;
  }

  const updatebet = async (betDetails) => {
    try {
      let res = await fetch("/api/addBetDetails", {
        method: "POST",
        body: JSON.stringify({ betDetails }),
      });
      res = await res.json();

      setBalance(res.updatedBalance);
    } catch (error) {
      console.log(error);
    }
  };

  const handelbetplace = () => {
    if (balance >= selectedMoney * number) {
      const betDetails = {
        periodNo: period,
        category: activeCategory, // Save the selected category (Parity, Sapre, etc.)
        number: selectedNumber,
        color: selectedColor,
        amount: selectedMoney * number,
        fee: "0.2", // This can be dynamic if needed
        result: "Pending", // Initial result status is "Pending"
        status: "Pending", // Overall status of the bet
      };

      updatebet(betDetails);
      setOpenBetSlip(false);
    } else {
      setLowBalancePopup(true);
    }
  };

  if (lowBalancePopup) {
    return (
      <div className={styles.popupOverlay}>
        <div className={styles.popup}>
          <h3>Fail</h3>
          <p>The balance is not enough</p>
          <button
            onClick={() => {
              setLowBalancePopup(false), setOpenBetSlip(false);
            }} // Close the popup
            className={styles.okBtn}
          >
            OK
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div className={styles.overlay}>
        <div className={styles.dialogBox}>
          <div
            className={styles.header}
            style={{
              backgroundColor:
                selectedColor === "green"
                  ? " #39b54a"
                  : selectedColor === "red"
                  ? "#e54d42"
                  : selectedColor === "violet"
                  ? "#6739b6"
                  : "#0099FF",
            }}
          >
            Join {selectedColor ? selectedColor : selectedNumber}
          </div>
          <div className={styles.content}>
            <p>Contract money</p>
            <div className={styles.moneyOptions}>
              {[10, 100, 1000, 10000].map((money) => (
                <span
                  key={money}
                  className={`${styles.moneyOption} ${
                    selectedMoney === money ? styles.selected : ""
                  }`}
                  onClick={() => handleMoneyChange(money)}
                >
                  {money}
                </span>
              ))}
            </div>
            <div className={styles.numberSelector}>
              <p style={{ marginRight: "10px" }}>Number</p>
              <button
                onClick={() => handleNumberChange(-1)}
                className={styles.numberBtn}
              >
                -
              </button>
              <span className={styles.number}>{number}</span>
              <button
                onClick={() => handleNumberChange(1)}
                className={styles.numberBtn}
              >
                +
              </button>
            </div>
            <p className={styles.totalMoney}>
              Total contract money is {selectedMoney * number}
            </p>
            <div className={styles.agreement}>
              <input type="checkbox" id="agree" className={styles.checkbox} />
              <label htmlFor="agree" className={styles.label}>
                I agree{" "}
                <a href="#" className={styles.link}>
                  PRESALE RULE
                </a>
              </label>
            </div>
          </div>
          <hr />
          <div className={styles.actions}>
            <button
              onClick={() => {
                setOpenBetSlip(false);
              }}
              className={styles.closeBtn}
            >
              CLOSE
            </button>
            <button onClick={handelbetplace} className={styles.confirmBtn}>
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    );
};

export default DialogBox;
