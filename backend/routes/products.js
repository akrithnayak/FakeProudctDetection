const express = require("express");
const {
  addProduct,
  getProduct,
  scanShipment,
} = require("../controllers/product");
const passport = require("../helpers/passport");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.post(
  "/add/product",
  passport.authenticate("jwt", { session: false }),
  addProduct
);

router.post(
  "/product",
  passport.authenticate("jwt", { session: false }),
  upload.single("qrcode"),
  getProduct
);

router.post(
  "/scanshipment",
  passport.authenticate("jwt", { session: false }),
  upload.single("qrcode"),
  scanShipment
);

module.exports = router;
