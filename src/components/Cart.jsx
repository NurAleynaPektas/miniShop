import { useNavigate } from "react-router-dom"; // bu satırı en üste ekle
import styles from "./Cart.module.css";
export default function Cart({ cartItems, onIncrease, onDecrease, onRemove }) {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout", { state: { total: totalPrice.toFixed(2) } });
  };

  return (
    <div className={styles.cartBox}>
      <h2 className={styles.cartTitle}>🛒 My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <h4>{item.title}</h4>
                  <div className={styles.controls}>
                    <button
                      className={styles.decrease}
                      onClick={() => onDecrease(item.id)}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.increase}
                      onClick={() => onIncrease(item.id)}
                    >
                      +
                    </button>
                    <span className={styles.itemTotal}>
                      = {(item.price * item.quantity).toFixed(2)} $
                    </span>
                    <button onClick={() => onRemove(item.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.totalBox}>
            <p>
              Amount 🧾 : <strong>{totalPrice.toFixed(2)} $</strong>
            </p>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Buy
            </button>
          </div>
        </>
      )}
    </div>
  );
}
