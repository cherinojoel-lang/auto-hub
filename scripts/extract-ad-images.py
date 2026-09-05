import urllib.request
import json
import re

url = "https://api.apify.com/v2/datasets/VfmCchpcNdgjcQfsO/items"
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as resp:
    data = json.load(resp)
    html = data[0].get("html", "")
    print("HTML length:", len(html))
    
    # search for image URLs: classistatic.de
    imgs = set(re.findall(r"https://img\.classistatic\.de/api/v1/mo-prod/images/[a-zA-Z0-9/-]+", html))
    print(f"Found {len(imgs)} unique vehicle images:")
    for img in sorted(imgs):
        print(" -", img)
