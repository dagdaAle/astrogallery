import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { createUser, findUserByEmail, verifyPassword } from '../models/userModel.js';

const router = express.Router();

// Registrazione
router.post('/register',
  [
    body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Username deve essere tra 3 e 50 caratteri'),
    body('email').isEmail().normalizeEmail().withMessage('Email non valida'),
    body('password').isLength({ min: 6 }).withMessage('Password deve essere almeno 6 caratteri')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Controlla se utente esiste già
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email già registrata' });
      }

      // Crea nuovo utente
      const newUser = await createUser(username, email, password);

      // Genera JWT token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Utente registrato con successo',
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error('Errore registrazione:', error);
      res.status(500).json({ error: 'Errore durante la registrazione' });
    }
  }
);

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

