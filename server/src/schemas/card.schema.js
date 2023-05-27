import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  card_number: { required: true, type: String },
  name: { required: true, type: String },
  surname: { required: true, type: String },
  gender: { required: false, type: String },
  bornDate: { required: false, type: String },
  bornPlace: { required: false, type: String },
  bloodGroup: { required: false, type: String },
  grade: { required: false, type: String },
  marticule_number: { required: false, type: String },
  pv_date: { required: false, type: Date },
  sign_author: { required: false, type: Date },
  type: { required: true, type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

cardSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

cardSchema.set("toJSON", { virtuals: true });

export const cardModel = mongoose.model("Card", cardSchema);
