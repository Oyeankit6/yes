import React from "react";
import { assets } from "../../../../public/assets/assets";
import "./Card.css";

const Cards = () => {
  return (
    <div className="AllCArds">
      <div className="cards">
        <img src={assets.item1} alt="" />
        <p className="para">
          Yellow Chimes A5 Grade American Crystal Traditional Gold Plated
          Without Piercing Combo Nose Pins for Women &amp; Girls
        </p>{" "}
        <p className="price"> 17000</p>{" "}
      </div>
      <div className="cards">
        <img src={assets.item2} alt="" />
        <p className="para">
          Yellow Chimes A5 Grade American Crystal Traditional Gold Plated
          Without Piercing Combo Nose Pins for Women &amp; Girls
        </p>{" "}
        <p className="price"> 17000</p>{" "}
      </div>
      <div className="cards">
        <img src={assets.item3} alt="" />
        <p className="para">
          Yellow Chimes A5 Grade American Crystal Traditional Gold Plated
          Without Piercing Combo Nose Pins for Women &amp; Girls
        </p>{" "}
        <p className="price"> 17000</p>{" "}
      </div>
      <div className="cards">
        <img src={assets.item4} alt="" />
        <p className="para">
          Yellow Chimes A5 Grade American Crystal Traditional Gold Plated
          Without Piercing Combo Nose Pins for Women &amp; Girls
        </p>{" "}
        <p className="price"> 17000</p>{" "}
      </div>
    </div>
  );
};

export default Cards;
