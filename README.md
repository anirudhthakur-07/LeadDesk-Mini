# 🚀 LeadDesk Mini — Full-Stack Lead Management System

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](#24-license)

> **LeadDesk Mini** is a production-ready, high-performance full-stack web application built for digital marketing and web engineering agencies. It features an interactive, glassmorphic public landing page with real-time validated lead capture, a secure JWT-authenticated admin portal, live search/status pipeline management, CSV data exporting, soft-delete data retention, and enterprise security guardrails.

---

## 1. Hero Banner Placeholder

```text
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                           LEADDESK DIGITAL MANAGEMENT                             |
|              High-Performance Lead Infrastructure & Web Engineering                |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Overview

### Why This Project Exists
Digital marketing and web agencies require a streamlined, secure system to capture, validate, store, and manage prospective client leads without relying on fragile third-party forms or bloated CMS plugins. **LeadDesk Mini** provides a self-hosted, lightweight, full-stack lead management platform.

### Problem Solved
- Eliminates fake/malformed lead inquiries through dual client-and-server validation.
- Prevents database corruption, XSS, and NoSQL injection attacks using strict string sanitization.
- Replaces static form scripts with a real-time admin management portal capable of filtering, updating pipeline statuses, and exporting lead records.

### Business Value
- **Higher Conversion**: Glassmorphic UI with micro-interactions encourages visitor engagement.
- **Data Retention**: Soft-delete architecture (`isDeleted`) ensures leads are never permanently lost from disk.
- **Export & Integration**: One-click CSV export utility enables CRM integration (HubSpot, Salesforce, Zoho).

---

## 3. Features

### 🌐 Public Side (Landing Page)
- **Agency Hero & Services**: Headline, value propositions, and service highlights with glowing radial background accents.
- **Interactive Lead Capture Form**: Inputs for `Full Name`, `Email Address`, `Budget Range` (`$1,000 - $5,000`, `$5,000 - $10,000`, `$10,000+`), and `Project Message`.
- **Client & Server Validation**: Real-time email regex matching, string bounds checking, and instant alert toasts.
- **Mandatory Footer Credit**: Includes required task credit: `Built for <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer">Digital Heroes Training Task</a>`.

### 🛡️ Admin Portal & Security
- **JWT Cookie Authentication**: Secure login form (`/login`) issuing `HttpOnly`, `SameSite=Strict` session cookies.
- **Bcrypt Password Security**: Configured to **12 salt rounds** (`BCRYPT_ROUNDS=12`).
- **Auto-Seeding Logic**: Automatically seeds the default admin (`admin@leaddesk.com` / `AdminPassword123!`) if missing.
- **Middleware Guard**: Protects `/admin` and sensitive `/api/leads` routes against unauthenticated requests (`HTTP 401`).
- **Rate Limiting**: Sliding window IP rate limiter (**5 submissions / 15 mins** per IP) preventing spam and brute-force attacks.

### 📊 Dashboard & Pipeline Management
- **Summary Metrics Bar**: Real-time count cards for `Total Leads`, `New Leads`, `Contacted`, and `Closed Deals`.
- **Live Search & Status Filtering**: Search by lead name or email with status tabs (`All`, `New`, `Contacted`, `Closed`).
- **Interactive Leads Table**: Color-coded badges (`New`: Blue, `Contacted`: Amber, `Closed`: Green) with live dropdown selector updating MongoDB via `PATCH /api/leads/[id]`.
- **CSV Data Exporter**: Export filtered lead lists to standard `.csv` spreadsheets.
- **Soft Deletes**: Deleting a lead sets `isDeleted: true`, removing it from the active UI while preserving record history.

---

## 4. Tech Stack

| Domain | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 14 (App Router) | Server-side rendering, automatic route optimization, and clean API gateway integration. |
| **UI Library** | React 18 & Lucide Icons | Declarative component state management and modern lightweight SVG icons. |
| **Styling** | Tailwind CSS 3.4 | Modern dark/glassmorphic design tokens, backdrop blur utilities, and responsive breakpoints. |
| **Database** | MongoDB Atlas & Mongoose 8 | Document flexibility, strict schema validation, enums, and indexing. |
| **Authentication** | JWT & `bcryptjs` | Stateless session management with 12 bcrypt salt rounds and `HttpOnly` cookie hygiene. |
| **Testing** | Vitest | Automated unit testing for validators and business logic. |
| **Security Utilities** | Native Node Crypto & DNS | Timing-safe CSRF matching and custom Google DNS SRV fallback for Windows ISP connectivity. |

---

## 5. System Architecture & Request Lifecycle

```text
Visitor / Admin Client (React UI)
  │
  ▼
Next.js Middleware Guard (JWT Verification & Security Headers)
  │
  ▼
App Router Gateways (src/app/api/*)
  │
  ▼
Validation Layer (src/validators/*)
  │
  ▼
Business Logic Services (src/services/*)
  │
  ▼
Data Access Repositories (src/repositories/*)
  │
  ▼
Database Layer (src/lib/db.js with DNS SRV Resolver & Cached Connection)
  │
  ▼
MongoDB Atlas (Isolated leaddesk-mini Database)
```

---

## 6. Folder Structure

```text
c:\Users\Anirudh thakur\OneDrive\Desktop\Leaddesk-mini\
├── .env.example                     # Environment variable template
├── .gitignore                        # Git exclusion rules
├── jsconfig.json                     # Module path alias mappings (@/*)
├── middleware.js                     # Centralized JWT route protection guard
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies and scripts
├── postcss.config.js                 # PostCSS configuration
├── README.md                         # Comprehensive documentation
├── tailwind.config.js                # Tailwind dark glassmorphic tokens
└── src/
    ├── app/                          # Next.js App Router pages and APIs
    │   ├── admin/page.js             # Protected Admin Dashboard Page
    │   ├── api/
    │   │   ├── auth/                 # Login, logout, session check APIs
    │   │   └── leads/                # Lead capture, list, status update APIs
    │   ├── globals.css               # Base styles and glassmorphism utilities
    │   ├── layout.js                 # Root layout and metadata
    │   ├── login/page.js             # Admin Login Card Page
    │   └── page.js                   # Public Landing Page
    ├── components/                   # Reusable UI components
    │   ├── AdminHeader.js            # Top admin header with email badge & logout
    │   ├── Features.js               # Service cards grid
    │   ├── Footer.js                 # Footer with mandatory task credit link
    │   ├── Hero.js                   # Hero section with CTA buttons
    │   ├── LeadForm.js               # Lead capture form with real-time validation
    │   ├── LeadsTable.js             # Interactive table with status dropdown
    │   ├── MetricsBar.js             # Summary analytics cards
    │   ├── Navbar.js                 # Brand logo and navigation
    │   └── SearchFilterBar.js        # Search input, status tabs, and CSV export
    ├── constants/index.js            # Shared enums, cookie keys, and rate limits
    ├── lib/                          # Core connection and security libraries
    │   ├── auth.js                   # JWT token signing & HttpOnly cookie logic
    │   ├── db.js                     # Mongoose connection with DNS SRV resolver
    │   ├── rateLimit.js              # Sliding window IP rate limiter
    │   ├── sanitize.js               # String sanitization & NoSQL protection
    │   └── seed.js                   # Default admin auto-seeding
    ├── models/                       # Mongoose schemas (Admin.js, Lead.js)
    ├── repositories/                 # Data Access Layer (adminRepository, leadRepository)
    ├── services/                     # Business Logic Layer (authService, leadService, emailService)
    ├── utils/                        # System utilities (csrf, csvExporter, logger, securityHeaders)
    └── validators/                   # Payload validators and unit tests
```

---

## 7. Screenshots Placeholder

- **Landing Page & Hero**: `[Screenshot: Landing Page Hero with Ambient Glow]`
- **Lead Capture Form**: `[Screenshot: Glassmorphic Lead Capture Form with Validation]`
- **Admin Login Card**: `[Screenshot: Admin Authentication Card at /login]`
- **Admin Dashboard**: `[Screenshot: Protected Dashboard at /admin with Metrics & Search]`
- **Interactive Status Toggle**: `[Screenshot: Live Dropdown Changing Status New -> Contacted]`
- **CSV Data Export**: `[Screenshot: Export CSV Button & Download Action]`
- **Mobile Responsive View**: `[Screenshot: 360px Mobile Responsive Layout]`

---

## 8. Installation & Setup

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher
- MongoDB Atlas cluster account (or local MongoDB database)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anirudhthakur-07/LeadDesk-Mini.git
   cd LeadDesk-Mini
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/leaddesk-mini?retryWrites=true&w=majority
   JWT_SECRET=leaddesk_jwt_super_secret_key_2026_digitalheroes
   BCRYPT_ROUNDS=12
   NODE_ENV=development
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 9. Environment Variables

| Variable | Required | Description | Example Placeholder |
| :--- | :---: | :--- | :--- |
| `MONGODB_URI` | Yes | MongoDB Atlas connection URI targeting `/leaddesk-mini` | `mongodb+srv://user:pass@cluster.mongodb.net/leaddesk-mini` |
| `JWT_SECRET` | Yes | Secret key used to sign session JWT tokens | `super_secret_jwt_key_2026_change_me` |
| `BCRYPT_ROUNDS`| No | Salt rounds for password hashing (Default: `12`) | `12` |
| `NODE_ENV` | No | Application environment (`development` or `production`) | `development` |

---

## 10. Authentication & Security Architecture

### Login Flow (`POST /api/auth/login`)
1. Request payload validated by `authValidator.js`.
2. IP checked against sliding window rate limiter (**5 attempts / 15 mins**).
3. Admin record retrieved via `adminRepository.js`.
4. Password verified using `bcrypt.compare` against hashed password.
5. Signed JWT issued and placed in an `HttpOnly`, `SameSite=Strict`, `Path=/`, `Secure` cookie (`leaddesk_token`).

### Default Admin Credentials (Auto-Seeded)
- **Email**: `admin@leaddesk.com`
- **Password**: `AdminPassword123!`

---

## 11. Database Design (MongoDB & Mongoose)

### `admins` Collection
```json
{
  "_id": "ObjectId",
  "email": "admin@leaddesk.com",
  "password": "$2a$12$eImi... (Bcrypt 12 Rounds)",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### `leads` Collection
```json
{
  "_id": "ObjectId",
  "fullName": "Sarah Jenkins",
  "email": "sarah@company.com",
  "budgetRange": "$5,000 - $10,000",
  "message": "Looking for full-stack web engineering and digital marketing audit.",
  "status": "New",
  "isDeleted": false,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

## 12. API Reference Documentation

| Method | Endpoint | Description | Auth Required | Request Body | Status Codes |
| :--- | :--- | :--- | :---: | :--- | :--- |
| `POST` | `/api/leads` | Capture new lead submission | No | `{ fullName, email, budgetRange, message }` | `201`, `400`, `422`, `429`, `500` |
| `GET` | `/api/leads` | Get filtered leads and metrics | **Yes** | None (`?search=term&status=New`) | `200`, `401`, `500` |
| `PATCH` | `/api/leads/[id]` | Update lead status | **Yes** | `{ status: "Contacted" }` | `200`, `400`, `401`, `404`, `422`, `500` |
| `DELETE`| `/api/leads/[id]` | Soft-delete lead record | **Yes** | None | `200`, `400`, `401`, `404`, `500` |
| `POST` | `/api/auth/login` | Admin authentication | No | `{ email, password }` | `200`, `400`, `401`, `429`, `500` |
| `GET` | `/api/auth/me` | Check session status | **Yes** | None | `200`, `401`, `500` |
| `POST` | `/api/auth/logout` | Clear JWT session cookie | No | None | `200`, `500` |

---

## 13. Validation Strategy

Validation is implemented across **3 distinct layers**:
1. **Client-Side**: Immediate regex email check, character length feedback, and disabled submit states in [LeadForm.js](file:///c:/Users/Anirudh%20thakur/OneDrive/Desktop/Leaddesk-mini/src/components/LeadForm.js).
2. **Server-Side Gateway**: Payload sanitization and bounds checking in [leadValidator.js](file:///c:/Users/Anirudh%20thakur/OneDrive/Desktop/Leaddesk-mini/src/validators/leadValidator.js).
3. **Database Layer**: Mongoose schema enums, required fields, and type casting in [Lead.js](file:///c:/Users/Anirudh%20thakur/OneDrive/Desktop/Leaddesk-mini/src/models/Lead.js).

---

## 14. Security Measures

- **NoSQL Injection Guard**: String sanitizer removes curly braces (`{}`) to prevent MongoDB query operator injections.
- **XSS Protection**: HTML tags stripped before DB persistence; React auto-escapes rendered text.
- **Security Headers**: CSP, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`.
- **Audit Logging**: [logger.js](file:///c:/Users/Anirudh%20thakur/OneDrive/Desktop/Leaddesk-mini/src/utils/logger.js) masks passwords, tokens, URIs, and secrets.
- **Windows DNS Fix**: Custom Google DNS SRV resolver in `src/lib/db.js` prevents local Windows ISP DNS blocks.

---

## 15. Performance Optimizations

- **Static Generation**: Next.js prerenders static shell pages (`✓ Generating static pages 10/10`).
- **Single-Pass Array Analytics**: Metrics calculated in a single memory pass without querying MongoDB 4 separate times.
- **Connection Caching**: Global Mongoose connection caching prevents pool multiplication during development hot-reloads.

---

## 16. Responsive & Accessibility Design

- **Breakpoints**: Tested across Mobile (360px), Tablet (768px), and Desktop (1440px).
- **Accessibility**: Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<table>`, `<footer>`), high contrast text ratios, and keyboard focus outlines.

---

## 17. Project Workflow

```text
Visitor
  │
  ▼
Fills Lead Form on Landing Page (/)
  │
  ▼
POST /api/leads ➔ Rate Limiter Check ➔ Input Sanitization & Validation
  │
  ▼
Lead Saved to MongoDB Atlas (leaddesk-mini.leads) ➔ Email Alert Dispatched
  │
  ▼
Admin Logs In at /login (admin@leaddesk.com / AdminPassword123!)
  │
  ▼
JWT Cookie Set (HttpOnly, SameSite=Strict) ➔ Redirected to /admin
  │
  ▼
Admin Filters Leads ➔ Toggles Status (New -> Contacted -> Closed) ➔ Exports CSV
```

---

## 18. Architectural Design Decisions

1. **Why Next.js App Router**: Unified full-stack framework offering built-in API gateways, middleware, and fast static generation.
2. **Why MongoDB & Mongoose**: Flexible schema model for lead payloads paired with strict validation enums.
3. **Why JWT in HttpOnly Cookies**: Protection against XSS token theft compared to `localStorage`.
4. **Why Tailwind CSS**: Rapid development of modern glassmorphic UI designs with responsive breakpoints.
5. **Why Layered Architecture**: Separates UI from business logic and database access, making the codebase scalable and maintainable.
6. **Why Soft Deletes**: Preserves historical data audit logs while removing records from active admin views.
7. **Why 12 Bcrypt Salt Rounds**: Exceeds standard 10 rounds to protect admin credentials against GPU brute-forcing.
8. **Why Custom DNS SRV Resolver**: Resolves MongoDB Atlas shard hostnames via Google DNS (`8.8.8.8`) to eliminate Windows ISP `ECONNREFUSED` connection failures.
9. **Why Sliding-Window Rate Limiting**: Throttles submission and login endpoints to prevent spam and brute-force attacks.
10. **Why CSV Exporter**: Provides immediate practical utility for exporting leads into external agency CRMs.

---

## 19. Challenges Faced & Solutions

- **Windows ISP DNS SRV Lookup Failures (`ECONNREFUSED`)**: Resolved by implementing an async Google DNS SRV resolver in [src/lib/db.js](file:///c:/Users/Anirudh%20thakur/OneDrive/Desktop/Leaddesk-mini/src/lib/db.js).
- **Dollar Sign Budget String Sanitization**: Updated input string sanitizer to preserve currency signs (`$`) in budget ranges like `$5,000 - $10,000`.
- **MongoDB Lazy Database Instantiation**: Created an automated database initializer to seed default records (`admin@leaddesk.com` and initial test lead) into `leaddesk-mini`.

---

## 20. Future Engineering Roadmap

- [ ] **Redis Rate Limiting**: Replace in-memory rate limiter with Upstash Redis for multi-region serverless deployments.
- [ ] **Sentry Error Tracking**: Add real-time production exception monitoring.
- [ ] **Playwright E2E Tests**: Add end-to-end browser test suites covering lead submission and admin login workflows.
- [ ] **RBAC Multi-Role Support**: Expand admin roles into SuperAdmin and LeadViewer.

---

## 21. Deployment Guide

### Vercel Deployment (1-Click)
1. Import repository `https://github.com/anirudhthakur-07/LeadDesk-Mini.git` on Vercel.
2. Set Environment Variables:
   - `MONGODB_URI` = `your_mongodb_atlas_connection_uri`
   - `JWT_SECRET` = `your_production_jwt_secret`
3. Click **Deploy**.

---

## 22. Testing & Quality Assurance

Automated unit tests validate the payload validation layer:
```bash
npm run test
```
- Tests cover valid lead payloads, email regex verification, budget enum enforcement, and ObjectId formatting ([leadValidator.test.js](file:///c:/Users/Anirudh%20thakur/OneDrive/Desktop/Leaddesk-mini/src/validators/__tests__/leadValidator.test.js)).

---

## 23. Contributing

Contributions are welcome! Please follow these steps:
1. Fork the Repository.
2. Create a Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit Changes (`git commit -m 'feat: Add AmazingFeature'`).
4. Push to Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 24. License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 25. Author & Contact

**Anirudh Thakur**  
- **GitHub**: [github.com/anirudhthakur-07](https://github.com/anirudhthakur-07)  
- **Repository**: [LeadDesk-Mini](https://github.com/anirudhthakur-07/LeadDesk-Mini)  

---

## 26. Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Digital Heroes Training Program](https://digitalheroesco.com)

---

## 27. AI Usage Disclosure

> In accordance with the Digital Heroes internship instructions, AI assistance (Google Antigravity & Gemini) was utilized during the project for concept pressure-testing, debugging Windows DNS network edge cases, generating documentation templates, and code structure reviews. All architecture design decisions, layered code implementations, database configuration, security hardening, manual testing, and final code reviews were driven and executed by the developer.

---

## 28. Final Summary

**LeadDesk Mini** demonstrates modern full-stack web engineering by combining responsive glassmorphic UI design with a secure, 6-tier layered backend architecture. Built with Next.js 14, MongoDB Atlas, Tailwind CSS, and JWT authentication, it delivers an enterprise-grade solution for digital agency lead capture and pipeline management.
