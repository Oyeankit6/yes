"use client";

import React, { useEffect, useState } from "react";
import { Images } from "../../../../public/assets/assets";
import "./autoimage.css";

const Autoimage = () => {
  let [img, setImg] = useState(Images[0]);
  const [index, setIndex] = useState(0);

  const Newimage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % Images.length);
    setImg(Images[(index + 1) % Images.length]);
  };

  useEffect(() => {
    const intervalId = setInterval(Newimage, 5000);
    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <>
      <img className="Heroimage" onClick={Newimage} src={img} alt="" />
    </>
  );
};

export default Autoimage;
