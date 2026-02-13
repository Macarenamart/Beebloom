
import React from "react";

function MissionsPage() {
  return (
    <section
      id="misiones"
      className="bb-missions-page bb-section bb-section--light"
    >
      {/* Cabecera */}
      <header className="bb-missions-header">
        <h1 className="bb-missions-title">Misiones de polinización BeeBloom</h1>
        <p className="bb-missions-intro">
          Una misión es una intervención programada de nuestra flota de drones
          sobre una parcela concreta. Cada misión tiene un precio fijo de{" "}
          <strong>60&nbsp;€</strong> e incluye planificación, vuelo y registro
          de resultados.
        </p>
      </header>

      {}
      <div className="bb-missions-grid">
        <article className="bb-mission-card">
          <h2 className="bb-mission-card__title">Misión estándar</h2>
          <p className="bb-mission-card__subtitle">
            Parcela de tamaño pequeño&nbsp;o&nbsp;mediano.
          </p>
          <ul className="bb-mission-card__list">
            <li>1 vuelo de polinización programado.</li>
            <li>Selección automática del dron más adecuado.</li>
            <li>Informe básico de finalización.</li>
          </ul>
          <p className="bb-mission-card__price">Precio: 60&nbsp;€</p>
        </article>

        <article className="bb-mission-card">
          <h2 className="bb-mission-card__title">Misión intensiva</h2>
          <p className="bb-mission-card__subtitle">
            Cultivos con alta densidad de flores o ventanas muy cortas.
          </p>
          <ul className="bb-mission-card__list">
            <li>Patrones de vuelo optimizados por floración.</li>
            <li>Priorización de drones de mayor autonomía.</li>
            <li>Control extra de condiciones meteorológicas.</li>
          </ul>
          <p className="bb-mission-card__price">Precio: 60&nbsp;€</p>
        </article>

        <article className="bb-mission-card">
          <h2 className="bb-mission-card__title">Misión de seguimiento</h2>
          <p className="bb-mission-card__subtitle">
            Revisión tras una misión previa en la misma parcela.
          </p>
          <ul className="bb-mission-card__list">
            <li>Comparación con misiones anteriores.</li>
            <li>Ajustes de altura y recorridos según resultados.</li>
            <li>Registro para futuras campañas.</li>
          </ul>
          <p className="bb-mission-card__price">Precio: 60&nbsp;€</p>
        </article>
      </div>

      {}
      <section className="bb-missions-flow">
        <h2 className="bb-missions-flow__title">
          ¿Cómo funciona una misión BeeBloom?
        </h2>

        <div className="bb-missions-flow__steps">
          <div className="bb-missions-step">
            <div className="bb-missions-step__badge">1</div>
            <p className="bb-missions-step__text">
              El agricultor contrata una misión desde la pestaña{" "}
              <strong>“Contacto / Contratar misión”</strong>.
            </p>
          </div>

          <div className="bb-missions-step">
            <div className="bb-missions-step__badge">2</div>
            <p className="bb-missions-step__text">
              BeeBloom selecciona el <strong>dron</strong> y la{" "}
              <strong>ventana de vuelo</strong> más adecuadas.
            </p>
          </div>

          <div className="bb-missions-step">
            <div className="bb-missions-step__badge">3</div>
            <p className="bb-missions-step__text">
              La misión se ejecuta y se registra en el área de{" "}
              <strong>Usuario</strong> (icono de abeja).
            </p>
          </div>

          <div className="bb-missions-step">
            <div className="bb-missions-step__badge">4</div>
            <p className="bb-missions-step__text">
              El usuario puede consultar sus misiones y recibos desde la página{" "}
              <strong>“Usuario”</strong>.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default MissionsPage;