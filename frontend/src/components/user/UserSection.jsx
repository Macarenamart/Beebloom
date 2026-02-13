import React from "react";

function UserSection() {
  const mission = {
    nombre: "Macarena",
    apellidos: "Ejemplo Apellido",
    parcela: "Polígono 15, Parcela 42",
    dron: "DJI Agras T40",
    estado: "En proceso",
    referencia: "BB-2025-0001",
  };

  return (
    <section id="usuario" className="bb-section bb-section--light">
      <div className="container text-center">
        <h2 className="h3 fw-bold mb-3">Área de usuario</h2>
        <p className="text-muted mb-5">
          Consulta aquí el resumen de tu misión de polinización y descarga tu recibo.
        </p>

        <div className="card bb-card mx-auto" style={{ maxWidth: "720px" }}>
          <div className="bb-card__body p-4">
            <div className="row text-start g-4">
              <div className="col-md-6">
                <h3 className="h6 fw-semibold mb-2 text-uppercase">Datos del cliente</h3>
                <p className="mb-1">
                  <strong>Nombre:</strong> {mission.nombre}
                </p>
                <p className="mb-1">
                  <strong>Apellidos:</strong> {mission.apellidos}
                </p>
              </div>

              <div className="col-md-6">
                <h3 className="h6 fw-semibold mb-2 text-uppercase">Datos de la misión</h3>
                <p className="mb-1">
                  <strong>Parcela:</strong> {mission.parcela}
                </p>
                <p className="mb-1">
                  <strong>Dron asignado:</strong> {mission.dron}
                </p>
                <p className="mb-1">
                  <strong>Estado:</strong> {mission.estado}
                </p>
                <p className="mb-1">
                  <strong>Referencia:</strong> {mission.referencia}
                </p>
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-5">
              <button type="button" className="btn btn-green">
                Registrar parcela
              </button>
              <button type="button" className="btn btn-primary">
                Imprimir recibo
              </button>
              <button type="button" className="btn btn-orange">
                Salir
              </button>
            </div>

            <p className="small text-bb-muted mt-4 mb-0 fst-italic">
              * Esta vista simula el recibo generado por el sistema. En la integración final se enlazará con la exportación XML.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserSection;