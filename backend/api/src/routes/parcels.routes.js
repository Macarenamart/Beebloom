import { Router } from 'express';
import { ParcelModel } from '../models/index.js';

const router = Router();

// Validación muy básica de GeoJSON
function isValidGeoJSON(obj) {
  if (!obj || typeof obj !== 'object') return false;
  if (obj.type === 'Feature' && obj.geometry?.type === 'Polygon') return true;
  if (obj.type === 'Polygon' && Array.isArray(obj.coordinates)) return true;
  return false;
}


router.get('/', async (_req, res) => {
  const rows = await ParcelModel.findAll({ order: [['id', 'ASC']] });
  res.json(rows);
});


router.get('/:id', async (req, res) => {
  const row = await ParcelModel.findByPk(req.params.id);
  if (!row) return res.status(404).json({ error: 'Parcela no encontrada' });
  res.json(row);
});


router.post('/', async (req, res) => {
  try {
    const { name, geojson, notes, ownerId, status } = req.body;
    if (!name || !geojson) {
      return res.status(400).json({ error: 'name y geojson son obligatorios' });
    }
    if (!isValidGeoJSON(geojson)) {
      return res.status(400).json({ error: 'geojson debe ser Feature/Polygon válido' });
    }
    const allowed = ['activa', 'inactiva'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ error: `status inválido. Usa: ${allowed.join(', ')}` });
    }
    const created = await ParcelModel.create({ name, geojson, notes, ownerId, status });
    res.status(201).json(created);
  } catch (err) {
    console.error('Error creando parcela:', err);
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const row = await ParcelModel.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: 'Parcela no encontrada' });

    const { name, geojson, notes, ownerId, status } = req.body;
    if (geojson && !isValidGeoJSON(geojson)) {
      return res.status(400).json({ error: 'geojson debe ser Feature/Polygon válido' });
    }
    const allowed = ['activa', 'inactiva'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ error: `status inválido. Usa: ${allowed.join(', ')}` });
    }

    await row.update({ name, geojson, notes, ownerId, status });
    res.json(row);
  } catch (err) {
    console.error('Error actualizando parcela:', err);
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const row = await ParcelModel.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: 'Parcela no encontrada' });
    await row.destroy();
    res.json({ ok: true });
  } catch (err) {
    console.error('Error eliminando parcela:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;