import * as fs from "fs";
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

  console.log(signature)

  // const __dirname = fs.realpathSync(".");
  // const newpath = __dirname + "/files/";
  // const file = signature.file;
  // const filename = signature.name; 
  
 
  // signature.mv(`${newpath}${filename}`, (err) => {
  //   if (err) {
  //     res.status(500).send({ message: "File upload failed", code: 200 });
  //   }
  //   res.status(200).send({ message: "File Uploaded", code: 200 });
  // });

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

export const showAllSettingsRouteHandler = async (req, res) => {

  const allSettings = await settingModel.find();

  const sentData = {
    data: {
      type: 'settings',
      attributes: {
        sign_author: allSettings.sign_author,
        signature: allSettings.signature,
        createdAt: allSettings.createdAt,
        updateAt: allSettings.updateAt
      },
      links: {
        self: `${process.env.APP_URL_API}/settings`
      }
    }
  }
  res.send(sentData);
};

