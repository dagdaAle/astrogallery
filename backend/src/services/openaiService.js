import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Ottiene informazioni su un oggetto astronomico usando OpenAI
 * @param {string} objectName - Nome dell'oggetto astronomico
 * @returns {Promise<Object>} Dati dell'oggetto astronomico
 */
export const getAstronomicalObjectData = async (objectName) => {
  try {
    const prompt = `Sei un esperto astronomo. Fornisci informazioni dettagliate sull'oggetto astronomico "${objectName}".

Rispondi SOLO con un JSON valido in questo formato esatto (usa null per campi sconosciuti):

{
  "title": "Titolo accattivante per la foto (es: 'La Magnifica Nebulosa di Orione', 'Andromeda: La Galassia Vicina')",
  "description": "Descrizione breve e coinvolgente della foto in 2-3 frasi (max 200 caratteri)",
  "catalog_id": "ID del catalogo (es: M42, NGC 1976)",
  "common_name": "Nome comune in italiano",
  "object_type": "Tipo di oggetto (es: Nebulosa a Emissione, Galassia Spirale)",
  "constellation": "Costellazione",
  "right_ascension": "Ascensione retta (es: 05h 35m 17.3s)",
  "declination": "Declinazione (es: -05° 23' 28'')",
  "distance": "Distanza in anni luce (es: 1.344)",
  "angular_size": "Dimensione angolare (es: 65' × 60')",
  "apparent_magnitude": "Magnitudine apparente (es: 4.0)",
  "age": "Età in milioni di anni",
  "mass": "Massa (es: ~2.000 masse solari)",
  "temperature": "Temperatura in Kelvin",
  "composition": "Composizione chimica principale",
  "best_viewing_period": "Periodo migliore per osservazione (es: Dicembre - Marzo)",
  "visible_to_naked_eye": true o false,
  "facts": [
    "Curiosità 1",
    "Curiosità 2",
    "Curiosità 3",
    "Curiosità 4"
  ]
}

NON aggiungere testo prima o dopo il JSON. Rispondi SOLO con il JSON.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Sei un assistente specializzato in astronomia. Rispondi SEMPRE e SOLO con JSON valido, senza markdown o testo aggiuntivo.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1800, // Aumentato per title e description
    });

    const responseText = completion.choices[0].message.content.trim();
    
    // Rimuovi eventuali markdown code blocks
    let jsonText = responseText;
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }

    const data = JSON.parse(jsonText);

    console.log(`✅ Dati OpenAI ottenuti per: ${objectName}`);
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error('❌ Errore OpenAI:', error.message);
    
    if (error.message.includes('JSON')) {
      return {
        success: false,
        error: 'Errore nel parsing dei dati. Riprova.',
      };
    }
    
    return {
      success: false,
      error: 'Errore durante il recupero dei dati. Verifica la chiave API OpenAI.',
    };
  }
};

/**
 * Test connessione OpenAI
 * @returns {Promise<boolean>}
 */
export const testOpenAI = async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Test' }],
      max_tokens: 5,
    });
    console.log('✅ Connessione OpenAI OK');
    return true;
  } catch (error) {
    console.error('❌ Errore connessione OpenAI:', error.message);
    return false;
  }
};

