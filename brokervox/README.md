# BrokerVox

BrokerVox — AI voice desk for brokers. Answers the line, qualifies the lead, books the meeting. Real estate, mortgage, insurance, freight, M&A. Not a brokerage.

Website: https://brokervox.com · A DIBS desk product · Dallas

## What this is

The BrokerVox marketing site as a Vite + React 18 + TypeScript app. Navy `#0B1F3A` / gold `#C9A227`, Cormorant + DM Sans. Sticky nav, Joe desk card, five desk types, how it works, features, pricing, FAQ, CTA, footer.

- All copy lives in `src/data.ts`. Components render it and own no words.
- Mobile hamburger under 980px.
- Joe chips, "Talk to Joe", and "Build a desk" open the live RubyVox links.
- Starter is `$0`. Desk is "Talk to us". Floor is "Custom". No other prices are listed.
- `static/` is a no-build fallback (plain HTML + CSS) generated from the same components.
- `.github/workflows/pages.yml` builds `dist/` on push to `main` and publishes it to the `gh-pages` branch, which GitHub Pages serves.

## Run it

```bash
npm install
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview
```

`dist/` is a static site. Drop it on Vercel, Netlify, S3, or GitHub Pages.

Regenerate the no-build fallback after editing copy or styles:

```bash
npm run export:static
```

## Publish

1. **GitHub Pages.** Every push to `main` rebuilds and publishes to `gh-pages`. Live at https://dibs-financial.github.io/brokervox/. Settings → Pages should read "Deploy from a branch: gh-pages / (root)".
   To move brokervox.com here: point DNS at GitHub Pages, then delete the "Hold the custom domain" step in the workflow so `CNAME` ships with the build.
2. **No build.** Upload `static/index.html`, `static/styles.css`, `static/favicon.svg`, and `CNAME` to any static host.

Repo About line:

```
BrokerVox — AI voice desk for brokers. Answers the line, qualifies the lead, books the meeting. Real estate, mortgage, insurance, freight, M&A. Not a brokerage.
```

Topics: `voice-agent` `brokers` `real-estate` `freight` `mortgage` `dibs` `dallas`

## Links

- Live desk: [Talk to Joe](https://rubyvox.com/a/791cc6bc-1326-4345-a13a-c4e3d7069b39)
- Create a desk: [rubyvox.com/create](https://rubyvox.com/create)

## File tree

```
brokervox/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── CNAME                      # brokervox.com
├── .github/workflows/pages.yml
├── public/  CNAME, favicon.svg
├── scripts/export-static.mjs  # renders App to static/index.html
├── static/                    # no-build fallback
│   ├── index.html
│   ├── styles.css
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── data.ts
    ├── index.css
    └── components/
        Nav, Hero, DeskCard, Stats, Desks, How, Features,
        Pricing, Faq, Cta, Footer, Mark
```

BrokerVox is a voice layer. It is not a broker-dealer, RIA, lender, carrier, or insurer.
