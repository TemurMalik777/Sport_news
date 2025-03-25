const {
  addNewNewsWithLang,
  getAllNewsWithLang,
  getNewsWithLangById,
  deleteNewsWithLangById,
} = require("../controller/newswithlang.controller");

const router = require("express").Router();

router.post("/", addNewNewsWithLang);
router.get("/", getAllNewsWithLang);
router.get("/:id", getNewsWithLangById);
router.delete("/:id", deleteNewsWithLangById);


module.exports = router