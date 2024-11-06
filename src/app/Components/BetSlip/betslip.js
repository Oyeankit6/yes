// import { useContext, useEffect, useState } from "react";
// import styles from "./BetSlip.module.css";
// import { StoreContext } from "@/app/Context/AccountContext";

// const BetSlip = () => {
//   const {
//     period,
//     betPlace,
//     results,
//     setbetPlace,
//     balance,
//     setBalance,
//     activeCategory,
//   } = useContext(StoreContext);

//   const [isExpanded, setIsExpanded] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const betsPerPage = 5;

//   const handleToggle = (index) => {
//     setIsExpanded(isExpanded === index ? null : index);
//   };

//   const handlePageChange = (direction) => {
//     if (direction === "prev" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     } else if (direction === "next" && currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//     setIsExpanded(null);
//   };

//   const indexOfLastBet = currentPage * betsPerPage;
//   const indexOfFirstBet = indexOfLastBet - betsPerPage;

//   // Reverse the bets so the latest ones are at the top
//   const currentBets = [...betPlace]
//     .reverse()
//     .slice(indexOfFirstBet, indexOfLastBet);

//   const totalPages = Math.ceil(betPlace.length / betsPerPage);

//   useEffect(() => {
//     const updateBets = async (period) => {
//       try {
//         const response = await fetch("/api/finnalresult", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ period }),
//         });

//         const data = await response.json();

//         if (data.updatedBalance) {
//           setBalance(data.updatedBalance);
//           setbetPlace(data.allBets);
//         }
//       } catch (error) {
//         console.error("Error updating bets:", error);
//       }
//     };

//     if (period) {
//       updateBets(period);
//     }
//   }, [period]);

//   useEffect(() => {
//     const myBetRecorde = async () => {
//       try {
//         const res = await fetch("/api/mybets");

//         if (res.ok) {
//           const data = await res.json();
//           setbetPlace(data.bets);
//         } else {
//           console.error("Failed to fetch bets:", await res.json());
//         }
//       } catch (error) {
//         console.error("Error fetching bets:", error);
//       }
//     };

//     if (period) {
//       myBetRecorde();
//     }
//   }, [period, balance]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.heading}>
//         <p>🏆 My Parity Record</p>
//       </div>

//       {currentBets.map((bet, index) => (
//         <div
//           key={index}
//           className={styles.betSlip}
//           onClick={() => handleToggle(index)}
//         >
//           {isExpanded === index ? (
//             <div className={styles.details}>
//               <div>Period: {bet.periodNo}</div>
//               <div>Contract Money: {bet.amount}</div>
//               <div>Contract Count: 1</div>
//               <div>
//                 SelectedNumber:{" "}
//                 {bet.number ? bet.number : "number not selected"}
//               </div>
//               <div>Fee: 0.20</div>
//               <div>Open Price: 30689</div>
//               <div>category:{bet.category}</div>
//               <div>
//                 Result: {bet.result} {results.color}
//               </div>
//               <div>
//                 SelectColor: {bet.color ? bet.color : "No Color Selected"}
//               </div>
//               <div>Status: {bet.status}</div>
//               <div>Amount: {bet.amount - 10}</div>
//               <div>Create Time: {new Date().toLocaleString()}</div>
//             </div>
//           ) : (
//             <div className={styles.statusLine}>
//               <span>{bet.period}</span>
//               <span
//                 className={
//                   bet.status === "win"
//                     ? styles.success
//                     : bet.status === "lose"
//                     ? styles.fail
//                     : styles.pending
//                 }
//               >
//                 {bet.status === "Pending"
//                   ? `Pending`
//                   : bet.status === "Win"
//                   ? `Win ${bet.amount}`
//                   : `Fail ${bet.amount - 10}`}
//                 &nbsp; &nbsp; &nbsp;
//                 {`${bet.periodNo}`}
//               </span>
//             </div>
//           )}
//         </div>
//       ))}

//       <div className={styles.pagination}>
//         <button
//           className={styles.pageButton}
//           onClick={() => handlePageChange("prev")}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>{`Page ${currentPage} of ${totalPages}`}</span>
//         <button
//           className={styles.pageButton}
//           onClick={() => handlePageChange("next")}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BetSlip;

import { useContext, useEffect, useState } from "react";
import styles from "./BetSlip.module.css";
import { StoreContext } from "@/app/Context/AccountContext";

const BetSlip = () => {
  const {
    period,
    betPlace,
    results,
    setbetPlace,
    balance,
    setBalance,
    activeCategory, // Get the active category from the context
  } = useContext(StoreContext);

  const [isExpanded, setIsExpanded] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const betsPerPage = 5;

  const handleToggle = (index) => {
    setIsExpanded(isExpanded === index ? null : index);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    setIsExpanded(null);
  };

  // Filter the bets based on the active category
  const filteredBets = activeCategory
    ? betPlace.filter((bet) => bet.category === activeCategory)
    : betPlace;

  const indexOfLastBet = currentPage * betsPerPage;
  const indexOfFirstBet = indexOfLastBet - betsPerPage;

  // Reverse the filtered bets so the latest ones are at the top
  const currentBets = [...filteredBets]
    .reverse()
    .slice(indexOfFirstBet, indexOfLastBet);

  const totalPages = Math.ceil(filteredBets.length / betsPerPage);

  useEffect(() => {
    const updateBets = async (period) => {
      try {
        const response = await fetch("/api/finnalresult", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ period }),
        });

        const data = await response.json();

        if (data.updatedBalance) {
          setBalance(data.updatedBalance);
          setbetPlace(data.allBets);
        }
      } catch (error) {
        console.error("Error updating bets:", error);
      }
    };

    if (period) {
      updateBets(period);
    }
  }, [period]);

  useEffect(() => {
    const myBetRecorde = async () => {
      try {
        const res = await fetch("/api/mybets");

        if (res.ok) {
          const data = await res.json();
          setbetPlace(data.bets);
        } else {
          console.error("Failed to fetch bets:", await res.json());
        }
      } catch (error) {
        console.error("Error fetching bets:", error);
      }
    };

    if (period) {
      myBetRecorde();
    }
  }, [period, balance]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p>🏆 My {activeCategory} Record</p>
      </div>

      {currentBets.map((bet, index) => (
        <div
          key={index}
          className={styles.betSlip}
          onClick={() => handleToggle(index)}
        >
          {isExpanded === index ? (
            <div className={styles.details}>
              <div>Period: {bet.periodNo}</div>
              <div>Contract Money: {bet.amount}</div>
              <div>Contract Count: 1</div>
              <div>
                SelectedNumber:{" "}
                {bet.number ? bet.number : "number not selected"}
              </div>
              <div>Fee: 0.20</div>
              <div>Open Price: 30689</div>
              <div>category: {bet.category}</div>
              <div>
                Result: {bet.result} {results.color}
              </div>
              <div>
                SelectColor: {bet.color ? bet.color : "No Color Selected"}
              </div>
              <div>Status: {bet.status}</div>
              <div>Amount: {bet.amount - 10}</div>
              <div>Create Time: {new Date().toLocaleString()}</div>
            </div>
          ) : (
            <div className={styles.statusLine}>
              <span>{bet.period}</span>
              <span
                className={
                  bet.status === "win"
                    ? styles.success
                    : bet.status === "lose"
                    ? styles.fail
                    : styles.pending
                }
              >
                {bet.status === "Pending"
                  ? `Pending`
                  : bet.status === "Win"
                  ? `Win ${bet.amount}`
                  : `Fail ${bet.amount - 10}`}
                &nbsp; &nbsp; &nbsp;
                {`${bet.periodNo}`}
              </span>
            </div>
          )}
        </div>
      ))}

      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className={styles.pageButton}
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BetSlip;
