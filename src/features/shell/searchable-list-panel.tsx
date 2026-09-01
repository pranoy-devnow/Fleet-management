import { SearchInputRow } from "@/features/shell/search-input-row";
import { cn } from "@/lib/utils";

/**
 * A fixed-height panel with a search row on a hairline above a scrolling list.
 *
 * The height is fixed on purpose: the panel must not resize as results narrow,
 * or the page reflows under the pointer on every keystroke.
 *
 * @param query - Current search text
 * @param onQueryChange - Receives the new search text
 * @param placeholder - Hint text for the search input
 * @param searchLabel - Accessible name for the search input
 * @param listLabel - Accessible name for the results container
 * @param listRole - Role for the results container, e.g. `radiogroup` for a
 *   single-choice list or `list` for a read-only directory
 * @param announcement - Result summary read to screen readers, which see no
 *   visible count
 * @param emptyMessage - Shown in place of the list when `isEmpty` is true
 * @param isEmpty - Whether the search returned nothing
 * @param height - Tailwind height class for the panel, e.g. `h-72`. Ignored
 *   when `scroll` is false
 * @param scroll - Whether the list scrolls inside a fixed-height panel. Pass
 *   false when rows open popovers, which a scroll container would clip
 * @param children - The rendered rows
 */
export function SearchableListPanel({
  query,
  onQueryChange,
  placeholder,
  searchLabel,
  listLabel,
  listRole = "list",
  announcement,
  emptyMessage,
  isEmpty,
  height = "h-72",
  scroll = true,
  children,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder: string;
  searchLabel: string;
  listLabel: string;
  listRole?: "list" | "radiogroup" | "group";
  announcement: string;
  emptyMessage: string;
  isEmpty: boolean;
  height?: string;
  scroll?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <p className="sr-only" role="status">
        {announcement}
      </p>

      <div
        className={cn(
          "flex flex-col rounded-xl ring-1 ring-black/8",
          scroll && cn("overflow-hidden", height),
        )}
      >
        <SearchInputRow
          value={query}
          onChange={onQueryChange}
          placeholder={placeholder}
          label={searchLabel}
        />
        <div
          role={listRole}
          aria-label={listLabel}
          className={cn(
            "divide-y divide-black/6",
            scroll && "min-h-0 flex-1 overflow-auto",
          )}
        >
          {isEmpty ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  );
}
