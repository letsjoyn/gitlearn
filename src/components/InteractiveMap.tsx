"use client";

import React, { useEffect, useState } from "react";
import L, { LatLngTuple, PointTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

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
    id: "ghoom-monastery",
    name: "Ghum Monastery",
    location: "Darjeeling",
    coordinates: { lat: 26.9934, lng: 88.275 },
    description: "Home to a 15-foot high statue of Maitreya Buddha",
    highlights: ["Maitreya Buddha", "Panoramic views"],
    travelTime: "20 mins from Darjeeling",
    nearestTown: "Darjeeling",
    rating: 4.7,
    reviews: 210,
    established: "1875",
    specialFeatures: ["Rare Buddhist manuscripts", "Thangka paintings"],
  },
  {
    id: "phalut-monastery",
    name: "Phalut Monastery",
    location: "Phalut",
    coordinates: { lat: 27.1352, lng: 88.0051 },
    description: "A small, remote monastery on the Singalila ridge.",
    highlights: ["Remote location", "Himalayan trek point"],
    travelTime: "Trek from Sandakphu",
    nearestTown: "Sandakphu",
    rating: 4.2,
    reviews: 55,
    established: "1900s",
    specialFeatures: ["Mountain wilderness", "Meditation site"],
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
    id: "buddha-park-ravangla",
    name: "Buddha Park (Tathagata Tsal)",
    location: "Ravangla",
    coordinates: { lat: 27.2797, lng: 88.3638 },
    description: "A massive Buddha statue complex surrounded by a park.",
    highlights: ["Giant Buddha statue", "Park and gardens"],
    travelTime: "15 mins from Ravangla",
    nearestTown: "Ravangla",
    rating: 4.8,
    reviews: 500,
    established: "2006",
    specialFeatures: ["Inaugurated by Dalai Lama", "Scenic landscape"],
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
    id: "drolma-phodrang-monastery",
    name: "Drolma Phodrang Monastery",
    location: "Yumthang Valley",
    coordinates: { lat: 27.6166, lng: 88.7500 },
    description: "A beautiful monastery in the scenic Yumthang Valley.",
    highlights: ["Scenic valley", "Rhododendron forests"],
    travelTime: "2 hours from Lachung",
    nearestTown: "Lachung",
    rating: 4.6,
    reviews: 45,
    established: "19th Century",
    specialFeatures: ["Seasonal festivals", "Floral surroundings"],
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
    id: "siddheshwar-dham",
    name: "Siddheshwar Dham (Char Dham)",
    location: "Solophok",
    coordinates: { lat: 27.1852, lng: 88.3582 },
    description: "A large pilgrimage complex with replicas of four Dhams of India.",
    highlights: ["Char Dham replicas", "Large Shiva statue"],
    travelTime: "30 mins from Namchi",
    nearestTown: "Namchi",
    rating: 4.8,
    reviews: 300,
    established: "2011",
    specialFeatures: ["Pilgrimage site", "Beautiful views"],
  },
  {
    id: "samdruptse-hill",
    name: "Samdruptse Hill",
    location: "Namchi",
    coordinates: { lat: 27.1850, lng: 88.3580 },
    description: "Features a massive 45-meter high statue of Guru Padmasambhava.",
    highlights: ["Guru Padmasambhava statue", "Panoramic views"],
    travelTime: "25 mins from Namchi",
    nearestTown: "Namchi",
    rating: 4.7,
    reviews: 280,
    established: "2004",
    specialFeatures: ["Spiritual center", "Scenic location"],
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
    id: "namgyal-institute",
    name: "Namgyal Institute of Tibetology",
    location: "Gangtok",
    coordinates: { lat: 27.3285, lng: 88.6145 },
    description: "A center for the study of Tibetology and Buddhist culture.",
    highlights: ["Research center", "Rare manuscripts"],
    travelTime: "10 mins from Gangtok",
    nearestTown: "Gangtok",
    rating: 4.7,
    reviews: 95,
    established: "1958",
    specialFeatures: ["Museum", "Library"],
  },
  {
    id: "tsuglakhang-palace",
    name: "Tsuglakhang Palace",
    location: "Gangtok",
    coordinates: { lat: 27.3300, lng: 88.6128 },
    description: "The royal chapel of the former rulers of Sikkim.",
    highlights: ["Royal chapel", "Historical site"],
    travelTime: "10 mins from Gangtok",
    nearestTown: "Gangtok",
    rating: 4.4,
    reviews: 65,
    established: "19th Century",
    specialFeatures: ["Traditional architecture", "Peaceful surroundings"],
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
    id: "baba-harbhajan-mandir",
    name: "Baba Harbhajan Mandir",
    location: "East Sikkim",
    coordinates: { lat: 27.3550, lng: 88.8500 },
    description: "A sacred site and temple dedicated to an Indian army soldier.",
    highlights: ["Army tribute", "Patriotic site"],
    travelTime: "3 hours from Gangtok",
    nearestTown: "Gangtok",
    rating: 4.9,
    reviews: 500,
    established: "2003",
    specialFeatures: ["Military history", "High-altitude pilgrimage"],
  },
  {
    id: "nathang-valley",
    name: "Nathang Valley Monastery",
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
    id: "gurudongmar-lake-temple",
    name: "Gurudongmar Lake Temple",
    location: "Gurudongmar Lake",
    coordinates: { lat: 28.0000, lng: 88.6850 },
    description: "A sacred lake and temple for both Buddhists and Sikhs.",
    highlights: ["Sacred lake", "High-altitude"],
    travelTime: "3 hours from Lachen",
    nearestTown: "Lachen",
    rating: 4.9,
    reviews: 400,
    established: "15th Century",
    specialFeatures: ["Holy site", "Stunning natural beauty"],
  },
  {
    id: "chungthang-gurudwara",
    name: "Chungthang Gurudwara",
    location: "Chungthang",
    coordinates: { lat: 27.6085, lng: 88.6475 },
    description: "A historical Gurudwara believed to be visited by Guru Nanak.",
    highlights: ["Historical significance", "Sikh pilgrimage"],
    travelTime: "Within Chungthang",
    nearestTown: "Chungthang",
    rating: 4.7,
    reviews: 150,
    established: "15th Century",
    specialFeatures: ["Holy spring", "Religious harmony"],
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
];

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

  const sikkimCenter: LatLngTuple = [27.5, 88.5];

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
                      zoom={8}
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
