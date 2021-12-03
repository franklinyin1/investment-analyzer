const Sequelize = require('sequelize')
const db = require('../db')

const Presentation = db.define('presentation', {
  adsh: {
    type: Sequelize.STRING,
  },
  report: {
    type: Sequelize.INTEGER,
  },
  line: {
    type: Sequelize.INTEGER
  },
  stmt: {
    type: Sequelize.STRING
  },
  inpth: {
    type: Sequelize.INTEGER
  },
  rfile: {
    type: Sequelize.STRING
  },
  tag: {
    type: Sequelize.STRING
  },
  version: {
    type: Sequelize.STRING
  },
  plabel: {
    type: Sequelize.TEXT
  },
  negating: {
    type: Sequelize.INTEGER
  }
})

module.exports = Presentation
