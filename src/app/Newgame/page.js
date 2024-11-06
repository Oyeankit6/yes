import styles from "../styles/New.module.css";
import { assets } from "../../../public/assets/assets";

const crowns = [
  {
    id: 1,
    name: "WinGo(1min)",
    imageUrl: assets.item9,
  },
  {
    id: 2,
    name: "WinGo(3min)",
    imageUrl: assets.item10,
  },
  {
    id: 3,
    name: "WinGo(5min)",
    imageUrl: assets.item11,
  },
];

const CrownGrid = () => {
  return (
    <>
      <div className={styles.gridContainer}>
        {crowns.map((crown) => (
          <div key={crown.id} className={styles.crownCard}>
            <img
              src={crown.imageUrl}
              alt={crown.name}
              className={styles.crownImage}
            />
            <p className={styles.crownName}>{crown.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CrownGrid;
