'use strict';

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emprestimos', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      valor: {
        type: DataTypes.FLOAT,
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
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      pendencia: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      progresso: {
        type: DataTypes.ENUM('PENDENTE', 'CONCLUIDO', 'CANCELADO'),
        allowNull: false,
        defaultValue: 'PENDENTE',
      },
      proponente_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'proponentes', // Nome da tabela referenciada
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
    await queryInterface.dropTable('emprestimos');
  },
};
