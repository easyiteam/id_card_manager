import express from "express";
import {
  createSettingRouteHandler,
  showAllSettingsRouteHandler,
} from "../../services/setting/index.js";

const router = express.Router();

router.post("/create", async (req, res, next) => {
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
