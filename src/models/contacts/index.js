import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  title: String,
  subtitle: String,
});

const formInputSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export const Contact = model("Contact", contactSchema);
export const FormInput = model("FormInput", formInputSchema);
