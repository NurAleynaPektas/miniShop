import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./WeeklySlider.module.css";

export default function WeeklySlider({
  products,
  onSelect,
  isLoading = false,
}) {
  const skeletonArray = Array(8).fill(null);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        {isLoading
          ? skeletonArray.map((_, index) => (
              <div key={index} className={styles.card}>
                <Skeleton height={100} className={styles.image} />
                <h3 className={styles.title}>
                  <Skeleton width={80} />
                </h3>
                <p className={styles.price}>
                  <Skeleton width={40} />
                </p>
              </div>
            ))
          : products.map((product) => (
              <div
                key={product.id}
                className={styles.card}
                onClick={() => onSelect(product)}
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
                <p className={styles.price}>{product.price} $</p>
              </div>
            ))}
      </div>
    </div>
  );
}
