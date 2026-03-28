from PIL import Image
import os
def download_pillow_image(image_input, filename):
    localpath = os.path.dirname(os.path.abspath(__file__)) + "/images/"
    try:
        image_input.save(localpath + filename)
        print(f"Image successfully saved to: {filename}")
    except Exception as e:
        print(f"Error saving image: {e}")

test_image = Image.new('RGB', (100, 100), color = 'red')
    
# 2. Call the function with the image object
download_pillow_image(test_image, "downloaded_image.png")