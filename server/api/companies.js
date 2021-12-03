const router = require("express").Router();
const {
  models: { Financial, Presentation, Submission, Tag },
} = require("../db");

//GET request /api/companies/:companyName
router.get("/:companyName", async (req, res, next) => {
  try {
    const companyName = req.params.companyName;

    console.log("companyName:", companyName);


    const submissions = await Submission.findAll({where: {name: companyName}})

    let financials = []

    for (const submission of submissions) {
      let submissionFinancials = await Financial.findAll({where: {adsh: submission.adsh}})
      financials = [...financials, ...submissionFinancials]
    }

    res.status(200).json({submissions, financials})
  } catch (error) {
    next(error);
  }
});

module.exports = router;
