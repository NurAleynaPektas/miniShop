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
        {/* Logo alanı */}
        <NavLink
          to="/"
          className={styles.logo}
          onClick={() => setIsOpen(false)}
        >
          <img src={logo} alt="TrendPick Logo" className={styles.logoImg} />
          <p className={styles.trendPick}>TrendPick</p>
        </NavLink>

        {/* Desktop Menü */}
        <ul className={styles.navLinksDesktop}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
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
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Login
              </NavLink>
            </li>
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

      {/* Mobil Menü */}
      <div className={`${styles.offCanvas} ${isOpen ? styles.open : ""}`}>
        <button className={styles.closeBtn} onClick={toggleMenu}>
          ×
        </button>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/cart"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
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
                <NavLink
                  to="/login"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
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
