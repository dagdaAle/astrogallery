import express from 'express';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import cloudinary from '../config/cloudinary.js';
import {
  createAstrophoto,
  getAllAstrophotos,
  getAstrophotoById,
  deleteAstrophoto,
  incrementViews
} from '../models/astrophotoModel.js';
import { createAstronomicalObject } from '../models/astronomicalObjectModel.js';

const router = express.Router();

// GET tutte le foto
router.get('/', optionalAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    
    const photos = await getAllAstrophotos(limit, offset);
    res.json(photos);
  } catch (error) {
    console.error('Errore recupero foto:', error);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET foto singola
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const photo = await getAstrophotoById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Foto non trovata' });
    }
    
    // Incrementa views
    await incrementViews(req.params.id);
    
    res.json(photo);
  } catch (error) {
    console.error('Errore recupero foto:', error);
    res.status(500).json({ error: 'Errore server' });
  }
});

// POST upload nuova foto
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nessun file caricato' });
    }

    // Upload su Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'astrogallery',
          resource_type: 'image',
          transformation: [
            { width: 2000, height: 2000, crop: 'limit' },
            { quality: 'auto:good' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const uploadResult = await uploadPromise;

    // Crea prima l'oggetto astronomico
    let objectId = req.body.object_id || null;
    
    if (!objectId && req.body.common_name) {
      // Parse facts se è una stringa JSON
      let factsArray = [];
      if (req.body.facts) {
        try {
          factsArray = typeof req.body.facts === 'string' 
            ? JSON.parse(req.body.facts) 
            : req.body.facts;
        } catch (e) {
          console.error('Errore parsing facts:', e);
          factsArray = [];
        }
      }

      const astronomicalObjectData = {
        catalog_id: req.body.catalog_id || 'N/A',
        common_name: req.body.common_name,
        object_type: req.body.object_type || null,
        constellation: req.body.constellation || null,
        right_ascension: req.body.right_ascension || null,
        declination: req.body.declination || null,
        distance: req.body.distance || null,
        apparent_magnitude: req.body.apparent_magnitude || null,
        angular_size: req.body.angular_size || null,
        age: req.body.age || null,
        mass: req.body.mass || null,
        temperature: req.body.temperature || null,
        composition: req.body.composition || null,
        best_viewing_period: req.body.best_viewing_period || null,
        visible_to_naked_eye: req.body.visible_to_naked_eye === 'true' || req.body.visible_to_naked_eye === true,
        facts: factsArray,
        description: req.body.description || null
      };

      const newObject = await createAstronomicalObject(astronomicalObjectData);
      objectId = newObject.id;
      console.log(`✅ Oggetto astronomico creato con ID: ${objectId}`);
    }

    // Salva la foto nel database
    const photoData = {
      user_id: req.user.userId,
      object_id: objectId,
      image_url: uploadResult.secure_url,
      image_public_id: uploadResult.public_id,
      telescope: req.body.telescope || null,
      camera: req.body.camera || null,
      exposure: req.body.exposure || null,
      filters: req.body.filters || null,
      capture_date: req.body.capture_date || null,
      location: req.body.location || null,
      bortle_scale: req.body.bortle_scale || null
    };

    const newPhoto = await createAstrophoto(photoData);
    
    res.status(201).json({
      message: 'Foto caricata con successo',
      photo: newPhoto
    });
  } catch (error) {
    console.error('Errore upload foto:', error);
    res.status(500).json({ error: 'Errore durante upload foto' });
  }
});

// DELETE foto
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const photo = await getAstrophotoById(req.params.id);
    
    if (!photo) {
      return res.status(404).json({ error: 'Foto non trovata' });
    }

    if (photo.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Non autorizzato' });
    }

    // Elimina da Cloudinary
    if (photo.image_public_id) {
      await cloudinary.uploader.destroy(photo.image_public_id);
    }

    // Elimina dal database
    await deleteAstrophoto(req.params.id, req.user.userId);

    res.json({ message: 'Foto eliminata con successo' });
  } catch (error) {
    console.error('Errore eliminazione foto:', error);
    res.status(500).json({ error: 'Errore durante eliminazione foto' });
  }
});

export default router;

