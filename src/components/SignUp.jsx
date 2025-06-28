import { useState } from "react";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basit doğrulama
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Geçici kayıt işlemi
    console.log("Kayıt bilgileri:", formData);
    alert("Kayıt başarılı!");

    // Alanları temizle
    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

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

        <button className={styles.signUpBtn} type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
