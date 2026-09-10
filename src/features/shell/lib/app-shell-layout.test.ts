import { describe, expect, it } from "vitest";

import { appShellContentClass, shouldLockAppShell } from "./app-shell-layout";

describe("shouldLockAppShell", () => {
  it("locks when the page asked for fill", () => {
    expect(shouldLockAppShell(true, false)).toBe(true);
  });

  it("locks when fleet tabs are on so padding matches every tab", () => {
    expect(shouldLockAppShell(false, true)).toBe(true);
  });

  it("stays a scrolling document when neither fill nor tabs are on", () => {
    expect(shouldLockAppShell(false, false)).toBe(false);
  });
});

describe("appShellContentClass", () => {
  it("lets a locked form scroll under fixed tabs", () => {
    expect(appShellContentClass("form", true)).toBe(
      "min-h-0 max-w-2xl flex-1 overflow-y-auto",
    );
  });

  it("keeps an unlocked form as a narrow column", () => {
    expect(appShellContentClass("form", false)).toBe("max-w-2xl");
  });

  it("fills leftover height on a locked list page", () => {
    expect(appShellContentClass("default", true)).toBe("flex min-h-0 flex-1 flex-col");
  });

  it("adds no content class on a default scrolling page", () => {
    expect(appShellContentClass("default", false)).toBeUndefined();
  });
});
