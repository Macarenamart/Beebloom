
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import { UserModel } from "../models/index.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = "2h"; 

function buildTokenPayload(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}


router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Faltan campos: username, email y password son obligatorios.",
      });
    }

    
    const existing = await UserModel.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "Ya existe un usuario con ese email o usuario." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      passwordHash,
    });

    const payload = buildTokenPayload(user);
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(201).json({
      user: payload,
      token,
    });
  } catch (err) {
    console.error("[AUTH /register] Error:", err);
    return res.status(500).json({ message: "Error al registrar usuario." });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        message: "Usuario/email y password son obligatorios.",
      });
    }

    const user = await UserModel.findOne({
      where: {
        [Op.or]: [
          { email: usernameOrEmail },
          { username: usernameOrEmail },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const payload = buildTokenPayload(user);
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({
      user: payload,
      token,
    });
  } catch (err) {
    console.error("[AUTH /login] Error:", err);
    return res.status(500).json({ message: "Error al iniciar sesión." });
  }
});


router.get("/me", authRequired, async (req, res) => {
  try {
  
    const userId = req.authUser.id;

    const user = await UserModel.findByPk(userId, {
      attributes: ["id", "username", "email", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    return res.json({ user });
  } catch (err) {
    console.error("[AUTH /me] Error:", err);
    return res.status(500).json({ message: "Error al obtener el perfil." });
  }
});

export default router;