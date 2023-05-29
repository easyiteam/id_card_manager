import express from "express";
import {
  createCardRouteHandler,
  createCardProRouteHandler,
  showACardRouteHandler,
} from "../../services/card/index.js";
import multer from 'multer';

const router = express.Router();

// const upload = multer({ dest: '../client/src/uploads/cards/commission' });
// const uploadPro = multer({ dest: '../client/src/uploads/cards/professional' });


//Configurations for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/uploads/cards/commission");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

const multerStoragePro = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/uploads/cards/professional");
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

const uploadPro = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

router.post("/create", upload.single('photo'), async (req, res, next) => {
  // console.log(req.file)
  const card_number = req.body.card_number;
  const name = req.body.name;
  const surname = req.body.surname;
  const gender = req.body.gender;
  const pv = req.body.pv;
  const pv_date = req.body.pv_date;
  const photo = req.file.path;
  const sign_author = req.body.sign_author;
  const type = req.body.type;
    
  await createCardRouteHandler(req, res, card_number, name, surname, gender, pv, pv_date, photo, sign_author, type,);
});

router.post("/createpro", uploadPro.single('photo'), async (req, res, next) => {

  const card_number = req.body.card_number; 
  const matricule_number = req.body.matricule_number;
  const name = req.body.name;
  const surname = req.body.surname;
  const bornDate = req.body.bornDate;
  const bornPlace = req.body.bornPlace;
  const bloodGroup = req.body.bloodGroup;
  const grade = req.body.grade;
  const photo = req.file.path;
  const sign_author = req.body.sign_author;
  const type = req.body.type;
    
  await createCardProRouteHandler(req, res, card_number, matricule_number, name, surname, bornDate, bornPlace, bloodGroup, grade, photo, sign_author, type,);
});

router.post("/getACard", async (req, res, next) => {
  const cardId = req.body.cardId;
  
  await showACardRouteHandler(req, res, cardId,);
});

export default router;
