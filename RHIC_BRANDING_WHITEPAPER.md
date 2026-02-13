# RHIC Platform Branding Pivot: Forest Green Identity

## Executive Summary
This document outlines the strategic transition of the RHIC (Renewed Hope Innovation Centre) platform from its legacy Navy/Gold aesthetic to a modernized Forest Green, Leaf Green, and Accent Red identity. This pivot aligns the platform with national values of growth, renewal, and vibrant innovation while maintaining its "Political Prestige" and professional standard.

## Brand Identity & Philosophy
The new palette is designed to evoke a sense of professional authority and national progress:
- **Forest Green (#003300)**: Represents stability, maturity, and deep-rooted national legacy. Used for core backgrounds and primary text.
- **Leaf Green (#00CC00)**: Symbolizes growth, innovation, and the energy of Nigeria's youth. Used for primary accents, focus states, and dynamic elements.
- **Accent Red (#FF3333)**: Denotes urgency, passion, and critical calls to action. Used sparingly for high-impact buttons and status indicators.

## Technical Implementation
The branding pivot was executed using a system-wide approach to ensure deep integration and maintainability.

### 1. Design System Foundation
The core styles were redefined in `globals.css` using CSS variables:
```css
:root {
  --color-forest: #003300;
  --color-leaf: #00CC00;
  --color-accent-red: #FF3333;
  --color-ivory: #FDFDFD;
}
```
Three primary utility gradients were introduced:
- `forest-gradient`: For professional headers and dark-mode sections.
- `leaf-gradient`: For primary "world-class" buttons and highlights.
- `vibrant-gradient`: For high-priority mobilization buttons.

### 2. Component-Level Modernization
- **Navbar**: Re-engineered with forest-glass effects and leaf-green active states.
- **AI Assistant**: Updated with the green palette to feel like an integral part of the renewed ecosystem.
- **Glassmorphism**: Enhanced `forest-glass` utilities provide a premium, layered feel.

### 3. Page-Level Standardization
Every major entry point was individually standardized:
- **Dashboard**: "Situation Room" and campaign maps updated to green-centric visualization.
- **Innovation & Media**: Hero sections and interactive cards modernized with new gradients.
- **Missions & Pipeline**: Status indicators and mission tracking updated for visual clarity and brand consistency.
- **Chapter Command Panel**: Coordinator metrics and LGA tracking updated with the national identity palette.
- **Auth Flow**: The entry experience now immediately reflects the movement's new identity.

### 4. Dependency Stability & Infrastructure
- **React 19 & Next.js Upgrade**: The platform was modernized to support React 19 and the latest Next.js features, including Turbopack for faster iteration.
- **Icon System Resolution**: Resolved a critical Vercel build failure by upgrading `lucide-react` to align with peer dependencies for React 19.
- **Security & Performance**: Synchronized `package-lock.json` and addressed security vulnerabilities to ensure a world-class, production-ready environment.

- **Build Status**: Verified through `npm run build` using Next.js Turbopack to ensure zero regressions and high-speed compilation.
- **Branding Excellence**: Successfully integrated the official RHIC logo and President Tinubu's portrait into a "flashy" and world-class interface.
- **Consistency Audit**: Confirmed the removal of all legacy `navy` and `gold` color tokens across all major entry points.
- **UI/UX & Performance**: Animations (via `framer-motion`) and layouts were optimized for a premium feel, while addressing dependency conflicts and server routing issues for maximum production reliability.

---

## Backend Architecture & Data Layer

### 5. Supabase Integration
The platform uses **Supabase** (PostgreSQL + Auth + Realtime) as its backend-as-a-service:
- **Project**: `ehthkntdxnnulchhjblv.supabase.co`
- **Client Architecture**: Split into browser (`supabase.ts`) and server (`supabase-server.ts`) clients for SSR compatibility via `@supabase/ssr`.
- **Environment**: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured on both local (`.env.local`) and Vercel.

### 6. Database Schema
Three core tables with Row Level Security (RLS) enabled:

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `profiles` | User identity & location | `id`, `full_name`, `phone`, `state`, `lga`, `ward`, `zone`, `chapter_id`, `role` |
| `chapters` | State-level organizational units | `id`, `name`, `state`, `zone`, `supporter_count` |
| `activities` | Audit trail of user actions | `id`, `user_id`, `chapter_id`, `type`, `title`, `metadata` |

- **Auto-Profile Trigger**: `handle_new_user()` function automatically creates a profile row on signup.
- **RLS Policies**: Users can read all chapters/activities but can only update their own profile.
- **Seeded Data**: 37 chapters (all 36 states + FCT Abuja) pre-loaded.

### 7. Authentication Infrastructure
- **Middleware** (`middleware.ts`): Refreshes auth tokens on every request, redirects unauthenticated users from protected routes to `/auth`, and gracefully skips auth when env vars are missing (prevents Vercel 500s).
- **AuthProvider** (`AuthProvider.tsx`): React context providing global `user`, `session`, and `signOut()` across the app.
- **OAuth Callback** (`auth/callback/route.ts`): Handles the auth code exchange for Supabase OAuth flows.
- **Protected Routes**: `/dashboard`, `/missions`, `/innovation`, `/pipeline`, `/chapter`, `/onboarding`.

### 8. Nigerian Political Geography System
A comprehensive cascading location selection system covering Nigeria's full administrative hierarchy:

| Level | Count | Source |
|-------|-------|--------|
| Geopolitical Zones | 6 | Mapped in-code |
| States | 37 | 36 states + FCT |
| Local Government Areas | 774 | INEC-sourced data |
| Wards | 8,813 | INEC-sourced data |

**Implementation**:
- **Data Source**: `public/data/nigeria-geo.json` (117KB) — structured as `Zone → State → LGA → Wards[]`.
- **LocationSelector Component**: Cascading dropdown with animated reveal (Zone → State → LGA → Ward), built-in search filtering for long lists, progress indicator, and RHIC branding.
- **Onboarding Flow** (`/onboarding`): Post-signup page where users select their location through the cascading dropdowns, automatically assigning them to their state chapter.

### 9. Real-Time Dashboard
The dashboard fetches live data from Supabase via the `useDashboardData` hook:
- **Stats Row**: Total supporters, active chapters, recent signups (last 7 days).
- **Zone Breakdown**: Aggregated supporter counts per geopolitical zone.
- **Top Chapters Leaderboard**: Ranked by supporter count with visual indicators.
- **Real-Time Subscriptions**: Supabase `channel` subscriptions for live dashboard updates on chapter/profile changes.
- **Personalized Greeting**: Displays logged-in user's name.

### 10. Deployment & Infrastructure
- **Hosting**: Vercel (auto-deploys from `origin/main`).
- **Build Tool**: Next.js 15.5 with Turbopack.
- **CI/CD**: Git push → Vercel build → production deployment.
- **Environment Variables**: Managed via Vercel project settings for production and `.env.local` for development.

---

## Future Outlook
The RHIC platform is now a full-stack, production-grade national mobilization platform. The Forest Green identity, combined with Supabase-powered authentication, real-time dashboards, and Nigeria's complete 8,813-ward political geography, provides a world-class foundation for high-scale digital mobilization across all 37 states and the FCT.
