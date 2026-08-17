"use client";

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";
import palNameData from "./pal-names.json";

type CaptureEntry = { id: string; name?: string; captureCount: number };
type CaptureExport = {
  schemaVersion?: number;
  exporterVersion?: string;
  gameVersion?: string | null;
  exportedAt?: string;
  source?: { platform?: string };
  pals: CaptureEntry[];
};
type Filter = "all" | "complete" | "incomplete" | "uncaught";

const SAMPLE_EXPORT: CaptureExport = {
  schemaVersion: 1,
  exporterVersion: "0.1.0",
  gameVersion: "1.0.3",
  exportedAt: "2026-08-17T02:42:00Z",
  source: { platform: "WinGDK" },
  pals: [
    { id: "SheepBall", captureCount: 5 },
    { id: "PinkCat", captureCount: 7 },
    { id: "BlueDragon", captureCount: 3 },
    { id: "WhiteShieldDragon", captureCount: 1 },
    { id: "Anubis", captureCount: 0 },
  ],
};

type NameData = { names: Record<string, string>; suffixes: Record<string, string>; overrides: Record<string, string> };
const nameData = palNameData as NameData;

function resolvePalName(entry: CaptureEntry): string | null {
  if (entry.name?.trim()) return entry.name.trim();
  let id = entry.id;
  const alpha = /^(?:BOSS|Boss)_/.test(id);
  id = id.replace(/^(?:BOSS|Boss)_/, "");
  const override = nameData.overrides[id];
  if (override) return alpha ? `Alpha ${override}` : override;
  const parts = id.split("_");
  const base = nameData.names[parts[0]];
  if (!base) return null;
  const suffix = parts.length > 1 ? nameData.suffixes[parts.at(-1) ?? ""] : null;
  const resolved = suffix ? `${base} ${suffix}` : base;
  return alpha ? `Alpha ${resolved}` : resolved;
}

function formatDate(value?: string) {
  if (!value) return "Unknown date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit",
  }).format(date);
}

function validateExport(value: unknown): CaptureExport {
  if (!value || typeof value !== "object") throw new Error("This file does not contain a JSON object.");
  const candidate = value as Partial<CaptureExport>;
  if (!Array.isArray(candidate.pals)) throw new Error("I could not find the pals list in this export.");
  const pals = candidate.pals.map((entry, index) => {
    if (!entry || typeof entry !== "object" || typeof (entry as CaptureEntry).id !== "string" ||
      !Number.isFinite((entry as CaptureEntry).captureCount) || (entry as CaptureEntry).captureCount < 0) {
      throw new Error(`Pal entry ${index + 1} has an invalid ID or capture count.`);
    }
    return { id: (entry as CaptureEntry).id, captureCount: Math.floor((entry as CaptureEntry).captureCount) };
  });
  return { ...candidate, pals } as CaptureExport;
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<CaptureExport | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [goal, setGoal] = useState(5);
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("pal-capture-theme", next);
  }

  async function importFile(file?: File) {
    if (!file) return;
    setError("");
    try {
      const parsed = validateExport(JSON.parse(await file.text()));
      setData(parsed); setFileName(file.name); setFilter("all"); setQuery("");
    } catch (caught) {
      setData(null); setFileName("");
      setError(caught instanceof Error ? caught.message : "That file could not be imported.");
    }
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    void importFile(event.target.files?.[0]); event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault(); setDragging(false); void importFile(event.dataTransfer.files?.[0]);
  }

  const stats = useMemo(() => {
    if (!data) return null;
    const captured = data.pals.filter((pal) => pal.captureCount > 0).length;
    const complete = data.pals.filter((pal) => pal.captureCount >= goal).length;
    const named = data.pals.filter((pal) => resolvePalName(pal)).length;
    const totalCaptures = data.pals.reduce((sum, pal) => sum + pal.captureCount, 0);
    const catchesToGoal = data.pals.reduce((sum, pal) => sum + Math.max(0, goal - pal.captureCount), 0);
    return { captured, complete, named, totalCaptures, catchesToGoal };
  }, [data, goal]);

  const visiblePals = useMemo(() => {
    if (!data) return [];
    const needle = query.trim().toLowerCase();
    return [...data.pals].filter((pal) => {
      if (filter === "complete" && pal.captureCount < goal) return false;
      if (filter === "incomplete" && (pal.captureCount === 0 || pal.captureCount >= goal)) return false;
      if (filter === "uncaught" && pal.captureCount !== 0) return false;
      return !needle || pal.id.toLowerCase().includes(needle) || (resolvePalName(pal)?.toLowerCase().includes(needle) ?? false);
    }).sort((a, b) => a.captureCount - b.captureCount || a.id.localeCompare(b.id));
  }, [data, filter, goal, query]);

  const filters: Array<{ id: Filter; label: string }> = [
    { id: "all", label: "All" }, { id: "incomplete", label: "Still hunting" },
    { id: "complete", label: "Goal reached" }, { id: "uncaught", label: "Uncaught" },
  ];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Palworld Capture Tracker home">
          <span className="brand-mark" aria-hidden="true"><span /></span><span>Capture Tracker</span>
        </a>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and dark mode" title="Toggle light and dark mode">
            <span className="moon-icon" aria-hidden="true">☾</span><span className="sun-icon" aria-hidden="true">☀</span>
          </button>
          <a className="github-link" href="https://github.com/Turinqui/palworld-capture-tracker" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <div className="page-shell" id="top">
        <section className="hero">
          <div className="eyebrow"><span /> Unofficial Palworld tool</div>
          <h1>Turn your capture export into a <em>hunting plan.</em></h1>
          <p>Load the JSON made by the UE4SS capture exporter. Everything is read in your browser and stays on this device.</p>
        </section>

        {!data ? (
          <section className="import-panel" aria-labelledby="import-title">
            <div className={`drop-zone ${dragging ? "is-dragging" : ""}`}
              onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
              onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
              <div className="file-glyph" aria-hidden="true"><span /></div>
              <h2 id="import-title">Drop your capture export here</h2>
              <p>Choose <code>pal_capture_data.json</code> or drag it onto this panel.</p>
              <button className="primary-button" onClick={() => inputRef.current?.click()}>Choose JSON file</button>
              <input ref={inputRef} className="sr-only" type="file" accept="application/json,.json" onChange={onFileChange} />
              <button className="sample-button" onClick={() => { setData(SAMPLE_EXPORT); setFileName("Example export"); setError(""); }}>Or explore with sample data</button>
            </div>
            {error && <p className="error-message" role="alert">{error}</p>}
            <div className="privacy-note"><span aria-hidden="true">◇</span><div><strong>Your data stays yours</strong><p>No upload, account, or save editing. Refresh the page to clear the import.</p></div></div>
          </section>
        ) : (
          <section className="dashboard" aria-label="Capture dashboard">
            <div className="import-summary">
              <div><span className="status-dot" aria-hidden="true" /><strong>{fileName}</strong><span className="metadata">Exported {formatDate(data.exportedAt)} · {data.source?.platform ?? "Unknown platform"}</span></div>
              <button className="secondary-button" onClick={() => inputRef.current?.click()}>Replace file</button>
              <input ref={inputRef} className="sr-only" type="file" accept="application/json,.json" onChange={onFileChange} />
            </div>

            <div className="stats-grid">
              <article><span>Captured species</span><strong>{stats?.captured.toLocaleString()}</strong><small>present in this export</small></article>
              <article><span>Total captures</span><strong>{stats?.totalCaptures.toLocaleString()}</strong><small>across all listed species</small></article>
              <article><span>Goal reached</span><strong>{stats?.complete.toLocaleString()}</strong><small>at least {goal} captures</small></article>
              <article className="accent-stat"><span>Catches remaining</span><strong>{stats?.catchesToGoal.toLocaleString()}</strong><small>for listed species to reach {goal}</small></article>
            </div>

            <div className="toolbar">
              <label className="search-field"><span aria-hidden="true">⌕</span><span className="sr-only">Search by Pal name or internal ID</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names or Pal IDs…" /></label>
              <label className="goal-field">Capture goal<input type="number" min="1" max="999" value={goal} onChange={(event) => setGoal(Math.max(1, Number(event.target.value) || 1))} /></label>
            </div>

            <div className="filter-row" aria-label="Filter capture list">
              {filters.map((item) => <button key={item.id} className={filter === item.id ? "active" : ""} onClick={() => setFilter(item.id)}>{item.label}</button>)}
              <span>{visiblePals.length} shown</span>
            </div>

            <div className="pal-list">
              {visiblePals.length ? visiblePals.map((pal) => {
                const remaining = Math.max(0, goal - pal.captureCount);
                const percent = Math.min(100, (pal.captureCount / goal) * 100);
                const displayName = resolvePalName(pal);
                return <article className="pal-row" key={pal.id}>
                  <div className="pal-orb" aria-hidden="true"><span /></div>
                  <div className="pal-identity"><strong>{displayName ?? pal.id}</strong><code>{displayName ? pal.id : "Unverified internal ID"}</code></div>
                  <div className="progress-wrap"><div><span>{remaining ? `${remaining} to goal` : "Goal reached"}</span><span>{Math.round(percent)}%</span></div><div className="progress-track"><span style={{ width: `${percent}%` }} /></div></div>
                  <div className="capture-count"><strong>{pal.captureCount}</strong><span>/ {goal}</span></div>
                </article>;
              }) : <div className="empty-state">No Pals match that search and filter.</div>}
            </div>

            <aside className="catalogue-note"><strong>About names and missing Pals</strong><p>{stats?.named} of {data.pals.length} exported IDs matched the current verified name seed. Unresolved v1.0 IDs remain visible for later matching. Never-captured species will appear after we add the complete game-derived catalogue.</p></aside>
          </section>
        )}

        <footer><p>Unofficial fan project. Palworld and related names belong to their respective rights holders.</p><span>Read-only by design · No save changes</span></footer>
      </div>
    </main>
  );
}
