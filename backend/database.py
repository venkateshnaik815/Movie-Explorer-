"""
SQLite Database Layer for Movie Explorer Flask Backend.
Automatically creates tables and seeds initial catalog data on startup.
"""

import os
import sys
import json
import sqlite3
from typing import Any, Dict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from .seed_data import (
        TELUGU_MOVIES,
        ENGLISH_MOVIES,
        CRICKET_VIDEOS,
        SPORTS_MATCHES,
        DEFAULT_UPLOADS,
    )
except ImportError:
    from seed_data import (  # type: ignore
        TELUGU_MOVIES,
        ENGLISH_MOVIES,
        CRICKET_VIDEOS,
        SPORTS_MATCHES,
        DEFAULT_UPLOADS,
    )

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "movie_explorer.db")


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Movies table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            original_language TEXT,
            language TEXT,
            overview TEXT,
            poster_path TEXT,
            backdrop_path TEXT,
            vote_average REAL,
            vote_count INTEGER,
            release_date TEXT,
            runtime INTEGER,
            budget INTEGER,
            revenue INTEGER,
            tagline TEXT,
            genre_ids_json TEXT,
            genres_json TEXT,
            videos_json TEXT,
            credits_json TEXT,
            is_new_release INTEGER DEFAULT 0,
            sort_order INTEGER DEFAULT 0
        )
    """)

    # 2. Sports Matches table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sports_matches (
            id TEXT PRIMARY KEY,
            sport TEXT,
            tournament TEXT,
            status TEXT,
            status_detail TEXT,
            venue TEXT,
            team1_json TEXT,
            team2_json TEXT,
            summary TEXT,
            top_performer TEXT,
            video_id TEXT,
            video_title TEXT,
            sort_order INTEGER DEFAULT 0
        )
    """)

    # 3. Cricket Videos table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cricket_videos (
            id TEXT PRIMARY KEY,
            title TEXT,
            tournament TEXT,
            duration TEXT,
            views TEXT,
            thumbnail TEXT,
            video_id TEXT,
            description TEXT,
            sort_order INTEGER DEFAULT 0
        )
    """)

    # 4. Favorites table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY,
            title TEXT,
            poster_path TEXT,
            vote_average REAL,
            release_date TEXT,
            genre_ids_json TEXT,
            added_at INTEGER
        )
    """)

    # 5. Uploads table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS uploads (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT,
            description TEXT,
            file_name TEXT,
            file_size TEXT,
            created_at TEXT,
            duration TEXT
        )
    """)

    # Seed movies if empty
    movie_row = cursor.execute("SELECT COUNT(*) as cnt FROM movies").fetchone()
    if movie_row is not None and int(movie_row["cnt"]) == 0:
        all_movies = TELUGU_MOVIES + ENGLISH_MOVIES
        for idx, m in enumerate(all_movies):
            cursor.execute("""
                INSERT OR REPLACE INTO movies (
                    id, title, original_language, language, overview,
                    poster_path, backdrop_path, vote_average, vote_count,
                    release_date, runtime, budget, revenue, tagline,
                    genre_ids_json, genres_json, videos_json, credits_json,
                    is_new_release, sort_order
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                m["id"],
                m["title"],
                m["original_language"],
                m["language"],
                m["overview"],
                m["poster_path"],
                m["backdrop_path"],
                m["vote_average"],
                m["vote_count"],
                m["release_date"],
                m.get("runtime", 150),
                m.get("budget", 0),
                m.get("revenue", 0),
                m.get("tagline", ""),
                json.dumps(m.get("genre_ids", [])),
                json.dumps(m.get("genres", [])),
                json.dumps(m.get("videos", {"results": []})),
                json.dumps(m.get("credits", {"cast": [], "crew": []})),
                1 if m.get("is_new_release") else 0,
                idx,
            ))

    # Seed sports matches if empty
    match_row = cursor.execute("SELECT COUNT(*) as cnt FROM sports_matches").fetchone()
    if match_row is not None and int(match_row["cnt"]) == 0:
        for idx, s in enumerate(SPORTS_MATCHES):
            cursor.execute("""
                INSERT OR REPLACE INTO sports_matches (
                    id, sport, tournament, status, status_detail, venue,
                    team1_json, team2_json, summary, top_performer,
                    video_id, video_title, sort_order
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                s["id"],
                s["sport"],
                s["tournament"],
                s["status"],
                s["statusDetail"],
                s["venue"],
                json.dumps(s["team1"]),
                json.dumps(s["team2"]),
                s["summary"],
                s["topPerformer"],
                s["videoId"],
                s["videoTitle"],
                idx,
            ))

    # Seed cricket videos if empty
    video_row = cursor.execute("SELECT COUNT(*) as cnt FROM cricket_videos").fetchone()
    if video_row is not None and int(video_row["cnt"]) == 0:
        for idx, v in enumerate(CRICKET_VIDEOS):
            cursor.execute("""
                INSERT OR REPLACE INTO cricket_videos (
                    id, title, tournament, duration, views,
                    thumbnail, video_id, description, sort_order
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                v["id"],
                v["title"],
                v["tournament"],
                v["duration"],
                v["views"],
                v["thumbnail"],
                v["videoId"],
                v["description"],
                idx,
            ))

    # Seed default uploads if empty
    upload_row = cursor.execute("SELECT COUNT(*) as cnt FROM uploads").fetchone()
    if upload_row is not None and int(upload_row["cnt"]) == 0:
        for u in DEFAULT_UPLOADS:
            cursor.execute("""
                INSERT OR REPLACE INTO uploads (
                    id, title, category, description, file_name,
                    file_size, created_at, duration
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                u["id"],
                u["title"],
                u["category"],
                u["description"],
                u["fileName"],
                u["fileSize"],
                u["createdAt"],
                u["duration"],
            ))

    conn.commit()
    conn.close()


def row_to_movie(row: sqlite3.Row) -> Dict[str, Any]:
    return {
        "id": row["id"],
        "title": row["title"],
        "original_language": row["original_language"],
        "language": row["language"],
        "overview": row["overview"],
        "poster_path": row["poster_path"],
        "backdrop_path": row["backdrop_path"],
        "vote_average": row["vote_average"],
        "vote_count": row["vote_count"],
        "release_date": row["release_date"],
        "runtime": row["runtime"],
        "budget": row["budget"],
        "revenue": row["revenue"],
        "tagline": row["tagline"],
        "genre_ids": json.loads(row["genre_ids_json"] or "[]"),
        "genres": json.loads(row["genres_json"] or "[]"),
        "videos": json.loads(row["videos_json"] or '{"results": []}'),
        "credits": json.loads(row["credits_json"] or '{"cast": [], "crew": []}'),
    }


def row_to_match(row: sqlite3.Row) -> Dict[str, Any]:
    return {
        "id": row["id"],
        "sport": row["sport"],
        "tournament": row["tournament"],
        "status": row["status"],
        "statusDetail": row["status_detail"],
        "venue": row["venue"],
        "team1": json.loads(row["team1_json"] or "{}"),
        "team2": json.loads(row["team2_json"] or "{}"),
        "summary": row["summary"],
        "topPerformer": row["top_performer"],
        "videoId": row["video_id"],
        "videoTitle": row["video_title"],
    }


def row_to_cricket_video(row: sqlite3.Row) -> Dict[str, Any]:
    return {
        "id": row["id"],
        "title": row["title"],
        "tournament": row["tournament"],
        "duration": row["duration"],
        "views": row["views"],
        "thumbnail": row["thumbnail"],
        "videoId": row["video_id"],
        "description": row["description"],
    }


def row_to_favorite(row: sqlite3.Row) -> Dict[str, Any]:
    return {
        "id": row["id"],
        "title": row["title"],
        "poster_path": row["poster_path"],
        "vote_average": row["vote_average"],
        "release_date": row["release_date"],
        "genre_ids": json.loads(row["genre_ids_json"] or "[]"),
        "addedAt": row["added_at"],
    }


def row_to_upload(row: sqlite3.Row) -> Dict[str, Any]:
    return {
        "id": row["id"],
        "title": row["title"],
        "category": row["category"],
        "description": row["description"],
        "fileName": row["file_name"],
        "fileSize": row["file_size"],
        "createdAt": row["created_at"],
        "duration": row["duration"],
    }
