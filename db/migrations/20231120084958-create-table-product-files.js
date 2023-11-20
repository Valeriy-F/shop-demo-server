'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product-files', {
      id: {
        field: 'id',
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        field: 'type',
        type: Sequelize.STRING,
        allowNull: false
      },
      productId: {
        field: 'productId',
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'products'
          },
          key: 'id'
        },
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product-files');
  }
};
