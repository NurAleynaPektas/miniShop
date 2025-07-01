import { useState } from "react";
import styles from "./Login.module.css";
import { loginUser } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
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
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const { user, token } = await loginUser(formData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Giriş başarılı!");

      setFormData({ email: "", password: "" });
      setError("");

      if (onLogin) onLogin(); // Burada isLoggedIn state güncelleniyor

      navigate("/"); // Ana sayfaya yönlendir
    } catch (err) {
      setError(err.message || "Giriş başarısız.");
      toast.error(err.message || "Giriş başarısız.");
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
