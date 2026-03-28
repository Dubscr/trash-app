from flask import Flask, jsonify, request

import database
import imagehandler

app = Flask(__name__)


## API Calls ##
@app.route("/reports", methods=["GET"])
def get_reports():
    reports = database.get_all_reports()
    return jsonify(reports)


@app.route("/reports", methods=["POST"])
def add_report():
    data = request.json or {}

    username = data.get("username")
    img = data.get("image_path")
    t_type = data.get("trash_type")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    try:
        latitude = float(latitude)
        longitude = float(longitude)
    except (TypeError, ValueError):
        return jsonify({"error": "latitude and longitude must be numbers"}), 400

    database.add_report(username, img, t_type, latitude, longitude)

    return jsonify({"message": "Report added successfully"})


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

    database.add_report(user, saved_image_path, trash, latitude, longitude)

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
