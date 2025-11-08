// Dati di esempio con informazioni astronomiche complete
export const astrophotos = [
  {
    id: 1,
    title: "Nebulosa di Orione (M42)",
    image: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800",
    
    // Informazioni astronomiche
    astronomicalData: {
      catalogId: "M42 / NGC 1976",
      commonName: "Nebulosa di Orione",
      objectType: "Nebulosa a Emissione",
      constellation: "Orione",
      coordinates: {
        rightAscension: "05h 35m 17.3s",
        declination: "-05° 23' 28''"
      },
      distance: "1.344 anni luce (412 parsec)",
      apparentMagnitude: "4.0",
      angularSize: "65' × 60'",
      age: "~3 milioni di anni",
      mass: "~2.000 masse solari",
      temperature: "~10.000 K",
      composition: "Idrogeno (90%), Elio (10%), tracce di C, N, O",
      bestViewingPeriod: "Dicembre - Marzo",
      visibleToNakedEye: true,
      description: "La Nebulosa di Orione è una nebulosa diffusa situata nella Via Lattea, a sud della Cintura di Orione. È una delle regioni di formazione stellare più vicine alla Terra.",
      facts: [
        "Regione di formazione stellare più vicina alla Terra",
        "Contiene oltre 700 stelle in formazione",
        "Parte del complesso nebuloso Molecolare di Orione",
        "Il Trapezio al suo centro illumina l'intera nebulosa"
      ]
    },
    
    // Dati tecnici di ripresa
    captureData: {
      telescopio: "Celestron NexStar 8SE",
      camera: "ZWO ASI294MC Pro",
      esposizione: "20 x 180s",
      filtri: "Nessuno",
      data: "15 Gennaio 2024",
      location: "Osservatorio Monte Baldo",
      bortle: "Classe 3",
    }
  },
  {
    id: 2,
    title: "Galassia di Andromeda (M31)",
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800",
    astronomicalData: {
      catalogId: "M31 / NGC 224",
      commonName: "Galassia di Andromeda",
      objectType: "Galassia a Spirale",
      constellation: "Andromeda",
      coordinates: {
        rightAscension: "00h 42m 44.3s",
        declination: "+41° 16' 09''"
      },
      distance: "2,54 milioni di anni luce",
      apparentMagnitude: "3.44",
      angularSize: "178' × 63'",
      age: "~10 miliardi di anni",
      mass: "~1,5 trilioni di masse solari",
      temperature: "N/A",
      composition: "Stelle, gas, polvere, materia oscura",
      bestViewingPeriod: "Settembre - Febbraio",
      visibleToNakedEye: true,
      description: "La Galassia di Andromeda è una galassia a spirale gigante, la più vicina alla Via Lattea e destinata a collidere con essa tra circa 4 miliardi di anni.",
      facts: [
        "Galassia più grande del Gruppo Locale",
        "Contiene circa 1 trilione di stelle",
        "Si avvicina a noi a 110 km/s",
        "Visibile ad occhio nudo nei cieli bui"
      ]
    },
    captureData: {
      telescopio: "Sky-Watcher Evostar 120ED",
      camera: "Canon EOS Ra",
      esposizione: "40 x 300s",
      filtri: "L-eXtreme",
      data: "22 Agosto 2023",
      location: "Val d'Aosta",
      bortle: "Classe 2",
    }
  },
  {
    id: 3,
    title: "Nebulosa Testa di Cavallo",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
    astronomicalData: {
      catalogId: "Barnard 33",
      commonName: "Nebulosa Testa di Cavallo",
      objectType: "Nebulosa Oscura",
      constellation: "Orione",
      coordinates: {
        rightAscension: "05h 40m 59.0s",
        declination: "-02° 27' 30''"
      },
      distance: "1.500 anni luce",
      apparentMagnitude: "N/A",
      angularSize: "8' × 6'",
      age: "~5 milioni di anni",
      mass: "~27 masse solari",
      temperature: "~40 K (-233°C)",
      composition: "Polvere densa e gas freddo (H2, CO)",
      bestViewingPeriod: "Dicembre - Marzo",
      visibleToNakedEye: false,
      description: "Una nebulosa oscura nella costellazione di Orione, famosa per la sua forma distintiva che ricorda la testa di un cavallo.",
      facts: [
        "Una delle nebulose più fotografate",
        "Scoperta nel 1888 da Williamina Fleming",
        "La forma è creata da polvere densa",
        "Regione di formazione stellare attiva"
      ]
    },
    captureData: {
      telescopio: "William Optics RedCat 51",
      camera: "ZWO ASI2600MC Pro",
      esposizione: "50 x 300s",
      filtri: "Optolong L-eNhance",
      data: "10 Febbraio 2024",
      location: "Osservatorio Monte Baldo",
      bortle: "Classe 3",
    }
  },
  {
    id: 4,
    title: "Nebulosa Aquila (M16)",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800",
    astronomicalData: {
      catalogId: "M16 / NGC 6611",
      commonName: "Nebulosa Aquila",
      objectType: "Nebulosa a Emissione + Ammasso Aperto",
      constellation: "Serpente",
      coordinates: {
        rightAscension: "18h 18m 48s",
        declination: "-13° 49' 00''"
      },
      distance: "7.000 anni luce",
      apparentMagnitude: "6.0",
      angularSize: "7'",
      age: "~5,5 milioni di anni",
      mass: "N/A",
      temperature: "~8.000 K",
      composition: "Idrogeno ionizzato, Elio, polvere",
      bestViewingPeriod: "Giugno - Agosto",
      visibleToNakedEye: false,
      description: "Una giovane nebulosa a emissione famosa per i suoi 'Pilastri della Creazione', fotografati dal telescopio Hubble.",
      facts: [
        "Contiene i famosi 'Pilastri della Creazione'",
        "Regione di formazione stellare attiva",
        "Scoperta da Charles Messier nel 1764",
        "I pilastri sono alti circa 5 anni luce"
      ]
    },
    captureData: {
      telescopio: "Explore Scientific ED127",
      camera: "QHY268C",
      esposizione: "30 x 240s",
      filtri: "Duo-Narrowband",
      data: "5 Luglio 2023",
      location: "Toscana",
      bortle: "Classe 4",
    }
  },
  {
    id: 5,
    title: "Luna - Cratere Tycho",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800",
    astronomicalData: {
      catalogId: "Tycho",
      commonName: "Cratere Tycho",
      objectType: "Cratere da Impatto",
      constellation: "N/A (Luna)",
      coordinates: {
        rightAscension: "N/A",
        declination: "Lat: -43.3°, Long: -11.4°"
      },
      distance: "~384.400 km (Terra-Luna)",
      apparentMagnitude: "N/A",
      angularSize: "85 km di diametro",
      age: "~108 milioni di anni",
      mass: "N/A",
      temperature: "-173°C a +127°C",
      composition: "Roccia lunare (anortosite, basalto)",
      bestViewingPeriod: "Luna piena",
      visibleToNakedEye: true,
      description: "Uno dei crateri più prominenti sulla Luna con il suo spettacolare sistema di raggi brillanti visibili anche dalla Terra.",
      facts: [
        "Sistema di raggi si estende per 1.500 km",
        "Uno dei crateri più giovani della Luna",
        "Profondità di 4.700 metri",
        "Picco centrale alto 2.400 metri"
      ]
    },
    captureData: {
      telescopio: "Celestron C11",
      camera: "ZWO ASI178MM",
      esposizione: "5000 frames",
      filtri: "RGB",
      data: "18 Marzo 2024",
      location: "Milano",
      bortle: "Classe 7",
    }
  },
  {
    id: 6,
    title: "Nebulosa Nord America (NGC 7000)",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800",
    astronomicalData: {
      catalogId: "NGC 7000",
      commonName: "Nebulosa Nord America",
      objectType: "Nebulosa a Emissione",
      constellation: "Cigno",
      coordinates: {
        rightAscension: "20h 58m 48s",
        declination: "+44° 20' 00''"
      },
      distance: "~2.200 anni luce",
      apparentMagnitude: "4.0",
      angularSize: "120' × 100'",
      age: "N/A",
      mass: "N/A",
      temperature: "~10.000 K",
      composition: "Idrogeno ionizzato, tracce di O, N, S",
      bestViewingPeriod: "Giugno - Ottobre",
      visibleToNakedEye: false,
      description: "Una nebulosa a emissione nella costellazione del Cigno che ricorda la forma del continente nordamericano.",
      facts: [
        "Illuminata da una stella calda vicina",
        "Parte di un complesso nebuloso più grande",
        "Il 'Golfo del Messico' è una regione oscura",
        "Ottimo target per astrofotografia"
      ]
    },
    captureData: {
      telescopio: "William Optics SpaceCat 51",
      camera: "ZWO ASI2400MC Pro",
      esposizione: "60 x 180s",
      filtri: "Optolong L-eXtreme",
      data: "28 Giugno 2023",
      location: "Val di Fassa",
      bortle: "Classe 2",
    }
  }
];
