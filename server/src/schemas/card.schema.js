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
  matricule_number: { required: false, type: String },
  pv: { required: false, type: String },
  pv_date: { required: false, type: String },
  sign_author: { type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'Setting' },
  photo: { required: true, type: String },
  type: { required: true, type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date },
});

cardSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

cardSchema.set("toJSON", { virtuals: true });

export const cardModel = mongoose.model("Card", cardSchema);
