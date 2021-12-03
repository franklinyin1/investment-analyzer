const Sequelize = require('sequelize')
const db = require('../db')

const Submission = db.define('submission', {
  adsh: {
    type: Sequelize.STRING,
  },
  cik: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING
  },
  sic: {
    type: Sequelize.STRING
  },
  countryrba: {
    type: Sequelize.STRING
  },
  stprba: {
    type: Sequelize.STRING
  },
  cityba: {
    type: Sequelize.STRING
  },
  zipba: {
    type: Sequelize.STRING
  },
  bas1: {
    type: Sequelize.STRING
  },
  bas2: {
    type: Sequelize.STRING
  },
  baph: {
    type: Sequelize.STRING
  },
  countryma: {
    type: Sequelize.STRING
  },
  stprma: {
    type: Sequelize.STRING
  },
  cityma: {
    type: Sequelize.STRING
  },
  zipma: {
    type: Sequelize.STRING
  },
  mas1: {
    type: Sequelize.STRING
  },
  mas2: {
    type: Sequelize.STRING
  },
  countryinc: {
    type: Sequelize.STRING
  },
  stprinc: {
    type: Sequelize.STRING
  },
  ein: {
    type: Sequelize.STRING
  },
  former: {
    type: Sequelize.STRING
  },
  changed: {
    type: Sequelize.STRING
  },
  afs: {
    type: Sequelize.STRING
  },
  wksi: {
    type: Sequelize.INTEGER
  },
  fye: {
    type: Sequelize.STRING
  },
  form: {
    type: Sequelize.STRING
  },
  period: {
    type: Sequelize.STRING
  },
  fy: {
    type: Sequelize.STRING
  },
  fp: {
    type: Sequelize.STRING
  },
  filed: {
    type: Sequelize.STRING
  },
  accepted: {
    type: Sequelize.STRING
  },
  prevrpt: {
    type: Sequelize.INTEGER
  },
  detail: {
    type: Sequelize.INTEGER
  },
  instance: {
    type: Sequelize.STRING
  },
  nciks: {
    type: Sequelize.INTEGER
  },
  aciks: {
    type: Sequelize.STRING
  }
})

module.exports = Submission
