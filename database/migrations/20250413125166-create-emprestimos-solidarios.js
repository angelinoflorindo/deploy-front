'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emprestimos_solidarios', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      emprestimo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'emprestimos', // Certifique-se de que a tabela 'emprestimos' exista
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      solidario_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'solidarios', // Certifique-se de que a tabela 'solidarios' exista
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
    await queryInterface.dropTable('emprestimos_solidarios');
  },
};
