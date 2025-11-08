import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  createAstronomicalObject,
  getAllAstronomicalObjects,
  getAstronomicalObjectById,
  searchAstronomicalObjects,
  getObjectsByType
} from '../models/astronomicalObjectModel.js';

const router = express.Router();

// GET tutti gli oggetti astronomici
router.get('/', async (req, res) => {
  try {
    const objects = await getAllAstronomicalObjects();
    res.json(objects);
  } catch (error) {
    console.error('Errore recupero oggetti:', error);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET oggetto per ID
router.get('/:id', async (req, res) => {
  try {
    const object = await getAstronomicalObjectById(req.params.id);
    if (!object) {
      return res.status(404).json({ error: 'Oggetto non trovato' });
    }
    res.json(object);
  } catch (error) {
    console.error('Errore recupero oggetto:', error);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET ricerca oggetti
router.get('/search/:query', async (req, res) => {
  try {
    const results = await searchAstronomicalObjects(req.params.query);
    res.json(results);
  } catch (error) {
    console.error('Errore ricerca:', error);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET oggetti per tipo
router.get('/type/:type', async (req, res) => {
  try {
    const objects = await getObjectsByType(req.params.type);
    res.json(objects);
  } catch (error) {
    console.error('Errore recupero per tipo:', error);
    res.status(500).json({ error: 'Errore server' });
  }
});

// POST crea nuovo oggetto astronomico (solo admin/autenticati)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newObject = await createAstronomicalObject(req.body);
    res.status(201).json(newObject);
  } catch (error) {
    console.error('Errore creazione oggetto:', error);
    res.status(500).json({ error: 'Errore durante creazione oggetto' });
  }
});

export default router;

