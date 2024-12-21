import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));

const test = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', test);

export default app;
