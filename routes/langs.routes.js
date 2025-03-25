const {
  addNewLang,
  getAllLangs,
  getLangById,
  deleteLangById,
} = require("../controller/langs.controller");

const router = require("express").Router();

router.post("/", addNewLang);
router.get("/", getAllLangs);
router.get("/:id", getLangById);
router.delete("/:id", deleteLangById);

module.exports = router;
