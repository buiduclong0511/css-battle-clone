const { Sequelize } = require("sequelize");

const sequelize = require(".");

const Task = sequelize.define(
    "Task",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true,
        },
        image: {
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
        },
    },
    {
        timestamps: false,
        tableName: "tasks",
    }
);

module.exports = Task;
