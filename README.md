# 🚀 CareerBoat: AI-Powered Career Guidance System

<div align="center">

![Career Guidance](https://img.shields.io/badge/AI-Career%20Guidance-blue)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![Google AI](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google)
![License](https://img.shields.io/badge/License-MIT-yellow)

**An intelligent career recommendation platform that helps users discover their ideal career paths through AI-powered personalized assessments.**

[🌐 Live Demo](https://careerboat.netlify.app/) • [📖 Documentation](#documentation) • [🐛 Report Bug](#contributing) • [✨ Request Feature](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

**CareerBoat** is a capstone project designed to revolutionize career guidance through artificial intelligence. By combining personality assessments, interest analysis, and AI-powered recommendations, CareerBoat provides users with:

- 🎓 Personalized career path suggestions
- 💼 Industry insights and job market trends
- 📚 Required skills and educational pathways
- 🏢 Top companies and opportunities in recommended fields
- 🤖 AI-powered chatbot for career queries

This platform serves both students exploring career options and professionals considering career transitions.

---

## ✨ Features

### Core Functionality
- **🧠 Intelligent Quiz System**: Dynamic questionnaire that adapts to user responses
- **🤖 AI-Powered Recommendations**: Leverages Google Gemini AI for accurate career matching
- **👤 User Authentication**: Secure login/signup with JWT and bcrypt encryption
- **📊 Personalized Dashboard**: Track quiz history and recommendations
- **🔐 Secure Data Storage**: MongoDB integration with encrypted sensitive data

### Advanced Features
- **📱 Responsive Design**: Seamless experience across all devices
- **🎨 Modern UI/UX**: Built with React and Tailwind CSS
- **⚡ Fast Performance**: Optimized with Vite bundler
- **🔄 Real-time Updates**: Dynamic content loading and state management
- **📤 File Upload Support**: Resume/CV upload with Multer
- **🔥 Firebase Integration**: Authentication and cloud services

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.0.0
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS 4.0.14
- **Routing**: React Router DOM 7.3.0
- **HTTP Client**: Axios 1.8.4
- **Authentication**: Firebase 11.5.0

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.21.2
- **Database**: MongoDB with Mongoose 8.12.1
- **AI Integration**: Google Generative AI 0.24.1
- **Authentication**: JWT (JSON Web Tokens) 9.0.2
- **Password Hashing**: Bcrypt 5.1.1
- **File Upload**: Multer 2.0.1

### DevOps & Tools
- **Containerization**: Docker & Docker Compose
- **Version Control**: Git & GitHub
- **Testing**: Jest 29.7.0
- **Development**: Nodemon 3.1.9
- **Linting**: ESLint 9.21.0

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │◄───────►│  Express API    │◄───────►│  MongoDB        │
│  (Vite)         │         │  Server         │         │  Database       │
│                 │         │                 │         │                 │
└─────────────────┘         └────────┬────────┘         └─────────────────┘
                                     │
                                     │
                            ┌────────▼────────┐
                            │                 │
                            │  Google Gemini  │
                            │  AI API         │
                            │                 │
                            └─────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Docker** (optional, for containerized deployment)
- **Google AI API Key** (for Gemini integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kalviumcommunity/S72_Anant_Capstone_AICareerGuidance.git
   cd S72_Anant_Capstone_AICareerGuidance
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

### Environment Variables

Create `.env` files in both Backend and Frontend directories:

#### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careerboat
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
GOOGLE_AI_API_KEY=your_google_ai_api_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

#### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

## 💻 Usage

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd Backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Start Frontend Development Server:**
```bash
cd Frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Build Frontend:**
```bash
cd Frontend
npm run build
```

**Start Backend in Production:**
```bash
cd Backend
npm start
```

### Running Tests

```bash
cd Backend
npm test
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (Protected) |
| PUT | `/api/auth/profile` | Update user profile (Protected) |

### Quiz Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quiz/questions` | Get quiz questions |
| POST | `/api/quiz/submit` | Submit quiz responses |
| GET | `/api/quiz/history` | Get user quiz history (Protected) |

### Recommendation Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recommendations` | Get AI career recommendations |
| GET | `/api/recommendations/:id` | Get specific recommendation |

---

## 🐳 Docker Deployment

The project includes Docker support for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop containers
docker-compose down
```

The `docker-compose.yml` configuration sets up:
- Frontend container
- Backend container
- MongoDB container
- Networking between services

---

## 📁 Project Structure

```
S72_Anant_Capstone_AICareerGuidance/
├── Backend/
│   ├── controllers/          # Route controllers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   ├── utils/               # Utility functions
│   ├── server.js            # Express server entry point
│   └── package.json         # Backend dependencies
├── Frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Context providers
│   │   ├── utils/           # Helper functions
│   │   ├── assets/          # Static assets
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # React entry point
│   ├── public/              # Public static files
│   └── package.json         # Frontend dependencies
├── docker-compose.yml       # Docker configuration
└── README.md               # Project documentation
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



---

## 👨‍💻 Contact

**Anant** - [@Anant3008](https://github.com/Anant3008)

**Project Link**: [https://github.com/kalviumcommunity/S72_Anant_Capstone_AICareerGuidance](https://github.com/kalviumcommunity/S72_Anant_Capstone_AICareerGuidance)

**Live Demo**: [https://careerboat.netlify.app/](https://careerboat.netlify.app/)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) - For powering the recommendation engine
- [Kalvium](https://www.kalvium.com/) - For the capstone opportunity
- [React Documentation](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)

---

<div align="center">

**Made with ❤️ by Anant**

⭐ Star this repo if you find it helpful!

</div>