import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectProgress } from "@/components/ProjectProgress";
import { TasksPanel } from "@/components/TasksPanel";
import { formatDate } from "@/lib/format";
import { getProject, projects } from "@/lib/data";

// Only the ids returned by generateStaticParams exist: any other value is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

// In Next.js 15, params is a Promise and must be awaited.
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  return { title: project ? project.name : "Project not found" };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  return (
    <article>
      <Link href="/projects" className="text-sm font-bold text-cap-600 hover:underline">
        ← All projects
      </Link>
      <h1 className="mt-3 text-4xl font-semibold text-bark-700">{project.name}</h1>
      <p className="mt-2 max-w-2xl text-bark-600">{project.description}</p>
      <p className="mt-3 flex flex-wrap gap-x-4 text-sm font-bold text-bark-500">
        <span className="capitalize">Status: {project.status}</span>
        <span>🌱 Start {formatDate(project.startDate)}</span>
        <span>🎯 End {formatDate(project.endDate)}</span>
      </p>

      <div className="mt-4 max-w-md">
        <ProjectProgress projectId={project.id} />
      </div>

      <h2 className="card-title mb-3 mt-8">Tasks</h2>
      <TasksPanel projects={[{ id: project.id, name: project.name }]} projectId={project.id} />
    </article>
  );
}
