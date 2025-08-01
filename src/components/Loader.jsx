import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default function Loader({ loading = true }) {
  return (
    <div className={styles.loaderWrapper}>
      <ClipLoader
        loading={loading}
        size={60}
        color="#de6e1b"
        aria-label="Loading Spinner"
      />
    </div>
  );
}
