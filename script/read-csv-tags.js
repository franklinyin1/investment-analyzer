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
      return [cashTag[0], cashTag[1]]
    }
  })

  cashTags = cashTags.filter((cashTag) => {
    return cashTag !== undefined
  })

  const cashTagsPath = "./tags/cash-tags.txt"

  if (fs.existsSync(cashTagsPath)) {
    await fsPromises.rm(cashTagsPath)
  }

  let cashTagsStream = fs.createWriteStream(cashTagsPath, {flags:'a'})
  cashTagsStream.write(JSON.stringify(cashTags))
  cashTagsStream.end()
  console.log('extracted cash-tags')

  //read debt-tags

  const bondTagsCSV = await fsPromises.readFile("./csv/debt/debt-tags.csv")
  const parsedBondTags = parse(bondTagsCSV)
  parsedBondTags.shift()
  let bondTags = parsedBondTags.map(tag => {
    if (tag[2] === '1') {
      return [tag[0],tag[1]]
    }
  })
  bondTags = bondTags.filter(tag => {
    return tag !== undefined
  })

  const borrowTagsCSV = await fsPromises.readFile("./csv/debt/borrow-tags.csv")
  const parsedBorrowTags = parse(borrowTagsCSV)
  parsedBorrowTags.shift()
  let borrowTags = parsedBorrowTags.map(tag => {
    if (tag[2] === '1') {
      return [tag[0],tag[1]]
    }
  })
  borrowTags = borrowTags.filter(tag => {
    return tag !== undefined
  })

  const debtTagsCSV = await fsPromises.readFile("./csv/debt/debt-tags.csv")
  const parsedDebtTags = parse(debtTagsCSV)
  parsedDebtTags.shift()
  let debtTags = parsedDebtTags.map(tag => {
    if (tag[2] === '1') {
      return [tag[0],tag[1]]
    }
  })
  debtTags = debtTags.filter(tag => {
    return tag !== undefined
  })

  const facilitiesTagsCSV = await fsPromises.readFile("./csv/debt/facilities-tags.csv")
  const parsedFacilitiesTags = parse(facilitiesTagsCSV)
  parsedFacilitiesTags.shift()
  let facilitiesTags = parsedFacilitiesTags.map(tag => {
    if (tag[2] === '1') {
      return [tag[0],tag[1]]
    }
  })

  facilitiesTags = facilitiesTags.filter(tag => {
    return tag !== undefined
  })

  const facilityTagsCSV = await fsPromises.readFile("./csv/debt/facility-tags.csv")
  const parsedFacilityTags = parse(facilityTagsCSV)
  parsedFacilityTags.shift()
  let facilityTags = parsedFacilityTags.map(tag => {
    if (tag[2] === '1') {
      return [tag[0],tag[1]]
    }
  })
  facilityTags = facilityTags.filter(tag => {
    return tag !== undefined
  })

  const lineTagsCSV = await fsPromises.readFile("./csv/debt/line-tags.csv")
  const parsedLineTags = parse(lineTagsCSV)
  parsedLineTags.shift()
  let lineTags = parsedLineTags.map(tag => {
    if (tag[2] === '1') {
      return [tag[0],tag[1]]
    }
  })
  lineTags = lineTags.filter(tag => {
    return tag !== undefined
  })

  const loanTagsCSV = await fsPromises.readFile("./csv/debt/loan-tags.csv")
  const parsedLoanTags = parse(loanTagsCSV)
  parsedLoanTags.shift()
  let loanTags = parsedLoanTags.map(tag => {
    if (tag[2] === '1') {
      return [tag[0],tag[1]]
    }
  })
  loanTags = loanTags.filter(tag => {
    return tag !== undefined
  })

  const mortgageTagsCSV = await fsPromises.readFile("./csv/debt/mortgage-tags.csv")
  const parsedMortgageTags = parse(mortgageTagsCSV)
  parsedMortgageTags.shift()
  let mortgageTags = parsedMortgageTags.map(tag => {
    if (tag[2] === '1') {
      return [tag[0],tag[1]]
    }
  })
  mortgageTags = mortgageTags.filter(tag => {
    return tag !== undefined
  })

  const noteTagsCSV = await fsPromises.readFile("./csv/debt/note-tags.csv")
  const parsedNoteTags = parse(noteTagsCSV)
  parsedNoteTags.shift()
  let noteTags = parsedNoteTags.map(tag => {
    if (tag[2] === '1') {
      return [tag[0],tag[1]]
    }
  })
  noteTags = noteTags.filter(tag => {
    return tag !== undefined
  })

  const debtTagsPath = "./tags/debt-tags.txt"

  if (fs.existsSync(debtTagsPath)) {
    await fsPromises.rm(debtTagsPath)
  }

  let debtTagsStream = fs.createWriteStream(debtTagsPath, {flags:'a'})
  debtTagsStream.write(JSON.stringify(debtTags))
  debtTagsStream.end()
  console.log('extracted debt-tags')

  //read non-controlling-interest tags

  const NCITagsCSV = await fsPromises.readFile("./csv/non-controlling_interest/interest-tags.csv");
  const parsedNCITags = parse(NCITagsCSV);

  parsedNCITags.shift();

  let NCITags = parsedNCITags.map((NCITag) => {
    if (NCITag[2] === '1') {
      return [NCITag[0],NCITag[1]]
    }
  })

  NCITags = NCITags.filter((NCITag) => {
    return NCITag !== undefined
  })

  const NCITagsPath = "./tags/NCI-tags.txt"

  if (fs.existsSync(NCITagsPath)) {
    await fsPromises.rm(NCITagsPath)
  }

  let NCITagsStream = fs.createWriteStream(NCITagsPath, {flags:'a'})
  NCITagsStream.write(JSON.stringify(NCITags))
  NCITagsStream.end()
  console.log('extracted NCI-tags')

  //read preferred-equity tags

  const prefTagsCSV = await fsPromises.readFile("./csv/preferred-equity/pref-tags.csv");
  const parsedPrefTags = parse(prefTagsCSV);

  parsedPrefTags.shift();

  let prefTags = parsedPrefTags.map((prefTag) => {
    if (prefTag[2] === '1') {
      return [prefTag[0],prefTag[1]]
    }
  })

  prefTags = prefTags.filter((prefTag) => {
    return prefTag !== undefined
  })

  const prefTagsPath = "./tags/preferred-equity-tags.txt"

  if (fs.existsSync(prefTagsPath)) {
    await fsPromises.rm(prefTagsPath)
  }

  let prefTagsStream = fs.createWriteStream(prefTagsPath, {flags:'a'})
  prefTagsStream.write(JSON.stringify(prefTags))
  prefTagsStream.end()
  console.log('extracted preferred-equity-tags')

}

readCSVTags()
