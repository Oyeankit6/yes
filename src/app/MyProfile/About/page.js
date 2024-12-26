"use client";
import { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <header
        style={{
          backgroundColor: "#007BFF",
          padding: "10px 20px",
          color: "white",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px" }}>Betting Platform</h1>
          <Link
            href="/MyProfile"
            style={{ color: "white", textDecoration: "none", fontSize: "16px" }}
          >
            Back
          </Link>
        </nav>
      </header>

      <div style={{ maxWidth: "800px", padding: "20px" }}>
        <h1
          style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}
        >
          About Us
        </h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Welcome to our betting platform, where entertainment meets
          reliability. Our mission is to provide a secure, fair, and enjoyable
          betting experience for enthusiasts around the globe. Whether you are a
          seasoned bettor or a newcomer, we are committed to offering a seamless
          experience that caters to all your betting needs.
        </p>

        <h2 style={{ color: "#007BFF", marginTop: "20px" }}>Our Vision</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Our vision is to be the most trusted and innovative betting platform
          in the industry. We strive to empower our users with advanced tools,
          transparent processes, and exciting opportunities to engage with their
          favorite sports and events.
        </p>

        <h2 style={{ color: "#007BFF", marginTop: "20px" }}>What We Offer</h2>
        <ul
          style={{
            fontSize: "16px",
            color: "#555",
            listStyleType: "disc",
            paddingLeft: "20px",
          }}
        >
          <li>
            Comprehensive betting options across a wide range of sports and
            events.
          </li>
          <li>
            Secure transactions with state-of-the-art encryption technologies.
          </li>
          <li>User-friendly interface designed for effortless navigation.</li>
          <li>24/7 customer support to address your concerns promptly.</li>
        </ul>

        <h2 style={{ color: "#007BFF", marginTop: "20px" }}>Our Commitment</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>
          We are dedicated to maintaining the highest standards of integrity and
          customer satisfaction. Your trust is our priority, and we continuously
          work to enhance our platform, ensuring it remains safe, reliable, and
          engaging.
        </p>

        <h2 style={{ color: "#007BFF", marginTop: "20px" }}>Contact Us</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Have questions or need assistance? Reach out to our support team at{" "}
          <a
            href="mailto:support@bettingplatform.com"
            style={{ color: "#007BFF" }}
          >
            support@bettingplatform.com
          </a>
          . We are here to help you 24/7.
        </p>

        <p style={{ fontSize: "16px", color: "#555", marginTop: "20px" }}>
          Thank you for choosing our platform. We look forward to serving you
          and making your betting experience exceptional.
        </p>
      </div>
    </div>
  );
}
