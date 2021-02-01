const { requestLog } = require('../../db/models');

module.exports = (requestKind) => {
  return async (req, res, next) => {
    try {
      await requestLog.create({
        kind: requestKind
      });
  
      next();
    } catch (err) {
      next(err, req, res);
    }
  };
};