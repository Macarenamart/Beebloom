
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor, rellena usuario y contraseña.");
      return;
    }

    
    console.log("Login simulado:", { username, password });

    
    navigate("/usuario");
  };

  return (
    <section className="bb-contact-block bb-contact-login">
      <h2 className="h4 mb-3">Ya tengo cuenta</h2>
      <p className="bb-text-muted">
        Inicia sesión para ver tus misiones contratadas y descargar los recibos.
      </p>

      <form onSubmit={handleSubmit} className="bb-form">
        <div className="mb-3">
          <label className="form-label">Usuario o email</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="nombre@ejemplo.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="bb-form-error">{error}</p>}

        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}

export default ContactLogin;