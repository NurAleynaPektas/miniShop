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
        <p className={styles.price}>Price: ${product.price}</p>
        <p className={styles.desc}>{product.description}</p>

        {/* 🔐 Sadece Home sayfasında görünmesi için güvenli kontrol */}
        {typeof onAddToCart === "function" && (
          <button
            className={styles.addBtn}
            onClick={() => onAddToCart(product)}
          >
            + Add to Cart
          </button>
        )}

        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
