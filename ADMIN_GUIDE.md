# 🔐 Guida Sistema Admin - AstroGallery

## 📋 Panoramica

Il sistema admin permette agli utenti autenticati di:
- ✅ **Caricare astrofotografie** con upload diretto su Cloudinary
- ✅ **Creare oggetti astronomici** con informazioni complete
- ✅ **Gestire il catalogo** di oggetti celesti

---

## 🚀 Come Accedere

### 1. Registrazione Primo Utente

**Dalla homepage:**
- Click su **[ LOGIN ]** (in alto a destra)
- Click su "Non hai un account? Registrati"
- Compila:
  - Username
  - Email
  - Password (minimo 6 caratteri)
- Click **[ REGISTRATI ]**

**Oppure via API:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@astrogallery.com",
    "password": "your-secure-password"
  }'
```

### 2. Login

- Email + Password
- Riceverai un **JWT token** valido per 7 giorni
- Verrai reindirizzato al pannello admin

---

## 🎨 Interfaccia Admin

### Header
- Nome utente corrente
- Pulsante **[ GALLERIA ]** - torna alla home
- Pulsante **[ LOGOUT ]** - esci

### Navigazione Tabs
- **[ CARICA FOTO ]** - Upload astrofotografie
- **[ GESTISCI OGGETTI ]** - Crea oggetti astronomici

---

## 📸 Caricare una Foto

### Prerequisiti
1. Devi aver creato almeno un oggetto astronomico
2. L'immagine deve essere < 10MB (JPG, PNG)

### Procedura

#### 1. Seleziona Immagine
- Click nell'area upload
- Scegli file dal computer
- Vedrai l'anteprima

#### 2. Seleziona Oggetto Astronomico
- Dal menu a tendina scegli l'oggetto che hai fotografato
- Se non lo trovi, vai su "Gestisci Oggetti" per crearlo

#### 3. Compila Dati Tecnici di Ripresa
Tutti i campi sono obbligatori:

| Campo | Esempio |
|-------|---------|
| **Telescopio** | `Celestron NexStar 8SE` |
| **Camera** | `ZWO ASI294MC Pro` |
| **Esposizione** | `20 x 180s` |
| **Filtri** | `L-eXtreme` o `Nessuno` |
| **Data Ripresa** | Seleziona dal calendario |
| **Località** | `Monte Baldo, Italia` |
| **Scala Bortle** | Seleziona da 1 (eccellente) a 9 (città) |

#### 4. Carica
- Click **[ CARICA FOTO ]**
- Attendi upload (può richiedere alcuni secondi)
- Vedrai messaggio di successo verde

### Cosa Succede?
1. Immagine viene caricata su **Cloudinary**
2. Viene ottimizzata automaticamente (max 2000x2000px)
3. Salvata nel database con tutti i dati
4. Associata all'oggetto astronomico
5. Visibile nella galleria pubblica

---

## 🌌 Creare un Oggetto Astronomico

### Tab "Gestisci Oggetti"

Il form è diviso in sezioni:

### 1️⃣ IDENTIFICAZIONE (Obbligatori)

| Campo | Esempio |
|-------|---------|
| **ID Catalogo** | `M42 / NGC 1976` |
| **Nome Comune** | `Nebulosa di Orione` |
| **Tipo Oggetto** | `Nebulosa a Emissione` |
| **Costellazione** | `Orione` |

### 2️⃣ COORDINATE E POSIZIONE

| Campo | Esempio |
|-------|---------|
| **Ascensione Retta** | `05h 35m 17.3s` |
| **Declinazione** | `-05° 23' 28''` |
| **Distanza** | `1.344 anni luce (412 parsec)` |
| **Dimensione Angolare** | `65' × 60'` |
| **Magnitudine Apparente** | `4.0` |

### 3️⃣ CARATTERISTICHE FISICHE

| Campo | Esempio |
|-------|---------|
| **Età** | `~3 milioni di anni` |
| **Massa** | `~2.000 masse solari` |
| **Temperatura** | `~10.000 K` |
| **Composizione** | `Idrogeno (90%), Elio (10%), tracce di C, N, O` |

### 4️⃣ OSSERVAZIONE

| Campo | Esempio |
|-------|---------|
| **Periodo Migliore** | `Dicembre - Marzo` |
| **Visibile ad occhio nudo** | ☑️ Si / ☐ No |

### 5️⃣ DESCRIZIONE (Obbligatoria)

Scrivi una descrizione generale dell'oggetto:

```
La Nebulosa di Orione è una nebulosa diffusa situata 
nella Via Lattea, a sud della Cintura di Orione. 
È una delle regioni di formazione stellare più vicine alla Terra.
```

### 6️⃣ CURIOSITÀ (Opzionali)

Fino a 4 curiosità interessanti:
- `Regione di formazione stellare più vicina alla Terra`
- `Contiene oltre 700 stelle in formazione`
- `Parte del complesso nebuloso Molecolare di Orione`
- `Il Trapezio al suo centro illumina l'intera nebulosa`

### Crea Oggetto
- Click **[ CREA OGGETTO ]**
- L'oggetto apparirà nella lista sottostante
- Sarà disponibile nel menu upload foto

---

## 🔍 Dove Trovare le Informazioni

### Risorse Online

**Database Astronomici:**
- [SIMBAD](http://simbad.u-strasbg.fr/simbad/) - Database completo
- [NASA/IPAC Extragalactic Database](https://ned.ipac.caltech.edu/)
- [Stellarium Web](https://stellarium-web.org/) - Planetario online

**Wikipedia:**
- Cerca l'oggetto (es: "M42 wikipedia")
- Trovi coordinate, dati fisici, descrizione

**Cataloghi:**
- Messier (M1-M110)
- NGC (New General Catalogue)
- IC (Index Catalogue)

### Esempio: M42

1. Cerca su SIMBAD: "M42"
2. Ottieni:
   - Coordinate: `05 35 17.3 -05 23 28`
   - Tipo: `HII (emission nebula)`
   - Magnitudine: `4.0`
   - Dimensioni: `65 x 60 arcmin`
3. Da Wikipedia:
   - Distanza: `1,344 light years`
   - Età: `~3 million years`
   - Curiosità varie

---

## 🎯 Workflow Completo

### Scenario: Vuoi caricare una foto di M31

1. **Verifica se M31 esiste**
   - Vai su "Gestisci Oggetti"
   - Controlla lista oggetti esistenti
   - Se non c'è, vai al passo 2, altrimenti salta al passo 3

2. **Crea M31** (se necessario)
   - Tab "Gestisci Oggetti"
   - Compila form con dati di Andromeda:
     - ID: `M31 / NGC 224`
     - Nome: `Galassia di Andromeda`
     - Tipo: `Galassia a Spirale`
     - Costellazione: `Andromeda`
     - Coordinate: `00h 42m 44.3s, +41° 16' 09''`
     - Distanza: `2,54 milioni di anni luce`
     - ecc...
   - Click "Crea Oggetto"

3. **Carica Foto**
   - Tab "Carica Foto"
   - Seleziona immagine
   - Seleziona "M31 - Galassia di Andromeda"
   - Compila dati tecnici:
     - Telescopio, camera, esposizione, ecc.
   - Click "Carica Foto"

4. **Verifica**
   - Click "Galleria" in alto
   - Vedi la tua foto nella griglia
   - Click sulla foto
   - Vedi immagine + tutte le info astronomiche!

---

## 🔒 Sicurezza

### Token JWT
- Valido 7 giorni
- Salvato in `localStorage`
- Inviato automaticamente con ogni richiesta
- Scade automaticamente

### Logout
- Rimuove token
- Invalida sessione
- Reindirizza alla home

### Protezione Route
- `/admin` accessibile solo se autenticato
- Altrimenti redirect a `/login`

---

## 🐛 Troubleshooting

### "Token non valido"
→ Fai logout e login di nuovo

### "Errore upload immagine"
→ Verifica:
- File < 10MB
- Formato JPG/PNG
- Cloudinary configurato in backend

### "Oggetto non trovato nel menu"
→ Vai su "Gestisci Oggetti" e crealo prima

### "Database connection error"
→ Verifica che il backend sia avviato e PostgreSQL attivo

---

## 📱 API Endpoints Usati

```
POST   /api/auth/register       # Registrazione
POST   /api/auth/login          # Login
GET    /api/users/me            # Profilo utente
GET    /api/objects             # Lista oggetti
POST   /api/objects             # Crea oggetto (auth)
GET    /api/photos              # Lista foto
POST   /api/photos              # Upload foto (auth)
DELETE /api/photos/:id          # Elimina foto (auth)
```

Tutte le richieste con `(auth)` richiedono header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🎨 Personalizzazione

### Modificare campi form

Edita:
- `frontend/src/components/UploadPhotoForm.jsx`
- `frontend/src/components/CreateObjectForm.jsx`

### Aggiungere validazioni

Nel backend:
- `backend/src/routes/astrophotoRoutes.js`
- `backend/src/routes/astronomicalObjectRoutes.js`

### Cambiare stile

CSS in:
- `frontend/src/pages/Admin.css`
- `frontend/src/components/UploadPhotoForm.css`

---

## ✨ Tips & Best Practices

1. **Crea prima gli oggetti** che fotograferai spesso
2. **Usa nomi standard** dei cataloghi (M, NGC, IC)
3. **Scrivi descrizioni chiare** per aiutare i visitatori
4. **Aggiungi curiosità interessanti** per coinvolgere
5. **Compila più campi possibili** per informazioni complete
6. **Usa immagini di qualità** ma ottimizzate (< 5MB ideale)
7. **Scala Bortle corretta** aiuta altri astrofotografi

---

**Happy Astrophotography! 🌌📸✨**

