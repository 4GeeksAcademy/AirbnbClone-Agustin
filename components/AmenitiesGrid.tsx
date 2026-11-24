interface AmenitiesGridProps {
  amenities: string[];
}

const amenityIcons: Record<string, string> = {
  WiFi: "📶",
  Cocina: "🍳",
  Lavadora: "🧺",
  "Aire acondicionado": "❄️",
  "Estacionamiento gratuito": "🅿️",
  TV: "📺",
  "Secadora de pelo": "💨",
  "Detector de humo": "🔥",
  Piscina: "🏊",
};

export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  const displayed = amenities.slice(0, 10);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {displayed.map((amenity) => (
        <div key={amenity} className="flex items-center gap-2 rounded-lg border border-amber-200 bg-[#fdf1e6] px-3 py-2.5">
          <span className="text-lg">{amenityIcons[amenity] || "•"}</span>
          <span className="text-sm text-amber-800">{amenity}</span>
        </div>
      ))}
    </div>
  );
}