import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../img/trendPick (2).png";
import { FiLogOut } from "react-icons/fi";

export default function Navbar({ isLoggedIn, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} alt="TrendPick Logo" className={styles.logoImg} />
          <p className={styles.trendPick}>TrendPick</p>
        </div>

        {/* Desktop Menü */}
        <ul className={styles.navLinksDesktop}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li className={styles.logoutListItem}>
                <button
                  className={styles.logoutBtn}
                  onClick={handleLogoutClick}
                  type="button"
                >
                  <FiLogOut style={{ marginRight: "8px" }} />
                  Exit
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger - Mobil */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={isOpen ? styles.barActive : styles.bar}></span>
          <span className={isOpen ? styles.barActive : styles.bar}></span>
          <span className={isOpen ? styles.barActive : styles.bar}></span>
        </button>
      </nav>

      {/* Backdrop */}
      {isOpen && <div className={styles.backdrop} onClick={toggleMenu}></div>}

      {/* Off-canvas menu - Mobil */}
      <div className={`${styles.offCanvas} ${isOpen ? styles.open : ""}`}>
        <button className={styles.closeBtn} onClick={toggleMenu}>
          ×
        </button>
        <ul className={styles.navLinks}>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/cart" onClick={toggleMenu}>
                  Cart
                </NavLink>
              </li>
              <li className={styles.logoutListItem}>
                <button
                  className={styles.logoutBtn}
                  onClick={handleLogoutClick}
                  type="button"
                >
                  <FiLogOut style={{ marginRight: "8px" }} />
                  Exit
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" onClick={toggleMenu}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" onClick={toggleMenu}>
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
