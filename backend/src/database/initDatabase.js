import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Inizializza il database se non esiste già
 */
export async function initDatabase() {
  try {
    console.log('🔍 Controllo inizializzazione database...');
    
    // Controlla se le tabelle esistono già
    const [tables] = await db.query('SHOW TABLES');
    
    if (tables.length > 0) {
      console.log('✅ Database già inizializzato');
      return;
    }
    
    console.log('🌱 Database vuoto, inizio inizializzazione...');
    
    // Leggi e esegui lo schema
    const schemaPath = join(__dirname, 'schema-mysql.sql');
    const schema = await readFile(schemaPath, 'utf-8');
    
    // Dividi in singole query (rimuovi commenti)
    const queries = schema
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));
    
    console.log('📋 Creazione tabelle...');
    for (const query of queries) {
      await db.query(query);
    }
    
    console.log('✅ Schema creato con successo');
    
    // Esegui seed dati di esempio
    console.log('🌱 Seeding dati di esempio...');
    const seedModule = await import('./seed-mysql.js');
    await seedModule.default();
    
    // Esegui seed utente admin
    console.log('🔐 Creazione utente admin...');
    const usersModule = await import('./seed-users-mysql.js');
    await usersModule.default();
    
    console.log('✅ Database inizializzato con successo!');
    
  } catch (error) {
    console.error('❌ Errore durante inizializzazione database:', error);
    // Non bloccare l'avvio del server, ma logga l'errore
    console.error('⚠️ Il server continuerà, ma il database potrebbe non essere pronto');
  }
}

