
import { Router } from 'express';

import { Op } from 'sequelize';

import { MissionModel, DroneModel, ParcelModel } from '../models/index.js';


const router = Router();


router.get('/', async (_req, res) => {
  try {
   
    const [total_missions, total_paid_missions, total_drones, total_parcels] =
      await Promise.all([
        MissionModel.count(),
        MissionModel.count({ where: { payment_status: 'pagado' } }),
        DroneModel.count(),
        ParcelModel.count()
      ]);

   
    const total_revenue_raw = await MissionModel.sum('price', {
      where: { payment_status: 'pagado' }
    });
    
    const total_revenue = Number(total_revenue_raw || 0);

   
    const estados = [
      'borrador',
      'programada',
      'en_curso',
      'completada',
      'cancelada'
    ];

    const by_status_entries = await Promise.all(
     
      estados.map(async (estado) => {
        const count = await MissionModel.count({ where: { status: estado } });
       
        return [estado, count];
      })
    );

   
    const by_status = Object.fromEntries(by_status_entries);

  
    const ahora = new Date();
   
    const en7dias = new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000);

    const next_7_days = await MissionModel.count({
      where: {
        startAt: { [Op.gte]: ahora, [Op.lte]: en7dias },
        
        status: { [Op.ne]: 'cancelada' }
      }
    });

    
    res.json({
      total_missions,
      total_paid_missions,
      total_revenue,
      total_drones,
      total_parcels,
      by_status,
      next_7_days
    });
  } catch (err) {
    console.error('Error calculando KPIs:', err);
    res.status(500).json({ error: 'Error interno calculando KPIs' });
  }
});

export default router;