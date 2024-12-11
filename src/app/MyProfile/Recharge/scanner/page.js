import ScannerPage from "@/app/Components/scanner/ScannerPage";
import React from "react";
import StoreContextProvider from "@/app/Context/AccountContext";

const page = () => {
  return (
    <StoreContextProvider>
      {" "}
      <ScannerPage />
    </StoreContextProvider>
  );
};

export default page;
