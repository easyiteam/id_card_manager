import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
    sign_author: { required: true, type: String },
    signature: { required: true, type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
});

settingSchema.virtual("id").get(function() {
    return this._id.toHexString();
});

settingSchema.set("toJSON", { virtuals: true });

export const settingModel = mongoose.model("Setting", settingSchema);