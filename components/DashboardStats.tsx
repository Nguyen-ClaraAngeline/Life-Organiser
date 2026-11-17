"use client";

import Link from "next/link";
import { formatDate } from "@/lib/format";
import { useTasks } from "@/lib/useTasks";

export function DashboardStats() {
  const { tasks, ready } = useTasks();
  const pending = tasks.filter((t) => !t.done);
  const done = tasks.length - pending.length;
  const next = [...pending].sort((a, b) => (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999")).slice(0, 5);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card text-center">
          <p className="font-display text-4xl font-semibold text-bark-700">{ready ? pending.length : "–"}</p>
          <p className="text-sm font-bold uppercase tracking-wide text-bark-400">pending tasks</p>
        </div>
        <div className="card text-center">
          <p className="font-display text-4xl font-semibold text-bark-700">{ready ? done : "–"}</p>
          <p className="text-sm font-bold uppercase tracking-wide text-bark-400">tasks done</p>
        </div>
      </div>

      <section className="card mt-6" aria-labelledby="next-tasks">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="next-tasks" className="card-title">
            Next tasks
          </h2>
          <Link href="/tasks" className="text-sm font-bold text-cap-600 hover:underline">
            All tasks →
          </Link>
        </div>
        {!ready ? (
          <p className="text-bark-400">Loading…</p>
        ) : next.length === 0 ? (
          <p className="text-bark-500">
            Nothing to do yet. <Link href="/tasks" className="font-bold text-cap-600 underline">Add your first task</Link>.
          </p>
        ) : (
          <ul className="space-y-2">
            {next.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 rounded-2xl bg-moss-50 p-3">
                <span className="min-w-0 truncate font-bold">{t.title}</span>
                {t.dueDate && <span className="shrink-0 text-xs font-bold text-bark-500">🗓 {formatDate(t.dueDate)}</span>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
