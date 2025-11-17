const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

module.exports = async function (req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
