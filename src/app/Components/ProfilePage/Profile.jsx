import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/Profile.module.css";
import { StoreContext } from "@/app/Context/AccountContext";
import {
  FaWallet,
  FaGift,
  FaRegCreditCard,
  FaLock,
  FaPhone,
  FaUserCircle,
  FaInfoCircle,
  FaBullhorn,
} from "react-icons/fa"; // Importing icons

const Profile = () => {
  const { loggedinUser, balance } = useContext(StoreContext);
  const router = useRouter();

  const [walletExpanded, setWalletExpanded] = useState(false);
  const [bankCardExpanded, setBankCardExpanded] = useState(false);
  const [accountSecurityExpanded, setAccountSecurityExpanded] = useState(false);

  useEffect(() => {
    const container = document.getElementById("container");
    const childElement = document.getElementById("child");

    if (container && childElement) {
      container.removeChild(childElement);
    }
  }, []);

  const handleLogout = async () => {
    try {
      let res = await fetch("/api/logout", {
        method: "GET",
      });
      if (res.ok) {
        // Redirect to login page after successful logout
        router.push("/MyProfile/login");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // Ensure balance is formatted to 3 decimal places
  const formattedBalance = balance?.toFixed(3);

  // Function to toggle sections
  const toggleSection = (section) => {
    if (section === "wallet") {
      setWalletExpanded(!walletExpanded);
    } else if (section === "bankCard") {
      setBankCardExpanded(!bankCardExpanded);
    } else if (section === "accountSecurity") {
      setAccountSecurityExpanded(!accountSecurityExpanded);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <div className={styles.userInfo} style={{ padding: "2px" }}>
          <div className={styles.avatar} style={{ padding: "2px" }}>
            <img src="" alt="User" />
          </div>
          <div className={styles.userDetails}>
            <p className={styles.userName}>
              User: member_{loggedinUser?.mobileNumber}
            </p>
            <p className={styles.userId} style={{ padding: "2px" }}>
              ID: 529814
            </p>
          </div>
        </div>
        <div>
          <p className={styles.userMobile} style={{ marginTop: "12px" }}>
            Mobile: {loggedinUser?.mobileNumber}
          </p>
          <p className={styles.userBalance} style={{ marginTop: "12px" }}>
            Available balance: ₹{formattedBalance}
          </p>
        </div>
        <div className={styles.buttons}>
          <Link href="/MyProfile/Recharge">
            <button className={styles.rechargeButton}>Recharge</button>
          </Link>
          <button className={styles.changeNameButton}>Change Nick Name</button>
        </div>
      </div>

      <div className={styles.menu}>
        <Link href="/MyProfile/BonusRecords" className={styles.link}>
          <div className={styles.menuItem}>
            <FaGift className={styles.icon} /> Bonus Record
          </div>
        </Link>
        <Link href="/MyProfile/Promotion" className={styles.link}>
          <div className={styles.menuItem}>
            <FaBullhorn className={styles.icon} /> Promotion
          </div>
        </Link>

        {/* Expandable Wallet Section */}
        <div
          className={styles.menuItem}
          onClick={() => toggleSection("wallet")}
        >
          <FaWallet className={styles.icon} /> Wallet
        </div>
        {walletExpanded && (
          <div className={styles.subMenu}>
            <Link href="/MyProfile/Recharge" className={styles.subLink}>
              <div>Recharge</div>
            </Link>
            <Link
              href="/MyProfile/Wallet/Withdrawal"
              className={styles.subLink}
            >
              <div>Withdrawal</div>
            </Link>
            <Link
              href="/MyProfile/Wallet/Transactions"
              className={styles.subLink}
            >
              <div>Transactions</div>
            </Link>
          </div>
        )}

        {/* Expandable Bank Card Section */}
        <div
          className={styles.menuItem}
          onClick={() => toggleSection("bankCard")}
        >
          <FaRegCreditCard className={styles.icon} />
          {/* <Link
            href="/MyProfile/Bankcard"
            className={styles.subLink}
          ></Link>{" "} */}
          Bank Card{" "}
        </div>
        {bankCardExpanded && (
          <div className={styles.subMenu}>
            <Link
              href="/MyProfile/Bankcard/addbankcard"
              className={styles.subLink}
            >
              <div>Add Bank Card</div>
            </Link>
          </div>
        )}

        {/* Expandable Account Security Section */}
        <div
          className={styles.menuItem}
          onClick={() => toggleSection("accountSecurity")}
        >
          <FaLock className={styles.icon} /> Account Security
        </div>
        {accountSecurityExpanded && (
          <div className={styles.subMenu}>
            <Link
              href="/MyProfile/AccountSecurity/ResetPassword"
              className={styles.subLink}
            >
              <div>Reset Password</div>
            </Link>
          </div>
        )}

        <Link href="/MyProfile/Complaints" className={styles.link}>
          <div className={styles.menuItem}>
            <FaPhone className={styles.icon} /> Complaints & Suggestions
          </div>
        </Link>
        <Link href="/MyProfile/About" className={styles.link}>
          <div className={styles.menuItem}>
            <FaInfoCircle className={styles.icon} /> About
          </div>
        </Link>

        <div className={styles.logoutContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <FaUserCircle className={styles.icon} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
