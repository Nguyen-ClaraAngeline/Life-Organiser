"use client";

import { useTasks } from "@/lib/useTasks";

/** Progress of one project, computed from the tasks the user added to it. */
export function ProjectProgress({ projectId }: { projectId: string }) {
  const { tasks, ready } = useTasks();
  const mine = tasks.filter((t) => t.projectId === projectId);
  const done = mine.filter((t) => t.done).length;
  const pct = mine.length === 0 ? 0 : Math.round((done / mine.length) * 100);

  return (
    <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Project progress">
      <div className="h-4 overflow-hidden rounded-full border-2 border-bark-100 bg-cream-100">
        <div className="bar-moss h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-sm font-bold text-moss-700">
        {!ready ? "…" : mine.length === 0 ? "No tasks yet" : `${done} of ${mine.length} tasks done · ${pct}%`}
      </p>
    </div>
  );
}
