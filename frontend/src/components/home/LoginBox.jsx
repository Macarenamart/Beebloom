import React from "react";

function LoginBox() {
  return (
    <div className="card bb-login-card">
      <div className="card-body p-4">
        <h2 className="h5 fw-semibold mb-3">Acceso de usuario</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="nombre@ejemplo.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default LoginBox;