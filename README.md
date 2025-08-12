# LearnTrack — Next.js + Supabase (Auth + Clickstream)

A fully working learning site with:
- Email/password auth (Supabase)
- Interactive content: text lessons, HTML5 video, quizzes
- Client-side tracking for clicks, page views, video events, quiz attempts
- Clickstream stored in Postgres (Supabase) with RLS
- Ready for free deployment on Vercel + Supabase (free tier)
- Version control friendly (git)

## 1) One-time setup

1. **Create Supabase project** (free): https://supabase.com/
   - Get **Project URL** and **anon public key** from Project Settings → API.
2. **Create the Clickstream table**: open SQL Editor in Supabase and run [sql/clickstream.sql](sql/clickstream.sql).
3. **(Optional) Seed a demo lesson + quiz**: not required; data is file-based here.
4. **Configure Auth** in Supabase → Authentication: enable Email/Password.

## 2) Configure environment variables

Copy `.env.example` to `.env.local` (for local dev) and fill:

```
NEXT_PUBLIC_SUPABASE_URL=... 
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

On Vercel, set these in **Project Settings → Environment Variables**.

## 3) Dev, build, deploy

```bash
# install
npm i

# dev
npm run dev

# build
npm run build && npm start
```

**Deploy (free)**:
- Push to GitHub (any public/private repo).
- Import the repo in **Vercel** → deploy.
- Add the two env vars in Vercel.
- Set your Supabase project's allowed redirect URLs to include your Vercel URL.

## 4) Where does tracking happen?

- `lib/track.ts`: helper to emit events.
- `components/VideoPlayer.tsx`: tracks `play`, `pause`, `seeked`, `ended` (+ current time).
- `components/Quiz.tsx`: tracks `start`, `answer`, `submit`, correctness.
- `app/(site)/*`: page views and link/button clicks via `data-track` attributes.
- All events are inserted **directly from the client** using Supabase Auth, tied to the user id. RLS ensures users can only insert for themselves.

## 5) Query your clickstream

Use Supabase SQL Editor or the Table UI:

```sql
select * from public.clickstream order by created_at desc;
```

## 6) Example dashboards

- Pull the table into Google Sheets / Data Studio / Metabase / Supabase Charts for quick analysis.

## 7) Tech choices

- Next.js 14 App Router
- Supabase (Auth + Postgres)
- TailwindCSS
- Minimal dependencies; no serverless API required for tracking.

---

**Security Note**: RLS ensures that authenticated users may only insert rows where `user_id = auth.uid()`. No sensitive keys are exposed client-side beyond the public anon key (by design).

Enjoy!
