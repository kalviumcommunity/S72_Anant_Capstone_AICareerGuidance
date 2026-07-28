# CareerBoat – Technical Interview Breakdown

A structured, interview-ready deep-dive into the CareerBoat AI Career Guidance System.

---

## Table of Contents

1. [High-Level Overview](#1-high-level-overview)
2. [System Architecture](#2-system-architecture)
3. [Technical Decisions](#3-technical-decisions)
4. [Authentication & Authorization](#4-authentication--authorization)
5. [State Management (Frontend)](#5-state-management-frontend)
6. [Performance Considerations](#6-performance-considerations)
7. [Challenges Faced](#7-challenges-faced)
8. [Scalability Considerations](#8-scalability-considerations)
9. [Deployment](#9-deployment)
10. [Improvements](#10-improvements)

---

## 1. High-Level Overview

### What Problem Does It Solve?

Most students and early-career professionals struggle to identify suitable career paths due to a lack of personalised guidance. Generic job boards and static career counselling resources fail to account for individual interests, personality traits, and real-world market demand. CareerBoat solves this by providing an AI-driven career assessment that analyses a user's responses and returns personalised career recommendations, complete with required skills, education pathways, job outlook, and top companies — all in one interactive platform.

### Who Is the Target User?

| User Type | Description |
|-----------|-------------|
| Students | High-school or college students exploring career options for the first time |
| Early-career professionals | Graduates unsure of specialisation or looking for a pivot |
| Career changers | Experienced professionals who want to transition industries |

### Core Features

- **Dynamic Career Assessment Quiz** – A multi-question quiz (MCQ and free-text) that collects user interests, skills, and preferences.
- **AI-Powered Recommendations** – Google Gemini AI processes quiz responses and returns structured career suggestions (title, description, education requirements, career paths, required skills, job outlook, top companies).
- **User Authentication** – Dual auth: local email/password (JWT + bcrypt) and Google OAuth (Firebase + backend JWT sync).
- **Personalised Dashboard / Profile** – Shows full test history with all past recommendations; supports profile picture upload.
- **Protected Routes** – Assessment and profile pages are gated behind authentication.
- **Responsive UI** – Built with Tailwind CSS for a mobile-first experience.

---

## 2. System Architecture

### High-Level Diagram

```
┌─────────────────────────┐         ┌──────────────────────────┐        ┌─────────────────────┐
│                         │  HTTPS  │                          │        │                     │
│  React Frontend (Vite)  │◄───────►│  Express.js REST API     │◄──────►│  MongoDB Atlas      │
│  Netlify CDN            │         │  Render.com              │        │  (Mongoose ODM)     │
│                         │         │                          │        │                     │
└─────────────────────────┘         └─────────────┬────────────┘        └─────────────────────┘
         │                                        │
         │ Firebase SDK (Google OAuth)            │ Google Generative AI SDK
         ▼                                        ▼
┌─────────────────────┐             ┌──────────────────────────┐
│  Firebase Auth      │             │  Google Gemini AI        │
│  (Google Identity)  │             │  (gemini-2.5-flash)      │
└─────────────────────┘             └──────────────────────────┘
```

### Frontend Structure

```
Frontend/src/
├── App.jsx                  # Root component; defines all routes and wraps with AuthProvider
├── main.jsx                 # React entry point (ReactDOM.createRoot)
├── firebase.js              # Firebase app initialisation and Auth/GoogleProvider export
├── Components/
│   ├── AuthProvider.jsx     # React Context provider; listens to Firebase onAuthStateChanged
│   ├── ProtectedRoute.jsx   # HOC that redirects unauthenticated users to /login
│   ├── header.jsx           # Global navigation bar
│   ├── nav.jsx              # Navigation links
│   ├── footer.jsx           # Footer
│   ├── LoadingSpinner.jsx   # Reusable loading indicator
│   └── BackToTop.jsx        # Scroll-to-top button
├── Pages/
│   ├── landing.jsx          # Public landing/home page
│   ├── login.jsx            # Login form (local + Google OAuth)
│   ├── signup.jsx           # Registration form
│   ├── test.jsx             # Career assessment quiz + AI results display
│   ├── Profile.jsx          # User profile with test history
│   └── aboutMe.jsx          # Static about page
├── Routes/
│   └── routes.js            # Lazy/named exports for all page components
├── Styles/
│   └── Styles.css           # Global CSS (Tailwind directives + custom overrides)
└── assets/                  # Static images and icons
```

### Backend Structure

```
Backend/
├── server.js                # Express app setup, MongoDB connection, route mounting
├── routes/
│   ├── auth.js              # /api/auth — signup, login, Google OAuth sync, /me, logout
│   ├── questions.js         # /api/questions — CRUD for quiz questions
│   ├── ai.js                # /api/ai — direct AI invocation endpoint
│   └── user.js              # /api/user — profile pic upload, test history, submit-response
├── controller/
│   └── ai.js                # Core AI logic: builds Gemini prompt, calls API, parses JSON
├── models/
│   ├── user.model.js        # User schema (name, email, password, authMethod, testHistory, profilePicture)
│   ├── question.model.js    # Question schema (text, type, options, category)
│   ├── result.model.js      # Result schema
│   ├── test.model.js        # Test schema
│   └── userResponse.model.js# UserResponse schema
├── middleware/
│   ├── auth.js              # JWT verification middleware (Bearer token)
│   └── emailValidator.js    # Email format validation middleware
└── uploads/                 # Local directory for profile picture files (served statically)
```

### Database Design (MongoDB)

#### `User` Collection

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email` | String | Required, unique index |
| `password` | String | bcrypt hash; empty for OAuth users |
| `authMethod` | Enum (`local`, `google`) | Distinguishes auth strategy |
| `role` | Enum (`user`, `admin`) | Default: `user` |
| `testHistory` | Array of subdocuments | Each entry: `{ date, recommendations[] }` |
| `profilePicture` | String | URL path to uploaded image |
| `createdAt` | Date | Auto-set on creation |

`testHistory` subdocument — `recommendations[]`:

| Field | Type |
|-------|------|
| `title` | String |
| `description` | String |
| `education_requirements` | String |
| `job_outlook` | [String] |
| `career_paths` | [String] |
| `required_skills` | [String] |
| `best_companies` | [String] |

#### `Question` Collection

| Field | Type | Notes |
|-------|------|-------|
| `text` | String | Required, unique |
| `type` | Enum (`mcq`, `text`) | Default: `mcq` |
| `options` | [String] | MCQ choices |
| `category` | String | Required |
| `createdAt` | Date | Auto-set |

### Data Flow: Frontend → Backend

```
1. User completes quiz in test.jsx
      ↓
2. Frontend maps answers to { questionId, questionText, answer } array
      ↓
3. POST /api/user/submit-response  (Authorization: Bearer <jwt>)
      ↓
4. auth.js middleware verifies JWT → attaches req.user.userId
      ↓
5. user.js route handler calls runAI(answers) in controller/ai.js
      ↓
6. buildPrompt() constructs a structured prompt for Gemini
      ↓
7. Google Generative AI SDK calls gemini-2.5-flash model
      ↓
8. Response text is stripped of markdown fences; JSON.parse() extracts array
      ↓
9. Recommendations are pushed to user.testHistory in MongoDB
      ↓
10. { recommendations: [...] } returned to frontend
      ↓
11. test.jsx renders career cards from aiResult.career_recommendations
```

---

## 3. Technical Decisions

### Why This Stack Was Chosen

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend framework | React 19 | Component model fits complex quiz + result UI; large ecosystem |
| Build tool | Vite 6 | Significantly faster HMR and build times than CRA/Webpack |
| Styling | Tailwind CSS 4 | Utility-first; rapid responsive design without custom CSS files |
| Routing | React Router DOM 7 | De-facto standard for SPA routing; supports nested/protected routes |
| HTTP client | Axios + native `fetch` | Axios for most requests; `fetch` used in submit flow for streaming compatibility |
| Backend framework | Express.js 4 | Minimal, flexible, widely understood; suitable for REST APIs |
| Database | MongoDB + Mongoose | Schema-flexible; AI response shape may evolve; JSON-native storage |
| AI integration | Google Gemini (`gemini-2.5-flash`) | Powerful reasoning for career matching; structured JSON output capability |
| Auth (local) | JWT + bcrypt | Stateless tokens; bcrypt with salt rounds for secure password storage |
| Auth (OAuth) | Firebase Authentication | Handles Google OAuth token exchange; no need to manage OAuth secrets on backend |
| File upload | Multer | Standard Express middleware; handles multipart/form-data with disk storage |
| Containerisation | Docker + Docker Compose | Reproducible dev/prod environments; single-command multi-service startup |

### Trade-offs

| Decision | Trade-off |
|----------|-----------|
| JWT stored in `localStorage` | Convenient but vulnerable to XSS; `httpOnly` cookies would be more secure |
| Gemini AI called synchronously per request | Simple but no queue/retry mechanism; long AI response times affect UX |
| Profile pictures stored on local disk (`uploads/`) | Easy to implement but does not persist across container restarts; S3/GCS preferred in production |
| MongoDB embedded `testHistory` array | Avoids JOIN complexity but can grow unbounded; large histories slow user document reads |
| Firebase Auth + backend JWT sync | Dual token system adds complexity (two auth flows to maintain) |
| No caching layer | Simplifies architecture but adds repeated AI API costs and latency |

### Why Not Alternative Approaches

| Alternative | Why Not Chosen |
|-------------|---------------|
| Next.js (SSR) | App is fully client-authenticated; SSR adds complexity without clear SEO benefit for authenticated pages |
| PostgreSQL / MySQL | AI response shape is variable and nested; relational schema would require frequent migrations |
| OpenAI GPT | Google Gemini has a generous free tier suitable for a student capstone project |
| Passport.js | Firebase handles the full OAuth flow client-side, reducing backend OAuth boilerplate |
| Redux | Application state is simple (user + quiz state); React Context + `useState` is sufficient |
| Express sessions | JWT is stateless and works well for the decoupled frontend deployment on Netlify |

---

## 4. Authentication & Authorization

### How Login Works

#### Local Auth (Email/Password)

```
1. User submits email + password to POST /api/auth/login
2. emailValidator middleware checks email format
3. User.findOne({ email }) locates the record
4. bcrypt.compare(password, user.password) validates the hash
5. jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '24h' }) issues a token
6. Token returned in response body; frontend stores in localStorage as 'jwtToken'
7. Firebase Auth is NOT involved in local login
```

#### Google OAuth

```
1. User clicks "Sign in with Google" in login.jsx
2. Firebase SDK triggers Google sign-in popup (signInWithPopup)
3. Firebase returns a verified user object with email and displayName
4. Frontend posts { email, name } to POST /api/auth/google
5. Backend upserts user in MongoDB (creates if new, finds if existing)
6. Backend issues its own JWT (same format as local auth)
7. Both the Firebase user object (in AuthContext) and the backend JWT (in localStorage) are stored
```

#### Logout

```
1. Firebase signOut() clears the Firebase session
2. localStorage.removeItem('jwtToken') clears the backend JWT
3. AuthContext user is set to null
4. POST /api/auth/logout notifies the backend (stateless acknowledgement)
```

### Token Handling

- **Storage**: `localStorage` under the key `jwtToken`
- **Transmission**: `Authorization: Bearer <token>` header on every protected API call
- **Verification**: `middleware/auth.js` calls `jwt.verify(token, process.env.JWT_SECRET)`; decoded `userId` is attached to `req.user`
- **Expiry**: 24-hour lifetime; no refresh token mechanism currently implemented

### Security Measures

| Measure | Implementation |
|---------|---------------|
| Password hashing | bcrypt with 10 salt rounds |
| Token signing | HMAC-SHA256 via `jsonwebtoken`; secret stored in `JWT_SECRET` env var |
| CORS restriction | Only `https://careerboat.netlify.app` and `http://localhost:5173` are allowed |
| Email validation | Custom `emailValidator` middleware on signup route |
| Auth gate on sensitive routes | `auth.js` middleware applied to all `/api/user/*` routes |
| File type validation | Multer `fileFilter` restricts uploads to JPEG/JPG/PNG MIME types |
| Environment variables | All secrets (API keys, DB URI, JWT secret) loaded via `dotenv`; never hard-coded |

---

## 5. State Management (Frontend)

### How Data Is Stored

| State Type | Location | Mechanism |
|------------|----------|-----------|
| Authenticated user (Firebase) | `AuthContext` (React Context) | `onAuthStateChanged` listener sets `user` state |
| Backend JWT token | `localStorage` | Persists across browser sessions |
| Quiz questions | `test.jsx` local state (`useState`) | Fetched on component mount |
| User answers | `test.jsx` local state (`answers` object) | Keyed by `question._id` |
| AI results | `test.jsx` local state (`aiResult`) | Set after successful API response |
| Profile / test history | `Profile.jsx` local state | Fetched from `/api/user/tests` on mount |

### How Loading / Error States Are Handled

```jsx
// Typical pattern used throughout the app (example from test.jsx)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const res = await axios.get('/api/questions')
      setQuestions(res.data)
    } catch (err) {
      setError('Failed to fetch questions')
    } finally {
      setLoading(false)   // Always clears loading, success or failure
    }
  }
  fetchQuestions()
}, [])
```

- **Loading**: A `loading` boolean gate renders a spinner or inline text while async operations are pending
- **Error**: An `error` string is rendered as red text; the main content is hidden until `!error`
- **Submitting**: A separate `submitting` boolean disables the submit button and shows `'Analyzing...'` to prevent double-submission
- **Auth loading**: `AuthProvider` exposes a `loading` flag; `ProtectedRoute` waits for this to resolve before redirecting, preventing a flash of the login page for already-authenticated users

---

## 6. Performance Considerations

### Caching

- **No server-side caching** is currently implemented. Each AI request hits the Gemini API fresh.
- **Browser cache**: Static assets served by Netlify's CDN are cached at the edge with long `Cache-Control` TTLs (handled automatically by Netlify).
- **Opportunity**: Identical quiz answer sets could be cached server-side (Redis) to avoid redundant AI calls.

### Optimisations

| Optimisation | Detail |
|-------------|--------|
| Vite bundler | Production build produces optimised, tree-shaken chunks with content hashing |
| Tailwind CSS purging | Vite + Tailwind 4 automatically removes unused CSS classes in production builds |
| React 19 | Latest concurrent rendering features improve perceived performance |
| Lazy component splitting | `Routes/routes.js` centralises imports; can easily be extended with `React.lazy` |
| Minimised re-renders | Local `useState` per page avoids global re-renders for unrelated state changes |

### Pagination / Lazy Loading

- **Test history** is currently fetched in full (`user.testHistory` array) and rendered all at once.
- **Questions** are fetched all at once and navigated one-by-one client-side (no server-side pagination needed given the small question count).
- **Opportunity**: For users with many past tests, server-side pagination on `GET /api/user/tests` with `?page=` and `?limit=` parameters would be the natural improvement.

---

## 7. Challenges Faced

### Technical Issues

| Challenge | Resolution |
|-----------|-----------|
| **Gemini AI returning markdown-fenced JSON** | Added text post-processing in `controller/ai.js` to find the first `[` and last `]` and slice out the pure JSON array |
| **Dual auth systems (Firebase + backend JWT)** | On Google login, the frontend POSTs the Firebase-verified email/name to the backend, which issues its own JWT — keeping the backend stateless and independent of Firebase |
| **CORS errors in development and production** | Explicitly listed allowed origins in `server.js` CORS config; used environment variables to manage origin differences |
| **Multer file type validation** | Added both MIME type and file extension checks in the `fileFilter` to prevent disguised file uploads |
| **MongoDB connection resilience** | Configured `serverSelectionTimeoutMS`, `socketTimeoutMS`, and `heartbeatFrequencyMS` for more reliable Atlas connections |

### Debugging Problems

| Problem | Root Cause | Fix |
|---------|-----------|-----|
| AI response not rendering | `data.recommendations` vs `data.career_recommendations` shape mismatch | Added array-detection logic in `test.jsx` to handle both shapes |
| Token not sent to backend | `localStorage` key name mismatch between login and test pages | Standardised the key to `'jwtToken'` across all pages |
| Profile picture not persisting | Container filesystem is ephemeral | Documented as a known limitation; cloud storage recommended for production |

### Architecture Problems

- **No separation of concerns for AI logic**: The AI controller is called directly from a route handler; ideally this would go through a service layer.
- **Mixed use of `axios` and native `fetch`**: `axios` is used for GET requests in most pages, but `fetch` is used in the quiz submission. This inconsistency adds cognitive overhead.
- **Test history stored inside the user document**: Embedding recommendations directly in the User document means reads of the user profile always load the entire history, regardless of whether it is needed.

---

## 8. Scalability Considerations

### What Happens if Users Increase 100×?

| Layer | Current Limit | Impact at 100× Scale |
|-------|-------------|---------------------|
| Express backend (Render free tier) | Single instance, cold starts | Cold starts and memory limits become bottlenecks |
| MongoDB Atlas free cluster | 512 MB storage | Storage and IOPS limits hit; needs upgrade to M10+ |
| Google Gemini API | Rate-limited by API key | Concurrent requests may hit quota; needs request queuing |
| Netlify CDN | Generous free tier | Generally handles scale well; no immediate concern |
| Local file storage (`uploads/`) | Disk on single container | Lost on redeploy; cannot be shared across multiple instances |

### Bottlenecks

1. **AI API calls** – Each quiz submission makes a synchronous, potentially 5–15 second call to Gemini. Under load, this creates a queue of blocked requests.
2. **MongoDB user document size** – Embedding test history in the user document means the document grows with every submission, slowing reads and writes.
3. **Single Express process** – No horizontal scaling or clustering; a single CPU-bound AI response blocks the event loop.

### Improvements Needed for Scale

| Improvement | Benefit |
|-------------|---------|
| Move AI calls to an async job queue (e.g., BullMQ + Redis) | Non-blocking; frontend polls or uses WebSockets for results |
| Extract `testHistory` into a separate `TestResult` collection | Smaller user documents; paginated history queries |
| Add a Redis caching layer for quiz questions and repeated AI results | Reduces DB load and AI API costs |
| Horizontally scale Express with PM2 cluster mode or Kubernetes | Better CPU utilisation; no single point of failure |
| Migrate profile pictures to AWS S3 or Cloudinary | Persistent, scalable, CDN-delivered media storage |
| Add rate limiting middleware (e.g., `express-rate-limit`) | Prevents abuse of AI endpoint |
| Implement refresh tokens | Avoids forced re-login after 24-hour JWT expiry |

---

## 9. Deployment

### Hosting

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend | Netlify (CDN) | `https://careerboat.netlify.app` |
| Backend | Render.com | `https://s72-anant-capstone-aicareerguidance.onrender.com` |
| Database | MongoDB Atlas | Cloud-hosted cluster (free M0 tier) |

### Docker / Docker Compose

The project ships with a `docker-compose.yml` that spins up both services for local or self-hosted production deployment:

```yaml
services:
  backend:
    build: ./Backend      # Uses Backend/Dockerfile
    ports: ["5000:5000"]
    env_file: ./Backend/.env
    restart: unless-stopped
    networks: [app-network]
  frontend:
    build: ./Frontend     # Uses Frontend/Dockerfile (Vite preview build)
    ports: ["4173:4173"]
    depends_on: [backend]
    networks: [app-network]
```

```bash
# Start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop
docker-compose down
```

### CI/CD

- **Version Control**: GitHub (`kalviumcommunity/S72_Anant_Capstone_AICareerGuidance`)
- **Netlify CD**: Netlify auto-deploys the `Frontend` directory on every push to `main`; build command is `npm run build`, publish directory is `dist`
- **Render CD**: Render auto-deploys the `Backend` directory on every push to `main`
- **Testing**: Jest test suite in `Backend/` (`npm test`); tests cover model schemas and AI controller logic

### Environment Variables

#### Backend (`Backend/.env`)

| Variable | Purpose |
|----------|---------|
| `PORT` | Express server port (default: 5000) |
| `MONGO_URL` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing/verifying JWTs |
| `API_KEY` | Google Generative AI (Gemini) API key |
| `NODE_ENV` | `development` or `production` |

#### Frontend (`Frontend/.env`)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend API base URL |
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

---

## 10. Improvements

Given more time, the following improvements would be prioritised:

### High Priority

| Improvement | Reason |
|-------------|--------|
| **Move JWT to `httpOnly` cookies** | Eliminates XSS-based token theft risk |
| **Implement refresh tokens** | Users are not forced to re-authenticate every 24 hours |
| **Async AI job queue (BullMQ)** | Decouples long AI processing from the HTTP request/response cycle |
| **Migrate media storage to Cloudinary or AWS S3** | Profile pictures persist across deployments and scale horizontally |
| **Input sanitisation and rate limiting** | Prevents injection attacks and API abuse |

### Medium Priority

| Improvement | Reason |
|-------------|--------|
| **Extract test history to its own collection** | Prevents unbounded growth of the User document |
| **Add `React.lazy` + `Suspense` for route-level code splitting** | Reduces initial bundle size and improves Time-to-Interactive |
| **Environment-driven API base URL** | Currently the backend URL is hardcoded in `test.jsx`; should read from `VITE_API_URL` |
| **Add frontend testing (Vitest + React Testing Library)** | No frontend tests currently exist |
| **Add pagination to test history API** | Prevents slow profile loads for power users |

### Nice to Have

| Improvement | Reason |
|-------------|--------|
| **AI response streaming** | Show recommendations appearing progressively instead of waiting for the full response |
| **Compare careers side-by-side** | Lets users evaluate multiple recommendations together |
| **Email notifications** | Send recommendations to the user's email after quiz completion |
| **Admin dashboard** | View/manage questions, users, and aggregate recommendation trends |
| **Progressive Web App (PWA)** | Offline support and home-screen installability for mobile users |

---

*This document was prepared as a technical reference for defending the CareerBoat capstone project in a technical interview.*
