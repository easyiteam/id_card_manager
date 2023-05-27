import express from "express";
import {
  createCardRouteHandler,
} from "../../services/card/index.js";

const router = express.Router();

router.post("/create", async (req, res, next) => {
  const { name, surname, gender, card_number, pv, pv_date, } = req.body.data.attributes;
  await createCardRouteHandler(req, res, name, surname, gender, card_number, pv, pv_date,);
});

// router.post("/logout", (req, res) => {
//   return res.sendStatus(204);
// });

export default router;
