
import { DataTypes, Op } from 'sequelize';


export default (sequelize) => {
  const Mission = sequelize.define('Mission', {
    //ID autoincremental
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

    //Título descriptivo opcional de la misión
    title: { type: DataTypes.STRING(160), allowNull: true },

    //Claves foráneas
    parcelId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },  // Parcela asignada
    droneId:  { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },  // Dron que ejecuta la misión
    operatorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true }, // Operador (usuario, más adelante)

    //Fechas de inicio y fin
    startAt: { type: DataTypes.DATE, allowNull: false },
    endAt:   { type: DataTypes.DATE, allowNull: false },

    //Estado general de la misión
    status: {
      type: DataTypes.ENUM('borrador', 'programada', 'en_curso', 'completada', 'cancelada'),
      allowNull: false,
      defaultValue: 'borrador'
    },

    //Precio fijo de la misión
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 60.00 },

    //Estado de pago
    payment_status: {
      type: DataTypes.ENUM('pendiente', 'pagado'),
      allowNull: false,
      defaultValue: 'pendiente'
    },

    //Método y fecha del pago (solo informativos)
    payment_method: { type: DataTypes.STRING(40), allowNull: true },
    payment_date:   { type: DataTypes.DATE, allowNull: true },

    //Notas opcionales
    notes: { type: DataTypes.TEXT, allowNull: true }

  }, {
    tableName: 'Missions',
    timestamps: true, // Añade createdAt y updatedAt automáticamente
    indexes: [
      { fields: ['parcelId'] },
      { fields: ['droneId'] },
      { fields: ['startAt'] },
      { fields: ['status'] }
    ]
  });

  //Hook de comprobación para evitar solapamiento de misiones del mismo dron
  async function comprobarSolapamiento(instance) {
    if (instance.status === 'cancelada') return;

    const { droneId, startAt, endAt, id } = instance;

    //Validar que la fecha de inicio sea anterior a la de fin
    if (new Date(startAt) >= new Date(endAt)) {
      throw new Error('La hora de inicio debe ser anterior a la de fin');
    }

    //Buscar misiones que se solapen en tiempo con el mismo dron
    const where = {
      droneId,
      status: { [Op.not]: 'cancelada' },
      [Op.and]: [
        { startAt: { [Op.lt]: endAt } },
        { endAt:   { [Op.gt]: startAt } }
      ]
    };

    //Excluir la misión actual si es una actualización
    if (id) where.id = { [Op.ne]: id };

    const solapada = await Mission.findOne({ where });
    if (solapada) {
      throw new Error('❌ Solapamiento detectado: el dron ya tiene una misión en ese intervalo');
    }
  }

  //Registramos los hooks
  Mission.addHook('beforeCreate', comprobarSolapamiento);
  Mission.addHook('beforeUpdate', comprobarSolapamiento);

  return Mission;
};