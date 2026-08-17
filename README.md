# Palworld Capture Tracker

An unofficial, browser-based tracker for JSON files created by
[palworld-capture-exporter](https://github.com/Turinqui/palworld-capture-exporter).

## Current proof of concept

- Drag-and-drop or choose a capture export.
- Process the file entirely in the browser.
- Show captured, never-caught, milestone, and remaining-catch summaries.
- Track the Palworld 1.0 five-capture milestone by default, with an editable goal.
- Search and filter by in-game display name, Paldeck number, or stable internal ID.
- Preserve unknown IDs instead of silently dropping new game content.
- Follow the device colour scheme and provide a persistent light/dark toggle.

Exporter v0.2.0 joins the sparse save record to Palworld's runtime catalogue,
so the imported file contains every Paldeck species/form and explicit zero
counts for never-captured Pals. Older v0.1 files remain importable but cannot
identify species absent from their caught-only data.

## Development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Privacy and safety

Imports stay in the browser. The app does not upload files, edit Palworld saves,
or communicate with the running game.

## Data and licensing

Original application code is available under the [MIT License](LICENSE).
See [DATA_NOTICE.md](DATA_NOTICE.md) for the separate treatment of game-derived
facts and third-party data.

Palworld and related names are the property of their respective rights holders.
This project is unofficial and is not affiliated with or endorsed by Pocketpair.
