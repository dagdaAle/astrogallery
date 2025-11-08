import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { findUserById, updateUserProfile } from '../models/userModel.js';
import { getAstrophotosByUser } from '../models/astrophotoModel.js';

const router = express.Router();

// GET profilo utente autenticato
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    res.json(user);
  } catch (error) {
    console.error('Errore recupero profilo:', error);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET profilo pubblico utente
router.get('/:id', async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    res.json(user);
  } catch (error) {
    console.error('Errore recupero utente:', error);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET foto di un utente
router.get('/:id/photos', async (req, res) => {
  try {
    const photos = await getAstrophotosByUser(req.params.id);
    res.json(photos);
  } catch (error) {
    console.error('Errore recupero foto utente:', error);
    res.status(500).json({ error: 'Errore server' });
  }
});

// PUT aggiorna profilo
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { profile_image, bio } = req.body;
    const updatedUser = await updateUserProfile(req.user.userId, { profile_image, bio });
    res.json(updatedUser);
  } catch (error) {
    console.error('Errore aggiornamento profilo:', error);
    res.status(500).json({ error: 'Errore durante aggiornamento profilo' });
  }
});

export default router;

