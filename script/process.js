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


  //split each row into a separate entry in the array
  let financials = lineTokenizer.tokenize(num)

  //split each array entry into an another array delimited by tabs
  financials = financials.map((financial) => {
    return financial.split("\t")
  })

  return financials

}

module.exports = process
