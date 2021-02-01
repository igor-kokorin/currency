const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  currency.init({
    name: {
      type: DataTypes.ENUM({
        values: [ 'RUB', 'EUR', 'USD', 'JPY' ]
      }),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rate: {
      type: DataTypes.NUMERIC,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'currency',
  });

  return currency;
};