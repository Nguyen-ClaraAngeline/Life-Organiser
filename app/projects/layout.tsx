import Link from "next/link";

// Nested layout: wraps /projects and /projects/[id] only (not the other sections).
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-moss-100 px-4 py-2 text-sm font-bold text-moss-700">
        <span>🧺 Projects section</span>
        <Link href="/projects" className="hover:underline">
          All projects
        </Link>
      </div>
      {children}
    </div>
  );
}
