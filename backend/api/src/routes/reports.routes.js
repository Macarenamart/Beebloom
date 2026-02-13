import { Router } from 'express';
import { Op } from 'sequelize';
import { MissionModel, DroneModel, ParcelModel } from '../models/index.js';

const router = Router();

router.get('/kpis-xml', async (_req, res) => {
  try {
   
    const [total_missions, total_paid_missions, total_drones, total_parcels] = await Promise.all([
      MissionModel.count(),
      MissionModel.count({ where: { payment_status: 'pagado' } }),
      DroneModel.count(),
      ParcelModel.count()
    ]);

    // Ingresos totales
    const total_revenue_raw = await MissionModel.sum('price', {
      where: { payment_status: 'pagado' }
    });
    const total_revenue = Number(total_revenue_raw || 0);

    // Misiones por estado
    const estados = ['borrador', 'programada', 'en_curso', 'completada', 'cancelada'];
    const by_status_entries = await Promise.all(
      estados.map(async (estado) => {
        const count = await MissionModel.count({ where: { status: estado } });
        return [estado, count];
      })
    );
    const by_status = Object.fromEntries(by_status_entries);

    // Misiones próximas
    const ahora = new Date();
    const en7dias = new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000);
    const next_7_days = await MissionModel.count({
      where: {
        startAt: { [Op.gte]: ahora, [Op.lte]: en7dias },
        status: { [Op.ne]: 'cancelada' }
      }
    });

    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<kpis xmlns="https://beebloom.local/schema/kpis">
  <total_missions>${total_missions}</total_missions>
  <total_paid_missions>${total_paid_missions}</total_paid_missions>
  <total_revenue>${total_revenue.toFixed(2)}</total_revenue>
  <total_drones>${total_drones}</total_drones>
  <total_parcels>${total_parcels}</total_parcels>
  <by_status>
    ${Object.entries(by_status)
      .map(([estado, count]) => `<${estado}>${count}</${estado}>`)
      .join('\n    ')}
  </by_status>
  <next_7_days>${next_7_days}</next_7_days>
</kpis>`;

    res.type('application/xml').send(xml);
  } catch (err) {
    console.error('Error generando KPIs XML:', err);
    res.status(500).json({ error: 'Error generando KPIs XML' });
  }
});

export default router;