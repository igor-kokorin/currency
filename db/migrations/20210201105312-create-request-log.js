module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('requestLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kind: {
        allowNull: false,
        type: Sequelize.ENUM({
          values: [ 'currencyRateByDate', 'currencyCompare' ]
        })
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('requestLogs');
  }
};