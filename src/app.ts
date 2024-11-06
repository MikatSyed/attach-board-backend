import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './app/routes/index';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { NextFunction } from 'connect';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import path from 'path';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

// Parse request bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Set up routes
app.use('/api/v1/', routes);

// Global error handler
app.use(globalErrorHandler);

// Handle 404 errors for routes not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export { app };
