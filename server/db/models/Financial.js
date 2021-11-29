const Sequelize = require('sequelize')
const db = require('../db')

const Financial = db.define('financial', {
  adsh: {
    type: Sequelize.STRING,
  },
  tag: {
    type: Sequelize.STRING,
  },
  version: {
    type: Sequelize.STRING
  },
  coreg: {
    type: Sequelize.STRING
  },
  ddate: {
    type: Sequelize.STRING
  },
  qtrs: {
    type: Sequelize.INTEGER
  },
  uom: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.FLOAT
  },
  footnote: {
    type: Sequelize.STRING
  }
})

module.exports = Financial
