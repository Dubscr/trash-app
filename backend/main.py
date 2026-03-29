from flask import Flask, jsonify, request, send_from_directory
import time
import datetime
import database
import imagehandler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def get_current_unix_time():
    return int(time.time())


## API Calls ##
@app.route("/reports", methods=["GET"])
def get_reports():
    reports = database.get_all_reports()
    return jsonify(reports)


@app.route("/reports", methods=["POST"])
def add_report():
    is_multipart_request = (request.content_type or "").startswith("multipart/form-data")

    if is_multipart_request:
        data = request.form
        uploaded_image = request.files.get("image")

        if uploaded_image is None or uploaded_image.filename == "":
            return jsonify({"error": "image file is required"}), 400

        try:
            img = imagehandler.save_uploaded_file(uploaded_image)
        except ValueError as error:
            return jsonify({"error": str(error)}), 400
    else:
        data = request.get_json(silent=True) or {}
        img = data.get("image_path")

    username = data.get("username")
    t_type = data.get("trash_type")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    if not username:
        return jsonify({"error": "username is required"}), 400

    if not t_type:
        return jsonify({"error": "trash_type is required"}), 400

    try:
        latitude = float(latitude)
        longitude = float(longitude)
    except (TypeError, ValueError):
        return jsonify({"error": "latitude and longitude must be numbers"}), 400

    reported_at = get_current_unix_time()
    database.add_report(username, img, t_type, latitude, longitude, reported_at)

    return jsonify({"message": "Report added successfully", "reported_at": reported_at})


@app.route("/reports/<int:report_id>", methods=["DELETE"])
def delete_report(report_id):
    success = database.delete_report(report_id)

    if success:
        return jsonify({"message": "Deleted"})
    return jsonify({"error": "Report not found"}), 404


@app.route("/reports/user/<username>", methods=["GET"])
def reports_by_user(username):
    return jsonify(database.get_reports_by_user(username))


@app.route("/reports/type/<trash_type>", methods=["GET"])
def reports_by_type(trash_type):
    return jsonify(database.get_reports_by_type(trash_type))


@app.route("/reports/daily", methods=["GET"])
def daily_reports():
    return jsonify(database.get_daily_images(get_current_unix_time()))


@app.route("/reports/leaderboard", methods=["GET"])
def get_leaderboard():
    return jsonify(database.get_leaderboard())


@app.route("/images/<path:filename>", methods=["GET"])
def get_uploaded_image(filename):
    return send_from_directory(imagehandler.ensure_images_dir(), filename)

## Functions ##
def test_upload():
    # TEMPORARY UPLOAD. THIS IS SIMULATING THE WEBSITE'S UPLOADING
    print("--- Trash Reporting System ---")
    imgpath = input("Image Path: ")

    img = imagehandler.path_to_image(imgpath)
    saved_image_path = imagehandler.download_pillow_image(img, "uploaded_image.png")

    user = input("Username: ")
    trash = input("Trash Type (Plastic/Metal/etc): ")
    latitude = float(input("Latitude: "))
    longitude = float(input("Longitude: "))
    reported_at = get_current_unix_time()

    database.add_report(user, saved_image_path, trash, latitude, longitude, reported_at)

    print(f"Success! Report saved for {user}.")


def main():
    database.initialize_db()
    reports = database.get_all_reports()
    # Simulate uploading a report
    # test_upload()

    if not reports:
        print("No reports found.")
    else:
        for report in reports:
            # Each report is (id, username, image, type, latitude, longitude, reported_at)
            print(
                f"ID: {report[0]}\n"
                f"User: {report[1]}\n"
                f"Image: {report[2]}\n"
                f"Type: {report[3]}\n"
                f"Latitude: {report[4]}\n"
                f"Longitude: {report[5]}\n"
                f"Reported At: {report[6]}"
            )


if __name__ == "__main__":
    main()
    app.run(debug=True)
