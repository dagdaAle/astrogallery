# 🐬 Setup MySQL - AstroGallery

## 📦 Installazione MySQL

### Opzione 1: Homebrew (Raccomandato)

```bash
# Installa MySQL
brew install mysql

# Avvia MySQL
brew services start mysql

# Verifica che sia attivo
brew services list
# Dovresti vedere: mysql started
```

### Opzione 2: Download manuale

1. Vai su https://dev.mysql.com/downloads/mysql/
2. Scarica MySQL Community Server per macOS
3. Installa il pacchetto `.dmg`
4. Avvia MySQL dal pannello System Preferences

---

## 🔐 Configurazione Sicurezza (Prima volta)

```bash
# Esegui script di sicurezza
mysql_secure_installation

# Rispondi alle domande:
# - Set root password? [Y/n] → Y (scegli una password)
# - Remove anonymous users? [Y/n] → Y
# - Disallow root login remotely? [Y/n] → Y
# - Remove test database? [Y/n] → Y
# - Reload privilege tables? [Y/n] → Y
```

---

## 🗄️ Crea Database

```bash
# Accedi a MySQL
mysql -u root -p
# Inserisci la password che hai impostato

# Dentro MySQL:
CREATE DATABASE astrogallery;
SHOW DATABASES;
EXIT;
```

---

## ⚙️ Configura Backend

```bash
cd backend

# Crea file .env
cat > .env << 'EOF'
PORT=3000
NODE_ENV=development

# Database MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tua-password-mysql
DB_NAME=astrogallery

JWT_SECRET=your-super-secret-jwt-key-change-this

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FRONTEND_URL=http://localhost:5173
EOF

# Modifica la password nel file .env
nano .env
# Oppure
code .env
```

---

## 📊 Importa Schema e Dati

```bash
# Assicurati di essere nella cartella backend
cd backend

# 1. Installa dipendenze (mysql2)
npm install

# 2. Importa schema
mysql -u root -p astrogallery < src/database/schema-mysql.sql

# 3. Popola oggetti astronomici
npm run seed:objects

# Output:
# 🌱 Inizio seeding database MySQL...
# 📊 Inserimento oggetti astronomici...
#    ✅ Nebulosa di Orione
#    ✅ Galassia di Andromeda
#    ... 
# ✨ Seeding completato! 5 oggetti inseriti.

# 4. Crea utente admin
npm run seed:users

# Output:
# 📋 Credenziali di accesso:
#    ┌─────────────────────────────────────────┐
#    │ Email:    admin@astrogallery.com        │
#    │ Password: admin123                      │
#    │ Username: admin                         │
#    └─────────────────────────────────────────┘
```

---

## 🚀 Avvia Progetto

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Dovresti vedere:
# ✅ Connesso al database MySQL
# 🌌 AstroGallery API Server
# ✅ Server avviato su porta 3000

# Terminal 2 - Frontend
cd frontend
npm run dev

# Browser
# http://localhost:5173/login
```

---

## ✅ Verifica Tutto Funzioni

```bash
# 1. MySQL è attivo?
mysql -u root -p -e "SELECT 1"

# 2. Database esiste?
mysql -u root -p -e "SHOW DATABASES LIKE 'astrogallery'"

# 3. Tabelle create?
mysql -u root -p astrogallery -e "SHOW TABLES"

# Dovresti vedere:
# +-------------------------+
# | Tables_in_astrogallery  |
# +-------------------------+
# | astronomical_objects    |
# | astrophotos            |
# | comments               |
# | likes                  |
# | users                  |
# +-------------------------+

# 4. Utente admin esiste?
mysql -u root -p astrogallery -e "SELECT id, username, email FROM users"

# 5. Oggetti astronomici esistono?
mysql -u root -p astrogallery -e "SELECT catalog_id, common_name FROM astronomical_objects"

# 6. Backend API risponde?
curl http://localhost:3000/api/health
# Output: {"status":"OK","message":"AstroGallery API is running"}
```

---

## 🔧 Comandi Utili MySQL

```bash
# Avvia MySQL
brew services start mysql

# Ferma MySQL
brew services stop mysql

# Riavvia MySQL
brew services restart mysql

# Status
brew services list

# Accedi a MySQL
mysql -u root -p

# Accedi direttamente al database astrogallery
mysql -u root -p astrogallery

# Backup database
mysqldump -u root -p astrogallery > backup.sql

# Ripristina backup
mysql -u root -p astrogallery < backup.sql

# Reset database (attenzione!)
mysql -u root -p -e "DROP DATABASE astrogallery; CREATE DATABASE astrogallery;"
```

---

## 🐛 Troubleshooting

### "command not found: mysql"

**Fix:**
```bash
# Aggiungi al PATH
echo 'export PATH="/opt/homebrew/opt/mysql/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### "ERROR 1045: Access denied"

**Fix:**
```bash
# Reset password root
mysql.server stop
mysqld_safe --skip-grant-tables &
mysql -u root
# In MySQL:
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'nuova-password';
EXIT;
killall mysqld
mysql.server start
```

### "ERROR 2002: Can't connect to socket"

**Fix:**
```bash
# MySQL non è avviato
brew services start mysql

# Oppure
mysql.server start
```

### Backend dice "ECONNREFUSED"

**Checklist:**
1. ✅ MySQL è avviato? → `brew services list`
2. ✅ Password corretta in `.env`?
3. ✅ Database `astrogallery` esiste? → `mysql -u root -p -e "SHOW DATABASES"`
4. ✅ User ha permessi? → Prova con `root`

---

## 📱 Credenziali Default

| Campo | Valore |
|-------|--------|
| **DB Host** | `localhost` |
| **DB User** | `root` |
| **DB Password** | (quella che hai impostato) |
| **DB Name** | `astrogallery` |
| **Admin Email** | `admin@astrogallery.com` |
| **Admin Password** | `admin123` |

---

## 🎯 Quick Start Recap

```bash
# 1. Installa MySQL
brew install mysql
brew services start mysql

# 2. Setup sicurezza
mysql_secure_installation

# 3. Crea database
mysql -u root -p -e "CREATE DATABASE astrogallery"

# 4. Configura backend/.env
# (imposta DB_PASSWORD)

# 5. Import schema
cd backend
mysql -u root -p astrogallery < src/database/schema-mysql.sql

# 6. Seed database
npm run seed:objects
npm run seed:users

# 7. Avvia tutto
npm run dev  # backend
cd ../frontend && npm run dev  # frontend

# 8. Login su http://localhost:5173/login
# Email: admin@astrogallery.com
# Password: admin123
```

---

**MySQL è pronto! 🐬✨**

