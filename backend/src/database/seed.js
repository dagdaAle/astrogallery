import pool from '../config/database.js';
import { createAstronomicalObject } from '../models/astronomicalObjectModel.js';

// Dati astronomici di esempio
const astronomicalObjects = [
  {
    catalog_id: "M42 / NGC 1976",
    common_name: "Nebulosa di Orione",
    object_type: "Nebulosa a Emissione",
    constellation: "Orione",
    right_ascension: "05h 35m 17.3s",
    declination: "-05° 23' 28''",
    distance: "1.344 anni luce (412 parsec)",
    apparent_magnitude: "4.0",
    angular_size: "65' × 60'",
    age: "~3 milioni di anni",
    mass: "~2.000 masse solari",
    temperature: "~10.000 K",
    composition: "Idrogeno (90%), Elio (10%), tracce di C, N, O",
    best_viewing_period: "Dicembre - Marzo",
    visible_to_naked_eye: true,
    description: "La Nebulosa di Orione è una nebulosa diffusa situata nella Via Lattea, a sud della Cintura di Orione. È una delle regioni di formazione stellare più vicine alla Terra.",
    facts: [
      "Regione di formazione stellare più vicina alla Terra",
      "Contiene oltre 700 stelle in formazione",
      "Parte del complesso nebuloso Molecolare di Orione",
      "Il Trapezio al suo centro illumina l'intera nebulosa"
    ]
  },
  {
    catalog_id: "M31 / NGC 224",
    common_name: "Galassia di Andromeda",
    object_type: "Galassia a Spirale",
    constellation: "Andromeda",
    right_ascension: "00h 42m 44.3s",
    declination: "+41° 16' 09''",
    distance: "2,54 milioni di anni luce",
    apparent_magnitude: "3.44",
    angular_size: "178' × 63'",
    age: "~10 miliardi di anni",
    mass: "~1,5 trilioni di masse solari",
    temperature: "N/A",
    composition: "Stelle, gas, polvere, materia oscura",
    best_viewing_period: "Settembre - Febbraio",
    visible_to_naked_eye: true,
    description: "La Galassia di Andromeda è una galassia a spirale gigante, la più vicina alla Via Lattea e destinata a collidere con essa tra circa 4 miliardi di anni.",
    facts: [
      "Galassia più grande del Gruppo Locale",
      "Contiene circa 1 trilione di stelle",
      "Si avvicina a noi a 110 km/s",
      "Visibile ad occhio nudo nei cieli bui"
    ]
  },
  {
    catalog_id: "Barnard 33",
    common_name: "Nebulosa Testa di Cavallo",
    object_type: "Nebulosa Oscura",
    constellation: "Orione",
    right_ascension: "05h 40m 59.0s",
    declination: "-02° 27' 30''",
    distance: "1.500 anni luce",
    apparent_magnitude: "N/A",
    angular_size: "8' × 6'",
    age: "~5 milioni di anni",
    mass: "~27 masse solari",
    temperature: "~40 K (-233°C)",
    composition: "Polvere densa e gas freddo (H2, CO)",
    best_viewing_period: "Dicembre - Marzo",
    visible_to_naked_eye: false,
    description: "Una nebulosa oscura nella costellazione di Orione, famosa per la sua forma distintiva che ricorda la testa di un cavallo.",
    facts: [
      "Una delle nebulose più fotografate",
      "Scoperta nel 1888 da Williamina Fleming",
      "La forma è creata da polvere densa",
      "Regione di formazione stellare attiva"
    ]
  },
  {
    catalog_id: "M16 / NGC 6611",
    common_name: "Nebulosa Aquila",
    object_type: "Nebulosa a Emissione + Ammasso Aperto",
    constellation: "Serpente",
    right_ascension: "18h 18m 48s",
    declination: "-13° 49' 00''",
    distance: "7.000 anni luce",
    apparent_magnitude: "6.0",
    angular_size: "7'",
    age: "~5,5 milioni di anni",
    mass: "N/A",
    temperature: "~8.000 K",
    composition: "Idrogeno ionizzato, Elio, polvere",
    best_viewing_period: "Giugno - Agosto",
    visible_to_naked_eye: false,
    description: "Una giovane nebulosa a emissione famosa per i suoi 'Pilastri della Creazione', fotografati dal telescopio Hubble.",
    facts: [
      "Contiene i famosi 'Pilastri della Creazione'",
      "Regione di formazione stellare attiva",
      "Scoperta da Charles Messier nel 1764",
      "I pilastri sono alti circa 5 anni luce"
    ]
  },
  {
    catalog_id: "NGC 7000",
    common_name: "Nebulosa Nord America",
    object_type: "Nebulosa a Emissione",
    constellation: "Cigno",
    right_ascension: "20h 58m 48s",
    declination: "+44° 20' 00''",
    distance: "~2.200 anni luce",
    apparent_magnitude: "4.0",
    angular_size: "120' × 100'",
    age: "N/A",
    mass: "N/A",
    temperature: "~10.000 K",
    composition: "Idrogeno ionizzato, tracce di O, N, S",
    best_viewing_period: "Giugno - Ottobre",
    visible_to_naked_eye: false,
    description: "Una nebulosa a emissione nella costellazione del Cigno che ricorda la forma del continente nordamericano.",
    facts: [
      "Illuminata da una stella calda vicina",
      "Parte di un complesso nebuloso più grande",
      "Il 'Golfo del Messico' è una regione oscura",
      "Ottimo target per astrofotografia"
    ]
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Inizio seeding database...\n');

    // Controlla se esistono già oggetti
    const existingObjects = await pool.query('SELECT COUNT(*) FROM astronomical_objects');
    
    if (parseInt(existingObjects.rows[0].count) > 0) {
      console.log('⚠️  Il database contiene già dati.');
      console.log('   Vuoi eliminare i dati esistenti? (Ctrl+C per annullare)\n');
      
      // Aspetta 3 secondi prima di procedere
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('🗑️  Eliminazione dati esistenti...');
      await pool.query('TRUNCATE astronomical_objects RESTART IDENTITY CASCADE');
    }

    // Inserisci oggetti astronomici
    console.log('📊 Inserimento oggetti astronomici...');
    for (const obj of astronomicalObjects) {
      await createAstronomicalObject(obj);
      console.log(`   ✅ ${obj.common_name}`);
    }

    console.log(`\n✨ Seeding completato! ${astronomicalObjects.length} oggetti inseriti.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Errore durante il seeding:', error);
    process.exit(1);
  }
}

seedDatabase();

