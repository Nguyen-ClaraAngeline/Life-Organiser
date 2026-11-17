import type { Metadata } from "next";
import Link from "next/link";
import { Mushroom } from "@/components/Mushroom";
import { NavLink } from "@/components/NavLink";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Life", template: "%s · Life" },
  description: "A cozy place for your tasks, projects and everyday plans.",
};

// Root layout: the header and navigation are shown on every page.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Loaded once in the root layout, so it applies to every page. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Nunito:wght@400;700;800&display=swap"
        />
      </head>
      <body>
        <header className="border-b-2 border-bark-100 bg-cream-50">
          <div className="gingham h-3" />
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Mushroom size={40} />
              <span className="font-display text-3xl font-semibold text-bark-700">Life</span>
            </Link>
            <nav aria-label="Main" className="flex flex-wrap items-center gap-1">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/tasks">Tasks</NavLink>
              <NavLink href="/projects">Projects</NavLink>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
      </body>
    </html>
  );
}
