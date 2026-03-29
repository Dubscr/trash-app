import os
import uuid
from pathlib import Path

from PIL import Image
from werkzeug.utils import secure_filename


IMAGES_DIR = Path(os.path.dirname(os.path.abspath(__file__))) / "images"


def ensure_images_dir():
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    return IMAGES_DIR


def download_pillow_image(image_input, filename):
    localpath = ensure_images_dir()
    try:
        save_path = localpath / filename
        image_input.save(save_path)
        print(f"Image successfully saved to: {save_path}")
        return str(save_path)
    except Exception as e:
        print(f"Error saving image: {e}")


def path_to_image(path):
    img = Image.open(path)
    return img


def save_uploaded_file(uploaded_file):
    if uploaded_file is None or uploaded_file.filename == "":
        raise ValueError("image file is required")

    ensure_images_dir()

    original_name = secure_filename(uploaded_file.filename)
    _, extension = os.path.splitext(original_name)
    filename = f"{uuid.uuid4().hex}{extension.lower() or '.png'}"
    save_path = IMAGES_DIR / filename

    uploaded_file.save(save_path)

    return filename
