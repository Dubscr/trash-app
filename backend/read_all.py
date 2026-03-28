import os
import sqlite3

DB_NAME = os.path.join(os.path.dirname(os.path.abspath(__file__)), "trash_app.db")

# connect to the database file
conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

# 1. get all table names
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("=== TABLES FOUND ===")
for table in tables:
    print("-", table[0])

# 2. loop through each table and print its data
for table in tables:
    table_name = table[0]

    print(f"\n=== DATA FROM: {table_name} ===")

    try:
        cursor.execute(f"SELECT * FROM {table_name};")
        rows = cursor.fetchall()

        if not rows:
            print("(no data)")
        else:
            for row in rows:
                print(row)

    except Exception as e:
        print("Error reading table:", e)

# close connection
conn.close()
