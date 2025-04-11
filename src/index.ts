import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/routes';
import { syncDatabase } from './config/syncDatabase.config';
import path from 'path';

export const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

app.use("/", router);

syncDatabase();