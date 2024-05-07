const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db')

class Veiculo extends Model {}

Veiculo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    placa: {
      type: DataTypes.STRING(7),
      allowNull: false,
      unique: true,
    },
    marca: {
      type: DataTypes.STRING(50),
    },
    modelo: {
      type: DataTypes.STRING(50),
    },
    ano: {
      type: DataTypes.INTEGER,
    },
    cor: {
      type: DataTypes.STRING(30),
    },
    km_atual: {
      type: DataTypes.INTEGER,
      field: 'km_atual',
    },
    tipo: {
      type: DataTypes.STRING(30),
    },
  },
  {
    sequelize,
    modelName: 'Veiculo',
    tableName: 'veiculos',
    timestamps: true,
    underscored: true,
  },
)

module.exports = Veiculo
