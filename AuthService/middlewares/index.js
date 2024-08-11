const jwt = require("jsonwebtoken");

const VerifyToken = (token) => {
  let res = jwt.verify(token, "SecretKey", (err, decode) =>
    decode != undefined ? decode : err
  );
  return !(res instanceof Error);
};

const VerifyTokenMiddleware = (req, res, next) => {
  if (VerifyToken(req.headers.authorization) === true) {
    next();
  } else {
    res
      .status(401)
      .send({ message: "You are not authorized to access this resource" });
  }
};

module.exports = { VerifyTokenMiddleware };
