module.exports = (sequelize, Sequelize) => {
  const SCC = sequelize.define('scc', {
    ts: {
      type: Sequelize.BIGINT,
    },
    humanTime: {
      type: Sequelize.STRING,
    },
    PV_Voltage: {
      type: Sequelize.FLOAT,
    },
    PV_Current: {
      type: Sequelize.FLOAT,
    },
    PV_Power: {
      type: Sequelize.FLOAT,
    },
    Battery_Voltage: {
      type: Sequelize.FLOAT,
    },
    Battery_Charge_Current: {
      type: Sequelize.FLOAT,
    },
    Battery_Charge_Power: {
      type: Sequelize.FLOAT,
    },
    Load_Current: {
      type: Sequelize.INTEGER,
    },
    Load_Power: {
      type: Sequelize.INTEGER,
    },
    Battery_Remaining_Percentage: {
      type: Sequelize.INTEGER,
    },
    Battery_Temperature: {
      type: Sequelize.INTEGER,
    },
    Battery_Discharge_Current: {
      type: Sequelize.FLOAT,
    },
  });
  return SCC;
};
