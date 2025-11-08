import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { createUser, findUserByEmail, verifyPassword } from '../models/userModel.js';

const router = express.Router();

// Registrazione - DISABILITATA (solo admin può creare utenti da database)
router.post('/register', async (req, res) => {
  res.status(403).json({ 
    error: 'Registrazione disabilitata. Contatta l\'amministratore per creare un account.' 
  });
});

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Trova utente
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenziali non valide' });
      }

      // Verifica password
      const isValidPassword = await verifyPassword(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenziali non valide' });
      }

      // Genera JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login effettuato con successo',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          profile_image: user.profile_image
        }
      });
    } catch (error) {
      console.error('Errore login:', error);
      res.status(500).json({ error: 'Errore durante il login' });
    }
  }
);

export default router;

