'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'slug', {
      type:      Sequelize.STRING,
      allowNull: true,
      unique:    true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('categories', 'slug');
  },
};