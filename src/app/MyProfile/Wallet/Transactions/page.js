import TransactionPage from "@/app/Components/transaction/Transaction";
import React from "react";

import StoreContextProvider from "@/app/Context/AccountContext";

const page = () => {
  return (
    <div>
      <StoreContextProvider>
        <TransactionPage />
      </StoreContextProvider>
    </div>
  );
};

export default page;
