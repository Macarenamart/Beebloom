// src/pages/PrivatePanelPage.jsx
import React from "react";

function PrivatePanelPage() {
  return (
    <section className="bb-user-page bb-section bb-section--light">
      <div className="bb-user-shell">
        <header className="bb-user-header">
          <h1 className="bb-user-title">Panel privado BeeBloom</h1>
          <p className="bb-user-subtitle">
            Esta sección está en construcción. Aquí el administrador podrá ver y
            gestionar todas las misiones, drones y usuarios.
          </p>
        </header>

        <div className="bb-user-info">
          <h2 className="bb-user-info__title">Próximamente</h2>
          <p>
            De momento, el backend ya permite crear misiones completas
            (usuario + parcela + misión). Esta pantalla se conectará más
            adelante a esos datos para mostrar un panel de administración.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PrivatePanelPage;