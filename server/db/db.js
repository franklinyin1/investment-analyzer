const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config = {
  logging: false,
  pool: {
    max: 30,
    min: 0,
    acquire: 60000000,
    idle: 5000
  }
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.HEROKU_POSTGRESQL_CYAN_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  process.env.HEROKU_POSTGRESQL_CYAN_URL || `postgres://localhost:5432/${databaseName}`, config)
module.exports = db
