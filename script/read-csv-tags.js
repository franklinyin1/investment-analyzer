const {parse} = require("csv-parse/sync");
const fsPromises = require("fs").promises;
const fs = require("fs")

async function readCSVTags() {

  //read cash-tags
  const cashTagsCSV = await fsPromises.readFile("./csv/cash/cash-tags.csv");
  const parsedCashTags = parse(cashTagsCSV);

  //remove first element from array as that contains the headers
  parsedCashTags.shift();

  let cashTags = parsedCashTags.map((cashTag) => {
    if (cashTag[2] === '1') {
      return cashTag[0]
    }
  })

  cashTags = cashTags.filter((cashTag) => {
    return cashTag !== undefined
  })

  const path = "./cash-tags.txt"

  if (fs.existsSync(path)) {
    await fsPromises.rm(path)
  }

  let stream = fs.createWriteStream("cash-tags.txt", {flags:'a'})
  stream.write(JSON.stringify(cashTags))
  stream.end()
  console.log('extracted cash-tags')

}

readCSVTags()
