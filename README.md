# LeadDesk Mini — Lead Management System

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#10-license)

LeadDesk Mini is a full-stack web application designed for digital agencies to capture, organize, and manage client inquiries. Built with Next.js, React, Tailwind CSS, and MongoDB, it provides a public landing page with validated lead capture forms and a protected management dashboard for agency operations.

---

## 1. Project Overview

LeadDesk Mini provides a centralized lead management platform that replaces static contact forms with a real-time lead pipeline.

### Core Value & Workflow
- **Public Lead Capture**: Visitors submit project inquiries through a responsive, real-time validated form.
- **Automated Processing**: Submissions pass through validation layers before storage in a MongoDB database.
- **Admin Dashboard**: Authorized agency personnel search, filter, and manage lead statuses (`New`, `Contacted`, `Closed`).
- **Data Exporting**: One-click CSV export enables seamless CRM integration.

---

## 2. Features

### Public Landing Page
- Modern agency landing page with hero, services, and value propositions.
- Real-time client and server-side form validation for name, email, budget range, and project message.
- Instant user feedback notifications upon submission.

### Admin Dashboard
- Protected dashboard accessible only to authenticated administrators.
- Live metric cards displaying total, new, contacted, and closed leads.
- Real-time search by name or email with status filter tabs.
- Interactive status dropdown updating lead stages live without full page reloads.
- CSV data exporter for offline reporting.

---

## 3. Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Full-stack architecture, SSR, and API route handlers. |
| **Frontend** | React 18 & Lucide Icons | Component UI and modern icon system. |
| **Styling** | Tailwind CSS 3.4 | Dark glassmorphism styling and responsive layout utilities. |
| **Database** | MongoDB & Mongoose ORM | Scalable document store with schema validation. |
| **Authentication** | JWT & `bcryptjs` | Secure session management and password hashing. |
| **Testing** | Vitest | Unit testing suite for validators and business logic. |

---

## 4. System Architecture

![System Architecture Diagram](public/architecture_diagram.jpg)

### Layered Architecture Flow
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

## 5. Project Structure

```text
src/
├── app/
│   ├── admin/                # Admin Dashboard page
│   ├── api/
│   │   ├── auth/             # Authentication endpoints
│   │   └── leads/            # Lead management endpoints
│   ├── login/                # Admin Login page
│   ├── globals.css           # Global Tailwind & glassmorphism styles
│   ├── layout.js             # Root application layout
│   └── page.js               # Public Landing page
├── components/               # Reusable UI components
├── constants/                # Shared application constants
├── lib/                      # Database & authentication helpers
├── models/                   # Mongoose database schemas
├── repositories/             # Data access abstraction layer
├── services/                 # Application business logic layer
├── utils/                    # Utility functions and security headers
└── validators/               # Input validation logic & unit tests
```

---

## 6. Environment Variables

Create a `.env.local` file in your root folder using placeholders:

```env
# Database Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leaddesk-mini?retryWrites=true&w=majority

# JWT Authentication Secret
JWT_SECRET=your_jwt_secret_key_here

# Password Hashing Cost
BCRYPT_ROUNDS=12

# Environment Mode
NODE_ENV=development
```

> ⚠️ Never commit `.env` or `.env.local` files to source control.

---

## 7. Authentication Overview

LeadDesk Mini utilizes JSON Web Token (JWT) session authentication:
- **Credentials Validation**: Admin logins are verified against hashed credentials stored in MongoDB.
- **Session Tokens**: Upon successful authentication, a signed JWT session cookie is issued.
- **Route Guarding**: Next.js middleware guards protected routes (`/admin` and admin API endpoints), redirecting unauthorized users to the login screen.
- **Session Termination**: Logging out invalidates the session cookie.

---

## 8. API Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/leads` | Submit a new lead inquiry | No |
| `GET` | `/api/leads` | Retrieve leads and analytics | **Yes** |
| `PATCH` | `/api/leads/[id]` | Update lead status (`New`, `Contacted`, `Closed`) | **Yes** |
| `DELETE` | `/api/leads/[id]` | Soft-delete a lead record | **Yes** |
| `POST` | `/api/auth/login` | Authenticate administrator | No |
| `GET` | `/api/auth/me` | Check session authentication status | **Yes** |
| `POST` | `/api/auth/logout` | Terminate session and clear cookie | No |

---

## 9. Author

- **GitHub**: [github.com/anirudhthakur-07](https://github.com/anirudhthakur-07)
- **Repository**: [LeadDesk-Mini](https://github.com/anirudhthakur-07/LeadDesk-Mini)

---

## 10. License

Distributed under the **MIT License**. See `LICENSE` for details.
