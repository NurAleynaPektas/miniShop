import Slider from "react-slick";
import styles from "./HeroSlider.module.css";
import banner1 from "../img/banner1.png";
import banner2 from "../img/banner2.png";
import banner3 from "../img/banner3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroSlider({ onGo }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  const banners = [
    {
      img: banner1,
      title: "New Season",
      btnText: "Shop Now",
      target: "categoriesSection",
    },
    {
      img: banner2,
      title: "Trend Picks",
      btnText: "Discover More",
      target: "weeklySection",
    },
    {
      img: banner3,
      title: "Hot Deals",
      btnText: "Start Shopping",
      target: "flashSection",
    },
  ];

  return (
    <div className={styles.heroWrapper}>
      <Slider {...settings}>
        {banners.map((item, i) => (
          <div key={i} className={styles.slide}>
            <img
              src={item.img}
              alt={`Banner ${i + 1}`}
              className={styles.heroImg}
            />
            <div className={styles.overlay}>
              <h2 className={styles.title}>{item.title}</h2>
              <button
                className={styles.sliderBtn}
                onClick={() => (onGo ? onGo(item.target) : null)}
                aria-label={item.btnText}
              >
                {item.btnText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
