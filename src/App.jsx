import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Nabvar";       // dosya adın buysa kalsın
import SignUp from "./components/SignUp";
import Checkout from "./components/CkeckOut";   // dosya adın buysa kalsın
import Cart from "./components/Cart";
import CategoryPage from "./components/CategoryPage";
import CategoriesPage from "./components/CategoriesPage";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./theme/ThemeProvider";
import Footer from "./components/Footer";

/* Özel Route bileşenleri */
function PrivateRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
function PublicRoute({ children, isLoggedIn }) {
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}

/* Route değişince sayfanın başına dön */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [userName, setUserName] = useState(() => JSON.parse(localStorage.getItem("user"))?.name || "");
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cartItems") || "[]"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const handleIncrease = (id) =>
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const handleDecrease = (id) =>
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0)
    );
  const handleRemoveItem = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <ThemeProvider>
      {/* Tüm sayfayı saran layout */}
      <div className="page">
        {isLoading && <Loader />}
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userName={userName} />
        <Toaster position="top-right" />
        <ScrollToTop />

        {/* İçerik alanı: footer’ı alta iten kısım */}
        <main>
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
            <Route path="/" element={<Home onAddToCart={handleAddToCart} setIsLoading={setIsLoading} />} />
            <Route
              path="/category/:categorySlug"
              element={<CategoryPage onAddToCart={handleAddToCart} setIsLoading={setIsLoading} />}
            />
            <Route
              path="/categories"
              element={<CategoriesPage onAddToCart={handleAddToCart} setIsLoading={setIsLoading} />}
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
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}



