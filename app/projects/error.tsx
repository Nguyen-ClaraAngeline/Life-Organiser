"use client";

// Error boundaries must be Client Components. The component is not called "Error",
// so it does not hide the global Error class.
export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert" className="card text-center">
      <p className="text-4xl" aria-hidden="true">
        🥀
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-bark-700">Something went wrong</h2>
      <p className="mt-1 text-bark-500">{error.message || "We could not load your projects."}</p>
      <button type="button" onClick={() => reset()} className="btn-red mt-4">
        Try again
      </button>
    </div>
  );
}
