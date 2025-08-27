import type { Address } from "./validations/shipment";

export function getCityCountry(address: Address) {
  const city =
    address.city ||
    address.town ||
    address.village ||
    address.hamlet ||
    address.suburb ||
    address.state;
  const country = address.country;

  const metadata = [city, country].filter(Boolean).join(", ");
  return metadata;
}

export function getCityStateCountry(address: Address) {
  const city =
    address.city ||
    address.town ||
    address.village ||
    address.hamlet ||
    address.suburb;
  const state = address.state;
  const country = address.country;

  const metadata = [city, state, country].filter(Boolean).join(", ");
  return metadata;
}

export function getLatLon(searchMap: { lat: string; lon: string }) {
  const latlon = [parseFloat(searchMap.lat), parseFloat(searchMap.lon)] as [
    number,
    number
  ];
  return latlon;
}

export function getFlagUrl(countryCode: string, width: number) {
  return `https://flagcdn.com/w${width}/${countryCode.toLowerCase()}.png`;
}
