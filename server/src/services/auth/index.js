import dotenv from "dotenv";
import nodemailer from "nodemailer";
import randomToken from "random-token";
import bcrypt from "bcrypt";
import { userModel } from "../../schemas/user.schema.js";
import jwt from 'jsonwebtoken';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export const loginRouteHandler = async (req, res, email, password) => {
  //Check If User Exists
  let foundUser = await userModel.findOne({ email: email });
  if (foundUser == null) {
    return res.status(400).json({
      errors: [{ detail: "Aucun compte ne correspond à cette adresse email." }],
    });
  } else {
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (validPassword) {
      // Generate JWT token
      const token = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        "token",
        {
          expiresIn: "24h",
        }
      );
      return res.json({
        token_type: "Bearer",
        expires_in: "24h",
        access_token: token,
        refresh_token: token,
      });
    } else {
      return res.status(400).json({
        errors: [{ detail: "Mot de passe incorrect" }],
      });
    }
  }
};

export const registerRouteHandler = async (req, res, name, email, password) => {
  // check if user already exists
  let foundUser = await userModel.findOne({ email: email });
  if (foundUser) {
    // does not get the error
    return res.status(400).json({ message: "Il existe déjà un compte créé avec cette adresse email." });
  }

  // check password to exist and be at least 8 characters long
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Le mot de passe doit contenir au moins 8 caractères." });
  }

  // hash password to save in db
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    name: name,
    email: email,
    password: hashPassword,
  });
  await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, "token", {
    expiresIn: "24h",
  });
  return res.status(200).json({
    token_type: "Bearer",
    expires_in: "24h",
    access_token: token,
    refresh_token: token,
  });
};

export const forgotPasswordRouteHandler = async (req, res, email) => {
  let foundUser = await userModel.findOne({ email: email });

  if (!foundUser) {
    return res.status(400).json({
      errors: { email: ["Aucun compte ne correspond à cette adresse email."] },
    });
  } else {
    let token = randomToken(20);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "admin@jsonapi.com", // sender address
      to: email, // list of receivers
      subject: "Créer un nouveau mot de passe", // Subject line
      html: `<p>You requested to change your password.If this request was not made by you please contact us. Access <a href='${process.env.APP_URL_CLIENT}/auth/reset-password?token=${token}&email=${email}'>this link</a> to reste your password </p>`, // html body
    });
    const dataSent = {
      data: "password-forgot",
      attributes: {
        redirect_url: `${process.env.APP_URL_API}/password-reset`,
        email: email,
      },
    };
    return res.status(204).json(dataSent);
  }
};

export const resetPasswordRouteHandler = async (req, res) => {
  const foundUser = await userModel.findOne({
    email: req.body.data.attributes.email,
  });

  if (!foundUser) {
    return res.status(400).json({
      errors: { email: ["Aucun compte ne correspond à cette adresse email."] },
    });
  } else {
    const { password, password_confirmation } = req.body.data.attributes;
    // validate password
    if (password.length < 8) {
      return res.status(400).json({
        errors: {
          password: ["Le mot de passe doit contenir au moins 8 caractères."],
        },
      });
    }

    if (password != password_confirmation) {
      return res.status(400).json({
        errors: {
          password: ["Les mots de passe doivent être identiques."],
        },
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await userModel.updateOne(
      { email: foundUser.email },
      { $set: { "password": hashPassword } }
    );
    return res.sendStatus(204);
  }
};
