import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palworld Capture Tracker",
  description: "Turn a Palworld capture export into a clear hunting checklist.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
