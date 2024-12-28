# import requests

# # Firebase Configuration
# DATABASE_URL = "https://land-slide-3f315-default-rtdb.europe-west1.firebasedatabase.app"
# API_KEY = "AIzaSyASuVzX-My8ofvDwCKxMlza29W9ZMRZ3tQ"

# def create_data(path, data):
#     """
#     Create data at the specified path.
#     :param path: Path in Firebase database (e.g., '/users/user1').
#     :param data: Dictionary containing the data to store.
#     :return: Response from Firebase.

#     """
#     url = f"{DATABASE_URL}{path}.json?auth={API_KEY}"
#     response = requests.post(url, json=data)
#     if response.status_code == 200:
#         print("Data created successfully:", response.json())
#     else:
#         print("Failed to create data:", response.text)


# def read_data(path):
#     """

#     Read data from the specified path.
#     :param path: Path in Firebase database (e.g., '/users').
#     :return: Data retrieved from Firebase.

#     """
#     url = f"{DATABASE_URL}{path}.json?auth={API_KEY}"
#     response = requests.get(url)
#     if response.status_code == 200:
#         return response.json()
#     else:
#         print("Failed to read data:", response.text)
#         return None

# def update_data(path, data):
#     """
#     Update data at the specified path.
#     :param path: Path in Firebase database (e.g., '/users/user1').
#     :param data: Dictionary containing the data to update.
#     :return: Response from Firebase.
#     """
#     url = f"{DATABASE_URL}{path}.json?auth={API_KEY}"
#     response = requests.patch(url, json=data)
#     if response.status_code == 200:
#         print("Data updated successfully:", response.json())
#     else:
#         print("Failed to update data:", response.text)

# def delete_data(path):
#     """
#     Delete data at the specified path.
#     :param path: Path in Firebase database (e.g., '/users/user1').
#     :return: Response from Firebase.
#     """
#     url = f"{DATABASE_URL}{path}.json?auth={API_KEY}"
#     response = requests.delete(url)
#     if response.status_code == 200:
#         print("Data deleted successfully!")
#     else:
#         print("Failed to delete data:", response.text)



import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import pprint as pp
# Fetch the service account key JSON file contents
cred = credentials.Certificate('credentials.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://health-care-94411-default-rtdb.firebaseio.com"
})



def get_heath():
    ref = db.reference('/health')
    return ref


def get_logs():
    ref = db.reference('/logs')
    return ref