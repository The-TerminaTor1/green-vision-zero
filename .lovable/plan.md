

# Backend Roadmap for Nirmal Carbon

A complete backend blueprint covering architecture, database schema, endpoints, business logic, security, and seed data. Built on **Lovable Cloud (Supabase)** — PostgreSQL + Auth + Storage + Edge Functions.

---

## 1. Architecture Overview

```text
┌──────────────────────────────────────────────────────┐
│  React Frontend (Vite + TS)                          │
└───────────────┬──────────────────────────────────────┘
                │ supabase-js client
┌───────────────▼──────────────────────────────────────┐
│  Lovable Cloud (Supabase)                            │
│  ├─ Auth (email/pw + Google OAuth)                   │
│  ├─ PostgreSQL (RLS-protected tables)                │
│  ├─ Storage (project images, certificates, avatars)  │
│  └─ Edge Functions (payments, certs, emails, calc)   │
└───────────────┬──────────────────────────────────────┘
                │
        ┌───────┴────────┬──────────────┐
        ▼                ▼              ▼
   Razorpay          Resend         PDF Service
   (payments)        (emails)       (certificates)
```

---

## 2. User Roles & Auth

- **Roles** (`app_role` enum): `individual`, `firm`, `corporate`, `admin`
- **Auth methods**: Email/Password, Google OAuth
- **Roles stored in separate `user_roles` table** (never on profiles — prevents privilege escalation)
- **`has_role()`** SECURITY DEFINER function used in all RLS policies
- Profile auto-created via trigger on `auth.users` insert

---

## 3. Database Schema (14 tables)

**Identity & Roles**
1. `profiles` — id, full_name, avatar_url, phone, company_name, location, bio
2. `user_roles` — user_id, role (enum)

**Projects & Marketplace**
3. `projects` — id, firm_id, title, description, location, project_type, total_credits, available_credits, price_per_credit (₹), status (draft/pending/verified/rejected/sold_out), images[], verification_docs[], co2_impact, start_date, end_date
4. `project_certifications` — project_id, certification_type (VCS/Gold Standard/CDM), issuer, certificate_url, issued_date, expiry_date

**Transactions & Credits**
5. `transactions` — id, buyer_id, project_id, credits_purchased, total_amount (₹), payment_id, payment_status, certificate_url, created_at
6. `credit_holdings` — user_id, project_id, credits_owned, credits_retired
7. `transaction_ledger` — id, project_id, type (issuance/sale/retirement/transfer), credits, from_user, to_user, blockchain_hash, created_at

**Contributions (Individual)**
8. `contributions` — user_id, project_id, amount (₹), credits_funded, contribution_type (one-time/recurring), created_at
9. `user_stats` — user_id, total_contributed, total_credits_funded, co2_offset, trees_planted, level, points, streak_days

**Rewards**
10. `rewards` — id, name, description, points_required, image_url, stock, category
11. `reward_redemptions` — user_id, reward_id, points_spent, status, redeemed_at

**Corporate**
12. `corporate_targets` — corporate_id, year, target_co2_reduction, current_offset, baseline_emissions
13. `emissions_data` — corporate_id, month, year, emissions, offset

**Admin & Notifications**
14. `notifications` — user_id, type, title, message, read, created_at
15. `audit_log` — actor_id, action, entity_type, entity_id, metadata, created_at

---

## 4. Row-Level Security (key policies)

- `profiles`: users read all, update own
- `user_roles`: users read own, only admin inserts/updates
- `projects`: anyone reads `verified`; firm reads/updates own; admin all
- `transactions`: buyer reads own; firm reads own project sales; admin all
- `contributions`/`credit_holdings`/`user_stats`: owner-only
- `rewards`: public read; admin write
- `corporate_targets`/`emissions_data`: corporate owner + admin
- All policies use `public.has_role(auth.uid(), 'admin')` pattern

---

## 5. API Endpoints (Supabase auto-generated + Edge Functions)

**Auto-generated (PostgREST)** — all CRUD respects RLS
- `GET/POST /projects`, `/transactions`, `/contributions`, `/rewards`, etc.

**Edge Functions** (custom logic)
| Function | Purpose |
|---|---|
| `process-payment` | Create Razorpay order, verify signature, record txn, mint credits |
| `verify-payment-webhook` | Razorpay webhook → mark txn paid, trigger certificate |
| `generate-certificate` | Build PDF cert, upload to storage, return URL |
| `verify-project` | Admin approves project → status=verified, notify firm |
| `calculate-co2-impact` | Compute CO₂/trees from credits + project type |
| `update-leaderboards` | Cron: refresh top contributors / companies |
| `redeem-reward` | Atomic: deduct points, decrement stock, create redemption |
| `send-notification-email` | Resend integration for txn/verification/redemption |
| `upload-project` | Validate firm role, store docs, create project (status=pending) |
| `retire-credits` | Corporate retires credits → ledger entry + cert |

---

## 6. Business Logic Flows

**Buy Credits (Corporate/Individual)**
```text
1. Client → process-payment (project_id, credits)
2. EF creates Razorpay order → returns order_id
3. Client completes payment → Razorpay callback
4. verify-payment-webhook validates signature
5. Insert transaction, decrement project.available_credits
6. Insert credit_holdings + transaction_ledger entry
7. generate-certificate → upload PDF → email user
```

**Upload Project (Firm)**
```text
1. Firm submits via UploadProjectModal
2. upload-project EF: validates role, stores images/docs
3. Creates project with status=pending
4. Notifies admins
5. Admin reviews in AdminPanel → verify-project EF
6. Status → verified, project goes live in marketplace
```

**Reward Redemption (Individual)**
```text
1. Client → redeem-reward (reward_id)
2. EF checks user_stats.points >= reward.points_required
3. Atomic txn: deduct points, decrement stock, insert redemption
4. Email confirmation with delivery details
```

---

## 7. Storage Buckets

| Bucket | Access | Contents |
|---|---|---|
| `project-images` | Public read | Project photos |
| `project-docs` | Private (firm + admin) | Verification docs |
| `certificates` | Signed URLs | Purchase/retirement PDFs |
| `avatars` | Public read | Profile pictures |

---

## 8. Third-Party Integrations

- **Razorpay** — Indian payment gateway (₹ currency) — secrets: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- **Resend** — transactional email — secret: `RESEND_API_KEY`
- **PDF generation** — `pdf-lib` in edge function (no external secret)
- **Optional**: Google OAuth (configured in Cloud auth settings)

---

## 9. Seed Data (initial population)

**Rewards** (~10 items)
- Eco T-shirt (500 pts), Bamboo Bottle (300), Plant a Tree Cert (200), Solar Power Bank (1500), Carbon Offset Bundle (1000), etc.

**Sample Projects** (~6 verified)
- Amazon Rainforest Restoration, Wind Energy Initiative (Tamil Nadu), Mangrove Conservation (Sundarbans), Solar Farm (Rajasthan), Reforestation (Western Ghats), Biogas (Punjab)

**Demo Users** (one per role)
- `admin@nirmal.com`, `firm@demo.com`, `corp@demo.com`, `user@demo.com` (password: `Demo@1234`)

**Certifications** — VCS, Gold Standard, CDM entries linked to seed projects

**Sample contributions/transactions** — populates leaderboards & dashboards

---

## 10. Implementation Roadmap (phased)

**Phase 1 — Foundation** (auth + schema)
- Enable Lovable Cloud, create all tables + enums + RLS + `has_role` function
- Build profile auto-create trigger
- Wire up `AuthContext` to real Supabase auth (email/pw + Google)
- Role-based route guards

**Phase 2 — Core Marketplace**
- Replace mock projects with DB queries
- Firm upload-project edge function + storage
- Admin verify-project flow
- Marketplace filters hit real data

**Phase 3 — Payments & Credits**
- Razorpay integration (`process-payment`, webhook)
- Transaction ledger + credit_holdings
- Certificate PDF generation + email

**Phase 4 — Engagement**
- Contributions tracker writes to DB
- User stats + leaderboards (top contributors / companies)
- Rewards redemption flow

**Phase 5 — Corporate Features**
- Emissions data ingestion
- Target tracking + progress reports
- Bulk credit retirement

**Phase 6 — Admin & Polish**
- Admin panel: project approvals, user management, audit log
- Notifications system (in-app + email)
- Analytics views, security audit, seed production data

---

## 11. Security Checklist

- ✅ Roles in separate `user_roles` table
- ✅ All tables RLS-enabled with `has_role()` SECURITY DEFINER
- ✅ Edge functions validate JWT + Zod-validate input
- ✅ Razorpay webhook signature verification
- ✅ Storage buckets scoped (public vs signed URLs)
- ✅ No client-side admin checks
- ✅ Audit log for all admin actions
- ✅ HIBP password protection enabled
- ✅ CORS headers on all edge functions

---

## What I'll need from you to start Phase 1

1. Confirm enabling **Lovable Cloud** (free to start)
2. Confirm using **Razorpay** for ₹ payments (or prefer Stripe?)
3. Confirm enabling **Google OAuth** (optional)
4. Approve seed data set above (or send your own list)

