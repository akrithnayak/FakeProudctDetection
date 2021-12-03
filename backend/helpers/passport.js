var JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const connection = require("../connectdb");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);

    var { email } = jwt_payload;

    const query = `SELECT * FROM users WHERE email = '${email}'`;

    connection.query(query, async (err, result, fields) => {
      if (err || !result || !result.length) done(null, false);
      else {
        var resObject = {
          email: result[0].email,
          name: result[0].name,
          role: result[0].role,
        };
        done(null, resObject);
      }
    });
  })
);

module.exports = passport;
