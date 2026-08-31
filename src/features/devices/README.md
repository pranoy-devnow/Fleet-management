# Devices

Fleet inventory, assigned-device lists, status chips, and the global map.

## How to use

- `listWorldDevices` / `getWorldDeviceById` — internal fleet map and table
- `listAssignedDevices` / `getAssignedDeviceById` — biomed dashboards
- `filterWorldDevices` + `sortWorldDevices` — table and map filters
- `StatusChip` — use anywhere a device status appears

### Filter state

- `emptyDeviceFilters(status?)` — the default filter set, optionally pinned to a starting status so a route can deep-link
- `resetDeviceFilter(filters, key)` — clears one facet; backs both chip removal and the empty state
- `describeDeviceFilters(filters)` — resolves active filters to chip labels
- `suggestFilterRelaxation(devices, filters)` — for an empty result, the one filter whose removal reveals the most devices

`DeviceListToolbar` composes the shell's search field, segmented control, filter menu, and sort menu. `DeviceListEmpty` turns a `suggestFilterRelaxation` result into a one-click way out.

## Gotchas

- Status colors are fixed: amber needs-update, green updated, red failed.
- Hospital filter is a case-insensitive substring match so dashboard dropdowns and table exact values both work.
- Status is the visible segmented axis, so `describeDeviceFilters` deliberately omits it. Adding it would give one filter two controls.
- `suggestFilterRelaxation` assumes the current result is empty; it only returns a removal that reveals at least one device, and ties go to the less intentional facet (search is suggested last).
- Sample data is in-memory only.
