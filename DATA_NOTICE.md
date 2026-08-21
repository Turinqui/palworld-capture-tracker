# Data and attribution notice

This project is an unofficial fan-made tool. Palworld, its names, terminology,
and underlying game data belong to their respective rights holders.

The application source code is licensed separately under the MIT License.
That licence does not claim ownership of, or grant rights to, third-party game
data.

The application accepts capture-count JSON produced by
`palworld-capture-exporter`. Its Pal catalogue is generated from factual fields
in a locally installed copy of the game. It does not include extracted artwork,
audio, maps, or other expressive assets.

Public databases and community guides may be used to cross-check individual
facts. Their datasets are not to be copied into this repository without an
explicit compatible licence or permission.

## Habitat index

`app/pal-habitats.json` contains only stable Pal IDs grouped by the Palpagos and
World Tree overworld maps. It is derived from the MIT-licensed
[`Awy64/palworld-atlas-data`](https://github.com/Awy64/palworld-atlas-data)
spawn dataset. Its source repository, licence, generation timestamp, and Steam
build ID are recorded in the file. No map images, coordinates, or third-party
site assets are included.

`app/pal-habitat-notes.ts` contains a small curated set of factual acquisition
notes cross-checked against current PalDB spawn tables. These notes distinguish
fishing and special World Tree Aura encounters from ordinary overworld habitat;
they do not copy coordinates, maps, artwork, or other PalDB assets.

## Current name seed

The initial internal-ID name seed is adapted from the MIT-licensed
[`collector/pal-names.json`](https://github.com/Noval1th/PalworldDashboard/blob/main/collector/pal-names.json)
in [Noval1th/PalworldDashboard](https://github.com/Noval1th/PalworldDashboard).
Its upstream notes describe it as hand-maintained and cross-checked against
in-game labels and public references. Unresolved IDs remain visible and will be
replaced by a catalogue independently extracted from the current game files.
