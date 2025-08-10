import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../img/trendPick (2).png";
import { FiLogOut } from "react-icons/fi";

export default function Navbar({ isLoggedIn, onLogout, userName }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    setIsOpen(false);
    navigate("/login");
  };

  const firstName = userName?.split(" ")[0] || "User";

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo */}
        <NavLink
          to="/"
          className={styles.logo}
          onClick={() => setIsOpen(false)}
        >
          <div className={styles.logoContainer}>
            <img src={logo} alt="TrendPick Logo" className={styles.logoImg} />
            <p className={styles.trendPick}>TrendPick</p>
          </div>
        </NavLink>

        {/* Masaüstü Menü */}
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
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Categories
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

        {/* Mobil Hamburger */}
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

      {isLoggedIn && (
        <p className={styles.welcomeUnderLogo}>
          {"Welcome ".split("").map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
              {char}
            </span>
          ))}
          {firstName.split("").map((char, i) => (
            <span
              key={`name-${i}`}
              style={{ animationDelay: `${(i + 8) * 0.05}s` }}
            >
              {char}
            </span>
          ))}
          <span style={{ animationDelay: `${(firstName.length + 9) * 0.05}s` }}>
            🍃
          </span>
        </p>
      )}

      {isOpen && <div className={styles.backdrop} onClick={toggleMenu}></div>}

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
          <li>
            <NavLink
              to="/categories"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Categories
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
