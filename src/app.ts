import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import { globalErrorHandler } from './middleware/GlobalErrorHandler';
import handleNotFound from './middleware/HandleNotFound';

const app: Application = express();

// Parsers Configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Application Routes
app.use('/api', router);

const test = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is saying Hello!!!',
  });
};

app.get('/', test);
app.use(globalErrorHandler);
app.use(handleNotFound);

export default app;
