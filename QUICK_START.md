# 🚀 Quick Start - AstroGallery

## ✅ Cosa è stato creato

### 🎨 Frontend (React)
- ✅ Layout Pinterest/Masonry responsive
- ✅ Stile terminal retro (nero + bianco)
- ✅ Componente dettaglio con **informazioni astronomiche** complete:
  - Classificazione oggetto
  - Coordinate celesti
  - Caratteristiche fisiche
  - Composizione
  - Periodo osservazione
  - Curiosità scientifiche
- ✅ 6 astrofotografie di esempio con dati reali

### 🔧 Backend (Node.js/Express)
- ✅ API REST completa
- ✅ Schema PostgreSQL con:
  - Utenti
  - Oggetti astronomici
  - Astrofotografie
  - Likes e commenti
- ✅ Autenticazione JWT
- ✅ Upload immagini (Cloudinary)
- ✅ Script seed per popolare database

### 📦 Monorepo
- ✅ Struttura pronta per Railway
- ✅ File di configurazione Railway
- ✅ Documentazione completa

---

## 🏃‍♂️ Avvio Rapido (Sviluppo Locale)

### 1. Installa dipendenze (già fatto!)

```bash
# Se serve reinstallare
npm run install:all
```

### 2. Frontend standalone (senza backend)

```bash
cd frontend
npm run dev
```

Apri **http://localhost:5173** → Vedrai le 6 foto di esempio con dati statici.

### 3. Backend + Database (setup completo)

**A. Installa PostgreSQL** (se non lo hai):

```bash
# macOS (Homebrew)
brew install postgresql@14
brew services start postgresql@14

# Oppure usa Postgres.app: https://postgresapp.com/
```

**B. Crea database**:

```bash
createdb astrogallery
```

**C. Configura backend**:

```bash
# Copia file di esempio
cp backend/.env.example backend/.env

# Modifica backend/.env
# DATABASE_URL=postgresql://user:password@localhost:5432/astrogallery
# JWT_SECRET=cambia-questo-con-una-chiave-sicura
```

**D. Inizializza database**:

```bash
# Importa schema
psql astrogallery < backend/src/database/schema.sql

# Inserisci dati iniziali
cd backend
node src/database/seed.js
```

**E. Avvia tutto**:

```bash
# Dalla root
npm run dev

# Oppure separatamente:
npm run dev:frontend  # Porta 5173
npm run dev:backend   # Porta 3000
```

**Test**:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api/health
- Oggetti: http://localhost:3000/api/objects

---

## 🌐 Deploy su Railway

Segui la guida dettagliata in **RAILWAY_DEPLOY.md**

### Quick version:

```bash
# 1. Installa CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Init progetto
railway init

# 4. Aggiungi PostgreSQL
railway add --plugin postgresql

# 5. Configura variabili (nella dashboard)
# - JWT_SECRET
# - CLOUDINARY_* (se vuoi upload)
# - FRONTEND_URL

# 6. Deploy
railway up

# 7. Inizializza database
railway run psql < backend/src/database/schema.sql
railway run node backend/src/database/seed.js
```

---

## 📊 Struttura Dati Astronomici

Ogni oggetto celeste include:

```javascript
{
  catalogId: "M42 / NGC 1976",
  commonName: "Nebulosa di Orione",
  objectType: "Nebulosa a Emissione",
  constellation: "Orione",
  coordinates: {
    rightAscension: "05h 35m 17.3s",
    declination: "-05° 23' 28''"
  },
  distance: "1.344 anni luce",
  apparentMagnitude: "4.0",
  angularSize: "65' × 60'",
  age: "~3 milioni di anni",
  mass: "~2.000 masse solari",
  temperature: "~10.000 K",
  composition: "Idrogeno (90%), Elio (10%)...",
  bestViewingPeriod: "Dicembre - Marzo",
  visibleToNakedEye: true,
  facts: [
    "Regione di formazione stellare più vicina",
    "Contiene oltre 700 stelle in formazione",
    ...
  ]
}
```

---

## 🎨 Personalizzazione Stile

### Cambiare colori

**Testo bianco → Verde terminal:**

```css
/* frontend/src/index.css */
:root {
  color: #00ff00; /* Verde terminale */
}
```

**Bordi colorati:**

```css
/* frontend/src/components/Gallery.css */
.masonry-item:hover {
  border-color: #00ff00; /* Verde al posto di bianco */
}
```

### Cambiare font

```css
/* frontend/src/index.css */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

:root {
  font-family: 'VT323', 'Courier New', monospace;
}
```

---

## 📝 Prossimi Passi

### Per usare con dati reali:

1. **Cloudinary Setup** (upload immagini):
   - Registrati su https://cloudinary.com
   - Copia credenziali in `backend/.env`
   
2. **Aggiungi oggetti astronomici**:
   ```bash
   POST http://localhost:3000/api/objects
   # (vedi API docs nel README.md)
   ```

3. **Sistema autenticazione**:
   - Registra utente: `POST /api/auth/register`
   - Login: `POST /api/auth/login`
   - Upload foto: `POST /api/photos` (con token)

### Per integrare frontend con backend:

Sostituisci i dati statici in `frontend/src/App.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { getAllPhotos } from './config/api';

function App() {
  const [photos, setPhotos] = useState([]);
  
  useEffect(() => {
    getAllPhotos().then(res => setPhotos(res.data));
  }, []);
  
  // ... resto del codice
}
```

---

## 🆘 Problemi Comuni

### "Command not found: psql"
→ PostgreSQL non installato. Usa Postgres.app o `brew install postgresql`

### "Connection refused" dal backend
→ PostgreSQL non avviato. Usa `brew services start postgresql`

### "Module not found" errori
→ Reinstalla: `cd backend && npm install` o `cd frontend && npm install`

### Frontend non vede cambiamenti
→ Riavvia Vite: `cd frontend && npm run dev`

---

## 📚 Documentazione Completa

- **README.md** - Documentazione completa del progetto
- **RAILWAY_DEPLOY.md** - Guida deploy Railway step-by-step
- **backend/src/database/schema.sql** - Schema database
- **backend/.env.example** - Variabili ambiente

---

## ✨ Enjoy!

Hai ora un blog di astrofotografia completo con:
- ✅ Design retro terminal style
- ✅ Informazioni astronomiche dettagliate
- ✅ Backend API completo
- ✅ Sistema utenti e upload
- ✅ Pronto per Railway deploy

**Buona astrofotografia! 🌌📸**

