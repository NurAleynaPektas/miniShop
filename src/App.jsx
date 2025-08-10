import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Nabvar";
import SignUp from "./components/SignUp";
import Checkout from "./components/CkeckOut";
import Cart from "./components/Cart";
import CategoryPage from "./components/CategoryPage";
import CategoriesPage from "./components/CategoriesPage";
import Loader from "./components/Loader";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./theme/ThemeProvider";

/* --------- Özel Route bileşenleri --------- */
function PrivateRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children, isLoggedIn }) {
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}

/* --------- (Opsiyonel) Route değişince sayfanın başına dön --------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  const [userName, setUserName] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.name || "";
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isLoading, setIsLoading] = useState(false); // Global loader

  // Sepeti sakla
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Login/Logout
  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserName(user?.name || "");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
  };

  // Sepet işlemleri
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleIncrease = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <ThemeProvider>
      {isLoading && <Loader />}

      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userName={userName}
      />

      <Toaster position="top-right" />
      <ScrollToTop />

      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Login onLogin={handleLogin} />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <Home onAddToCart={handleAddToCart} setIsLoading={setIsLoading} />
          }
        />

        <Route
          path="/category/:categorySlug"
          element={
            <CategoryPage
              onAddToCart={handleAddToCart}
              setIsLoading={setIsLoading}
            />
          }
        />

        <Route
          path="/categories"
          element={
            <CategoriesPage
              onAddToCart={handleAddToCart}
              setIsLoading={setIsLoading}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Cart
                cartItems={cartItems}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemoveItem}
                setIsLoading={setIsLoading}
              />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Checkout setIsLoading={setIsLoading} />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
