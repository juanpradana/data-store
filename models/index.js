const { Sequelize, Op } = require('sequelize');
// const carbon_config = require('../configs/dataCarbon.config');
require('dotenv').config();

const carbon_sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOSTS,
    dialect: process.env.DIALECT,
  },
);

const db = {};
db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = carbon_sequelize;
db.carbon1 = require('./carbon1.model')(carbon_sequelize, Sequelize);
db.carbon2 = require('./carbon2.model')(carbon_sequelize, Sequelize);
db.scc = require('./scc.model')(carbon_sequelize, Sequelize);
db.loggerDevice = require('./loggerDevice.model')(carbon_sequelize, Sequelize);

module.exports = db;
