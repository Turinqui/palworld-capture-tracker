# Changelog

## 0.5.0 - 2026-08-21

- Distinguish special Lv.80 World Tree Aura encounters from normal World Tree habitat in the map chooser.
- Mark verified Aura-only World Tree entries as poor deliberate farming targets while keeping their PalDB map links available.
- Keep spawn-context metadata separate from the capture export so the exporter stays focused on capture counts.

## 0.4.1 - 2026-08-17

- Improve habitat-map button contrast in dark mode.
- Add a clearly visible keyboard focus ring to habitat-map actions.

## 0.4.0 - 2026-08-17

- Make catchable Pal names clickable with a habitat-map indicator.
- Add a compact world and day/night chooser for each Pal.
- Open stable-ID-filtered PalDB maps in a new tab with clear attribution.
- Keep third-party map assets and data on PalDB rather than embedding or hotlinking them.

## 0.3.1 - 2026-08-17

- Exclude Astralym, the uncatchable final boss, from capture goals and "Never caught" totals.
- Keep Astralym visible in the full Paldeck list with an explicit uncatchable-boss label.
- Base captured-species totals on the 287 currently catchable Paldeck entries.

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
