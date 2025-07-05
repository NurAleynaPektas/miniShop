import { useState } from "react";
import styles from "./Login.module.css";
import { loginUser } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

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
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const { user, token } = await loginUser(formData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Successfully logged in!");

      setFormData({ email: "", password: "" });
      setError("");

      if (onLogin) onLogin();

      navigate("/");
    } catch (err) {
      setError(err.message || "Fail to login.");
      toast.error(err.message || "Fail to login.");
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

      <p className={styles.signupLink}>
        Don't have an account?{" "}
        <Link to="/signup" className={styles.linkText}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
