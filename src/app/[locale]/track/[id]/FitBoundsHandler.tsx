import { useMap } from "react-leaflet";
import { useEffect } from "react";

type Props = {
  positions: [number, number][];
};

export default function FitBoundsHandler({ positions }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!positions.length) return;

    const bounds = positions.map((pos) => [pos[0], pos[1]]) as [
      number,
      number
    ][];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const zoom = map.getBoundsZoom(bounds, false, [50, 50] as any);

    map.setMinZoom(zoom);
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 15,
    });
  }, [positions, map]);

  return null;
}
