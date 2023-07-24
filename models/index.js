const Sequelize = require('sequelize');
const carbon_config = require('../configs/dataCarbon.config');

const carbon_sequelize = new Sequelize(
  carbon_config.DB,
  carbon_config.USER,
  carbon_config.PASSWORD,
  {
    host: carbon_config.HOSTS,
    dialect: carbon_config.DIALECT,
  },
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = carbon_sequelize;
db.carbon1 = require('./carbon1.model')(carbon_sequelize, Sequelize);
db.carbon2 = require('./carbon2.model')(carbon_sequelize, Sequelize);
db.scc = require('./scc.model')(carbon_sequelize, Sequelize);
db.loggerDevice = require('./loggerDevice.model')(carbon_sequelize, Sequelize);

module.exports = db;
