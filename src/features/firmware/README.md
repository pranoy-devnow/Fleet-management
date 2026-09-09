# Firmware

Release history and the publish form.

## How to use

- `/internal/firmware` — history table
- `/internal/firmware/upload` — publish form; Publish Update returns to history
- `/internal/firmware/[version]?model=` — detail (version is not unique without model)

### Filter state

- `emptyFirmwareFilters()` — the default filter set
- `resetFirmwareFilter(filters, key)` — clears one facet; backs chip removal
- `describeFirmwareFilters(filters)` — resolves active filters to chip labels

`FirmwareListToolbar` composes the shell's search field, segmented control, and filter menu. It has no sort control; history is already newest-first.

## Gotchas

- `getFirmwareRelease` requires both version and model.
- Release status is the visible segmented axis, so `describeFirmwareFilters` omits it — one filter, one UI path.
- The `upload` folder must stay so it is not captured by `[version]`.
- Publish does not persist a new release; it returns to history.
