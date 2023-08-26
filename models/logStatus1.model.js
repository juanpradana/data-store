module.exports = (sequelize, Sequelize) => {
  const LogStatus1 = sequelize.define('logStatus1', {
    log: {
      type: Sequelize.STRING,
    },
  });
  return LogStatus1;
};
