
import React from "react";
import { useNavigate } from "react-router-dom";
import NewMissionForm from "../components/contact/NewMissionForm";

function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="bb-contact-page">
      {}
      <div className="bb-contact-layout">
        {}
        <section className="bb-contact-login">
          <h2>Acceso para clientes</h2>
          <p className="text-muted">
            Si ya has contratado una misión, accede a tu área privada para ver su
            estado y descargar los recibos.
          </p>

          <button
            type="button"
            className="bb-btn-outline bb-btn-pill"
            onClick={() => navigate("/usuario")}
          >
            Ir a mi área de usuario
          </button>
        </section>

        {}
        <section className="bb-contact-new-mission">
          <h2>Contratar una nueva misión</h2>
          <p className="text-muted">
            Completa los datos para registrar tu parcela y programar una misión
            de polinización.
          </p>
          <NewMissionForm />
        </section>
      </div>
    </div>
  );
}

export default ContactPage;