# Portfolio Website — Aditya Rai

A full-stack personal portfolio built with **React (Vite) + Express + MongoDB + Groq AI**.

![Portfolio Screenshot](frontend/public/Profile.png)

## ✨ Features

- **Hero Section** with typewriter animation
- **About / Skills / Projects / Experience / Certificates** sections
- **AI Chat Bot** — floating widget powered by Groq API (multi-model fallback)
- **Admin Dashboard** — login-protected CRUD for all portfolio data
- **Contact Form** — sends messages with fallback `mailto:` link
- **WhatsApp Button** — floating quick-contact link
- **Responsive Design** — Tailwind CSS with dark neon theme
- **Scroll Animations** — reveal sections on scroll using Intersection Observer

---

## 🏗 Architecture

```
portfolio-website/
├── api/                        # Vercel serverless entry point
│   └── index.js                # Wraps Express app with cached DB connection
├── backend/                    # Express REST API
│   ├── config/
│   │   └── db.js               # Mongoose connection (with Vercel caching)
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # Admin user (bcrypt hashed password)
│   │   ├── Profile.js          # Singleton profile document
│   │   ├── Project.js          # Project schema
│   │   ├── Certificate.js      # Certificate schema
│   │   ├── Skill.js            # Skill schema
│   │   ├── Experience.js       # Experience schema
│   │   └── Achievement.js      # Achievement schema
│   ├── routes/
│   │   ├── auth.js             # POST /login, GET /me
│   │   ├── profile.js          # GET /, PUT / (multipart)
│   │   ├── projects.js         # Full CRUD
│   │   ├── certificates.js     # Full CRUD + file upload
│   │   ├── skills.js           # Full CRUD
│   │   ├── experiences.js      # Full CRUD
│   │   ├── achievements.js     # Full CRUD
│   │   ├── contact.js          # POST / (contact form)
│   │   ├── chat.js             # POST / (Groq AI with 3-model fallback)
│   │   ├── seed.js             # POST /all (reseed all data)
│   │   └── gemini.js           # (unused)
│   ├── uploads/                # Uploaded files directory
│   └── server.js               # Express app entry point
├── frontend/                   # React SPA (Vite)
│   ├── public/                 # Static assets (resume PDF, images)
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js        # Axios instance + all API service functions
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state (React Context + JWT)
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Main portfolio page (data orchestrator)
│   │   │   ├── Admin.jsx       # Admin dashboard (generic CRUD table)
│   │   │   └── Login.jsx       # Admin login form
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Scroll-aware fixed nav
│   │   │   ├── Preloader.jsx   # Initial loading spinner
│   │   │   ├── Hero.jsx        # Hero with typewriter effect
│   │   │   ├── About.jsx       # About section
│   │   │   ├── Skills.jsx      # Skills grid by category
│   │   │   ├── Projects.jsx    # Project cards
│   │   │   ├── Experience.jsx  # Timeline
│   │   │   ├── Certificates.jsx# Certificate cards
│   │   │   ├── Contact.jsx     # Contact form + footer
│   │   │   ├── ChatBot.jsx     # Floating AI chat widget
│   │   │   ├── WhatsAppButton.jsx # Floating WhatsApp link
│   │   │   └── ScrollToTop.jsx # Back-to-top button
│   │   ├── main.jsx            # React entry (BrowserRouter)
│   │   ├── App.jsx             # Root component (AuthProvider, Routes)
│   │   └── index.css           # Tailwind directives + custom styles
│   ├── index.html
│   ├── vite.config.js          # Vite config (port 3000, proxy /api → :5000)
│   ├── tailwind.config.js      # Custom dark neon theme
│   └── package.json
├── .gitignore
├── vercel.json                 # Vercel deployment config
└── package.json                # Root scripts
```

### Data Flow

```
Browser → Vite Dev Server (:3000) → Proxy → Express API (:5000) → MongoDB Atlas
                                                       ↓
                                                  Groq API (chat)
```

### Frontend Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Main portfolio (all sections) |
| `/login` | `Login.jsx` | Admin login |
| `/admin` | `Admin.jsx` | Protected CRUD dashboard |

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login → JWT |
| `GET` | `/api/auth/me` | Get current admin |
| `GET` | `/api/profile` | Get profile |
| `PUT` | `/api/profile` | Update profile |
| `GET` | `/api/projects` | List projects |
| `POST/PUT/DELETE` | `/api/projects/:id` | CRUD projects |
| `GET` | `/api/skills` | List skills |
| `POST/PUT/DELETE` | `/api/skills/:id` | CRUD skills |
| `GET` | `/api/experiences` | List experiences |
| `POST/PUT/DELETE` | `/api/experiences/:id` | CRUD experiences |
| `GET` | `/api/certificates` | List certificates |
| `POST/PUT/DELETE` | `/api/certificates/:id` | CRUD certificates (+ file upload) |
| `GET` | `/api/achievements` | List achievements |
| `POST/PUT/DELETE` | `/api/achievements/:id` | CRUD achievements |
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/chat` | Send message to AI assistant |
| `POST` | `/api/seed/all` | Reseed all data |
| `GET` | `/api/health` | Health check |

---

## 🚀 How to Clone & Run Locally

### Prerequisites

- **Node.js** v18+
- **MongoDB Atlas** account (free tier)
- **Groq API key** (free at [console.groq.com](https://console.groq.com))

### Step 1: Clone

```bash
git clone https://github.com/your-username/portfolio-website.git
cd portfolio-website
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/portfolio
JWT_SECRET=your_super_secret_jwt_key
GROQ_API_KEY=gsk_your_groq_api_key
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=your_password
PORT=5000
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

### Step 4: Run Locally

Start the backend (terminal 1):

```bash
cd backend
npm run dev
```

Start the frontend (terminal 2):

```bash
cd frontend
npm run dev
```

Open **http://localhost:3000** in your browser.

Admin panel at **http://localhost:3000/login**.

### Step 5: Seed Admin User

The backend auto-creates an admin user on first run using the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env`. You can also reseed all data via:

```bash
# Requires auth token — login first via the /login page, then:
curl -X POST http://localhost:5000/api/seed/all \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## ☁️ Deploy to Vercel

### One-click Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Setup

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Add these **Environment Variables** in Vercel dashboard:

| Variable | Value |
|---|---|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A strong random secret |
| `GROQ_API_KEY` | Your Groq API key |
| `ADMIN_EMAIL` | Admin email (optional) |
| `ADMIN_PASSWORD` | Admin password (optional) |

5. Deploy — Vercel will detect `vercel.json` and build automatically.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router 6, Vite 5, Tailwind CSS 3 |
| **Backend** | Node.js, Express 4, Mongoose 8 |
| **Database** | MongoDB Atlas |
| **Auth** | JWT + bcryptjs |
| **AI** | Groq SDK (llama models) |
| **File Uploads** | multer |
| **Deployment** | Vercel (monorepo) |

---

## 📄 License

MIT — feel free to use this as a template for your own portfolio.
