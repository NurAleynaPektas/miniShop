// src/components/WeeklySlider.jsx
import { useRef, useState, useEffect, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./WeeklySlider.module.css";
import { getProductImage } from "../utils/getImage";

export default function WeeklySlider({
  products = [],
  onSelect,
  isLoading = false,
  title = "🔥 Products of the Week",
}) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const items = useMemo(() => products.slice(0, 20), [products]);

  // Scroll durumuna göre okları aktif/pasif yap
  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < maxScroll - 2);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [products]);

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    // Yaklaşık 3 kart + gap kadar kaydır
    const card = el.querySelector(`.${styles.card}`);
    const cardWidth = card ? card.offsetWidth : 160;
    const gap = 16;
    el.scrollBy({ left: dir * (cardWidth * 3 + gap * 3), behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <div className={styles.sliderShell}> 
        <button
          className={`${styles.nav} ${styles.left}`}
          onClick={() => scrollByCards(-1)}
          disabled={!canLeft || isLoading}
          aria-label="Scroll left"
        >
          ‹
        </button>

        {/* Track */}
        <div className={styles.track} ref={trackRef}>
          {isLoading
            ? Array(8)
                .fill(null)
                .map((_, i) => (
                  <div key={`sk_${i}`} className={styles.card}>
                    <div className={styles.imageWrap}>
                      <Skeleton height={120} />
                    </div>
                    <h4 className={styles.cardTitle}>
                      <Skeleton width={120} />
                    </h4>
                    <div className={styles.metaRow}>
                      <Skeleton width={60} />
                    </div>
                  </div>
                ))
            : items.map((p) => (
                <div
                  key={p.id}
                  className={styles.card}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect?.(p)}
                  onKeyDown={(e) => (e.key === "Enter" ? onSelect?.(p) : null)}
                  title={p.title}
                >
                  {p.discountPercentage > 0 && (
                    <span className={styles.badge}>
                      -{Math.round(p.discountPercentage)}%
                    </span>
                  )}

                  <div className={styles.imageWrap}>
                    <img
                      src={getProductImage(p)}
                      alt={p.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/img/placeholder.png";
                      }}
                    />
                  </div>

                  <h4 className={styles.cardTitle}>
                    {p.title?.length > 38
                      ? p.title.slice(0, 38) + "…"
                      : p.title}
                  </h4>

                  <div className={styles.metaRow}>
                    <span className={styles.price}>
                      ${Number(p.price).toFixed(2)}
                    </span>
                    {p.rating ? (
                      <span
                        className={styles.rating}
                        aria-label={`Rating ${p.rating}`}
                      >
                        ★ {Number(p.rating).toFixed(1)}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
        </div>

        {/* Sağ Fade + Ok */}
      
        <button
          className={`${styles.nav} ${styles.right}`}
          onClick={() => scrollByCards(1)}
          disabled={!canRight || isLoading}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
}
