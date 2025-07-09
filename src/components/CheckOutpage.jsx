import { useLocation } from "react-router-dom";
import styles from "./CheckOutPage.module.css";

export default function CheckOutPage() {
  const location = useLocation();
  const total = location.state?.total;

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.title}>💳 Payment</h2>
      <p className={styles.amount}>
        Amount : <strong>{total} $</strong>
      </p>

      <button
        className={styles.button}
        onClick={() => alert("Payment completed successfully!")}
      >
        Finish Payment
      </button>
    </div>
  );
}
