# Elena's Atlas — v2

A static personal travel atlas for GitHub Pages. No backend is required.

## What changed in v2

- Stronger editorial / contemporary art-direction inspired by modern high-contrast portfolio sites.
- Geographic hierarchy: **country → region → city**.
- Map layers for countries, regions, and cities.
- Aggregate statistics generated automatically from the data.
- Interactive visualisations:
  - travel rhythm by year;
  - continent distribution;
  - travel fingerprint radar;
  - city constellation.
- Travel-journal stories with personal reflection fields and optional photo galleries.
- Searchable geographic archive.
- Responsive light/dark interface.

## Edit the content

All data is in:

`data/travel-data.js`

The example data are explicitly marked as demo data. Set `profile.demo` to `false` when you replace them.

### Add a region and city

```js
{
  iso3: "JPN",
  iso2: "JP",
  name: "Japan",
  continent: "Asia",
  visits: 2,
  regions: [
    {
      name: "Kansai",
      coordinates: { lat: 34.8, lon: 135.5 },
      cities: [
        {
          name: "Kyoto",
          coordinates: { lat: 35.01, lon: 135.77 },
          visits: 1,
          feeling: "stillness / temples / rain"
        }
      ]
    }
  ]
}
```

### Add a travel story

```js
{
  id: "kyoto-2026",
  date: "2026-04-18",
  country: "JPN",
  region: "Kansai",
  city: "Kyoto",
  title: "Rain on stone",
  kicker: "KYOTO / APR 2026",
  excerpt: "Short preview text.",
  left: "What stayed with me...",
  learned: "What the place taught me...",
  details: ["rain", "temples", "quiet"],
  photos: [
    "./assets/photos/kyoto-01.jpg",
    "./assets/photos/kyoto-02.jpg"
  ]
}
```

Put images in `assets/photos/`.

## Publish on GitHub Pages

Upload the contents of this folder to the repository root and enable GitHub Pages from the `main` branch / root folder.
