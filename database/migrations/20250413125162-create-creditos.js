'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('creditos', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tipo_credito: {
        type: Sequelize.ENUM('30_DIAS', '60_DIAS', '90_DIAS'),
        allowNull: false,
      },
      valor: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      prestacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      juro: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prazo: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      pendencia: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      progresso: {
        type: Sequelize.ENUM('PENDENTE', 'CONCLUIDO', 'CANCELADO'),
        allowNull: false,
        defaultValue: 'PENDENTE',
      },
      devedor_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'pessoas', // Presumindo que devedor seja uma Pessoa
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('creditos');
  },
};
