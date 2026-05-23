## 2024-05-24 - [Security Fix - Data Exposure]
**Learning:** Avoid logging sensitive form data to the console, especially data that contains PII (e.g. name, email, phone number). The `console.log('Form submitted:', formData)` line exposed sensitive customer info in production build if dev tools are opened, or in logs.
**Action:** When logging forms or objects that may contain PII, either avoid logging the object entirely, or redact sensitive fields before logging.
