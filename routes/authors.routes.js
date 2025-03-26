const { addNewAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById } = require("../controller/authors.controller")



const router = require("express").Router()

router.post("/", addNewAuthor)
router.get("/", getAllAuthors)
router.get("/:id", getAuthorById)
router.put("/:id", updateAuthorById)
router.delete("/:id", deleteAuthorById)

module.exports = router