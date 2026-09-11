# Internship Tracker

A full-stack web application for tracking internship applications in one place.

## Features

- Add internship applications
- Edit internship details
- Delete internship applications
- Search internships
- Filter internships by status
- Dashboard showing total, open, and closed internships
- Store internship data in PostgreSQL
- Apply button linking to the job posting
- Deployed online

# Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- REST API
- Render

## Run Locally

### 1. Clone the repository

git clone <https://github.com/rajkumarshivashankar-design/internship-tracker.git>

### 2. Go into the project

cd internship-tracker

### 3. Install dependencies

cd server
npm install

### 4. Set up environment variables

Create a `.env` file inside the `server` folder:

DATABASE_URL="your-postgresql-database-url"

### 5. Run database migrations

npx prisma migrate deploy

### 6. Start the server

node server.js

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/internships` | Get all internships |
| POST | `/internships` | Add an internship |
| PUT | `/internships/:id` | Update an internship |
| DELETE | `/internships/:id` | Delete an internship |

## Live Demo

[Open Internship Tracker](https://internship-tracker-lpvd.onrender.com/)