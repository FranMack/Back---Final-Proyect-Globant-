import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "authorization denied" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

export const generateToken = (req, res, next) => {
  const user = { id: 123, username: "exampleUser" };

  const token = jwt.sign(user, process.env.TOKEN_SECRET);

  res.cookie("token", token, { httpOnly: true });

  next();
};
