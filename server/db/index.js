//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Financial = require('./models/Financial')
const Presentation = require('./models/Presentation')
const Submission = require('./models/Submission')
const Tag = require('./models/Tag')
const Ticker = require('./models/Ticker')

//associations could go here!

// //failed attempt to associate financial and presentation - adsh can't be used as a foreign key because it's a string
// Financial.hasMany(Presentation, {
//   foreignKey: 'adsh'
// })
// Presentation.belongsTo(Financial)

module.exports = {
  db,
  models: {
    User,
    Financial,
    Presentation,
    Submission,
    Tag,
    Ticker
  },
}
