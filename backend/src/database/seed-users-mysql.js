import db, { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';

// Utente admin di default
const defaultUser = {
  username: 'admin',
  email: 'admin@astrogallery.com',
  password: 'admin123', // Cambia questa password in produzione!
};

async function seedUsers() {
  try {
    console.log('🔐 Creazione utente admin di default...\n');

    // Controlla se esiste già
    const existingUser = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [defaultUser.email]
    );

    if (existingUser.rows.length > 0) {
      console.log('⚠️  Utente admin già esistente:');
      console.log(`   Email: ${existingUser.rows[0].email}`);
      console.log(`   Username: ${existingUser.rows[0].username}`);
      console.log(`   ID: ${existingUser.rows[0].id}`);
      console.log('\n💡 Usa queste credenziali per il login.\n');
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(defaultUser.password, 10);

    // Crea utente
    const result = await db.query(
      `INSERT INTO users (username, email, password_hash) 
       VALUES (?, ?, ?)`,
      [defaultUser.username, defaultUser.email, passwordHash]
    );

    console.log('✅ Utente admin creato con successo!\n');
    console.log('📋 Credenziali di accesso:');
    console.log('   ┌─────────────────────────────────────────┐');
    console.log(`   │ Email:    ${defaultUser.email.padEnd(25)} │`);
    console.log(`   │ Password: ${defaultUser.password.padEnd(25)} │`);
    console.log(`   │ Username: ${defaultUser.username.padEnd(25)} │`);
    console.log('   └─────────────────────────────────────────┘');
    console.log('\n🌐 Vai su http://localhost:5173/login per accedere\n');
    console.log('⚠️  IMPORTANTE: Cambia la password in produzione!\n');
  } catch (error) {
    console.error('❌ Errore durante creazione utente:', error);
    throw error;
  }
}

// Esegui solo se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedUsers()
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch(() => {
      pool.end();
      process.exit(1);
    });
}

export default seedUsers;

