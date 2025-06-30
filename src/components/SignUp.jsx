import { useState } from "react";
import styles from "./SignUp.module.css";
import { registerUser } from "../api/authApi";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("Tüm alanlar zorunlu.");
      return;
    }

    try {
      const newUser = await registerUser(formData);
      alert("Kayıt başarılı!");
      console.log("Yeni kullanıcı:", newUser);
      setFormData({ name: "", email: "", password: "" });
      setError("");
    } catch (err) {
      setError("Kayıt başarısız.");
    }
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
