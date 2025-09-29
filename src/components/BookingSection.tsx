import { useState, useEffect } from "react";
import { Calendar, Clock, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const packages = [
  {
    id: "spiritual-weekend",
    title: "Spiritual Weekend",
    duration: "2 Days",
    price: "₹2500",
    originalPrice: "₹4000",
    rating: 4.9,
    reviews: 127,
    highlight: "Most Popular",
    description: "Perfect introduction to Sikkim's sacred heritage",
    includes: [
      "Visit 3 major monasteries",
      "Attend a traditional ritual",
      "Guided meditation session",
      "Traditional lunch with monks",
      "Cultural storytelling evening",
    ],
    monasteries: ["Rumtek", "Enchey", "Do Drul Chorten"],
  },
  {
    id: "heritage-explorer",
    title: "Heritage Explorer",
    duration: "5 Days",
    price: "₹6000",
    originalPrice: "₹8000",
    rating: 4.8,
    reviews: 89,
    highlight: "Best Value",
    description: "Comprehensive cultural immersion experience",
    includes: [
      "8 monasteries including remote sites",
      "Traditional craft workshops",
      "Himalayan cuisine experiences",
      "Local village homestay (1 night)",
      "Photography masterclass",
    ],
    monasteries: [
      "Rumtek",
      "Pemayangtse",
      "Tashiding",
      "Enchey",
      "Ralang",
      "Khecheopalri",
      "Dubdi",
      "Phensang",
    ],
  },
  {
    id: "grand-circuit",
    title: "The Grand Circuit",
    duration: "10 Days",
    price: "₹10000",
    originalPrice: "₹12500",
    rating: 5.0,
    reviews: 43,
    highlight: "Premium Experience",
    description: "Ultimate spiritual and cultural journey",
    includes: [
      "All major monasteries & hidden gems",
      "Local village homestays (3 nights)",
      "Himalayan trekking routes",
      "Private spiritual guide",
      "Exclusive monastery ceremonies",
      "Traditional healing sessions",
    ],
    monasteries: [
      "Complete monastery circuit",
      "Remote sacred sites",
      "Ancient caves",
      "Meditation retreats",
    ],
  },
];

const BookingSection = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [travelers, setTravelers] = useState<number>(1);
  const [travelerDetails, setTravelerDetails] = useState<
    { name: string; age: string; email: string; phone: string }[]
  >([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);
  const tripDays = selectedPkg ? selectedPkg.duration.split(" ")[0] : "1";

  useEffect(() => {
    setTravelerDetails(
      Array.from({ length: travelers }, () => ({
        name: "",
        age: "",
        email: "",
        phone: "",
      }))
    );
  }, [travelers]);

  const handleTravelerChange = (
    index: number,
    field: keyof (typeof travelerDetails)[0],
    value: string
  ) => {
    const updatedDetails = [...travelerDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };
    setTravelerDetails(updatedDetails);
  };

  const handleBooking = () => {
    setOpen(true);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={`card-monastery cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                selectedPackage === pkg.id
                  ? "ring-2 ring-saffron shadow-saffron"
                  : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <CardHeader className="relative">
                {pkg.highlight && (
                  <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md z-10">
                    {pkg.highlight}
                  </Badge>
                )}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <CardTitle className="font-heading text-2xl md:text-3xl text-primary mb-2">
                      {pkg.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{pkg.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({pkg.reviews})
                      </span>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl md:text-4xl font-bold font-heading text-primary">
                        {pkg.price}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{pkg.description}</p>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Monasteries Included
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.monasteries.map((monastery, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {monastery}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <details className="group">
                    <summary className="font-semibold text-primary mb-2 cursor-pointer list-none flex items-center justify-between">
                      Experience Includes
                      <span className="text-xs text-muted-foreground group-open:hidden">
                        Click to expand
                      </span>
                      <span className="text-xs text-muted-foreground hidden group-open:inline">
                        Click to collapse
                      </span>
                    </summary>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Interface */}
        {selectedPackage && (
          <Card className="card-heritage animate-fade-in mb-12">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-primary flex items-center">
                <Calendar className="h-6 w-6 mr-3 text-yellow-500" />
                Complete Your Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Select Dates
                  </label>
                  <DateRange
                    editableDateInputs
                    onChange={(item: RangeKeyDict) => {
                      const start = item.selection.startDate as Date;
                      const end = new Date(start);
                      end.setDate(start.getDate() + Number(tripDays) - 1);
                      setDateRange([
                        {
                          ...item.selection,
                          startDate: start,
                          endDate: end,
                          key: "selection",
                        },
                      ]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    minDate={new Date()}
                    maxDate={new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    )}
                    rangeColors={["#FACC15"]}
                    months={1}
                    direction="horizontal"
                    showDateDisplay
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Travelers
                  </label>
                  <select
                    className="w-full p-3 border border-border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                  >
                    <option value={1}>1 Traveler</option>
                    <option value={2}>2 Travelers</option>
                    <option value={3}>3 Travelers</option>
                    <option value={4}>4 Travelers</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-primary font-semibold text-lg rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    onClick={handleBooking}
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              {/* Traveler Details */}
              <div className="mt-8 space-y-6">
                {travelerDetails.map((traveler, i) => (
                  <div key={i} className="p-4 border rounded-xl bg-muted shadow-sm">
                    <h4 className="font-semibold text-primary mb-3">
                      Traveler {i + 1}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-2 border border-border rounded"
                        value={traveler.name}
                        onChange={(e) =>
                          handleTravelerChange(i, "name", e.target.value)
                        }
                      />
                      <input
                        type="number"
                        placeholder="Age"
                        className="w-full p-2 border border-border rounded"
                        value={traveler.age}
                        onChange={(e) =>
                          handleTravelerChange(i, "age", e.target.value)
                        }
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border border-border rounded"
                        value={traveler.email}
                        onChange={(e) =>
                          handleTravelerChange(i, "email", e.target.value)
                        }
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full p-2 border border-border rounded"
                        value={traveler.phone}
                        onChange={(e) =>
                          handleTravelerChange(i, "phone", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Buttons now inside page */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <Button
            onClick={() => (window.location.href = "/customplan")}
            className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-gray-900 font-semibold rounded-xl px-8 py-3 text-sm shadow-md hover:shadow-lg transition-all duration-300"
          >
          Customize Your Travel Plan
          </Button>
          <Button
            onClick={() => {
              const aboutSection = document.getElementById("about-section");
              if (aboutSection)
                aboutSection.scrollIntoView({ behavior: "smooth" });
              else window.location.href = "/#about";
            }}
            variant="outline"
            className="border-yellow-400 text-yellow-600 hover:bg-yellow-50 rounded-xl px-8 py-3 text-sm"
          >
          Contact Travel Agents
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {confirmed ? "Booking Confirmed 🎉" : "Booking Details"}
            </DialogTitle>
            <DialogDescription>
              {confirmed
                ? "Your booking has been successfully confirmed."
                : "Please review your booking details before confirming:"}
            </DialogDescription>
          </DialogHeader>

          {!confirmed && selectedPkg && (
            <div className="space-y-2 text-gray-800">
              <p>
                <strong>Package:</strong> {selectedPkg.title}
              </p>
              <p>
                <strong>Travelers:</strong> {travelers}
              </p>
              <p>
                <strong>Dates:</strong>{" "}
                {dateRange[0].startDate.toDateString()} -{" "}
                {dateRange[0].endDate.toDateString()}
              </p>
              <div>
                <strong>Traveler Details:</strong>
                <ul className="list-disc ml-5">
                  {travelerDetails.map((t, i) => (
                    <li key={i}>
                      {t.name || "Unnamed"}, {t.age || "Age N/A"},{" "}
                      {t.email || "No Email"}, {t.phone || "No Phone"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            {confirmed ? (
              <Button onClick={() => setOpen(false)}>Close</Button>
            ) : (
              <>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BookingSection;
