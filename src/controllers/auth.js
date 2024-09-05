import { User } from "../models/user.js";
import { body, validationResult } from "express-validator";
import mongoSanitize from "mongo-sanitize";
import { hashPassword, comparePassword } from "../services/hash.password.js";
import jwt from "jsonwebtoken";

export const registerUser = [
  // validate input
  body("username").notEmpty().withMessage("username is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // sanitize input
    const { username, password } = req.body;
    const sanitizedUsername = mongoSanitize(username);
    const sanitizedPassword = mongoSanitize(password);

    try {
      // check if username already exists
      const existingUser = await User.findOne({ username: sanitizedUsername });
      if (existingUser) {
        return res.status(400).json({ message: "username already exists" });
      }

      const hashedPassword = await hashPassword(sanitizedPassword, 10);

      const user = new User({
        username: sanitizedUsername,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({
        message: "user created successfully",
        user: { _id: user._id, username: user.username, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ message: "failed to create user" });
    }
  },
];

export const loginUser = [
  body("username").notEmpty().withMessage("username is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const sanitizedUsername = mongoSanitize(username);
    const sanitizedPassword = mongoSanitize(password);

    try {
      const user = await User.findOne({ username: sanitizedUsername });
      if (!user) {
        return res.status(401).json({ message: "invalid credentials" });
      }

      const isMatch = await comparePassword(sanitizedPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "invalid credentials" });
      }

      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      user.refreshToken = refreshToken;
      await user.save();

      res.status(200).json({
        message: "login successful",
        user: {
          _id: user._id,
          username: user.username,
          role: user.role,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "failed to login" });
    }
  },
];

export const refreshToken = () => [
  body("refreshToken").notEmpty().withMessage("refreshToken is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { refreshToken } = req.body;
    const sanitizedRefreshToken = mongoSanitize(refreshToken);

    try {
      const decoded = jwt.verify(
        sanitizedRefreshToken,
        process.env.JWT_REFRESH_SECRET
      );
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "invalid credentials" });
      }

      if (user.refreshToken !== sanitizedRefreshToken) {
        return res.status(401).json({ message: "invalid credentials" });
      }

      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      res.status(200).json({
        message: "refresh token successful",
        user: {
          _id: user._id,
          username: user.username,
          role: user.role,
          accessToken,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "failed to refresh token" });
    }
  },
];

export const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
