from PIL import Image
import os
def download_pillow_image(image_input, filename):
    localpath = os.path.dirname(os.path.abspath(__file__)) + "/images/"
    try:
        image_input.save(localpath + filename)
        print(f"Image successfully saved to: {localpath + filename}")
        return localpath + filename
    except Exception as e:
        print(f"Error saving image: {e}")

def path_to_image(path):
    img = Image.open(path)
    return img