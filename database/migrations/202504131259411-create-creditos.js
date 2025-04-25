'use strict';

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('creditos', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM('30_DIAS', '60_DIAS', '90_DIAS'),
        allowNull: false,
      },

      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valor: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      prestacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      juro: {
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
        allowNull: false,
      },
      pendencia: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      progresso: {
        type: DataTypes.ENUM('PENDENTE', 'CONCLUIDO', 'CANCELADO'),
        allowNull: false,
        defaultValue: 'PENDENTE',
      },
      devedor_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'pessoas', // presumindo que devedor seja uma Pessoa
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
    await queryInterface.dropTable('creditos');
  },
};
