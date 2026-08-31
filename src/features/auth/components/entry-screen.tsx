import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/features/shell/brand-mark";

/**
 * Role picker — the only unauthenticated entry point.
 */
export function EntryScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1D2735] p-4">
      <div className="mb-12 flex flex-col items-center">
        <div className="mb-4">
          <BrandMark size="lg" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">Kingfisher</h1>
        <p className="mt-2 text-base text-[#94A3B8]">Fleet Management Portal</p>
      </div>
      <p className="mb-8 text-sm text-[#CBD5E1]">Choose your account type to continue</p>
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link
          href="/login/medela"
          className="group flex items-center justify-between rounded-lg bg-primary px-8 py-4 text-left text-base font-semibold text-white transition-colors hover:bg-[#1e3f7a]"
        >
          <div>
            <div className="font-semibold">Medela Internal</div>
            <div className="mt-0.5 text-xs font-normal text-[#93C5FD]">Staff access — device fleet management</div>
          </div>
          <ChevronRight size={20} className="opacity-60 transition-opacity group-hover:opacity-100" />
        </Link>
        <Link
          href="/login/biomed"
          className="group flex items-center justify-between rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-left text-base font-semibold text-white transition-colors hover:bg-white/20"
        >
          <div>
            <div className="font-semibold">Biomed / Hospital Staff</div>
            <div className="mt-0.5 text-xs font-normal text-[#94A3B8]">Hospital access — device updates</div>
          </div>
          <ChevronRight size={20} className="opacity-60 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
    </div>
  );
}
