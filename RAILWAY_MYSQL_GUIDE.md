# 🚂 Deploy su Railway con MySQL - Guida Completa

## 📋 **PREREQUISITI**

Prima del deploy, assicurati di avere:
- ✅ Account GitHub (per auto-deploy)
- ✅ Account Cloudinary configurato
- ✅ API Key OpenAI attiva
- ✅ Progetto funzionante in locale

---

## 🚀 **PARTE 1: SETUP RAILWAY**

### **Step 1: Crea Progetto Railway**

1. Vai su **https://railway.app**
2. Click **"Login"** e scegli **"Login with GitHub"**
3. Autorizza Railway su GitHub
4. Dashboard → Click **"New Project"**
5. Scegli **"Deploy from GitHub repo"**
6. Seleziona il repository `astro_blog`

Railway inizierà automaticamente il primo deploy!

---

### **Step 2: Aggiungi Database MySQL**

1. Nella dashboard del progetto
2. Click **"+ New"** → **"Database"** → **"Add MySQL"**
3. Railway creerà automaticamente un database MySQL con variabili:
   - `MYSQL_URL`
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

---

### **Step 3: Configura Variabili Ambiente**

Nel progetto Railway → **"Variables"** → Click **"+ New Variable"**

Aggiungi queste variabili:

```env
# === OBBLIGATORIE ===

NODE_ENV=production

# JWT (genera una chiave sicura, min 32 caratteri)
JWT_SECRET=TUA_CHIAVE_SICURA_QUI_MIN_32_CARATTERI_RANDOM

# Database (già presenti, ma aggiungi questi nomi personalizzati)
DB_HOST=${{MYSQL_HOST}}
DB_USER=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}
DB_NAME=${{MYSQL_DATABASE}}
DB_PORT=${{MYSQL_PORT}}

# === CLOUDINARY (per upload immagini) ===
CLOUDINARY_CLOUD_NAME=il_tuo_cloud_name
CLOUDINARY_API_KEY=la_tua_api_key
CLOUDINARY_API_SECRET=il_tuo_api_secret

# === OPENAI (per auto-compilazione) ===
OPENAI_API_KEY=sk-proj-...la_tua_chiave_openai

# === FRONTEND (opzionale, Railway gestisce CORS automaticamente) ===
FRONTEND_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

**💡 Come ottenere le credenziali:**

- **JWT_SECRET**: Genera con `openssl rand -base64 32` o usa un generatore online
- **Cloudinary**: Dashboard Cloudinary → https://cloudinary.com/console
- **OpenAI**: Dashboard OpenAI → https://platform.openai.com/api-keys

---

## 🗄️ **PARTE 2: INIZIALIZZA DATABASE**

### **Opzione A: Da Railway CLI (Consigliato)**

1. **Installa Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login e collega progetto:**
   ```bash
   railway login
   railway link
   # Seleziona il tuo progetto
   ```

3. **Connettiti al database:**
   ```bash
   railway connect MySQL
   ```

4. **Crea le tabelle:**
   ```sql
   -- Copia e incolla il contenuto di backend/src/database/schema-mysql.sql
   -- Oppure:
   source backend/src/database/schema-mysql.sql
   ```

5. **Esci dal MySQL:**
   ```sql
   exit
   ```

6. **Seed dati iniziali:**
   ```bash
   railway run node backend/src/database/seed-mysql.js
   railway run node backend/src/database/seed-users-mysql.js
   ```

---

### **Opzione B: Da Database GUI (più semplice)**

1. **Ottieni credenziali:**
   - Dashboard Railway → Database MySQL → **"Connect"**
   - Copia: Host, Port, Username, Password, Database

2. **Usa un client MySQL:**
   - **TablePlus** (Mac/Windows) - https://tableplus.com
   - **MySQL Workbench** (Windows/Mac/Linux)
   - **DBeaver** (Multi-platform)

3. **Connetti con le credenziali Railway**

4. **Esegui schema:**
   - Apri `backend/src/database/schema-mysql.sql`
   - Esegui tutto il file

5. **Esegui seed:**
   - Esegui manualmente i seed o usa Railway CLI

---

### **Opzione C: Da locale con variabili Railway**

```bash
# Dalla root del progetto
railway variables

# Copia le variabili MySQL e esegui:
mysql -h <RAILWAY_HOST> -P <RAILWAY_PORT> -u <RAILWAY_USER> -p<RAILWAY_PASSWORD> <RAILWAY_DATABASE> < backend/src/database/schema-mysql.sql

# Seed
cd backend
DB_HOST=<RAILWAY_HOST> DB_PORT=<RAILWAY_PORT> DB_USER=<RAILWAY_USER> DB_PASSWORD=<RAILWAY_PASSWORD> DB_NAME=<RAILWAY_DATABASE> node src/database/seed-mysql.js
DB_HOST=<RAILWAY_HOST> DB_PORT=<RAILWAY_PORT> DB_USER=<RAILWAY_USER> DB_PASSWORD=<RAILWAY_PASSWORD> DB_NAME=<RAILWAY_DATABASE> node src/database/seed-users-mysql.js
```

---

## ✅ **PARTE 3: VERIFICA DEPLOY**

### **1. Ottieni URL Progetto**

Dashboard Railway → Il tuo servizio → **"Settings"** → **"Domains"**

Vedrai qualcosa tipo: `https://astro-blog-production.up.railway.app`

### **2. Test Endpoints**

```bash
# Health check
curl https://tuo-dominio.railway.app/api/health
# Risposta: {"status":"OK","message":"AstroGallery API is running"}

# Test database
curl https://tuo-dominio.railway.app/api/objects
# Risposta: array di oggetti astronomici

# Frontend
# Apri browser: https://tuo-dominio.railway.app
```

### **3. Test Login Admin**

1. Vai su: `https://tuo-dominio.railway.app/login`
2. Credenziali di default:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Dovresti accedere all'admin!

---

## 🔧 **PARTE 4: CONFIGURAZIONI AVANZATE**

### **Custom Domain (Opzionale)**

1. Dashboard → **"Settings"** → **"Domains"**
2. Click **"+ Custom Domain"**
3. Inserisci il tuo dominio (es: `astrogallery.com`)
4. Configura DNS come indicato da Railway
5. Aspetta propagazione DNS (5-60 minuti)

### **Auto-Deploy da GitHub**

Railway rileva automaticamente i push su GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Railway farà deploy automaticamente! 🎉

### **Monitoring e Logs**

```bash
# Logs in tempo reale
railway logs

# Logs filtrati
railway logs --service backend

# Apri dashboard
railway open
```

---

## 🆘 **TROUBLESHOOTING**

### **❌ Errore: Build Failed**

```bash
# Controlla logs di build
railway logs --build

# Verifica package.json
# Verifica che node_modules NON sia in git
```

**Soluzione:**
- Assicurati che `.gitignore` includa `node_modules/`
- Rimuovi `node_modules/` da git se presente:
  ```bash
  git rm -r --cached node_modules
  git commit -m "Remove node_modules"
  git push
  ```

---

### **❌ Errore: Database Connection**

```bash
# Verifica variabili
railway variables | grep DB_
railway variables | grep MYSQL_
```

**Soluzione:**
- Verifica che il MySQL plugin sia attivo
- Controlla che le variabili DB_* puntino a MYSQL_*
- Riavvia il servizio: Dashboard → **"Deploy"** → **"Redeploy"**

---

### **❌ Errore: Cloudinary Upload**

```bash
# Test credenziali Cloudinary
curl -X POST https://tuo-dominio.railway.app/api/photos \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@test.jpg"
```

**Soluzione:**
- Verifica variabili CLOUDINARY_*
- Testa le credenziali su https://cloudinary.com/console
- Controlla limiti piano Cloudinary

---

### **❌ Errore: OpenAI API**

```bash
# Test endpoint OpenAI
curl https://tuo-dominio.railway.app/api/openai/astronomical-data \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"objectName":"M42"}'
```

**Soluzione:**
- Verifica OPENAI_API_KEY
- Controlla crediti su https://platform.openai.com/usage
- Verifica che l'API key non sia scaduta

---

### **❌ Frontend non carica / Pagina bianca**

**Soluzione:**
1. Verifica build frontend:
   ```bash
   cd frontend
   npm run build
   ls -la dist/  # Deve contenere index.html e assets/
   ```

2. Controlla console browser (F12) per errori

3. Verifica che `NODE_ENV=production` sia impostato

4. Forza rebuild su Railway:
   ```bash
   railway redeploy
   ```

---

### **❌ CORS Errors**

**Soluzione:**
- In produzione NON servono configurazioni CORS
- Il frontend e backend sono sullo stesso dominio
- Se usi custom domain, aggiorna FRONTEND_URL

---

## 📊 **METRICHE E COSTI**

### **Piano Starter ($5/mese):**
- ✅ 512 MB RAM
- ✅ 1 GB Storage
- ✅ Shared CPU
- ✅ Database MySQL incluso
- ✅ Perfetto per questo progetto

### **Monitoraggio:**
- Dashboard Railway mostra:
  - CPU usage
  - RAM usage
  - Network bandwidth
  - Database size
  - Build history
  - Deployment logs

---

## 🎯 **CHECKLIST PRE-DEPLOY**

Prima di fare il deploy finale, verifica:

- [ ] `.gitignore` include `node_modules/`, `.env`, `*.log`
- [ ] Tutte le variabili ambiente configurate su Railway
- [ ] Database MySQL creato su Railway
- [ ] Schema MySQL eseguito
- [ ] Seed database eseguiti (almeno seed-users)
- [ ] Credenziali Cloudinary valide
- [ ] API Key OpenAI valida e con crediti
- [ ] Frontend builda correttamente (`npm run build`)
- [ ] Backend avvia senza errori in locale
- [ ] Test login admin funziona

---

## 🔄 **WORKFLOW AGGIORNAMENTI**

Per aggiornare l'app dopo modifiche:

```bash
# 1. Sviluppa in locale
cd astro_blog
# ... modifiche al codice ...

# 2. Testa in locale
npm run dev  # root
cd backend && npm run dev
cd frontend && npm run dev

# 3. Commit e push
git add .
git commit -m "feat: nuova feature"
git push origin main

# 4. Railway deploya automaticamente!
# Monitoraggio: railway logs
```

---

## 🎓 **COMANDI RAILWAY UTILI**

```bash
# Login
railway login

# Collega progetto esistente
railway link

# Lista variabili
railway variables

# Aggiungi variabile
railway variables set KEY=value

# Logs in tempo reale
railway logs

# Apri dashboard
railway open

# Connetti al database
railway connect MySQL

# Esegui comando nel container
railway run <comando>

# Redeploy
railway redeploy

# Status
railway status
```

---

## 🎉 **DEPLOY COMPLETATO!**

Il tuo blog di astrofotografia è online! 🌌

**URL Produzione:** `https://tuo-progetto.railway.app`

**Credenziali Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**⚠️ IMPORTANTE:** Cambia la password admin dopo il primo login!

---

## 📚 **RISORSE UTILI**

- **Railway Docs**: https://docs.railway.app
- **MySQL Docs**: https://dev.mysql.com/doc/
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **OpenAI Docs**: https://platform.openai.com/docs
- **Vite Docs**: https://vitejs.dev

---

## 💡 **PRO TIPS**

1. **Backup Database**: Railway fa backup automatici, ma esporta anche tu periodicamente
2. **Monitoraggio**: Imposta alert su Railway per downtime
3. **Scaling**: Se serve più potenza, upgrade RAM su Railway → Settings
4. **Custom Domain**: Migliora SEO e professionalità
5. **Environment Branches**: Crea un ambiente di staging per test
6. **Secrets**: Usa Railway Secrets per dati sensibili
7. **Logs**: Controlla regolarmente i logs per errori

---

**Buon deploy! 🚀**

