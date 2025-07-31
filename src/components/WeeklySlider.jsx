import styles from "./WeeklySlider.module.css";

export default function WeeklySlider({ products, onSelect }) {
  if (!products.length) return null;

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        {products.map((product) => (
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
