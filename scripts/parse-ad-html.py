import json
import re

with open("/Users/joelcherinodiaz/.gemini/antigravity-cli/brain/ff5ed5a6-e02f-4642-8fd1-b22c987e0363/.system_generated/steps/919/output.txt") as f:
    line = f.readline()
    data = json.loads(line)
    html = data["items"][0].get("html", "")
    print("HTML length:", len(html))
    
    # search for classistatic image URLs
    v_imgs = set(re.findall(r"https://img\.classistatic\.de/api/v1/mo-prod/images/[a-f0-9]+/[a-f0-9\-]+", html))
    print(f"Found {len(v_imgs)} vehicle photos:")
    for img in sorted(v_imgs):
        print(" -", img)
