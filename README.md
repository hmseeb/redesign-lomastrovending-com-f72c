# Lo Mastro Vending & Service — Website

A complete, from-scratch redesign of lomastrovending.com. Built with vanilla
HTML, CSS and JavaScript — no build step, no dependencies, no environment
variables.

## Business

**Lo Mastro Vending & Service** — headquartered in Glenside, PA (Montgomery
County). The single source for apartment laundry facility needs, equipment
service, and residential, commercial and marine dryer vent cleaning.

- Phone: [267-982-8044](tel:+12679828044)
- Service areas: Philadelphia, PA and surrounding counties (Montgomery, Bucks);
  Treasure Island, FL, St. Petersburg and surrounding areas along the coast
- Licensed & Insured

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — full single-page site with semantic sections |
| `styles.css` | Design system, layout, responsive rules, animations |
| `script.js` | Mobile nav, sticky header, scroll reveal, back-to-top |
| `favicon.svg` | Site icon |

## Sections

Hero · Service strip · Services (6) · Why Lo Mastro · Service Areas ·
Call-to-action band · Contact · Footer

## Running locally

It is a static site — open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Notes

- Responsive from 320px up; mobile drawer navigation below 860px.
- Accessibility: skip link, semantic landmarks, visible focus rings,
  descriptive alt text, `prefers-reduced-motion` support.
- SEO: meta description, Open Graph / Twitter cards, canonical URL and
  `LocalBusiness` JSON-LD structured data.
- The original logo and the authentic Philadelphia / St. Petersburg service-area
  photographs are retained from the source site; generic stock imagery was
  replaced with contextually relevant photography.

---

Web Design credit retained: [Biondo Creative](https://www.biondocreative.com)
