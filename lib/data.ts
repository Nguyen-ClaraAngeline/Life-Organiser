import projectData from "@/data/projects.json";

// Milestone 1 has no API and no database: projects live in data/projects.json.
// Tasks are added by the user in the app and kept in the browser (see lib/useTasks.ts).

export type ProjectStatus = "planned" | "active" | "paused" | "completed";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string; // YYYY-MM-DD
  endDate: string;
};

export const projects: Project[] = projectData as Project[];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Simulated slow data source, so loading.tsx has something to show. */
export async function getProjects(): Promise<Project[]> {
  await delay(800);
  return projects;
}

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
