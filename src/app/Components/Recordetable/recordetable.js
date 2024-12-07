import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/recordetable.module.css";
import { StoreContext } from "@/app/Context/AccountContext";

const ParityRecordTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const { results, setResults, period, activeCategory, setActiveCategory } =
    useContext(StoreContext);

  async function fetchResults() {
     setResults([]);
    try {
      const response = await fetch("/api/getColorAndNumber?timestamp=${new Date().getTime()}", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchResults();
  }, [period]);

  const records = results;

  const totalPages = Math.ceil(records.length / recordsPerPage);

  const reversedRecords = records;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = reversedRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.Heading}>
        <p style={{ color: "#666666" }}>🏆 {activeCategory} Record</p>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Period</th>
            <th>Price</th>
            <th>Number</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((record, index) => {
              const categoryData = record.results[activeCategory];
              return (
                <tr key={index}>
                  <td style={{ color: "#666666" }}>{record.period}</td>
                  <td style={{ color: "#666666" }}>400000</td>
                  <td
                    className={
                      categoryData.number % 2 === 0
                        ? styles.oddNumber
                        : styles.evenNumber
                    }
                  >
                    {categoryData.number}
                  </td>
                  <td>
                    <span
                      className={
                        categoryData.color === "green"
                          ? styles.resultWin
                          : styles.resultLose
                      }
                    >
                      {categoryData.color === "green"
                        ? "🟢"
                        : categoryData.color === "green-violet"
                        ? "🟢🟣"
                        : categoryData.color === "red"
                        ? "🔴"
                        : "🔴🟣"}
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No data to show</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <div>
          <button
            className={styles.pageButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ❮
          </button>
          <button
            className={styles.pageButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParityRecordTable;
