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

## GitHub Pages

Ensure your repository Settings → Pages is configured to serve from the `docs/` folder. Relative paths are used (`./styles.css`, `./js/app.js`, `./assets/...`) so the site works under your repo subpath.

## Currency

- The in-game currency is Gold Pieces (`GP`). UI labels, costs, rewards, and notifications display amounts as `GP`. Internal state continues to use `player.gold` for value storage.