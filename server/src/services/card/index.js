import dotenv from "dotenv";
import { cardModel } from "../../schemas/card.schema.js";

dotenv.config();

export const createCardRouteHandler = async (req, res, name, surname, gender, card_number, pv, pv_date, ) => {
  // check if user already exists
  let foundCardByCardNum = await cardModel.findOne({ card_number: card_number });
  if (foundCardByCardNum) {
    // does not get the error
    return res.status(400).json({ message: "Il existe déjà une carte créée avec ce numéro de carte." });
  }

  let foundCardByPV = await cardModel.findOne({ card_number: card_number });
  if (foundCardByPV) {
    // does not get the error
    return res.status(400).json({ message: "Il existe déjà une carte créée avec ce numéro de PV." });
  }

  const newCard = new cardModel({
    name: name,
    surname: surname,
    gender: gender,
    card_number: card_number,
    pv: pv,
    pv_date: pv_date,
  });
  await newCard.save();

  return res.status(200).json({
    card_number: newCard.card_number,
  });
};

