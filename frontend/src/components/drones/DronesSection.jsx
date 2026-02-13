
import React, { useEffect, useState } from "react";
import DronesGallery from "./DronesGallery";
import { fetchAvailableDrones } from "../../services/api";

const MOCK_DRONES = [
  {
    id: 1,
    name: "Dron A - BeeWorker",
    model: "Ligero de precisión",
    status: "disponible",
    rangeKm: 5,
    autonomyMin: 25,
    payloadKg: 1.2,
    description:
      "Ideal para parcelas pequeñas y cultivos delicados. Muy eficiente en tareas de polinización fina.",
    
  },
  {
    id: 2,
    name: "Dron B - HoneyPilot",
    model: "Resistente al viento",
    status: "polinizando",
    rangeKm: 12,
    autonomyMin: 40,
    payloadKg: 2,
    description:
      "Perfecto para condiciones ventosas y parcelas medianas. Mantiene la estabilidad incluso con rachas.",
   
  },
  {
    id: 3,
    name: "Dron C - FlowerScout",
    model: "Cobertura ampliada",
    status: "disponible",
    rangeKm: 20,
    autonomyMin: 55,
    payloadKg: 3.5,
    description:
      "Nuestro dron para grandes extensiones y campañas intensivas de polinización asistida.",
    
  },
];

function DronesSection() {
  const [drones, setDrones] = useState(MOCK_DRONES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDrones = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAvailableDrones();

        if (Array.isArray(data) && data.length > 0) {
          setDrones(data);
        }
       
      } catch (err) {
        console.error("Error cargando drones:", err);
        setError("No se han podido cargar los drones en este momento.");
      } finally {
        setLoading(false);
      }
    };

    loadDrones();
  }, []);

  return (
    <section id="drones" className="bb-main-section bb-drones-page">
      <header className="bb-section-header">
        <h1 className="bb-section-title">Drones polinizadores BeeBloom</h1>
        <p className="bb-section-subtitle">
          Estos son algunos de los modelos de dron que BeeBloom puede asignar a
          tus misiones de polinización. Cada uno se adapta a distintos tipos de
          cultivo y extensiones de parcela.
        </p>
      </header>

      {loading && (
        <p className="bb-section-helper">Cargando flota disponible…</p>
      )}

      {error && (
        <p className="bb-section-helper bb-section-helper--error">{error}</p>
      )}

      {!loading && !error && (
        <>
          <DronesGallery drones={drones} />

          <aside className="bb-drones-info">
            <h2>¿Cómo asignamos un dron a tu misión?</h2>
            <p>
              Cuando solicitas una misión desde la pestaña{" "}
              <strong>“Contratar misión”</strong>, el sistema selecciona el
              dron más adecuado según:
            </p>
            <ul>
              <li>Tamaño y geometría de la parcela.</li>
              <li>Tipo de cultivo y momento de floración.</li>
              <li>Condiciones meteorológicas previstas.</li>
              <li>Disponibilidad de la flota en tu zona.</li>
            </ul>
            <p>
              Tú solo indicas dónde está tu campo y cuándo necesitas la
              intervención; BeeBloom se encarga del resto.
            </p>
          </aside>
        </>
      )}
    </section>
  );
}

export default DronesSection;