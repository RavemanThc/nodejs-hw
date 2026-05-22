import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import 'dotenv/config';
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  (pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
    next());
});
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});
app.get('/notes/:noteId', (req, res) => {
  const noteId = req.params;
  res
    .status(200)
    .json({ id: noteId, message: `Retrieved note with ID: ${noteId}` });
});
app.use((err, req, res, next) => {
  res.status(404).json({ message: 'Route not found', error: err.message });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT);
