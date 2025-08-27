"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapActions from "./MapActions";
import MapRoutes from "./MapRoutes";
import type { Route, Address } from "@/lib/validations/shipment";
import { cn } from "@/lib/utils";

interface Props {
  targetLocations: (Omit<Route, "address"> & { address: Address | null })[];
  setTargetLocations: Dispatch<
    SetStateAction<(Omit<Route, "address"> & { address: Address | null })[]>
  >;
  showMap: boolean;
  setShowMap: Dispatch<SetStateAction<boolean>>;
}

export default function Map({
  targetLocations,
  setTargetLocations,
  showMap,
  setShowMap,
}: Props) {
  const [canAdd, setCanAdd] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const targetFull = targetLocations.length === 4;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-dvh transition-all duration-150 ease-linear",
        showMap ? "z-50 opacity-100" : "-z-50 opacity-0"
      )}
    >
      <MapActions
        targetFull={targetFull}
        canAdd={canAdd}
        canDelete={canDelete}
        setCanAdd={setCanAdd}
        setCanDelete={setCanDelete}
        clearTargetAddress={() => setTargetLocations([])}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setShowMap={setShowMap}
      />
      <MapContainer
        center={[0, 0]}
        zoom={2}
        minZoom={2}
        maxBounds={[
          [-90, -180], // Southwest corner
          [90, 180], // Northeast corner
        ]}
        maxBoundsViscosity={1.0}
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
        <MapRoutes
          targetFull={targetFull}
          canAdd={canAdd}
          canDelete={canDelete}
          setCanAdd={setCanAdd}
          setCanDelete={setCanDelete}
          targetLocations={targetLocations}
          setTargetLocations={setTargetLocations}
          searchValue={searchValue}
        />
      </MapContainer>
    </div>
  );
}
