# Devices

Fleet inventory and status chips for Medela Internal staff.

## How to use

- `listWorldDevices` / `getWorldDeviceById` — internal device table
- `filterWorldDevices` — table status and search
- `availableFirmwareUpdates` — installable packages for a device (dropdown on the detail card)
- `recommendedFirmwareUpdate` — newest package newer than what is already installed
- `deviceCatalogStore` — live fleet and per-device install logs
- `StatusChip` — use anywhere a device status appears

### Filter state

- `emptyDeviceFilters(status?)` — the default filter set, optionally pinned to a starting status so a route can deep-link
- `resetDeviceFilter(filters, key)` — clears one facet; backs both chip removal and the empty state
- `describeDeviceFilters(filters)` — resolves the search chip label
- `suggestFilterRelaxation(devices, filters)` — for an empty result, the one filter whose removal reveals the most devices

`DeviceListToolbar` composes the shell's search field and status segmented control. `DeviceListEmpty` turns a `suggestFilterRelaxation` result into a one-click way out.

The internal overview (`/internal`) uses `AppShell fill fleetNav` for Devices, Firmware history, and Upload firmware. Filters and rows share a `GroupedList` card so only the rows scroll. The Devices tab count follows the list filters via `fleetNavCountStore`. `/internal/devices` redirects here, including a `?status=` filter. Device rows still open `/internal/devices/[id]`. Identity and the next firmware share one card; firmware history is a second card with the title separated from the rows. History rows use the same uploader credit as the firmware catalog, with notes shortened to the first clause.

## Gotchas

- Status colors are fixed: amber needs-update, green updated, red failed.
- Search still matches hospital names; hospital is not a separate filter facet.
- Status is the visible segmented axis, so `describeDeviceFilters` deliberately omits it. Adding it would give one filter two controls.
- `suggestFilterRelaxation` assumes the current result is empty; it only returns a removal that reveals at least one device, and ties go to the less intentional facet (search is suggested last).
- Sample data is in-memory only.
- Starting an update on a device finishes in `DEVICE_UPDATE_DURATION_MS` (12s) so the progress is visible without waiting minutes. The device then shows as updated on the list.
