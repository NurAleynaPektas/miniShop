import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../api/productApi";
import styles from "./Home.module.css";
import toast from "react-hot-toast";
import ProductModal from "./ProductModal";
import WeeklySlider from "./WeeklySlider";
import FlashDeals from "./FlashDeals";
import HeroSlider from "./HeroSlider"; // Yeni vitrin slider'ı eklendi

export default function Home({ onAddToCart, setIsLoading }) {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        setIsLoading(true);
        setIsPageLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setAllProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error loading products", err);
        toast.error("Something went wrong while loading products.");
      } finally {
        setIsLoading(false);
        setIsPageLoading(false);
      }
    };
    loadAll();
  }, [setIsLoading]);

  const weeklyProducts = allProducts.slice(0, 10);
  const realFlashDeals = allProducts.filter((p) => p.discountPercentage > 30);
  const flashDeals =
    realFlashDeals.length > 0 ? realFlashDeals : allProducts.slice(10, 18);
  const flashNote = realFlashDeals.length === 0 ? "" : null;

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

  const handleCategorySelect = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <div>
      {/* Vitrin slider (Hero Slider) */}
      <HeroSlider />

      <div className={styles.container}>
        {/* Başlık */}
        <h1 id="categoriesSection" className={styles.heading}>
          🛍️ Shop by Category
        </h1>

        {/* Arama ve Kategori Seçimi */}
        <div className={styles.controls}>
          {/* Masaüstü: Kategori butonları */}
          <div className={styles.categoryButtons}>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                className={styles.categoryBtn}
                onClick={() => handleCategorySelect(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Mobil: Kategori dropdown */}
          <select
            className={styles.select}
            onChange={(e) => handleCategorySelect(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Haftanın Ürünleri */}
        <h2 id="weeklySection" className={styles.heading}>
          🔥 Products of the Week
        </h2>
        <WeeklySlider
          products={weeklyProducts}
          onSelect={setSelectedProduct}
          isLoading={isPageLoading}
        />

        {/* Flaş İndirimler */}
        <h2 id="flashSection" className={styles.heading}>
          🔥 Flash Deals
        </h2>
        <FlashDeals
          products={flashDeals}
          onAdd={handleAdd}
          onSelect={setSelectedProduct}
          title="Flash Deals"
          note={flashNote}
          isLoading={isPageLoading}
        />

        {/* Ürün Detay Modal */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            handleAdd(product);
            setSelectedProduct(null);
          }}
        />
      </div>
    </div>
  );
}
