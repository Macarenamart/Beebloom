import React from "react";
import DroneCard from "./DroneCard";

function DronesGallery({ drones }) {
  if (!drones || drones.length === 0) {
    return (
      <p className="bb-section-helper">
        De momento no hay drones registrados en la flota.
      </p>
    );
  }

  return (
    <div className="bb-drones-grid">
      {drones.map((d) => (
        <DroneCard key={d.id} drone={d} />
      ))}
    </div>
  );
}

export default DronesGallery;