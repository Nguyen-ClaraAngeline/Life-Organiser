"use client";

import { useSyncExternalStore } from "react";

// Tasks are created by the user and saved in the browser (localStorage).
// No API and no database in Milestone 1.

export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  priority: Priority;
  done: boolean;
  dueDate: string | null; // YYYY-MM-DD
  projectId: string | null;
};

const KEY = "life-tasks";
const EMPTY: Task[] = [];

let cache: Task[] | null = null;
const listeners = new Set<() => void>();

function read(): Task[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: Task[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage can be blocked: the tasks then only live until the page is closed.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null; // another tab changed the tasks
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const noopSubscribe = () => () => {};

export function useTasks() {
  const tasks = useSyncExternalStore(subscribe, read, () => EMPTY);
  // false while rendering on the server and during hydration, true afterwards.
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);

  return {
    tasks,
    ready,
    addTask(input: Pick<Task, "title" | "priority" | "dueDate" | "projectId">) {
      const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
      write([{ id, done: false, ...input }, ...read()]);
    },
    toggleTask(id: string) {
      write(read().map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    },
    removeTask(id: string) {
      write(read().filter((t) => t.id !== id));
    },
  };
}
