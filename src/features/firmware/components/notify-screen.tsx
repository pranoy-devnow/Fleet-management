"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Panel } from "@/features/shell/panel";

const CHECKS = [
  "Match affected devices to firmware target",
  "Look up Biomed contact on each device record",
  "Queue notification emails",
];

/**
 * Brief automation screen after publish. Advances to the mock email after ~2.8s.
 */
export function NotifyScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStep(1), 600),
      window.setTimeout(() => setStep(2), 1200),
      window.setTimeout(() => setStep(3), 1800),
      window.setTimeout(() => router.push("/internal/firmware/email"), 2800),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Panel className="w-full max-w-md p-10 text-center">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-secondary">
          <Bell className="text-primary" size={26} />
        </div>
        <h2 className="mb-2 text-lg font-bold text-foreground">New firmware v2.4.0 published</h2>
        <p className="mb-6 text-sm text-muted-foreground">System is identifying affected devices and their Biomeds…</p>
        <div className="flex flex-col gap-3 text-left">
          {CHECKS.map((check, index) => (
            <div key={check} className="flex items-center gap-3">
              <CheckCircle
                size={18}
                className={`shrink-0 transition-colors duration-300 ${step > index ? "text-[#13985A]" : "text-border"}`}
              />
              <span className={`text-sm transition-colors duration-300 ${step > index ? "text-foreground" : "text-[#9CA3AF]"}`}>
                {check}
              </span>
            </div>
          ))}
        </div>
        {step < 3 ? (
          <button type="button" onClick={() => router.push("/internal/firmware/email")} className="mt-6 text-sm text-primary hover:underline">
            Continue
          </button>
        ) : null}
      </Panel>
    </div>
  );
}
