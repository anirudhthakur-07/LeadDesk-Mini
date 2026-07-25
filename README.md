# LeadDesk Mini — Digital Heroes Qualification Task

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#11-license)

LeadDesk Mini is a full-stack lead management product built for the **Digital Heroes Internship Programme (Role 04: Full Stack Development — Task A & Task B)**. Built with Next.js 14, React 18, Tailwind CSS, MongoDB Atlas, and JWT authentication, it features a public landing page with validated lead capture forms and a real-time protected management dashboard.

---

## 📍 Digital Heroes Qualification Task Submission

- **Role**: `04 / 16 — Full Stack Development`
- **Candidate Name**: Anirudh Thakur
- **Live Production URL**: [https://lead-desk-mini-t44a.vercel.app](https://lead-desk-mini-t44a.vercel.app)
- **Admin Dashboard URL**: [https://lead-desk-mini-t44a.vercel.app/admin](https://lead-desk-mini-t44a.vercel.app/admin)
- **Video Walkthrough**: [https://youtu.be/OHK-YguAR_o](https://youtu.be/OHK-YguAR_o)
- **Test Credentials**:
  - **Admin Email**: `admin@leaddesk.com`
  - **Admin Password**: `AdminPassword123!`

---

## 🎯 Executive Pitch & Solution Overview

> *"LeadDesk Mini solves the problem of lost agency leads and fragmented client communication. It provides prospective clients with a multi-currency project inquiry form and a live response lookup tool, while giving agency managers a secure, real-time CRM dashboard to track pipeline metrics, update statuses, send reply notes, and export CSV data — all protected by enterprise JWT security."*

### ⚡ What Problem It Solves

- **❌ Traditional Broken Way**: Contact forms send static emails that land in spam, leave clients with zero visibility on their inquiry status, and leave agency managers tracking leads across messy spreadsheets.
- **✅ LeadDesk Mini Solution**: 
  1. **Instant Lead Capture**: Real-time multi-currency validation and direct persistence to MongoDB Atlas.
  2. **Real-Time CRM Dashboard**: Live pipeline control (`New` ➔ `Contacted` ➔ `Closed`) with instant 0ms search, filter pills, and sorting.
  3. **Two-Way Communication Loop**: Admins can write reply notes directly in the table, and clients can check their response status live on the public site via the navbar.
  4. **Data Protection**: Soft-delete pipeline (`isDeleted: true`) and 1-click CSV export with formula injection protection.

---

## 1. Task A & Task B Overview

### Task A — Build LeadDesk Mini
- **Public Lead Form**: Captures `fullName`, `email`, `budgetRange`, and `message` with multi-currency selectors (USD $, EUR €, GBP £, INR ₹), 5-tier budget buttons, and dual-layer validation.
- **Real Database Storage**: Persists lead submissions in a cloud MongoDB Atlas database.
- **Admin View (`/admin`)**: Lists all leads with instant search, multi-criteria sorting, status toggling (`New` / `Contacted` / `Closed`), and inline reply notes.

### Task B — Secure It and Ship It
- **Real Admin Authentication**: Session authentication powered by signed JWT cookies and 12-round bcrypt password hashing (no hardcoded string validation).
- **Production Deployment**: Deployed and configured for zero-state fresh browser execution on Vercel.
- **Data Retention**: Soft-delete pipeline (`isDeleted: true`) preserving historical analytics and audit trails.

---

## 2. Data Model Architecture

The application relies on two primary Mongoose schemas in MongoDB Atlas:

### Lead Schema (`models/Lead.js`)
```typescript
interface ILead {
  fullName: string;      // Trimmed, 2–100 chars, required
  email: string;         // Normalized lowercase, RFC 5322 regex validated, required
  budgetRange: string;   // Multi-currency range string, required
  message: string;       // Sanitized project details, 10–1000 chars, required
  status: string;        // Enum: ["New", "Contacted", "Closed"], default: "New"
  adminReply: string;    // Admin reply note, max 500 chars, default: ""
  repliedAt: Date;       // Timestamp when admin replied
  isDeleted: boolean;    // Soft-delete flag for data protection, default: false
  createdAt: Date;       // ISO timestamp
  updatedAt: Date;       // ISO timestamp
}
```

### Admin Schema (`models/Admin.js`)
```typescript
interface IAdmin {
  email: string;         // Unique, normalized lowercase admin email
  password: string;      // Salted bcrypt hash (12 rounds)
  createdAt: Date;
}
```

---

## 3. Authentication & Security Approach

LeadDesk Mini implements enterprise DevSecOps standards for route guarding and session security:

1. **JWT Session Token**: Upon successful login (`POST /api/auth/login`), the server issues a signed JSON Web Token stored in an `HttpOnly`, `SameSite: strict`, `Secure` cookie.
2. **Next.js Middleware Protection**: The `middleware.js` guard inspects incoming requests to protected routes (`/admin` and `/api/leads`). Requests without valid JWT tokens are automatically redirected to `/login`.
3. **NoSQL & XSS Sanitization**: Input sanitizer (`utils/sanitize.js`) strips potential query injection syntax (`{}`) and HTML markup while preserving valid currency symbols.
4. **Rate Limiting**: Sliding window memory rate limiting enforces a maximum of 5 auth attempts per 15 minutes to prevent brute-force attacks.

---

## 4. Features & UI/UX Highlights

### Public Landing Page
- Modern dark slate aesthetic (`#09090B`) inspired by **Linear**, **Vercel**, and **Stripe**.
- Custom geometric SVG brand emblem (`Logo.jsx`) with abstract "LD" gradient shield.
- Multi-currency selector tabs (**USD $**, **EUR €**, **GBP £**, **INR ₹**) with 5-tier budget range buttons.
- Public **Check Response Modal** allowing clients to lookup admin replies using their email.
- Bidirectional scroll reveal animations (`ScrollReveal.jsx`) on both scroll-down and scroll-up.

### Admin CRM Dashboard
- **Analytics Metric Grid**: Computes total leads, new inquiries, contacted leads, closed conversions, and conversion rate %.
- **Inline Admin Reply Box**: Write short reply notes to client inquiries directly inside the table.
- **0ms Instant Search**: Search across name, email, budget, status, or message with `⌘K` / `Ctrl+K` keyboard shortcuts.
- **Multi-Criteria Dropdown Sorter**: Weighted status priority sorting (`New` ➔ `Contacted` ➔ `Closed`) and budget ranking.
- **1-Click CSV CRM Export**: Exports active pipeline views directly to formatted `.csv` files.

---

## 5. Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Full-stack SSR, static generation, and API handlers. |
| **Frontend** | React 18 & Lucide Icons | Component UI, custom animations, and icon set. |
| **Styling** | Tailwind CSS 3.4 | Dark zinc layout utilities and glassmorphic styling. |
| **Database** | MongoDB Atlas & Mongoose | Document storage with schema validation & SRV caching. |
| **Authentication** | JWT & `bcryptjs` | Secure cookie sessions and 12-round password hashing. |

---

## 6. API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/leads` | Submit a new lead inquiry | No |
| `GET` | `/api/leads` | Retrieve leads list & metrics | **Yes** |
| `PATCH` | `/api/leads/[id]` | Update lead status (`New`, `Contacted`, `Closed`) | **Yes** |
| `PUT` | `/api/leads/[id]` | Add admin reply note to a lead | **Yes** |
| `DELETE` | `/api/leads/[id]` | Soft-delete a lead record | **Yes** |
| `POST` | `/api/leads/responses` | Public email lookup for admin replies | No (Rate-Limited) |
| `POST` | `/api/auth/login` | Authenticate administrator | No |
| `GET` | `/api/auth/me` | Verify active admin session | **Yes** |
| `POST` | `/api/auth/logout` | Terminate session & clear cookie | No |

---

## 7. AI Usage Declaration

*AI Statement (Digital Heroes Requirement)*: AI models (Claude & Gemini) were used during development to pressure-test schema validation edge cases, generate initial UI component scaffolding, and audit cross-browser layout stability. All UI design tokens, status dropdown selectors, tabular numbers, scroll reveal hooks, and JWT authentication flows were customized, refined, and audited manually.

---

## 8. Author & License

- **Author**: Anirudh Thakur
- **GitHub**: [github.com/anirudhthakur-07](https://github.com/anirudhthakur-07)
- **Repository**: [LeadDesk-Mini](https://github.com/anirudhthakur-07/LeadDesk-Mini)
- **License**: Distributed under the **MIT License**. See `LICENSE` for details.
