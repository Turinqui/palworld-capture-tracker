export type PalHabitatNote = {
  worldTree?: "rare-aura-only" | "normal-and-aura";
  note?: string;
};

// Curated from current PalDB spawn tables. Keep this separate from capture exports:
// the export says how many were caught, while this file adds hunting-context metadata.
// `rare-aura-only` means the Pal's only wild World Tree entry is the special
// Lv.80 worldtree_9_55_WorldTreeAura pool, so it is a poor deliberate farming target there.
export const PAL_HABITAT_NOTES: Record<string, PalHabitatNote> = {
  Deer_Ground: { worldTree: "rare-aura-only" }, // Eikthyrdeer Terra
  Umihebi: { worldTree: "rare-aura-only" }, // Jormuntide
  Gorilla_Ground: { worldTree: "rare-aura-only" }, // Gorirat Terra
  Umihebi_Fire: { worldTree: "rare-aura-only" }, // Jormuntide Ignis
  CubeTurtle: { worldTree: "rare-aura-only" }, // Tetroise
  BlueThunderHorse: { worldTree: "rare-aura-only" }, // Azurmane
  BlackMetalDragon: { worldTree: "rare-aura-only" }, // Astegon
  LotusDragon: { worldTree: "rare-aura-only" }, // Ophydia
  KabukiMan: { worldTree: "rare-aura-only" }, // Renjishi
  GrassMinotaur: { worldTree: "rare-aura-only" }, // Elgrove
  FengyunDeeper: { worldTree: "rare-aura-only" }, // Fenglope
  Yeti_Grass: { worldTree: "rare-aura-only" }, // Wumpo Botan
  Kirin: { worldTree: "rare-aura-only" }, // Univolt
  BlackGriffon: { worldTree: "rare-aura-only" }, // Shadowbeak

  LilyQueen_Dark: { worldTree: "normal-and-aura" }, // Lyleen Noct
  Horus_Water: { worldTree: "normal-and-aura" }, // Faleris Aqua
  SnowTigerBeastman: { worldTree: "normal-and-aura" }, // Bastigor
  ThunderDragonMan: { worldTree: "normal-and-aura" }, // Orserk
  GrassPanda_Electric: { worldTree: "normal-and-aura" }, // Mossanda Lux
  IceNarwhal_Fire: { worldTree: "normal-and-aura" }, // Whalaska Ignis
  ElecPanda: { worldTree: "normal-and-aura" }, // Grizzbolt
  LilyQueen: { worldTree: "normal-and-aura" }, // Lyleen
  MoonQueen: { worldTree: "normal-and-aura" }, // Selyne
};

export function getPalHabitatNote(id: string): PalHabitatNote | null {
  return PAL_HABITAT_NOTES[id] ?? null;
}
