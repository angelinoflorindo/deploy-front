'use strict';

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('negocear_emprestimos', {
      investidor_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'investidores', // Nome da tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      emprestimo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'emprestimos', // Nome da tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      pendencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:true
      },

      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      valor: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      juro: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prestacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prazo: {
        type: DataTypes.DATE,
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
    await queryInterface.dropTable('diversificacaos');
  },
};
