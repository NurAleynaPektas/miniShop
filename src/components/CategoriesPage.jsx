import { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "../api/productApi";
import styles from "./CategoriesPage.module.css";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductModal";
import toast from "react-hot-toast";
import FlashDeals from "./FlashDeals";

export default function CategoriesPage({ onAddToCart, setIsLoading }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [allProducts, allCategories] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(allProducts);
        setCategories(allCategories);
      } catch (error) {
        toast.error("Error loading data.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [setIsLoading]);

  const filteredProducts = products.filter((p) =>
    (p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (slug) => {
    if (slug) navigate(`/category/${slug}`);
  };

  const handleAdd = (product) => {
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const exists = cart.some((item) => item.id === product.id);
    if (exists) {
      toast.error("❗ Already in cart!");
    } else {
      onAddToCart(product);
      toast.success("✅ Added to cart!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>🛍️ All Categories</h1>

        {/* Search + (Mobile) Category Select */}
        <div className={styles.searchFilterWrapper}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className={styles.mobileCategorySelect}
            onChange={(e) => handleCategoryClick(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Category
            </option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name || cat.label || cat.slug}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Category Buttons */}
      <div className={styles.categoryButtons}>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug)}
            className={styles.categoryBtn}
          >
            {cat.name || cat.label || cat.slug}
          </button>
        ))}
      </div>

      {searchTerm && (
        <>
          {filteredProducts.length === 0 ? (
            <p className={styles.notFound}>No matching products found.</p>
          ) : (
            <FlashDeals
              products={filteredProducts}
              onAdd={handleAdd}
              onSelect={setSelectedProduct}
            />
          )}
        </>
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product) => {
          handleAdd(product);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}
