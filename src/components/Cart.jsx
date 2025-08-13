// src/components/Cart.jsx
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import styles from "./Cart.module.css";
import ProductModal from "./ProductModal";
import { getProductImage } from "../utils/getImage";

export default function Cart({
  cartItems = [],
  onIncrease,
  onDecrease,
  onRemove,
  setIsLoading,
}) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const handleCheckout = () => {
    setIsLoading?.(true);
    setTimeout(() => {
      navigate("/checkout", { state: { total: totalPrice.toFixed(2) } });
      setIsLoading?.(false);
    }, 500);
  };

  return (
    <div className={styles.cartBox}>
      <h2
        className={styles.cartTitle}
        style={{
          backgroundImage: "linear-gradient(135deg, #c85000ff, #feb47b)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        🧺 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className={styles.emptyText}>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={getProductImage(item)}
                  alt={item.title || "product"}
                  className={styles.image}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/img/placeholder.png";
                  }}
                  onClick={() => setSelectedProduct(item)}
                />

                <div className={styles.info}>
                  <h4 title={item.title}>{item.title}</h4>

                  <div className={styles.controls}>
                    <button
                      type="button"
                      className={styles.decrease}
                      onClick={() => onDecrease?.(item.id)}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      –
                    </button>

                    <span className={styles.quantity}>{item.quantity}</span>

                    <button
                      type="button"
                      className={styles.increase}
                      onClick={() => onIncrease?.(item.id)}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>

                    <span className={styles.itemTotal}>
                      ={" "}
                      {(
                        Number(item.price || 0) * Number(item.quantity || 0)
                      ).toFixed(2)}{" "}
                      $
                    </span>

                    <button
                      type="button"
                      onClick={() => onRemove?.(item.id)}
                      aria-label={`Remove ${item.title}`}
                      title="Remove"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalBox}>
            <p className={styles.totalText}>
              Amount 🧾 : <strong>{totalPrice.toFixed(2)} $</strong>
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              className={styles.checkoutButton}
            >
              Buy
            </button>
          </div>
        </>
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        /* onAddToCart burada görünmesin istiyorsan pas geçmek yeterli */
      />
    </div>
  );
}
