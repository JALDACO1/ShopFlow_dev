const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    const error = new Error("No esta autorizado");
    error.status = 401;
    return next(error);
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    const error = new Error("Token invalido");
    error.status = 401;
    return next(error);
  }
};

module.exports = verifyToken;
