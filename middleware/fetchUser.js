const JWTSecret = process.env.JWTSECRET;
let jwt = require("jsonwebtoken");
const fetchUser = (req, res, next) => {
  //Get user from jwt token and add id to req object
  const token = req.header("auth-token");
  let success=false;
  if (!token) {
    res.status(401).send({ Error: "Please authenticate using valid token",success });
  }
  try {
    const data = jwt.verify(token, JWTSecret);
    req.user = data.user;
  } catch (error) {
    res.status(401).send({Error: "Please authenticate useing valid token" ,success});
  }

  next();
};
module.exports = fetchUser;
