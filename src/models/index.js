const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

// Selecciona la configuración según el entorno actual.
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Crea una sola instancia compartida de Sequelize para toda la app.
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

module.exports = { sequelize, Sequelize, DataTypes };