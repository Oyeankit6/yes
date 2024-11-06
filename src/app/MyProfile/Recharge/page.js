"use client";
import RechargePage from "@/app/Components/recharge/recharge";
import StoreContextProvider from "@/app/Context/AccountContext";
import React from "react";

const page = () => {
  return (
    <StoreContextProvider>
      <RechargePage />
    </StoreContextProvider>
  );
};

export default page;
