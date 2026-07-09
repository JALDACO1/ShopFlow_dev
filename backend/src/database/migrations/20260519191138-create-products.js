'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('products', {
    id: {
      type:         Sequelize.UUID,
      defaultValue:  Sequelize.UUIDV4,
      primaryKey:    true,
      allowNull:     false,
    },
    category_id: {
      type:         Sequelize.UUID,
      allowNull:     false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    name: {
      type:      Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type:      Sequelize.TEXT,
      allowNull: true,
    },
    price: {
      type:      Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type:      Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type:      Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type:      Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,  
    },
    active: {
      type:      Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }   
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
