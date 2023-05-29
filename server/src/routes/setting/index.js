import express from "express";
import {
  createSettingRouteHandler,
  showAllSettingsRouteHandler,
  showASettingRouteHandler,
} from "../../services/setting/index.js";
import multer from 'multer';
import * as fs from "fs";
import path from 'path';

const router = express.Router();

// const upload = multer({ dest: '../client/src/uploads/settings/' });

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/uploads/settings/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

router.post("/create", upload.single('signature'), async (req, res, next) => {
  // const fileExtension = req.file.originalname.substring(req.file.originalname.lastIndexOf(".") + 1);
  const sign_author = req.body.sign_author;

  const signature = req.file.path;
  //  console.log(signature)
  // const filePath = req.file.path
  // const __dirname = fs.realpathSync(".");
  // const targetPath = path.join(__dirname, 'public/uploads', req.file.filename);

  // fs.rename(filePath, targetPath, (err) => {
  //   if (err) {
  //     console.error('Error moving uploaded file:', err);
  //     res.sendStatus(500);
  //   } else {
  //     res.sendStatus(200);
  //   }
  // });

  await createSettingRouteHandler(req, res, sign_author, signature,);
});

router.get("/getAll", async (req, res, next) => {
  await showAllSettingsRouteHandler(req, res,);
});

router.post("/getASetting", async (req, res, next) => {
  const signId = req.body.signId;
  
  await showASettingRouteHandler(req, res, signId,);
});

// router.post("/logout", (req, res) => {
//   return res.sendStatus(204);
// });

export default router;
