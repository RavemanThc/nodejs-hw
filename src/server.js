import 'dotenv/config';
import express from 'express';

import cors from 'cors';

import connectMongoDB from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import noteRouter from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import authRouters from './routes/authRoutes.js';
const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(logger);
app.use(
  express.json({
    limit: '100kb',
  }),
);
app.use(cors());
app.use(cookieParser());
app.use(noteRouter);
app.use(authRouters);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
