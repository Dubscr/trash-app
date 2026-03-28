import sqlite3

DB_NAME = 'trash_app.db'

def initialize_db():
    """Creates the table if it doesn't exist."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS trash_reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                image_path TEXT,
                trash_type TEXT,
                location TEXT
            )
        ''')
        conn.commit()

def add_report(username, img, t_type, loc):
    """Inserts a new row into the database."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        query = "INSERT INTO trash_reports (username, image_path, trash_type, location) VALUES (?, ?, ?, ?)"
        cursor.execute(query, (username, img, t_type, loc))
        conn.commit()

def delete_report(report_id):
    """Deletes a single report by its ID."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        # SQL command to remove a specific row
        query = "DELETE FROM trash_reports WHERE id = ?"
        cursor.execute(query, (report_id,))
        conn.commit()
        # rowcount tells us if anything actually got deleted
        return cursor.rowcount > 0 

def get_all_reports():
    """Returns a list of all rows in the table."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM trash_reports")
        # fetchall() retrieves all results as a list of tuples
        return cursor.fetchall()
    
def get_reports_by_user(username):
    """Returns all reports for a specific username."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        # Use '?' as a placeholder and pass the username in a tuple
        query = "SELECT * FROM trash_reports WHERE username = ?"
        cursor.execute(query, (username,))
        return cursor.fetchall()
    
def get_reports_by_type(trash_type):
    """Returns all reports matching a specific trash type (e.g., 'Plastic')."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        query = "SELECT * FROM trash_reports WHERE trash_type = ?"
        cursor.execute(query, (trash_type,))
        return cursor.fetchall()

def get_reports_by_location(location):
    """Returns all reports matching a specific location string."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        query = "SELECT * FROM trash_reports WHERE location = ?"
        cursor.execute(query, (location,))
        return cursor.fetchall()