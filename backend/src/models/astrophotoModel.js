import db from '../config/database.js';

export const createAstrophoto = async (photoData) => {
  const {
    user_id, object_id, image_url, image_public_id,
    telescope, camera, exposure, filters, capture_date,
    location, bortle_scale
  } = photoData;

  const result = await db.query(
    `INSERT INTO astrophotos (
      user_id, object_id, image_url, image_public_id,
      telescope, camera, exposure, filters, capture_date,
      location, bortle_scale
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id, object_id, image_url, image_public_id,
      telescope, camera, exposure, filters, capture_date,
      location, bortle_scale
    ]
  );

  return {
    id: result.rows.insertId,
    ...photoData
  };
};

export const getAllAstrophotos = async (limit = 50, offset = 0) => {
  const result = await db.query(
    `SELECT 
      a.*,
      u.username, u.profile_image as user_profile_image,
      ao.catalog_id, ao.common_name, ao.object_type, ao.constellation,
      ao.right_ascension, ao.declination, ao.distance, ao.apparent_magnitude,
      ao.angular_size, ao.age, ao.mass, ao.temperature, ao.composition,
      ao.best_viewing_period, ao.visible_to_naked_eye, ao.facts, ao.description
    FROM astrophotos a
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN astronomical_objects ao ON a.object_id = ao.id
    ORDER BY a.upload_date DESC
    LIMIT ${limit} OFFSET ${offset}`
  );

  return result.rows;
};

export const getAstrophotoById = async (id) => {
  const result = await db.query(
    `SELECT 
      a.*,
      u.username, u.profile_image as user_profile_image,
      ao.catalog_id, ao.common_name, ao.object_type, ao.constellation,
      ao.right_ascension, ao.declination, ao.distance, ao.apparent_magnitude,
      ao.angular_size, ao.age, ao.mass, ao.temperature, ao.composition,
      ao.best_viewing_period, ao.visible_to_naked_eye, ao.facts, ao.description
    FROM astrophotos a
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN astronomical_objects ao ON a.object_id = ao.id
    WHERE a.id = ${id}`
  );

  return result.rows[0];
};

export const getAstrophotosByUser = async (userId) => {
  const result = await db.query(
    `SELECT a.*, ao.common_name, ao.catalog_id
     FROM astrophotos a
     LEFT JOIN astronomical_objects ao ON a.object_id = ao.id
     WHERE a.user_id = ?
     ORDER BY a.upload_date DESC`,
    [userId]
  );

  return result.rows;
};

export const deleteAstrophoto = async (id, userId) => {
  const result = await db.query(
    'DELETE FROM astrophotos WHERE id = ? AND user_id = ?',
    [id, userId]
  );

  return result.rows.affectedRows > 0;
};

export const incrementViews = async (id) => {
  await db.query(
    'UPDATE astrophotos SET views_count = views_count + 1 WHERE id = ?',
    [id]
  );
};
