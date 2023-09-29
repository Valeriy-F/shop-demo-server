'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable('products', {
      id: {
        field: 'id',
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable('products');
  }
};