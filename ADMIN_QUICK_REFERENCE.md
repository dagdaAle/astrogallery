# 🚀 Admin Quick Reference

## Comandi Veloci

### Avvia Progetto

```bash
# Dalla root
npm run dev

# Solo frontend (senza backend)
cd frontend && npm run dev

# Solo backend
cd backend && npm run dev
```

## 🔐 Primo Accesso

### 1. Registrati (via browser)
- Vai su **http://localhost:5173/login**
- Click "Non hai un account? Registrati"
- Username, Email, Password
- Click "Registrati"
- Verrai automaticamente loggato e reindirizzato a `/admin`

### 2. Registrati (via API)
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "password123"
  }'
```

## 📝 Workflow Tipico

### Scenario: Carichi una foto di M42

```
1. Login → http://localhost:5173/login

2. Admin Panel → click [ ADMIN ] in alto a destra

3. Tab "Gestisci Oggetti" 
   → Verifica se M42 esiste
   → Se no, crea oggetto:
      - ID Catalogo: M42 / NGC 1976
      - Nome: Nebulosa di Orione
      - Tipo: Nebulosa a Emissione
      - ... altri campi
   → Click [ CREA OGGETTO ]

4. Tab "Carica Foto"
   → Click area upload, seleziona immagine
   → Seleziona "M42 - Nebulosa di Orione"
   → Compila dati tecnici:
      - Telescopio: Celestron NexStar 8SE
      - Camera: ZWO ASI294MC Pro
      - Esposizione: 20 x 180s
      - Filtri: Nessuno
      - Data: 2024-01-15
      - Località: Monte Baldo
      - Bortle: Classe 3
   → Click [ CARICA FOTO ]

5. Vai su Galleria
   → Vedi la tua foto!
   → Click per vedere tutti i dettagli astronomici
```

## 🌐 URL Importanti

```
Home/Gallery:  http://localhost:5173/
Login:         http://localhost:5173/login
Admin Panel:   http://localhost:5173/admin

Backend API:   http://localhost:3000/api
Health Check:  http://localhost:3000/api/health
Objects API:   http://localhost:3000/api/objects
Photos API:    http://localhost:3000/api/photos
```

## 📸 Upload Foto - Campi Richiesti

| Campo | Tipo | Esempio |
|-------|------|---------|
| Immagine | File | JPG/PNG < 10MB |
| Oggetto | Select | M42 - Nebulosa di Orione |
| Telescopio | Text | Celestron NexStar 8SE |
| Camera | Text | ZWO ASI294MC Pro |
| Esposizione | Text | 20 x 180s |
| Filtri | Text | L-eXtreme / Nessuno |
| Data | Date | 2024-01-15 |
| Località | Text | Monte Baldo |
| Bortle | Select | Classe 1-9 |

## 🌌 Crea Oggetto - Campi Minimi

| Campo | Obbligatorio | Esempio |
|-------|--------------|---------|
| ID Catalogo | ✅ | M42 / NGC 1976 |
| Nome Comune | ✅ | Nebulosa di Orione |
| Tipo Oggetto | ✅ | Nebulosa a Emissione |
| Descrizione | ✅ | La Nebulosa di Orione è... |
| Costellazione | ⚪ | Orione |
| Coordinate | ⚪ | 05h 35m 17.3s, -05° 23' 28'' |
| Distanza | ⚪ | 1.344 anni luce |
| Altri campi | ⚪ | Opzionali ma raccomandati |

## 🔍 Dove Trovare Dati

```
SIMBAD:     http://simbad.u-strasbg.fr/simbad/
NASA NED:   https://ned.ipac.caltech.edu/
Wikipedia:  Cerca "M42 wikipedia"
Stellarium: https://stellarium-web.org/
```

## 🐛 Fix Errori Comuni

### "Token non valido"
```bash
# Logout e login di nuovo
# O cancella localStorage e rilogga
localStorage.clear()
```

### "Oggetto non trovato"
```bash
# Vai su "Gestisci Oggetti" e crealo prima
```

### "Backend non risponde"
```bash
# Verifica che sia avviato
cd backend && npm run dev

# Controlla PostgreSQL
brew services list
# Se non attivo:
brew services start postgresql@14
```

### "Upload fallisce"
```bash
# Verifica Cloudinary configurato in backend/.env
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Oppure file troppo grande (max 10MB)
```

## 📦 File Chiave

```
Frontend:
- src/pages/Login.jsx              # Pagina login
- src/pages/Admin.jsx              # Admin panel
- src/components/UploadPhotoForm.jsx   # Form upload
- src/components/CreateObjectForm.jsx  # Form oggetti
- src/context/AuthContext.jsx     # Gestione auth

Backend:
- src/routes/authRoutes.js        # Login/Register
- src/routes/astrophotoRoutes.js  # Upload foto
- src/routes/astronomicalObjectRoutes.js  # Oggetti
- src/models/astrophotoModel.js   # DB foto
- src/models/astronomicalObjectModel.js   # DB oggetti
```

## 🎨 Customizzazione Rapida

### Cambia colori admin
```css
/* frontend/src/pages/Admin.css */
.admin-header {
  border-bottom: 2px solid #00ff00; /* Verde invece di bianco */
}
```

### Aggiungi campo al form
```javascript
// frontend/src/components/UploadPhotoForm.jsx
// Aggiungi nel formData state e nel JSX
```

### Modifica validazioni
```javascript
// backend/src/routes/astrophotoRoutes.js
// Aggiungi validazioni con express-validator
```

## 🚀 Deploy

Per deploy su Railway con admin funzionante:

```bash
# 1. Assicurati che tutte le variabili siano configurate
railway variables

# 2. Deploy
railway up

# 3. Crea primo utente admin
curl -X POST https://tuo-dominio.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"secure-pass"}'

# 4. Vai su https://tuo-dominio.railway.app/login
```

## 📚 Documentazione Completa

- **ADMIN_GUIDE.md** - Guida completa sistema admin
- **README.md** - Documentazione progetto
- **RAILWAY_DEPLOY.md** - Deploy Railway
- **QUICK_START.md** - Quick start generale

---

**Need help? Check ADMIN_GUIDE.md for detailed docs!** 🌌

