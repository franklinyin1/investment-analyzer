const router = require("express").Router();
const {
  models: { Financial, Presentation, Submission, Tag, Ticker },
} = require("../db");

const axios = require("axios")
require('dotenv').config()
let ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY

//GET request /api/companies/:ticker
router.get("/:ticker", async (req, res, next) => {
  try {
    const ticker = req.params.ticker.toUpperCase();

    const company = await Ticker.findOne({where: {ticker}})

    const submissions = await Submission.findAll({where: {cik: company.cik_str}})

    let financials = []
    let presentations = []

    for (const submission of submissions) {
      let submissionFinancials = await Financial.findAll({where: {adsh: submission.adsh}})
      financials = [...financials, ...submissionFinancials]

      let submissionPresentations = await Presentation.findAll({where: {adsh: submission.adsh}})
      presentations = [...presentations, ...submissionPresentations]
    }

    const alphaVantageURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_KEY}`;

    let priceData = await axios.get(alphaVantageURL)

    priceData = priceData.data['Global Quote']

    res.status(200).json({submissions, financials, company, presentations, priceData})
  } catch (error) {
    next(error);
  }
});

module.exports = router;
