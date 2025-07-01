import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../img/trendPick (2).png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="TrendPick Logo" className={styles.logoImg} />
        <p className={styles.trendPick}>TrendPick</p>
      </div>

      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
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

        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/cart" onClick={() => setIsOpen(false)}>
                Cart
              </NavLink>
            </li>
            <li className={styles.logoutListItem}>
              <button
                className={styles.logoutBtn}
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                type="button"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
}
