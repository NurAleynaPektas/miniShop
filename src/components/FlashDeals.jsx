import styles from "./FlashDeals.module.css";

export default function FlashDeals({
  products,
  onAdd,
  onSelect,
  title = "Flaş İndirimler",
  note,
}) {
  if (!products.length) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>⚡ {title}</h2>

      {note && <p className={styles.note}>{note}</p>}

      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.innerCard} onClick={() => onSelect(product)}>
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
              <button className={styles.addBtn} onClick={() => onAdd(product)}>
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
