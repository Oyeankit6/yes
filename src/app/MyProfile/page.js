"use client";
import React from "react";
import Profile from "../Components/ProfilePage/Profile";
import StoreContextProvider from "../Context/AccountContext";

const Page = () => {
  return (
    <StoreContextProvider>
      <Profile />
    </StoreContextProvider>
  );
};

export default Page;
