/**
 * ELENA'S ATLAS — DATA MODEL V2
 *
 * This file is the content layer. The website builds all aggregate statistics from it.
 * Replace demo content with your actual travels.
 *
 * Hierarchy: country -> regions[] -> cities[]
 * Journey photos can be local files, e.g. "./assets/photos/japan-01.jpg".
 */
window.TRAVEL_ATLAS_DATA = {
  profile: {
    name: "Elena",
    siteTitle: "Elena's Atlas",
    eyebrow: "PERSONAL GEOGRAPHY / 2026",
    headline: "Places become part of us.",
    intro: "Una geografia personale fatta di paesi, regioni, città, ritorni e cose che restano.",
    closing: "A map is never only a map.",
    base: "Amsterdam, NL",
    worldCountryCount: 195,
    demo: true,
    updated: "Updated August 2026"
  },

  countries: [
    {
      iso3: "ITA", iso2: "IT", name: "Italia", continent: "Europe", visits: 6,
      status: "roots", coordinates: { lat: 42.8, lon: 12.8 },
      essence: "Radici, ritorni e quella sensazione precisa di sapere da dove si parte.",
      regions: [
        { name: "Piemonte", coordinates: { lat: 45.07, lon: 7.69 }, cities: [
          { name: "Torino", coordinates: { lat: 45.07, lon: 7.69 }, visits: 4, feeling: "home / layers" },
          { name: "Langhe", coordinates: { lat: 44.7, lon: 7.98 }, visits: 1, feeling: "hills / slowness" }
        ]},
        { name: "Emilia-Romagna", coordinates: { lat: 44.49, lon: 11.34 }, cities: [
          { name: "Bologna", coordinates: { lat: 44.49, lon: 11.34 }, visits: 1, feeling: "portici / conversations" }
        ]}
      ]
    },
    {
      iso3: "NLD", iso2: "NL", name: "Paesi Bassi", continent: "Europe", visits: 8,
      status: "lived", coordinates: { lat: 52.2, lon: 5.3 },
      essence: "Acqua, biciclette, vento contrario e una quotidianità diventata familiare.",
      regions: [
        { name: "Noord-Holland", coordinates: { lat: 52.52, lon: 4.79 }, cities: [
          { name: "Amsterdam", coordinates: { lat: 52.37, lon: 4.90 }, visits: 6, feeling: "daily life / motion" }
        ]},
        { name: "Utrecht", coordinates: { lat: 52.09, lon: 5.12 }, cities: [
          { name: "Utrecht", coordinates: { lat: 52.09, lon: 5.12 }, visits: 1, feeling: "canals / compactness" }
        ]},
        { name: "Zuid-Holland", coordinates: { lat: 51.92, lon: 4.48 }, cities: [
          { name: "Rotterdam", coordinates: { lat: 51.92, lon: 4.48 }, visits: 1, feeling: "edges / architecture" }
        ]}
      ]
    },
    {
      iso3: "FRA", iso2: "FR", name: "Francia", continent: "Europe", visits: 5,
      status: "return", coordinates: { lat: 46.2, lon: 2.2 },
      essence: "Luce del Sud, lingue che si mescolano e giornate che sembrano più lunghe.",
      regions: [
        { name: "Île-de-France", coordinates: { lat: 48.86, lon: 2.35 }, cities: [
          { name: "Paris", coordinates: { lat: 48.86, lon: 2.35 }, visits: 2, feeling: "density / museums" }
        ]},
        { name: "Provence-Alpes-Côte d’Azur", coordinates: { lat: 43.53, lon: 5.45 }, cities: [
          { name: "Aix-en-Provence", coordinates: { lat: 43.53, lon: 5.45 }, visits: 2, feeling: "summer / tenderness" },
          { name: "Marseille", coordinates: { lat: 43.30, lon: 5.37 }, visits: 1, feeling: "salt / friction" }
        ]}
      ]
    },
    {
      iso3: "ESP", iso2: "ES", name: "Spagna", continent: "Europe", visits: 5,
      status: "lived", coordinates: { lat: 40.4, lon: -3.7 },
      essence: "Calore, piazze vive e la sensazione che la sera inizi sempre troppo presto.",
      regions: [
        { name: "Catalunya", coordinates: { lat: 41.39, lon: 2.17 }, cities: [
          { name: "Barcelona", coordinates: { lat: 41.39, lon: 2.17 }, visits: 3, feeling: "language / becoming" },
          { name: "Girona", coordinates: { lat: 41.98, lon: 2.82 }, visits: 1, feeling: "stone / cycling" }
        ]},
        { name: "Comunidad de Madrid", coordinates: { lat: 40.42, lon: -3.70 }, cities: [
          { name: "Madrid", coordinates: { lat: 40.42, lon: -3.70 }, visits: 1, feeling: "night / energy" }
        ]}
      ]
    },
    {
      iso3: "BEL", iso2: "BE", name: "Belgio", continent: "Europe", visits: 4,
      status: "return", coordinates: { lat: 50.6, lon: 4.7 },
      essence: "Città compatte, confini vicini e partenze improvvisate.",
      regions: [
        { name: "Flanders", coordinates: { lat: 51.05, lon: 4.40 }, cities: [
          { name: "Antwerpen", coordinates: { lat: 51.22, lon: 4.40 }, visits: 3, feeling: "departure / crossings" },
          { name: "Gent", coordinates: { lat: 51.05, lon: 3.72 }, visits: 1, feeling: "water / texture" }
        ]}
      ]
    },
    {
      iso3: "DNK", iso2: "DK", name: "Danimarca", continent: "Europe", visits: 2,
      status: "explored", coordinates: { lat: 56.0, lon: 9.5 },
      essence: "Nord, vento, spazi essenziali e una cura quasi ostinata per i dettagli.",
      regions: [
        { name: "Hovedstaden", coordinates: { lat: 55.68, lon: 12.57 }, cities: [
          { name: "Copenhagen", coordinates: { lat: 55.68, lon: 12.57 }, visits: 2, feeling: "design / wind" }
        ]}
      ]
    },
    {
      iso3: "DEU", iso2: "DE", name: "Germania", continent: "Europe", visits: 3,
      status: "explored", coordinates: { lat: 51.1, lon: 10.4 },
      essence: "Stazioni, foreste e città che cambiano tono da un quartiere all’altro.",
      regions: [
        { name: "Berlin", coordinates: { lat: 52.52, lon: 13.41 }, cities: [
          { name: "Berlin", coordinates: { lat: 52.52, lon: 13.41 }, visits: 2, feeling: "layers / freedom" }
        ]},
        { name: "Nordrhein-Westfalen", coordinates: { lat: 50.94, lon: 6.96 }, cities: [
          { name: "Köln", coordinates: { lat: 50.94, lon: 6.96 }, visits: 1, feeling: "river / movement" }
        ]}
      ]
    },
    {
      iso3: "PRT", iso2: "PT", name: "Portogallo", continent: "Europe", visits: 2,
      status: "explored", coordinates: { lat: 39.4, lon: -8.2 },
      essence: "Oceano, salite e una malinconia che sa essere luminosa.",
      regions: [
        { name: "Lisboa", coordinates: { lat: 38.72, lon: -9.14 }, cities: [
          { name: "Lisboa", coordinates: { lat: 38.72, lon: -9.14 }, visits: 1, feeling: "Atlantic / light" }
        ]},
        { name: "Norte", coordinates: { lat: 41.15, lon: -8.61 }, cities: [
          { name: "Porto", coordinates: { lat: 41.15, lon: -8.61 }, visits: 1, feeling: "river / blue" }
        ]}
      ]
    },
    {
      iso3: "GRC", iso2: "GR", name: "Grecia", continent: "Europe", visits: 2,
      status: "explored", coordinates: { lat: 39.1, lon: 21.8 },
      essence: "Pietra chiara, acqua profonda e tempi che si allungano.",
      regions: [
        { name: "Attica", coordinates: { lat: 37.98, lon: 23.73 }, cities: [
          { name: "Athens", coordinates: { lat: 37.98, lon: 23.73 }, visits: 1, feeling: "heat / stone" }
        ]},
        { name: "Central Macedonia", coordinates: { lat: 40.64, lon: 22.94 }, cities: [
          { name: "Thessaloniki", coordinates: { lat: 40.64, lon: 22.94 }, visits: 1, feeling: "sea / evenings" }
        ]}
      ]
    },
    {
      iso3: "MYS", iso2: "MY", name: "Malesia", continent: "Asia", visits: 2,
      status: "discovery", coordinates: { lat: 4.2, lon: 102.0 },
      essence: "Umidità, biodiversità e la scala improvvisamente enorme della foresta.",
      regions: [
        { name: "Kuala Lumpur", coordinates: { lat: 3.14, lon: 101.69 }, cities: [
          { name: "Kuala Lumpur", coordinates: { lat: 3.14, lon: 101.69 }, visits: 1, feeling: "density / transition" }
        ]},
        { name: "Sabah", coordinates: { lat: 5.42, lon: 116.80 }, cities: [
          { name: "Kinabatangan", coordinates: { lat: 5.55, lon: 118.30 }, visits: 1, feeling: "forest / scale" }
        ]}
      ]
    }
  ],

  journeys: [
    {
      id: "aix-2026", date: "2026-07-20", country: "FRA", region: "Provence-Alpes-Côte d’Azur", city: "Aix-en-Provence",
      title: "A small summer bubble", kicker: "AIX-EN-PROVENCE / JUL 2026",
      excerpt: "A few days that felt strangely suspended from ordinary time.",
      left: "La luce calda sulle facciate, conversazioni lunghissime, la sensazione di vivere un tempo parallelo.",
      learned: "Che l’intensità non deve necessariamente promettere durata per essere reale.",
      details: ["warm stone", "late dinners", "almost no sleep"],
      photos: []
    },
    {
      id: "ams-2026", date: "2026-06-02", country: "NLD", region: "Noord-Holland", city: "Amsterdam",
      title: "Learning a city by repetition", kicker: "AMSTERDAM / 2026",
      excerpt: "Some places are discovered. Others slowly become infrastructure for a life.",
      left: "Percorsi in bici imparati senza pensarci, il vento come variabile quotidiana, l’acqua sempre ai bordi.",
      learned: "Che sentirsi a casa può essere una costruzione molto concreta.",
      details: ["bikes", "water", "daily rituals"],
      photos: []
    },
    {
      id: "bcn-2024", date: "2024-09-18", country: "ESP", region: "Catalunya", city: "Barcelona",
      title: "A language that stayed", kicker: "BARCELONA / 2024",
      excerpt: "A place can remain in the body through the language you learned there.",
      left: "Lo spagnolo che torna senza essere chiamato, la luce serale, la facilità di stare fuori.",
      learned: "Che vivere altrove cambia il modo in cui si sente una città anche anni dopo.",
      details: ["Spanish", "late light", "sea"],
      photos: []
    },
    {
      id: "sabah-2023", date: "2023-02-04", country: "MYS", region: "Sabah", city: "Kinabatangan",
      title: "Inside the green", kicker: "SABAH / FEB 2023",
      excerpt: "The forest changed the scale of everything around it.",
      left: "Il rumore continuo, l’umidità, la sensazione che il paesaggio fosse un organismo e non uno sfondo.",
      learned: "Quanto rapidamente la scala umana diventa piccola quando l’ambiente prende davvero spazio.",
      details: ["forest", "humidity", "biodiversity"],
      photos: []
    },
    {
      id: "berlin-2025", date: "2025-04-05", country: "DEU", region: "Berlin", city: "Berlin",
      title: "Cities have layers", kicker: "BERLIN / APR 2025",
      excerpt: "A city that refuses to resolve into one personality.",
      left: "Quartieri che sembrano città diverse, spazi vasti, libertà e disordine nello stesso fotogramma.",
      learned: "Che alcuni posti funzionano proprio perché non cercano coerenza.",
      details: ["layers", "night", "space"],
      photos: []
    }
  ]
};
