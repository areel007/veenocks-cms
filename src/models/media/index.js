import { Schema, model } from "mongoose";

const mediaSchema = new Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    content: { type: String },
    image: { type: String },
    category: {
      type: String,
      enum: ["news", "events", "press releases", "all"],
      default: "all",
    },
  },
  { timestamps: true }
);

export const Media = model("Media", mediaSchema);
