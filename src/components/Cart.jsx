import styles from "./Cart.module.css";

export default function Cart({ cartItems }) {
  // Sepet toplam fiyat
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartBox}>
      <h2>🛒 Sepetim</h2>
      {cartItems.length === 0 ? (
        <p>Sepet boş.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                {item.title} - {item.price}$ x {item.quantity} ={" "}
                {(item.price * item.quantity).toFixed(2)}$
              </li>
            ))}
          </ul>
          <p className={styles.total}>Toplam: {totalPrice.toFixed(2)} $</p>
        </>
      )}
    </div>
  );
}
