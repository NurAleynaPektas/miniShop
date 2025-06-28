import styles from "./Cart.module.css";

export default function Cart({ cartItems }) {
  return (
    <div className={styles.cartBox}>
      <h2>🛒 Sepet</h2>
      {cartItems.length === 0 ? (
        <p>Sepet boş.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title} - {item.price}$
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
