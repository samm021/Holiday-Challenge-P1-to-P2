'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Customers', [
      {
        identityNumber: '2502940006',
        fullName: 'Adipraja Al-Rasyid',
        address: 'Jakarta Pusat',
        birthDate: '1994-02-25',
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        identityNumber: '2003920007',
        fullName: 'Mohammed Ismail',
        address: 'Kab.Bandung Barat',
        birthDate: '1992-03-20',
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
