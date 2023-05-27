import dotenv from "dotenv";
import { settingModel } from "../../schemas/setting.schema.js";

dotenv.config();

export const createSettingRouteHandler = async (req, res, sign_author, signature, ) => {
  // check if user already exists
  let foundSetting = await settingModel.findOne({ sign_author: sign_author });
  if (foundSetting) {
    // does not get the error
    return res.status(400).json({ message: "Il existe déjà un paramètre enregistré sous ce nom." });
  }

  const newSetting = new settingModel({
    sign_author: sign_author,
    signature: signature,
  });
  await newSetting.save();

  return res.status(200).json({
    sign_author: newSetting.sign_author,
    signature: newSetting.signature,
  });
};

