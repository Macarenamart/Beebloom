
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllMissions,
  payMission,
  completeMission,
} from "../services/api";

const STORAGE_KEY = "beebloomAuth";

function formatStatusLabel(status) {
  switch (status) {
    case "programada":
      return "PROGRAMADA";
    case "en_curso":
    case "en curso":
      return "EN CURSO";
    case "completada":
      return "COMPLETADA";
    case "borrador":
      return "BORRADOR";
    case "cancelada":
      return "CANCELADA";
    default:
      return status || "DESCONOCIDO";
  }
}

function AdminPage() {
  const navigate = useNavigate();                       

  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // id de misión en acción
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("todas");

  // Leemos el token del mismo sitio que el área de usuario
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.token) {
          setToken(parsed.token);
        }
      }
    } catch (_) {
      
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    loadMissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loadMissions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAllMissions(token);
      setMissions(data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las misiones.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (missionId) => {
    if (!missionId) return;
    setActionLoading(missionId);
    setError("");
    try {
      await payMission(missionId, {
        payment_method: "admin-panel",
        payment_date: new Date().toISOString(),
      });
      await loadMissions();
    } catch (err) {
      console.error(err);
      setError("No se pudo marcar la misión como pagada.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkCompleted = async (missionId) => {
    if (!missionId) return;
    setActionLoading(missionId);
    setError("");
    try {
      await completeMission(missionId);
      await loadMissions();
    } catch (err) {
      console.error(err);
      setError("No se pudo marcar la misión como completada.");
    } finally {
      setActionLoading(null);
    }
  };

  //cerrar sesión desde el panel admin
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    navigate("/usuario");
  };

  const filteredMissions =
    filterStatus === "todas"
      ? missions
      : missions.filter((m) => m.status === filterStatus);

  return (
    <section className="bb-user-page bb-section bb-section--light">
      <div className="bb-user-shell">
        <header className="bb-user-header bb-user-header--logged">
          <div>
            <h1 className="bb-user-title">Panel de administrador</h1>
            <p className="bb-user-subtitle">
              Gestiona todas las misiones registradas en BeeBloom: estados y
              pagos.
            </p>
          </div>

          {}
          <div className="bb-user-header__actions">
            <button
              type="button"
              className="bb-btn-pill me-2"
              onClick={() => navigate("/usuario")}
            >
              Volver al área de usuario
            </button>

            <button
              type="button"
              className="bb-btn-outline bb-btn-pill"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <section className="bb-user-missions">
          <div className="bb-user-missions__toolbar">
            <h2 className="bb-user-missions__title">Misiones</h2>

            <select
              className="form-select w-auto"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="programada">Programadas</option>
              <option value="en_curso">En curso</option>
              <option value="completada">Completadas</option>
              <option value="borrador">Borrador</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>

          {loading && <p>Cargando misiones...</p>}
          {error && <p className="bb-user-error">{error}</p>}

          {!loading && filteredMissions.length === 0 && (
            <p className="bb-user-missions__empty">
              No hay misiones que coincidan con el filtro seleccionado.
            </p>
          )}

          <div className="bb-user-missions__grid">
            {filteredMissions.map((mission) => (
              <article key={mission.id} className="bb-user-mission-card">
                <header className="bb-user-mission-card__header">
                  <h3>{mission.title}</h3>
                  <span
                    className={`bb-user-mission-card__status bb-user-mission-card__status--${mission.status}`}
                  >
                    {formatStatusLabel(mission.status)}
                  </span>
                </header>

                <p className="bb-user-mission-card__field">
                  <strong>Parcela:</strong>{" "}
                  {mission.Parcel?.name || "Parcela sin nombre"}
                </p>
                <p className="bb-user-mission-card__field">
                  <strong>Fecha inicio:</strong>{" "}
                  {mission.startAt
                    ? String(mission.startAt).slice(0, 10)
                    : "Pendiente"}
                </p>

                {}
                <p className="bb-user-mission-card__field">
                  <strong>Precio:</strong>{" "}
                  {(() => {
                    const raw = mission.price;
                    if (typeof raw === "number") return raw.toFixed(2);
                    const asNumber = Number(raw);
                    if (!Number.isNaN(asNumber)) return asNumber.toFixed(2);
                    return raw || "60.00";
                  })()}{" "}
                  €
                </p>

                <p className="bb-user-mission-card__field">
                  <strong>Pago:</strong>{" "}
                  {mission.payment_status || "pendiente"}
                </p>

                <footer className="bb-user-mission-card__footer bb-user-mission-card__footer--double">
                  <button
                    type="button"
                    className="bb-btn-outline bb-btn-sm"
                    onClick={() => handleMarkPaid(mission.id)}
                    disabled={actionLoading === mission.id}
                  >
                    {actionLoading === mission.id
                      ? "Guardando..."
                      : "Marcar pagada"}
                  </button>

                  <button
                    type="button"
                    className="bb-btn-outline bb-btn-sm"
                    onClick={() => handleMarkCompleted(mission.id)}
                    disabled={actionLoading === mission.id}
                  >
                    {actionLoading === mission.id
                      ? "Guardando..."
                      : "Marcar completada"}
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default AdminPage;