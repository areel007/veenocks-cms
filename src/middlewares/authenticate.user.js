import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });

    if (!roles.includes(user.role)) {
      return res.status(403).json({ msg: "Permission denied" });
    }
    next();
  };
};
