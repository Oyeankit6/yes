import Withdrawal from "@/app/Components/Withdrawal/withdrawal";
import React from "react";
import StoreContextProvider from "@/app/Context/AccountContext";
const page = () => {
  return (
    <div>
      <StoreContextProvider>
        <Withdrawal />
      </StoreContextProvider>
    </div>
  );
};

export default page;
