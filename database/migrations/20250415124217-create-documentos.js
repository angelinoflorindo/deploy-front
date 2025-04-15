'use strict';

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documentos', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM('BILHETE', 'DECLARACAO_TRABALHO', 'DECLARACAO_SEGURO', 'BEM_MOVEL', 'ORDEM_DEBITO', 'DEPOSITO', 'LEVANTAMENTO', 'RECIBO'),
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      extensao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tamanho: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nome_original: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nome_salvado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('documentos');
  },
};
