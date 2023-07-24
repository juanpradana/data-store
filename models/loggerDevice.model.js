module.exports = (sequelize, Sequelize) => {
  const LoggerDevice = sequelize.define('logger_device', {
    ts: {
      type: Sequelize.BIGINT,
    },
    humanTime: {
      type: Sequelize.STRING,
    },
    cpu_usage: {
      type: Sequelize.STRING,
    },
    mem_gpu: {
      type: Sequelize.STRING,
    },
    mem_arm: {
      type: Sequelize.STRING,
    },
    temp: {
      type: Sequelize.STRING,
    },
  });
  return LoggerDevice;
};
