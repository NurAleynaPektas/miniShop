import { useRef, useState, useEffect, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./WeeklySlider.module.css";
import { getProductImage } from "../utils/getImage";

export default function WeeklySlider({
  products = [],
  onSelect,
  isLoading = false,
  title = " Products of the Week ✨",
  autoplay = true,
  autoplayInterval = 3500,
  pauseOnHover = true,
}) {
  const trackRef = useRef(null);
  const hoverRef = useRef(false);
  const userPausedRef = useRef(false);
  const intervalRef = useRef(null);

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const items = useMemo(() => products.slice(0, 20), [products]);

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
    const card = el.querySelector(`.${styles.card}`);
    const cardWidth = card ? card.offsetWidth : 160;
    const gap = 16;
    el.scrollBy({
      left: dir * (cardWidth * 2 + gap * 2),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shouldRun =
      autoplay &&
      !isLoading &&
      !prefersReduced &&
      document.visibilityState === "visible";

    const start = () => {
      if (intervalRef.current || !shouldRun) return;
      intervalRef.current = setInterval(() => {
        if (hoverRef.current && pauseOnHover) return;
        if (userPausedRef.current) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        const nearEnd = el.scrollLeft >= maxScroll - 4;
        if (nearEnd) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollByCards(1);
        }
      }, Math.max(1500, autoplayInterval));
    };

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    const onVisibility = () => {
      stop();
      if (document.visibilityState === "visible") start();
    };

    const onMouseEnter = () => {
      hoverRef.current = true;
    };
    const onMouseLeave = () => {
      hoverRef.current = false;
    };
    const onPointerDown = () => {
      userPausedRef.current = true;
    };
    const onPointerUp = () => {
      userPausedRef.current = false;
    };

    if (pauseOnHover) {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    }
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      if (pauseOnHover) {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      }
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [autoplay, autoplayInterval, pauseOnHover, isLoading, products]);

  return (
    <div className={styles.wrapper}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <div className={styles.sliderShell}>
        <div className={`${styles.fade} ${styles.fadeLeft}`} aria-hidden />
        <button
          className={`${styles.nav} ${styles.left}`}
          onClick={() => scrollByCards(-1)}
          disabled={!canLeft || isLoading}
          aria-label="Scroll left"
        >
          ‹
        </button>

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

        <div className={`${styles.fade} ${styles.fadeRight}`} aria-hidden />
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
