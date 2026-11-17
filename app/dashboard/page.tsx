import type { Metadata } from "next";
import Link from "next/link";
import { DashboardStats } from "@/components/DashboardStats";
import { ProjectProgress } from "@/components/ProjectProgress";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const active = projects.filter((p) => p.status === "active");

  return (
    <>
      <p className="font-script text-2xl leading-none text-cap-500">today at a glance</p>
      <h1 className="mb-6 text-4xl font-semibold text-bark-700">Dashboard</h1>

      <DashboardStats />

      <section className="card mt-6" aria-labelledby="active-projects">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="active-projects" className="card-title">
            Active projects
          </h2>
          <Link href="/projects" className="text-sm font-bold text-cap-600 hover:underline">
            All projects →
          </Link>
        </div>
        {active.length === 0 ? (
          <p className="text-bark-500">No active project. Add one in data/projects.json.</p>
        ) : (
          <ul className="space-y-4">
            {active.map((p) => (
              <li key={p.id}>
                <Link href={`/projects/${p.id}`} className="mb-1 block font-bold text-bark-700 hover:underline">
                  {p.name}
                </Link>
                <ProjectProgress projectId={p.id} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
