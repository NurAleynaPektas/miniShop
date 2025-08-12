import { useLocation } from "react-router-dom";
import styles from "./CheckOut.module.css";

export default function CheckOut({ setIsLoading }) {
  const location = useLocation();
  const total = location.state?.total;

  const handlePayment = () => {
    setIsLoading(true); 
    setTimeout(() => {
      setIsLoading(false); 
      alert("✅ Payment completed successfully!");
    }, 1000); 
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.title}>💳 Payment</h2>
      <p className={styles.amount}>
        Amount : <strong>{total} $</strong>
      </p>

      <button className={styles.button} onClick={handlePayment}>
        Finish Payment
      </button>
    </div>
  );
}
