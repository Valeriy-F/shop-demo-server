'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Product 1',
        price: 12.34,
        description: 'This is a first product.'
      },
      {
        name: 'Product 2',
        price: 9.50,
        description: 'This is a second product.'
      },
      {
        name: 'Product 3',
        price: 20.48,
        description: 'This is a third product.'
      }
    ], {});
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
