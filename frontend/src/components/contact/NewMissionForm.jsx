
import React, { useState } from "react";
import { createMissionRequest } from "../../services/api";
import ParcelMap from "./ParcelMap";

const DRONE_OPTIONS = [
  { id: 1, name: "Drone A (ligero)" },
  { id: 2, name: "Drone B (resistente al viento)" },
  { id: 3, name: "Drone C (alta capacidad)" },
];

const NOTIFY_OPTIONS = ["Email", "SMS", "WhatsApp"];

function NewMissionForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    parcelName: "",
    parcelAddress: "",
    parcelGeoJSON: null, 
    droneId: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    notifications: "Email",
    startDate: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const MISSION_PRICE = 60;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleParcelGeoJSONChange = (geojson) => {
    console.log("[NewMissionForm] GeoJSON recibido:", geojson);
    setForm((prev) => ({
      ...prev,
      parcelGeoJSON: geojson || null,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validación básica
    if (
      !form.firstName ||
      !form.lastName ||
      !form.parcelName ||
      !form.username ||
      !form.password ||
      !form.email
    ) {
      setError("Por favor, rellena los campos obligatorios marcados con *.");
      setLoading(false);
      return;
    }

    //Comprobar que hay polígono dibujado
    if (!form.parcelGeoJSON) {
      setError(
        "Por favor, dibuja el perímetro de la parcela en el mapa antes de enviar el formulario."
      );
      setLoading(false);
      return;
    }

    //Teléfono obligatorio para SMS / WhatsApp
    if (
      (form.notifications === "SMS" || form.notifications === "WhatsApp") &&
      !form.phone
    ) {
      setError(
        "Debes indicar un número de teléfono si quieres recibir notificaciones por SMS o WhatsApp."
      );
      setLoading(false);
      return;
    }

    try {
      console.log(
        "[NewMissionForm] Enviando formulario con parcelGeoJSON:",
        form.parcelGeoJSON
      );

      const result = await createMissionRequest(form);

      console.log("Respuesta del backend al crear misión:", result);

      setSuccess(
        "Hemos registrado tu solicitud de misión correctamente. Te contactaremos en cuanto asignemos un dron."
      );

      // Reset parcial
      setForm((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        parcelName: "",
        parcelAddress: "",
        parcelGeoJSON: null,
        droneId: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        startDate: "",
        notifications: prev.notifications || "Email",
      }));
    } catch (err) {
      console.error(err);
      setError(err.message || "Ha ocurrido un error al crear la misión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bb-contact-block bb-contact-new">
      <h2 className="h4 mb-3">Quiero contratar una misión</h2>
      <p className="bb-text-muted">
        Rellena los datos de la parcela y te asignaremos un dron polinizador.
        Todas las misiones tienen un precio fijo de{" "}
        <strong>{MISSION_PRICE} €</strong>.
      </p>

      <form onSubmit={handleSubmit} className="bb-form">
        {}
        <div className="bb-contact-grid-2">
          <div className="bb-field-group">
            <label htmlFor="firstName">
              Nombre <span className="bb-field-required">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              className="bb-input"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="bb-field-group">
            <label htmlFor="lastName">
              Apellidos <span className="bb-field-required">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              className="bb-input"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {}
        <div className="bb-field-group">
          <label htmlFor="parcelName">
            Nombre de la parcela <span className="bb-field-required">*</span>
          </label>
          <input
            id="parcelName"
            type="text"
            className="bb-input"
            name="parcelName"
            value={form.parcelName}
            onChange={handleChange}
          />
        </div>

        {}
        <div className="bb-field-group">
          <label htmlFor="parcelAddress">
            Dirección / referencia de la parcela
          </label>
          <input
            id="parcelAddress"
            type="text"
            className="bb-input"
            name="parcelAddress"
            value={form.parcelAddress}
            onChange={handleChange}
          />
        </div>

        {}
        <div className="bb-field-group">
          <label>Mapa de la parcela</label>
          <p className="bb-text-muted">
            Dibuja el perímetro aproximado de tu parcela en el mapa.
          </p>

          <ParcelMap onChange={handleParcelGeoJSONChange} />

          {}
          <p
            className="bb-text-hint"
            style={{
              marginTop: "0.6rem",
              fontWeight: "600",
              color: form.parcelGeoJSON ? "green" : "red",
            }}
          >
            Estado del polígono:{" "}
            {form.parcelGeoJSON ? "✅ capturado" : "❌ no capturado aún"}
          </p>
        </div>

        {}
        <div className="bb-contact-grid-2">
          <div className="bb-field-group">
            <label htmlFor="droneId">Dron asignado</label>
            <select
              id="droneId"
              className="bb-select"
              name="droneId"
              value={form.droneId}
              onChange={handleChange}
            >
              <option value="">Elegir dron disponible…</option>
              {DRONE_OPTIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bb-field-group">
            <label htmlFor="startDate">Fecha prevista de inicio</label>
            <input
              id="startDate"
              type="date"
              className="bb-input"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <hr className="bb-form-divider" />

        {}
        <div className="bb-contact-grid-2">
          <div className="bb-field-group">
            <label htmlFor="username">
              Usuario <span className="bb-field-required">*</span>
            </label>
            <input
              id="username"
              type="text"
              className="bb-input"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="bb-field-group">
            <label htmlFor="password">
              Contraseña <span className="bb-field-required">*</span>
            </label>
            <input
              id="password"
              type="password"
              className="bb-input"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {}
        <div className="bb-field-group">
          <label htmlFor="email">
            Email <span className="bb-field-required">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="bb-input"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {}
        <div className="bb-field-group">
          <label htmlFor="phone">
            Teléfono{" "}
            {form.notifications !== "Email" && (
              <span className="bb-field-required">*</span>
            )}
          </label>
          <input
            id="phone"
            type="tel"
            className="bb-input"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Ej: 612345678"
          />
        </div>

        {}
        <div className="bb-field-group">
          <label htmlFor="notifications">
            Cómo quieres recibir notificaciones
          </label>
          <select
            id="notifications"
            className="bb-select"
            name="notifications"
            value={form.notifications}
            onChange={handleChange}
          >
            {NOTIFY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <p className="bb-text-hint">
            Si eliges SMS o WhatsApp, necesitaremos un número de teléfono.
          </p>
        </div>

        {}
        {error && <p className="bb-form-error">{error}</p>}
        {success && <p className="bb-form-success">{success}</p>}

        {}
        <button
          type="submit"
          className="bb-btn bb-btn-primary bb-btn-block"
          disabled={loading}
        >
          {loading ? "Enviando solicitud..." : "Enviar solicitud de misión"}
        </button>
      </form>
    </section>
  );
}

export default NewMissionForm;