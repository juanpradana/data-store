module.exports = (sequelize, Sequelize) => {
  const LogStatus2 = sequelize.define('logStatus2', {
    log: {
      type: Sequelize.STRING,
    },
  });
  return LogStatus2;
};
