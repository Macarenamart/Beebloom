# 🐝 BeeBloom

### Drone-Assisted Pollination Management Platform

> Full-Stack web application designed to manage and optimize pollination operations through geospatial visualization and structured data workflows.

---

## Tech Stack

### Frontend
- React
- JavaScript / TypeScript
- React Router
- Leaflet (geospatial visualization)
- SCSS

### Backend
- Node.js
- Express
- RESTful API architecture
- Environment-based configuration

### Database
- MariaDB / MySQL
- Relational schema design

---

## 🧠 Architecture

BeeBloom follows a modular client-server architecture:

```
Client (React SPA)
        │
        ▼
REST API (Node + Express)
        │
        ▼
Relational Database
```

### Architectural Decisions

- Clear separation of concerns (UI / API / Data layer)
- Environment-based configuration using `.env`
- Modular route structure in backend
- Scalable folder organization
- Reusable frontend components
- Geospatial logic isolated from business logic

---

## Core Features

- Interactive map visualization (Leaflet integration)
- Geolocation-based entity management
- CRUD operations for operational workflows
- Structured data exports
- Secure environment configuration
- Modular and extensible system design

---

## Local Setup

```
git clone git@github.com:Macarenamart/Beebloom.git
cd Beebloom

# Backend
cd backend/api
cp .env.example .env
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev

Default Ports:
Frontend: http://localhost:5173
Backend:  http://localhost:3001

Environment Variables:
PORT=
CORS_ORIGIN=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=
NODE_ENV=
JWT_SECRET=
```

---

## Roadmap

- Deployment to production (Vercel + Render / Railway)
- Role-based access control
- Analytics dashboard
- Real-time mission updates
- Automated testing layer
- CI/CD integration

---

## Engineering Focus

This project emphasizes:

- Full-stack implementation from scratch
- Clean API design
- Relational database modeling
- Modular backend routing
- Scalable structure ready for growth
- Product-oriented development mindset

---

## 👩‍💻 Author

Macarena Mart  
Full Stack Developer  
TypeScript · React · Node
