import 'dotenv/config';
import express from 'express';

import cors from 'cors';
import userRooutes from './routes/userRoutes.js';
import connectMongoDB from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import notesRoutes from './routes/notesRoutes.js';
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
app.use(authRoutes);
app.use(userRooutes);
app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
