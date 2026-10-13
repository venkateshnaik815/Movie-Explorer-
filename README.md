# Movie-Explorer-

A modern, full-stack Movie & Sports web application built with **React 19 (Vite)** on the frontend and **Python Flask + SQLite3** on the backend.

## Features

- **Discover Movies**: Explore trending movies, top rated, popular, and upcoming films.
- **Telugu & English Categories**: Dedicated sections for Tollywood and Hollywood cinema.
- **Movie Details & Full Movie Cinema Player**: Full synopses, cast info, release dates, ratings, and HD cinema player.
- **Live Sports Hub**: Cricket match scores, highlights, and schedules served from the Flask API.
- **Personal Favorites**: Save movies to your watchlist synced with SQLite database & local storage.
- **Media Uploads**: Upload and manage trailers, clips, and video metadata via Flask REST API.
- **Search & Filters**: Instant debounced search and genre-based filtering.
- **Responsive & Modern UI**: Netflix-inspired dark aesthetic with mobile-first category navigation.

## Tech Stack

### Frontend
- **React 19**
- **Vite**
- **React Router v7**
- **React Icons**

### Backend
- **Python 3 & Flask** (`backend/app.py`)
- **Flask-CORS**
- **SQLite3 Database** (`backend/database.py` & `backend/movie_explorer.db`)
- **RESTful API Endpoints** (`/api/movies/*`, `/api/sports/*`, `/api/favorites`, `/api/uploads`, `/api/health`)

## Getting Started

### 1. Start the Flask Backend Server

```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Start Flask API Server (runs on http://127.0.0.1:5000)
npm run backend
# OR: python backend/app.py
```

### 2. Start the React Frontend Server

```bash
# Install frontend dependencies
npm install

# Start Vite development server (runs on http://localhost:3000 and proxies /api to Flask)
npm run dev
```

### 3. Build for Production

```bash
npm run build
```
