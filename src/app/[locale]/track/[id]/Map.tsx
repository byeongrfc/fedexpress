"use client";

import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import type { Route } from "@/lib/validations/shipment";
import FitBoundsHandler from "./FitBoundsHandler";
interface Props {
  routes: Route[];
}
import L from "leaflet";
import { cn } from "@/lib/utils";
import MovingMarker from "./MovingMarker";
import { useIsMobile } from "@/hooks/use-mobile";

const getPinHtml = (status: string) => {
  const src =
    status === "completed"
      ? "/assets/pin-green.png"
      : status === "current"
      ? "/assets/pin-orange.png"
      : "/assets/pin-blue.png";

  const shouldBounce = status === "current";

  return `
    <img 
      src="${src}" 
      class="${cn("w-full h-full", shouldBounce && "animate-bounce")}" 
    />
  `;
};

export default function Map({ routes }: Props) {
  const isMobile = useIsMobile();

  const coords = routes.map((route) => route.latlng);
  const completedCoords = routes
    .slice(0, routes.findIndex((route) => route.status === "current") + 1)
    .map((route) => route.latlng);
  const upcomingCoords = routes
    .slice(routes.findIndex((route) => route.status === "current"))
    .map((route) => route.latlng);

  return (
    <MapContainer
      center={coords[0]}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      className="w-full h-dvh absolute z-0"
    >
      {/* Base satellite layer */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles © <a href="https://www.esri.com/">Esri</a>'
        detectRetina
      />
      {/* Overlay with names/labels */}
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        attribution="Labels © Esri"
        detectRetina
      />
      {/* Custom actions */}
      <FitBoundsHandler positions={coords} />
      <Polyline
        positions={completedCoords}
        pathOptions={{
          color: "#27AE60",
          weight: 3,
        }}
      />
      <Polyline
        positions={upcomingCoords}
        pathOptions={{
          color: "#AAAAAA",
          weight: 3,
          opacity: 0.7,
          dashArray: "4",
        }}
      />
      <MovingMarker
        coords={upcomingCoords}
        icon={L.icon({
          iconUrl: "/assets/circle.png",
          iconSize: isMobile ? [28, 28] : [32, 32],
          iconAnchor: isMobile ? [14, 14] : [16, 16],
        })}
      />
      {routes.map((route) => (
        <Marker
          key={route.latlng.join("")}
          position={route.latlng}
          icon={L.divIcon({
            html: getPinHtml(route.status),
            className: "",
            iconSize: isMobile ? [32, 32] : [38, 38],
            iconAnchor: isMobile ? [16, 32] : [19, 38],
          })}
        />
      ))}
    </MapContainer>
  );
}
