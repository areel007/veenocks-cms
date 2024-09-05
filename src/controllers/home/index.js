import {
  HomeAbout,
  HomeCoreValues,
  HomeOurProducts,
  HomeCommitment,
  Footer,
} from "../../models/home/index.js";

export const addHomeAbout = async (req, res) => {
  const { title, content } = req.body;

  try {
    const homeAbout = new HomeAbout({ title, content });
    await homeAbout.save();
    res
      .status(201)
      .json({ message: "home about created successfully", homeAbout });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getHomeAbout = async (req, res) => {
  const { id } = req.params;

  try {
    const homeAbout = await HomeAbout.findById(id);
    res.status(200).json({ homeAbout });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateHomeAbout = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const homeAbout = await HomeAbout.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "home about updated successfully", homeAbout });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const addHomeCoreValues = async (req, res) => {
  const { title, content, description } = req.body;

  try {
    const homeCoreValues = new HomeCoreValues({ title, content, description });
    await homeCoreValues.save();
    res.status(201).json({
      message: "home core values created successfully",
      homeCoreValues,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getHomeCoreValues = async (req, res) => {
  const { id } = req.params;

  try {
    const homeCoreValues = await HomeCoreValues.findById(id);
    res.status(200).json({ homeCoreValues });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateHomeCoreValues = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const homeCoreValues = await HomeCoreValues.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json({
      message: "home core values updated successfully",
      homeCoreValues,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const addHomeOurProducts = async (req, res) => {
  const { title, content } = req.body;

  try {
    const homeOurProducts = new HomeOurProducts({ title, content });
    await homeOurProducts.save();
    res.status(201).json({
      message: "home our products created successfully",
      homeOurProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getHomeOurProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const homeOurProducts = await HomeOurProducts.findById(id);
    res.status(200).json({ homeOurProducts });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateHomeOurProducts = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const homeOurProducts = await HomeOurProducts.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json({
      message: "home our products updated successfully",
      homeOurProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const addHomeCommitment = async (req, res) => {
  const { title, content } = req.body;

  try {
    const homeCommitment = new HomeCommitment({ title, content });
    await homeCommitment.save();
    res.status(201).json({
      message: "home commitment created successfully",
      homeCommitment,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getHomeCommitment = async (req, res) => {
  const { id } = req.params;

  try {
    const homeCommitment = await HomeCommitment.findById(id);
    res.status(200).json({ homeCommitment });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateHomeCommitment = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const homeCommitment = await HomeCommitment.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json({
      message: "home commitment updated successfully",
      homeCommitment,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const addFooter = async (req, res) => {
  const { about, factory, showRoom, telephone, email } = req.body;

  try {
    const footer = new Footer({ about, factory, showRoom, telephone, email });
    await footer.save();
    res.status(201).json({
      message: "footer created successfully",
      footer,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getFooter = async (req, res) => {
  const { id } = req.params;

  try {
    const footer = await Footer.findById(id);
    res.status(200).json({ footer });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateFooter = async (req, res) => {
  const { id } = req.params;
  const { about, factory, showRoom, telephone, email } = req.body;

  try {
    const footer = await Footer.findByIdAndUpdate(
      id,
      { about, factory, showRoom, telephone, email },
      { new: true }
    );
    res.status(200).json({
      message: "footer updated successfully",
      footer,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
