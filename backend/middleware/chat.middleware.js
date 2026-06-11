const jwt = require("jsonwebtoken");

function tokenValidation(req, res, next) {
  const token = req.cookies.token;
  

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.json({
        message: "user not authrized",
      });
    }
    
    req.user = decode;

    next();
  } catch (err) {
    console.log("ChatMiddleware err", err);
  }
}
function tokenValidationcheck(req, res, next) {
  const token = req.cookies.token;
  

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.json({
        message: "user not authrized",
      });
    }
    
    req.user = decode;

    next();
  } catch (err) {
    console.log("ChatMiddleware err", err);
  }
}

module.exports = {
  tokenValidation,
  tokenValidationcheck
};
