
import { Router } from 'express';
import { Op } from 'sequelize';
import {
  MissionModel,
  ParcelModel,
  DroneModel,
  UserModel,
  sequelize,
} from '../models/index.js';
import bcrypt from 'bcryptjs';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const router = Router();


router.get('/', async (req, res) => {
  const { status, droneId, parcelId, from, to } = req.query;
  const where = {};

  if (status) where.status = status;
  if (droneId) where.droneId = Number(droneId);
  if (parcelId) where.parcelId = Number(parcelId);

  if (from || to) {
    const and = [];
    if (from) and.push({ endAt: { [Op.gte]: new Date(from) } });
    if (to) and.push({ startAt: { [Op.lte]: new Date(to) } });
    if (and.length) where[Op.and] = and;
  }

  const rows = await MissionModel.findAll({
    where,
    order: [['startAt', 'ASC']],
    include: [
      { model: DroneModel, attributes: ['id', 'name', 'serial', 'status'] },
      { model: ParcelModel, attributes: ['id', 'name', 'status'] },
    ],
  });

  res.json(rows);
});


router.get('/by-user/:userId', async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      return res.status(400).json({ error: 'userId inválido.' });
    }

    const missions = await MissionModel.findAll({
      include: [
        {
          model: ParcelModel,
          attributes: ['id', 'name', 'status', 'ownerId'],
          where: { ownerId: userId },
        },
        {
          model: DroneModel,
          attributes: ['id', 'name', 'serial', 'status'],
        },
      ],
      order: [['startAt', 'ASC']],
    });

    return res.json(missions);
  } catch (err) {
    console.error('Error en GET /api/missions/by-user/:userId:', err);
    return res
      .status(500)
      .json({ error: 'Error al cargar las misiones del usuario.' });
  }
});


router.get('/:id', async (req, res) => {
  const row = await MissionModel.findByPk(req.params.id, {
    include: [
      { model: DroneModel, attributes: ['id', 'name', 'serial', 'status'] },
      { model: ParcelModel, attributes: ['id', 'name', 'status'] },
    ],
  });
  if (!row) return res.status(404).json({ error: 'Misión no encontrada' });
  res.json(row);
});


router.post('/', async (req, res) => {
  try {
    const { parcelId, droneId, startAt, endAt, title, notes, status } = req.body;

    if (!parcelId || !droneId || !startAt || !endAt) {
      return res.status(400).json({
        error:
          'Los campos parcelId, droneId, startAt y endAt son obligatorios',
      });
    }

    const [parcel, drone] = await Promise.all([
      ParcelModel.findByPk(parcelId),
      DroneModel.findByPk(droneId),
    ]);
    if (!parcel)
      return res.status(400).json({ error: 'La parcela especificada no existe' });
    if (!drone)
      return res.status(400).json({ error: 'El dron especificado no existe' });

    const allowed = ['borrador', 'programada', 'en_curso', 'completada', 'cancelada'];
    const data = { parcelId, droneId, startAt, endAt, title, notes };
    if (status) {
      if (!allowed.includes(status)) {
        return res
          .status(400)
          .json({ error: `Estado inválido. Usa uno de: ${allowed.join(', ')}` });
      }
      data.status = status;
    }

    const created = await MissionModel.create(data);
    res.status(201).json(created);
  } catch (err) {
    console.error('Error creando misión:', err);
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id/status', async (req, res) => {
  try {
    const row = await MissionModel.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: 'Misión no encontrada' });

    const allowed = ['borrador', 'programada', 'en_curso', 'completada', 'cancelada'];
    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({
        error: `Estado inválido. Usa uno de: ${allowed.join(', ')}`,
      });
    }

    await row.update({ status: req.body.status });
    res.json(row);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id/pay', async (req, res) => {
  try {
    const row = await MissionModel.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: 'Misión no encontrada' });

    const { payment_method, payment_date } = req.body;
    await row.update({
      payment_status: 'pagado',
      payment_method,
      payment_date: payment_date ? new Date(payment_date) : new Date(),
    });

    res.json(row);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const row = await MissionModel.findByPk(req.params.id);
  if (!row) return res.status(404).json({ error: 'Misión no encontrada' });
  await row.destroy();
  res.json({ ok: true });
});


router.get('/:id/xml', async (req, res) => {
  try {
    const row = await MissionModel.findByPk(req.params.id, {
      include: [
        { model: DroneModel, attributes: ['id', 'name', 'serial', 'status'] },
        { model: ParcelModel, attributes: ['id', 'name', 'status'] },
      ],
    });

    if (!row) {
      return res.status(404).json({ error: 'Misión no encontrada' });
    }


    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/xsl/mission.xsl"?>
<Mission xmlns="https://beebloom.local/schema/mission" version="1.0">
  <Id>${row.id}</Id>
  <Titulo>${escapeXml(row.title ?? '')}</Titulo>
  <Estado>${escapeXml(row.status)}</Estado>
  <Precio>${row.price}</Precio>
  <Pago>
    <Estado>${escapeXml(row.payment_status)}</Estado>
    <Metodo>${escapeXml(row.payment_method ?? '')}</Metodo>
    <Fecha>${row.payment_date ? row.payment_date.toISOString() : ''}</Fecha>
  </Pago>
  <Fechas>
    <Inicio>${row.startAt.toISOString()}</Inicio>
    <Fin>${row.endAt.toISOString()}</Fin>
  </Fechas>
  <Dron>
    <Id>${row.Drone?.id ?? ''}</Id>
    <Nombre>${escapeXml(row.Drone?.name ?? '')}</Nombre>
    <Serial>${escapeXml(row.Drone?.serial ?? '')}</Serial>
    <Estado>${escapeXml(row.Drone?.status ?? '')}</Estado>
  </Dron>
  <Parcela>
    <Id>${row.Parcel?.id ?? ''}</Id>
    <Nombre>${escapeXml(row.Parcel?.name ?? '')}</Nombre>
    <Estado>${escapeXml(row.Parcel?.status ?? '')}</Estado>
  </Parcela>
  <Notas>${escapeXml(row.notes ?? '')}</Notas>
</Mission>`;

    res.type('application/xml').send(xml);
  } catch (err) {
    console.error('Error generando XML de misión:', err);
    res.status(500).json({ error: 'Error generando XML de la misión' });
  }
});


router.post('/full-create', async (req, res) => {
  const { user, parcel, mission } = req.body || {};

  try {
    console.log('[POST /api/missions/full-create] Body recibido:', req.body);

    if (!user || !parcel || !mission) {
      return res.status(400).json({
        message:
          'Faltan los bloques "user", "parcel" o "mission" en el cuerpo de la petición.',
      });
    }

    if (!user.username || !user.email || !user.password) {
      return res.status(400).json({
        message:
          'Faltan campos obligatorios en user: username, email o password.',
      });
    }

    if (!parcel.name) {
      return res.status(400).json({
        message: 'Falta "name" dentro de parcel.',
      });
    }

    if (!mission.droneId) {
      return res.status(400).json({
        message: 'Debes seleccionar un dron disponible para la misión.',
      });
    }

    const t = await sequelize.transaction();

    try {
      let dbUser = await UserModel.findOne({
        where: {
          [Op.or]: [{ email: user.email }, { username: user.username }],
        },
        transaction: t,
      });

      if (!dbUser) {
        const passwordHash = await bcrypt.hash(user.password, 10);

        dbUser = await UserModel.create(
          {
            username: user.username,
            email: user.email,
            passwordHash,
          },
          { transaction: t }
        );
      }

      const parcelData = {
        name: parcel.name,
        status: 'activa',
        geojson: parcel.geojson ?? {},
        notes: parcel.address ?? null,
      };

      if (ParcelModel.rawAttributes && ParcelModel.rawAttributes.ownerId) {
        parcelData.ownerId = dbUser.id;
      }

      const dbParcel = await ParcelModel.create(parcelData, { transaction: t });

      const startAt = mission.startDate ? new Date(mission.startDate) : new Date();
      const endAt = new Date(startAt.getTime() + 2 * 60 * 60 * 1000);

      const missionData = {
        parcelId: dbParcel.id,
        droneId: Number(mission.droneId),
        startAt,
        endAt,
        title:
          mission.title ||
          `Misión de polinización para ${dbParcel.name || 'parcela'}`,
        notes: mission.notifications
          ? `Notificaciones: ${mission.notifications}${
              user.phone ? ' | Teléfono: ' + user.phone : ''
            }`
          : '',
        status: mission.status || 'programada',
      };

      if (MissionModel.rawAttributes && MissionModel.rawAttributes.price) {
        missionData.price = mission.price ?? 60;
      }

      if (
        MissionModel.rawAttributes &&
        MissionModel.rawAttributes.payment_status
      ) {
        missionData.payment_status = 'pendiente';
      }

      const dbMission = await MissionModel.create(missionData, {
        transaction: t,
      });

      await t.commit();

      return res.status(201).json({
        ok: true,
        message:
          'Solicitud de misión registrada correctamente en la base de datos.',
        user: {
          id: dbUser.id,
          username: dbUser.username,
          email: dbUser.email,
        },
        parcel: {
          id: dbParcel.id,
          name: dbParcel.name,
          status: dbParcel.status,
        },
        mission: {
          id: dbMission.id,
          title: dbMission.title,
          status: dbMission.status,
          price: dbMission.price,
          startAt: dbMission.startAt,
          endAt: dbMission.endAt,
        },
      });
    } catch (errTx) {
      await t.rollback();
      console.error('[/api/missions/full-create] Error en transacción:', errTx);
      return res
        .status(500)
        .json({ message: 'Error creando la misión en la base de datos.' });
    }
  } catch (err) {
    console.error('[/api/missions/full-create] Error inesperado:', err);
    return res
      .status(500)
      .json({ message: 'Error inesperado en el servidor.' });
  }
});

export default router;