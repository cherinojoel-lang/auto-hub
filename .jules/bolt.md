## 2024-05-18 - Image Component Lazy Loading
**Learning:** Defaulting to `loading="lazy"` on lower-level image components like `<WixImage>` and `<Image>` provides a quick frontend performance win without touching every individual usage, but requires being able to override it for above-the-fold images.
**Action:** Implemented default `loading: 'lazy'` while allowing `{...props}` to override it when `loading="eager"` is passed from parent components.
