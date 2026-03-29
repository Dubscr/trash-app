import os
import sqlite3

DB_NAME = os.path.join(os.path.dirname(os.path.abspath(__file__)), "trash_app.db")


def initialize_db():
    """Creates the table if it doesn't exist."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS trash_reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                image_path TEXT,
                trash_type TEXT,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                reported_at INTEGER NOT NULL
            )
            """
        )
        conn.commit()


def add_report(username, img, t_type, latitude, longitude, reported_at):
    """Inserts a new row into the database."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        query = """
            INSERT INTO trash_reports
            (username, image_path, trash_type, latitude, longitude, reported_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """
        cursor.execute(query, (username, img, t_type, latitude, longitude, reported_at))
        conn.commit()


def delete_report(report_id):
    """Deletes a single report by its ID."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        query = "DELETE FROM trash_reports WHERE id = ?"
        cursor.execute(query, (report_id,))
        conn.commit()
        return cursor.rowcount > 0


def get_all_reports():
    """Returns a list of all rows in the table."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, username, image_path, trash_type, latitude, longitude, reported_at
            FROM trash_reports
            """
        )
        return cursor.fetchall()


def get_reports_by_user(username):
    """Returns all reports for a specific username."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        query = """
            SELECT id, username, image_path, trash_type, latitude, longitude, reported_at
            FROM trash_reports
            WHERE username = ?
        """
        cursor.execute(query, (username,))
        return cursor.fetchall()


def get_reports_by_type(trash_type):
    """Returns all reports matching a specific trash type (e.g., 'Plastic')."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        query = """
            SELECT id, username, image_path, trash_type, latitude, longitude, reported_at
            FROM trash_reports
            WHERE trash_type = ?
        """
        cursor.execute(query, (trash_type,))
        return cursor.fetchall()

def get_daily_images(current_time):
    daily_report_list = []
    for report in get_all_reports():
        if(report[6] >= current_time - 86400):
            daily_report_list.append(report)
    return daily_report_list

def get_leaderboard():
    all_reports = get_all_reports()
    score_dict = {}
    for report in all_reports:
        if(score_dict.get(report[1])):
            score_dict[report[1]] += 1
        else:
            score_dict[report[1]] = 1
    for user, score in score_dict.items():
        print(user, score)
    sorted_dict = dict(sorted(score_dict.items(), key=lambda item: item[1]))
    return sorted_dict