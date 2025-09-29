import React, { useMemo, useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// ----- Data sources -----
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

// ---- Helpers ----
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const toISO = (d: Date) => d.toISOString().slice(0, 10);

export default function CustomPlanPage() {
  const [step, setStep] = useState<number>(1);
  const [selectedMonasteries, setSelectedMonasteries] = useState<string[]>([]);
  const [monasterySearch, setMonasterySearch] = useState("");
  const [travelers, setTravelers] = useState<number>(1);

  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const [startDate, setStartDate] = useState<string>(toISO(today));
  const [endDate, setEndDate] = useState<string>(toISO(tomorrow));

  const [selectedGuide, setSelectedGuide] = useState<string>("none");
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>("");
  const [accomNights, setAccomNights] = useState<number>(1);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Derived date logic
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

  // Filter monasteries by search
  const filteredMonasteries = useMemo(() => {
    return monasteryOptions.filter((m) =>
      m.name.toLowerCase().includes(monasterySearch.toLowerCase())
    );
  }, [monasterySearch]);

  // Price calculations
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

  // UI helper
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
              Build your journey step-by-step. Pick monasteries, guides, and stays.
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
                    Search and select monasteries you'd like to visit.
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
                              onChange={() =>
                                setSelectedAccommodation(a.id)
                              }
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
                    <strong>Stay:</strong>{" "}
                    {selectedAccommodation || "None"} ({accomNights} nights)
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
          <p>Are you sure you want to confirm your journey?</p>
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
