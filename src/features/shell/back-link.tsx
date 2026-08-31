import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * In-app back navigation used at the top of detail screens.
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-5 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
    >
      <ArrowLeft size={15} />
      {label}
    </Link>
  );
}
