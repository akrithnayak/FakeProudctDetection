const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use(cors());

app.use("/", authRoutes);

app.listen(4000, () => {
  console.log("Server is running!!");
});
