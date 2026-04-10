const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ msg: "No token" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Keep a stable shape for downstream controllers.
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(401).json({ msg: "Invalid token" });
  }
};
