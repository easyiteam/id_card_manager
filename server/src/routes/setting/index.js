import express from "express";
import {
  createSettingRouteHandler,
  showAllSettingsRouteHandler,
} from "../../services/setting/index.js";
import multer from 'multer';
import * as fs from "fs";
import path from 'path';

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Le dossier de destination des fichiers uploadés

// router.post("/create", async (req, res, next) => {
  router.post("/create", upload.single('signature'), async (req, res, next) => {
  console.log(req)
  const filePath = req.body.data.attributes.signature.path
  // Par exemple, pour le déplacer vers un dossier "public/uploads" à la racine de votre projet :
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
  const {sign_author, signature, } = req.body.data.attributes;
  await createSettingRouteHandler(req, res, sign_author, signature,);
});

router.get("/getAll", async (req, res, next) => {
  await showAllSettingsRouteHandler(req, res,);
});

// router.post("/logout", (req, res) => {
//   return res.sendStatus(204);
// });

export default router;
