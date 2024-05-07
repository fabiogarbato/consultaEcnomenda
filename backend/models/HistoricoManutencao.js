const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class HistoricoManutencao extends Model {}

HistoricoManutencao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    veiculo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'veiculos',
        key: 'id',
      },
      allowNull: false,
    },
    data_manutencao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    detalhes: {
      type: DataTypes.TEXT,
    },
    custo: {
      type: DataTypes.NUMERIC(10, 2),
    },
    km_troca:{
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize,
    modelName: 'HistoricoManutencao',
    tableName: 'historico_manutencao',
    timestamps: false,
    underscored: true,
  },
);

module.exports = HistoricoManutencao;
