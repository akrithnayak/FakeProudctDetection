const connection = require("../connectdb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginController = (req, res) => {
  var { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = '${email}'`;

  connection.query(query, async (err, result, fields) => {
    if (err || !result || !result.length)
      return res.send({ msg: "User account doesn't exist!!" });

    var passwordAuthenticated = await bcrypt.compare(
      password,
      result[0].password
    );
    if (!passwordAuthenticated)
      return res.send({ msg: "Email id and password doesn't match!!" });

    const params = {
      email: result[0].email,
      name: result[0].name,
    };

    const token = jwt.sign(params, "secret");
    res.cookie("jwt", token, { expire: new Date() + 9999 });
    return res.send({ msg: "Logged In", token });
  });
};

exports.signUpController = async (req, res) => {
  var { name, role, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users VALUES ('${email}', '${name}', '${hash}', ${role})`;
  connection.query(query, (err, result, fields) => {
    if (err && err.errno === 1062)
      return res.send({ msg: "User already exists with this mail id!!" });
    return res.send({ msg: "Signed up" });
  });
};
