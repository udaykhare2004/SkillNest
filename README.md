# SkillNest – Short Courses & Workshops Platform

SkillNest is a small full‑stack web app that helps students and early professionals discover short courses and workshops, enroll in them, and manage their learning via a simple dashboard.

## Tech Stack

- **Frontend**: React + Vite, React Router, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens)

## Features

- **Authentication**
  - Register / login with JWT.
  - First registered account is automatically made **admin**.
- **Course catalog**
  - Landing page with marketing copy.
  - Courses listing page with cards and quick enroll.
  - Course detail page with richer description and metadata.
- **Enrollments & Dashboard**
  - Authenticated users can enroll in courses.
  - Personal dashboard listing all enrolled courses.
- **Admin**
  - Admin‑only page for managing courses (create, update, delete).
  - Form to control title, description, category, level, duration, date, and spots left.
- **UI**
  - Light, vibrant theme with responsive layout.
  - Toast notifications for key actions (login, enroll, CRUD, errors).

## Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB running locally on `mongodb://localhost:27017`

## Project Structure

```text
SkillNest/
  backend/
    src/
      index.js          # Express app & Mongo connection
      models/
        User.js
        Course.js
      middleware/
        auth.js         # JWT auth & admin guard
      routes/
        auth.js         # /api/auth/register, /api/auth/login
        courses.js      # /api/courses CRUD + enroll
        users.js        # /api/users/me
      scripts/
        seedCourses.js  # Mock courses seeding script
    package.json

  frontend/
    src/
      main.jsx
      App.jsx
      styles.css
      components/
        Navbar.jsx
        ToastProvider.jsx
      pages/
        Landing.jsx
        Home.jsx        # Courses listing
        CourseDetail.jsx
        Login.jsx
        Register.jsx
        Dashboard.jsx
        AdminCourses.jsx
    index.html
    package.json
```

## Backend – Setup & Run

```bash
cd backend
npm install
```

Optional: create a `.env` file in `backend`:

```bash
MONGO_URI=mongodb://localhost:27017/skillnest
JWT_SECRET=some_long_random_secret
PORT=5000
```

Start the API server:

```bash
npm run dev   # with nodemon
# or
npm start
```

The backend will run on `http://localhost:5000`.

### Seed Mock Courses

To quickly populate the database with sample courses:

```bash
cd backend
npm run seed:courses
```

This will:

- Connect to `mongodb://localhost:27017/skillnest`
- Clear existing courses
- Insert several curated mock courses

## Frontend – Setup & Run

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

## Frontend Routes

- `/` – Landing page (marketing + CTAs)
- `/courses` – Course catalog (cards with “View details” + “Enroll”)
- `/courses/:id` – Individual course detail view
- `/login` – User login
- `/register` – User registration
- `/dashboard` – Authenticated user’s enrolled courses
- `/admin/courses` – Admin‑only course management (CRUD)

## Admin Access

- The **very first user** who registers is marked `isAdmin: true` and can access `/admin/courses`.
- Additional admins can be created later by updating the user document in MongoDB (set `isAdmin` to `true`).

## API Overview

Base URL: `http://localhost:5000/api`

- **Auth**
  - `POST /auth/register`
  - `POST /auth/login`
- **Courses**
  - `GET /courses`
  - `GET /courses/:id`
  - `POST /courses` (admin only)
  - `PUT /courses/:id` (admin only)
  - `DELETE /courses/:id` (admin only)
  - `POST /courses/:id/enroll` (authenticated users)
- **Users**
  - `GET /users/me` (authenticated users; returns profile + enrolled courses)

JWT tokens are expected in the `Authorization: Bearer <token>` header. The frontend sets this automatically once a user logs in.

## Notes

- This project is intentionally small and opinionated, meant as a starter / demo platform for short‑course discovery.
- You can extend it with:
  - Payments and pricing.
  - Richer course content (modules, lessons).
  - Multi‑role permissions beyond a single admin flag.

