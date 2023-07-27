module.exports = (sequelize, Sequelize) => {
  const LoggerDevice = sequelize.define('logger_device', {
    ts: {
      type: Sequelize.DATE,
    },
    humanTime: {
      type: Sequelize.STRING,
    },
    cpu_usage: {
      type: Sequelize.INTEGER,
    },
    mem_gpu: {
      type: Sequelize.INTEGER,
    },
    mem_arm: {
      type: Sequelize.INTEGER,
    },
    temp: {
      type: Sequelize.FLOAT,
    },
  });
  return LoggerDevice;
};
