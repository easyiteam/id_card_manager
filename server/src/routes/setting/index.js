import express from "express";
import {
  createSettingRouteHandler,
  showAllSettingsRouteHandler,
} from "../../services/setting/index.js";
import multer from 'multer';
import * as fs from "fs";
import path from 'path';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post("/create", upload.single('signature'), async (req, res, next) => {
  const {sign_author, signature, } = req.body.data.attributes;

  console.log(req.body.data.attributes.signature)

  const filePath = req.body.data.attributes.signature.path

  const __dirname = fs.realpathSync(".");
  const targetPath = path.join(__dirname, 'public/uploads', req.body.data.attributes.signature.filename);
  fs.rename(filePath, targetPath, (err) => {
    if (err) {
      console.error('Error moving uploaded file:', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });

  await createSettingRouteHandler(req, res, sign_author, signature,);
});

router.get("/getAll", async (req, res, next) => {
  await showAllSettingsRouteHandler(req, res,);
});

// router.post("/logout", (req, res) => {
//   return res.sendStatus(204);
// });

export default router;
