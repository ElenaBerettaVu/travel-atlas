/**
 * ELENA'S ATLAS — TRAVEL DATA
 *
 * Structure:
 * Country → Region → City
 *
 * `visits` is the numeric value used internally for charts,
 * rankings and calculations.
 *
 * `visitsDisplay` is the label shown to the user when the
 * exact number is not known.
 */

window.TRAVEL_ATLAS_DATA = {

  // ============================================================
  // PROFILE
  // ============================================================

  profile: {
    name: "Elena",
    siteTitle: "Elena's Atlas",

    eyebrow: "PERSONAL GEOGRAPHY / 2026",

    headline: "Places become part of us.",

    intro:
      "Una geografia personale fatta di paesi, regioni, città, ritorni e cose che restano.",

    closing: "A map is never only a map.",

    base: "Amsterdam, NL",

    worldCountryCount: 195,

    // Used later for the dedicated Italy/origin-country visualisation.
    originCountryIso: "ITA",

    demo: false,

    updated: "Updated August 2026"
  },


  // ============================================================
  // COUNTRIES
  // ============================================================

  countries: [

    // ==========================================================
    // ITALIA — ORIGIN COUNTRY
    // ==========================================================

    {
      iso3: "ITA",
      iso2: "IT",

      name: "Italia",
      continent: "Europe",

      // Lower bound used internally.
      visits: 25,

      // What the visitor sees.
      visitsDisplay: "25+",

      status: "visited",

      originCountry: true,
      originSince: 2007,

      coordinates: {
        lat: 42.8333,
        lon: 12.8333
      },

      essence:
        "Paese di origine: non soltanto una destinazione, ma il punto di partenza della mappa.",

      regions: [

        // ------------------------------------------------------
        // PIEMONTE
        // ------------------------------------------------------

        {
          name: "Piemonte",

          visits: 25,
          visitsDisplay: "25+",

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

              visits: 25,
              visitsDisplay: "25+",

              originCity: true,

              firstRecordedYear: 2007,
              lastRecordedYear: 2026,

              feeling: ""
            },

            {
              name: "Condove",

              coordinates: {
                lat: 45.1185,
                lon: 7.3074
              },

              visits: 1,

              firstVisitYear: 2014,

              feeling: ""
            }
          ]
        },


        // ------------------------------------------------------
        // LIGURIA
        // ------------------------------------------------------

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

              firstVisitYear: 2012,

              feeling: ""
            },

            {
              name: "Genova",

              coordinates: {
                lat: 44.4056,
                lon: 8.9463
              },

              visits: 1,

              firstVisitYear: 2024,

              feeling: ""
            }
          ]
        },


        // ------------------------------------------------------
        // LAZIO
        // ------------------------------------------------------

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

              firstVisitYear: 2021,

              feeling: ""
            }
          ]
        },


        // ------------------------------------------------------
        // VENETO
        // ------------------------------------------------------

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

              firstVisitYear: 2017,

              feeling: ""
            }
          ]
        },


        // ------------------------------------------------------
        // LOMBARDIA
        // ------------------------------------------------------

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

              firstVisitYear: 2018,

              feeling: ""
            }
          ]
        },


        // ------------------------------------------------------
        // UMBRIA
        // City inferred using regional capital.
        // ------------------------------------------------------

        {
          name: "Umbria",

          visits: 1,

          coordinates: {
            lat: 42.9833,
            lon: 12.5667
          },

          cities: [

            {
              name: "Perugia",

              coordinates: {
                lat: 43.1107,
                lon: 12.3908
              },

              visits: 1,

              firstVisitYear: 2026,

              inferredCapital: true,

              feeling: ""
            }
          ]
        },


        // ------------------------------------------------------
        // TOSCANA
        // City inferred using regional capital.
        // ------------------------------------------------------

        {
          name: "Toscana",

          visits: 1,

          coordinates: {
            lat: 43.4167,
            lon: 11.0
          },

          cities: [

            {
              name: "Firenze",

              coordinates: {
                lat: 43.7696,
                lon: 11.2558
              },

              visits: 1,

              firstVisitYear: 2026,

              inferredCapital: true,

              feeling: ""
            }
          ]
        },


        // ------------------------------------------------------
        // PUGLIA
        // City inferred using regional capital.
        // ------------------------------------------------------

        {
          name: "Puglia",

          visits: 1,

          coordinates: {
            lat: 41.1256,
            lon: 16.8667
          },

          cities: [

            {
              name: "Bari",

              coordinates: {
                lat: 41.1171,
                lon: 16.8719
              },

              visits: 1,

              firstVisitYear: 2014,

              inferredCapital: true,

              feeling: ""
            }
          ]
        },


        // ------------------------------------------------------
        // ABRUZZO
        // City inferred using regional capital.
        // ------------------------------------------------------

        {
          name: "Abruzzo",

          visits: 1,

          coordinates: {
            lat: 42.3512,
            lon: 13.3984
          },

          cities: [

            {
              name: "L'Aquila",

              coordinates: {
                lat: 42.3498,
                lon: 13.3995
              },

              visits: 1,

              firstVisitYear: 2019,

              inferredCapital: true,

              feeling: ""
            }
          ]
        }
      ]
    },


    // ==========================================================
    // REGNO UNITO
    // ==========================================================

    {
      iso3: "GBR",
      iso2: "GB",

      name: "Regno Unito",
      continent: "Europe",

      visits: 1,

      status: "visited",

      coordinates: {
        lat: 55.3781,
        lon: -3.436
      },

      essence:
        "Ricordi e impressioni da aggiungere.",

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

              firstVisitYear: 2026,

              feeling: ""
            }
          ]
        }
      ]
    },


    // ==========================================================
    // FRANCIA
    // ==========================================================

    {
      iso3: "FRA",
      iso2: "FR",

      name: "Francia",
      continent: "Europe",

      visits: 1,

      status: "visited",

      coordinates: {
        lat: 46.2276,
        lon: 2.2137
      },

      essence:
        "Ricordi e impressioni da aggiungere.",

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

              firstVisitYear: 2026,

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

              firstVisitYear: 2026,

              feeling: ""
            }
          ]
        }
      ]
    },


    // ==========================================================
    // PAESI BASSI
    // ==========================================================

    {
      iso3: "NLD",
      iso2: "NL",

      name: "Paesi Bassi",
      continent: "Europe",

      visits: 2,

      status: "visited",

      coordinates: {
        lat: 52.1326,
        lon: 5.2913
      },

      essence:
        "Ricordi e impressioni da aggiungere.",

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

              firstVisitYear: 2021,

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

              firstVisitYear: 2021,

              feeling: ""
            }
          ]
        }
      ]
    },


    // ==========================================================
    // GERMANIA
    // ==========================================================

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

      essence:
        "Ricordi e impressioni da aggiungere.",

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

              firstVisitYear: 2025,

              feeling: ""
            }
          ]
        }
      ]
    },


    // ==========================================================
    // ARGENTINA
    // ==========================================================

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

      essence:
        "Ricordi e impressioni da aggiungere.",

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

              firstVisitYear: 2017,

              feeling: ""
            }
          ]
        }
      ]
    }
  ],


  // ============================================================
  // JOURNEYS / TRAVEL RHYTHM
  //
  // These entries provide the temporal information used by
  // Travel Rhythm.
  //
  // `country` uses ISO3 because app.js matches journey.country
  // with country.iso3.
  // ============================================================

  journeys: [

    // ----------------------------------------------------------
    // 2007
    // ----------------------------------------------------------

    {
      id: "torino-2007-2026",

      title: "Torino",

      date: "2007",
      dateEnd: "2026",

      country: "ITA",
      region: "Piemonte",
      city: "Torino",

      kicker: "2007–2026 · ORIGIN",

      excerpt:
        "Città di origine, con una presenza e ritorni continui dal 2007 al 2026.",

      left: "",
      learned: "",

      details: [
        "origin",
        "25+ visits",
        "2007–2026"
      ],

      photos: []
    },


    // ----------------------------------------------------------
    // 2012
    // ----------------------------------------------------------

    {
      id: "cairo-montenotte-2012",

      title: "Cairo Montenotte",

      date: "2012",

      country: "ITA",
      region: "Liguria",
      city: "Cairo Montenotte",

      kicker: "2012 · ITALIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },


    // ----------------------------------------------------------
    // 2014
    // ----------------------------------------------------------

    {
      id: "condove-2014",

      title: "Condove",

      date: "2014",

      country: "ITA",
      region: "Piemonte",
      city: "Condove",

      kicker: "2014 · ITALIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },

    {
      id: "puglia-2014",

      title: "Puglia",

      date: "2014",

      country: "ITA",
      region: "Puglia",
      city: "Bari",

      inferredCapital: true,

      kicker: "2014 · ITALIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },


    // ----------------------------------------------------------
    // 2017
    // ----------------------------------------------------------

    {
      id: "venezia-2017",

      title: "Venezia",

      date: "2017",

      country: "ITA",
      region: "Veneto",
      city: "Venezia",

      kicker: "2017 · ITALIA",

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

      country: "ARG",
      region: "Ciudad Autónoma de Buenos Aires",
      city: "Buenos Aires",

      kicker: "2017 · ARGENTINA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },


    // ----------------------------------------------------------
    // 2018
    // ----------------------------------------------------------

    {
      id: "milano-2018",

      title: "Milano",

      date: "2018",

      country: "ITA",
      region: "Lombardia",
      city: "Milano",

      kicker: "2018 · ITALIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },


    // ----------------------------------------------------------
    // 2019
    // ----------------------------------------------------------

    {
      id: "abruzzo-2019",

      title: "Abruzzo",

      date: "2019",

      country: "ITA",
      region: "Abruzzo",
      city: "L'Aquila",

      inferredCapital: true,

      kicker: "2019 · ITALIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },


    // ----------------------------------------------------------
    // 2021
    // ----------------------------------------------------------

    {
      id: "roma-2021",

      title: "Roma",

      date: "2021",

      country: "ITA",
      region: "Lazio",
      city: "Roma",

      kicker: "2021 · ITALIA",

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

      country: "NLD",
      region: "Noord-Holland",
      city: "Amsterdam",

      kicker: "2021 · PAESI BASSI",

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

      country: "NLD",
      region: "Utrecht",
      city: "Utrecht",

      kicker: "2021 · PAESI BASSI",

      excerpt: "",

      left: "",
      learned: "",

      details: [
        "2 visits"
      ],

      photos: []
    },


    // ----------------------------------------------------------
    // 2024
    // ----------------------------------------------------------

    {
      id: "genova-2024",

      title: "Genova",

      date: "2024",

      country: "ITA",
      region: "Liguria",
      city: "Genova",

      kicker: "2024 · ITALIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },


    // ----------------------------------------------------------
    // 2025
    // ----------------------------------------------------------

    {
      id: "colonia-2025",

      title: "Colonia",

      date: "2025",

      country: "DEU",
      region: "Nordrhein-Westfalen",
      city: "Colonia",

      kicker: "2025 · GERMANIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },


    // ----------------------------------------------------------
    // 2026
    // ----------------------------------------------------------

    {
      id: "aix-en-provence-2026",

      title: "Aix-en-Provence",

      date: "2026",

      country: "FRA",
      region: "Provence-Alpes-Côte d’Azur",
      city: "Aix-en-Provence",

      kicker: "2026 · FRANCIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },

    {
      id: "lione-2026",

      title: "Lione",

      date: "2026",

      country: "FRA",
      region: "Auvergne-Rhône-Alpes",
      city: "Lione",

      kicker: "2026 · FRANCIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },

    {
      id: "londra-2026",

      title: "Londra",

      date: "2026",

      country: "GBR",
      region: "England",
      city: "Londra",

      kicker: "2026 · REGNO UNITO",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },

    {
      id: "umbria-2026",

      title: "Umbria",

      date: "2026",

      country: "ITA",
      region: "Umbria",
      city: "Perugia",

      inferredCapital: true,

      kicker: "2026 · ITALIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    },

    {
      id: "toscana-2026",

      title: "Toscana",

      date: "2026",

      country: "ITA",
      region: "Toscana",
      city: "Firenze",

      inferredCapital: true,

      kicker: "2026 · ITALIA",

      excerpt: "",

      left: "",
      learned: "",

      details: [],

      photos: []
    }
  ]
};
