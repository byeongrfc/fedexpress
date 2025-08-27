"use client";

import { useEffect, useRef, useState } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";

type Props = {
  coords: [number, number][];
  icon: L.Icon;
};

function interpolatePoints(
  p1: [number, number],
  p2: [number, number],
  numPoints: number
): [number, number][] {
  const [lat1, lng1] = p1;
  const [lat2, lng2] = p2;
  return Array.from({ length: numPoints - 1 }, (_, i) => [
    lat1 + ((lat2 - lat1) * (i + 1)) / numPoints,
    lng1 + ((lng2 - lng1) * (i + 1)) / numPoints,
  ]);
}

function generateSmoothPath(coords: [number, number][], density = 50) {
  const result: [number, number][] = [];
  for (let i = 0; i < coords.length - 1; i++) {
    result.push(coords[i]);
    result.push(...interpolatePoints(coords[i], coords[i + 1], density));
  }
  result.push(coords[coords.length - 1]);
  return result;
}

export default function AnimatedMarker({ coords, icon }: Props) {
  const path = useRef<[number, number][]>([]);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!coords.length) return;
    path.current = generateSmoothPath(coords, 50);
    setPosition(path.current[0]);
    indexRef.current = 0;

    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % path.current.length;
      setPosition(path.current[indexRef.current]);
    }, 50);

    return () => clearInterval(interval);
  }, [coords]);

  if (!position) return null;

  return <Marker position={position} icon={icon} />;
}
