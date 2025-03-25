const {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
} = require("../controller/category.controller");

const router = require("express").Router();

router.post("/", addNewCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategoryById);

module.exports = router;
