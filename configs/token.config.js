import jwt from "jsonwebtoken";

export const validateToken = (req, res) => {
  try {
    const carrierHeader = req.headers["authorization"];
    if (!carrierHeader) return false;

    const token = carrierHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "authorization denied" });

    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch {
    return false;
  }
};

export const generateToken = (user) => {
  const id = user.id;

  const token = jsonwebtoken.sign({ data: id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "24h",
  });

  return token;
};
