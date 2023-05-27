import express from "express";
import {
  createSettingRouteHandler,
} from "../../services/setting/index.js";

const router = express.Router();

router.post("/create", async (req, res, next) => {
  const {sign_author, signature, } = req.body.data.attributes;
  await createSettingRouteHandler(req, res,sign_author, signature,);
});

// router.post("/logout", (req, res) => {
//   return res.sendStatus(204);
// });

export default router;
