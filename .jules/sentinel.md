## 2025-03-08 - Added Input Length Limits (DoS prevention)
**Vulnerability:** Contact forms lacked client-side constraints on input lengths (name, email, phone, message).
**Learning:** Without length restrictions, users (or bots) can submit excessively large payloads, potentially leading to Application-level Denial of Service (DoS) or backend buffer issues.
**Prevention:** Always add `maxLength` attributes to `<input>` and `<textarea>` fields in React components. Standard safe values: Name (100), Email (254), Phone (30), Message (1000-2000).
