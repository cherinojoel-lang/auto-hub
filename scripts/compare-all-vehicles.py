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
    ez_match = re.search(r"EZ (\d{2}/\d{4})", b)
    km_match = re.search(r"([\d\.]+)\s*km", b)
    kw_match = re.search(r"(\d+)\s*kW", b)
    price_match = re.search(r"([\d\.]+)\s*€", b)
    
    if ad_id_match and title_match:
        entries.append({
            "adId": ad_id_match.group(1),
            "title": title_match.group(1).replace("\\*", "*").strip(),
            "ez": ez_match.group(1) if ez_match else None,
            "km": km_match.group(1) if km_match else None,
            "kw": kw_match.group(1) if kw_match else None,
            "price": price_match.group(1) if price_match else None
        })

unique_ads = {e["adId"]: e for e in entries}

with open("src/data/vehiclesData.generated.ts") as f:
    content = f.read()
array_str = re.search(r"export const vehiclesData: Vehicle\[\] = (\[[\s\S]*?\]);", content).group(1)
vehicles = json.loads(array_str)
available = [v for v in vehicles if v["status"] == "available"]

print("=== ALL 20 LOCAL VEHICLES ===")
for v in available:
    print(f"- [{v['id']}] {v['title']} | EZ: {v['firstRegistration']} | {v['mileage']} | {v['price']}")

print("\n=== ALL 31 MOBILE.DE ADS ===")
for adId, ad in sorted(unique_ads.items(), key=lambda x: x[1]["title"]):
    print(f"- [{adId}] {ad['title']} | EZ: {ad['ez']} | {ad['km']} km | {ad['price']} €")
