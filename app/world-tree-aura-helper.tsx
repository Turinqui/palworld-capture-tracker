"use client";

import { useEffect } from "react";
import { PAL_HABITAT_NOTES, type PalHabitatNote } from "./pal-habitat-notes";
import palNameData from "./pal-names.json";

type NameData = { names: Record<string, string>; suffixes: Record<string, string>; overrides: Record<string, string> };
const nameData = palNameData as NameData;

function resolveNameFromId(id: string) {
  const override = nameData.overrides[id];
  if (override) return override;
  const parts = id.split("_");
  const base = nameData.names[parts[0]];
  if (!base) return null;
  const suffix = parts.length > 1 ? nameData.suffixes[parts.at(-1) ?? ""] : null;
  return suffix ? `${base} ${suffix}` : base;
}

const notesByName = new Map<string, PalHabitatNote>();
for (const [id, note] of Object.entries(PAL_HABITAT_NOTES)) {
  const name = resolveNameFromId(id);
  if (name) notesByName.set(name, note);
}

function decorateModal(modal: Element) {
  if (modal.querySelector("[data-world-tree-aura-note]")) return;
  const title = modal.querySelector("#map-dialog-title")?.textContent?.trim();
  if (!title) return;
  const note = notesByName.get(title);
  if (!note?.worldTree) return;

  const worldCards = modal.querySelectorAll(".map-worlds > div");
  const worldTreeCard = worldCards.item(1);
  const worldTreeHeading = worldTreeCard?.querySelector("strong");
  if (!worldTreeCard || !worldTreeHeading) return;

  const badge = document.createElement("span");
  badge.dataset.worldTreeAuraNote = "badge";
  badge.className = "special-badge";
  badge.textContent = note.worldTree === "rare-aura-only" ? "Rare Aura" : "Aura + normal";
  worldTreeHeading.appendChild(badge);

  const explanation = document.createElement("p");
  explanation.dataset.worldTreeAuraNote = "explanation";
  explanation.className = "map-modal-note";
  explanation.style.marginTop = "10px";
  explanation.innerHTML = note.worldTree === "rare-aura-only"
    ? "<strong>World Tree note:</strong> PalDB lists this Pal there only through the special Lv.80 <code>WorldTreeAura</code> random spawn. Treat it as an opportunistic catch, not an efficient species-farming location."
    : "<strong>World Tree note:</strong> This Pal has normal World Tree habitat as well as the special Lv.80 <code>WorldTreeAura</code> spawn, so it is still practical to hunt here.";
  worldTreeCard.appendChild(explanation);
}

export default function WorldTreeAuraHelper() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll(".map-modal").forEach(decorateModal);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll(".map-modal").forEach(decorateModal);
    return () => observer.disconnect();
  }, []);

  return null;
}
