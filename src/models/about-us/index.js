import { Schema, model } from "mongoose";

const aboutUsSchema = new Schema({
  fromEarth: {
    title: String,
    content: String,
  },
  ourVision: {
    type: String,
  },
  background: {
    title: String,
    content: String,
  },
});

export const AboutUs = model("AboutUs", aboutUsSchema);
