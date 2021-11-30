'use strict'

const {db, models: {User, Financial} } = require('../server/db')

const process = require("./process");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  console.log(`seeded ${users.length} users`)

  // Creating Financials
  //process forms an array from all the financials num.txt
  let financials = await process()

  //split financials into batches. Remove the first entry which is the labels
  let financials1 = financials.slice(1, Math.round(financials.length/2))
  let financials2 = financials.slice(Math.round(financials.length/2))

  financials1 = await Promise.all(
    financials1.map((financial) => {
      return Financial.create({
        adsh: financial[0],
        tag: financial[1],
        version: financial[2],
        coreg: financial[3],
        ddate: financial[4],
        qtrs: financial[5],
        uom: financial[6],
        value: financial[7],
        footnote: financial[8]
      })
    })
  )

  // financials2 = await Promise.all(
  //   financials2.map((financial) => {
  //     return Financial.create({
  //       adsh: financial[0],
  //       tag: financial[1],
  //       version: financial[2],
  //       coreg: financial[3],
  //       ddate: financial[4],
  //       qtrs: financial[5],
  //       uom: financial[6],
  //       value: financial[7],
  //       footnote: financial[8]
  //     })
  //   })
  // )

  financials = [...financials1, ...financials2]

  console.log(`seeded ${financials.length} financials`)


  /*

  */

  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }


}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
