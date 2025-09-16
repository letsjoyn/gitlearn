"use client";

import React, { useState } from "react";

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
    id: "rumtek",
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
    id: "pemayangtse",
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
    id: "tashiding",
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
    id: "enchey",
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
    id: "ralang",
    name: "Ralang Monastery",
    location: "Ralang area",
    coordinates: { lat: 27.1, lng: 88.3667 },
    description: "Vibrant monastery complex with modern and traditional areas.",
    highlights: ["Festivals", "Local crafts"],
    travelTime: "2.5 hours from Gangtok",
    nearestTown: "Ravangla",
    rating: 4.4,
    reviews: 76,
    established: "1975 (new), 1768 (old)",
    specialFeatures: ["Dual monastery complex", "Kagyupa tradition"],
  },
];

// ----------------------
// Main component
// ----------------------
const InteractiveMap: React.FC = () => {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

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
            <Card className="card-heritage">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-2xl text-primary flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-saffron" />
                    Monastery Locations
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      Grid View
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

              <CardContent>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {monastery.travelTime}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {monastery.nearestTown}
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-muted-foreground">
                            <span>Coordinates: {monastery.coordinates.lat}, {monastery.coordinates.lng}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
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
