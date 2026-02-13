import React from "react";

function MissionsSection() {
  const scrollToContact = (event) => {
    event.preventDefault();
    const contactSection = document.querySelector("#contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="misiones" className="bb-missions-section">
      <div className="container">
        <h2 className="text-bb-heading mb-3">Misiones de polinización</h2>
        <p className="text-bb-muted mb-4">
          Aquí el agricultor ve un resumen de las misiones disponibles o en curso.
          En la versión final esta sección se conectará con el backend para listar
          las misiones reales.
        </p>

        {}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card bb-card">
              <div className="card-body">
                <h3 className="h6 fw-bold mb-2">Girasoles · Cádiz</h3>
                <p className="small mb-1">Dron: DJI Agras T40</p>
                <p className="small mb-0">Estado: Planificada</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bb-card">
              <div className="card-body">
                <h3 className="h6 fw-bold mb-2">Viñedo · Jerez</h3>
                <p className="small mb-1">Dron: Matrice 300 RTK</p>
                <p className="small mb-0">Estado: En curso</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bb-card">
              <div className="card-body">
                <h3 className="h6 fw-bold mb-2">Cítricos · Huelva</h3>
                <p className="small mb-1">Dron: Blue Robotics AgriDrone</p>
                <p className="small mb-0">Estado: Completada</p>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary bb-btn-3d"
            onClick={scrollToContact}
          >
            Contratar una misión
          </button>
        </div>
      </div>
    </section>
  );
}

export default MissionsSection;