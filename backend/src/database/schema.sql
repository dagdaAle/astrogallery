-- Schema Database per AstroGallery

-- Tabella Utenti
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_image VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Oggetti Astronomici
CREATE TABLE astronomical_objects (
  id SERIAL PRIMARY KEY,
  catalog_id VARCHAR(50) NOT NULL, -- es: M42, NGC 1976
  common_name VARCHAR(255) NOT NULL, -- es: Nebulosa di Orione
  object_type VARCHAR(100) NOT NULL, -- Nebulosa, Galassia, Ammasso, Pianeta
  constellation VARCHAR(100),
  
  -- Coordinate
  right_ascension VARCHAR(50),
  declination VARCHAR(50),
  
  -- Caratteristiche fisiche
  distance VARCHAR(100), -- anni luce
  apparent_magnitude VARCHAR(50),
  angular_size VARCHAR(100),
  age VARCHAR(100),
  mass VARCHAR(100),
  temperature VARCHAR(100),
  
  -- Composizione e note
  composition TEXT,
  best_viewing_period VARCHAR(100),
  visible_to_naked_eye BOOLEAN DEFAULT false,
  
  -- Curiosità (array JSON)
  facts JSONB,
  
  -- Descrizione generale
  description TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Astrofotografie
CREATE TABLE astrophotos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  object_id INTEGER REFERENCES astronomical_objects(id) ON DELETE SET NULL,
  
  -- Immagine
  image_url VARCHAR(500) NOT NULL,
  image_public_id VARCHAR(255), -- Cloudinary public ID
  
  -- Dettagli tecnici di ripresa
  telescope VARCHAR(255),
  camera VARCHAR(255),
  exposure VARCHAR(255),
  filters VARCHAR(255),
  capture_date DATE,
  location VARCHAR(255),
  bortle_scale VARCHAR(50),
  
  -- Metadata
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Likes
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  photo_id INTEGER REFERENCES astrophotos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, photo_id)
);

-- Tabella Commenti
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  photo_id INTEGER REFERENCES astrophotos(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indici per performance
CREATE INDEX idx_astrophotos_user ON astrophotos(user_id);
CREATE INDEX idx_astrophotos_object ON astrophotos(object_id);
CREATE INDEX idx_likes_photo ON likes(photo_id);
CREATE INDEX idx_comments_photo ON comments(photo_id);
CREATE INDEX idx_astronomical_objects_type ON astronomical_objects(object_type);
CREATE INDEX idx_astronomical_objects_constellation ON astronomical_objects(constellation);

-- Trigger per aggiornare updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_astronomical_objects_updated_at BEFORE UPDATE ON astronomical_objects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_astrophotos_updated_at BEFORE UPDATE ON astrophotos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

