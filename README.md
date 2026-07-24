# 🚀 LeadDesk Mini — Full-Stack Lead Management System

Built for the **Digital Heroes Internship Qualification Task** for the **Full Stack Development** role.

Live Demo: `[YOUR_VERCEL_DEPLOYED_URL]`  
Admin URL: `[YOUR_VERCEL_DEPLOYED_URL]/admin`  
Mandatory Credit: `Built for Digital Heroes Training Task` (linked in footer to https://digitalheroesco.com)

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router) in JavaScript / ES6
- **Styling**: Tailwind CSS (Dark Glassmorphic UI with responsive layouts)
- **Icons**: Lucide React Icons
- **Database**: MongoDB Atlas with Mongoose ORM
- **Authentication**: JWT signed tokens stored in `HttpOnly` cookies with `bcryptjs` password hashing
- **Security**: In-memory IP rate limiting, NoSQL injection protection, XSS sanitization, and security HTTP headers

---

## 📐 Data Model & Auth Approach

### 1. Data Model (`Mongoose`)
- **`Lead` Model** (`src/models/Lead.js`):
  - `fullName`: String (Required, 2-100 chars)
  - `email`: String (Required, valid email format)
  - `budgetRange`: Enum (`$1,000 - $5,000`, `$5,000 - $10,000`, `$10,000+`)
  - `message`: String (Required, 10-1000 chars)
  - `status`: Enum (`New`, `Contacted`, `Closed`, default: `New`)
  - `timestamps`: `createdAt`, `updatedAt`

- **`Admin` Model** (`src/models/Admin.js`):
  - `email`: String (Required, unique, lowercase)
  - `password`: String (Required, bcrypt hashed)

### 2. Auth Approach (`JWT` + `HttpOnly` Cookies)
- Admin login (`/api/auth/login`) verifies credentials using `bcrypt.compare`.
- Upon successful login, a signed JWT token is placed in an `HttpOnly`, `SameSite=Lax`, `Path=/` cookie (`leaddesk_token`).
- Next.js Middleware (`middleware.js`) protects `/admin` and API routes (`/api/leads`).
- Automatic seeding logic (`src/lib/seed.js`) creates the default admin user upon first API invocation if missing:
  - **Email**: `admin@leaddesk.com`
  - **Password**: `AdminPassword123!`

---

## 🚀 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/leaddesk-mini.git
   cd leaddesk-mini
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_jwt_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Live Verification & Deployment

- **Footer Credit**: Contains the required credit line: `Built for <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer">Digital Heroes Training Task</a>`.
- **Deployment**: Deployed on Vercel with MongoDB Atlas.
