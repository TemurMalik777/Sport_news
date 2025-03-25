const {
  addNewUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../controller/users.controller");

const router = require("express").Router();

router.post("/", addNewUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById)
router.delete("/:id", deleteUserById);

module.exports = router;
