import mongoose from "mongoose";

const idCardSchema = new mongoose.Schema({
  name: { required: true, type: String },
  email: { required: true, type: String },
  email_verified_at: { type: Date },
  password: { required: true, type: String },
  profile_image: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

idCardSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

idCardSchema.set("toJSON", { virtuals: true });

export const userModel = mongoose.model("User", idCardSchema);
