const { Pool } = require('pg')
const { Sequelize } = require('sequelize')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'gbt101',
  database: 'manutencaoCarro',
  port: 5432,
  ssl: false,
})

const sequelize = new Sequelize('manutencaoCarro', 'postgres', 'gbt101', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  ssl: false,
})

module.exports.pool = pool
module.exports.sequelize = sequelize
