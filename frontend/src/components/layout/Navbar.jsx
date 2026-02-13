// src/components/layout/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BeeUserIcon from "../icons/BeeUserIcon";

function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = (event) => {
    event.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="bb-navbar sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Logotipo */}
        <a
          className="navbar-brand fw-bold"
          href="/"
          onClick={handleLogoClick}
        >
          🐝 BeeBloom
        </a>

        {/* Menú principal */}
        <ul className="nav align-items-center m-0">

          <li className="nav-item">
            <NavLink
              to="/misiones"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link--active" : ""}`
              }
            >
              Misiones
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/drones"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link--active" : ""}`
              }
            >
              Drones
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link--active" : ""}`
              }
            >
              Contacto
            </NavLink>
          </li>

          {/* Botón de usuario con icono */}
          <li className="nav-item">
            <NavLink
              to="/usuario"
              className={({ isActive }) =>
                `nav-link nav-link--icon ${isActive ? "nav-link--active" : ""}`
              }
            >
              <BeeUserIcon className="bb-nav-icon" />
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
