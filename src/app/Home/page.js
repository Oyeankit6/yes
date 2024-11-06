"use client";

import React, { useContext } from "react";

import Home from "../page";
import Header from "../Components/Homeheader";
import Autoimage from "../Components/Autoimage/image";
import Cards from "../Components/ImageCard/ImageCard";

function Page() {
  return (
    <>
      <Header />
      <Autoimage />
      <Cards />
    </>
  );
}

export default Page;
