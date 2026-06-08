"use client";

import { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { MapPin, Loader2 } from "lucide-react";

// CartoDB Dark Matter tiles (Looks identical to Mapbox Dark Theme, no API key needed!)
const mapTilerProvider = (x: number, y: number, z: number, dpr?: number) => {
  return `https://basemaps.cartocdn.com/dark_all/${z}/${x}/${y}${dpr && dpr >= 2 ? '@2x' : ''}.png`;
};

export function MapWidget({ locationName }: { locationName?: string }) {
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!locationName) {
      setLoading(false);
      return;
    }

    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        // Use OpenStreetMap's free Nominatim Geocoding API
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`);
        const data = await res.json();
        
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setCenter([lat, lon]);
          setError(null);
        } else {
          setError("Location not found");
        }
      } catch (err) {
        setError("Failed to geocode location");
      }
      setLoading(false);
    };

    fetchCoordinates();
  }, [locationName]);

  if (loading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-8 flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (error || !locationName) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-8 flex flex-col items-center justify-center text-center h-64">
        <MapPin className="h-6 w-6 text-zinc-500 mb-2 opacity-50" />
        <p className="text-xs text-zinc-500">{error || "No location provided"}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] overflow-hidden h-64 relative group">
      <Map 
        height={256} 
        center={center} 
        zoom={11} 
        provider={mapTilerProvider}
        metaWheelZoom={true} // Requires Cmd/Ctrl to zoom so it doesn't interrupt scrolling
      >
        <Marker width={50} anchor={center}>
          <div className="relative flex items-center justify-center pt-5">
            <div className="absolute w-8 h-8 bg-emerald-500/20 rounded-full animate-ping" />
            <div className="relative h-6 w-6 bg-[#0a0a0a] border-2 border-emerald-400 rounded-full flex items-center justify-center shadow-lg">
              <div className="h-2 w-2 bg-emerald-400 rounded-full" />
            </div>
          </div>
        </Marker>
      </Map>
      
      {/* Overlay label */}
      <div className="absolute top-3 left-3 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/[0.08] px-3 py-1.5 rounded-lg pointer-events-none shadow-lg z-10">
        <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400 mb-0.5">Destination</p>
        <p className="text-sm font-semibold text-white truncate max-w-[200px]">{locationName}</p>
      </div>
    </div>
  );
}
