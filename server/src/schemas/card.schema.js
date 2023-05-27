import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: { required: true, type: String },
  surname: { required: true, type: String },
  gender: { required: true, type: String },
  pv: { required: true, type: String },
  pv_date: { required: true, type: Date },
  card_number: { required: true, type: String },
  type: { required: true, type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

cardSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

cardSchema.set("toJSON", { virtuals: true });

export const cardModel = mongoose.model("Card", cardSchema);
