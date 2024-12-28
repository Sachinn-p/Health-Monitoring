import requests
while True:
    r = requests.get("http://127.0.0.1:8000/logs")
    print(r.content)