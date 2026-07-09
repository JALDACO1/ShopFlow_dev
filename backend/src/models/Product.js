const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type:         DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:   true,
            allowNull:    false,
        },
        category_id: {
            type:      DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type:      DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type:      DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type:      DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type:         DataTypes.INTEGER,
            allowNull:    false,
            defaultValue: 0,
        },
        active: {
            type:         DataTypes.BOOLEAN,
            allowNull:    false,
            defaultValue: true,
        },
    }, {
        tableName: 'products',
        timestamps: true,
        underscored: true,
    });

    return Product;
};
