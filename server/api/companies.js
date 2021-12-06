const router = require("express").Router();
const {
  models: { Financial, Presentation, Submission, Tag, Ticker },
} = require("../db");

//GET request /api/companies/:ticker
router.get("/:ticker", async (req, res, next) => {
  try {
    const ticker = req.params.ticker.toUpperCase();

    const company = await Ticker.findOne({where: {ticker}})

    const submissions = await Submission.findAll({where: {cik: company.cik_str}})

    let financials = []

    for (const submission of submissions) {
      let submissionFinancials = await Financial.findAll({where: {adsh: submission.adsh}})
      financials = [...financials, ...submissionFinancials]
    }

    res.status(200).json({submissions, financials, company})
  } catch (error) {
    next(error);
  }
});

module.exports = router;
