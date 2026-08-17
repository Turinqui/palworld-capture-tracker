# Changelog

## 0.3.0 - 2026-08-17

- Support the exporter's complete 288-entry runtime Paldeck catalogue.
- Show genuinely never-captured Pals from explicit zero-count rows.
- Preserve names, localisation keys, and Paldeck numbers during import.
- Show captured species as a caught/total Paldeck count.
- Distinguish complete v0.2 exports from older caught-only files.
- Ignore separately preserved human and special non-Paldeck capture records.

## 0.2.0 - 2026-08-17

- Change the default capture milestone from 12 to 5 for Palworld 1.0.
- Add a persistent dark-mode toggle which initially follows the device preference.
- Resolve internal IDs to verified in-game English names where the bundled catalogue has coverage.
- Keep unresolved IDs explicit instead of presenting generated words as Pal names.

## 0.1.0 - 2026-08-17

- Add local drag-and-drop JSON import.
- Validate the exporter structure and show useful import errors.
- Summarise captured species, total captures, milestone completion, and catches remaining.
- Add search, capture-goal editing, and completion filters.
- Keep raw internal IDs visible for stable matching and forward compatibility.
- Add mobile layouts and project data-attribution boundaries.
