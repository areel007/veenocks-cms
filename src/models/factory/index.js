import { Schema, model } from "mongoose";

const factorySchema = new Schema({
  craftingElegance: {
    title: String,
    content: String,
  },
});

export const Factory = model("Factory", factorySchema);
