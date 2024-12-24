import BankCardForm from "@/app/Components/BankCard/bankcard";
import React from "react";
import StoreContextProvider from "@/app/Context/AccountContext";

const page = () => {
  return (
    <div>
      <StoreContextProvider>
        <BankCardForm />
      </StoreContextProvider>
    </div>
  );
};

export default page;
