# App Tracker

App Tracker is a web-based application designed to help students manage and track university exchange and study abroad applications from a single platform.

The system allows students to organize application details, monitor deadlines, track document completion, and discover universities that match their academic profile.

## Features

* User Registration and Login
* Secure Authentication using JWT
* Student Profile Management
* Application Tracking Dashboard
* University Discovery and Filtering
* GPA-Based University Matching
* Deadline Monitoring
* Progress Tracking and Checklists
* Responsive User Interface

## Tech Stack

### Frontend

* React 18
* Vite
* React Router
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcryptjs

## Project Structure

```
app_tracker/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd app_tracker
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Routes

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/profile`
* PUT `/api/auth/profile`

### Applications

* GET `/api/applications`
* POST `/api/applications`
* PUT `/api/applications/:id`
* DELETE `/api/applications/:id`

### Universities

* GET `/api/universities`

## Future Improvements

* Email notifications for deadlines
* Document uploads
* Scholarship recommendations
* University ranking integration
* Mobile application support

## Authors

Developed as a university software engineering project.
