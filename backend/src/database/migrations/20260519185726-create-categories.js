'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('categories', {
            id: {
                type:         Sequelize.UUID,
                defaultValue:  Sequelize.UUIDV4,
                primaryKey:    true,
                allowNull:     false,
            },
            name: {
                type:      Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type:      Sequelize.TEXT,
                allowNull: true,
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
            parent_id: {
                type:         Sequelize.UUID,
                allowNull:     true,
                references: {
                    model: 'categories',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        });
    },
        async down (queryInterface) {
            await queryInterface.dropTable('categories');
    },
};

