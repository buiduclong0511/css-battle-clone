const { Sequelize } = require("sequelize");

const sequelize = require(".");

const User = sequelize.define(
    "User",
    {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        displayName: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(191),
            allowNull: false,
            unique: true,
        },
        provider: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
        },
    },
    {
        timestamps: true,
        tableName: "users",
    }
);

module.exports = User;
