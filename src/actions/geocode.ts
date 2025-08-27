"use server";

import type { Address } from "@/lib/validations/shipment";
import logger, { structureError } from "@/lib/logger";

export async function getAddressFromCoords([lat, lon]: [
  number,
  number
]): Promise<Address | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "anony-app/1.0",
      },
    });

    const data = await res.json();
    const { address } = data;

    if (!address) throw new Error();

    // Pick the most specific ISO region code available
    const isoKeys = [
      "ISO3166-2-lvl6",
      "ISO3166-2-lvl5",
      "ISO3166-2-lvl4",
      "ISO3166-2-lvl3",
    ];

    for (const key of isoKeys) {
      if (address[key]) {
        address.isoRegionCode = address[key];
        break;
      }
    }

    // Clean up raw ISO keys
    for (const key of isoKeys) {
      delete address[key];
    }

    return address;
  } catch (error) {
    logger.error(
      "Failed to get address from coordinates",
      structureError(error)
    );
    return null;
  }
}

export async function getCoordsFromSearch(
  search: string
): Promise<{ lat: string; lon: string }[] | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      search
    )}&format=json&limit=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "anony-app/1.0",
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    logger.error("Failed to get geocode from search", structureError(error));
    return null;
  }
}
