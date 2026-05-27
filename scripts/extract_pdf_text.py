import fitz
import sys
import os

def extract(pdf_path):
    print(f"\n--- EXTRACTING: {os.path.basename(pdf_path)} ---")
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        print(text)
    except Exception as e:
        print(f"Error extracting {pdf_path}: {e}")

pdfs = [
    "extracted_archiv_2/nested_archiv/Autohaus-Website Masterplan 2026.pdf",
    "extracted_archiv_2/nested_archiv/Automobile-quick - Codex Plan Ergänzung.pdf",
    "extracted_archiv_2/nested_archiv/Zusammenfassung.pdf"
]

for pdf in pdfs:
    if os.path.exists(pdf):
        extract(pdf)
    else:
        print(f"File not found: {pdf}")
