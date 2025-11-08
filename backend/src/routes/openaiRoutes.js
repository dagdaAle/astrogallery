import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAstronomicalObjectData } from '../services/openaiService.js';

const router = express.Router();

// POST - Ottieni dati oggetto astronomico
router.post('/astronomical-data', authenticateToken, async (req, res) => {
  try {
    const { objectName } = req.body;

    if (!objectName || objectName.trim() === '') {
      return res.status(400).json({ error: 'Nome oggetto richiesto' });
    }

    console.log(`🔍 Richiesta dati per: ${objectName}`);

    const result = await getAstronomicalObjectData(objectName);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({
      message: 'Dati ottenuti con successo',
      data: result.data,
    });
  } catch (error) {
    console.error('Errore endpoint OpenAI:', error);
    res.status(500).json({ error: 'Errore durante recupero dati' });
  }
});

export default router;

