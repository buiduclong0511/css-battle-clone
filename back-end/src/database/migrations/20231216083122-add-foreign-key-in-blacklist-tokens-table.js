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
        await queryInterface.addConstraint("blacklist_tokens", {
            type: "foreign key",
            fields: ["userId"],
            references: {
                table: "users",
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
            "blacklist_tokens",
            "blacklist_tokens_userId_users_fk"
        );
    },
};
