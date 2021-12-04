const express = require("express");
const { addProduct, getProduct } = require("../controllers/product");
const passport = require("../helpers/passport");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.post(
  "/add/product",
  passport.authenticate("jwt", { session: false }),
  addProduct
);

router.get(
  "/product",
  passport.authenticate("jwt", { session: false }),
  upload.single("qrcode"),
  getProduct
);

module.exports = router;
