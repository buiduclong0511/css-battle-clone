const { DataTypes } = require("sequelize");

const sequelize = require(".");

const Task = sequelize.define(
    "Task",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        colors: {
            type: DataTypes.TEXT,
        },
        colorArray: {
            type: DataTypes.VIRTUAL,
            get() {
                return JSON.parse(this.colors);
            },
        },
        image: {
            type: DataTypes.STRING,
        },
        imageUrl: {
            type: DataTypes.VIRTUAL,
            get() {
                return `http://localhost:8080${this.image}`;
            },
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
        tableName: "tasks",
    }
);

module.exports = Task;
