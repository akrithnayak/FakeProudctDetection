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
  (req, res, next) => {
    if (!req.user || req.user.role > 0)
      return res.send({ msg: "Unauthorized" });
    next();
  },
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
  (req, res, next) => {
    if (!req.user || req.user.role > 1)
      return res.send({ msg: "Unauthorized" });
    next();
  },
  scanShipment
);

module.exports = router;
