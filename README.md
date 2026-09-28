# AfterDay Horizon Homepage

Frontend-only React + Vite implementation of Figma Homepage `64:583` in file `v2XKMjyHEzhlegx1nxOK2a`, with Style Guide `77:681` inspected through Figma Desktop MCP.

## Run

```sh
npm install
npm run dev -- --port 5173
```

Open http://127.0.0.1:5173/. Production build: `npm run build`.

## Validation

`npx playwright test` uses installed Microsoft Edge in headless mode. It checks desktop dimensions, asset loading, responsive overflow, navigation, language selection, galleries, and image dialogs. Screenshots are written to `artifacts/`.

## Design implementation

- All 35 exported Homepage raster/vector assets are stored locally in `public/assets` and mapped in `src/assets.js`. Original SVG dimensions are retained.
- The exact Gotham Book installed locally and the Kumbh Sans, Noto Sans, and Wix Madefor Display fonts are served locally from `public/fonts`.
- CSS variables preserve the Style Guide's actual fill/variable values. Printed swatch labels in Figma are inconsistent with those fills. Homepage text keeps its actual assigned font families.
- The original desktop layout follows the 1440 px Figma frame. The awards section was subsequently redesigned at the user's request with responsive HTML content and individual photo galleries. Mobile reflows the content because no mobile Homepage frame was supplied.
- The empty My DEMO region is intentional: the source design supplies no playable demo or video.
- Header navigation and the calls to action scroll to Homepage sections. English is the sole supplied language. Artwork and awards open in keyboard-accessible image dialogs.

## Updated awards section

`src/Awards.jsx` and `src/awards.css` replace the two full-slide award images with semantic headings, selectable paragraphs, year labels, and seven individually interactive photographs. Photography is displayed using CSS crops of the original Figma exports; the exports themselves remain unmodified. Each photo can be enlarged, with previous/next controls, keyboard arrows, Escape dismissal, focus restoration, and background scroll locking. Cards stack on mobile. Original award descriptions are preserved.

## Unified full-width design

The rest of the Homepage now uses the same visual system as Project awards: a `#060807` full-width page background, `#0b0e0c` content surfaces, translucent borders, 20–28px corner radii, green status accents, restrained shadows, and shared responsive spacing. Header, hero, About, roles, How to play, features, demo, call-to-action, awards, and footer all span the viewport; their readable content remains centered at a 1200px maximum. Fixed 1440px scaling and the former CSS `zoom` behavior have been removed.

## Items needing source information

- Figma Desktop changed to a different document during implementation. Additional gallery nodes cannot currently be retrieved. Nine gallery controls preserve the design; for now they cycle between the two captured Homepage gallery images. Full unique slide sets need the original document reopened.
- No social account URLs were supplied by the inspected design. Footer icons currently open their respective social platforms, not verified AfterDay accounts. Replace those URLs in `src/App.jsx` when provided.

No backend, database, authentication, or additional pages are included.
