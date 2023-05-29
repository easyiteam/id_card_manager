import express from "express";
import {
  createCardRouteHandler,
} from "../../services/card/index.js";

const router = express.Router();

router.post("/create", async (req, res, next) => {
  const { card_number, matricule_number, name, surname, gender, bornDate, bornPlace, bloodGroup, grade, pv, pv_date, sign_author, type, } = req.body.data.attributes;
  await createCardRouteHandler(req, res, card_number, matricule_number, name, surname, gender, bornDate, bornPlace, bloodGroup, grade, pv, pv_date, sign_author, type,);
});

// router.post("/logout", (req, res) => {
//   return res.sendStatus(204);
// });

export default router;
