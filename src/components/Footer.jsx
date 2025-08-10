import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        {/* SOL (brand) */}
        <div className={s.brand}>
          <span className={s.name}>Nur Aleyna Pektaş</span>
          <span className={s.role}>
            Frontend Developer · React &amp; Node.js
          </span>
        </div>

        {/* SAĞ (contact) */}
        <div className={s.contact}>
          <a href="mailto:nuraleynaaaa@gmail.com" className={s.link}>
            nuraleynaaaa@gmail.com
          </a>
          <a href="tel:+905010948138" className={s.link}>
            +90 501 094 8138
          </a>
        </div>

        {/* ALTA TEK SATIR (links) */}
        <div className={s.links}>
          <a
            href="https://github.com/NurAleynaPektas"
            target="_blank"
            rel="noreferrer"
            className={s.link}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nur-aleyna-pekta%C5%9F-16b401332/"
            target="_blank"
            rel="noreferrer"
            className={s.link}
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className={s.copy}>
        © {new Date().getFullYear()} Nur Aleyna Pektaş. All rights reserved.
      </div>
    </footer>
  );
}
