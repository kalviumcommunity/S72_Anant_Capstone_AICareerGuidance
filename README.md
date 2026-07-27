# CareerBoat: AI-Powered Career Guidance Platform

<div align="center">

![Career Guidance](https://img.shields.io/badge/AI-Career%20Guidance-blue?style=flat-square&logo=google)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-v4.0.14-38B2AC?style=flat-square&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)
![Google Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4?style=flat-square&logo=google)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

An intelligent, full-stack career recommendation platform that provides personalized career guidance based on user personality, interests, and skills powered by Google Gemini 2.5 Flash AI.

[Live Frontend Demo](https://careerboat.netlify.app/) • [Live Backend API](https://s72-anant-capstone-aicareerguidance.onrender.com) • [Documentation](#table-of-contents)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Local Installation](#local-installation)
  - [Running with Docker Compose](#running-with-docker-compose)
- [API Documentation](#api-documentation)
- [AI Recommendation Pipeline](#ai-recommendation-pipeline)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License & Contact](#license--contact)

---

## Overview

CareerBoat is a modern web application designed to assist students and professionals in identifying suitable career paths. By combining structured assessment questionnaires, user authentication, and artificial intelligence, CareerBoat provides personalized career insights and technical roadmaps.

### Application Workflow:
1. **Interactive Assessment**: Authenticated users complete a multi-question assessment evaluating interests, skills, and technical preferences.
2. **AI Processing**: User responses are evaluated using Google's `gemini-2.5-flash` model via tailored prompt engineering.
3. **Structured Roadmaps**: The platform generates customized recommendations covering target job roles, required education, career progression paths, essential skills, top hiring companies, and market outlooks.
4. **Dashboard & Profile Management**: Assessment results are persisted to MongoDB for ongoing review, alongside user profile picture management.

---

## Key Features

- **Dynamic Career Assessment**: Interactive quiz system with step-by-step navigation and progress tracking.
- **Google Gemini AI Integration**: Real-time evaluation of assessment responses to generate structured JSON career recommendations.
- **Authentication System**: Supports local email/password registration (with email format validation) and Google OAuth authentication via Firebase.
- **User Dashboard & History**: Persisted test history allowing users to review prior assessment results at any time.
- **Profile Picture Uploads**: Avatar management supporting image uploads processed via Multer and served statically.
- **Protected Routing**: Client-side route guards enforcing JWT token authentication for sensitive pages.
- **Responsive UI/UX**: Designed using Tailwind CSS v4 to deliver a consistent experience across desktop and mobile browsers.
- **Containerized Infrastructure**: Docker and Docker Compose configuration for simplified local and server deployment.

---

## Tech Stack

### Frontend
- **Framework**: React (v19.0.0)
- **Build Tool**: Vite (v6.2.0)
- **Styling**: Tailwind CSS (v4.0.14)
- **Routing**: React Router DOM (v7.3.0)
- **HTTP Client**: Axios (v1.8.4)
- **Authentication Client**: Firebase SDK (v11.5.0)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v4.21.2)
- **Database**: MongoDB with Mongoose (v8.12.1)
- **AI SDK**: Google Generative AI (`@google/generative-ai` v0.24.1) — Model: `gemini-2.5-flash`
- **Security & Authentication**: JSON Web Tokens (`jsonwebtoken` v9.0.2), `bcrypt` (v5.1.1), `bcryptjs` (v3.0.2)
- **File Processing**: Multer (v2.0.1)

### Infrastructure & Tooling
- **Containerization**: Docker & Docker Compose
- **Backend Deployment**: Render (`https://s72-anant-capstone-aicareerguidance.onrender.com`)
- **Frontend Deployment**: Netlify (`https://careerboat.netlify.app/`)
- **Testing**: Jest (v29.7.0)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                            React 19 Frontend (Vite)                         │
│                           https://careerboat.netlify.app                    │
│                                                                             │
└───────┬───────────────────────────────┬──────────────────────────────┬──────┘
        │                               │                              │
        │ Authentication                │ REST API Requests            │ Google OAuth
        ▼                               ▼                              ▼
┌──────────────────┐           ┌──────────────────┐          ┌──────────────────┐
│                  │           │   Node / Express │          │  Firebase Auth   │
│   Local Storage  │           │   Backend Server │          │  Google Provider │
│  (JWT Token Info)│           │   (Render API)   │          └──────────────────┘
└──────────────────┘           └────────┬─────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                         ▼                             ▼
              ┌─────────────────────┐       ┌─────────────────────┐
              │  MongoDB Database   │       │ Google Gemini AI    │
              │ (Users, Questions,  │       │ (gemini-2.5-flash)  │
              │  Test History)      │       └─────────────────────┘
              └─────────────────────┘
```

---

## Project Structure

```
S72_Anant_Capstone_AICareerGuidance/
├── Backend/
│   ├── controller/
│   │   ├── ai.js                # Gemini AI prompt builder and model execution
│   │   └── ai.test.js           # Controller unit tests
│   ├── middleware/
│   │   ├── auth.js              # JWT authorization middleware
│   │   └── emailValidator.js    # Email syntax validation middleware
│   ├── models/
│   │   ├── user.model.js        # User data schema
│   │   ├── question.model.js    # Question data schema
│   │   ├── result.model.js      # Assessment result schema
│   │   ├── test.model.js        # Test schema
│   │   └── *.test.js            # Model validation unit tests
│   ├── routes/
│   │   ├── ai.js                # Direct AI recommendation route
│   │   ├── auth.js              # User authentication routes
│   │   ├── questions.js         # Questions fetch route
│   │   └── user.js              # Assessment submission, test history, profile routes
│   ├── uploads/                 # Static uploads storage
│   ├── Dockerfile               # Backend Docker container build configuration
│   ├── package.json             # Backend dependencies and scripts
│   └── server.js                # Application entry point and database connection
├── Frontend/
│   ├── public/
│   │   └── _redirects           # Netlify single-page application rewrite rules
│   ├── src/
│   │   ├── assets/              # Logos, hero images, and static graphics
│   │   ├── Components/
│   │   │   ├── AuthProvider.jsx # Authentication state provider
│   │   │   ├── ProtectedRoute.jsx# Navigation guard component
│   │   │   ├── header.jsx       # Header container component
│   │   │   ├── nav.jsx          # Top navigation bar
│   │   │   ├── footer.jsx       # Footer component
│   │   │   ├── BackToTop.jsx    # Scroll control component
│   │   │   └── LoadingSpinner.jsx # Loading state indicator
│   │   ├── Pages/
│   │   │   ├── landing.jsx      # Application landing page
│   │   │   ├── test.jsx         # Assessment interface and results view
│   │   │   ├── Profile.jsx      # User profile and history management
│   │   │   ├── aboutMe.jsx      # Platform and overview page
│   │   │   ├── login.jsx        # Login page
│   │   │   └── signup.jsx       # User registration page
│   │   ├── Routes/
│   │   │   └── routes.js        # Centralized route exports
│   │   ├── Styles/
│   │   │   └── Styles.css       # Global styles and Tailwind directives
│   │   ├── firebase.js          # Firebase client initialization
│   │   ├── App.jsx              # Application router setup
│   │   └── main.jsx             # React DOM entry point
│   ├── Dockerfile               # Frontend Docker preview server build configuration
│   ├── vite.config.js           # Vite build configuration
│   └── package.json             # Frontend dependencies and scripts
├── docker-compose.yml           # Multi-container orchestration specification
├── README.md                    # Primary repository documentation
└── readme.md                    # Repository documentation
```

---

## Getting Started

### Prerequisites

The following software dependencies are required:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MongoDB** (Local instance or MongoDB Atlas cluster connection)
- **Google AI API Key** (Access key for Google Gemini API)
- **Docker & Docker Compose** (Optional, for containerized execution)

---

### Environment Variables

Configure environment variables in the corresponding `Backend` and `Frontend` directories:

#### Backend (`Backend/.env`)
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/careerboat
JWT_SECRET=your_jwt_secret_key_here
API_KEY=your_google_gemini_api_key
```

#### Frontend (`Frontend/.env`)
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

---

### Local Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kalviumcommunity/S72_Anant_Capstone_AICareerGuidance.git
   cd S72_Anant_Capstone_AICareerGuidance
   ```

2. **Backend Setup**:
   ```bash
   cd Backend
   npm install
   npm run dev
   ```
   *Express backend server will listen on `http://localhost:5000`.*

3. **Frontend Setup**:
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```
   *Vite development server will listen on `http://localhost:5173`.*

---

### Running with Docker Compose

To build and run the services using Docker containers:

```bash
# Build and run containers
docker-compose up --build

# Run in background (detached mode)
docker-compose up -d

# Stop running containers
docker-compose down
```

- **Backend Container**: Bound to port `5000`
- **Frontend Container**: Bound to port `4173`

---

## API Documentation

### Base URL: `https://s72-anant-capstone-aicareerguidance.onrender.com` (or `http://localhost:5000`)

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Public | Registers a new user account (`name`, `email`, `password`). Includes email regex validation. |
| `POST` | `/api/auth/login` | Public | Authenticates user credentials and returns a JWT token. |
| `POST` | `/api/auth/google` | Public | Synchronizes Google OAuth authentication and returns a JWT token. |
| `GET` | `/api/auth/me` | Protected | Fetches current user profile using `Bearer <JWT_TOKEN>`. |
| `POST` | `/api/auth/logout` | Public | Logs out the current user session. |

### Question Endpoints (`/api/questions`)

| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/questions` | Public | Retrieves all active career assessment questions. |

### AI Recommendation Endpoints (`/api/ai`)

| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/recommend` | Public | Accepts raw question-answer pairs to generate career recommendations directly via Gemini API. |

### User & Profile Endpoints (`/api/user`)

| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/submit-response` | Protected | Submits test answers, triggers Gemini AI analysis, records results to `testHistory`, and returns recommendations. |
| `GET` | `/api/user/tests` | Protected | Fetches historical assessment records for the authenticated user. |
| `GET` | `/api/user/profile-pic` | Protected | Returns the profile picture URL for the authenticated user. |
| `POST` | `/api/user/upload-profile-pic` | Protected | Accepts profile image upload (max 5MB, JPG/PNG format). |
| `PUT` | `/api/user/:id` | Protected | Updates user profile fields (`name`, `email`, `profilePicture`). |

---

## AI Recommendation Pipeline

CareerBoat integrates Google's `gemini-2.5-flash` model for intelligent recommendations:

1. User responses are formatted into structured question-answer pairs.
2. A system prompt establishes the AI persona as a career guidance advisor.
3. Output is constrained to parseable JSON matching the following schema:

```json
[
  {
    "title": "Full-Stack Web Developer",
    "description": "Designs and develops modern full-stack web applications...",
    "education_requirements": "Bachelor's Degree in Computer Science or relevant coding bootcamp",
    "best_companies": ["Google", "Microsoft", "Meta", "Amazon"],
    "career_paths": ["Junior Developer", "Full-Stack Engineer", "Lead Architect", "CTO"],
    "required_skills": ["React", "Node.js", "TypeScript", "MongoDB", "REST APIs"],
    "job_outlook": ["High demand", "15% projected growth over 10 years"]
  }
]
```

---

## Testing

Backend unit tests are managed using **Jest**.

Run the test suite:

```bash
cd Backend
npm test
```

Test coverage includes:
- Mongoose Schema validation rules (`user.model.test.js`, `question.model.test.js`, `result.model.test.js`, `test.model.test.js`, `userResponse.model.test.js`)
- AI Controller prompt formation and response parsing logic (`ai.test.js`)

---

## Deployment

- **Frontend**: Hosted on [Netlify](https://careerboat.netlify.app/)
  - Single-page application route fallback configured in `Frontend/public/_redirects`.
- **Backend**: Hosted on [Render](https://s72-anant-capstone-aicareerguidance.onrender.com)
  - Connected to a managed MongoDB Atlas database instance.
- **Container Infrastructure**: Dockerized using standard `Dockerfile`s and `docker-compose.yml`.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/FeatureName`)
3. Commit changes (`git commit -m 'Add FeatureName'`)
4. Push to branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

---

## License & Contact

Distributed under the **MIT License**.

- **Author**: Anant ([@Anant3008](https://github.com/Anant3008))
- **Repository**: [kalviumcommunity/S72_Anant_Capstone_AICareerGuidance](https://github.com/kalviumcommunity/S72_Anant_Capstone_AICareerGuidance)
- **Live Demo**: [https://careerboat.netlify.app/](https://careerboat.netlify.app/)