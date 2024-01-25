import requests
import json

def fetch_earthquake_data(url):

    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()  # Returns the JSON content of the response
        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# URL of the earthquake data
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

# Fetching the data
earthquake_data = fetch_earthquake_data(url)

def save_to_json(data, filename):

    try:
        with open(filename, 'w') as file:
            json.dump(data, file, indent=4)
        print(f"Data successfully saved to {filename}")
    except Exception as e:
        print(f"An error occurred while saving the file: {e}")

earthquake_data = fetch_earthquake_data("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")

# Save the earthquake data to a JSON file
save_to_json(earthquake_data, "earthquake_data.json")

