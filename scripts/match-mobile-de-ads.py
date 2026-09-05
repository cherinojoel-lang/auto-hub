import json
import re

def load_md(path):
    with open(path) as f:
        line1 = f.readline()
        return json.loads(line1)["items"][0]["markdown"]

p1 = load_md("/Users/joelcherinodiaz/.gemini/antigravity-cli/brain/ff5ed5a6-e02f-4642-8fd1-b22c987e0363/.system_generated/steps/869/output.txt")
p2 = load_md("/Users/joelcherinodiaz/.gemini/antigravity-cli/brain/ff5ed5a6-e02f-4642-8fd1-b22c987e0363/.system_generated/steps/881/output.txt")

all_md = p1 + "\n" + p2

entries = []
blocks = re.split(r"(?=### )", all_md)
for b in blocks:
    if "adId=" not in b:
        continue
    ad_id_match = re.search(r"adId=(\d+)", b)
    title_match = re.search(r"### (?:NEU)?([^\n]+)", b)
    img_match = re.search(r"!\[[^\]]*\]\((https://img\.classistatic\.de/[^\)]+)\)", b)
    ez_match = re.search(r"EZ (\d{2}/\d{4})", b)
    km_match = re.search(r"([\d\.]+)\s*km", b)
    kw_match = re.search(r"(\d+)\s*kW", b)
    price_match = re.search(r"([\d\.]+)\s*€", b)
    
    if ad_id_match and title_match:
        entries.append({
            "adId": ad_id_match.group(1),
            "title": title_match.group(1).replace("\\*", "*").strip(),
            "img": img_match.group(1) if img_match else None,
            "ez": ez_match.group(1) if ez_match else None,
            "km": km_match.group(1) if km_match else None,
            "kw": kw_match.group(1) if kw_match else None,
            "price": price_match.group(1) if price_match else None
        })

unique_ads = {e["adId"]: e for e in entries}

# Load local vehicles
with open("src/data/vehiclesData.generated.ts") as f:
    content = f.read()
array_str = re.search(r"export const vehiclesData: Vehicle\[\] = (\[[\s\S]*?\]);", content).group(1)
vehicles = json.loads(array_str)
available = [v for v in vehicles if v["status"] == "available"]

print(f"{len(available)} Local Available Vehicles vs {len(unique_ads)} Mobile.de Ads\n")

matches = []
for v in available:
    matched_ad = None
    confidence = "NONE"
    
    # Try exact match first
    for adId, ad in unique_ads.items():
        same_ez = (v["firstRegistration"] == ad["ez"])
        v_km = int(re.sub(r"[^\d]", "", v["mileage"])) if v["mileage"] else 0
        ad_km = int(re.sub(r"[^\d]", "", ad["km"])) if ad["km"] else 0
        same_km = abs(v_km - ad_km) < 500
        same_make = v["make"].lower() in ad["title"].lower()
        
        if same_ez and same_km and same_make:
            matched_ad = ad
            confidence = "HIGH (EZ+KM+Make)"
            break
            
    if not matched_ad:
        for adId, ad in unique_ads.items():
            same_ez = (v["firstRegistration"] == ad["ez"])
            same_make = v["make"].lower() in ad["title"].lower()
            if same_ez and same_make:
                matched_ad = ad
                confidence = "MEDIUM (EZ+Make)"
                break

    matches.append({
        "local_id": v["id"],
        "local_title": v["title"],
        "local_ez": v["firstRegistration"],
        "local_km": v["mileage"],
        "local_price": v["price"],
        "local_images": len(v["gallery"]),
        "matched_ad_id": matched_ad["adId"] if matched_ad else "UNMATCHED",
        "matched_title": matched_ad["title"] if matched_ad else None,
        "matched_ez": matched_ad["ez"] if matched_ad else None,
        "matched_km": matched_ad["km"] if matched_ad else None,
        "matched_price": matched_ad["price"] if matched_ad else None,
        "confidence": confidence
    })

matched_count = sum(1 for m in matches if m["matched_ad_id"] != "UNMATCHED")
print(f"MATCHED: {matched_count} / {len(available)}\n")

for m in matches:
    lid = m["local_id"]
    aid = m["matched_ad_id"]
    conf = m["confidence"]
    print(f"[{lid}] -> Ad: {aid} ({conf})")
    print(f"   Local:  {m['local_title']} | EZ {m['local_ez']} | {m['local_km']} | {m['local_price']}")
    if m["matched_title"]:
        print(f"   Mobile: {m['matched_title']} | EZ {m['matched_ez']} | {m['matched_km']} km | {m['matched_price']} €")
    print()
