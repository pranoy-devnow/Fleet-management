/**
 * Title and one line of context at the top of the sign-in form.
 *
 * Renders an `<h1>` because inside `AuthShell` the form *is* the page.
 *
 * @param title - What this screen is for, in the user's words
 * @param subtitle - One line on what happens next
 */
export function AuthHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
    </div>
  );
}
