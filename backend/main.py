from flask import Flask, request, jsonify
import database
import imagehandler
import os

app = Flask(__name__)

## API Calls ##
@app.route("/reports", methods=["GET"])
def get_reports():
    reports = database.get_all_reports()
    return jsonify(reports)

@app.route("/reports", methods=["POST"])
def add_report():
    data = request.json

    username = data.get("username")
    img = data.get("image_path")
    t_type = data.get("trash_type")
    loc = data.get("location")

    database.add_report(username, img, t_type, loc)

    return jsonify({"message": "Report added successfully"})

@app.route("/reports/<int:report_id>", methods=["DELETE"])
def delete_report(report_id):
    success = database.delete_report(report_id)

    if success:
        return jsonify({"message": "Deleted"})
    else:
        return jsonify({"error": "Report not found"}), 404

@app.route("/reports/user/<username>", methods=["GET"])
def reports_by_user(username):
    return jsonify(database.get_reports_by_user(username))

@app.route("/reports/type/<trash_type>", methods=["GET"])
def reports_by_type(trash_type):
    return jsonify(database.get_reports_by_type(trash_type))

@app.route("/reports/location/<location>", methods=["GET"])
def reports_by_location(location):
    return jsonify(database.get_reports_by_location(location))


## Functions ##
def test_upload():
    #TEMPORARY UPLOAD. THIS IS SIMULATING THE WEBSITE'S UPLOADING
    print("--- Trash Reporting System ---")
    imgpath = input("Image Path: ")

    img = imagehandler.path_to_image(imgpath)
    saved_image_path = imagehandler.download_pillow_image(img, "uploaded_image.png")

    user = input("Username: ")
    trash = input("Trash Type (Plastic/Metal/etc): ")
    loc = input("Location: ")

    database.add_report(user, saved_image_path, trash, loc)
    
    print(f"Success! Report saved for {user}.")

def main():
    # Database Stuff
    database.initialize_db()
    reports = database.get_all_reports()

    # Simulate uploading a report
    #test_upload()
    
    if not reports:
        print("No reports found.")
    else:
        for report in reports:
            # Each 'report' is a tuple like (id, username, image, type, location)
            print(f"ID: {report[0]}\nUser: {report[1]}\nImage: {report[2]}\nType: {report[3]}\nLocation: {report[4]}")

if __name__ == "__main__":
    main()
    app.run(debug=True)