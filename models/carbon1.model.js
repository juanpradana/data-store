module.exports = (sequelize, Sequelize) => {
  const Carbon1 = sequelize.define('carbon1', {
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
    bmp388Pressure: {
      type: Sequelize.FLOAT,
    },
    bmp388Temp: {
      type: Sequelize.FLOAT,
    },
    bmp388ApprxAltitude: {
      type: Sequelize.FLOAT,
    },
    sht85Humi: {
      type: Sequelize.FLOAT,
    },
    sht85Temp: {
      type: Sequelize.FLOAT,
    },
    co2: {
      type: Sequelize.INTEGER,
    },
    ch4: {
      type: Sequelize.INTEGER,
    },
    H2OSHT85: {
      type: Sequelize.FLOAT,
    },
  });
  return Carbon1;
};
