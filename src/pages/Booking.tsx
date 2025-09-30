import BookingSection from "@/components/BookingSection";
import { motion } from "framer-motion";

const Booking = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-20"
        style={{ backgroundImage: "url('/booking.jpg')" }} // <-- replace with your image
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Book Your Sacred Journey
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Choose from our carefully curated spiritual packages. Each journey is designed to provide
              authentic experiences while respecting the sacred nature of these ancient sites.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16">
        <BookingSection />
      </section>
    </div>
  );
};

export default Booking;
