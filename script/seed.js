'use strict'

const {db, models: {User, Financial, Presentation, Submission, Tag, Ticker} } = require('../server/db')

const process = require("./process");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {

  //NOT currently dropping db tables
  await db.sync({alter:true})
  console.log('db synced!')

  //process is used to gather important data from other directories
  // let {financials, presentation, submissions, tags, tickers} = await process()
  // let {financials} = await process()
  // let {presentations} = await process()
  let {submissions} = await process()
  // let {tags} = await process()
  // let {tickers} = await process()

  // //use this syntax to destroy a DB table
  // Submission.destroy({
  //   where: {},
  // })

  // Creating Users
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ])

  // console.log(`seeded ${users.length} users`)

  // Creating Financials


  // //split financials into batches. Remove the first entry which is the labels
  // let financials1 = financials.slice(1, Math.round(financials.length/2))
  // let financials2 = financials.slice(Math.round(financials.length/2))

  // financials1 = await Promise.all(
  //   financials1.map((financial) => {
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

  // financials = [...financials1, ...financials2]

  // console.log(`seeded ${financials.length} financials`)

  // // Creating Presentation Table

  // //slice off the first element, which is the label
  // presentation = presentation.slice(1)

  // presentation = await Promise.all(
  //   presentation.map((data) => {
  //     return Presentation.create({
  //       adsh: data[0],
  //       report: data[1],
  //       line: data[2],
  //       stmt: data[3],
  //       inpth: data[4],
  //       rfile: data[5],
  //       tag: data[6],
  //       version: data[7],
  //       plabel: data[8],
  //       negating: data[9]
  //     })
  //   })
  // )

  // console.log(`seeded ${presentation.length} presentation data`)

  // Creating Submission Table

  //slice off the first element, which is the label
  submissions = submissions.slice(1)

  submissions = await Promise.all(
    submissions.map((submission) => {
      return Submission.create({
        adsh: submission[0],
        cik: submission[1],
        name: submission[2],
        sic: submission[3],
        countryrba: submission[4],
        stprba: submission[5],
        cityba: submission[6],
        zipba: submission[7],
        bas1: submission[8],
        bas2: submission[9],
        baph: submission[10],
        countryma: submission[11],
        stprma: submission[12],
        cityma: submission[13],
        zipma: submission[14],
        mas1: submission[15],
        mas2: submission[16],
        countryinc: submission[17],
        stprinc: submission[18],
        ein: submission[19],
        former: submission[20],
        changed: submission[21],
        afs: submission[22],
        wksi: submission[23],
        fye: submission[24],
        form: submission[25],
        period: submission[26],
        fy: submission[27],
        fp: submission[28],
        filed: submission[29],
        accepted: submission[30],
        prevrpt: submission[31],
        detail: submission[32],
        instance: submission[33],
        nciks: submission[34],
        aciks: submission[35],
      })
    })
  )

  console.log(`seeded ${submissions.length} submission data`)

  // // Creating Tags Table

  // // slice off the first element, which is the label
  // tags = tags.slice(1)

  // tags = await Promise.all(
  //   tags.map((tag) => {
  //     return Tag.create({
  //       tag: tag[0],
  //       version: tag[1],
  //       custom: tag[2],
  //       abstract: tag[3],
  //       dataype: tag[4],
  //       iord: tag[5],
  //       crdr: tag[6],
  //       tlabel: tag[7],
  //       doc: tag[8]
  //     })
  //   })
  // )

  // console.log(`seeded ${tags.length} tag data`)

  // //Creating tickers table

  // let tickersArray = []
  // for (const ticker in tickers) {
  //   tickersArray.push(tickers[ticker])
  // }

  // tickers = await Promise.all(
  //   tickersArray.map((ticker) => {
  //     return Ticker.create({
  //       cik_str: ticker.cik_str,
  //       ticker: ticker.ticker,
  //       title: ticker.title
  //     })
  //   })
  // )

  // console.log(`seeded ${tickers.length} ticker data`)

  // console.log(`seeded successfully`)
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }


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
