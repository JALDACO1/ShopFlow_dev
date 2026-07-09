const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Category = sequelize.define('Category', {
        id: {
            type:         DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:   true,
            allowNull:    false,
        },
        name: {
            type:      DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type:      DataTypes.TEXT,
            allowNull: true,
        },
        parent_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    }, {
        tableName: 'categories',
        timestamps: true,
        underscored: true,
    });

    return Category;
};