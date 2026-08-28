/*
 * ELENA'S ATLAS — TRAVEL DATA
 * ============================
 *
 * Structure:
 * Country → Region → City
 *
 * Regions can also be marked as visited without specifying a city.
 * Visit counts are conservative unless explicitly provided.
 */

window.TRAVEL_DATA = {
  profile: {
    name: "Elena",
    siteTitle: "Elena's Atlas",
    headline: "A more curious kind of map.",
    intro:
      "Countries, regions, cities and the stories that make them unforgettable.",
    base: "Amsterdam, Netherlands",
    updated: "August 2026"
  },

  countries: [
    // ============================================================
    // ITALY
    // ============================================================
    {
      iso2: "IT",
      iso3: "ITA",
      name: "Italy",
      continent: "Europe",
      coordinates: {
        lat: 42.8333,
        lon: 12.8333
      },

      regions: [
        {
          name: "Piedmont",
          coordinates: {
            lat: 45.05,
            lon: 7.6667
          },

          cities: [
            {
              name: "Turin",
              coordinates: {
                lat: 45.0703,
                lon: 7.6869
              },
              visits: 26,
              note: "More than 25 visits."
            },

            {
              name: "Condove",
              coordinates: {
                lat: 45.1167,
                lon: 7.3
              },
              visits: 1
            }
          ]
        },

        {
          name: "Liguria",
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
              visits: 1
            },

            {
              name: "Genoa",
              coordinates: {
                lat: 44.4056,
                lon: 8.9463
              },
              visits: 1
            }
          ]
        },

        {
          name: "Lazio",
          coordinates: {
            lat: 41.9,
            lon: 12.7167
          },

          cities: [
            {
              name: "Rome",
              coordinates: {
                lat: 41.9028,
                lon: 12.4964
              },
              visits: 1
            }
          ]
        },

        {
          name: "Lombardy",
          coordinates: {
            lat: 45.4667,
            lon: 9.2
          },

          cities: [
            {
              name: "Milan",
              coordinates: {
                lat: 45.4642,
                lon: 9.19
              },
              visits: 1
            }
          ]
        },

        {
          name: "Veneto",
          coordinates: {
            lat: 45.7333,
            lon: 11.85
          },

          cities: [
            {
              name: "Venice",
              coordinates: {
                lat: 45.4408,
                lon: 12.3155
              },
              visits: 1
            }
          ]
        },

        {
          name: "Umbria",
          coordinates: {
            lat: 42.9833,
            lon: 12.5667
          },

          visited: true,
          visits: 1,
          cities: []
        },

        {
          name: "Tuscany",
          coordinates: {
            lat: 43.4167,
            lon: 11.0
          },

          visited: true,
          visits: 1,
          cities: []
        }
      ]
    },

    // ============================================================
    // FRANCE
    // ============================================================
    {
      iso2: "FR",
      iso3: "FRA",
      name: "France",
      continent: "Europe",
      coordinates: {
        lat: 46.2276,
        lon: 2.2137
      },

      regions: [
        {
          name: "Provence-Alpes-Côte d'Azur",
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
              visits: 1
            }
          ]
        },

        {
          name: "Auvergne-Rhône-Alpes",
          coordinates: {
            lat: 45.4471,
            lon: 4.3853
          },

          cities: [
            {
              name: "Lyon",
              coordinates: {
                lat: 45.764,
                lon: 4.8357
              },
              visits: 1
            }
          ]
        }
      ]
    },

    // ============================================================
    // NETHERLANDS
    // ============================================================
    {
      iso2: "NL",
      iso3: "NLD",
      name: "Netherlands",
      continent: "Europe",
      coordinates: {
        lat: 52.1326,
        lon: 5.2913
      },

      regions: [
        {
          name: "North Holland",
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
              visits: 1
            }
          ]
        },

        {
          name: "Utrecht",
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
              visits: 2
            }
          ]
        }
      ]
    },

    // ============================================================
    // GERMANY
    // ============================================================
    {
      iso2: "DE",
      iso3: "DEU",
      name: "Germany",
      continent: "Europe",
      coordinates: {
        lat: 51.1657,
        lon: 10.4515
      },

      regions: [
        {
          name: "North Rhine-Westphalia",
          coordinates: {
            lat: 51.4332,
            lon: 7.6616
          },

          cities: [
            {
              name: "Cologne",
              coordinates: {
                lat: 50.9375,
                lon: 6.9603
              },
              visits: 1
            }
          ]
        }
      ]
    },

    // ============================================================
    // ARGENTINA
    // ============================================================
    {
      iso2: "AR",
      iso3: "ARG",
      name: "Argentina",
      continent: "South America",
      coordinates: {
        lat: -38.4161,
        lon: -63.6167
      },

      regions: [
        {
          name: "Ciudad Autónoma de Buenos Aires",
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
              visits: 1
            }
          ]
        }
      ]
    }
  ],

  /*
   * JOURNEYS
   * --------
   * We'll populate these later with dates, photos and memories.
   *
   * Example:
   *
   * {
   *   id: "aix-2026",
   *   title: "Aix-en-Provence",
   *   date: "2026-08",
   *   country: "France",
   *   region: "Provence-Alpes-Côte d'Azur",
   *   city: "Aix-en-Provence",
   *   excerpt: "A short description of the journey.",
   *   left: "What stayed with me.",
   *   learned: "What this place taught me.",
   *   details: ["summer", "people", "mountains"],
   *   photos: [
   *     "./assets/photos/aix-01.jpg",
   *     "./assets/photos/aix-02.jpg"
   *   ]
   * }
   */

  journeys: []
};
