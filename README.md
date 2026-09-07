# Task Manager App (MERN Stack)

A full-stack task management application built for the MERN Internship Task. Users can register, log in, and manage private daily tasks with add/edit/delete/complete and filtering.

## Features Implemented

- **Authentication**: JWT-based signup/login with bcrypt password hashing
- **Task CRUD**: Add, edit, delete tasks (title, description, status)
- **Task Listing**: Shows only the logged-in user's tasks
- **Filtering**: All / Pending / Completed
- **Bonus**:
  - Completed percentage progress bar
  - Search by task title
  - Dark / light mode toggle

## Tech Stack

- **Frontend**: React (Vite), Axios, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, bcrypt, dotenv

## Project Structure

```
task-manager-app/
├── backend/
│   ├── config/db.js
│   ├── models/User.js
│   ├── models/Task.js
│   ├── middleware/auth.js
│   ├── middleware/errorHandler.js
│   ├── routes/authRoutes.js
│   ├── routes/taskRoutes.js
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── components/ (Navbar, TaskForm, TaskItem, ProtectedRoute)
    │   ├── pages/ (Login, Register, Dashboard)
    │   ├── App.jsx
    │   └── main.jsx
    └── .env.example
```

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager   # or your MongoDB Atlas URI
JWT_SECRET=some_long_random_string
```

Run it:
```bash
npm run dev   # requires nodemon, or use: npm start
```

The API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` if your backend runs elsewhere:
```
VITE_API_URL=http://localhost:5000/api
```

Run it:
```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint             | Description                    | Auth |
|--------|-----------------------|---------------------------------|------|
| POST   | /api/auth/register    | Register new user               | No   |
| POST   | /api/auth/login       | Login, returns JWT              | No   |
| GET    | /api/auth/me          | Get current user                | Yes  |
| GET    | /api/tasks?status=    | List tasks (all/pending/completed) | Yes |
| POST   | /api/tasks            | Create task                     | Yes  |
| PUT    | /api/tasks/:id        | Update task                     | Yes  |
| DELETE | /api/tasks/:id        | Delete task                     | Yes  |

## Deployment (Optional)

- **Frontend**: Deploy `frontend/` to Vercel. Set `VITE_API_URL` env var to your deployed backend URL.
- **Backend**: Deploy `backend/` to Render. Set `MONGO_URI` and `JWT_SECRET` env vars in Render's dashboard. Use a MongoDB Atlas connection string for `MONGO_URI` since Render doesn't host MongoDB itself.

## Demo Login Flow

1. Register a new account at `/register`.
2. You're auto-logged-in and redirected to the dashboard.
3. Add tasks, filter by status, search by title, toggle theme, and mark tasks complete/pending.
