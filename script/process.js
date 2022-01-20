const natural = require("natural");
const fsPromise = require("fs/promises");
const fs = require("fs");

async function process() {
  const lineTokenizer = new natural.RegexpTokenizer({ pattern: /\n/});
  const tabTokenizer = new natural.RegexpTokenizer({ pattern: /\t/})

  let num = await fsPromise.readFile("./sec-data/2021q3/num.txt", "utf8");
  let pre = await fsPromise.readFile("./sec-data/2021q3/pre.txt", "utf8");
  let sub = await fsPromise.readFile("./sec-data/2021q3/sub.txt", "utf8");
  let tag = await fsPromise.readFile("./sec-data/2021q3/tag.txt", "utf8");
  let tickers = await fsPromise.readFile("./ticker-json/company-tickers.json", "utf8")

  let financials
  let presentation
  let submissions
  let tags

  //split each row into a separate entry in the array
  financials = lineTokenizer.tokenize(num)

  //split each array entry into an another array delimited by tabs
  financials = financials.map((financial) => {
    return financial.split("\t")
  })

  presentation = lineTokenizer.tokenize(pre)

  presentation = presentation.map((data) => {
    return data.split("\t")
  })

  submissions = lineTokenizer.tokenize(sub)

  submissions = submissions.map((submission) => {
    return submission.split("\t")
  })

  tags = lineTokenizer.tokenize(tag)

  tags = tags.map((tag) => {
    return tag.split("\t")
  })

  tickers = JSON.parse(tickers)

  return {financials, presentation, submissions, tags, tickers}

}

module.exports = process
