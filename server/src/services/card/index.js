import dotenv from "dotenv";
import { cardModel } from "../../schemas/card.schema.js";

dotenv.config();

export const createCardRouteHandler = async (req, res, card_number, name, surname, gender, pv, pv_date, photo, sign_author, type, ) => {
  // console.log(card_number)
  // check if user already exists
  let foundCardByCardNum = await cardModel.findOne({ card_number: card_number });
  if (foundCardByCardNum) {
    // does not get the error
    return res.status(400).json({ message: "Il existe déjà une carte créée avec ce numéro de carte." });
  }

  let newCard;
  let foundCardByPV = await cardModel.findOne({ pv: pv });
  if (foundCardByPV) {
    // does not get the error
    return res.status(400).json({ message: "Il existe déjà une carte créée avec ce numéro de PV." });
  }

  newCard = new cardModel({
    name: name,
    surname: surname,
    gender: gender,
    card_number: card_number,
    pv: pv,
    pv_date: pv_date,
    photo: photo,
    sign_author: sign_author,
    type: type,
  });
  await newCard.save();

  return res.status(200).json({
    card_number: newCard.card_number,
  });
};


export const createCardProRouteHandler = async (req, res, card_number, matricule_number, name, surname, bornDate, bornPlace, bloodGroup, grade, photo, sign_author, type, ) => {

  // check if user already exists
  let foundCardByCardNum = await cardModel.findOne({ card_number: card_number });
  if (foundCardByCardNum) {
    // does not get the error
    return res.status(400).json({ message: "Il existe déjà une carte créée avec ce numéro de carte." });
  }

  let newCard;

  let foundCardByMatriculeNumber = await cardModel.findOne({ matricule_number: matricule_number });
  if (foundCardByMatriculeNumber) {
    // does not get the error
    return res.status(400).json({ message: "Il existe déjà une carte créée avec ce numéro matricule." });
  }

  newCard = new cardModel({
    name: name,
    surname: surname,
    gender: gender,
    card_number: card_number,
    matricule_number: matricule_number,
    bornDate: bornDate,
    bornPlace: bornPlace,
    bloodGroup: bloodGroup,
    grade: grade,
    photo: photo,
    sign_author: sign_author,
    type: type,
  });
  await newCard.save();

  return res.status(200).json({
    card_number: newCard.card_number,
  });
};

export const showACardRouteHandler = async (req, res, cardId,) => {

  const getSetting = await cardModel.findOne({ _id: cardId }).populate({
    path: "sign_author",
    model: "Setting"
  });

  res.send(getSetting);
};
