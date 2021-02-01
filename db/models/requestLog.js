const {
  Model
} = require('sequelize');

const consts = require('../../routes/consts');

module.exports = (sequelize, DataTypes) => {
  class requestLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  requestLog.init({
    kind: {
      type: DataTypes.ENUM({
        values: consts.requestKinds
      }),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'requestLog',
  });
  return requestLog;
};