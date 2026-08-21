import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("ships a valid and attributable habitat index", async () => {
  const raw = await readFile(new URL("../app/pal-habitats.json", import.meta.url), "utf8");
  const habitats = JSON.parse(raw);
  const palpagos = habitats.maps.palpagos;
  const worldTree = habitats.maps.worldTree;

  assert.equal(habitats.source.license, "MIT");
  assert.match(habitats.source.steamBuildId, /^\d+$/);
  assert.ok(palpagos.length > 0);
  assert.ok(worldTree.length > 0);
  assert.equal(new Set(palpagos).size, palpagos.length);
  assert.equal(new Set(worldTree).size, worldTree.length);
  assert.ok(worldTree.some((id) => palpagos.includes(id)), "expected some Pals to appear on both maps");
});

test("keeps curated acquisition exceptions explicit", async () => {
  const notes = await readFile(new URL("../app/pal-habitat-notes.ts", import.meta.url), "utf8");
  assert.match(notes, /Penguin_Electric:\s*\{\s*acquisition:\s*"fishing",\s*fishingWorld:\s*"palpagos",\s*fishingTime:\s*"night"\s*\}/);
  assert.match(notes, /Deer_Ground:\s*\{\s*worldTree:\s*"rare-aura-only"\s*\}/);
});

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});
