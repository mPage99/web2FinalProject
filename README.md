# 🏔️ Utah Skiing League – Web2 Final Project

A full-stack skiing league platform built with **React**, **Node.js**, **Express**, and **MySQL**. It supports team registration, player management, event planning, tournament brackets, news announcements, and media gallery browsing. A RESTful API powers the backend, while the frontend offers a responsive, Bootstrap-styled UI.

> 🎓 Final project for a Web 2 development course.

---

## ✨ Features

- 🧑‍🤝‍🧑 Team and coach management
- 🧍 Player creation, editing, image upload
- 📅 Event scheduling (per team)
- 🏆 Tournament bracket management
- 📰 News announcements
- 🖼️ Media gallery integration
- ✅ RESTful API with Express
- 🧩 Modular MVC structure
- 🎨 Bootstrap + SCSS styling

---

## 🛠️ Tech Stack

## 🧩 Frontend

- **React 18** – Built using [Create React App](https://create-react-app.dev/), utilizing functional components, hooks (`useState`, `useEffect`, etc.), and reusable modules.
- **React Router v6** – Enables SPA-style navigation between key routes:
  - `/` (Home)
  - `/teams`
  - `/players`
  - `/coaches`
  - `/news`
  - `/events`
  - `/register`
- **Component Structure**:
  - `Layout` – Shared wrapper component that injects the `Header` and `Footer` on every page.
  - `Header` – Contains the main navigation bar (Bootstrap-based).
  - `Footer` – Sticky footer with site information.
  - `Home` – Landing page using a **Bootstrap Carousel** to showcase images or highlights.
  - `TeamsList`, `PlayersList`, `CoachesList` – Fetch and display lists of people or teams.
  - `TeamDetails`, `CoachDetails`, `PlayerDetails` – Conditional rendering for single-entity views (optional).
  - `TeamForm`, `PlayerForm`, `CoachForm`, `EventForm`, `NewsForm` – Forms to create and update entries.
  - `NewsFeed` – Scrollable display of recent news entries.
  - `EventsCalendar` or `EventsList` – Shows events by date and location.
- **Bootstrap 5 + SCSS** – Responsive grid layout, clean component styling, theming using custom SCSS.
- **Font Awesome & React Icons** – Icons used across buttons, forms, nav links, and more.
- **Form Validation & UX**:
  - Controlled components for user input.
  - Validation feedback and error display from the backend (`express-validator`).
  - File upload fields (player/coach images) integrated via `multer`.

---

## 🛠 Backend

- **Node.js + Express** – Backend REST API organized with a modular folder structure:
  - `models/` – Define data access logic for each entity (Teams, People, Events, News, Brackets).
  - `controllers/` – Business logic and CRUD operations for each route.
  - `routes/` – Route definitions mapped to controller methods using Express Router.

- **MySQL** – Relational database schema with the following core tables:
  - `leagues`, `license_levels`, `people`, `teams`, `news`, `events`
  - Foreign key constraints maintain referential integrity (e.g. `teams.coach_id → people.id`).

- **RESTful API Endpoints**:
  - `GET/POST/PUT/DELETE /api/players`
  - `GET/POST/PUT/DELETE /api/coaches`
  - `GET/POST/PUT/DELETE /api/teams`
  - `GET/POST/PUT/DELETE /api/news`
  - `GET/POST/PUT/DELETE /api/events`
  - `GET/POST/PUT/DELETE /api/brackets`

- **express-validator** – Middleware for validating and sanitizing incoming data in coach/player registration forms.

- **multer** – File upload handler configured for image submissions (e.g., team logos or user profile pictures), stored locally in an `uploads/` directory.

- 📸 Uploaded files are saved in `/uploads/` relative to the Express app root.

- **CORS Configured** – Middleware enables secure frontend-backend communication.

- **Security & Best Practices**:
  - Uses prepared statements (`?`) for SQL queries to avoid injection.
  - Passwords should be hashed in production (bcrypt or argon2).
  - Modular and scalable folder layout for future endpoint expansion.

---

## 📦 Project Structure

```
web2FinalProject/
├── Web2Final/
│   ├── nodejs-express-mysql/        # 🔧 Backend (Express + MySQL)
│   │   ├── app.js                   # Main server file
│   │   ├── package.json             # Node dependencies and scripts
│   │   ├── config/
│   │   │   └── db.js                # DB connection logic
│   │   ├── controllers/
│   │   │   ├── brackets.controller.js
│   │   │   ├── events.controller.js
│   │   │   ├── news.controller.js
│   │   │   └── person.controller.js
│   │   ├── models/
│   │   │   ├── bracket.model.js
│   │   │   ├── event.model.js
│   │   │   ├── news.model.js
│   │   │   ├── person.model.js
│   │   │   └── team.model.js
│   │   ├── routes/
│   │   │   ├── brackets.routes.js
│   │   │   ├── coaches.routes.js
│   │   │   ├── events.routes.js
│   │   │   ├── news.routes.js
│   │   │   └── players.routes.js
│   │   ├── uploads/                 # 📸 Uploaded media files (e.g. player logos)
│   │   └── README.md                # Backend notes or setup (optional)
│
│   ├── react-frontend/              # 🌐 Frontend (React)
│   │   ├── public/
│   │   │   └── index.html           # HTML entry point
│   │   ├── src/
│   │   │   ├── App.css
│   │   │   ├── App.jsx              # Main React app
│   │   │   ├── index.js
│   │   │   ├── components/
│   │   │   │   ├── CoachForm.jsx
│   │   │   │   ├── NewsForm.jsx
│   │   │   │   ├── PlayerForm.jsx
│   │   │   │   ├── TeamForm.jsx
│   │   │   │   └── EventForm.jsx
│   │   │   └── pages/
│   │   │       ├── Home.jsx
│   │   │       ├── News.jsx
│   │   │       ├── Teams.jsx
│   │   │       └── Events.jsx
│   │   ├── assets/                  # 🖼 Images, icons, etc.
│   │   └── package.json
│
│   └── SQLUsed.pdf                  # 🗃️ Schema dump / reference
│
└── README.md                        # 🌟 Main project documentation
```

---

## 🔧 Setup Instructions <DEPRECATED>

### Backend

```bash
cd Web2Final/nodejs-express-mysql
npm install
node app.js
```

Runs at: `http://localhost:8080`

### Frontend

```bash
cd client
npm install
npm start
```

Runs at: `http://localhost:3000`

---

## 🧪 API Reference

Each section of the app has a dedicated API namespace (e.g. `/api/players`, `/api/teams`).

### 🧑‍🤝‍🧑 Teams

- `GET /api/teams` – Get all teams
- `POST /api/teams` – Create new team (with validation)
- `PUT /api/teams/:id` – Update by ID
- `DELETE /api/teams/:id` – Delete by ID

### 🧍 Players

- `GET /api/players` – List players
- `POST /api/players` – Create with validation
- `POST /api/players/:id/upload` – Upload player profile image (Multer-based)
- `PUT /api/players/:id` – Update player
- `DELETE /api/players/:id` – Delete

### 🧑‍🏫 Coaches

- `GET /api/coaches` – List all coaches
- `POST /api/coaches` – Create with validation
- `PUT /api/coaches/:id` – Update coach
- `DELETE /api/coaches/:id` – Delete coach
- `POST /api/players/:id/upload` – Upload player profile image (Multer-based)

### 📅 Events

- `GET /api/events` – All events
- `GET /api/events/team/:teamId` – By team
- `POST /api/events` – Add
- `PUT /api/events/:id` – Update
- `DELETE /api/events/:id` – Delete

### 🏆 Brackets

- `GET /api/brackets` – List brackets
- `POST /api/brackets` – Add
- `PUT /api/brackets/:id` – Update
- `DELETE /api/brackets/:id` – Delete

### 📰 News

- `GET /api/news` – List articles
- `POST /api/news` – Add
- `PUT /api/news/:id` – Update
- `DELETE /api/news/:id` – Delete

---

## 📊 Database Schema

### 🧑 People  
| Column        | Type           | Description                            |
|---------------|----------------|----------------------------------------|
| `id`          | INT            | Primary key                            |
| `first_name`  | VARCHAR(32)    | Required                               |
| `last_name`   | VARCHAR(32)    | Required                               |
| `address1`    | VARCHAR(128)   | Address                                |
| `city`        | VARCHAR(64)    | City                                   |
| `state`       | VARCHAR(2)     | State abbreviation                     |
| `zip`         | VARCHAR(10)    | ZIP code                               |
| `team_id`     | INT (FK)       | References `teams.id`                  |
| `email`       | VARCHAR(128)   | Email address                          |
| `phone`       | VARCHAR(24)    | Phone number                           |
| `password`    | VARCHAR(32)    | Password (should be hashed in prod)    |
| `user_name`   | VARCHAR(32)    | Username                               |
| `person_type` | ENUM           | 'coach', 'player', or 'admin'          |
| `logo_path`   | VARCHAR(128)   | Image path or URL (optional)           |

---

### 🏆 Teams  
| Column       | Type           | Description                            |
|--------------|----------------|----------------------------------------|
| `id`         | INT            | Primary key                            |
| `name`       | VARCHAR(128)   | Team name                              |
| `coach_id`   | INT (FK)       | References `people.id`                 |
| `league_id`  | INT (FK)       | References `leagues.id`                |
| `notes`      | VARCHAR(1024)  | Team notes or description              |
| `motto`      | VARCHAR(1024)  | Team motto                             |
| `logo_path`  | VARCHAR(128)   | Logo image path or URL (optional)      |

---

### 🏅 Leagues  
| Column        | Type           | Description                            |
|---------------|----------------|----------------------------------------|
| `id`          | INT            | Primary key                            |
| `name`        | VARCHAR(32)    | League name                            |
| `description` | VARCHAR(2048)  | Description of the league              |

---

### 🧾 License Levels  
| Column        | Type           | Description                            |
|---------------|----------------|----------------------------------------|
| `id`          | INT            | Primary key                            |
| `value`       | VARCHAR(32)    | License level identifier (e.g. A, B)   |
| `description` | VARCHAR(2048)  | Description of license tier            |

---

Built with 💻, ❄️, and ☕ by Michael Page
