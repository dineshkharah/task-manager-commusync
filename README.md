# Mini Task Manager

A small task manager that does four things: add a task, view all tasks, mark a task as complete, and delete a task. The focus is clean, readable fundamentals rather than extra features.

## Live demo

- Client (Vercel): https://task-manager-commusync.vercel.app
- Server (Render): https://task-manager-commusync.onrender.com

The API base path is `/api/v1`, so the health check is at `API_URL/health` and the tasks live at `API_URL/api/v1/tasks`.

## Features

- Add a task
- View all tasks, newest first
- Mark a task as complete (and undo it)
- Delete a task, with a confirm step

## Tech stack

- Next.js (App Router) with TypeScript for the client
- Node.js with Express and TypeScript for the API server
- MongoDB with Mongoose for storage
- TailwindCSS for styling
- zod for server side input validation

## Project structure

The repo holds two apps side by side.

```
server/                 Express + TypeScript API
  src/
    config/db.ts        mongo connection
    models/Task.ts      task schema
    controllers/        the four request handlers
    routes/             the task routes
    middleware/         input validation and the error handler
    app.ts              express app and wiring
    server.ts           entry point, connects the db then listens

client/                 Next.js App Router frontend
  app/
    page.tsx            holds the state and ties it together
    layout.tsx
  components/
    TaskForm.tsx        the add input and button
    TaskList.tsx        renders the list
    TaskItem.tsx        one row, with the delete confirm
  lib/
    api.ts              the functions that call the server
```

The client talks to the server over HTTP. The server is the only thing that touches the database.

## Getting started

You need Node.js installed and a MongoDB connection string (a free MongoDB Atlas cluster works well).

### 1. Server

```
cd server
npm install
cp .env.example .env
```

Open `.env` and set your values:

```
MONGO_URI=your mongodb connection string
PORT=4000
```

Then start it:

```
npm run dev
```

It connects to the database and listens on `http://localhost:4000`. Check `http://localhost:4000/health` and you should see `{"status":"ok"}`.

### 2. Client

In a second terminal:

```
cd client
npm install
cp .env.example .env.local
```

Open `.env.local` and point it at your server:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

Then start it:

```
npm run dev
```

Open `http://localhost:3000`. Make sure `NEXT_PUBLIC_API_URL` matches the server's address and port and ends with `/api/v1`.

## API

| Method | Route             | Does           |
| ------ | ----------------- | -------------- |
| POST   | /api/v1/tasks     | Add a task     |
| GET    | /api/v1/tasks     | View all tasks |
| PATCH  | /api/v1/tasks/:id | Mark complete  |
| DELETE | /api/v1/tasks/:id | Delete a task  |

A task looks like this:

```
{
  "_id": "...",
  "title": "buy milk",
  "completed": false,
  "createdAt": "2026-06-30T..."
}
```

## Decisions

- **Standalone Express server, not Next.js API routes.** Express is part of the required stack, so the API is its own server rather than folded into Next.js.
- **MongoDB Atlas via Mongoose.** A cloud database means no local install, and the connection string stays in `server/.env`.
- **Validation on the server with zod.** A small schema checks the task title and returns a clear 400 on bad input, before anything reaches the database.
- **One central error handler.** A single middleware turns failures into clean status codes (400 for a bad id, 404 when a task is missing, 500 for the unexpected) instead of leaking stack traces.
- **No authentication or extra features.** The brief excludes them, so the scope stays on the four features.
- **One small extra: a delete confirm.** Deleting opens a short confirm box so a task is not removed by an accidental click. This is the only addition beyond the bare four features.

## Notes

- The API base url is configurable through `NEXT_PUBLIC_API_URL`, so the client can point at a local server or a hosted one without code changes.
- The server port is configurable through `PORT`.
