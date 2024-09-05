import { Factory } from "../../models/factory/index.js";

export const addFactory = async (req, res) => {
  const { craftingElegance } = req.body;
  try {
    const newFactory = new Factory({ craftingElegance });
    await newFactory.save();
    res.status(200).json({ message: "factory created successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getFactory = async (req, res) => {
  try {
    const factory = await Factory.findOne();
    res.status(200).json({ factory });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateFactory = async (req, res) => {
  const { id } = req.params;
  const { craftingElegance } = req.body;
  try {
    const factory = await Factory.findByIdAndUpdate(
      id,
      { craftingElegance },
      { new: true }
    );
    res.status(200).json({ message: "factory updated successfully", factory });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
