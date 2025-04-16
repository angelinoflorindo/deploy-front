'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
    const hashed1 = await bcrypt.hash('000rosa', 12);
    const hashed2 = await bcrypt.hash('999Flor', 12);

    await queryInterface.bulkInsert('users', [
      {
        primeiro_nome: 'Rosalina',
        segundo_nome: 'Domingos',
        email: 'rosalinafio2022@gmail.com',
        password:hashed1 ,
        genero:'FEMININO',
        bilhete:'000000000HB00',
        telemovel:'928131087',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        primeiro_nome: 'Angelino',
        segundo_nome: 'Francisco',
        email: 'angelinoflorindo@gmail.com',
        password:hashed2,
        genero:'MASCULINO',
        bilhete:'000000000LA00',
        telemovel:'950424578',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
