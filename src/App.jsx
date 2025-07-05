import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Nabvar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";

function PrivateRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children, isLoggedIn }) {
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}

function App() {
  // Başlangıçta token varsa true yap
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sepete ürün ekleme fonksiyonu
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      // Sepette var mı kontrol et
      const existingProduct = prevItems.find((item) => item.id === product.id);

      if (existingProduct) {
        // Varsa, adetini 1 artır
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Yoksa, yeni ürün olarak ekle (adet 1)
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Sepette ürün adedini artır
  const handleIncrease = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Sepette ürün adedini azalt
  const handleDecrease = (productId) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // 0 olursa sepetten çıkar
    );
  };
  // Sepetten tamamen ürün sil
  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Login başarılı olduktan sonra çağrılacak fonksiyon:
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Logout fonksiyonu:
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Toaster position="top-right" />
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
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Home onAddToCart={handleAddToCart} />
            </PrivateRoute>
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
              />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
