# 🚂 Deploy su Railway - Guida Rapida

## Setup Veloce

### 1. Crea Account Railway
- Vai su https://railway.app
- Registrati con GitHub

### 2. Installa Railway CLI

```bash
npm install -g @railway/cli
```

### 3. Login e inizializza

```bash
# Login
railway login

# Dalla root del progetto
railway init

# Scegli "Create new project"
```

### 4. Aggiungi Database PostgreSQL

```bash
# Dalla dashboard Railway o CLI
railway add --plugin postgresql
```

Railway creerà automaticamente:
- Database PostgreSQL
- Variabile `DATABASE_URL`

### 5. Configura Variabili Ambiente

Nella Dashboard Railway → Variables, aggiungi:

```env
# Obbligatorie
NODE_ENV=production
JWT_SECRET=genera-una-chiave-sicura-qui-min-32-caratteri
DATABASE_URL=[auto-generato da Railway]

# Cloudinary (per upload immagini)
CLOUDINARY_CLOUD_NAME=il-tuo-cloud-name
CLOUDINARY_API_KEY=la-tua-api-key
CLOUDINARY_API_SECRET=il-tuo-api-secret

# Frontend URL (dopo primo deploy, aggiorna con URL Railway)
FRONTEND_URL=https://il-tuo-dominio.railway.app
```

### 6. Deploy

```bash
railway up
```

### 7. Inizializza Database

Dopo il primo deploy, devi creare le tabelle:

**Opzione A - Da locale (raccomandato):**

```bash
# Copia DATABASE_URL dalla dashboard Railway
export DATABASE_URL="postgresql://..."

# Esegui schema
psql $DATABASE_URL < backend/src/database/schema.sql

# Inserisci dati iniziali
cd backend
DATABASE_URL="postgresql://..." node src/database/seed.js
```

**Opzione B - Railway CLI:**

```bash
# Connettiti al database
railway run psql

# Copia e incolla il contenuto di backend/src/database/schema.sql
\i backend/src/database/schema.sql
\q

# Seed
railway run node backend/src/database/seed.js
```

### 8. Verifica Deploy

Railway ti fornirà un URL tipo: `https://astro-blog-production.up.railway.app`

Testa:
- `https://tuo-dominio.railway.app/api/health` → Deve rispondere "OK"
- `https://tuo-dominio.railway.app/api/objects` → Lista oggetti astronomici
- `https://tuo-dominio.railway.app/` → Frontend React

### 9. Aggiorna FRONTEND_URL

Dopo il primo deploy:
1. Copia l'URL Railway del tuo progetto
2. Aggiorna la variabile `FRONTEND_URL` nella dashboard
3. Redeploy: `railway up`

## 🔧 Comandi Utili

```bash
# Logs in tempo reale
railway logs

# Apri dashboard
railway open

# Connetti al database
railway run psql

# Esegui comando nel container
railway run <comando>

# Redeploy
railway up

# Link progetto esistente
railway link
```

## 📊 Monitoraggio

Dashboard Railway mostra:
- ✅ Build status
- 📈 Metrics (CPU, RAM, Network)
- 📋 Logs
- 💾 Database size
- 🌐 Custom domains

## 🆘 Troubleshooting

### Build fallisce

```bash
# Controlla logs
railway logs --build

# Verifica che node_modules sia in .gitignore
# Railway installa dipendenze automaticamente
```

### Database connection error

```bash
# Verifica DATABASE_URL
railway variables

# Test connessione
railway run psql -c "SELECT 1"
```

### Frontend non carica

```bash
# Verifica build frontend
cd frontend
npm run build

# Controlla che dist/ sia creata
ls -la dist/
```

### Cloudinary upload fallisce

```bash
# Verifica variabili Cloudinary
railway variables | grep CLOUDINARY

# Testa credenziali su https://cloudinary.com/console
```

## 💰 Costi

- **Starter Plan**: $5/mese
  - 512 MB RAM
  - 1 GB storage
  - Shared CPU
  - Perfetto per questo progetto

- **Database**: Incluso nel piano

## 🚀 Pro Tips

1. **Custom Domain**: Railway → Settings → Domains
2. **Auto-deploy**: Collega GitHub per deploy automatici
3. **Monitoring**: Abilita alerting per downtime
4. **Backups**: Railway fa backup automatici del DB
5. **Scaling**: Aumenta RAM se necessario (Settings → Resources)

## 📝 Checklist Pre-Deploy

- [ ] Tutte le variabili ambiente configurate
- [ ] Database PostgreSQL creato
- [ ] `.gitignore` include `node_modules/` e `.env`
- [ ] `railway.json` presente nella root
- [ ] Frontend buildato correttamente (`npm run build`)
- [ ] Backend avvia senza errori
- [ ] Schema database pronto

## 🔄 Aggiornamenti Futuri

Per aggiornare l'app dopo modifiche:

```bash
git add .
git commit -m "Descrizione modifiche"
git push

# Se hai collegato GitHub, deploy automatico
# Altrimenti:
railway up
```

---

**Deploy completato! 🎉**

Il tuo blog di astrofotografia è online! 🌌

