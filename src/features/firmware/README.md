# Firmware

Release history and the publish form.

## How to use

- `/internal/firmware` — history table
- `/internal/firmware/upload` — publish form; Publish Update prepends a release and returns to history
- `/internal/firmware/[version]?deviceType=` — read-only detail (version is not unique without device type). The card under the notes says who uploaded the release.

`AppShell fleetNav` renders Devices / Firmware history / Upload firmware in the same slot on every tab screen, including upload. List pages also pass `fill` so only the rows scroll.

History has a search field (`filterFirmwareReleases` matches version, notes, and uploader). Rows show notes and **Uploaded by:** plus the staff name in bold (`FirmwareHistorySubtitle`, also used on a device's install history). There is no sort control; history is already newest-first.

Publish collects version and notes only. New releases are stored as all regions and all device types so history and device-update matching still have a catalog row.

## Gotchas

- `findFirmwareRelease` requires both version and device type.
- The `upload` folder must stay so it is not captured by `[version]`.
- Published releases live in memory and reset on a full reload.
