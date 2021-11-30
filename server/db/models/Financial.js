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
    type: Sequelize.STRING
  },
  uom: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.FLOAT
  },
  footnote: {
    type: Sequelize.TEXT
  }
})

module.exports = Financial

/**
 * hooks
 */
const convertEmptyStringToZero = async(financial) => {
  if (financial.value === '') financial.value = 0
}

Financial.beforeCreate(convertEmptyStringToZero)
