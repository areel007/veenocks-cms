import { Schema, model } from "mongoose";

const homeAboutSchema = new Schema({
  title: { type: String },
  content: { type: String },
});

export const HomeAbout = model("HomeAbout", homeAboutSchema);

const homeCoreValues = new Schema({
  title: { type: String },
  content: { type: String },
  description: { type: String },
});

export const HomeCoreValues = model("HomeCoreValues", homeCoreValues);

const homeOurProducts = new Schema({
  title: { type: String },
  content: { type: String },
});

export const HomeOurProducts = model("HomeOurProducts", homeOurProducts);

const homeCommitment = new Schema({
  title: { type: String },
  content: { type: String },
});

export const HomeCommitment = model("HomeCommitment", homeCommitment);

const footer = new Schema({
  about: { type: String },
  factory: { type: String },
  showRoom: { type: String },
  telephone: { type: String },
  email: { type: String },
});

export const Footer = model("Footer", footer);
