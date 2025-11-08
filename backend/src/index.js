import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import astronomicalObjectRoutes from './routes/astronomicalObjectRoutes.js';
import astrophotoRoutes from './routes/astrophotoRoutes.js';
import openaiRoutes from './routes/openaiRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Permetti richieste da Vite su qualsiasi porta (5173, 5174, etc)
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    // Permetti anche richieste senza origin (es: Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/objects', astronomicalObjectRoutes);
app.use('/api/photos', astrophotoRoutes);
app.use('/api/openai', openaiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AstroGallery API is running' });
});

// Serve frontend statico in produzione
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendPath));
  
  // Tutte le route non-API vanno al frontend (React Router)
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  // 404 handler solo in development
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint non trovato' });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error('Errore server:', err);
  res.status(500).json({ 
    error: 'Errore interno del server',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║  🌌 AstroGallery API Server               ║
║  ✅ Server avviato su porta ${PORT}          ║
║  🔗 http://localhost:${PORT}                 ║
║  📡 Health: http://localhost:${PORT}/api/health ║
╚═══════════════════════════════════════════╝
  `);
});

export default app;

