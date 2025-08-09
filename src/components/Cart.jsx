import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Cart.module.css";
import ProductModal from "./ProductModal";

export default function Cart({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  setIsLoading,
}) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
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
      {/* Yeni başlık */}
      <h2 className={styles.cartTitle}>
        <span className={styles.cartIcon}>🛒</span>
        Your Shopping Basket
        <small className={styles.cartSubtitle}>
          Review your items before checkout
        </small>
      </h2>

      {cartItems.length === 0 ? (
        <p className={styles.emptyText}>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.image}
                  onClick={() => setSelectedProduct(item)}
                />

                <div className={styles.info}>
                  <h4>{item.title}</h4>

                  <div className={styles.controls}>
                    <button
                      type="button"
                      className={styles.decrease}
                      onClick={() => onDecrease(item.id)}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      –
                    </button>

                    <span className={styles.quantity}>{item.quantity}</span>

                    <button
                      type="button"
                      className={styles.increase}
                      onClick={() => onIncrease(item.id)}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>

                    <span className={styles.itemTotal}>
                      = {(item.price * item.quantity).toFixed(2)} $
                    </span>

                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
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
            <p>
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
      />
    </div>
  );
}
