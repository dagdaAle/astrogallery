import db from '../config/database.js';
import bcrypt from 'bcryptjs';

export const createUser = async (username, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const result = await db.query(
    `INSERT INTO users (username, email, password_hash) 
     VALUES (?, ?, ?)`,
    [username, email, passwordHash]
  );
  
  return {
    id: result.rows.insertId,
    username,
    email
  };
};

export const findUserByEmail = async (email) => {
  const result = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await db.query(
    'SELECT id, username, email, profile_image, bio, created_at FROM users WHERE id = ?',
    [id]
  );
  return result.rows[0];
};

export const updateUserProfile = async (id, updates) => {
  const { profile_image, bio } = updates;
  const result = await db.query(
    `UPDATE users 
     SET profile_image = COALESCE(?, profile_image), 
         bio = COALESCE(?, bio)
     WHERE id = ?`,
    [profile_image, bio, id]
  );
  
  return await findUserById(id);
};

export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
