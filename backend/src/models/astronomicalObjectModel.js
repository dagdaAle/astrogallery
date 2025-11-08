import db from '../config/database.js';

export const createAstronomicalObject = async (objectData) => {
  const {
    catalog_id, common_name, object_type, constellation,
    right_ascension, declination, distance, apparent_magnitude,
    angular_size, age, mass, temperature, composition,
    best_viewing_period, visible_to_naked_eye, facts, description
  } = objectData;

  const result = await db.query(
    `INSERT INTO astronomical_objects (
      catalog_id, common_name, object_type, constellation,
      right_ascension, declination, distance, apparent_magnitude,
      angular_size, age, mass, temperature, composition,
      best_viewing_period, visible_to_naked_eye, facts, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      catalog_id, common_name, object_type, constellation,
      right_ascension, declination, distance, apparent_magnitude,
      angular_size, age, mass, temperature, composition,
      best_viewing_period, visible_to_naked_eye, JSON.stringify(facts), description
    ]
  );

  return {
    id: result.rows.insertId,
    ...objectData
  };
};

export const getAllAstronomicalObjects = async () => {
  const result = await db.query(
    'SELECT * FROM astronomical_objects ORDER BY common_name'
  );
  return result.rows;
};

export const getAstronomicalObjectById = async (id) => {
  const result = await db.query(
    'SELECT * FROM astronomical_objects WHERE id = ?',
    [id]
  );
  return result.rows[0];
};

export const searchAstronomicalObjects = async (query) => {
  const searchTerm = `%${query}%`;
  const result = await db.query(
    `SELECT * FROM astronomical_objects 
     WHERE common_name LIKE ? OR catalog_id LIKE ? OR constellation LIKE ?
     ORDER BY common_name`,
    [searchTerm, searchTerm, searchTerm]
  );
  return result.rows;
};

export const getObjectsByType = async (type) => {
  const result = await db.query(
    'SELECT * FROM astronomical_objects WHERE object_type = ? ORDER BY common_name',
    [type]
  );
  return result.rows;
};
