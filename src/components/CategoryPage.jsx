import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../api/productApi";
import styles from "./CategoryPage.module.css";
import toast from "react-hot-toast";
import ProductModal from "./ProductModal";
import FlashDeals from "./FlashDeals";

export default function CategoryPage({ onAddToCart, setIsLoading }) {
  const { categorySlug } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true); // 🟠 loader göster
        const [products, categories] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setAllProducts(products);

        const selectedCategory = categories.find(
          (cat) => cat.slug === categorySlug
        );
        setCategoryName(selectedCategory?.name || "Products");
      } catch (error) {
        toast.error("Error loading category data.");
        console.error(error);
      } finally {
        setIsLoading(false); // 🟢 loader gizle
      }
    };

    load();
  }, [categorySlug, setIsLoading]);

  const filtered = allProducts.filter(
    (p) =>
      p.category === categorySlug &&
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (product) => {
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (cart.some((item) => item.id === product.id)) {
      toast.error("❗ Already in cart!");
    } else {
      onAddToCart(product);
      toast.success("✅ Added to cart!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{categoryName}</h1>

      <input
        className={styles.searchInput}
        placeholder="Search in category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className={styles.notFound}>No products found.</p>
      ) : (
        <FlashDeals
          products={filtered}
          onAdd={handleAdd}
          onSelect={setSelectedProduct}
        />
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
