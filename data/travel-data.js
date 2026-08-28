/**
 * ELENA'S ATLAS — TRAVEL DATA
 *
 * Gerarchia:
 * Country → Region → City
 *
 * I dati narrativi (feeling, essence, journeys, photos)
 * verranno aggiunti successivamente.
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
    demo: false,
    updated: "Updated August 2026"
  },

  countries: [

    // ============================================================
    // ITALIA
    // ============================================================

    {
      iso3: "ITA",
      iso2: "IT",
      name: "Italia",
      continent: "Europe",

      // 26 = minimo noto, dato che Torino è stata visitata più di 25 volte.
      // Non sommo le città per evitare di contare due volte lo stesso viaggio.
      visits: 26,

      status: "visited",

      coordinates: {
        lat: 42.8333,
        lon: 12.8333
      },

      essence: "Ricordi e impressioni da aggiungere.",

      regions: [

        // --------------------------------------------------------
        // PIEMONTE
        // --------------------------------------------------------

        {
          name: "Piemonte",
          visits: 26,

          coordinates: {
            lat: 45.0522,
            lon: 7.5154
          },

          cities: [

            {
              name: "Torino",

              coordinates: {
                lat: 45.0703,
                lon: 7.6869
              },

              visits: 26,
              visitsDisplay: "25+"

              feeling: ""
            },

            {
              name: "Condove",

              coordinates: {
                lat: 45.1185,
                lon: 7.3074
              },

              visits: 1,

              feeling: ""
            }

          ]
        },

        // --------------------------------------------------------
        // LIGURIA
        // --------------------------------------------------------

        {
          name: "Liguria",
          visits: 1,

          coordinates: {
            lat: 44.3167,
            lon: 8.4333
          },

          cities: [

            {
              name: "Cairo Montenotte",

              coordinates: {
                lat: 44.3975,
                lon: 8.2775
              },

              visits: 1,

              feeling: ""
            },

            {
              name: "Genova",

              coordinates: {
                lat: 44.4056,
                lon: 8.9463
              },

              visits: 1,

              feeling: ""
            }

          ]
        },

        // --------------------------------------------------------
        // LAZIO
        // --------------------------------------------------------

        {
          name: "Lazio",
          visits: 1,

          coordinates: {
            lat: 41.9,
            lon: 12.7167
          },

          cities: [

            {
              name: "Roma",

              coordinates: {
                lat: 41.9028,
                lon: 12.4964
              },

              visits: 1,

              feeling: ""
            }

          ]
        },

        // --------------------------------------------------------
        // VENETO
        // --------------------------------------------------------

        {
          name: "Veneto",
          visits: 1,

          coordinates: {
            lat: 45.7333,
            lon: 11.85
          },

          cities: [

            {
              name: "Venezia",

              coordinates: {
                lat: 45.4408,
                lon: 12.3155
              },

              visits: 1,

              feeling: ""
            }

          ]
        },

        // --------------------------------------------------------
        // LOMBARDIA
        // --------------------------------------------------------

        {
          name: "Lombardia",
          visits: 1,

          coordinates: {
            lat: 45.4667,
            lon: 9.2
          },

          cities: [

            {
              name: "Milano",

              coordinates: {
                lat: 45.4642,
                lon: 9.19
              },

              visits: 1,

              feeling: ""
            }

          ]
        },

        // --------------------------------------------------------
        // UMBRIA
        // Regione visitata, città non ancora specificate.
        // --------------------------------------------------------

        {
          name: "Umbria",
          visits: 1,
          visited: true,

          coordinates: {
            lat: 42.9833,
            lon: 12.5667
          },

          cities: []
        },

        // --------------------------------------------------------
        // TOSCANA
        // Regione visitata, città non ancora specificate.
        // --------------------------------------------------------

        {
          name: "Toscana",
          visits: 1,
          visited: true,

          coordinates: {
            lat: 43.4167,
            lon: 11.0
          },

          cities: []
        }

      ]
    },
    
    // ============================================================
    // UK
    // ============================================================
    {
  iso3: "GBR",
  iso2: "GB",
  name: "Regno Unito",
  continent: "Europe",

  visits: 1,

  status: "visited",

  coordinates: {
    lat: 55.3781,
    lon: -3.4360
  },

  essence: "Ricordi e impressioni da aggiungere.",

  regions: [
    {
      name: "England",
      visits: 1,

      coordinates: {
        lat: 52.3555,
        lon: -1.1743
      },

      cities: [
        {
          name: "Londra",

          coordinates: {
            lat: 51.5074,
            lon: -0.1278
          },

          visits: 1,

          feeling: ""
        }
      ]
    }
  ]
},

    // ============================================================
    // FRANCIA
    // ============================================================

    {
      iso3: "FRA",
      iso2: "FR",
      name: "Francia",
      continent: "Europe",

      // Numero minimo certo di visite.
      visits: 1,

      status: "visited",

      coordinates: {
        lat: 46.2276,
        lon: 2.2137
      },

      essence: "Ricordi e impressioni da aggiungere.",

      regions: [

        {
          name: "Provence-Alpes-Côte d’Azur",
          visits: 1,

          coordinates: {
            lat: 43.9352,
            lon: 6.0679
          },

          cities: [

            {
              name: "Aix-en-Provence",

              coordinates: {
                lat: 43.5297,
                lon: 5.4474
              },

              visits: 1,

              feeling: ""
            }

          ]
        },

        {
          name: "Auvergne-Rhône-Alpes",
          visits: 1,

          coordinates: {
            lat: 45.4471,
            lon: 4.3853
          },

          cities: [

            {
              name: "Lione",

              coordinates: {
                lat: 45.764,
                lon: 4.8357
              },

              visits: 1,

              feeling: ""
            }

          ]
        }

      ]
    },

    // ============================================================
    // PAESI BASSI
    // ============================================================

    {
      iso3: "NLD",
      iso2: "NL",
      name: "Paesi Bassi",
      continent: "Europe",

      // Utrecht è stata visitata almeno due volte.
      visits: 2,

      status: "visited",

      coordinates: {
        lat: 52.1326,
        lon: 5.2913
      },

      essence: "Ricordi e impressioni da aggiungere.",

      regions: [

        {
          name: "Noord-Holland",
          visits: 1,

          coordinates: {
            lat: 52.5206,
            lon: 4.7885
          },

          cities: [

            {
              name: "Amsterdam",

              coordinates: {
                lat: 52.3676,
                lon: 4.9041
              },

              visits: 1,

              feeling: ""
            }

          ]
        },

        {
          name: "Utrecht",
          visits: 2,

          coordinates: {
            lat: 52.0907,
            lon: 5.1214
          },

          cities: [

            {
              name: "Utrecht",

              coordinates: {
                lat: 52.0907,
                lon: 5.1214
              },

              visits: 2,

              feeling: ""
            }

          ]
        }

      ]
    },

    // ============================================================
    // GERMANIA
    // ============================================================

    {
      iso3: "DEU",
      iso2: "DE",
      name: "Germania",
      continent: "Europe",

      visits: 1,

      status: "visited",

      coordinates: {
        lat: 51.1657,
        lon: 10.4515
      },

      essence: "Ricordi e impressioni da aggiungere.",

      regions: [

        {
          name: "Nordrhein-Westfalen",
          visits: 1,

          coordinates: {
            lat: 51.4332,
            lon: 7.6616
          },

          cities: [

            {
              name: "Colonia",

              coordinates: {
                lat: 50.9375,
                lon: 6.9603
              },

              visits: 1,

              feeling: ""
            }

          ]
        }

      ]
    },

    // ============================================================
    // ARGENTINA
    // ============================================================

    {
      iso3: "ARG",
      iso2: "AR",
      name: "Argentina",
      continent: "South America",

      visits: 1,

      status: "visited",

      coordinates: {
        lat: -38.4161,
        lon: -63.6167
      },

      essence: "Ricordi e impressioni da aggiungere.",

      regions: [

        {
          name: "Ciudad Autónoma de Buenos Aires",
          visits: 1,

          coordinates: {
            lat: -34.6037,
            lon: -58.3816
          },

          cities: [

            {
              name: "Buenos Aires",

              coordinates: {
                lat: -34.6037,
                lon: -58.3816
              },

              visits: 1,

              feeling: ""
            }

          ]
        }

      ]
    }

  ],

  // ============================================================
  // JOURNEYS
  // ============================================================
  //
  // Per ora rimane vuoto.
  //
  // Più avanti potremo aggiungere per ciascun viaggio:
  // - data
  // - luogo
  // - fotografie
  // - cosa mi è rimasto
  // - cosa mi ha lasciato
  // - ricordi
  // - persone
  // - impressioni
  //
  // ============================================================

  journeys: [
  {
    id: "torino-2007",
    title: "Torino",
    date: "2007",
    country: "Italia",
    region: "Piemonte",
    city: "Torino",
    excerpt: "Città di origine, presenza continua dal 2007 al 2026.",
    left: "Origine, ritorno, continuità.",
    learned: "",
    details: ["origin", "returns through 2026"],
    photos: []
  },

  {
    id: "cairo-montenotte-2012",
    title: "Cairo Montenotte",
    date: "2012",
    country: "Italia",
    region: "Liguria",
    city: "Cairo Montenotte",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "bari-2014",
    title: "Bari",
    date: "2014",
    country: "Italia",
    region: "Puglia",
    city: "Bari",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "buenos-aires-2017",
    title: "Buenos Aires",
    date: "2017",
    country: "Argentina",
    region: "Ciudad Autónoma de Buenos Aires",
    city: "Buenos Aires",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "milano-2018",
    title: "Milano",
    date: "2018",
    country: "Italia",
    region: "Lombardia",
    city: "Milano",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "laquila-2019",
    title: "L'Aquila",
    date: "2019",
    country: "Italia",
    region: "Abruzzo",
    city: "L'Aquila",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "amsterdam-2021",
    title: "Amsterdam",
    date: "2021",
    country: "Paesi Bassi",
    region: "Noord-Holland",
    city: "Amsterdam",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "utrecht-2021",
    title: "Utrecht",
    date: "2021",
    country: "Paesi Bassi",
    region: "Utrecht",
    city: "Utrecht",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "genova-2024",
    title: "Genova",
    date: "2024",
    country: "Italia",
    region: "Liguria",
    city: "Genova",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "colonia-2025",
    title: "Colonia",
    date: "2025",
    country: "Germania",
    region: "Nordrhein-Westfalen",
    city: "Colonia",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "aix-2026",
    title: "Aix-en-Provence",
    date: "2026",
    country: "Francia",
    region: "Provence-Alpes-Côte d'Azur",
    city: "Aix-en-Provence",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "lyon-2026",
    title: "Lione",
    date: "2026",
    country: "Francia",
    region: "Auvergne-Rhône-Alpes",
    city: "Lione",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "london-2026",
    title: "Londra",
    date: "2026",
    country: "Regno Unito",
    region: "England",
    city: "Londra",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "perugia-2026",
    title: "Perugia",
    date: "2026",
    country: "Italia",
    region: "Umbria",
    city: "Perugia",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  },

  {
    id: "firenze-2026",
    title: "Firenze",
    date: "2026",
    country: "Italia",
    region: "Toscana",
    city: "Firenze",
    excerpt: "",
    left: "",
    learned: "",
    details: [],
    photos: []
  }
]

};
