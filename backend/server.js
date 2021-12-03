const express = require("express");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const passport = require("./helpers/passport");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth");

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cookieparser());
app.use(cors());

app.use("/", authRoutes);

app.listen(4000, () => {
  console.log("Server is running!!");
});
