# Shell

Shared chrome: brand-yellow header, grouped lists, list filter controls, auth frame, and back link.

## How to use

Wrap authenticated pages in `AppShell`. Use `variant="form"` on firmware publish/edit to show the sign-off card. Use `fill` on list pages so chrome stays put and the list fills the leftover laptop height. Pass `fleetNav` on the three fleet screens so `FleetNavTabs` sits in the same slot above the page; that also locks the viewport so upload uses the same main padding as the lists. Pass `header` on `GroupedList` when title, actions, or filters should sit inside the same card as the rows.

`FleetNavTabs` is the Devices / Firmware history / Upload firmware switcher. `resolveFleetTab` picks the selected tab from the path. The Devices tab count lives in `fleetNavCountStore` so the list can update a badge that AppShell renders.

### List toolbars

Filterable lists compose one row from these parts, in this order:

- `SearchField` — pill used in list toolbars (`bg-black/5`, icon then input)
- `SearchInputRow` — icon plus input on a hairline, used by searchable lists
- `SegmentedControl` — the single filter axis that stays visible
- `FilterMenu` — extra facets behind one trigger (unused on the current fleet lists)
- `SortMenu` — sort key and direction (unused on the current fleet lists)
- `ActiveFilterChips` — sits under the row and names what is currently narrowing the list

`PopoverSurface` is the floating panel shared by the account menu and both list menus. `useDismiss` gives any popover outside-press and Escape handling.

### Dialogs

- `ModalOverlay` — scrim, centered dialog, `role="dialog"`, and `useDismiss`. Children supply their own surface, since a form card and a detail card look nothing alike.
- `ConfirmDialog` — destructive confirm built on it. Cancel comes first and is the safe default.

### Searchable lists and tooltips

- `SearchableListPanel` — `SearchInputRow` on a hairline above a list. Pass `scroll={false}` when rows open popovers.
- `InfoTooltip` — info icon on base-ui's tooltip. Opens on hover and on keyboard focus.
- `StepHeading` — "Step N of M" progress plus title and subtitle for multi-step forms. Pass `titleId` when a dialog labels itself with the heading.

## Gotchas

- `fleetNav` also locks the viewport. Upload used to use `py-10` and a `max-w-2xl` wrapper around the tabs, which moved the tab bar relative to the list pages.
- Logo goes to `/internal`.
- The header avatar opens Profile and Log out. Log out goes to `/login/medela`.
- `SegmentedControl` and `FilterMenu` are built on native radio inputs, so arrow keys navigate and the selected state is announced. Each instance scopes its own `name` via `useId`, so two controls on one page never share a group.
- Keep a facet in either `SegmentedControl` or `FilterMenu`, never both — one filter, one UI path. `ActiveFilterChips` therefore skips the segmented axis, since that control already shows its own state.
- `FilterMenu` renders the `all` option as a bare "All"; the section heading already names the facet.
- Set `scroll: true` on a `FilterGroup` whose options are unbounded, such as hospitals.
- Pass `scroll={false}` to `SearchableListPanel` when rows open popovers. A scrolling panel needs `overflow-hidden` for its rounded corners, and that clips any menu a row opens.
- `InfoTooltip` renders a solid popup, not the frosted `PopoverSurface` — dense text over a blurred page is hard to read. Its content portals outside the trigger, so do not nest it inside a `useDismiss` popover: pressing it reads as an outside press.
