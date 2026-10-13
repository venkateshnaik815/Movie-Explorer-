"""
Movie Explorer — Production Flask Backend API Server
Links seamlessly with the React + Vite Frontend and SQLite Database.
"""

import os
import sys
import json
import time
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from flask import Flask, jsonify, request, send_from_directory, redirect
from flask_cors import CORS

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from .database import (
        init_db,
        get_db_connection,
        row_to_movie,
        row_to_match,
        row_to_cricket_video,
        row_to_favorite,
        row_to_upload,
    )
    from .seed_data import NEW_RELEASES_ORDER, GENRES_LIST
except ImportError:
    from database import (  # type: ignore
        init_db,
        get_db_connection,
        row_to_movie,
        row_to_match,
        row_to_cricket_video,
        row_to_favorite,
        row_to_upload,
    )
    from seed_data import NEW_RELEASES_ORDER, GENRES_LIST  # type: ignore

# Path to compiled frontend build directory
FRONTEND_DIST = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "dist")
)

app = Flask(__name__, static_folder=None)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Ensure SQLite database is initialized and seeded on startup
init_db()


@app.before_request
def redirect_browser_api_navigation():
    """
    If a user opens an /api/* URL directly in the browser tab (Accept: text/html),
    redirect them to the visual React UI page instead of showing raw JSON.
    """
    if request.path.startswith("/api/"):
        accept = request.headers.get("Accept", "")
        is_xhr = request.headers.get("X-Requested-With") == "XMLHttpRequest"
        if "text/html" in accept and not is_xhr:
            if "telugu" in request.path:
                return redirect("/telugu")
            if "english" in request.path:
                return redirect("/english")
            if "sports" in request.path:
                return redirect("/sports")
            if "favorites" in request.path:
                return redirect("/favorites")
            if "uploads" in request.path:
                return redirect("/uploads")
            if "genres" in request.path:
                return redirect("/genres")
            if "search" in request.path:
                return redirect("/search")
            return redirect("/")
    return None


def paginate_list(
    items: List[Dict[str, Any]], page: int = 1, page_size: int = 20
) -> Dict[str, Any]:
    safe_page = max(1, int(page))
    start = (safe_page - 1) * page_size
    end = start + page_size
    paginated = items[start:end]
    total_pages = max(1, (len(items) + page_size - 1) // page_size)
    return {
        "page": safe_page,
        "results": paginated,
        "total_pages": total_pages,
        "total_results": len(items),
    }


def sort_movies(
    movies: List[Dict[str, Any]], sort_by: str = "popularity.desc"
) -> List[Dict[str, Any]]:
    if sort_by == "vote_average.desc":
        return sorted(movies, key=lambda m: float(m.get("vote_average", 0.0)), reverse=True)
    if sort_by == "release_date.desc":
        return sorted(movies, key=lambda m: str(m.get("release_date", "")), reverse=True)
    if sort_by == "release_date.asc":
        return sorted(movies, key=lambda m: str(m.get("release_date", "")))
    if sort_by == "revenue.desc":
        return sorted(movies, key=lambda m: int(m.get("revenue", 0)), reverse=True)
    if sort_by == "original_title.asc":
        return sorted(movies, key=lambda m: str(m.get("title", "")).lower())
    return movies


def fetch_all_movies_from_db(lang: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    if lang:
        rows = conn.execute(
            "SELECT * FROM movies WHERE original_language = ? ORDER BY sort_order ASC",
            (lang,),
        ).fetchall()
    else:
        rows = conn.execute(
            "SELECT * FROM movies ORDER BY sort_order ASC"
        ).fetchall()
    conn.close()
    return [row_to_movie(r) for r in rows if r is not None]


def get_table_count(conn: Any, table_name: str) -> int:
    row = conn.execute(f"SELECT COUNT(*) as c FROM {table_name}").fetchone()
    return int(row["c"]) if row is not None else 0


# ==========================================
# HEALTH & SYSTEM STATUS API
# ==========================================
@app.route("/api/health", methods=["GET"])
def health_check():
    conn = get_db_connection()
    movie_count = get_table_count(conn, "movies")
    match_count = get_table_count(conn, "sports_matches")
    fav_count = get_table_count(conn, "favorites")
    upload_count = get_table_count(conn, "uploads")
    conn.close()

    return jsonify({
        "status": "ok",
        "service": "Movie Explorer Flask Backend API",
        "framework": "Flask (Python)",
        "database": "SQLite3 Connected",
        "stats": {
            "movies": movie_count,
            "live_sports_matches": match_count,
            "favorites": fav_count,
            "uploads": upload_count,
        },
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })


# ==========================================
# MOVIES & CATALOG API ENDPOINTS
# ==========================================
@app.route("/api/movies/telugu", methods=["GET"])
def get_telugu_movies():
    page = request.args.get("page", 1, type=int)
    sort_by = request.args.get("sort_by", "popularity.desc")
    movies = fetch_all_movies_from_db(lang="te")
    movies = sort_movies(movies, sort_by)
    return jsonify(paginate_list(movies, page))


@app.route("/api/movies/english", methods=["GET"])
def get_english_movies():
    page = request.args.get("page", 1, type=int)
    sort_by = request.args.get("sort_by", "popularity.desc")
    movies = fetch_all_movies_from_db(lang="en")
    movies = sort_movies(movies, sort_by)
    return jsonify(paginate_list(movies, page))


@app.route("/api/movies/new-releases", methods=["GET"])
def get_new_releases():
    page = request.args.get("page", 1, type=int)
    all_movies = {int(m["id"]): m for m in fetch_all_movies_from_db()}
    ordered = [all_movies[mid] for mid in NEW_RELEASES_ORDER if mid in all_movies]
    return jsonify(paginate_list(ordered, page))


@app.route("/api/movies/trending", methods=["GET"])
def get_trending_movies():
    page = request.args.get("page", 1, type=int)
    movies = fetch_all_movies_from_db()
    return jsonify(paginate_list(movies, page))


@app.route("/api/movies/popular", methods=["GET"])
def get_popular_movies():
    page = request.args.get("page", 1, type=int)
    movies = fetch_all_movies_from_db()
    return jsonify(paginate_list(movies, page))


@app.route("/api/movies/top-rated", methods=["GET"])
def get_top_rated_movies():
    page = request.args.get("page", 1, type=int)
    movies = sort_movies(fetch_all_movies_from_db(), "vote_average.desc")
    return jsonify(paginate_list(movies, page))


@app.route("/api/movies/upcoming", methods=["GET"])
def get_upcoming_movies():
    page = request.args.get("page", 1, type=int)
    movies = sort_movies(fetch_all_movies_from_db(), "release_date.desc")
    return jsonify(paginate_list(movies, page))


@app.route("/api/movies/now-playing", methods=["GET"])
def get_now_playing_movies():
    page = request.args.get("page", 1, type=int)
    movies = fetch_all_movies_from_db()
    return jsonify(paginate_list(movies, page))


@app.route("/api/movies/discover", methods=["GET"])
def discover_movies():
    page = request.args.get("page", 1, type=int)
    sort_by = request.args.get("sort_by", "popularity.desc")
    with_genres = request.args.get("with_genres", None)
    with_lang = request.args.get("with_original_language", None)

    movies = fetch_all_movies_from_db(lang=with_lang if with_lang else None)

    if with_genres:
        try:
            gid = int(with_genres)
            filtered = [m for m in movies if gid in m.get("genre_ids", [])]
            if filtered:
                movies = filtered
        except ValueError:
            pass

    movies = sort_movies(movies, sort_by)
    return jsonify(paginate_list(movies, page))


@app.route("/api/movies/search", methods=["GET"])
def search_movies():
    query = (request.args.get("query") or request.args.get("q") or "").strip().lower()
    page = request.args.get("page", 1, type=int)
    movies = fetch_all_movies_from_db()

    if query:
        movies = [
            m
            for m in movies
            if query in str(m.get("title", "")).lower()
            or query in str(m.get("overview", "")).lower()
        ]

    return jsonify(paginate_list(movies, page))


@app.route("/api/movies/<int:movie_id>", methods=["GET"])
def get_movie_details(movie_id: int):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM movies WHERE id = ?", (movie_id,)).fetchone()
    conn.close()

    all_movies = fetch_all_movies_from_db()
    movie: Optional[Dict[str, Any]] = None
    if row is not None:
        movie = row_to_movie(row)
    elif len(all_movies) > 0:
        movie = all_movies[0]

    if movie is None:
        return jsonify({"error": "Movie not found"}), 404

    current_id = movie.get("id")
    similar = [m for m in all_movies if m.get("id") != current_id]
    response_data = {
        **movie,
        "similar": {"results": similar},
    }
    return jsonify(response_data)


@app.route("/api/movies/<int:movie_id>/credits", methods=["GET"])
def get_movie_credits(movie_id: int):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM movies WHERE id = ?", (movie_id,)).fetchone()
    conn.close()

    if row is not None:
        movie = row_to_movie(row)
        return jsonify(movie.get("credits", {"cast": [], "crew": []}))
    return jsonify({"cast": [], "crew": []})


@app.route("/api/movies/<int:movie_id>/videos", methods=["GET"])
def get_movie_videos(movie_id: int):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM movies WHERE id = ?", (movie_id,)).fetchone()
    conn.close()

    if row is not None:
        movie = row_to_movie(row)
        return jsonify(movie.get("videos", {"results": []}))
    return jsonify({"results": []})


@app.route("/api/movies/<int:movie_id>/similar", methods=["GET"])
def get_similar_movies(movie_id: int):
    page = request.args.get("page", 1, type=int)
    all_movies = fetch_all_movies_from_db()
    similar = [m for m in all_movies if m.get("id") != movie_id]
    return jsonify(paginate_list(similar, page))


@app.route("/api/genres", methods=["GET"])
def get_genres():
    return jsonify({"genres": GENRES_LIST})


# ==========================================
# LIVE SPORTS & CRICKET API ENDPOINTS
# ==========================================
@app.route("/api/sports/matches", methods=["GET"])
def get_sports_matches():
    category = request.args.get("category", "All Cricket")
    status = request.args.get("status", "All")

    conn = get_db_connection()
    rows = conn.execute(
        "SELECT * FROM sports_matches ORDER BY sort_order ASC"
    ).fetchall()
    conn.close()

    matches = [row_to_match(r) for r in rows if r is not None]

    if category and category != "All Cricket":
        if category == "IPL 2026":
            matches = [m for m in matches if "IPL" in str(m.get("tournament", ""))]
        elif category == "International":
            matches = [m for m in matches if "IPL" not in str(m.get("tournament", ""))]

    if status and status != "All":
        matches = [
            m for m in matches if str(m.get("status", "")).upper() == status.upper()
        ]

    return jsonify({"results": matches, "total": len(matches)})


@app.route("/api/sports/videos", methods=["GET"])
def get_cricket_videos():
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT * FROM cricket_videos ORDER BY sort_order ASC"
    ).fetchall()
    conn.close()

    videos = [row_to_cricket_video(r) for r in rows if r is not None]
    return jsonify({"results": videos, "total": len(videos)})


# ==========================================
# FAVORITES PERSISTENCE API (SQLite)
# ==========================================
@app.route("/api/favorites", methods=["GET"])
def get_favorites():
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT * FROM favorites ORDER BY added_at DESC"
    ).fetchall()
    conn.close()
    return jsonify({"results": [row_to_favorite(r) for r in rows if r is not None]})


@app.route("/api/favorites", methods=["POST"])
def add_or_toggle_favorite():
    data = request.get_json(silent=True) or {}
    movie_id = data.get("id")
    if not movie_id:
        return jsonify({"error": "Movie id is required"}), 400

    conn = get_db_connection()
    existing = conn.execute(
        "SELECT id FROM favorites WHERE id = ?", (movie_id,)
    ).fetchone()

    action = data.get("action", "toggle")
    if existing is not None and action in ("toggle", "remove"):
        conn.execute("DELETE FROM favorites WHERE id = ?", (movie_id,))
        conn.commit()
        conn.close()
        return jsonify({"status": "removed", "id": movie_id})

    added_at = data.get("addedAt") or int(time.time() * 1000)
    conn.execute(
        """
        INSERT OR REPLACE INTO favorites (
            id, title, poster_path, vote_average, release_date, genre_ids_json, added_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            movie_id,
            data.get("title", ""),
            data.get("poster_path", ""),
            data.get("vote_average", 0.0),
            data.get("release_date", ""),
            json.dumps(data.get("genre_ids", [])),
            added_at,
        ),
    )
    conn.commit()
    conn.close()
    return jsonify({"status": "added", "id": movie_id}), 201


@app.route("/api/favorites/<int:movie_id>", methods=["DELETE"])
def delete_favorite(movie_id: int):
    conn = get_db_connection()
    conn.execute("DELETE FROM favorites WHERE id = ?", (movie_id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "removed", "id": movie_id})


@app.route("/api/favorites", methods=["DELETE"])
def clear_favorites():
    conn = get_db_connection()
    conn.execute("DELETE FROM favorites")
    conn.commit()
    conn.close()
    return jsonify({"status": "cleared"})


# ==========================================
# MEDIA UPLOADS API (SQLite)
# ==========================================
@app.route("/api/uploads", methods=["GET"])
def get_uploads():
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT * FROM uploads ORDER BY rowid DESC"
    ).fetchall()
    conn.close()
    return jsonify({"results": [row_to_upload(r) for r in rows if r is not None]})


@app.route("/api/uploads", methods=["POST"])
def create_upload():
    data = request.get_json(silent=True) or {}
    upload_id = data.get("id") or f"upl-{int(time.time() * 1000)}"
    title = str(data.get("title") or "").strip()
    if not title:
        return jsonify({"error": "Media title is required"}), 400

    category = data.get("category", "Trailer")
    description = data.get("description") or "No description provided."
    file_name = data.get("fileName", "video.mp4")
    file_size = data.get("fileSize", "25.0 MB")
    created_at = data.get("createdAt") or datetime.now().strftime("%Y-%m-%d")
    duration = data.get("duration", "3:00")

    conn = get_db_connection()
    conn.execute(
        """
        INSERT OR REPLACE INTO uploads (
            id, title, category, description, file_name, file_size, created_at, duration
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (upload_id, title, category, description, file_name, file_size, created_at, duration),
    )
    conn.commit()
    conn.close()

    return jsonify({
        "id": upload_id,
        "title": title,
        "category": category,
        "description": description,
        "fileName": file_name,
        "fileSize": file_size,
        "createdAt": created_at,
        "duration": duration,
    }), 201


@app.route("/api/uploads/<upload_id>", methods=["DELETE"])
def delete_upload(upload_id: str):
    conn = get_db_connection()
    conn.execute("DELETE FROM uploads WHERE id = ?", (upload_id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "deleted", "id": upload_id})


# ==========================================
# SERVE REACT FRONTEND BUILD (SPA FALLBACK)
# ==========================================
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path: str):
    if os.path.exists(FRONTEND_DIST):
        clean_path = path.lstrip("/")
        target_path = os.path.join(FRONTEND_DIST, clean_path)
        if clean_path != "" and os.path.exists(target_path) and os.path.isfile(target_path):
            return send_from_directory(FRONTEND_DIST, clean_path)
        index_file = os.path.join(FRONTEND_DIST, "index.html")
        if os.path.exists(index_file):
            return send_from_directory(FRONTEND_DIST, "index.html")

    return jsonify({
        "service": "Movie Explorer Flask Backend API",
        "status": "running",
    })


@app.errorhandler(404)
def handle_404_spa_fallback(_error: Any):
    """
    Guarantee that refreshing or opening any React Router URL in a new tab
    (e.g. /movie/1159302, /telugu, /english, /sports) NEVER returns 404 Not Found.
    """
    if request.path.startswith("/api/"):
        is_xhr = request.headers.get("X-Requested-With") == "XMLHttpRequest"
        if is_xhr:
            return jsonify({"error": "Endpoint not found"}), 404

    index_file = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.exists(index_file):
        return send_from_directory(FRONTEND_DIST, "index.html"), 200
    return redirect("/")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Movie Explorer Flask Backend on http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)
