-- Schema MySQL per AstroGallery

-- Tabella Utenti
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_image VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabella Oggetti Astronomici
CREATE TABLE IF NOT EXISTS astronomical_objects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  catalog_id VARCHAR(50) NOT NULL,
  common_name VARCHAR(255) NOT NULL,
  object_type VARCHAR(100) NOT NULL,
  constellation VARCHAR(100),
  
  -- Coordinate
  right_ascension VARCHAR(50),
  declination VARCHAR(50),
  
  -- Caratteristiche fisiche
  distance VARCHAR(100),
  apparent_magnitude VARCHAR(50),
  angular_size VARCHAR(100),
  age VARCHAR(100),
  mass VARCHAR(100),
  temperature VARCHAR(100),
  
  -- Composizione e note
  composition TEXT,
  best_viewing_period VARCHAR(100),
  visible_to_naked_eye BOOLEAN DEFAULT FALSE,
  
  -- Curiosità (JSON)
  facts JSON,
  
  -- Descrizione generale
  description TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_object_type (object_type),
  INDEX idx_constellation (constellation)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabella Astrofotografie
CREATE TABLE IF NOT EXISTS astrophotos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  object_id INT,
  
  -- Immagine
  image_url VARCHAR(500) NOT NULL,
  image_public_id VARCHAR(255),
  
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
  likes_count INT DEFAULT 0,
  views_count INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id) REFERENCES astronomical_objects(id) ON DELETE SET NULL,
  
  INDEX idx_user (user_id),
  INDEX idx_object (object_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabella Likes
CREATE TABLE IF NOT EXISTS likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  photo_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (photo_id) REFERENCES astrophotos(id) ON DELETE CASCADE,
  
  UNIQUE KEY unique_like (user_id, photo_id),
  INDEX idx_photo (photo_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabella Commenti
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  photo_id INT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (photo_id) REFERENCES astrophotos(id) ON DELETE CASCADE,
  
  INDEX idx_photo (photo_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

