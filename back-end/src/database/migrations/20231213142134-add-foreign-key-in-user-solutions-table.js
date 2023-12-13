"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addConstraint("user_solutions", {
            type: "foreign key",
            fields: ["userId"],
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "CASCADE",
        });
        await queryInterface.addConstraint("user_solutions", {
            type: "foreign key",
            fields: ["taskId"],
            references: {
                table: "tasks",
                field: "id",
            },
            onDelete: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeConstraint(
            "user_solutions",
            "user_solutions_taskId_tasks_fk"
        );
        await queryInterface.removeConstraint(
            "user_solutions",
            "user_solutions_userId_users_fk"
        );
    },
};
