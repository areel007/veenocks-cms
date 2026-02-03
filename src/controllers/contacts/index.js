import { Contact, FormInput } from "../../models/contacts/index.js";
import { Parser } from "json2csv";

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

export const deleteFormInput = async (req, res) => {
  try {
    await FormInput.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "form input deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteAllFormInput = async (req, res) => {
  try {
    await FormInput.deleteMany({});
    res.status(200).json({
      message: "all form inputs deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const downloadCSV = async (req, res) => {
  try {
    const submissions = await FormInput.find().lean();

    if (!submissions.length) {
      return res.status(404).json({ message: "No submissions found" });
    }

    const fields = [
      { label: "Name", value: "name" },
      { label: "Email", value: "email" },
      { label: "Phone Number", value: "phoneNumber" },
      { label: "Subject", value: "subject" },
      { label: "Message", value: "message" },
      { label: "Submitted At", value: (row) => row.createdAt.toISOString() },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(submissions);

    res.header("Content-Type", "text/csv");
    res.attachment("submissions.csv");
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate CSV" });
  }
};
