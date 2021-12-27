const router = require("express").Router();
const {
  models: { Financial, Presentation, Submission, Tag, Ticker },
} = require("../db");

//GET request /api/tags/
router.get("/", async (req, res, next) => {
  try {
    const tags = await Tag.findAll()

    res.status(200).json(tags)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
