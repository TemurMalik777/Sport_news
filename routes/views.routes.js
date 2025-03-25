const {
  addNewView,
  getAllViews,
  getViewById,
  deleteViewById,
} = require("../controller/views.controller");

const router = require("express").Router();

router.post("/", addNewView);
router.get("/", getAllViews);
router.get("/:id", getViewById);
router.delete("/:id", deleteViewById);

module.exports = router;
