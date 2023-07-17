const { validateToken } = require("../configs/token.config");
const userModel = require("../models/user.model");
const responseHandler = require("../handlers/response.handler");

const auth = async (req, res, next) => {
  const tokenDecoded = validateToken(req);

  if (!tokenDecoded) return responseHandler.unauthorize(res);
  const user = await userModel.findById(tokenDecoded.data);
  if (!user) return responseHandler.unauthorize(res);

  req.user = user;
  next();
};

module.exports = { auth };
