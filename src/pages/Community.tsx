import CommunitySection from "@/components/CommunitySection";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-20"
        style={{ backgroundImage: "url('/community.jpg')" }}
      >
        {/* Optional overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Community Stories
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Share your spiritual journey and connect with fellow travelers, locals, and monastery guardians. 
              Your stories help preserve and celebrate this sacred heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16">
        <CommunitySection />
      </section>
    </div>
  );
};

export default Community;
