module.exports = (sequelize, Sequelize) => {
  const DHT1 = sequelize.define('dht1', {
    ts: {
      type: Sequelize.DATE,
    },
    humanTime: {
      type: Sequelize.STRING,
    },
    dht22Temp: {
      type: Sequelize.FLOAT,
    },
    dht22Humi: {
      type: Sequelize.FLOAT,
    },
    dht22HeatIndex: {
      type: Sequelize.FLOAT,
    },
  });
  return DHT1;
};
