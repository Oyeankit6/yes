"use client";
import React, { useState } from "react";
import styles from "../styles/Search.module.css";
import { assets } from "../../../public/assets/assets";

const products = [
  {
    id: 1,
    name: "Yellow Chimes A5 Grade American Crystal Traditional Gold Plated Without Piercing Combo Nose Pins for Women & Girls",
    price: "1754.00",
    imageUrl: assets.item1,
  },
  {
    id: 2,
    name: "PC Jeweller The Quizmu 18KT Yellow Gold and Diamond Nose Pin for Women",
    price: "19888.00",
    imageUrl: assets.item2,
  },
  {
    id: 3,
    name: "PC Jeweller The Fallamhain 18KT Yellow Gold and Diamond Nose Pin for Women",
    price: "15666.00",
    imageUrl: assets.item3,
  },
  {
    id: 4,
    name: "PC Jeweller The Cormack 18KT Yellow Gold and Diamond Nose Pin for Women",
    price: "7500.00",
    imageUrl: assets.item4,
  },
];

const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for goods"
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.gridContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productInfo}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.productImage}
                />
                <p className={styles.productPrice}>₹ {product.price}</p>
                <p className={styles.productName}>{product.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
};

export default ProductGrid;
