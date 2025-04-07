const {
  addNewUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  loginUser,
  logOutUser,
} = require("../controller/users.controller");

const router = require("express").Router();

router.post("/", addNewUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/loginUser", loginUser)
router.post("/loginout", logOutUser)
router.put("/:id", updateUserById)
router.delete("/:id", deleteUserById);

module.exports = router;
