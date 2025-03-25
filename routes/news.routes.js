const {
  addNewNews,
  getAllNews,
  getNewsById,
  deleteNewsById,
} = require("../controller/news.controller");

const router = require("express").Router();

router.post("/", addNewNews);
router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.get("/:id", deleteNewsById);

module.exports = router;
