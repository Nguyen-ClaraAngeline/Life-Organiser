"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import { useTasks, type Priority } from "@/lib/useTasks";

type ProjectOption = { id: string; name: string };

/**
 * Add form + list of tasks.
 * With `projectId`, it only shows (and adds) the tasks of that project.
 */
export function TasksPanel({ projects, projectId }: { projects: ProjectOption[]; projectId?: string }) {
  const { tasks, ready, addTask, toggleTask, removeTask } = useTasks();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [due, setDue] = useState("");
  const [chosenProject, setChosenProject] = useState("");
  const [error, setError] = useState("");

  const names = new Map(projects.map((p) => [p.id, p.name]));

  const visible = tasks
    .filter((t) => (projectId ? t.projectId === projectId : true))
    .sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999");
    });

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please give your task a title.");
      return;
    }
    addTask({
      title: title.trim(),
      priority,
      dueDate: due || null,
      projectId: projectId ?? (chosenProject || null),
    });
    setTitle("");
    setDue("");
    setError("");
  }

  return (
    <div className="space-y-5">
      <form onSubmit={submit} className="card space-y-3">
        <div>
          <label htmlFor="task-title" className="label">
            New task
          </label>
          <input
            id="task-title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            maxLength={140}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="task-priority" className="label">
              Priority
            </label>
            <select id="task-priority" className="input" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="task-due" className="label">
              Deadline
            </label>
            <input id="task-due" type="date" className="input" value={due} onChange={(e) => setDue(e.target.value)} />
          </div>
          {!projectId && (
            <div>
              <label htmlFor="task-project" className="label">
                Project
              </label>
              <select id="task-project" className="input" value={chosenProject} onChange={(e) => setChosenProject(e.target.value)}>
                <option value="">No project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {error && (
          <p role="alert" className="rounded-2xl bg-cap-50 px-4 py-2 text-sm font-bold text-cap-600">
            {error}
          </p>
        )}
        <button type="submit" className="btn-primary">
          Add task
        </button>
      </form>

      {!ready ? (
        <p className="py-6 text-center text-bark-400">Loading your tasks…</p>
      ) : visible.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-bark-200 bg-cream-50/70 p-8 text-center">
          <p className="font-display text-xl font-semibold text-bark-700">No tasks yet</p>
          <p className="mt-1 text-bark-500">Add your first task above.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {visible.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-bark-100 bg-cream-50 p-3">
              <button
                type="button"
                onClick={() => toggleTask(t.id)}
                aria-pressed={t.done}
                aria-label={t.done ? `Mark ${t.title} as pending` : `Mark ${t.title} as done`}
                className={
                  t.done
                    ? "flex h-6 w-6 items-center justify-center rounded-full border-2 border-moss-500 bg-moss-500 text-xs text-cream-50"
                    : "flex h-6 w-6 items-center justify-center rounded-full border-2 border-bark-200 bg-cream-50 hover:border-moss-400"
                }
              >
                {t.done ? "✓" : ""}
              </button>
              <span className={t.done ? "min-w-0 flex-1 text-bark-400 line-through" : "min-w-0 flex-1 font-bold"}>{t.title}</span>
              <span className="rounded-full bg-bark-100 px-2 py-0.5 text-xs font-bold capitalize text-bark-600">{t.priority}</span>
              {t.dueDate && <span className="text-xs font-bold text-bark-500">🗓 {formatDate(t.dueDate)}</span>}
              {!projectId && t.projectId && names.get(t.projectId) && (
                <Link href={`/projects/${t.projectId}`} className="rounded-full bg-moss-100 px-2 py-0.5 text-xs font-bold text-moss-700 hover:bg-moss-200">
                  🧺 {names.get(t.projectId)}
                </Link>
              )}
              <button type="button" onClick={() => removeTask(t.id)} className="btn-ghost px-2" aria-label={`Delete ${t.title}`}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
