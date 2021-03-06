const {
  Model
} = require('sequelize');

const consts = require('../../consts');

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
        values: consts.currencies
      }),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rate: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      get() {
        return Number(this.getDataValue('rate'));
      }
    }
  }, {
    sequelize,
    modelName: 'currency',
  });

  return currency;
};