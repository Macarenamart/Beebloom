
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import drone1 from "../../recursos/hero-drone-1.jpg";
import drone2 from "../../recursos/hero-drone-2.jpg";
import drone3 from "../../recursos/hero-drone-3.jpg";
import drone4 from "../../recursos/hero-drone-4.jpg";
import drone5 from "../../recursos/hero-drone-5.jpg";

function Hero() {
  const slides = [drone1, drone2, drone3, drone4, drone5];
  const [current, setCurrent] = useState(0);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="inicio" className="bb-hero bb-section bb-section--light">
      <div className="bb-hero-shell">
        {}
        <div className="bb-hero-left" aria-hidden="true" />

        {}
        <div className="bb-hero-right">
          <div className="bb-hero-copy">
            <h1 className="bb-home-title">
              POLINIZACIÓN ASISTIDA CON DRONES PARA CUIDAR TUS CULTIVOS.
            </h1>

            <p className="bb-home-subtitle">
              BeeBloom te ayuda a registrar parcelas, asignar drones y seguir
              el estado de cada misión de polinización.
            </p>

            <div className="bb-home-buttons">
              <Link
                to="/contacto"
                className="bb-hero-cta bb-hero-cta--primary"
              >
                Iniciar sesión
              </Link>

              <Link to="/drones" className="bb-hero-cta bb-hero-cta--ghost">
                Ver catálogo de drones
              </Link>
            </div>
          </div>

          {}
          <div className="bb-hero-carousel">
            <div className="bb-hero-carousel__viewport">
              <img
                src={slides[current]}
                alt="Dron polinizando"
                className="bb-hero-carousel__image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;