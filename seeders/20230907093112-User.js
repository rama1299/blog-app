'use strict';
const {faker} = require('@faker-js/faker')
const {User} = require('../models')

const generateRandomUserData = () => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  gender: faker.person.sex(),
  birthday: faker.date.birthdate(),
  address: faker.location.city(),
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const randomUserData = Array.from({ length: 100 }, generateRandomUserData);
    await User.bulkCreate(randomUserData);
  },

  async down (queryInterface, Sequelize) {
    await User.destroy({ where: {} });
  }
};
