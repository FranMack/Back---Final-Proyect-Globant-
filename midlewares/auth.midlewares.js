const tokenConfig = require("../configs/token.config");
const userModel = require("../models/user.model");

export const auth = async (req, res, next) => {
  const tokenDecoded = tokenConfig.validateToken(req);

  if (!tokenDecoded) return res.status(401).json({ message: "not authorized" });

  const user = await userModel.findById(tokenDecoded.data);

  if (!user) return res.status(401).json({ message: "not authorized" });

  req.user = user;
  next();
};
