'use strict';

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contas', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salario: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      iban: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      pessoa_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique:true,
        references: {
          model: 'pessoas', // Nome da tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('contas');
  },
};
