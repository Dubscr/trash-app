class Entry:
    def __init__(self, username, image, location, trash_type):
        self.username = username
        self.image = image
        self.location = location
        trash_type = trash_type

entries = []

def add_entry(entry):
    entries.append(entry)
    print("Added new entry from: " + entry.username)