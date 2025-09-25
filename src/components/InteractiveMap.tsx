"use client";

import React, { useEffect, useState } from "react";
import L, { LatLngTuple, PointTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";

// Fix default marker icons for Vite/Next builds
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// UI imports
import { MapPin, Clock, Car, Star, Info, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ----------------------
// Data model + sample data
// ----------------------
interface Monastery {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  description: string;
  highlights: string[];
  travelTime: string;
  nearestTown: string;
  rating: number;
  reviews: number;
  established: string;
  specialFeatures: string[];
}

const monasteries: Monastery[] = [
  {
    id: "rumtek-monastery",
    name: "Rumtek Monastery",
    location: "Gangtok",
    coordinates: { lat: 27.3256, lng: 88.6115 },
    description: "Seat of the Karmapa, rich murals, golden stupa",
    highlights: ["Golden Stupa", "Tibetan Art", "Karmapa Seat"],
    travelTime: "1 hour from Gangtok",
    nearestTown: "Gangtok",
    rating: 4.8,
    reviews: 342,
    established: "1960s",
    specialFeatures: [
      "Daily prayers at dawn",
      "Museum with rare artifacts",
      "Traditional dance festivals",
    ],
  },
  {
    id: "pemayangtse-monastery",
    name: "Pemayangtse Monastery",
    location: "Pelling",
    coordinates: { lat: 27.2814, lng: 88.2389 },
    description: "17th century monastery with sweeping Himalayan views.",
    highlights: ["Wooden art", "Ancient statues"],
    travelTime: "30–45 minutes from Pelling",
    nearestTown: "Pelling",
    rating: 4.6,
    reviews: 187,
    established: "1705",
    specialFeatures: [
      "Seven-tiered wooden sculpture",
      "Panoramic Kanchenjunga views",
    ],
  },
  {
    id: "tashiding-monastery",
    name: "Tashiding Monastery",
    location: "West Sikkim",
    coordinates: { lat: 27.2168, lng: 88.2398 },
    description: "Known for the Bumchu festival and tranquil setting.",
    highlights: ["Bumchu festival", "Scenic views"],
    travelTime: "Varies by route",
    nearestTown: "Yuksom",
    rating: 4.5,
    reviews: 124,
    established: "1717",
    specialFeatures: ["Holy water ceremony", "Pilgrimage site"],
  },
  {
    id: "enchey-monastery",
    name: "Enchey Monastery",
    location: "Gangtok",
    coordinates: { lat: 27.3333, lng: 88.6067 },
    description: "Small monastery famous for mask dance festivals.",
    highlights: ["Mask dance", "Local rituals"],
    travelTime: "Within Gangtok city",
    nearestTown: "Gangtok",
    rating: 4.3,
    reviews: 98,
    established: "1909",
    specialFeatures: ["Annual Cham dance", "Protective deities"],
  },
  {
    id: "ralang-monastery",
    name: "Ralang Monastery",
    location: "Ralang area",
    coordinates: { lat: 27.2866, lng: 88.4552 },
    description: "Vibrant monastery complex with modern and traditional areas.",
    highlights: ["Festivals", "Local crafts"],
    travelTime: "2.5 hours from Gangtok",
    nearestTown: "Ravangla",
    rating: 4.4,
    reviews: 76,
    established: "1975 (new), 1768 (old)",
    specialFeatures: ["Dual monastery complex", "Kagyupa tradition"],
  },
  {
    id: "khecheopalri-monastery",
    name: "Khecheopalri Monastery",
    location: "West Sikkim",
    coordinates: { lat: 27.2882, lng: 88.2396 },
    description: "A sacred site near the wish-fulfilling Khecheopalri Lake.",
    highlights: ["Sacred Lake", "Religious ceremonies"],
    travelTime: "45 mins from Pelling",
    nearestTown: "Pelling",
    rating: 4.9,
    reviews: 250,
    established: "17th Century",
    specialFeatures: ["Wish-fulfilling lake", "Pilgrimage site"],
  },
  {
    id: "dubdi-monastery",
    name: "Dubdi Monastery",
    location: "Yuksom",
    coordinates: { lat: 27.3486, lng: 88.2356 },
    description: "Sikkim's first monastery, established in 1701.",
    highlights: ["Sikkim's first monastery", "Historical site"],
    travelTime: "30 mins walk from Yuksom",
    nearestTown: "Yuksom",
    rating: 4.5,
    reviews: 90,
    established: "1701",
    specialFeatures: ["Traditional architecture", "Peaceful surroundings"],
  },
  {
    id: "phodong-monastery",
    name: "Phodong Monastery",
    location: "North Sikkim",
    coordinates: { lat: 27.4645, lng: 88.5833 },
    description: "One of the most beautiful monasteries with ancient murals.",
    highlights: ["Ancient murals", "Buddhist festivals"],
    travelTime: "1.5 hours from Gangtok",
    nearestTown: "Gangtok",
    rating: 4.4,
    reviews: 80,
    established: "18th Century",
    specialFeatures: ["Ornate wall paintings", "Festival ground"],
  },
  {
    id: "rinchenpong-monastery",
    name: "Rinchenpong Monastery",
    location: "West Sikkim",
    coordinates: { lat: 27.2625, lng: 88.2255 },
    description: "Offers panoramic views of the Kanchenjunga range.",
    highlights: ["Kanchenjunga views", "Statue of Ati Buddha"],
    travelTime: "15 mins from Kaluk",
    nearestTown: "Kaluk",
    rating: 4.6,
    reviews: 112,
    established: "1717",
    specialFeatures: ["Historical significance", "Peaceful ambience"],
  },
  {
    id: "sangachoeling-monastery",
    name: "Sangachoeling Monastery",
    location: "Pelling",
    coordinates: { lat: 27.2847, lng: 88.2386 },
    description: "One of the oldest monasteries in Sikkim, offers great views.",
    highlights: ["Oldest monastery", "Views of Pelling"],
    travelTime: "20 min walk from Pelling",
    nearestTown: "Pelling",
    rating: 4.7,
    reviews: 156,
    established: "1697",
    specialFeatures: ["Historical artifacts", "Prayer flags"],
  },
  {
    id: "lachen-monastery",
    name: "Lachen Monastery",
    location: "Lachen",
    coordinates: { lat: 27.7025, lng: 88.5582 },
    description: "A small, serene monastery near the Lachen village.",
    highlights: ["Scenic views", "Peaceful atmosphere"],
    travelTime: "5 mins from Lachen",
    nearestTown: "Lachen",
    rating: 4.3,
    reviews: 65,
    established: "1858",
    specialFeatures: ["Colorful interiors", "Mountain backdrop"],
  },
  {
    id: "labrang-monastery",
    name: "Labrang Monastery",
    location: "North Sikkim",
    coordinates: { lat: 27.4727, lng: 88.5796 },
    description: "Known for its traditional Sikkimese architecture.",
    highlights: ["Sikkimese architecture", "Statues and idols"],
    travelTime: "1.5 hours from Gangtok",
    nearestTown: "Gangtok",
    rating: 4.5,
    reviews: 78,
    established: "1814",
    specialFeatures: ["Cultural significance", "Quiet location"],
  },
  {
    id: "shingba-monastery",
    name: "Shingba Monastery",
    location: "Lachung",
    coordinates: { lat: 27.6845, lng: 88.7512 },
    description: "Known for its vibrant murals and statues.",
    highlights: ["Vibrant murals", "Statues"],
    travelTime: "Within Lachung",
    nearestTown: "Lachung",
    rating: 4.5,
    reviews: 60,
    established: "18th Century",
    specialFeatures: ["Ornate designs", "Peaceful setting"],
  },
  {
    id: "dzongu-monastery",
    name: "Dzongu Monastery",
    location: "Dzongu",
    coordinates: { lat: 27.5358, lng: 88.5255 },
    description: "A serene monastery in the Lepcha reserve.",
    highlights: ["Lepcha culture", "Tribal history"],
    travelTime: "1 hour from Mangan",
    nearestTown: "Mangan",
    rating: 4.7,
    reviews: 35,
    established: "17th Century",
    specialFeatures: ["Cultural center", "Authentic Lepcha experience"],
  },
  {
    id: "singhik-monastery",
    name: "Singhik Monastery",
    location: "Singhik",
    coordinates: { lat: 27.5256, lng: 88.5298 },
    description: "A small, scenic monastery with breathtaking views of Mt. Kanchenjunga.",
    highlights: ["Kanchenjunga view", "Scenic location"],
    travelTime: "1.5 hours from Mangan",
    nearestTown: "Mangan",
    rating: 4.4,
    reviews: 28,
    established: "19th Century",
    specialFeatures: ["Viewpoint", "Peaceful atmosphere"],
  },
  {
    id: "chidom-monastery",
    name: "Chidom Monastery",
    location: "Upper Lachung",
    coordinates: { lat: 27.6999, lng: 88.7554 },
    description: "Known for its unique architecture and serene environment.",
    highlights: ["Unique architecture", "Serene environment"],
    travelTime: "10 mins from Lachung",
    nearestTown: "Lachung",
    rating: 4.3,
    reviews: 20,
    established: "18th Century",
    specialFeatures: ["Monastic life", "Traditional rituals"],
  },
  {
    id: "doling-gumpa",
    name: "Doling Gumpa",
    location: "Temi",
    coordinates: { lat: 27.2450, lng: 88.5140 },
    description: "A beautiful monastery near the Temi Tea Garden.",
    highlights: ["Tea garden views", "Peaceful location"],
    travelTime: "1 hour from Ravangla",
    nearestTown: "Ravangla",
    rating: 4.3,
    reviews: 40,
    established: "18th Century",
    specialFeatures: ["Tea estate tours", "Serene environment"],
  },
  {
    id: "yuksom-monastery",
    name: "Yuksom Monastery",
    location: "Yuksom",
    coordinates: { lat: 27.3712, lng: 88.2325 },
    description: "A historic monastery in the first capital of Sikkim.",
    highlights: ["Historical significance", "Scenic trails"],
    travelTime: "Within Yuksom",
    nearestTown: "Yuksom",
    rating: 4.2,
    reviews: 55,
    established: "1701",
    specialFeatures: ["Trekking base", "Cultural heritage"],
  },
  {
    id: "lingdum-monastery",
    name: "Lingdum Monastery",
    location: "Gangtok",
    coordinates: { lat: 27.3456, lng: 88.6415 },
    description: "A large monastery with stunning architecture and beautiful murals.",
    highlights: ["Stunning architecture", "Murals"],
    travelTime: "45 mins from Gangtok",
    nearestTown: "Gangtok",
    rating: 4.6,
    reviews: 130,
    established: "1999",
    specialFeatures: ["Peaceful ambiance", "Meditation hall"],
  },
  {
    id: "nathang-gumpa",
    name: "Nathang Gumpa",
    location: "Nathang",
    coordinates: { lat: 27.3350, lng: 88.7500 },
    description: "A small monastery in the beautiful Nathang Valley.",
    highlights: ["Nathang Valley", "Scenic views"],
    travelTime: "3 hours from Gangtok",
    nearestTown: "Gangtok",
    rating: 4.6,
    reviews: 50,
    established: "19th Century",
    specialFeatures: ["High-altitude location", "Snow-capped mountains"],
  },
  {
    id: "thangu-gumpa",
    name: "Thangu Gumpa",
    location: "Thangu",
    coordinates: { lat: 27.9450, lng: 88.5650 },
    description: "A small, high-altitude monastery in the stunning Thangu Valley.",
    highlights: ["High-altitude", "Thangu Valley"],
    travelTime: "2 hours from Lachen",
    nearestTown: "Lachen",
    rating: 4.5,
    reviews: 30,
    established: "20th Century",
    specialFeatures: ["Snow-capped peaks", "Yak pastures"],
  },
  {
    id: "phensang-monastery",
    name: "Phensang Monastery",
    location: "Phensang",
    coordinates: { lat: 27.4200, lng: 88.5800 },
    description: "A large monastery with stunning architecture and beautiful murals.",
    highlights: ["Stunning architecture", "Murals"],
    travelTime: "1 hour from Gangtok",
    nearestTown: "Gangtok",
    rating: 4.6,
    reviews: 85,
    established: "1721",
    specialFeatures: ["Religious festivals", "Monastic life"],
  },
  {
    id: "gathang-monastery",
    name: "Gathang Monastery",
    location: "Gathang",
    coordinates: { lat: 27.4650, lng: 88.5280 },
    description: "A quiet retreat known for its traditional Buddhist art.",
    highlights: ["Buddhist art", "Quiet retreat"],
    travelTime: "1 hour from Mangan",
    nearestTown: "Mangan",
    rating: 4.3,
    reviews: 22,
    established: "18th Century",
    specialFeatures: ["Traditional teachings", "Peaceful surroundings"],
  },
  {
    id: "chungthang-monastery",
    name: "Chungthang Monastery",
    location: "Chungthang",
    coordinates: { lat: 27.6095, lng: 88.6475 },
    description: "A historical monastery with a tranquil atmosphere.",
    highlights: ["Historical site", "Tranquil atmosphere"],
    travelTime: "Within Chungthang",
    nearestTown: "Chungthang",
    rating: 4.2,
    reviews: 25,
    established: "18th Century",
    specialFeatures: ["Unique geography", "Spiritual importance"],
  },
];

// ----------------------
// GeoJSON Data for Sikkim Border
// Adjusted coordinates for a more accurate border representation
// ----------------------
const sikkimGeoJSON = {
  "type": "FeatureCollection",
  "name": "sikkim",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
    { "type": "Feature", "properties": { "name": "sikkim" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [[ 87.995, 27.225 ], [ 88.01, 27.255 ], [ 88.01, 27.29 ], [ 88.04, 27.34 ], [ 88.02, 27.365 ], [ 88.02, 27.38 ], [ 88.025, 27.41 ], [ 88.035, 27.43 ], [ 88.05, 27.435 ], [ 88.05, 27.445 ], [ 88.025, 27.47 ], [ 88.025, 27.51 ], [ 88.04, 27.52 ], [ 88.04, 27.55 ], [ 88.05, 27.555 ], [ 88.065, 27.6 ], [ 88.095, 27.62 ], [ 88.1, 27.655 ], [ 88.125, 27.675 ], [ 88.135, 27.74 ], [ 88.145, 27.76 ], [ 88.16, 27.765 ], [ 88.16, 27.78 ], [ 88.17, 27.79 ], [ 88.155, 27.81 ], [ 88.155, 27.83 ], [ 88.165, 27.845 ], [ 88.145, 27.85 ], [ 88.14, 27.86 ], [ 88.125, 27.86 ], [ 88.115, 27.89 ], [ 88.1, 27.905 ], [ 88.11, 27.96 ], [ 88.135, 27.985 ], [ 88.155, 27.985 ], [ 88.19, 27.965 ], [ 88.205, 27.985 ], [ 88.245, 27.99 ], [ 88.255, 27.975 ], [ 88.27, 27.975 ], [ 88.275, 27.985 ], [ 88.295, 27.99 ], [ 88.3, 27.985 ], [ 88.31, 28 ], [ 88.345, 28.01 ], [ 88.385, 28.01 ], [ 88.395, 28 ], [ 88.41, 28.02 ], [ 88.455, 28.035 ], [ 88.455, 28.045 ], [ 88.485, 28.075 ], [ 88.535, 28.06 ], [ 88.54, 28.1 ], [ 88.55, 28.1 ], [ 88.555, 28.11 ], [ 88.59, 28.11 ], [ 88.6, 28.13 ], [ 88.615, 28.13 ], [ 88.63, 28.145 ], [ 88.645, 28.14 ], [ 88.66, 28.125 ], [ 88.66, 28.115 ], [ 88.68, 28.1 ], [ 88.72, 28.095 ], [ 88.765, 28.1 ], [ 88.825, 28.04 ], [ 88.855, 28.025 ], [ 88.86, 27.96 ], [ 88.865, 27.945 ], [ 88.875, 27.945 ], [ 88.89, 27.925 ], [ 88.91, 27.855 ], [ 88.9, 27.84 ], [ 88.9, 27.82 ], [ 88.88, 27.81 ], [ 88.875, 27.765 ], [ 88.885, 27.755 ], [ 88.885, 27.735 ], [ 88.865, 27.685 ], [ 88.87, 27.665 ], [ 88.85, 27.635 ], [ 88.83, 27.625 ], [ 88.825, 27.585 ], [ 88.795, 27.555 ], [ 88.815, 27.535 ], [ 88.8, 27.465 ], [ 88.81, 27.46 ], [ 88.815, 27.44 ], [ 88.83, 27.43 ], [ 88.84, 27.405 ], [ 88.87, 27.405 ], [ 88.91, 27.35 ], [ 88.94, 27.34 ], [ 88.94, 27.31 ], [ 88.93, 27.3 ], [ 88.935, 27.285 ], [ 88.915, 27.255 ], [ 88.89, 27.245 ], [ 88.84, 27.245 ], [ 88.825, 27.235 ], [ 88.825, 27.215 ], [ 88.805, 27.17 ], [ 88.78, 27.165 ], [ 88.78, 27.145 ], [ 88.75, 27.12 ], [ 88.715, 27.12 ], [ 88.685, 27.16 ], [ 88.655, 27.14 ], [ 88.625, 27.15 ], [ 88.61, 27.17 ], [ 88.575, 27.17 ], [ 88.55, 27.165 ], [ 88.555, 27.145 ], [ 88.545, 27.13 ], [ 88.53, 27.13 ], [ 88.51, 27.105 ], [ 88.485, 27.1 ], [ 88.475, 27.08 ], [ 88.445, 27.06 ], [ 88.315, 27.085 ], [ 88.3, 27.105 ], [ 88.28, 27.11 ], [ 88.255, 27.1 ], [ 88.22, 27.1 ], [ 88.19, 27.115 ], [ 88.15, 27.09 ], [ 88.075, 27.125 ], [ 88.065, 27.135 ], [ 88.065, 27.16 ], [ 88.05, 27.18 ], [ 88.05, 27.195 ], [ 88, 27.195 ], [ 87.99, 27.215 ], [ 87.995, 27.225 ]] ] ] } }
  ]
};

// ----------------------
// Custom 3D-like marker (DivIcon)
// ----------------------
const monasteryIcon = new L.DivIcon({
  html: `
    <div style="
      width:36px;height:36px;
      display:flex;align-items:center;justify-content:center;
      border-radius:10px;
      background:linear-gradient(135deg,#f59e0b,#f97316);
      box-shadow:0 6px 14px rgba(2,6,23,0.45);
      border:2px solid rgba(255,255,255,0.9);
      transform:translateY(-6px);
    ">
      <span style="font-size:18px;line-height:18px">🏯</span>
    </div>
  `,
  className: "monastery-div-icon",
  iconSize: [36, 36] as PointTuple,
  iconAnchor: [18, 36] as PointTuple,
  popupAnchor: [0, -36] as PointTuple,
});

// ----------------------
// Helper: fly map to selected monastery
// ----------------------
function FlyToMonastery({ coords }: { coords: LatLngTuple | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      try {
        map.flyTo(coords, 12, { duration: 0.7 });
      } catch {
        // ignore
      }
    }
  }, [coords, map]);
  return null;
}

// ----------------------
// Main component
// ----------------------
const InteractiveMap: React.FC = () => {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("map");

  const sikkimCenter: LatLngTuple = [27.5, 88.5]; // Centered on Sikkim

  return (
    <section className="py-20 px-4 bg-gradient-heritage">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Sacred Sites of Sikkim
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the spiritual landscape with detailed monastery locations,
            travel routes, and cultural insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map/List view */}
          <div className="lg:col-span-2">
            <Card className="card-heritage h-[600px] flex flex-col">
              <CardHeader className="shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-2xl text-primary flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-saffron" />
                    Monastery Locations
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === "map" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("map")}
                    >
                      Map View
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      List View
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden">
                {viewMode === "map" ? (
                  <div className="h-full w-full rounded-xl overflow-hidden shadow">
                    <MapContainer
                      center={sikkimCenter}
                      zoom={9} // Slightly increased zoom for better border visibility
                      className="h-full w-full"
                      scrollWheelZoom
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />

                      <FlyToMonastery
                        coords={
                          selectedMonastery
                            ? [selectedMonastery.coordinates.lat, selectedMonastery.coordinates.lng]
                            : null
                        }
                      />

                      <GeoJSON
                        data={sikkimGeoJSON as any}
                        style={() => ({
                          color: '#000000ff', // Dark blue color
                          weight: 3,        // Thicker line
                          opacity: 0.8,     // Slightly more opaque
                          fillColor: 'transparent', // Keep the inside transparent
                        })}
                      />

                      {monasteries.map((m) => (
                        <Marker
                          key={m.id}
                          position={[m.coordinates.lat, m.coordinates.lng]}
                          icon={monasteryIcon}
                          eventHandlers={{
                            click: () => setSelectedMonastery(m),
                            mouseover: (e: L.LeafletMouseEvent) => {
                              (e.target as L.Marker).openPopup();
                            },
                            mouseout: (e: L.LeafletMouseEvent) => {
                              (e.target as L.Marker).closePopup();
                            },
                          }}
                        >
                          <Popup>
                            <strong>{m.name}</strong>
                            <br />
                            <small>{m.nearestTown}</small>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                ) : (
                  <div className="space-y-4 h-full overflow-y-auto pr-2">
                    {monasteries.map((monastery) => (
                      <Card
                        key={monastery.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-saffron ${
                          selectedMonastery?.id === monastery.id
                            ? "ring-2 ring-saffron bg-accent/30"
                            : ""
                        }`}
                        onClick={() => setSelectedMonastery(monastery)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-heading text-lg font-semibold text-primary">
                              {monastery.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-saffron text-saffron" />
                              <span className="text-sm font-medium">
                                {monastery.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            {monastery.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {monastery.travelTime}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {monastery.nearestTown}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Details panel */}
          <div>
            {selectedMonastery && (
              <Card className="card-heritage animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading text-xl text-primary">
                      {selectedMonastery.name}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-saffron text-saffron" />
                      <span className="font-semibold">
                        {selectedMonastery.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({selectedMonastery.reviews})
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {selectedMonastery.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Quick Facts
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Established:
                        </span>
                        <span>{selectedMonastery.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Nearest Town:
                        </span>
                        <span>{selectedMonastery.nearestTown}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Travel Time:
                        </span>
                        <span>{selectedMonastery.travelTime}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMonastery.highlights.map((h, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {h}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Special Features
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedMonastery.specialFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-saffron mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-gradient-to-r from-saffron to-saffron-light text-primary hover:shadow-saffron transition-all duration-300">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-saffron text-saffron hover:bg-saffron hover:text-primary"
                    >
                      <Car className="h-4 w-4 mr-2" />
                      Plan Route
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
