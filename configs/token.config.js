const jwt = require("jsonwebtoken");

const validateToken = (req, res) => {
  try {
    const carrierHeader = req.headers["authorization"];
    if (!carrierHeader) return false;

    const token = carrierHeader.split(" ")[1];

    return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch {
    return false;
  }
};

const generateToken = (user) => {
  const id = user.id;
  const token = jwt.sign({ data: id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "24h",
  });

  return token;
};
module.exports = { generateToken, validateToken };
