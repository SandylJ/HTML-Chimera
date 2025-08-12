# Project Chimera (Web)

This repository hosts a single-page web game. The site is published via GitHub Pages from the `docs/` directory.

## Structure

- `docs/`
  - `index.html`
  - `styles.css`
  - `js/app.js`
  - `assets/` (optional, for images and other static files)

## Local development

Open `docs/index.html` in your browser.

## View toggle

Use the "View" dropdown in the header to switch between Desktop and Mobile layouts. The selection is saved to your browser and persists across reloads. In Mobile view, a bottom nav appears and the sidebar is accessible via the hamburger button.

## GitHub Pages

Ensure your repository Settings → Pages is configured to serve from the `docs/` folder. Relative paths are used (`./styles.css`, `./js/app.js`, `./assets/...`) so the site works under your repo subpath.