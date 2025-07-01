import { useState } from "react";
import styles from "./Login.module.css";
import { loginUser } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Lütfen tüm alanları doldurun.");
      toast.error("Lütfen tüm alanları doldurun.", {
        style: {
          border: "1px solid #f87171",
          padding: "16px",
          color: "#7f1d1d",
          background: "#fef2f2",
        },
        iconTheme: {
          primary: "#dc2626",
          secondary: "#fef2f2",
        },
      });
      return;
    }

    try {
      const { user, token } = await loginUser(formData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Giriş başarılı!", {
        style: {
          border: "1px solid #4ade80",
          padding: "16px",
          color: "#166534",
          background: "#ecfdf5",
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#ecfdf5",
        },
      });

      setFormData({ email: "", password: "" });
      setError("");

      navigate("/"); // Girişten sonra ana sayfaya yönlendirme
    } catch (err) {
      setError(err.message || "Giriş başarısız.");
      toast.error(err.message || "Giriş başarısız.", {
        style: {
          border: "1px solid #f87171",
          padding: "16px",
          color: "#7f1d1d",
          background: "#fef2f2",
        },
        iconTheme: {
          primary: "#dc2626",
          secondary: "#fef2f2",
        },
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          className={styles.loginInput}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className={styles.loginInput}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.loginBtn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
