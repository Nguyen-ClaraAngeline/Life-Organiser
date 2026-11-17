import type { Metadata } from "next";
import Link from "next/link";
import { Mushroom } from "@/components/Mushroom";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <Mushroom size={110} />
      <p className="mt-4 font-script text-3xl text-cap-500">Oh dear…</p>
      <h1 className="text-4xl font-semibold text-bark-700">This path leads nowhere</h1>
      <p className="mt-2 max-w-sm text-bark-500">We looked under every toadstool but could not find that page.</p>
      <Link href="/" className="btn-red mt-6">
        Back to the cottage
      </Link>
    </div>
  );
}
