"use client";

import { CONTINENT_PATHS } from "@/features/devices/data/continent-paths";
import { MAP_VIEWBOX, STATUS_PIN_COLORS } from "@/features/devices/constants";
import { lonLatToXY } from "@/features/devices/lib/map-projection";
import type { WorldDevice } from "@/features/devices/types";

type FleetMapCanvasProps = {
  devices: WorldDevice[];
  visibleIds: Set<string>;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect?: (device: WorldDevice) => void;
  aspectClass?: string;
};

/**
 * Equirectangular world map with status-colored device pins.
 */
export function FleetMapCanvas({
  devices,
  visibleIds,
  hoveredId,
  onHover,
  onSelect,
  aspectClass = "pb-[38%]",
}: FleetMapCanvasProps) {
  return (
    <div className={`relative bg-[#B8CCE0] ${aspectClass}`}>
      <svg
        className="absolute inset-0 size-full"
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="#B8CCE0" />
        <g stroke="#9ABACF" strokeWidth="0.6" opacity="0.4">
          {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => {
            const x = ((lon + 180) / 360) * MAP_VIEWBOX.width;
            return <line key={lon} x1={x} y1={0} x2={x} y2={MAP_VIEWBOX.height} />;
          })}
          {[-60, -30, 30, 60].map((lat) => {
            const y = ((90 - lat) / 180) * MAP_VIEWBOX.height;
            return <line key={lat} x1={0} y1={y} x2={MAP_VIEWBOX.width} y2={y} />;
          })}
        </g>
        <line
          x1={0}
          y1={MAP_VIEWBOX.height / 2}
          x2={MAP_VIEWBOX.width}
          y2={MAP_VIEWBOX.height / 2}
          stroke="#7AAAC2"
          strokeWidth="1.2"
          strokeDasharray="10,8"
          opacity="0.6"
        />
        <g fill="#D6E8C8" stroke="#BDD4AF" strokeWidth="1.2">
          {CONTINENT_PATHS.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>
        {devices.map((device) => {
          const { x, y } = lonLatToXY(device.lon, device.lat);
          const isVisible = visibleIds.has(device.id);
          const isHovered = device.id === hoveredId;
          const color = STATUS_PIN_COLORS[device.status];

          if (!isVisible) {
            return <circle key={device.id} cx={x} cy={y} r={7} fill={color} opacity={0.15} />;
          }

          return (
            <g
              key={device.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => onHover(device.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect?.(device)}
            >
              {isHovered ? <circle cx={x} cy={y} r={28} fill={color} opacity={0.15} /> : null}
              <circle cx={x} cy={y} r={isHovered ? 13 : 10} fill={color} stroke="white" strokeWidth="2.5" />
              {isHovered ? (
                <text
                  x={x}
                  y={y - 20}
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="600"
                  fill="#1D2735"
                  stroke="white"
                  strokeWidth="5"
                  paintOrder="stroke"
                  fontFamily="Inter,sans-serif"
                >
                  {device.city}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
