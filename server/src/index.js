import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './passport.js';
import {
  meRoutes,
  authRoutes,
  cardRoutes,
  settingRoutes,
} from './routes/index.js';
import path from 'path';
import * as fs from 'fs';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { MONGO_URI } from './mongo/index.js';
import { seedDB } from './mongo/seedData.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to db');
  })
  .catch(() => {
    console.log('Error while connecting to DB');
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.get('/', function (req, res) {
  const __dirname = fs.realpathSync('.');
  res.sendFile(path.join(__dirname, '/src/landing/index.html'));
});

app.get('/seed', async (_, res) => {
  try {
    await seedDB();
    res.send('Seed successfully!');
  } catch (error) {
    res.status(500).end();
  }
});

app.use('/', authRoutes);
app.use('/me', meRoutes);
app.use('/card', cardRoutes);
app.use('/setting', settingRoutes);

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
