const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  tag: {
    type: Sequelize.STRING
  },
  version: {
    type: Sequelize.STRING
  },
  custom: {
    type: Sequelize.INTEGER
  },
  abstract: {
    type: Sequelize.INTEGER
  },
  dataype: {
    type: Sequelize.STRING
  },
  iord: {
    type: Sequelize.STRING
  },
  crdr: {
    type: Sequelize.STRING
  },
  tlabel: {
    type: Sequelize.TEXT
  },
  doc: {
    type: Sequelize.TEXT
  }
})

module.exports = Tag
