
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  getUserMissions,
  downloadMissionReceipt, 
} from "../services/api";
import { isAdmin } from "../utils/auth";

// Clave de almacenamiento local
const STORAGE_KEY = "beebloomAuth";


function formatStatusLabel(status) {
  switch (status) {
    case "programada":
      return "Programada";
    case "en curso":
    case "en_curso":
      return "En curso";
    case "completada":
      return "Completada";
    default:
      return status || "Pendiente";
  }
}

function UserPage() {
  const navigate = useNavigate();

  // Estado de autenticación
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Estado de misiones del usuario
  const [missions, setMissions] = useState([]);

  // Formulario de login
  const [loginForm, setLoginForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  // Estados de carga / error
  const [loginLoading, setLoginLoading] = useState(false);
  const [missionsLoading, setMissionsLoading] = useState(false);
  const [error, setError] = useState("");

  // Al cargar la página, intentamos recuperar usuario + token de localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.user && parsed?.token) {
          setUser(parsed.user);
          setToken(parsed.token);
          // ahora pasamos también el id de usuario
          loadMissions(parsed.token, parsed.user.id);
        }
      }
    } catch (_) {
      // si falla el JSON, ignoramos
    }
  }, []);

  //Si el usuario autenticado es admin, redirigimos directamente al panel
  useEffect(() => {
    if (user && token && isAdmin()) {
      navigate("/admin");
    }
  }, [user, token, navigate]);

  /** Carga de misiones del usuario (usa token + userId) */
  const loadMissions = async (authToken, userId) => {
    if (!authToken) return;

    setMissionsLoading(true);
    setError("");
    try {
      const data = await getUserMissions(authToken, userId);

      const normalized = (data || []).map((mission) => ({
        id: mission.id,
        title: mission.title,
        status: mission.status,
        statusLabel: mission.statusLabel || formatStatusLabel(mission.status),
        parcelName: mission.parcelName || "Parcela sin nombre",
        scheduledDate:
          mission.scheduledDate || mission.date || "Pendiente de asignar",
        price: mission.price ?? 60,
       
        canDownloadReceipt:
          mission.canDownloadReceipt !== undefined
            ? mission.canDownloadReceipt
            : true,
      }));

      setMissions(normalized);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar tus misiones.");
    } finally {
      setMissionsLoading(false);
    }
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginLoading(true);
    setError("");

    try {
      const {
        id,
        username,
        email,
        token: loggedToken,
      } = await loginUser({
        usernameOrEmail: loginForm.usernameOrEmail,
        password: loginForm.password,
      });

      const loggedUser = { id, username, email };

      setUser(loggedUser);
      setToken(loggedToken);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user: loggedUser, token: loggedToken })
      );

      await loadMissions(loggedToken, loggedUser.id);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "No se ha podido iniciar sesión. Revisa tus datos."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  /** Cerrar sesión */
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setMissions([]);
    setError("");
    localStorage.removeItem(STORAGE_KEY);
  };

  /** Ir al panel de administrador (solo admin) */
  const handleGoToAdmin = () => {
    navigate("/admin");
  };

  /** Descargar recibo (XML) de una misión */
  const handleDownloadReceipt = (mission) => {
    if (!mission?.id || !mission.canDownloadReceipt) return;
    try {
      downloadMissionReceipt(mission.id);
    } catch (err) {
      console.error("Error al descargar el recibo:", err);
     
    }
  };

  
  if (!user || !token) {
    return (
      <section id="usuario" className="bb-user-page bb-section bb-section--light">
        <div className="bb-user-shell">
          <header className="bb-user-header">
            <h1 className="bb-user-title">Área de usuario BeeBloom</h1>
            <p className="bb-user-subtitle">
              Inicia sesión para ver tus misiones contratadas y descargar los
              recibos.
            </p>
          </header>

          <div className="bb-user-grid">
            {}
            <div className="bb-user-login">
              <h2 className="bb-user-login__title">Ya tengo cuenta</h2>
              <p className="bb-user-login__text">
                Introduce tu usuario o correo electrónico y la contraseña que
                indicaste al contratar tu primera misión.
              </p>

              {error && <p className="bb-user-error">{error}</p>}

              <form className="bb-user-form" onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label className="form-label">Usuario o email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="usernameOrEmail"
                    value={loginForm.usernameOrEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={loginForm.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>
              </form>
            </div>

            {}
            <div className="bb-user-info">
              <h2 className="bb-user-info__title">¿Primera vez en BeeBloom?</h2>
              <p>
                Si todavía no tienes usuario, puedes contratar tu primera misión
                desde la pestaña <strong>Contacto</strong>. Al completar el
                formulario, crearemos tu cuenta automáticamente y podrás volver
                aquí para consultar el estado de tus misiones y descargar tus
                recibos.
              </p>
              <p className="bb-user-info__hint">
                Tu área privada solo es visible para ti; el resto de usuarios no
                pueden ver tus misiones.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  
  const adminVisible = isAdmin(); 

  return (
    <section id="usuario" className="bb-user-page bb-section bb-section--light">
      <div className="bb-user-shell">
        <header className="bb-user-header bb-user-header--logged">
          <div>
            <h1 className="bb-user-title">
              Hola, {adminVisible ? "admin" : (user.username || user.email)}
            </h1>
            <p className="bb-user-subtitle">
              {adminVisible
                ? "Como administrador, puedes gestionar todas las misiones desde el panel de administrador."
                : "Aquí puedes consultar tus misiones con BeeBloom y descargar los recibos cuando estén disponibles."}
            </p>
          </div>

          <div className="bb-user-header__actions">
            {adminVisible && (
              <button
                type="button"
                className="bb-btn-outline bb-btn-pill me-2"
                onClick={handleGoToAdmin}
              >
                Panel de administrador
              </button>
            )}

            <button
              type="button"
              className="bb-btn-pill"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {}
        {adminVisible ? (
          <section className="bb-user-missions">
            <h2 className="bb-user-missions__title">Zona de usuario</h2>
            <p className="bb-user-missions__empty">
              Esta sección de <strong>Mis misiones</strong> está pensada para
              los clientes. Como administrador, puedes ver y gestionar todas las
              misiones desde el botón <strong>Panel de administrador</strong> en
              la parte superior.
            </p>
          </section>
        ) : (
          
          <section className="bb-user-missions">
            <h2 className="bb-user-missions__title">Mis misiones</h2>

            {missionsLoading && <p>Cargando misiones...</p>}

            {!missionsLoading && missions.length === 0 && (
              <p className="bb-user-missions__empty">
                Todavía no tienes ninguna misión registrada. Contrata tu primera
                misión desde la pestaña <strong>Contacto</strong>.
              </p>
            )}

            <div className="bb-user-missions__grid">
              {missions.map((mission) => (
                <article key={mission.id} className="bb-user-mission-card">
                  <header className="bb-user-mission-card__header">
                    <h3>{mission.title}</h3>
                    <span
                      className={`bb-user-mission-card__status bb-user-mission-card__status--${mission.status}`}
                    >
                      {mission.statusLabel}
                    </span>
                  </header>

                  <p className="bb-user-mission-card__field">
                    <strong>Parcela:</strong> {mission.parcelName}
                  </p>
                  <p className="bb-user-mission-card__field">
                    <strong>Fecha prevista:</strong> {mission.scheduledDate}
                  </p>
                  <p className="bb-user-mission-card__field">
                    <strong>Precio:</strong> {mission.price} €
                  </p>

                  <footer className="bb-user-mission-card__footer">
                    <button
                      type="button"
                      className="bb-btn-outline bb-btn-sm"
                      disabled={!mission.canDownloadReceipt}
                      onClick={() => handleDownloadReceipt(mission)}
                    >
                      {mission.canDownloadReceipt
                        ? "Descargar recibo"
                        : "Recibo no disponible"}
                    </button>
                  </footer>
                </article>
              ))}
            </div>

            {error && <p className="bb-user-error">{error}</p>}
          </section>
        )}
      </div>
    </section>
  );
}

export default UserPage;