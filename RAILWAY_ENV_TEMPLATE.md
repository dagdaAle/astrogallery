# 🔐 Railway Environment Variables Template

Copia queste variabili nella dashboard Railway → Variables

---

## ✅ **VARIABILI OBBLIGATORIE**

```env
NODE_ENV=production
```

---

## 🔑 **JWT SECRET**

Genera con: `openssl rand -base64 32`

```env
JWT_SECRET=<INSERISCI_LA_TUA_CHIAVE_QUI_MIN_32_CARATTERI>
```

---

## 🗄️ **DATABASE MYSQL**

Railway crea automaticamente le variabili `MYSQL_*`.  
Crea queste **referenze** per compatibilità:

```env
DB_HOST=${{MYSQL_HOST}}
DB_USER=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}
DB_NAME=${{MYSQL_DATABASE}}
DB_PORT=${{MYSQL_PORT}}
```

---

## ☁️ **CLOUDINARY**

Ottieni da: https://cloudinary.com/console

```env
CLOUDINARY_CLOUD_NAME=<tuo-cloud-name>
CLOUDINARY_API_KEY=<tua-api-key>
CLOUDINARY_API_SECRET=<tuo-api-secret>
```

**Esempio:**
```env
CLOUDINARY_CLOUD_NAME=drkfxl8ls
CLOUDINARY_API_KEY=651672995952259
CLOUDINARY_API_SECRET=GTJkZUxXsr-BWyW2LiPdOb-klWo
```

---

## 🤖 **OPENAI API**

Ottieni da: https://platform.openai.com/api-keys

```env
OPENAI_API_KEY=sk-proj-<tua-chiave-completa-qui>
```

**Esempio:**
```env
OPENAI_API_KEY=sk-proj-ABCdef123456...
```

---

## 🌐 **FRONTEND URL (Opzionale)**

Railway la imposta automaticamente:

```env
FRONTEND_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

---

## 📋 **COME AGGIUNGERE LE VARIABILI**

### **Opzione A: Dashboard Railway (Consigliato)**

1. Vai su Dashboard Railway
2. Seleziona il tuo progetto
3. Click su **"Variables"**
4. Click **"+ New Variable"**
5. Incolla le variabili una alla volta

### **Opzione B: Railway CLI**

```bash
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=tua-chiave
railway variables set CLOUDINARY_CLOUD_NAME=tuo-cloud-name
railway variables set CLOUDINARY_API_KEY=tua-api-key
railway variables set CLOUDINARY_API_SECRET=tuo-api-secret
railway variables set OPENAI_API_KEY=sk-proj-...
railway variables set DB_HOST='${{MYSQL_HOST}}'
railway variables set DB_USER='${{MYSQL_USER}}'
railway variables set DB_PASSWORD='${{MYSQL_PASSWORD}}'
railway variables set DB_NAME='${{MYSQL_DATABASE}}'
railway variables set DB_PORT='${{MYSQL_PORT}}'
```

### **Opzione C: Bulk Import**

1. Dashboard Railway → Variables
2. Click **"Raw Editor"**
3. Incolla tutto il blocco:

```env
NODE_ENV=production
JWT_SECRET=<tua-chiave>
DB_HOST=${{MYSQL_HOST}}
DB_USER=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}
DB_NAME=${{MYSQL_DATABASE}}
DB_PORT=${{MYSQL_PORT}}
CLOUDINARY_CLOUD_NAME=<tuo-cloud-name>
CLOUDINARY_API_KEY=<tua-api-key>
CLOUDINARY_API_SECRET=<tuo-api-secret>
OPENAI_API_KEY=sk-proj-<tua-chiave>
FRONTEND_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

---

## ✅ **VERIFICA VARIABILI**

Dopo aver configurato, verifica:

```bash
railway variables
```

Dovresti vedere tutte le variabili listate.

---

## 🔒 **SICUREZZA**

⚠️ **IMPORTANTE:**

- ❌ NON committare mai le credenziali su Git
- ❌ NON condividere JWT_SECRET
- ❌ NON esporre API keys pubblicamente
- ✅ Usa sempre variabili ambiente
- ✅ Rigenera secrets se compromessi

---

## 📊 **CHECKLIST**

Verifica di avere:

- [ ] `NODE_ENV=production`
- [ ] `JWT_SECRET` (min 32 caratteri)
- [ ] `DB_*` (tutte e 5 variabili)
- [ ] `CLOUDINARY_*` (tutte e 3 variabili)
- [ ] `OPENAI_API_KEY`
- [ ] Database MySQL creato su Railway

---

## 🆘 **ERRORI COMUNI**

### **Missing environment variable**
```bash
# Verifica che tutte le variabili siano configurate
railway variables | grep -i NOME_VARIABILE
```

### **Cloudinary upload fails**
```bash
# Testa credenziali su Cloudinary console
# Verifica limiti piano gratuito (25 GB/mese)
```

### **OpenAI API error**
```bash
# Verifica crediti: https://platform.openai.com/usage
# Verifica che la chiave non sia scaduta
```

### **Database connection error**
```bash
# Verifica che MySQL plugin sia attivo
railway connect MySQL
# Se funziona, il problema è nelle variabili DB_*
```

---

## 🔄 **AGGIORNARE VARIABILI**

Per modificare una variabile:

```bash
railway variables set NOME_VARIABILE=nuovo_valore
```

Oppure:
1. Dashboard Railway → Variables
2. Click sulla variabile
3. Modifica valore
4. Save

Railway riavvierà automaticamente l'app!

---

## 📝 **NOTE**

1. **Variabili con ${{}}**: Sono riferimenti ad altre variabili Railway
2. **MYSQL_***: Create automaticamente dal plugin MySQL
3. **RAILWAY_PUBLIC_DOMAIN**: Creata automaticamente da Railway
4. Le modifiche alle variabili richiedono restart (automatico)

---

**Template creato: 2025-11-07**  
**Per: AstroGallery Deploy su Railway**

