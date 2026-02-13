import React from "react";

function ContactSection() {
  return (
    <section id="contacto" className="bb-section bb-section--white">
      <div className="container">
        <h2 className="h3 fw-bold mb-3">Contacto</h2>
        <p className="text-muted mb-4">
          Si quieres probar BeeBloom en tus cultivos o tienes dudas sobre cómo
          funciona el sistema, puedes enviarnos una solicitud de prueba.
        </p>

        <div className="row g-4">
          <div className="col-lg-6">
            <form className="bb-form">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" placeholder="Tu nombre" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="tu@mail.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Cuéntanos qué te gustaría polinizar con BeeBloom"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar consulta
              </button>
            </form>
          </div>

          <div className="col-lg-6">
            <div className="bb-card">
              <h3 className="bb-card__title mb-2">Información de contacto</h3>
              <p className="bb-card__text mb-2">
                Este formulario es solo una maqueta. En la integración real se
                conectará con el backend de BeeBloom y el envío de emails.
              </p>
              <p className="bb-card__text mb-1">
                <strong>Email:</strong> contacto@beebloom.app
              </p>
              <p className="bb-card__text mb-0">
                <strong>Teléfono:</strong> +34 600 000 000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;