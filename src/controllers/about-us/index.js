import { AboutUs } from "../../models/about-us/index.js";

export const addAboutUs = async (req, res) => {
  const { fromEarth, ourVision, background } = req.body;
  try {
    const aboutUs = new AboutUs({ fromEarth, ourVision, background });
    await aboutUs.save();
    res.status(201).json({
      message: "about us created successfully",
      aboutUs,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne();
    res.status(200).json({
      message: "about us fetched successfully",
      aboutUs,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateAboutUs = async (req, res) => {
  const { fromEarth, ourVision, background } = req.body;
  try {
    const aboutUs = await AboutUs.findOneAndUpdate(
      { _id: req.params.id },
      { fromEarth, ourVision, background },
      { new: true }
    );
    res.status(200).json({
      message: "about us updated successfully",
      aboutUs,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
