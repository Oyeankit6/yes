"use client";
import React, { useContext } from "react";
import Gameheader from "../Components/GameHeader/Gameheader";

import StoreContextProvider from "../Context/AccountContext";
import ParityRecordTable from "../Components/Recordetable/recordetable";
import Buttons from "../Components/Buttons/Buttons";

import DialogBox from "../Components/Bet dailog/betSlip";
import ContDown from "../Components/Countdown/countdown";
import BetSlip from "../Components/BetSlip/betslip";

const Page = () => {
  return (
    <>
      <StoreContextProvider>
        <Gameheader />
        <ContDown />
        <Buttons />
        <ParityRecordTable />
        <DialogBox />
        <BetSlip />
      </StoreContextProvider>
    </>
  );
};

export default Page;
