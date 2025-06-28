import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import styles from "./Home.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products in Home:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Products</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <div
              style={{
                border: "3px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                textAlign: "center",
                transition: "transform 0.3s ease",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              {" "}
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
              onClick={() => console.log("Ürün eklendi:", product.title)}
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
