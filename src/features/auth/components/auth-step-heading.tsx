const TOTAL_STEPS = 2;

/**
 * Heading for one step of a multi-step auth form, with progress so the user
 * knows how much is left before they start typing.
 *
 * @param step - 1-based index of the current step
 * @param title - Step title
 * @param subtitle - One line on what this step is for
 */
export function AuthStepHeading({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className="flex gap-1" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <span
              key={index}
              className={
                index < step ? "h-1 w-6 rounded-full bg-primary" : "h-1 w-6 rounded-full bg-black/10"
              }
            />
          ))}
        </span>
      </div>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
