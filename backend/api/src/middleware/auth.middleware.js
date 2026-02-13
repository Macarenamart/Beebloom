

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

//validar tokens JWT
export function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Falta el header Authorization." });
    }

    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Formato de token inválido." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Guardamos la info del usuario autenticado
    req.authUser = decoded;

    next(); // continúa a la ruta protegida
  } catch (err) {
    console.error("[authRequired] Error:", err.message);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
}