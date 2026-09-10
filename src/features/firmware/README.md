# Firmware

Release history and the publish form.

## How to use

- `/internal/firmware` — history table
- `/internal/firmware/upload` — publish form; Publish Update prepends a release and returns to history
- `/internal/firmware/[version]?deviceType=` — read-only detail (version is not unique without device type)

`AppShell fleetNav` renders Devices / Firmware history / Upload firmware in the same slot on every tab screen, including upload. List pages also pass `fill` so only the rows scroll.

History has a search field (`filterFirmwareReleases` matches version, notes, device type, and region). Rows do not show a status chip. There is no sort control; history is already newest-first.

### Deployment target

Publish, history, and detail share one catalog (`firmwareReleaseStore`) and the same target fields: **region** and **device type**. Hospital is not a firmware target. Option lists live in `FIRMWARE_REGION_VALUES` / `FIRMWARE_DEVICE_TYPE_VALUES`.

## Gotchas

- `findFirmwareRelease` requires both version and device type.
- The `upload` folder must stay so it is not captured by `[version]`.
- Published releases live in memory and reset on a full reload.
