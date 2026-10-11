# Checkin brand assets

Colours: ink `#191714`, cream `#FFFDF9`, orange `#E8743F`.
The wordmark is Instrument Sans SemiBold, already converted to shapes, so no
font is needed to render it.

| File | Where it goes |
| --- | --- |
| `logo.svg` | Website header on a light background |
| `logo-on-dark.svg` | Footers and anything on ink |
| `wordmark.svg` | The name on its own, no tile |
| `icon.svg` | The square mark, dark tile |
| `icon-light.svg` | The square mark, cream tile |
| `icon-square-fullbleed.svg` | Where the platform adds its own rounding |
| `favicon.svg` | Simplified for tiny sizes; also `src/app/icon.svg` |
| `icon-192.png`, `icon-512.png` | Android and web app icons |
| `whatsapp-profile-photo-640.png` | WhatsApp Business profile photo |

Prefer the SVGs on the website. The PNGs are for places that will not take SVG.
The browser tab icon and the iPhone home screen icon come from `src/app/icon.svg`
and `src/app/apple-icon.png`, which Next.js serves automatically.
