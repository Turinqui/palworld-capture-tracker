# Palworld Capture Tracker

An unofficial, browser-based tracker for JSON files created by
[palworld-capture-exporter](https://github.com/Turinqui/palworld-capture-exporter).

**Live tracker:** [palworld-capture-tracker.netlify.app](https://palworld-capture-tracker.netlify.app)

## Current proof of concept

- Drag-and-drop or choose a capture export.
- Process the file entirely in the browser.
- Show captured, never-caught, milestone, and remaining-catch summaries.
- Track the Palworld 1.0 five-capture milestone by default, with an editable goal.
- Search and filter by in-game display name, Paldeck number, or stable internal ID.
- Preserve unknown IDs instead of silently dropping new game content.
- Exclude known uncatchable Palpedia entries from capture goals while keeping them visible.
- Open PalDB habitat maps for any catchable Pal, filtered by world and day/night.
- Narrow “Still hunting” and “Never caught” lists by World Tree, Palpagos Islands,
  both maps, fishing, or other/special acquisition.
- Flag World Tree Aura-only Pals as rare opportunistic catches rather than efficient
  World Tree farming targets.
- Follow the device colour scheme and provide a persistent light/dark toggle.

Exporter v0.2.0 joins the sparse save record to Palworld's runtime catalogue,
so the imported file contains every Paldeck species/form and explicit zero
counts for never-captured Pals. Older v0.1 files remain importable but cannot
identify species absent from their caught-only data.

Astralym (`WorldTreeDragon`) is currently marked as an uncatchable final-boss
entry. It remains searchable in the full list but is excluded from captured,
never-caught, milestone, and catches-remaining totals.

Habitat buttons use the export's stable internal Pal ID to build attributed
links to PalDB. PalDB maps open in a new tab; no PalDB images are copied,
proxied, or embedded by this application.

The location filters use a compact, bundled index of factual spawn IDs derived
from the MIT-licensed
[`Awy64/palworld-atlas-data`](https://github.com/Awy64/palworld-atlas-data)
dataset. The recorded game build is stored alongside the index so future game
updates can be audited and refreshed without changing the exporter format.

Small curated habitat notes cover acquisition types outside the bulk overworld
index. Pengullet Lux is classified as Palpagos night fishing, while verified
World Tree Aura entries are labelled according to whether they also have normal
habitat there.

## Development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Netlify uses the browser-only static build configured in `netlify.toml`:

```bash
npm run build:netlify
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
