import { User } from "../models/user.js";
import mongoSanitize from "mongo-sanitize";
import { body, validationResult } from "express-validator";
import { comparePassword, hashPassword } from "../services/hash.password.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users: users.map((user) => {
        return {
          _id: user._id,
          username: user.username,
          role: user.role,
        };
      }),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = [
  body("oldPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { oldPassword, newPassword } = req.body;

      const sanitizedOldPassword = mongoSanitize(oldPassword);
      const sanitizedNewPassword = mongoSanitize(newPassword);

      const isMatch = await comparePassword(
        sanitizedOldPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const hashedPassword = await hashPassword(sanitizedNewPassword, 10);

      user.password = hashedPassword;
      await user.save();

      res.status(200).json({
        message: "Password updated successfully",
        user: {
          _id: user._id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error updating user:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
