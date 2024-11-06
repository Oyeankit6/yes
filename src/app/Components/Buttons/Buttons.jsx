"use client";
import React, { useContext } from "react";
import "./Buttons.css";
import { StoreContext } from "@/app/Context/AccountContext";

const Buttons = () => {
  const { setselectedNumber, setOpenBetSlip, setSelectedColor, remainingTime } =
    useContext(StoreContext);

  const isDisabled = remainingTime < 30;

  return (
    <>
      <div className="btn0">
        <button
          className="btn-violet"
          onClick={() => {
            setSelectedColor(""), setselectedNumber("0"), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          0
        </button>
        <button
          className="btn-green"
          onClick={() => {
            setSelectedColor(""), setselectedNumber(1), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          1
        </button>
        <button
          className="btn-red"
          onClick={() => {
            setSelectedColor(""), setselectedNumber(2), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          2
        </button>
        <button
          className="btn-green"
          onClick={() => {
            setSelectedColor(""), setselectedNumber(3), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          3
        </button>
        <button
          className="btn-red"
          onClick={() => {
            setSelectedColor(""), setselectedNumber(4), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          4
        </button>
        <button
          className="btn-VG"
          onClick={() => {
            setSelectedColor(""), setselectedNumber(5), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          5
        </button>
        <button
          className="btn-red"
          onClick={() => {
            setSelectedColor(""), setselectedNumber(6), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          6
        </button>
        <button
          className="btn-green"
          onClick={() => {
            setSelectedColor(""), setselectedNumber(7), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          7
        </button>
        <button
          className="btn-red"
          onClick={() => {
            setSelectedColor(""), setselectedNumber(8), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          8
        </button>
        <button
          className="btn-green"
          onClick={() => {
            setSelectedColor(""), setselectedNumber(9), setOpenBetSlip(true);
          }}
          disabled={isDisabled}
        >
          9
        </button>
      </div>
    </>
  );
};

export default Buttons;
