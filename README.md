# Palworld Capture Tracker

An unofficial, browser-based tracker for JSON files created by
[palworld-capture-exporter](https://github.com/Turinqui/palworld-capture-exporter).

## Current proof of concept

- Drag-and-drop or choose a capture export.
- Process the file entirely in the browser.
- Show captured-species and total-capture summaries.
- Set a capture milestone and see remaining catches.
- Search and filter by stable internal Pal ID.
- Preserve unknown IDs instead of silently dropping new game content.

The exporter currently emits a sparse capture map: species which have never
been captured are absent. A separate, versioned catalogue is therefore required
before the tracker can show the complete Paldeck and genuine never-captured
species.

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
