# OFFLIMITS TRUCKING SERVICES — React Website

A premium, monochrome, responsive single-page corporate website built with React, TypeScript, Vite, Framer Motion, and Lucide icons.

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```
The production output is written to `dist/`.

## Before publishing
1. Replace the stock hero and fleet images with actual photographs of the OFFLIMITS 2027 Toyota Tamaraw FX. Current images are illustrative stock imagery, not company-owned vehicle or operation photos.
2. Add verified business contact details (email, phone, Facebook/social links) in `src/App.tsx`.
3. Connect the quotation form in `src/App.tsx` to a backend, CRM, or form provider. The current form validates and displays a local demo confirmation only; it does not send or store submissions.
4. Verify the exact vehicle model year/specification and all permit/authorization details against current documents.
5. Confirm the inland marine policy's covered cargo, limits, routes, exclusions, and conditions before making specific coverage promises.
6. Confirm the scope and validity of the LTFRB Provisional Authority and business permit before publication.
7. Review the final copy with the business owner and confirm any operational service-area limitations.

## Notes
- No phone number, email address, social media URL, or domain has been invented.
- Fleet expansion is described as a future plan; only the first Tamaraw FX is represented as currently available.
- GPS is described as an internal monitoring capability, not client-facing live tracking.
- External images and Google Fonts require an internet connection. Replace them with optimized local assets for a production deployment.
- SEO title, description, Open Graph basics, semantic page sections, keyboard-accessible navigation controls, and reduced-motion support are included.

## Suggested form integration
The `handleSubmit` function in `src/App.tsx` is the integration point. Replace its local `setSubmitted(true)` behavior with a `fetch()` call to your own secure API or approved form provider. Never put private API keys in frontend source code.
