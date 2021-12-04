const express = require("express");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const passport = require("./helpers/passport");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

const authRoutes = require("./routes/auth");
const prodRoutes = require("./routes/products");

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cookieparser());
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", prodRoutes);

app.listen(4000, () => {
  console.log("Server is running!!");
});
