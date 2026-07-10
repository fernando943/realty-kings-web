# Realty Kings — Go-To-Market Plan (Executable Spec)

**Status:** Ready to execute · **Written:** 2026-06-16 · **Owner:** Fernando (CEO, The Hub Agency for Realty Kings)
**How to use this doc:** Open a Claude Code session in this repo (or `../realty-kings-crm`) and say:
> "Execute Phase 0 of docs/GTM_PLAN.md" (then Phase 1, 2, 3, 4 in order)

Each task has an ID, an **owner** (`OPUS` = Claude executes it; `FERNANDO` = human decision/purchase; `TEAM` = RK staff action), and **acceptance criteria** (the "done" test). Opus: verify every acceptance criterion before marking a task complete — no demo-ware.

---

## 1. Context (read first — do not rediscover)

**The business:** Realty Kings Properties — cash home buyer in Puerto Rico (herencias, ejecuciones, atrasos, divorcios, casas con problemas), plus ~100+ long-term rentals and flip projects. 7 staff. Brand = bold flyer style (royal blue/gold/green/red, "COMPRAMOS CASAS CASH"). All public copy in **es-PR**. Phones: **787-667-9389** (principal), **787-667-4033** (herencias).

**Live assets:**
| Asset | URL | State |
|---|---|---|
| Public lead site | realty-kings-web.vercel.app | Live. Chat funnel (checklist + GPS location + multi-photo + files) → Supabase `leads` |
| CRM | realty-kings-crm.vercel.app | Live. AI (vision/docs/reply/brief/ask-db), Reports, Project Tracker, Smart Lists, /admin (RBAC+audit+CSV import), Tenant Portal |
| Tenant portal | realty-kings-crm.vercel.app/portal/[token] | Live. Links generated per-tenant from /tenants |
| Database | Supabase `lqsejabfbpnycwidmjaw` | **RLS locked**: staff must log in; anon can ONLY insert leads; portal uses service-role |

**Execution notes for Opus (hard-won, do not relearn):**
- Deploy = `npx vercel build --prod --yes` then `npx vercel deploy --prebuilt --prod --yes` from the project dir. NEVER background the vercel CLI (orphans builds). Verify via hashed chunks (`LC_ALL=C grep -a`), not HTML.
- Server routes must read runtime env (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — all already in Vercel), never `NEXT_PUBLIC_*`.
- `tenants.full_name` (not name); tenant→property via `contracts`. Lead inserts from the funnel must stay `return=minimal` (anon has INSERT-only on `leads`).
- Web repo: `fernando943/realty-kings-web` · CRM repo: `fernando943/realty-kings-crm`. Git push does NOT deploy.

**North-star goal (90 days):** a measured, repeatable seller-lead machine: paid + organic traffic → chat funnel → CRM lead → first call within 24h → offer. Secondary: tenant portal adopted by rentals (fewer calls to staff).

**KPIs (baseline = 0 today, no tracking exists yet):**
- Seller leads/week from `leads where source='website_funnel'` (target: set after 2 baseline weeks)
- Funnel completion rate (chat started → submitted)
- Time-to-first-call (lead created → staff contact; target < 24h, the site's promise)
- Cost per lead by channel (once ads run)
- Tenant portal: % of active tenants who opened their link

---

## Phase 0 — Launch blockers (do first; ~1 session)

| ID | Task | Owner | Acceptance criteria |
|---|---|---|---|
| GTM-01 | **Buy custom domain.** Recommend `realtykingspr.com` (check availability; alternates: `compramoscasaspr.com` as campaign domain, both if cheap). Purchase via Vercel Domains or registrar of choice. | FERNANDO | Domain purchased, decision recorded here |
| GTM-02 | **Attach domain to Vercel** web project, redirect www→apex, update `metadata` URLs/canonical in `src/app/layout.tsx`. | OPUS (after GTM-01) | `https://<domain>/` serves the site with valid SSL; vercel.app URL 308s to it |
| GTM-03 | **Lead notifications.** New lead → instant alert to the team. Implementation: Supabase Database Webhook on `leads` INSERT → new API route `/api/notify-lead` (web repo, uses runtime env) → send email (Resend free tier; FERNANDO provides destination emails, suggest ventas@ + Fernando) with lead summary + link to CRM /crm. Optional v2: Twilio WhatsApp. | OPUS + FERNANDO (recipient emails, Resend acct) | Submitting a test lead on prod fires an email within 60s containing name/phone/address/reason. Test lead then deleted |
| GTM-04 | **Analytics + conversion tracking.** Add Vercel Analytics (`@vercel/analytics`, zero-config) AND GA4 (FERNANDO creates property, provides `G-XXXX`). Track events: `chat_started`, `chat_step` (id), `lead_submitted` (fires on /gracias), `tel_click` (both numbers). | OPUS + FERNANDO (GA4 id) | Events visible in GA4 DebugView from a prod test run |
| GTM-05 | **SEO/meta pass.** Title/description per PR search intent ("compramos casas en Puerto Rico", "vender casa rápido PR", "casa herencia"), OG image (flyer-style card), `sitemap.xml`, `robots.txt`, JSON-LD LocalBusiness (phones, San Juan PR). | OPUS | Lighthouse SEO ≥ 95; OG preview renders correctly (test with a share-debugger fetch) |
| GTM-06 | **Google Business Profile.** Create/claim listing: Realty Kings Properties, category "Real estate consultant / home buyer", both phones, link to new domain, service area PR. | FERNANDO (needs Google acct + verification) | Listing live and linked |

## Phase 1 — Team operationalization (parallel with Phase 0; ~1 week)

| ID | Task | Owner | Acceptance criteria |
|---|---|---|---|
| GTM-10 | **Staff logins.** Because of the RLS lockdown, staff MUST sign in. Confirm each of the 7 staff can log in at /login; create any missing accounts (Supabase Auth admin). | TEAM + OPUS (create accounts) | 7/7 staff listed in Supabase Auth with a successful sign-in |
| GTM-11 | **Assign roles** in CRM /admin → Roles for all 7 (property_manager, bookkeeper, acquisitions, etc.). | FERNANDO (who gets what) + OPUS (entry) | 7 rows in `rk_roles` |
| GTM-12 | **Lead SLA workflow.** Document + configure: new lead → notification (GTM-03) → acquisitions calls within 24h → stage moves `new→evaluating` in /crm; use Lead AI Score before the call (script included). Write 1-page SOP in Spanish for the team, store as docs/SOP_LEADS.md in CRM repo. | OPUS (SOP) + TEAM (adopt) | SOP exists; first real lead handled through it |
| GTM-13 | **Import remaining operational data** (any tenants/contracts/payments still in Excel) via /admin → Importar CSV. | TEAM (files) + OPUS (import + validate) | Rent Roll report matches reality per Fernando's spot-check |
| GTM-14 | **Daily brief habit.** Team opens CRM dashboard each morning (brief + alertas). Include in SOP. | TEAM | — |

## Phase 2 — Demand generation (start week 2; ongoing)

Traffic strategy mirrors what already works for RK offline (flyers/billboards) plus digital capture. All creative reuses the flyer look; all copy es-PR.

| ID | Task | Owner | Acceptance criteria |
|---|---|---|---|
| GTM-20 | **Campaign URLs + QR.** UTM convention (`?utm_source=flyer|billboard|fb|google&utm_campaign=...`); generate QR codes pointing to `<domain>/?utm_source=flyer` for print. Store funnel `utm_*` into `leads.checklist_data` (small funnel edit) so source reporting works. | OPUS | Lead submitted via a UTM URL shows the source in CRM |
| GTM-21 | **Meta (FB/IG) presence + ads.** Page setup with flyer creative; then Lead campaign: audiences PR 35–65, interests herencia/bienes raíces; creative = existing flyer art (COMPRAMOS CASAS CASH / #1 HERENCIAS); destination = site chat. Budget: FERNANDO decides (suggest a small test budget first — amount TBD, do not invent). | FERNANDO (acct, budget, approval) + OPUS (copy variants, landing checks) | First campaign live; leads arriving with utm_source=fb |
| GTM-22 | **Google Ads (Search).** Campaign on high-intent es-PR terms: "compramos casas", "vender casa rapido puerto rico", "vender casa herencia", "comprar casa cash". Conversion = `lead_submitted` (GTM-04). Budget TBD by FERNANDO. | FERNANDO (acct, budget) + OPUS (keyword/ad copy sheet, conversion wiring) | Campaign live, conversions recording |
| GTM-23 | **Herencias landing variant.** `/herencias` page targeting the #1 use case (matches the red flyer): copy + testimonial + chat prefilled with reason=Herencia; used as destination for herencias ads + the 787-667-4033 line. | OPUS | Page live, indexed, chat prefill works |
| GTM-24 | **Print/OOH refresh.** Add the new domain + QR to next print run of flyers/billboards. | FERNANDO (print vendor) | Next batch carries domain + QR |
| GTM-25 | **Organic social cadence.** 3 posts/week template pack (caso real cerrado, testimonio, educativo "¿heredaste una casa?") — Opus drafts a 4-week calendar w/ es-PR copy; team publishes. | OPUS (calendar) + TEAM (publish) | 4-week calendar doc delivered |

## Phase 3 — Tenant portal rollout (week 2–3)

| ID | Task | Owner | Acceptance criteria |
|---|---|---|---|
| GTM-30 | **Batch link generation.** Script/admin action to generate portal tokens for all active-contract tenants and export a CSV: tenant, phone, portal link (30-day tokens; regenerate monthly or extend expiry — decide). | OPUS | CSV with one working link per active tenant |
| GTM-31 | **Distribution.** WhatsApp/SMS blast from the team: "Tu portal de Realty Kings — ve tu renta y pide mantenimiento" + link. Draft the message (es-PR). | OPUS (message) + TEAM (send) | Sent to all active tenants |
| GTM-32 | **Intake loop.** Ensure `tenant_maintenance_requests` are visible to staff (surface them on /maintenance as a "Solicitudes del portal" inbox that converts to tickets). | OPUS | Portal request appears in CRM and can be converted to a ticket |
| GTM-33 | **Measure adoption.** Track token `used_at` on portal open (small route edit); report % opened after 2 weeks. | OPUS | Adoption % queryable |

## Phase 4 — Measure & iterate (from week 3, weekly)

| ID | Task | Owner | Acceptance criteria |
|---|---|---|---|
| GTM-40 | **Weekly GTM report.** Extend the CRM daily-brief pattern: weekly cron (pg_cron or Vercel cron) that assembles: leads by source, funnel completion, time-to-first-stage-move, portal requests, AI spend (`ai_runs.cost_usd`), and emails it to Fernando. | OPUS | First weekly email received |
| GTM-41 | **Funnel drop-off fixes.** Using GTM-04 step events, identify the top drop-off step in the chat and iterate (shorten/reorder). | OPUS | One measured improvement shipped |
| GTM-42 | **Channel doubling decision.** After ~4 weeks of data: cost-per-lead by channel → Fernando decides where to double down. | FERNANDO | Decision logged here |

---

## Phase H — Hardening (do BEFORE spending on ads; a leak during a campaign is the worst time)

Found during a 2026-06-16 review — the earlier RLS lockdown was **incomplete**.

| ID | Task | Owner | Acceptance criteria |
|---|---|---|---|
| GTM-00 | ✅ **DONE 2026-06-16.** Closed the `rk_exec_sql` RPC hole (was leaking all 161 tenant names+phones to anon). Revoked from anon/public, granted to authenticated. Verified: anon_can_run=false, authenticated_can_run=true (Smart Lists works). | — | ✅ verified |
| GTM-H1 | ✅ **DONE 2026-06-16 (documents bucket).** `documents` bucket (escrituras/CRIM) had 4 `*_anon` policies granting `{public}` full SELECT/INSERT/UPDATE/DELETE — anyone could read/alter/delete legal docs. Locked to `authenticated` only; verified anon upload→400, funnel lead-photos upload still 200. **REMAINING:** `lead-photos` stays anon-insert (funnel needs it) — spam-upload vector; mitigate via file_size_limit + rate-limit (GTM-H2), or move funnel uploads to a server route. | OPUS (remaining) | documents locked ✅; lead-photos hardening open |
| GTM-H2 | **Rate-limit + protect API routes.** `/api/ai/*` (burns Anthropic budget) and `/api/portal/[token]` (token brute-force) have zero limits. Add Upstash/Vercel rate limiting; add a daily AI spend guard (cap on `ai_runs.cost_usd`); portal: throttle + optional single-use/short-expiry tokens + set `used_at`. | OPUS + FERNANDO (Upstash acct) | Repeated calls throttle; AI spend capped |
| GTM-H3 | **Funnel spam/bot protection.** Add Cloudflare Turnstile (or honeypot) to the chat submit + lead dedup on phone/address (avoid double leads). | OPUS | Bot submits blocked; duplicate seller → single lead |
| GTM-H4 | **Error monitoring.** Sentry (free) on both apps — you won't know prod is broken otherwise. | OPUS + FERNANDO (Sentry acct) | A thrown error appears in Sentry |
| GTM-H5 | **Backups.** Confirm Supabase PITR/daily backups are ON (Pro). One bad migration = data loss. | FERNANDO | Backups verified enabled |
| GTM-H6 | **Mobile/a11y QA.** Most PR sellers are mobile — full pass on the funnel + portal on a real phone. | OPUS | No layout breaks; tap targets ok |

## GTM betterments (add to Phase 2/3 — high ROI for PR home-buying)

| ID | Task | Owner | Why |
|---|---|---|---|
| GTM-B1 | **WhatsApp-first CTA.** `wa.me/17876679389` button on hero + a "hablar por WhatsApp" option in the chat. | OPUS | PR is WhatsApp-first; often outconverts a web form for high-trust sales |
| GTM-B2 | **Speed-to-lead auto-SMS.** On submit, instant SMS to the seller ("recibimos tu info, te llamamos en 24h") via Twilio. | OPUS + FERNANDO (Twilio) | Kills ghosting; reinforces the 24h promise the site makes |
| GTM-B3 | **Meta retargeting pixel** + audience of funnel-abandoners. | OPUS + FERNANDO (pixel) | Home-selling is high-consideration; retargeting is the highest-ROI ad spend |
| GTM-B4 | **Call tracking** on both numbers (CallRail or similar). | FERNANDO | Attribute calls to channels, not just form fills — half your leads will call |
| GTM-B5 | **Auto Google-review request** after a closing. | OPUS + TEAM | Fuels the Google Business Profile (GTM-06); reviews are the #1 local-SEO lever |
| GTM-B6 | **Bilingual toggle (EN)** for stateside heirs selling inherited PR property — a real segment (herencias). | OPUS | The herencias use case often = a mainland-based heir |

## Decisions needed from Fernando (blockers, in order)
1. **GTM-01** Domain choice + purchase (everything in Phase 0 hangs on it; GTM-03/04/05 can proceed on vercel.app in parallel but should re-verify after domain).
2. **GTM-03** Notification recipient emails (+ create free Resend account, or hand Opus an API key via Vercel env `RESEND_API_KEY`).
3. **GTM-04** GA4 property ID.
4. **GTM-21/22** Ad accounts + budgets (amounts are yours — this doc deliberately doesn't invent them).
5. **GTM-11** Role per staff member.

Everything not in that list, Opus can execute autonomously against the acceptance criteria.
