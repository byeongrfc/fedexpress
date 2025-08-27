"use client";

import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useTransition,
} from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMapEvents, useMap, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { getAddressFromCoords, getCoordsFromSearch } from "@/actions/geocode";
import { getCityCountry, getLatLon } from "@/lib/geocode";
import type { Route, Address } from "@/lib/validations/shipment";

interface Props {
  targetFull: boolean;
  canAdd: boolean;
  canDelete: boolean;
  setCanAdd: (value: boolean) => void;
  setCanDelete: (value: boolean) => void;
  targetLocations: (Omit<Route, "address"> & { address: Address | null })[];
  setTargetLocations: Dispatch<
    SetStateAction<(Omit<Route, "address"> & { address: Address | null })[]>
  >;
  searchValue: string;
}

export default function MapRoutes({
  targetFull,
  canAdd,
  canDelete,
  setCanAdd,
  setCanDelete,
  targetLocations,
  setTargetLocations,
  searchValue,
}: Props) {
  const isMobile = useIsMobile();
  const map = useMap();
  const [, startTransition] = useTransition();

  const handleDelete = (latlng: [number, number]) => {
    if (!canDelete) return;
    const newData = targetLocations.filter(
      (target) => target.latlng.join("") !== latlng.join("")
    );

    setTargetLocations(newData);
    setCanAdd(false);
    setCanDelete(false);
  };

  useMapEvents({
    click: async (e) => {
      if (!canAdd || targetFull) return;
      const latlng = [e.latlng.lat, e.latlng.lng] as [number, number];

      setTargetLocations((prev) => [
        ...prev,
        {
          latlng,
          address: null,
          status: !prev.length ? "current" : "upcoming",
          timeStamp: !prev.length ? new Date() : undefined,
        },
      ]);
      setCanAdd(false);

      startTransition(async () => {
        const address = await getAddressFromCoords(latlng);

        setTargetLocations((prev) => {
          const newData = prev
            .map((target) => {
              if (target.latlng.join("") === latlng.join("")) {
                return address && { ...target, address };
              }
              return target;
            })
            .filter(Boolean) as (Omit<Route, "address"> & {
            address: Address | null;
          })[];

          return newData;
        });
      });
    },
  });

  useEffect(() => {
    let canSearch = searchValue && true;

    const id = setTimeout(async () => {
      if (!canSearch) return;
      const data = await getCoordsFromSearch(searchValue);
      if (data) map.flyTo(getLatLon(data[0]), 7);
    }, 1000);

    return () => {
      canSearch = false;
      clearTimeout(id);
    };
  }, [searchValue, map]);

  return (
    <>
      {targetLocations.map((target, i) => (
        <Fragment key={i}>
          <Marker
            position={target.latlng}
            icon={L.icon({
              iconUrl:
                i === 0
                  ? "/assets/pin-blue.png"
                  : i === targetLocations.length - 1
                  ? "/assets/pin-green.png"
                  : "/assets/pin-orange.png",
              iconSize: isMobile ? [32, 32] : [38, 38],
              iconAnchor: isMobile ? [16, 32] : [19, 38],
            })}
            eventHandlers={{
              click: () => canDelete && handleDelete(target.latlng),
            }}
          >
            <Popup>
              <b>Coordinates:</b> <br />
              Lat: {target.latlng[0].toFixed(5)}, Lng:{" "}
              {target.latlng[1].toFixed(5)} <br />
              <b>Location:</b> <br />
              {target.address && getCityCountry(target.address)}
            </Popup>
          </Marker>
          <Polyline
            color="white"
            dashArray="8 8"
            lineCap="round"
            lineJoin="round"
            positions={targetLocations.map((target) => target.latlng)}
          />
        </Fragment>
      ))}
    </>
  );
}
