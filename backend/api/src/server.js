//Importaciones principales
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//Para cargar las variables del archivo .env
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Importamos la conexión a la base de datos y función de prueba
import { testConnection } from './models/index.js';

//Importamos las rutas existentes
import dronesRouter from './routes/drones.routes.js';
import parcelsRouter from './routes/parcels.routes.js';
import missionsRouter from './routes/missions.routes.js';
import kpisRouter from './routes/kpis.routes.js';
import reportsRouter from './routes/reports.routes.js';

//Ruta de autenticación
import authRouter from './routes/auth.routes.js';

//Inicialización del servidor
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globales
app.use(cors({ origin: "*" })); // acepta peticiones del frontend
app.use(express.json()); // permite procesar cuerpos JSON


app.use(
  '/xsl',
  express.static(path.join(__dirname, '../public/xsl'))
);

//Rutas principales
app.use('/api/auth', authRouter);
app.use('/api/drones', dronesRouter);
app.use('/api/parcels', parcelsRouter);
app.use('/api/missions', missionsRouter);
app.use('/api/kpis', kpisRouter);
app.use('/api/reports', reportsRouter);

//Ruta de comprobación
app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'beebloom-backend' });
});

// Conexión y arranque del servidor
(async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`BeeBloom backend escuchando en http://localhost:${PORT}`);
    console.log(`XSL disponible en http://localhost:${PORT}/xsl/mission.xsl`);
  });
})();