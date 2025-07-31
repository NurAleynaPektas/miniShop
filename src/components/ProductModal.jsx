import React from "react";
import styles from "./ProductModal.module.css";

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
        <h2 className={styles.title}>{product.title}</h2>

        <p className={styles.desc}>{product.description}</p>

        <div className={styles.controls}>
          
          <p className={styles.price}> ${product.price}</p>
          <button
            className={styles.addBtn}
            onClick={() => onAddToCart(product)}
          >
            + Add to Cart
          </button>
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
