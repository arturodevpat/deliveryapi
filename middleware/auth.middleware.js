const jwt = require("jsonwebtoken");
const jwtDataOptions = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: 60000000,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
};

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .json({ message: "Acceso negado! Access token expirado" });
  }
  return res.status(401).json({ message: "acceso denegado" });
};

const verifyToken = (req, res, next) => {
  /*let token = req.cookies.access_token;*/
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "no se proporciono un token" });
  }

  jwt.verify(token, jwtDataOptions.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
