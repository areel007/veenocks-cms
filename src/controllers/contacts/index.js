import { Contact, FormInput } from "../../models/contacts/index.js";

export const addContacts = async (req, res) => {
  const { title, subtitle } = req.body;

  try {
    const contacts = new Contact({ title, subtitle });
    await contacts.save();
    res.status(201).json({
      message: "contacts created successfully",
      contacts,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findOne();
    res.status(200).json({
      message: "contacts fetched successfully",
      contacts,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateContacts = async (req, res) => {
  const { title, subtitle } = req.body;
  try {
    const contacts = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      { title, subtitle },
      { new: true },
    );
    res.status(200).json({
      message: "contacts updated successfully",
      contacts,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const addFormInput = async (req, res) => {
  const { name, email, message, phoneNumber, subject } = req.body;

  try {
    const formInput = new FormInput({
      name,
      email,
      message,
      phoneNumber,
      subject,
    });
    await formInput.save();
    res.status(201).json({
      message: "form input created successfully",
      formInput,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getFormInput = async (req, res) => {
  try {
    const formInput = await FormInput.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "form input fetched successfully",
      formInput,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
