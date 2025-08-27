# APS ToDo App

A full-stack ToDo application built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features

- Add, edit, delete, and mark tasks as completed
- Responsive UI with purple gradient theme
- Success and error alerts
- Loading spinner
- Search/filter tasks
- Confirmation dialog for delete
- Server-side validation and error handling

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Start the backend server:
   ```sh
   npx nodemon index.js
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend dev server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173] in your browser.

## Folder Structure

```
backend/
  index.js
  config/DB.js
  controller/TaskController.js
  model/Task.js
  routes/TaskRoute.js
frontend/
  src/
    components/
    pages/
    actions/
  public/
  index.html
  package.json
```

## API Endpoints

- `POST   /api/tasks` - Create a new task
- `GET    /api/tasks` - Get all tasks
- `PUT    /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
