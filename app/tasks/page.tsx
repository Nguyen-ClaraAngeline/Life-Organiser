import type { Metadata } from "next";
import { TasksPanel } from "@/components/TasksPanel";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Tasks" };

export default function TasksPage() {
  return (
    <>
      <p className="font-script text-2xl leading-none text-cap-500">one little step at a time</p>
      <h1 className="mb-6 text-4xl font-semibold text-bark-700">Tasks</h1>
      <TasksPanel projects={projects.map((p) => ({ id: p.id, name: p.name }))} />
    </>
  );
}
