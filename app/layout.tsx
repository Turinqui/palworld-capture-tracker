import type { Metadata } from "next";
import "./globals.css";
import WorldTreeAuraHelper from "./world-tree-aura-helper";

export const metadata: Metadata = {
  title: "Palworld Capture Tracker",
  description: "Turn a Palworld capture export into a clear hunting checklist.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(function(){try{var saved=localStorage.getItem('pal-capture-theme');var theme=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme}catch(e){}})()`;
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}<WorldTreeAuraHelper /></body></html>;
}
