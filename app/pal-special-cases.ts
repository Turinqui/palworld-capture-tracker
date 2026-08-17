export type PalSpecialCase = {
  catchable: false;
  label: string;
  reason: string;
};

// Palpedia entries which are intentionally excluded from capture goals.
// Keep this separate from exporter parsing so game-specific acquisition rules
// can be reviewed and updated without changing the JSON format.
export const PAL_SPECIAL_CASES: Readonly<Record<string, PalSpecialCase>> = {
  WorldTreeDragon: {
    catchable: false,
    label: "Uncatchable boss",
    reason: "Palpedia entry unlocked by defeating the final boss",
  },
};

export function getPalSpecialCase(id: string): PalSpecialCase | null {
  return PAL_SPECIAL_CASES[id] ?? null;
}

