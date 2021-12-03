const express = require("express");
const { loginController, signUpController } = require("../controllers/auth");
const passport = require("../helpers/passport");
const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signUpController);

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send(req.user);
  }
);

module.exports = router;
