'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: uuidv4(),
        name: 'product_1',
        display_name: 'Product 1',
        price: 12.34,
        description: 'This is a first product.'
      },
      {
        id: uuidv4(),
        name: 'product_2',
        display_name: 'Product 2',
        price: 9.50,
        description: 'This is a second product.'
      },
      {
        id: uuidv4(),
        name: 'product_3',
        display_name: 'Product 3',
        price: 20.48,
        description: 'This is a third product.'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
