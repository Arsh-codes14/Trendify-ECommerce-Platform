import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden!" });
    }

    next();
  } catch (error) {
    // INFO: Invalid or expired token
    res
      .status(401)
      .json({ success: false, message: "Session expired. Please log in again." });
  }
};

export default adminAuth;
