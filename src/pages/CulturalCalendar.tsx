import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Bell,
  Plus,
  Ticket,
  Camera,
  Music
} from "lucide-react";
import { useMode } from "@/components/ModeToggle";

const CulturalCalendar = () => {
  const { mode } = useMode();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const upcomingEvents = [
    {
      id: 1,
      title: "Losar Festival",
      monastery: "Rumtek Monastery", 
      date: "2024-02-10",
      time: "06:00 AM - 06:00 PM",
      type: "Major Festival",
      description: "Tibetan New Year celebration with traditional ceremonies, cham dances, and community gatherings",
      location: "Main Prayer Hall",
      capacity: 500,
      booked: 234,
      price: mode === 'tourist' ? "₹500" : "Free (Research Access)",
      tags: ["Traditional Dance", "Ceremony", "Cultural"],
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "Morning Prayer Ritual",
      monastery: "Pemayangtse Monastery",
      date: "2024-01-25", 
      time: "05:30 AM - 07:00 AM",
      type: "Daily Ritual",
      description: "Traditional morning prayers and meditation session open to visitors",
      location: "Prayer Hall",
      capacity: 50,
      booked: 12,
      price: "₹100",
      tags: ["Prayer", "Meditation", "Daily"],
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      title: "Cham Dance Festival",
      monastery: "Enchey Monastery",
      date: "2024-02-15",
      time: "10:00 AM - 04:00 PM", 
      type: "Cultural Event",
      description: "Sacred mask dance performances depicting Buddhist teachings and local legends",
      location: "Monastery Courtyard",
      capacity: 300,
      booked: 156,
      price: "₹750",
      tags: ["Dance", "Performance", "Cultural Heritage"],
      image: "/api/placeholder/400/200"
    },
    {
      id: 4,
      title: "Manuscript Preservation Workshop",
      monastery: "Tashiding Monastery",
      date: "2024-01-30",
      time: "09:00 AM - 05:00 PM",
      type: "Workshop",
      description: "Learn traditional techniques for preserving ancient texts and manuscripts",
      location: "Library & Archive Center",
      capacity: 20,
      booked: 8,
      price: mode === 'researcher' ? "Free" : "₹1,200",
      tags: ["Education", "Conservation", "Heritage"],
      image: "/api/placeholder/400/200"
    }
  ];

  const eventTypes = [
    { id: "all", name: "All Events", count: upcomingEvents.length, color: "default" },
    { id: "festival", name: "Festivals", count: 1, color: "secondary" },
    { id: "ritual", name: "Daily Rituals", count: 1, color: "outline" },
    { id: "cultural", name: "Cultural Events", count: 1, color: "secondary" },
    { id: "workshop", name: "Workshops", count: 1, color: "outline" }
  ];

  const [selectedType, setSelectedType] = useState("all");

  const filteredEvents = selectedType === "all" 
    ? upcomingEvents 
    : upcomingEvents.filter(event => 
        event.type.toLowerCase().includes(selectedType) || 
        event.tags.some(tag => tag.toLowerCase().includes(selectedType))
      );

  return (
    <div className="min-h-screen bg-gradient-heritage">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sacred festivals, daily rituals, and cultural events across Sikkim's monasteries
          </p>
          <Badge variant="secondary" className="mt-4">
            {mode === 'tourist' ? 'Tourist Experience' : 'Research Access'} • {upcomingEvents.length} Upcoming Events
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Event Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                
                <div className="mt-6 space-y-2">
                  <h4 className="font-semibold text-sm">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Event
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Event Notifications
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Export Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={selectedType} onValueChange={setSelectedType} className="space-y-6">
              {/* Event Type Filters */}
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto">
                {eventTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id} className="flex flex-col p-3">
                    <span className="text-xs font-medium">{type.name}</span>
                    <Badge variant="outline" className="text-xs mt-1">{type.count}</Badge>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Events List */}
              <div className="space-y-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="card-monastery overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardContent className="p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary">{event.type}</Badge>
                            {event.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <h3 className="text-xl font-heading font-bold text-primary mb-2">
                            {event.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            {event.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{event.monastery}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{event.booked}/{event.capacity} participants</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold">{event.price}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button className="flex-1">
                              <Ticket className="h-4 w-4 mr-2" />
                              {mode === 'researcher' && event.price === "Free" ? "Register" : "Book Now"}
                            </Button>
                            <Button variant="outline">
                              <Camera className="h-4 w-4 mr-2" />
                              Virtual Preview
                            </Button>
                            {event.type.includes("Festival") && (
                              <Button variant="outline">
                                <Music className="h-4 w-4 mr-2" />
                                Audio Guide
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Tabs>

            {/* Community Submission Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-6 w-6" />
                  Submit Community Event
                </CardTitle>
                <CardDescription>
                  Know about an upcoming ceremony or cultural event? Help us keep the calendar complete by submitting event details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full md:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit New Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalCalendar;