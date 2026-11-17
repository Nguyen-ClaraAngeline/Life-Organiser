export default function ProjectsLoading() {
  return (
    <div role="status" aria-live="polite" className="py-10 text-center">
      <p className="text-4xl" aria-hidden="true">
        🍄
      </p>
      <p className="mt-2 font-display text-xl font-semibold text-bark-600">Gathering your projects…</p>
    </div>
  );
}
