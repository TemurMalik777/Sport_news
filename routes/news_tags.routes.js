const {
  addNewsTag,
  getAllNewsTags,
  getNewsTagById,
  updateNewsTagById,
  deleteNewsTagById,
} = require("../controller/news_tags.controller");

const router = require("express").Router();

router.post("/", addNewsTag);
router.get("/", getAllNewsTags);
router.get("/:id", getNewsTagById);
router.put("/:id", updateNewsTagById);
router.delete("/:id", deleteNewsTagById);

module.exports = router;
