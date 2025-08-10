import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default function Loader({ loading = true }) {
  if (!loading) return null;
  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.backdrop} />
      <ClipLoader size={60} color="var(--brand)" aria-label="Loading Spinner" />
    </div>
  );
}
