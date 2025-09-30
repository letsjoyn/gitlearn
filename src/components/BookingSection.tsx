import React, { useState, useEffect, useRef, useMemo } from "react";
import { Calendar, Clock, Star, MapPin, CheckCircle } from "lucide-react";
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

/* ----------------------- Package Cards Data ----------------------- */
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

/* ----------------------- Embedded Custom Plan ----------------------- */
/* Data sources */
const monasteryOptions = [
  { id: "rumtek", name: "Rumtek", price: 1200 },
  { id: "enchey", name: "Enchey", price: 1000 },
  { id: "dodrul", name: "Do Drul Chorten", price: 900 },
  { id: "pemayangtse", name: "Pemayangtse", price: 1500 },
  { id: "tashiding", name: "Tashiding", price: 1300 },
  { id: "ralang", name: "Ralang", price: 1400 },
  { id: "khecheopalri", name: "Khecheopalri", price: 1600 },
  { id: "dubdi", name: "Dubdi", price: 1100 },
  { id: "phensang", name: "Phensang", price: 1000 },
  { id: "lingdum", name: "Lingdum", price: 1000 },
  { id: "sanga", name: "Sanga Choeling", price: 950 },
  { id: "simik", name: "Simik Monastery", price: 800 },
  { id: "tolung", name: "Tolong", price: 1200 },
  { id: "zarong", name: "Zarong", price: 1300 },
  { id: "mellidara", name: "Mellidara", price: 850 },
  { id: "rinchenpong", name: "Rinchenpong", price: 1000 },
  { id: "tendong", name: "Tendong", price: 950 },
  { id: "yuksom", name: "Yuksom Dubdi", price: 1100 },
  { id: "tholung", name: "Tholung", price: 1250 },
  { id: "sang", name: "Sang Monastery", price: 1050 },
];

const guideOptions = [
  { id: "none", name: "No Guide", price: 0 },
  { id: "native", name: "Native Guide", price: 800 },
  { id: "expert", name: "Expert Guide", price: 1500 },
  { id: "specialist", name: "Specialist Guide", price: 2500 },
];

const accommodationOptions = [
  { id: "guesthouse", name: "Local Guesthouse", pricePerNight: 1200, desc: "Comfortable, local experience" },
  { id: "3star", name: "3★ Hotel", pricePerNight: 2500, desc: "Comfort with essentials" },
  { id: "4star", name: "4★ Boutique", pricePerNight: 4200, desc: "Premium stays with breakfast" },
  { id: "homestay", name: "Village Homestay", pricePerNight: 900, desc: "Cultural immersion" },
];

/* Helpers */
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const toISO = (d: Date) => d.toISOString().slice(0, 10);

type CustomPlanProps = {
  initialTravelers?: number;
  initialStartDate?: Date;
  initialEndDate?: Date;
};

function CustomPlan({
  initialTravelers = 1,
  initialStartDate,
  initialEndDate,
}: CustomPlanProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedMonasteries, setSelectedMonasteries] = useState<string[]>([]);
  const [monasterySearch, setMonasterySearch] = useState("");

  /* Prefill with values from BookingSection if provided */
  const seededStart = initialStartDate ?? new Date();
  const seededEnd =
    initialEndDate ??
    new Date(seededStart.getTime() + 24 * 60 * 60 * 1000);

  const [travelers, setTravelers] = useState<number>(initialTravelers);
  const [startDate, setStartDate] = useState<string>(toISO(seededStart));
  const [endDate, setEndDate] = useState<string>(toISO(seededEnd));

  const [selectedGuide, setSelectedGuide] = useState<string>("none");
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>("");
  const [accomNights, setAccomNights] = useState<number>(1);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  /* Derived date logic */
  useEffect(() => {
    const sd = new Date(startDate + "T00:00:00");
    let ed = new Date(endDate + "T00:00:00");
    if (ed.getTime() < sd.getTime()) {
      ed = new Date(sd.getTime());
      setEndDate(toISO(ed));
    }
    const diff = Math.ceil((ed.getTime() - sd.getTime()) / (1000 * 60 * 60 * 24));
    setAccomNights(Math.max(diff + 1, 1));
  }, [startDate, endDate]);

  /* Filters & pricing */
  const filteredMonasteries = useMemo(() => {
    return monasteryOptions.filter((m) =>
      m.name.toLowerCase().includes(monasterySearch.toLowerCase())
    );
  }, [monasterySearch]);

  const monasteryPricePerTraveler = useMemo(() => {
    return selectedMonasteries.reduce((acc, id) => {
      const m = monasteryOptions.find((x) => x.id === id);
      return acc + (m ? m.price : 0);
    }, 0);
  }, [selectedMonasteries]);

  const accommodationPerNight = useMemo(() => {
    const a = accommodationOptions.find((x) => x.id === selectedAccommodation);
    return a ? a.pricePerNight : 0;
  }, [selectedAccommodation]);

  const guidePrice = useMemo(() => {
    return guideOptions.find((g) => g.id === selectedGuide)?.price || 0;
  }, [selectedGuide]);

  const tripDays = useMemo(() => {
    const sd = new Date(startDate + "T00:00:00");
    const ed = new Date(endDate + "T00:00:00");
    const diff = Math.ceil((ed.getTime() - sd.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff + 1);
  }, [startDate, endDate]);

  const subtotal = useMemo(() => {
    const monasteriesTotal = monasteryPricePerTraveler * travelers;
    const accomTotal = (accommodationPerNight || 0) * accomNights * travelers;
    const guideTotal = (guidePrice || 0) * tripDays;
    return monasteriesTotal + accomTotal + guideTotal;
  }, [monasteryPricePerTraveler, travelers, accommodationPerNight, accomNights, guidePrice, tripDays]);

  const taxes = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const grandTotal = subtotal > 0 ? subtotal + taxes : 0;

  /* UI helpers */
  const toggleMonastery = (id: string) => {
    setSelectedMonasteries((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const next = () => setStep((s) => Math.min(5, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleConfirm = () => {
    setOpenConfirm(true);
    setTimeout(() => {
      setOpenConfirm(false);
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 2200);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Left Section */}
        <div className="lg:col-span-8">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-primary">
              Design Your Custom Monastery Journey
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Build the journey step-by-step. Pick monasteries, guides, and stays.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    i <= step ? "bg-saffron text-white" : "bg-white border"
                  }`}
                >
                  {i}
                </div>
                {i < 5 && (
                  <div
                    className={`w-14 h-1 ${i < step ? "bg-saffron" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card>
            <CardContent>
              {/* STEP 1 — Monasteries */}
              {step === 1 && (
                <section>
                  <h3 className="text-xl font-semibold mb-3">
                    1. Choose Monasteries
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Search and select monasteries to include in the journey.
                  </p>
                  <input
                    type="text"
                    placeholder="Search monasteries..."
                    value={monasterySearch}
                    onChange={(e) => setMonasterySearch(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {filteredMonasteries.map((m) => (
                      <label
                        key={m.id}
                        className={`p-3 rounded-lg border flex justify-between items-center cursor-pointer ${
                          selectedMonasteries.includes(m.id)
                            ? "bg-saffron/10 border-saffron"
                            : "bg-white"
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{m.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Spiritual site & cultural visit
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{fmt(m.price)}</div>
                          <input
                            type="checkbox"
                            checked={selectedMonasteries.includes(m.id)}
                            onChange={() => toggleMonastery(m.id)}
                            className="mt-2"
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </section>
              )}

              {/* STEP 2 — Travelers & Dates */}
              {step === 2 && (
                <section>
                  <h3 className="text-xl font-semibold mb-3">
                    2. Travelers & Dates
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Number of Travelers
                      </label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(Number(e.target.value))}
                        className="w-full p-3 border rounded-lg"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} traveler{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Choose Dates
                      </label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Trip length: <strong>{tripDays}</strong> day(s)
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 3 — Guides */}
              {step === 3 && (
                <section>
                  <h3 className="text-xl font-semibold mb-3">
                    3. Choose Local Guide
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {guideOptions.map((g) => (
                      <label
                        key={g.id}
                        className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${
                          selectedGuide === g.id
                            ? "bg-saffron/10 border-saffron"
                            : "bg-white"
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{g.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {g.price > 0 ? fmt(g.price) + " / day" : "Free"}
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="guide"
                          checked={selectedGuide === g.id}
                          onChange={() => setSelectedGuide(g.id)}
                        />
                      </label>
                    ))}
                  </div>
                </section>
              )}

              {/* STEP 4 — Accommodation */}
              {step === 4 && (
                <section>
                  <h3 className="text-xl font-semibold mb-3">
                    4. Accommodation
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="block text-sm font-medium">Nights</label>
                      <input
                        type="number"
                        value={accomNights}
                        min={1}
                        onChange={(e) =>
                          setAccomNights(Math.max(1, Number(e.target.value)))
                        }
                        className="w-24 p-2 border rounded"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {accommodationOptions.map((a) => (
                        <label
                          key={a.id}
                          className={`p-3 rounded-lg border flex items-start justify-between cursor-pointer ${
                            selectedAccommodation === a.id
                              ? "bg-saffron/10 border-saffron"
                              : "bg-white"
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{a.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {a.desc}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {fmt(a.pricePerNight)}
                            </div>
                            <input
                              type="radio"
                              name="accom"
                              checked={selectedAccommodation === a.id}
                              onChange={() => setSelectedAccommodation(a.id)}
                              className="mt-2"
                            />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 5 — Review */}
              {step === 5 && (
                <section>
                  <h3 className="text-xl font-semibold mb-3">
                    5. Review & Confirm
                  </h3>
                  <div className="p-4 rounded-lg bg-white border">
                    <div className="flex items-center justify-between mb-2">
                      <div>Subtotal</div>
                      <div className="font-semibold">{fmt(subtotal)}</div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div>Taxes & Fees</div>
                      <div className="font-semibold">{fmt(taxes)}</div>
                    </div>
                    <div className="border-t pt-3 flex items-center justify-between">
                      <div className="font-bold">Total</div>
                      <div className="text-2xl font-extrabold text-primary">
                        {fmt(grandTotal)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button onClick={handleConfirm} className="bg-saffron w-full">
                      Confirm & Pay
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="w-1/4"
                    >
                      Edit
                    </Button>
                  </div>
                </section>
              )}

              {/* Navigation */}
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={prev} disabled={step === 1}>
                  Back
                </Button>
                {step < 5 ? (
                  <Button onClick={next} className="bg-saffron">
                    Continue
                  </Button>
                ) : (
                  <div />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Summary */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>Subtotal</div>
                    <div>{fmt(subtotal)}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Taxes</div>
                    <div>{fmt(taxes)}</div>
                  </div>
                  <div className="border-t pt-3 flex items-center justify-between text-2xl font-extrabold">
                    <div>Total</div>
                    <div>{fmt(grandTotal)}</div>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={() => setStep(5)}
                      className="bg-saffron w-full"
                    >
                      Proceed to Confirm
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Selections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Monasteries:</strong>
                    <ul className="list-disc ml-5">
                      {selectedMonasteries.length > 0 ? (
                        selectedMonasteries.map((id) => {
                          const m = monasteryOptions.find((x) => x.id === id);
                          return <li key={id}>{m?.name}</li>;
                        })
                      ) : (
                        <li>No monasteries selected</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <strong>Guide:</strong> {selectedGuide}
                  </div>
                  <div>
                    <strong>Stay:</strong> {selectedAccommodation || "None"} ({accomNights} nights)
                  </div>
                  <div>
                    <strong>Travelers:</strong> {travelers}
                  </div>
                  <div>
                    <strong>Dates:</strong> {startDate} → {endDate}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to confirm this journey?</p>
          <DialogFooter>
            <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
            <Button onClick={handleConfirm} className="bg-saffron">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Success Toast */}
      {bookingSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>Booking confirmed successfully!</span>
        </div>
      )}
    </div>
  );
}

/* ----------------------- Booking Section ----------------------- */
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

  /* Show inline Custom Plan */
  const [showCustomPlan, setShowCustomPlan] = useState(false);
  const customPlanRef = useRef<HTMLDivElement | null>(null);

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

  /* Scroll to inline planner when shown */
  const openPlannerInline = () => {
    setShowCustomPlan(true);
    // Wait for render, then smooth scroll
    requestAnimationFrame(() => {
      customPlanRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
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
                selectedPackage === pkg.id ? "ring-2 ring-saffron shadow-saffron" : ""
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

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <Button
            onClick={openPlannerInline}
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

        {/* Inline Custom Plan (revealed below) */}
        {showCustomPlan && (
          <div ref={customPlanRef} id="custom-plan" className="mt-16">
            <CustomPlan
              initialTravelers={travelers}
              initialStartDate={dateRange[0].startDate}
              initialEndDate={dateRange[0].endDate}
            />
          </div>
        )}
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
                : "Please review the booking details before confirming:"}
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
