const jwt = require("jsonwebtoken");

const VerifyToken = (token) => {
  let res = jwt.verify(token, "SecretKey", (err, decode) =>
    decode != undefined ? decode : err
  );
  return !(res instanceof Error) ? res: null;
};


const VerifyTokenMiddleware = (req, res, next) => {
  const token=req.headers.authorization;
  if(!token) {
    return res.status(401).send({message: 'Token is not provided'});
  }
  const user=VerifyToken(token);
  if(user) {
    req.user=user;
    next();
  }
  else {
    res.status(401).send({message: "You are not authorized to access this resource"});
  }
};


module.exports = { VerifyTokenMiddleware };
