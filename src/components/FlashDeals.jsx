import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./FlashDeals.module.css";
import { getProductImage } from "../utils/getImage";

export default function FlashDeals({
  products = [],
  onAdd,
  onSelect,
  title = "Flash Deals ",
  note = null,
  isLoading = false,
  limit = 18,
}) {
  const list = Array.isArray(products) ? products.slice(0, limit) : [];
  const skeletonArray = Array(Math.min(limit, 18)).fill(null);

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.titleTop}>{title} ⚡</h3>}
      {note && <p className={styles.note}>{note}</p>}

      <div className={styles.grid}>
        {isLoading
          ? skeletonArray.map((_, index) => (
              <div key={index} className={styles.card}>
                <Skeleton height={150} className={styles.image} />
                <h3 className={styles.title}>
                  <Skeleton width="80%" />
                </h3>
                <div className={styles.bottom}>
                  <Skeleton width={60} height={30} />
                  <Skeleton width={70} height={30} />
                </div>
              </div>
            ))
          : list.map((product) => (
              <div key={product.id} className={styles.card}>
                <button
                  className={styles.innerCard}
                  onClick={() => onSelect?.(product)}
                  title={product.title}
                >
                  <img
                    src={getProductImage(product)}
                    alt={product.title}
                    className={styles.image}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/img/placeholder.png";
                    }}
                  />
                  <h3 className={styles.title}>
                    {product.title?.length > 20
                      ? product.title.slice(0, 20) + "..."
                      : product.title}
                  </h3>
                </button>

                <div className={styles.bottom}>
                  <span className={styles.price}>
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <button
                    className={styles.addBtn}
                    onClick={() => onAdd?.(product)}
                    aria-label="Add to cart"
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
