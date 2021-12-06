const Sequelize = require("sequelize");
const db = require("../db");

const Ticker = db.define("ticker", {
  cik_str: {
    type: Sequelize.INTEGER,
  },
  ticker: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
});

module.exports = Ticker;
