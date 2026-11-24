"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { Listing } from "@/types";

interface MapViewProps {
  listings: Listing[];
}

/** Automatically fits the map bounds to show all markers. */
function MapBoundsFitter({ listings }: { listings: Listing[] }) {
  const map = useMap();

  useEffect(() => {
    if (listings.length === 0) return;
    const bounds = L.latLngBounds(
      listings.map((l) => [l.coordinates.lat, l.coordinates.lng])
    );
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [listings, map]);

  return null;
}

export default function MapPlaceholder({ listings }: MapViewProps) {
  if (listings.length === 0) {
    return (
      <div className="flex h-full min-h-[300px] w-full items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100">
        <p className="text-sm font-medium text-amber-600">
          No listings to show on map
        </p>
      </div>
    );
  }

  // Custom pin icon styled like Airbnb
  const pinIcon = L.divIcon({
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    html: '<div style="background:#e11d48;color:white;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">$</div>',
  });

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      className="h-full min-h-[300px] w-full rounded-xl"
      scrollWheelZoom={true}
    >
      {/* Auto-fit bounds to show all pins */}
      <MapBoundsFitter listings={listings} />

      {/* OpenStreetMap tiles — free, no API key required */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.coordinates.lat, listing.coordinates.lng]}
          icon={pinIcon}
        >
          <Popup>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">
                {listing.title}
              </p>
              <p className="text-xs text-gray-500">
                ${listing.price} / night
              </p>
              <Link
                href={`/rooms/${listing.id}`}
                className="mt-1 inline-block text-xs font-medium text-rose-600 hover:underline"
              >
                View details
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}