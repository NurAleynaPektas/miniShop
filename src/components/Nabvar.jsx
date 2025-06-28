import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../img/TrendPick.png";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="TrendPick Logo" className={styles.logoImg} />
      </div>

      <button className={styles.hamburger} onClick={toggleMenu}>
        <span className={isOpen ? styles.barActive : styles.bar}></span>
        <span className={isOpen ? styles.barActive : styles.bar}></span>
        <span className={isOpen ? styles.barActive : styles.bar}></span>
      </button>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" onClick={() => setIsOpen(false)}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" onClick={() => setIsOpen(false)}>
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
