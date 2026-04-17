# GoodMood — Wellness Platform

## Stack
- **Next.js 14** App Router, TypeScript
- **Supabase** Auth + PostgreSQL
- **Tailwind CSS** custom design system
- **Recharts** for progress charts
- **Vercel** deployment target

## Design system
- Navy `#0D1B2A`, Coral `#E8724A`, Sage `#8BAF8B`, Cream `#F8F8F8`
- Font: DM Sans (Google Fonts)
- `rounded-card` = 16px, `shadow-card` custom

## Project structure
```
src/
  app/
    (app)/          # Protected routes (Navbar layout)
      dashboard/
      sport/
      nutrition/
      progress/
      wellness/
      messages/
    auth/           # Login/signup
    onboarding/     # 6-step questionnaire
    blog/           # Public blog
    admin/          # Admin panel
  components/
    layout/Navbar.tsx
    ui/Button, Card, Input, Badge
  lib/
    supabase/client.ts, server.ts, middleware.ts
    utils.ts        # BMR/TDEE/macro calculators
    workout-generator.ts
    nutrition-generator.ts
  types/database.ts
```

## Setup
1. Create Supabase project
2. Run `supabase/schema.sql` in SQL Editor
3. Fill `.env.local` with Supabase URL + keys
4. `npm run dev`

## Deploy
- Push to GitHub, connect to Vercel
- Add env vars in Vercel dashboard
