const { DataTypes } = require("sequelize");

const sequelize = require(".");

const UserSolution = sequelize.define(
    "UserSolution",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        taskId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answers: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        charactersCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        percentMatch: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        scores: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: true,
        tableName: "user_solutions",
    }
);

module.exports = UserSolution;
