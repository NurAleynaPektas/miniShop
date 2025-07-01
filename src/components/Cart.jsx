import styles from "./Cart.module.css";

export default function Cart({ cartItems, onIncrease, onDecrease }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartBox}>
      <h2>🛒 My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Sepet boş.</p>
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
                    <button onClick={() => onDecrease(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncrease(item.id)}>+</button>
                    <span className={styles.itemTotal}>
                      = {(item.price * item.quantity).toFixed(2)} $
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.totalBox}>
            <p>
              🧾 Amount : <strong>{totalPrice.toFixed(2)} $</strong>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
