import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnhancedHeader from "./components/EnhancedHeader";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";
import AIResearchAgent from "./components/AIResearchAgent";
import { ModeProvider } from "./components/ModeToggle";
import Index from "./pages/Index";
import VirtualTours from "./pages/VirtualTours";
import Monasteries from "./pages/Monasteries";
import Booking from "./pages/Booking";
import Community from "./pages/Community";
import About from "./pages/About";
import DigitalArchives from "./pages/DigitalArchives";
import CulturalCalendar from "./pages/CulturalCalendar";
import AudioGuide from "./pages/AudioGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ModeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <EnhancedHeader />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/virtual-tours" element={<VirtualTours />} />
                <Route path="/monasteries" element={<Monasteries />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/community" element={<Community />} />
                <Route path="/about" element={<About />} />
                
                {/* Digital Archives Routes */}
                <Route path="/archives/*" element={<DigitalArchives />} />
                <Route path="/archives/manuscripts" element={<DigitalArchives />} />
                <Route path="/archives/search" element={<DigitalArchives />} />
                <Route path="/archives/download" element={<DigitalArchives />} />
                <Route path="/archives/access" element={<DigitalArchives />} />
                
                {/* Cultural Calendar Routes */}
                <Route path="/calendar" element={<CulturalCalendar />} />
                <Route path="/calendar/booking" element={<CulturalCalendar />} />
                <Route path="/calendar/submit" element={<CulturalCalendar />} />
                
                {/* Audio Guide Routes */}
                <Route path="/audio-guide" element={<AudioGuide />} />
                <Route path="/audio-guide/offline" element={<AudioGuide />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <AIAssistant />
            <AIResearchAgent />
          </div>
        </BrowserRouter>
      </ModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
