import { Media } from "../../models/media/index.js";
import { validationResult, body } from "express-validator";
import mongoSanitize from "mongo-sanitize";

export const addMedia = [
  body("title").notEmpty().withMessage("title is required"),
  body("subtitle").notEmpty().withMessage("subtitle is required"),
  body("content").notEmpty().withMessage("content is required"),
  body("image").notEmpty().withMessage("image is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, subtitle, content, image, category } = req.body;
    const sanitizedTitle = mongoSanitize(title);
    const sanitizedSubtitle = mongoSanitize(subtitle);
    const sanitizedContent = mongoSanitize(content);
    const sanitizedImage = mongoSanitize(image);
    const sanitizedCategory = mongoSanitize(category);

    try {
      const media = new Media({
        title: sanitizedTitle,
        subtitle: sanitizedSubtitle,
        content: sanitizedContent,
        image: sanitizedImage,
        category: sanitizedCategory,
      });
      await media.save();
      res.status(200).json({
        message: "media added successfully",
        media,
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },
];

export const getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "media fetched successfully", media });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getMediaByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const media = await Media.find({ category });
    res.status(200).json({ message: "media fetched successfully", media });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteMedia = async (req, res) => {
  const { id } = req.params;
  try {
    await Media.findByIdAndDelete(id);
    res.status(200).json({ message: "media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
