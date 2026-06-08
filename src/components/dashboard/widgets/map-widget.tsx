"use client";

import { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { MapPin, Loader2, Navigation, Home, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

// CartoDB Dark Matter tiles (Looks identical to Mapbox Dark Theme, no API key needed!)
const mapTilerProvider = (x: number, y: number, z: number, dpr?: number) => {
  return `https://basemaps.cartocdn.com/dark_all/${z}/${x}/${y}${dpr && dpr >= 2 ? '@2x' : ''}.png`;
};

interface MapMarkerInfo {
  name: string;
  lat: number;
  lon: number;
  isMain: boolean;
  type?: string;
}

export function MapWidget({ 
  locationName,
  places = []
}: { 
  locationName?: string;
  places?: Array<{ name: string; locationName: string; type: string }>;
}) {
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [markers, setMarkers] = useState<MapMarkerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  useEffect(() => {
    if (!locationName) {
      setLoading(false);
      return;
    }

    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        const cacheKey = `geocode_${locationName}`;
        const cached = localStorage.getItem(cacheKey);
        let lat, lon;

        if (cached) {
          const parsed = JSON.parse(cached);
          lat = parsed.lat;
          lon = parsed.lon;
        } else {
          // Use OpenStreetMap's free Nominatim Geocoding API
          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`);
          if (!res.ok) throw new Error("Nominatim API error");
          const data = await res.json();
          
          if (data && data.length > 0) {
            lat = parseFloat(data[0].lat);
            lon = parseFloat(data[0].lon);
            localStorage.setItem(cacheKey, JSON.stringify({ lat, lon }));
          } else {
            throw new Error("Location not found");
          }
        }
        
        setCenter([lat, lon]);
        setError(null);
        
        const newMarkers: MapMarkerInfo[] = [{ name: locationName, lat, lon, isMain: true }];
        setMarkers(newMarkers);

        // Geocode places sequentially to respect Nominatim rate limits (1 req/s)
        for (const place of places) {
          try {
            const placeCacheKey = `geocode_${place.locationName}`;
            const placeCached = localStorage.getItem(placeCacheKey);
            let pLat, pLon;

            if (placeCached) {
              const parsed = JSON.parse(placeCached);
              pLat = parsed.lat;
              pLon = parsed.lon;
            } else {
              await new Promise(r => setTimeout(r, 1200)); // 1.2s delay to be safe with Nominatim
              const placeRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place.locationName)}&format=json&limit=1`);
              if (!placeRes.ok) throw new Error("Rate limit");
              const placeData = await placeRes.json();
              if (placeData && placeData.length > 0) {
                pLat = parseFloat(placeData[0].lat);
                pLon = parseFloat(placeData[0].lon);
                localStorage.setItem(placeCacheKey, JSON.stringify({ lat: pLat, lon: pLon }));
              } else {
                 continue;
              }
            }
            
            newMarkers.push({
              name: place.name,
              lat: pLat,
              lon: pLon,
              isMain: false,
              type: place.type
            });
            // Update state progressively so markers pop in one by one
            setMarkers([...newMarkers]);
          } catch (e) {
            console.error("Failed to geocode place:", place.name);
          }
        }
      } catch (err: any) {
        setError(err.message || "Failed to geocode location");
      }
      setLoading(false);
    };

    fetchCoordinates();
  }, [locationName, places]);

  if (loading && markers.length === 0) {
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

  const getMarkerIcon = (type?: string) => {
    switch (type) {
      case "stay": return <Home className="h-2.5 w-2.5 text-indigo-400" />;
      case "restaurant": return <Utensils className="h-2.5 w-2.5 text-orange-400" />;
      case "activity": return <Navigation className="h-2.5 w-2.5 text-emerald-400" />;
      default: return <Navigation className="h-2.5 w-2.5 text-zinc-400" />;
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] overflow-hidden h-64 relative group">
      <Map 
        height={256} 
        center={center} 
        zoom={11} 
        provider={mapTilerProvider}
        metaWheelZoom={true} // Requires Cmd/Ctrl to zoom so it doesn't interrupt scrolling
      >
        {markers.map((marker, i) => (
          <Marker 
            key={i} 
            width={50} 
            anchor={[marker.lat, marker.lon]}
            onClick={() => setActiveMarker(marker.name)}
          >
            <div 
              className="relative flex flex-col items-center justify-center pt-5 cursor-pointer group/marker"
              onMouseEnter={() => setActiveMarker(marker.name)}
              onMouseLeave={() => setActiveMarker(null)}
            >
              {marker.isMain ? (
                <>
                  <div className="absolute w-8 h-8 bg-emerald-500/20 rounded-full animate-ping" />
                  <div className="relative h-6 w-6 bg-[#0a0a0a] border-2 border-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                    <div className="h-2 w-2 bg-emerald-400 rounded-full" />
                  </div>
                </>
              ) : (
                <div className="relative h-5 w-5 bg-[#111113] border border-white/[0.2] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  {getMarkerIcon(marker.type)}
                </div>
              )}
              
              {/* Tooltip */}
              <div className={cn(
                "absolute -top-10 whitespace-nowrap bg-[#0a0a0a]/90 backdrop-blur-md border border-white/[0.1] px-2 py-1 rounded shadow-lg text-[10px] font-medium transition-all duration-200 z-50",
                activeMarker === marker.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none",
                marker.isMain ? "text-emerald-400" : "text-white"
              )}>
                {marker.name}
              </div>
            </div>
          </Marker>
        ))}
      </Map>
      
      {/* Overlay label */}
      <div className="absolute top-3 left-3 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/[0.08] px-3 py-1.5 rounded-lg pointer-events-none shadow-lg z-10 flex flex-col gap-1">
        <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">Destination</p>
        <p className="text-sm font-semibold text-white truncate max-w-[200px]">{locationName}</p>
        {markers.length > 1 && (
          <p className="text-[9px] text-zinc-400">+{markers.length - 1} activities plotted</p>
        )}
      </div>
    </div>
  );
}
