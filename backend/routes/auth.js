const express = require("express");
const {
  loginController,
  signUpController,
  getProfile,
} = require("../controllers/auth");
const passport = require("../helpers/passport");
const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signUpController);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

module.exports = router;
