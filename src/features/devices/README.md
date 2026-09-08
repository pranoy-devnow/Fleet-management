# Devices

Fleet inventory, assigned-device lists, status chips, and the global map.

## How to use

- `listWorldDevices` / `getWorldDeviceById` — internal fleet map and table
- `listBiomedDevices` — the biomed's whole fleet; seeds `assignedDeviceStore`, which every biomed screen reads
- `listHospitals` — hospital filter options
- `listDeviceCountries` + `searchDeviceCountries` — feeds `DeviceLocationStep`, the country picker shared by biomed registration and the add-device dialog
- `filterWorldDevices` + `sortWorldDevices` — table and map filters
- `StatusChip` — use anywhere a device status appears

### The biomed's device list

`MyDevicesScreen` backs both `/biomed` and `/biomed/welcome`: the list plus an "Add new device" button opening `AddDeviceModal`, which reruns the registration steps without the account fields (`DeviceLocationStep`, then `NewDeviceDetailsStep`).

The two routes differ only in `rowView`, which `biomedDeviceHref` resolves: `/biomed/welcome` rows open the light `DeviceStatusScreen`, `/biomed` rows open `DeviceUpdateScreen` with the firmware actions.

Adding a device goes through:

- `addDeviceSchema` validates the submitted form through `parseFormData`
- `createAssignedDevice` maps those fields onto an `AssignedDevice`
- `addDevice` prepends it, or returns `{ ok: false, code: "duplicate_serial" }`
- `assignedDeviceStore` + `useAssignedDevices` share the resulting list with both list routes, both device pages, and the header search

`RemoveDeviceButton` is the reverse, on both device pages: the shell's `ConfirmDialog`, then `removeDevice` through the store, then back to `/biomed`. A serial is free to register again once removed.

### Filter state

- `emptyDeviceFilters(status?)` — the default filter set, optionally pinned to a starting status so a route can deep-link
- `resetDeviceFilter(filters, key)` — clears one facet; backs both chip removal and the empty state
- `describeDeviceFilters(filters)` — resolves active filters to chip labels
- `suggestFilterRelaxation(devices, filters)` — for an empty result, the one filter whose removal reveals the most devices

`DeviceListToolbar` composes the shell's search field, segmented control, filter menu, and sort menu. `DeviceListEmpty` turns a `suggestFilterRelaxation` result into a one-click way out.

The device list page uses `AppShell fill` and a scrolling `GroupedList`, so the title, Overview link, and filter bar stay put.

## Gotchas

- Status colors are fixed: amber needs-update, green updated, red failed.
- Hospital filter is a case-insensitive substring match so dashboard dropdowns and table exact values both work.
- Status is the visible segmented axis, so `describeDeviceFilters` deliberately omits it. Adding it would give one filter two controls.
- `suggestFilterRelaxation` assumes the current result is empty; it only returns a removal that reveals at least one device, and ties go to the less intentional facet (search is suggested last).
- Sample data is in-memory only. `assignedDeviceStore` lives in the module like `accessRequestStore`, so an added device survives client navigation but not a full reload.
- `DeviceStatusScreen` and `DeviceUpdateScreen` are client components on purpose: a device added this session exists only in the store, so a server-only lookup would 404 on it. Opening an added device's URL directly still 404s, since a hard load starts a fresh store.
- Both device pages read the store and never the fixtures. A repository fallback would resurrect a device the user had just removed.
- `MyDevicesScreen` takes `rowView` as a string, not an href callback. Its routes are server components, and React cannot pass a function across that boundary.
- `country` and `model` are optional on `AssignedDevice`. The fixtures predate both; only devices added in-app carry them.
- Filter and sort menus sit outside the scrolling panel on purpose. A menu opened from a row inside `overflow-y-auto` would be clipped.
