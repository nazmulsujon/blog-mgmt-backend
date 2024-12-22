import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import router from './app/routes/route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://blog-management-backend-iota.vercel.app',
    ],
  }),
);

// application routes
app.use('/api', router);

const test = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', test);

// handel error globally
app.use(globalErrorHandler);
app.use(notFound);

export default app;
