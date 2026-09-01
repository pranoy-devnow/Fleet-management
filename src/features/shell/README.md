# Shell

Shared chrome: frosted header, grouped lists, list filter controls, auth frame, and back link.

## How to use

Wrap authenticated pages in `AppShell`. Use `variant="form"` on firmware publish/edit to show the sign-off card. Use `fill` on list pages so the title stays put and only `GroupedList` with `scroll` moves.

The header search pill filters devices. On `/biomed` it searches assigned devices; elsewhere it searches the global fleet.

### List toolbars

Filterable lists compose one row from these parts, in this order:

- `SearchField` — pill used in list toolbars (`bg-black/5`, icon then input)
- `SearchInputRow` — icon plus input on a hairline, used by the header popover and the registration country list
- `SegmentedControl` — the single filter axis that stays visible
- `FilterMenu` — every other facet, collapsed behind one trigger that shows an active count
- `SortMenu` — sort key and direction
- `ActiveFilterChips` — sits under the row and names what is currently narrowing the list

`PopoverSurface` is the floating panel shared by the header search and both menus. `useDismiss` gives any popover outside-press and Escape handling.

### Searchable lists and tooltips

- `SearchableListPanel` — `SearchInputRow` on a hairline above a list. Used by the registration country picker (`h-72`, scrolling) and the user directory (`scroll={false}`).
- `InfoTooltip` — info icon on base-ui's tooltip. Opens on hover and on keyboard focus.

## Gotchas

- Logo goes to the role home (`/internal` or `/biomed`), not the role picker.
- The header avatar opens Profile, Role management, and Log out. Log out still goes to `/`.
- `SegmentedControl` and `FilterMenu` are built on native radio inputs, so arrow keys navigate and the selected state is announced. Each instance scopes its own `name` via `useId`, so two controls on one page never share a group.
- Keep a facet in either `SegmentedControl` or `FilterMenu`, never both — one filter, one UI path. `ActiveFilterChips` therefore skips the segmented axis, since that control already shows its own state.
- `FilterMenu` renders the `all` option as a bare "All"; the section heading already names the facet.
- Set `scroll: true` on a `FilterGroup` whose options are unbounded, such as hospitals.
- Pass `scroll={false}` to `SearchableListPanel` when rows open popovers. A scrolling panel needs `overflow-hidden` for its rounded corners, and that clips any menu a row opens.
- `InfoTooltip` renders a solid popup, not the frosted `PopoverSurface` — dense text over a blurred page is hard to read. Its content portals outside the trigger, so do not nest it inside a `useDismiss` popover: pressing it reads as an outside press.
