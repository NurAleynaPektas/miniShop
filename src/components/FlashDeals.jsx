import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./FlashDeals.module.css";

export default function FlashDeals({
  products,
  onAdd,
  onSelect,
  title = "Flash Deals",
  note,
  isLoading = false,
  limit = 18, 
}) {
  const skeletonArray = Array(limit).fill(null); 

  const list = products?.slice(0, limit) ?? []; 

  return (
    <div className={styles.container}>
      {note && <p className={styles.note}>{note}</p>}
      <div className={styles.grid}>
        {isLoading
          ? skeletonArray.map((_, index) => (
              <div key={index} className={styles.card}>
                <Skeleton height={150} className={styles.image} />
                <h3 className={styles.title}>
                  <Skeleton width={`80%`} />
                </h3>
                <div className={styles.bottom}>
                  <Skeleton width={60} height={30} />
                  <Skeleton width={70} height={30} />
                </div>
              </div>
            ))
          : list.map((product) => (
              <div key={product.id} className={styles.card}>
                <div
                  className={styles.innerCard}
                  onClick={() => onSelect?.(product)}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.image}
                  />
                  <h3 className={styles.title}>
                    {product.title.length > 20
                      ? product.title.slice(0, 20) + "..."
                      : product.title}
                  </h3>
                </div>
                <div className={styles.bottom}>
                  <span className={styles.price}>{product.price} $</span>
                  <button
                    className={styles.addBtn}
                    onClick={() => onAdd?.(product)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
