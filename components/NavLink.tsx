"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A <Link> that marks itself as the current page with aria-current.
 * - exact: only the very same path is active (used for "/").
 * - otherwise the section is active too: /projects stays active on /projects/cottage-garden.
 * usePathname only works in Client Components, which is why this is a small client file
 * used by the (server) layouts.
 */
export function NavLink({
  href,
  exact = false,
  children,
}: {
  href: string;
  exact?: boolean;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "rounded-full bg-cap-500 px-4 py-2 font-bold text-cream-50 shadow-[0_3px_0_theme(colors.cap.700)]"
          : "rounded-full px-4 py-2 font-bold text-bark-600 hover:bg-cap-50"
      }
    >
      {children}
    </Link>
  );
}
