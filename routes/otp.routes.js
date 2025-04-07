const { createOtp, verifyOtp } = require("../controller/otp.controller");

const router = require("express").Router();

router.post("/createotp", createOtp);
router.post("/verfiyotp", verifyOtp);

module.exports = router;
