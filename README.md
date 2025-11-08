# 🌌 AstroGallery - Piattaforma di Astrofotografia

Una piattaforma moderna per condividere e scoprire astrofotografie con informazioni astronomiche dettagliate. Stile terminal retro con sfondo nero e design minimalista.

## ✨ Caratteristiche

### Frontend
- **Layout Pinterest/Masonry** responsive per la galleria
- **Vista dettaglio split-screen**:
  - Sinistra: Immagine full-screen
  - Destra: Informazioni astronomiche complete
- **Design terminal retro** con font monospace e estetica minimal
- **Informazioni astronomiche dettagliate**:
  - Classificazione e tipo oggetto
  - Coordinate celesti
  - Caratteristiche fisiche (età, massa, temperatura)
  - Composizione chimica
  - Info osservative
  - Curiosità scientifiche

### Backend
- **API REST completa** con Node.js/Express
- **Database PostgreSQL** con schema ottimizzato
- **Autenticazione JWT** per utenti
- **Upload immagini** tramite Cloudinary
- **Sistema di likes e commenti**

## 🏗️ Architettura Monorepo

```
astro_blog/
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── components/    # Componenti React
│   │   ├── data/         # Dati temporanei
│   │   └── ...
│   └── package.json
├── backend/              # Express API
│   ├── src/
│   │   ├── config/       # Database, Cloudinary
│   │   ├── models/       # Modelli dati
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth, Upload
│   │   └── database/     # Schema SQL, seed
│   └── package.json
├── package.json          # Root monorepo
└── railway.json          # Config Railway
```

## 🚀 Setup Locale

### Prerequisiti
- Node.js 18+
- PostgreSQL 14+
- Account Cloudinary (per upload immagini)

### 1. Clona e installa dipendenze

```bash
cd astro_blog
npm run install:all
```

### 2. Configura Database PostgreSQL

```bash
# Crea database
createdb astrogallery

# Importa schema
psql astrogallery < backend/src/database/schema.sql
```

### 3. Configura variabili ambiente

Crea `backend/.env`:

```env
PORT=3000
NODE_ENV=development

DATABASE_URL=postgresql://user:password@localhost:5432/astrogallery

JWT_SECRET=your-super-secret-jwt-key-change-this

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

FRONTEND_URL=http://localhost:5173
```

### 4. Popola database con dati iniziali

```bash
cd backend
node src/database/seed.js
```

### 5. Avvia in sviluppo

```bash
# Dalla root, avvia frontend + backend
npm run dev

# Oppure separatamente:
npm run dev:frontend  # http://localhost:5173
npm run dev:backend   # http://localhost:3000
```

## 🔐 Sistema Admin

Il progetto include un **pannello admin completo** per gestire foto e oggetti astronomici.

### Funzionalità
- 🔒 **Login/Registrazione** con JWT
- 📸 **Upload foto** con preview
- 🌌 **Creazione oggetti astronomici**
- 📊 **Gestione catalogo**

Vedi **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** per guida completa.

### Quick Start Admin

```bash
# 1. Registra primo utente (dopo aver avviato backend)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"password123"}'

# 2. Vai su http://localhost:5173/login
# 3. Accedi con le credenziali
# 4. Verrai reindirizzato a /admin
```

## 🌐 API Endpoints

### Autenticazione
- `POST /api/auth/register` - Registrazione utente
- `POST /api/auth/login` - Login

### Utenti
- `GET /api/users/me` - Profilo utente (auth)
- `GET /api/users/:id` - Profilo pubblico
- `GET /api/users/:id/photos` - Foto di un utente
- `PUT /api/users/me` - Aggiorna profilo (auth)

### Oggetti Astronomici
- `GET /api/objects` - Lista oggetti
- `GET /api/objects/:id` - Dettaglio oggetto
- `GET /api/objects/search/:query` - Ricerca
- `GET /api/objects/type/:type` - Filtra per tipo
- `POST /api/objects` - Crea oggetto (auth)

### Astrofotografie
- `GET /api/photos` - Lista foto (paginata)
- `GET /api/photos/:id` - Dettaglio foto
- `POST /api/photos` - Upload foto (auth, multipart)
- `DELETE /api/photos/:id` - Elimina foto (auth)

## 📦 Deploy su Railway

### 1. Prepara progetto

Il progetto è già configurato con `railway.json` per il deploy automatico.

### 2. Crea progetto Railway

```bash
# Installa Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inizializza progetto
railway init

# Collega a Railway
railway link
```

### 3. Aggiungi PostgreSQL

Dalla dashboard Railway:
- Click "New" → "Database" → "PostgreSQL"
- Railway crea automaticamente `DATABASE_URL`

### 4. Configura variabili ambiente

Nella dashboard Railway, aggiungi:
- `JWT_SECRET` - Genera una chiave sicura
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `FRONTEND_URL` - Il tuo dominio Railway (es: https://your-app.railway.app)
- `NODE_ENV=production`

### 5. Deploy

```bash
railway up
```

### 6. Inizializza database

```bash
# Connettiti al database Railway
railway connect

# Esegui schema
\i backend/src/database/schema.sql

# In alternativa, esegui seed da locale
railway run node backend/src/database/seed.js
```

## 🎨 Personalizzazione

### Aggiungere nuovi oggetti astronomici

Usa l'API o aggiungi direttamente al database:

```javascript
POST /api/objects
{
  "catalog_id": "M51",
  "common_name": "Galassia Vortice",
  "object_type": "Galassia a Spirale",
  // ... altri campi
}
```

### Modificare lo stile

I colori e stili principali sono in:
- `frontend/src/index.css` - Base e font
- `frontend/src/App.css` - Sfondo app
- `frontend/src/components/Gallery.css` - Griglia
- `frontend/src/components/ImageDetail.css` - Dettagli

### Cambiare font

Modifica in `frontend/src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR-FONT&display=swap');

:root {
  font-family: 'YOUR-FONT', monospace;
}
```

## 📊 Schema Database

### Tabelle principali:
- **users** - Utenti della piattaforma
- **astronomical_objects** - Catalogo oggetti celesti
- **astrophotos** - Astrofotografie caricate
- **likes** - Sistema di preferiti
- **comments** - Commenti sulle foto

Vedi `backend/src/database/schema.sql` per lo schema completo.

## 🛠️ Tecnologie

### Frontend
- React 18
- Vite
- CSS3 (Grid Masonry)

### Backend
- Node.js 18+
- Express
- PostgreSQL
- JWT
- Cloudinary
- Multer

### DevOps
- Railway (hosting)
- Git

## 📝 TODO / Roadmap

- [ ] Sistema di ricerca avanzata
- [ ] Filtri per tipo oggetto/costellazione
- [ ] Pagina profilo utente completa
- [ ] Sistema di follow/follower
- [ ] Notifiche
- [ ] Export immagini con watermark
- [ ] Integrazione con API astronomiche (NASA, ESA)
- [ ] Modalità scura/chiara toggle
- [ ] PWA support
- [ ] App mobile

## 🤝 Contribuire

1. Fork del progetto
2. Crea feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri Pull Request

## 📄 Licenza

MIT License - vedi [LICENSE](LICENSE)

## 👥 Autore

Creato con ❤️ per gli appassionati di astrofotografia

---

## 🆘 Troubleshooting

### Frontend non si connette al backend
- Verifica che `FRONTEND_URL` nel backend sia corretto
- Controlla CORS in `backend/src/index.js`

### Errori upload immagini
- Verifica credenziali Cloudinary in `.env`
- Controlla limite file size (default 10MB)

### Database connection error
- Verifica `DATABASE_URL` in `.env`
- Assicurati che PostgreSQL sia attivo
- Controlla che il database esista

### Railway deploy fallisce
- Verifica che tutte le variabili ambiente siano configurate
- Controlla i log: `railway logs`
- Assicurati che il database sia stato inizializzato

---

**Buona astrofotografia! 🌌📸✨**
