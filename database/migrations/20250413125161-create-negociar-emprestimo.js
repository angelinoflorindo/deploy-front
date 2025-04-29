'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('negociar_emprestimos', {
      investidor_id: {
        type: Sequelize.INTEGER.UNSIGNED,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      valor: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      juro: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prestacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prazo: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('negociar_emprestimos');
  },
};
