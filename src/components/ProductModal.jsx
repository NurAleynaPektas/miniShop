import React from "react";
import styles from "./ProductModal.module.css";
import { getProductImage } from "../utils/getImage";

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const img = getProductImage(product);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <img
          src={img}
          alt={product.title || "product"}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/img/placeholder.png";
          }}
        />

        <h2 className={styles.title} title={product.title}>
          {product.title}
        </h2>

        <p className={styles.price}>
          Price: ${Number(product.price).toFixed(2)}
        </p>

        {product.brand ? (
          <p className={styles.meta}>
            <strong>Brand:</strong> {product.brand}
          </p>
        ) : null}

        {product.rating ? (
          <p className={styles.meta}>
            <strong>Rating:</strong> {product.rating}
          </p>
        ) : null}

        <p className={styles.desc}>{product.description}</p>

        {typeof onAddToCart === "function" && (
          <button
            className={styles.addBtn}
            onClick={() => onAddToCart(product)}
          >
            + Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
