module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE currencies ADD CONSTRAINT c_currencies_name_date UNIQUE (name, date);
    `)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE currencies DROP CONSTRAINT c_currencies_name_date;
    `)
  }
};
