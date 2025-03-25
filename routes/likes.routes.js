const {
  addNewLike,
  getAllLikes,
  getLikeById,
  deleteLikeById,
} = require("../controller/likes.controller");

const router = require("express").Router();

router.post("/", addNewLike);
router.get("/", getAllLikes);
router.get("/:id", getLikeById);
router.delete("/:id", deleteLikeById);

module.exports = router;
