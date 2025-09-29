"use client";

import React, { useEffect, useState } from "react";
import L, { LatLngTuple, PointTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";

// Fix default marker icons for Vite/Next builds
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// UI imports
import { MapPin, Clock, Car, Star, Info, Navigation, List, Mountain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ----------------------
// Data model + sample data (keeping your full data array)
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
  // ... (Your existing monasteries data)
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
// GeoJSON Data for Sikkim Border (keeping your data)
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
      width:40px;height:40px;
      display:flex;align-items:center;justify-content:center;
      border-radius:12px; /* Slightly larger border-radius */
      background:linear-gradient(135deg,#f59e0b,#f97316); /* Saffron/Orange gradient */
      box-shadow:0 6px 18px rgba(0,0,0,0.5); /* Stronger shadow */
      border:3px solid rgba(255,255,255,0.9); /* Thicker white border */
      transform:translateY(-8px); /* Lifted slightly more */
    ">
      <span style="font-size:20px;line-height:20px; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);">🏯</span>
    </div>
  `,
  className: "monastery-div-icon",
  iconSize: [40, 40] as PointTuple, // Increased size
  iconAnchor: [20, 40] as PointTuple,
  popupAnchor: [0, -40] as PointTuple,
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
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(monasteries[0]);
  const [viewMode, setViewMode] = useState<"list" | "map">("map");

  const sikkimCenter: LatLngTuple = [27.5, 88.5]; 

  return (
    // FIX: Using a standard section with padding ensures it takes up its space 
    // and correctly scrolls *under* any fixed header you have.
    // The classes below replicate the look from VirtualTours/About component.
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Sacred Map of Sikkim
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the spiritual landscape, click on a marker for details, or browse the list view.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Map/List View Panel (Glass Card) */}
          <div className="lg:col-span-2">
            <Card 
                className="group h-[600px] flex flex-col bg-white/70 backdrop-blur-lg border-0 shadow-2xl animate-fadeIn"
                style={{ borderRadius: "1.5rem" }}
            >
              <CardHeader className="shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-2xl text-primary flex items-center">
                    {viewMode === "map" ? <MapPin className="h-6 w-6 mr-3 text-saffron fill-saffron" /> : <List className="h-6 w-6 mr-3 text-saffron" />}
                    {viewMode === "map" ? "Monastery Map View" : "Monastery List View"}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === "map" ? "default" : "outline"}
                      size="sm"
                      className={viewMode === "map" ? "bg-primary hover:bg-primary/90" : "border-primary text-primary"}
                      onClick={() => setViewMode("map")}
                    >
                      Map
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      className={viewMode === "list" ? "bg-primary hover:bg-primary/90" : "border-primary text-primary"}
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
                {viewMode === "map" ? (
                  <div className="h-full w-full rounded-xl overflow-hidden shadow-xl border border-white/50">
                    <MapContainer
                      center={sikkimCenter}
                      zoom={9}
                      className="h-full w-full"
                      scrollWheelZoom
                      key="map-container-key" // Key helps remounting if issues occur
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
                          color: '#000000', // Black for a clear border
                          weight: 3,
                          opacity: 0.7,
                          fillColor: '#808080', // Subtle gray fill for the state area
                          fillOpacity: 0.1,
                        })}
                      />

                      {monasteries.map((m) => (
                        <Marker
                          key={m.id}
                          position={[m.coordinates.lat, m.coordinates.lng]}
                          icon={monasteryIcon}
                          eventHandlers={{
                            click: () => setSelectedMonastery(m),
                            // Keeping popup for visual confirmation on hover
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
                  // List View (Glass Card Style)
                  <div className="space-y-4 h-full overflow-y-auto pr-2 custom-scrollbar">
                    {monasteries.map((monastery) => (
                      <Card
                        key={monastery.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-white/80 backdrop-blur-sm ${
                          selectedMonastery?.id === monastery.id
                            ? "ring-2 ring-primary/80 bg-primary/10 shadow-lg"
                            : "shadow-md"
                        }`}
                        style={{ borderRadius: "1rem" }}
                        onClick={() => {
                          setSelectedMonastery(monastery);
                          // Optionally, scroll to top of details panel on select
                          document.getElementById('details-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-display text-lg font-semibold text-primary">
                              {monastery.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-saffron text-saffron" />
                              <span className="text-sm font-medium">
                                {monastery.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">
                            {monastery.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-blue-500" />
                              {monastery.travelTime}
                            </div>
                            <div className="flex items-center">
                              <Mountain className="h-3 w-3 mr-1 text-green-500" />
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

          {/* Details Panel (Glass Card) */}
          <div id="details-panel">
            {selectedMonastery ? (
              <Card 
                className="group h-full bg-white/70 backdrop-blur-lg border-0 shadow-2xl animate-fadeIn"
                style={{ borderRadius: "1.5rem" }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display text-xl text-primary">
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
                  <p className="text-gray-700">
                    {selectedMonastery.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-2 text-primary" />
                      Quick Facts
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Established:</span>
                        <span className="font-medium text-gray-800">{selectedMonastery.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nearest Town:</span>
                        <span className="font-medium text-gray-800">{selectedMonastery.nearestTown}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Travel Time:</span>
                        <span className="font-medium text-gray-800">{selectedMonastery.travelTime}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMonastery.highlights.map((h, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-primary/10 text-primary">
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
                        <li key={i} className="flex items-start text-gray-700">
                          <span className="text-saffron mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <Button className="flex-1 bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-md">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-saffron text-saffron hover:bg-saffron/10 hover:border-saffron/80"
                    >
                      <Car className="h-4 w-4 mr-2" />
                      Virtual Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
                <div className="h-full flex items-center justify-center p-10 text-center bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl">
                    <p className="text-lg text-muted-foreground">Select a monastery from the map or list to view details.</p>
                </div>
            )}
          </div>
        </div>
      </div>
       {/* Custom style block for consistency */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.7s both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
        /* Tailwind classes assumed: font-display (bold), text-primary, text-saffron */
        /* Custom Scrollbar for list view */
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c3cfe2; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f5f7fa; }
      `}</style>
    </section>
  );
};

export default InteractiveMap;
