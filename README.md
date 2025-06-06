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

### Frontend
- React 18 (Create React App)
- React Router v6
- Bootstrap 5 / SCSS
- Font Awesome & React Icons

### Backend
- Node.js & Express
- MySQL
- RESTful API
- express-validator for input validation
- multer for file uploads

---

## 📦 Project Structure

```
web2FinalProject/
├── Web2Final/
│   └── nodejs-express-mysql/
│       ├── app.js
│       ├── package.json
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── brackets.controller.js
│       │   ├── events.controller.js
│       │   ├── news.controller.js
│       │   └── person.controller.js
│       ├── models/
│       │   ├── bracket.model.js
│       │   ├── event.model.js
│       │   ├── news.model.js
│       │   ├── person.model.js
│       │   └── team.model.js
│       ├── routes/
│       │   ├── brackets.routes.js
│       │   ├── coaches.routes.js
│       │   ├── events.routes.js
│       │   ├── news.routes.js
│       │   └── players.routes.js
│       ├── uploads/
│       │   └── [uploaded files]
│       ├── views/
│       │   └── [view templates]
│       └── public/
│           ├── css/
│           ├── js/
│           └── images/
├── SQLUsed.pdf
└── README.md
```

---

## 🔧 Setup Instructions

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
- `POST /api/players/:id/upload` – Upload image
- `PUT /api/players/:id` – Update player
- `DELETE /api/players/:id` – Delete

### 🧑‍🏫 Coaches

- `GET /api/coaches` – List all coaches
- `POST /api/coaches` – Create with validation
- `PUT /api/coaches/:id` – Update coach
- `DELETE /api/coaches/:id` – Delete coach

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

## 📄 Database Models

### People

| Column        | Type       | Description                        |
|---------------|------------|------------------------------------|
| id            | INT        | PK                                 |
| first_name    | VARCHAR(32)| Required                           |
| last_name     | VARCHAR(32)| Required                           |
| address1      | VARCHAR(128)| Address                           |
| city/state/zip| VARCHAR    | Location fields                    |
| team_id       | INT (FK)   | References `teams.id`              |
| email/phone   | VARCHAR    | Contact info                       |
| password      | VARCHAR    | Password (hashed in prod)          |
| user_name     | VARCHAR    | Login                              |
| person_type   | ENUM       | `'player'`, `'coach'`, `'admin'`   |
| logo_path     | VARCHAR    | Image URL or path                  |

### Teams

| Column       | Type        | Description                       |
|--------------|-------------|-----------------------------------|
| id           | INT         | PK                                |
| name         | VARCHAR     | Team name                         |
| coach_id     | INT (FK)    | References `people.id`            |
| league_id    | INT (FK)    | References `leagues.id`           |
| notes/motto  | TEXT        | Descriptions                      |
| logo_path    | VARCHAR     | Team logo path                    |

### Leagues

| id | name              | description        |
|----|-------------------|--------------------|
| 1  | Pro Snowboarding  | The Professionals  |
| 2  | Amateur Snowboarding | The Amateurs  |

---

Built with 💻, ❄️, and ☕ by Michael Page
