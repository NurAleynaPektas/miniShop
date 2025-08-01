import { useLocation } from "react-router-dom";
import styles from "./CheckOut.module.css";

export default function CheckOut({ setIsLoading }) {
  const location = useLocation();
  const total = location.state?.total;

  const handlePayment = () => {
    setIsLoading(true); // Loader’ı aç
    setTimeout(() => {
      setIsLoading(false); // Loader’ı kapat
      alert("✅ Payment completed successfully!");
    }, 1000); // 1 saniyelik estetik yükleme süresi
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
