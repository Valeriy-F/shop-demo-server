'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        field: 'id',
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      displayName: {
        field: 'display_name',
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        field: 'price',
        type: Sequelize.FLOAT,
        allowNull: false
      },
      description: {
        field: 'description',
        type: Sequelize.TEXT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};