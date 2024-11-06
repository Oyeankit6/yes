"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { assets } from "../../../public/assets/assets";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  useEffect(() => {
    const element = document.getElementById("yourElementId");
    if (element) {
      element.parentNode.removeChild(element);
    }
  }, []);
  return (
    <div className={styles.footer}>
      <div className={styles.home}>
        <Link href="/Home">
          <img src={assets.home} alt="Home Icon" />
          <p className={styles.paa}>Home</p>
        </Link>
      </div>
      <div className={styles.search}>
        <Link href="/Search">
          <img src={assets.search} alt="Search Icon" />
          <p className={styles.paa}>Search</p>
        </Link>
      </div>
      <div className={styles.newGame}>
        <Link href="/Newgame">
          <img src={assets.newGame} alt="New Game Icon" />
          <p className={styles.paa}>NewGame</p>
        </Link>
      </div>
      <div className={styles.win}>
        <Link href="/Win">
          <img src={assets.Win} alt="Win Icon" />
          <p className={styles.paa}>Win</p>
        </Link>
      </div>
      <div className={styles.profile}>
        <Link href="/MyProfile/Register">
          <img src={assets.profile} alt="Profile Icon" />
          <p className={styles.paa}>my</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
