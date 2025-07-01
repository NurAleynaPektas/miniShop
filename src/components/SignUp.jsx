import { useState } from "react";
import styles from "./SignUp.module.css";
import { registerUser } from "../api/authApi";
import toast from "react-hot-toast";

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
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const newUser = await registerUser(formData);
      toast.success("Successfully registered!", {
        style: {
          border: "1px solid #4ade80",
          padding: "16px",
          color: "#166534",
        },
        iconTheme: {
          primary: "#4ade80",
          secondary: "#dcfce7",
        },
      });
      setFormData({ name: "", email: "", password: "" });
      setError("");
    } catch (err) {
      const errorMessage =
        err.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, {
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
