import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import { seedPosts } from './services/seedService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'MiniBlog REST API',
    author: 'Khushi Tyagi',
    version: '1.0.0',
  });
});

// Post routes
app.use('/api/posts', postRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Launch server
const server = app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🖋️  Mini Blog REST API running on http://localhost:${PORT}`);
  console.log(`🌐 Ready for React Frontend at http://localhost:5173`);
  console.log('👤 Developed by: Khushi Tyagi');
  console.log('====================================================');
});

// Connect to DB and seed
(async () => {
  try {
    await connectDB();
    await seedPosts(false);
    console.log('[Startup] Mini Blog Database ready with posts.');
  } catch (err) {
    console.error('[Startup DB Error]:', err);
  }
})();

export default app;
