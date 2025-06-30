import { useState } from "react";
import styles from "./Login.module.css";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const { user, token } = await loginUser(formData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Giriş başarılı!");
      setFormData({ email: "", password: "" });
      setError("");
    } catch (err) {
      setError(err.message || "Giriş başarısız.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
