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

//CARGAMOS LOS MODELOS
const User = require('./User')(sequelize);
const Product = require('./Product')(sequelize);
const Category = require('./Categories')(sequelize);

// Definir relaciones entre modelos
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Category.hasMany(Category, { foreignKey: 'parent_id', as: 'Subcategories' });
Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'ParentCategory' });


module.exports = { sequelize, Sequelize, User, Product, Category };