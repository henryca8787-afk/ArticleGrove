# ArticleGrove

A responsive editorial website built with Next.js App Router and designed to read published articles from Sanity CMS. The public website has no admin or publishing route.

## Stack

- Next.js 14 / React 18
- Sanity Content Lake for articles, categories and images
- Sanity Studio in a separate `studio/` project
- SEO metadata, canonical URLs, Open Graph, Twitter cards, JSON-LD, `robots.txt` and dynamic sitemap
- Responsive editorial UI

## 1. Run the website locally

Requirements: Node.js 20.9+ (Node.js 22 LTS is recommended).

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The site uses clearly marked sample content until Sanity environment variables are configured. The sample content is for layout/testing only; replace it with original, fact-checked articles before launch.

## 2. Connect your Sanity project

If you already created the ArticleGrove project in Sanity during setup, use its project ID. If not, sign in at https://www.sanity.io/manage and create a project named `ArticleGrove CMS` with a `production` dataset.

Create `.env.local` in the website root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

Create `studio/.env` with:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

The Studio application and article/category schemas are already included in this repository. From the `studio` directory, install and run it:

```bash
cd studio
npm install
npm run dev
```

Open http://localhost:3333. Studio is a separate app and is not linked from the public ArticleGrove navigation.

## 3. Deploy Sanity Studio separately

From the `studio` directory:

```bash
npx sanity deploy
```

Choose a unique Studio hostname when prompted. Studio access is controlled by your Sanity account membership. Do not create a public publishing account.

## 4. Connect the website

Set the public Sanity project ID, dataset and API version in your deployment provider's environment variables. These values are read-only project identifiers, not secrets.

The website uses Sanity's published perspective. Drafts are not queried. Do not add a Sanity write token or privileged token to any `NEXT_PUBLIC_*` variable or browser bundle.

## 5. Publish content

Create categories first, then create articles in Sanity Studio. Add a title, slug, excerpt, cover image, category, author, body, SEO title and SEO description. Save drafts while editing; publish only after editorial review.

## SEO launch checklist

- Set `NEXT_PUBLIC_SITE_URL` to the final canonical domain (HTTPS).
- Replace the placeholder contact email and review legal pages.
- Use descriptive, unique titles and meta descriptions for every article.
- Write for reader intent; do not stuff repeated keywords.
- Use original, accurate, useful articles with clear authorship and sources where relevant.
- Add descriptive image alt text and compress large images.
- Verify canonical URLs, sitemap, robots rules and social previews.
- Connect Google Search Console and submit `/sitemap.xml`.
- Add consent and privacy disclosures appropriate to your audience before analytics or advertising.
- Do not assume SEO setup guarantees rankings or AdSense approval.

## Important security notes

- No public admin route is included.
- Public pages query published content only.
- No secret tokens are included in the frontend.
- Protect your GitHub and Sanity accounts with strong unique passwords and two-factor authentication.
- Review Sanity dataset permissions before production launch.
- Keep dependencies updated and run `npm audit` periodically.

## Before production

This repository is a starter implementation. Test all routes, links, mobile layouts, accessibility, metadata, Sanity schemas and deployment configuration before launch. Privacy and terms pages are starter text and are not legal advice.
