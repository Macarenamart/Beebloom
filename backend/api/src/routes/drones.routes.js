import { Router } from 'express';
import { DroneModel } from '../models/index.js';

const router = Router();

router.get('/', async (_req, res) => {
  const drones = await DroneModel.findAll({ order: [['id', 'ASC']] });
  res.json(drones);
});

router.post('/', async (req, res) => {
  try {
    const { name, serial, status } = req.body;

    if (!name || !serial) {
      return res.status(400).json({ error: 'name y serial son obligatorios' });
    }

    const allowed = ['disponible', 'polinizando', 'fuera_de_servicio'];
    if (status && !allowed.includes(status)) {
      return res
        .status(400)
        .json({ error: `status inválido. Usa: ${allowed.join(', ')}` });
    }

    const created = await DroneModel.create({ name, serial, status });
    res.status(201).json(created);
  } catch (err) {
    console.error('Error creando dron:', err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(409)
        .json({ error: 'Ya existe un dron con ese serial' });
    }
    res.status(500).json({ error: err.message }); //muestra el error real temporalmente
  }
});


router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const drone = await DroneModel.findByPk(id);
    if (!drone) {
      return res.status(404).json({ error: 'Dron no encontrado' });
    }

   
    const { name, status, description, image_url } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (status !== undefined) {
      const allowed = ['disponible', 'polinizando', 'fuera_de_servicio'];
      if (!allowed.includes(status)) {
        return res.status(400).json({ error: `Estado inválido. Usa uno de: ${allowed.join(', ')}` });
      }
      updates.status = status;
    }
    if (description !== undefined) updates.description = description;
    if (image_url !== undefined) updates.image_url = image_url;

    await drone.update(updates);
    res.json(drone);
  } catch (err) {
    console.error('Error actualizando dron:', err);
    res.status(500).json({ error: 'Error interno actualizando el dron' });
  }
});

export default router;