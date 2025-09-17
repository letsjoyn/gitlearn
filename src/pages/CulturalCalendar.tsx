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
  Music,
  ArrowLeft,
  CreditCard,
  Download
} from "lucide-react";
import { useMode } from "@/components/ModeToggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CulturalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [bookedEvents, setBookedEvents] = useState<number[]>([]);
  const [bookingEventId, setBookingEventId] = useState<number | null>(null);
  const [userSubmittedEvents, setUserSubmittedEvents] = useState<any[]>([]);
  const { mode } = useMode();

  const defaultEvents = [
    {
      id: 1,
      title: "Losar Festival",
      monastery: "Rumtek Monastery", 
      date: "2025-09-20",
      time: "06:00 AM - 06:00 PM",
      type: "Major Festival",
      description: "Tibetan New Year celebration with traditional ceremonies, cham dances, and community gatherings",
      location: "Main Prayer Hall",
      capacity: 500,
      booked: 234,
      price: mode === 'tourist' ? "₹500" : "Free (Research Access)",
      tags: ["Traditional Dance", "Ceremony", "Cultural"],
      image: "/losar_festival.jpg"
    },
    {
      id: 2,
      title: "Morning Prayer Ritual",
      monastery: "Pemayangtse Monastery",
      date: "2025-09-18",
      time: "05:30 AM - 07:00 AM",
      type: "Daily Ritual",
      description: "Traditional morning prayers and meditation session open to visitors",
      location: "Prayer Hall",
      capacity: 50,
      booked: 12,
      price: "₹100",
      tags: ["Prayer", "Meditation", "Daily"],
      image: "/morning_prayer.jpg"
    },
    {
      id: 3,
      title: "Cham Dance Festival",
      monastery: "Enchey Monastery",
      date: "2025-09-25",
      time: "10:00 AM - 04:00 PM", 
      type: "Cultural Event",
      description: "Sacred mask dance performances depicting Buddhist teachings and local legends",
      location: "Monastery Courtyard",
      capacity: 300,
      booked: 156,
      price: "₹750",
      tags: ["Dance", "Performance", "Cultural Heritage"],
      image: "/cham_dance.jpg"
    },
    {
      id: 4,
      title: "Manuscript Preservation Workshop",
      monastery: "Tashiding Monastery",
      date: "2025-09-28",
      time: "09:00 AM - 05:00 PM",
      type: "Workshop",
      description: "Learn traditional techniques for preserving ancient texts and manuscripts",
      location: "Library & Archive Center",
      capacity: 20,
      booked: 8,
      price: mode === 'researcher' ? "Free" : "₹1,200",
      tags: ["Education", "Conservation", "Heritage"],
      image: "/manuscript.jpg"
    }
  ];

  const upcomingEvents = [...defaultEvents, ...userSubmittedEvents];

  const eventTypes = [
    { id: "all", name: "All Events", count: upcomingEvents.length, color: "default" },
    { id: "festival", name: "Festivals", count: upcomingEvents.filter(e => e.type.includes("Festival")).length, color: "secondary" },
    { id: "ritual", name: "Daily Rituals", count: upcomingEvents.filter(e => e.type.includes("Ritual")).length, color: "outline" },
    { id: "cultural", name: "Cultural Events", count: upcomingEvents.filter(e => e.type.includes("Cultural")).length, color: "secondary" },
    { id: "workshop", name: "Workshops", count: upcomingEvents.filter(e => e.type.includes("Workshop")).length, color: "outline" }
  ];

  const [selectedType, setSelectedType] = useState("all");

  const filteredEvents = selectedDate 
    ? upcomingEvents.filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    : (selectedType === "all" 
      ? upcomingEvents 
      : upcomingEvents.filter(event => 
          event.type.toLowerCase().includes(selectedType) || 
          event.tags.some(tag => tag.toLowerCase().includes(selectedType))
        ));

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmitEvent = () => {
    setShowForm(true);
    scrollToTop(); // Scroll to top when form is opened
    console.log("Submit New Event button clicked. Displaying form.");
  };

  const handleEventNotifications = () => {
    alert("You are now subscribed to event notifications! 🔔");
    console.log("Event Notifications button clicked. User subscribed.");
  };
  
  const handleExportCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sikkim Monastery Calendar//EN
${upcomingEvents.map(event => {
  const startDate = new Date(event.date);
  const startTime = event.time.split(' - ')[0];
  const startDateTime = `${format(startDate, 'yyyyMMdd')}T${startTime.replace(':', '')}00`;
  
  const endDate = new Date(event.date);
  const endTime = event.time.split(' - ')[1];
  const endDateTime = `${format(endDate, 'yyyyMMdd')}T${endTime.replace(':', '')}00`;

  return `BEGIN:VEVENT
UID:${event.id}
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.monastery}, ${event.location}
END:VEVENT`;
}).join('\n')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sikkim_events.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Exporting calendar events as an .ics file.");
    alert("Calendar events have been exported! Check your downloads folder.");
  };

  const handleBookNow = (eventId: number) => {
    if (bookedEvents.includes(eventId)) {
      alert("You have already booked this event! 🎉");
      console.log(`Event ID ${eventId} is already booked.`);
    } else {
      setBookingEventId(eventId);
      scrollToTop(); // Scroll to top when booking page is opened
    }
  };

  const handleConfirmBooking = () => {
    if (bookingEventId !== null) {
      setBookedEvents((prevBooked) => [...prevBooked, bookingEventId]);
      alert("Payment successful! Your ticket is confirmed. ✅");
      setBookingEventId(null);
      scrollToTop(); // Scroll to top when booking is confirmed
    }
  };

  const [formData, setFormData] = useState({
    title: "", monastery: "", eventDate: undefined as Date | undefined, startTime: "", endTime: "", eventType: "", tags: "", description: "", location: "", capacity: 0, touristPrice: "", researcherPrice: "", requiresBooking: false, image: null as File | null, audioGuide: false, virtualPreview: false,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFormSelectChange = (value: string, id: string) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFormDateChange = (date: Date | undefined) => {
    setFormData((prevData) => ({ ...prevData, eventDate: date }));
  };

  const handleFormCheckboxChange = (checked: boolean, id: string) => {
    setFormData((prevData) => ({ ...prevData, [id]: checked }));
  };

  const handleFormImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      id: upcomingEvents.length + 1,
      title: formData.title,
      monastery: formData.monastery,
      date: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : '',
      time: `${formData.startTime} - ${formData.endTime}`,
      type: formData.eventType,
      description: formData.description,
      location: formData.location,
      capacity: formData.capacity,
      booked: 0,
      price: mode === 'researcher' && formData.researcherPrice === "Free (Research Access)" ? formData.researcherPrice : (mode === 'tourist' ? formData.touristPrice : formData.researcherPrice),
      tags: formData.tags.split(',').map(tag => tag.trim()),
      image: formData.image ? URL.createObjectURL(formData.image) : "/api/placeholder/400/200"
    };
    setUserSubmittedEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowForm(false);
    scrollToTop(); // Scroll to top after form submission
    alert("Event submitted for review! It has been added to the calendar.");
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-heritage flex justify-center items-start py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Button variant="ghost" onClick={() => { setShowForm(false); scrollToTop(); }} className="self-start mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Calendar
            </Button>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-6 w-6" />
              Submit a New Cultural Event
            </CardTitle>
            <CardDescription>
              Provide details for an event to be added to the official monastery calendar. Submissions will be reviewed by an administrator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" placeholder="e.g., Losar Festival" value={formData.title} onChange={handleFormChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monastery">Monastery</Label>
                    <Input id="monastery" placeholder="e.g., Rumtek Monastery" value={formData.monastery} onChange={handleFormChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Provide a detailed description of the event..." value={formData.description} onChange={handleFormChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select onValueChange={(value) => handleFormSelectChange(value, 'eventType')}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Major Festival">Major Festival</SelectItem>
                        <SelectItem value="Daily Ritual">Daily Ritual</SelectItem>
                        <SelectItem value="Cultural Event">Cultural Event</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Special Ceremony">Special Ceremony</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input id="tags" placeholder="e.g., Prayer, Meditation, Ceremony" value={formData.tags} onChange={handleFormChange} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Date & Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.eventDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.eventDate ? format(formData.eventDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.eventDate}
                            onSelect={handleFormDateChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input id="startTime" type="time" value={formData.startTime} onChange={handleFormChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input id="endTime" type="time" value={formData.endTime} onChange={handleFormChange} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Location & Participants</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., Main Courtyard" value={formData.location} onChange={handleFormChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Participant Capacity</Label>
                      <Input id="capacity" type="number" min="1" placeholder="e.g., 500" value={formData.capacity} onChange={handleFormChange} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pricing & Accessibility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="touristPrice">Tourist Price</Label>
                      <Input id="touristPrice" placeholder="e.g., ₹500" value={formData.touristPrice} onChange={handleFormChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="researcherPrice">Researcher Price</Label>
                      <Input id="researcherPrice" placeholder="e.g., Free (Research Access)" value={formData.researcherPrice} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="requiresBooking" checked={formData.requiresBooking} onCheckedChange={(checked) => handleFormCheckboxChange(checked as boolean, 'requiresBooking')} />
                    <Label htmlFor="requiresBooking">
                      Requires pre-booking or registration
                    </Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Media & Enhancements</h3>
                  <div className="space-y-2">
                    <Label htmlFor="image">Event Image</Label>
                    <Input id="image" type="file" onChange={handleFormImageChange} />
                    <p className="text-sm text-muted-foreground">Upload a high-quality photo of the event or location.</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="audioGuide" checked={formData.audioGuide} onCheckedChange={(checked) => handleFormCheckboxChange(checked as boolean, 'audioGuide')} />
                      <Label htmlFor="audioGuide">
                        Offer Audio Guide
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="virtualPreview" checked={formData.virtualPreview} onCheckedChange={(checked) => handleFormCheckboxChange(checked as boolean, 'virtualPreview')} />
                      <Label htmlFor="virtualPreview">
                        Provide Virtual Preview
                      </Label>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Submit Event for Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    }
  
    if (bookingEventId !== null) {
      const eventToBook = upcomingEvents.find(event => event.id === bookingEventId);
      if (!eventToBook) return null;
  
      return (
        <div className="min-h-screen bg-gradient-heritage flex justify-center items-start py-8">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <Button variant="ghost" onClick={() => { setBookingEventId(null); scrollToTop(); }} className="self-start mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Events
              </Button>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-6 w-6" />
                Book Your Ticket for {eventToBook.title}
              </CardTitle>
              <CardDescription>
                Please enter your details and complete the payment to secure your spot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span>{eventToBook.price}</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required />
                </div>
  
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="h-5 w-5" /> Payment Details
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                </div>
  
                <Button className="w-full mt-6" onClick={handleConfirmBooking}>
                  Pay {eventToBook.price} and Book
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gradient-heritage">
        <div className="container mx-auto px-4 py-8">
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
                      <Button size="sm" className="w-full justify-start" onClick={handleSubmitEvent}>
                        <Plus className="h-4 w-4 mr-2" />
                        Submit Event
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start" onClick={handleEventNotifications}>
                        <Bell className="h-4 w-4 mr-2" />
                        Event Notifications
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start" onClick={handleExportCalendar}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Calendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
  
            <div className="lg:col-span-2">
              <Tabs value={selectedType} onValueChange={setSelectedType} className="space-y-6">
                {!selectedDate && (
                  <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto">
                    {eventTypes.map((type) => (
                      <TabsTrigger key={type.id} value={type.id} className="flex flex-col p-3">
                        <span className="text-xs font-medium">{type.name}</span>
                        <Badge variant="outline" className="text-xs mt-1">{type.count}</Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                )}
  
                <div className="space-y-6">
                  {selectedDate && (
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-heading font-bold text-primary">Events on {format(selectedDate, 'PPP')}</h3>
                      <Button variant="ghost" onClick={() => setSelectedDate(undefined)}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Show All Events
                      </Button>
                    </div>
                  )}
                  
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
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
                                <Button className="flex-1" onClick={() => handleBookNow(event.id)}>
                                  <Ticket className="h-4 w-4 mr-2" />
                                  {bookedEvents.includes(event.id) ? "Booked!" : (mode === 'researcher' && event.price === "Free (Research Access)" ? "Register" : "Book Now")}
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
                    ))
                  ) : (
                    <Card className="p-6 text-center text-muted-foreground">
                      No events scheduled for {selectedDate ? format(selectedDate, 'PPP') : "that day"}.
                    </Card>
                  )}
                </div>
              </Tabs>
  
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
                  <Button className="w-full md:w-auto" onClick={handleSubmitEvent}>
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
