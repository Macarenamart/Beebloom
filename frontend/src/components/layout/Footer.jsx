import React from "react";

function Footer() {
  return (
    <footer className="bb-footer">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
        <span className="bb-footer__brand">🐝 BeeBloom · Polinización asistida</span>

        <div className="bb-footer__links">
          <a href="#inicio">Inicio</a>
          <a href="#misiones">Misiones</a>
          <a href="#drones">Drones</a>
          <a href="#contacto">Contacto</a>
        </div>

        <span className="bb-footer__copy">
          &copy; {new Date().getFullYear()} BeeBloom · Proyecto DAW
        </span>
      </div>
    </footer>
  );
}

export default Footer;