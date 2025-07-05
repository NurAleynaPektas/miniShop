import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../api/productApi";
import styles from "./Home.module.css";
import toast from "react-hot-toast";


export default function Home({ onAddToCart }) {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm("");
    setSelectedCategory("all");
  }, [location.pathname]);

  const categoryName =
    selectedCategory === "all"
      ? "All Products"
      : categories.find((cat) => cat.slug === selectedCategory)?.name ||
        "Products";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data =
          selectedCategory === "all"
            ? await fetchProducts()
            : await fetchProductsByCategory(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleAdd = (product) => {
    const isInCart = JSON.parse(localStorage.getItem("cartItems") || "[]").some(
      (item) => item.id === product.id
    );

    if (isInCart) {
      toast.error("❗ Already in cart!");
    } else {
      onAddToCart(product);
      toast.success("✅ Added to cart!");
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🛍️ {categoryName}</h1>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedCategory("all");
          }}
          className={styles.searchInput}
        />

        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSearchTerm("");
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className={styles.notFound}>😔 No product found !</p>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.innerCard}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.image}
                />
                <h2 className={styles.title}>
                  {product.title.length > 20
                    ? product.title.slice(0, 20) + "..."
                    : product.title}
                </h2>
              </div>
              <p className={styles.price}>{product.price} $</p>
              <button
                className={styles.addBtn}
                onClick={() => handleAdd(product)}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
