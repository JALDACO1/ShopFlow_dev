'use strict';

module.exports = {
    //up es lo que se ejecuta cuando corres la migración — crea la tabla.
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type:          Sequelize.UUID,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey:    true,
        allowNull:     false,
      },
      name: {
        type:      Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type:      Sequelize.STRING,
        allowNull: false,
        unique:    true,
      },
      password_hash: {
        type:      Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type:         Sequelize.ENUM('customer', 'admin'),
        allowNull:    false,
        defaultValue: 'customer',
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
    });
  },

  //down es lo que se ejecuta si deshaces la migración — 
  // borra la tabla. Esto es útil si te equivocas y quieres revertir.
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};