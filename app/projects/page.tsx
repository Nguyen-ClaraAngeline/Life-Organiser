import type { Metadata } from "next";
import Link from "next/link";
import { ProjectProgress } from "@/components/ProjectProgress";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = { title: "Projects" };

// Reading searchParams makes this page render on every request (ƒ), and getProjects()
// is slow on purpose, so loading.tsx is visible even under `npm start`.
// Visit /projects?crash=1 to see error.tsx.
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ crash?: string }>;
}) {
  const { crash } = await searchParams;
  if (crash === "1") throw new Error("Simulated failure while loading projects.");

  const projects = await getProjects();

  return (
    <>
      <p className="font-script text-2xl leading-none text-cap-500">your little baskets of plans</p>
      <h1 className="mb-6 text-4xl font-semibold text-bark-700">Projects</h1>

      {projects.length === 0 ? (
        <p className="text-bark-500">No project yet. Add one in data/projects.json.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.id} className="card transition hover:-translate-y-1 hover:border-moss-200">
              <Link href={`/projects/${p.id}`} className="block">
                <h2 className="text-2xl font-semibold text-bark-700 hover:underline">{p.name}</h2>
                <p className="mb-4 mt-1 text-bark-500">{p.description}</p>
              </Link>
              <ProjectProgress projectId={p.id} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
