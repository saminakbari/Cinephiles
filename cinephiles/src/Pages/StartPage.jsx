import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";
import LOGO from "../assets/logo.svg";
import CAMERA from "../assets/camera.svg";

function Logo() {
  return <img src={LOGO} alt="Cinephiles" className="navbar__logo" />;
}

function FilmstripDivider() {
  const holes = Array.from({ length: 26 });
  return (
    <div className="filmstrip" aria-hidden="true">
      {holes.map((_, i) => (
        <span key={i} className="filmstrip__hole" />
      ))}
    </div>
  );
}

function FilmstripFrame({ children }) {
  const holes = Array.from({ length: 10 });
  return (
    <div className="filmstrip-frame">
      <div className="filmstrip-frame__strip" />
      <div className="filmstrip-frame__body">
        <div className="filmstrip-frame__sprockets" aria-hidden="true">
          {holes.map((_, i) => (
            <span key={`l-${i}`} className="filmstrip-frame__hole" />
          ))}
        </div>
        <div className="filmstrip-frame__panel">{children}</div>
        <div className="filmstrip-frame__sprockets" aria-hidden="true">
          {holes.map((_, i) => (
            <span key={`r-${i}`} className="filmstrip-frame__hole" />
          ))}
        </div>
      </div>
      <div className="filmstrip-frame__strip" />
    </div>
  );
}

function Button({ children, variant = "primary", size = "md", onClick }) {
  const classNames = ["btn", `btn--${variant}`, size === "lg" ? "btn--lg" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}

const FEATURES = [
  { title: "Quick search", desc: "Find any title in seconds, pulled straight from IMDb." },
  { title: "Your library", desc: "Save movies into your own custom lists and categories." },
  { title: "Rate and review", desc: "Star-rate what you've watched and write down your take." },
];

export default function CinephilesLanding() {
  const navigate = useNavigate();
  const goToSignup = () => navigate("/signup");
  const goToLogin = () => navigate("/login");

  return (
    <div className="page" dir="ltr" lang="en">
      <nav className="navbar">
        <Logo />
        <div className="navbar__actions">
          <Button variant="ghost" onClick={goToLogin}>Log in</Button>
          <Button variant="primary" onClick={goToSignup}>Sign up</Button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-visual">
          <FilmstripFrame>
            <span className="hero__eyebrow">Your personal movie library</span>
            <h1 className="hero__title">
              Every film you've loved,
              <br />
              One place to keep them.
            </h1>
            <p className="hero__subtitle">
              Search thousands of titles, rate what you've watched, write
              down how they made you feel, and build lists that actually
              mean something to you.
            </p>
          </FilmstripFrame>
          <img src={CAMERA} alt="" className="hero-visual__camera" aria-hidden="true" />
        </div>
      </section>

      <FilmstripDivider />

      <section className="features">
        {FEATURES.map((item, i) => (
          <div className="feature-card" key={i}>
            <h3 className="feature-card__title">{item.title}</h3>
            <p className="feature-card__desc">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}