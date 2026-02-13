
import React from "react";

const statusLabels = {
  disponible: "Disponible",
  polinizando: "En misión",
  fuera_de_servicio: "Fuera de servicio",
};

export default function DroneCard({ drone }) {
  const {
    id,
    name,
    model,
    status,
    rangeKm,
    autonomyMin,
    payloadKg,
    description,
    imageUrl,
  } = drone;

  const readableStatus = statusLabels[status] || "Estado desconocido";

  return (
    <article className="bb-drone-card">
      <div className="bb-drone-card__media">
        {imageUrl ? (
          <img src={imageUrl} alt={name} loading="lazy" />
        ) : (
          <div className="bb-drone-card__placeholder">
            <span className="bb-drone-tagline">Dron BeeBloom</span>
          </div>
        )}
      </div>

      <div className="bb-drone-card__body">
        <header className="bb-drone-card__header">
          <h3 className="bb-drone-card__title">{name || `Dron #${id}`}</h3>
          {model && <p className="bb-drone-card__subtitle">{model}</p>}
        </header>

        {description && (
          <p className="bb-drone-card__description">{description}</p>
        )}

        <dl className="bb-drone-card__specs">
          {rangeKm != null && (
            <div className="bb-drone-card__spec">
              <dt>Alcance</dt>
              <dd>{rangeKm} km</dd>
            </div>
          )}
          {autonomyMin != null && (
            <div className="bb-drone-card__spec">
              <dt>Autonomía</dt>
              <dd>{autonomyMin} min</dd>
            </div>
          )}
          {payloadKg != null && (
            <div className="bb-drone-card__spec">
              <dt>Carga útil</dt>
              <dd>{payloadKg} kg</dd>
            </div>
          )}
          {status && (
            <div className="bb-drone-card__spec bb-drone-card__spec--status">
              <dt>Estado</dt>
              <dd className={`bb-drone-status bb-drone-status--${status}`}>
                {readableStatus}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}