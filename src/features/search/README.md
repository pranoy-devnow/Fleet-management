# Search

Header search over the fleet. Used by the frosted App Store–style search pill.

## How to use

`searchWorldDevices` / `searchAssignedDevices` return matches only after the user types. Empty query is intentionally empty so the popover does not dump the whole fleet.

## Gotchas

- Internal routes search the global fleet; Biomed routes search assigned devices only.
- This is not a global Cmd+K spotlight.
