"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Headphones, Download, MapPin, Bluetooth, WifiOff, Play, Pause, SkipForward, SkipBack, 
  Volume2, Languages, Navigation, Smartphone, CheckCircle, Clock 
} from "lucide-react";

// --- START: Mock/Utility Data and Hooks ---

// Mock hook for theme mode (Explicitly typed as a function returning an object)
const useMode = (): { mode: "tourist" | "research" } => ({ mode: "tourist" }); 

interface AudioGuideItem {
    id: number;
    monastery: string;
    title: { [key: string]: string };
    description: { [key: string]: string };
    duration: number;
    languages: string[];
    downloadUrl: string;
    image: string;
    offline: boolean;
    gpsEnabled: boolean;
    bluetoothBeacons: boolean;
    tracks: number;
    downloadSize: string;
}

const audioGuides: AudioGuideItem[] = [
    {
      id: 1,
      monastery: "Rumtek Monastery",
      title: {
        english: "Complete Heritage Tour",
        hindi: "पूर्ण विरासत यात्रा",
        nepali: "पूर्ण धरोहर यात्रा",
        tibetan: "མཐོང་བའི་སྤུས་ཀྱི་འཛུལ་ལམ་"
      },
      description: {
        english: "Comprehensive audio guide covering history, architecture, and spiritual significance",
        hindi: "इतिहास, वास्तुकला और आध्यात्मिक महत्व को कवर करने वाला ऑडियो गाइड",
        nepali: "इतिहास, वास्तुकला र आध्यात्मिक महत्व समेट्ने अडियो गाइड",
        tibetan: "རྒྱུན་དུ་གསུངས་བཤད་དང་རྒྱུན་དུ་བསྡུར་བའི་སྤུས་ཀྱི་དྲན་འཛུལ།"
      },
      duration: 45,
      languages: ["english", "hindi", "nepali", "tibetan"],
      downloadUrl: "RUMTEK-ENGLISH.mp3",
      image: "/monastery-interior.jpg", 
      offline: true,
      gpsEnabled: true,
      bluetoothBeacons: true,
      tracks: 12,
      downloadSize: "68 MB"
    },
    {
      id: 2,
      monastery: "Pemayangtse Monastery",
      title: {
        english: "Sunrise Prayer Experience",
        hindi: "सूर्योदय प्रार्थना अनुभव",
        nepali: "सूर्योदय प्रार्थना अनुभव",
        tibetan: "ཉིན་མོའི་སྒོ་འགྱུར་སྤྱོད་ཚུལ་"
      },
      description: {
        english: "Early morning prayer rituals and meditation guidance",
        hindi: "सुबह की प्रार्थना और ध्यान का मार्गदर्शन",
        nepali: "बिहानको प्रार्थना र ध्यान मार्गदर्शन",
        tibetan: "སྔ་དྲོའི་སྤྱོད་ཚུལ་དང་སངས་རྒྱས་རྟགས་བཤད།"
      },
      duration: 25,
      languages: ["english", "hindi", "nepali"],
      downloadUrl: "/audio/pemayangtse-sunrise.mp3",
      image: "/prayer-flags.jpg", 
      offline: true,
      gpsEnabled: true,
      bluetoothBeacons: false,
      tracks: 8,
      downloadSize: "42 MB"
    },
    {
      id: 3,
      monastery: "Enchey Monastery",
      title: {
        english: "Cham Dance Festival Guide",
        hindi: "चाम नृत्य महोत्सव मार्गदर्शिका",
        nepali: "चाम नृत्य महोत्सव मार्गदर्शन",
        tibetan: "ཆམ་དང་འཁྱུགས་དུ་བརྡ་འཛིན་"
      },
      description: {
        english: "Sacred dance performances and their cultural significance",
        hindi: "पवित्र नृत्य प्रदर्शन और उनका सांस्कृतिक महत्व",
        nepali: "पवित्र नृत्य प्रस्तुति र यसको सांस्कृतिक महत्व",
        tibetan: "དགོན་པའི་སྤྱོད་སྐུར་དང་གཞུང་ལྡན་མཐར་དུ་དུས་གཟིགས།"
      },
      duration: 35,
      languages: ["english", "tibetan", "hindi"],
      downloadUrl: "/audio/enchey-cham.mp3",
      image: "/Enchey-Monastery.jpg", 
      offline: true,
      gpsEnabled: false,
      bluetoothBeacons: true,
      tracks: 10,
      downloadSize: "55 MB"
    },
    {
      id: 4,
      monastery: "Tashiding Monastery",
      title: {
        english: "Sacred Geography Tour",
        hindi: "पवित्र भूगोल यात्रा",
        nepali: "पवित्र भूगोल यात्रा",
        tibetan: "དགོན་པའི་ས་ཆའི་ལམ་འཛུལ་།"
      },
      description: {
        english: "Explore the monastery's connection to Himalayan sacred landscapes",
        hindi: "हिमालयी पवित्र परिदृश्यों से मठ का संबंध जानें",
        nepali: "हिमालयको पवित्र परिदृश्यसँग मठको सम्बन्ध अन्वेषण गर्नुहोस्",
        tibetan: "དགོན་པ་དང་ཧི་མ་ལ་ཡིག་མཛད་ལམ་ལ་འབྲེལ་བ།"
      },
      duration: 30,
      languages: ["english", "hindi", "nepali"],
      downloadUrl: "/audio/tashiding-tour.mp3",
      image: "/hero-monastery.jpg", 
      offline: true,
      gpsEnabled: true,
      bluetoothBeacons: false,
      tracks: 9,
      downloadSize: "48 MB"
    }
];

const features = [
    { title: "GPS Location Awareness", description: "Triggers relevant audio content based on your precise location within the monastery grounds.", icon: Navigation, available: true },
    { title: "Bluetooth Beacon Integration", description: "Enhanced accuracy using beacons placed throughout monastery areas for seamless transitions.", icon: Bluetooth, available: true },
    { title: "Offline Functionality", description: "Download complete audio packs for use in remote Sikkim areas without internet connectivity.", icon: WifiOff, available: true },
    { title: "Multi-language Support", description: "Available in local languages (Nepali, Hindi, Tibetan) and international languages.", icon: Languages, available: true }
];

const languages = [
    { code: "english", name: "English", flag: "🇺🇸" },
    { code: "hindi", name: "हिंदी", flag: "🇮🇳" },
    { code: "nepali", name: "नेपाली", flag: "🇳🇵" },
    { code: "tibetan", name: "བོད་ཡིག་", flag: "🏔" }
];
// --- END: Mock/Utility Data and Hooks ---

// Utility component to reuse the Glass Card style
const GlassCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
    <Card 
        className={`group transition-all duration-300 bg-white/70 backdrop-blur-lg border-0 shadow-xl animate-fadeIn ${className}`} 
        style={{ borderRadius: "1.5rem" }}
    >
        {children}
    </Card>
);


const AudioGuide: React.FC = () => {
  const { mode } = useMode();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);
  const [currentGuide, setCurrentGuide] = useState<AudioGuideItem>(audioGuides[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) setCurrentTime(audioRef.current.currentTime);
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = (guide: AudioGuideItem) => {
    if (!audioRef.current) return; 

    if (currentGuide?.id !== guide.id) {
      setCurrentGuide(guide);
      audioRef.current.src = guide.downloadUrl;
      audioRef.current.load();
      audioRef.current.oncanplaythrough = () => {
        audioRef.current!.play().catch(e => console.error("Play failed:", e)); 
        setIsPlaying(true);
        audioRef.current!.volume = volume;
        audioRef.current!.oncanplaythrough = null;
      }
    } else {
      if (isPlaying) { 
        audioRef.current.pause(); 
        setIsPlaying(false); 
      } else { 
        audioRef.current.play().catch(e => console.error("Play failed:", e)); 
        setIsPlaying(true); 
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-[#c3cfe2] to-[#e2eafc] p-4">
      
      {/* Custom styles for animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.7s both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4 drop-shadow-md">Smart Audio Guide</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Location-aware audio experiences using GPS and Bluetooth technology</p>
          <Badge variant="secondary" className="mt-4 bg-primary/20 text-primary shadow">
             <Headphones className="h-4 w-4 mr-2" /> {mode === "tourist" ? "Enhanced Tourist Experience" : "Research Audio Archives"} • {audioGuides.length} Guides Available
          </Badge>
        </div>
        
        {/* Features (Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, i) => (
            <GlassCard key={i} className="hover:shadow-primary/30 hover:-translate-y-1">
              <CardContent className="p-6">
                <feature.icon className="h-8 w-8 mx-auto mb-3 text-primary fill-primary/10" />
                <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-700">{feature.description}</p>
                <Badge variant="default" className="mt-3 bg-accent text-accent-foreground shadow-sm flex items-center justify-center mx-auto w-fit">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Available
                </Badge>
              </CardContent>
            </GlassCard>
          ))}
        </div>

        {/* Language Selection (Glass Card) */}
        <GlassCard className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-2xl text-primary"><Languages className="h-6 w-6 text-primary" /> Select Your Preferred Language</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {languages.map(lang => (
                <Button 
                    key={lang.code} 
                    variant={selectedLanguage === lang.code ? "default" : "outline"} 
                    onClick={() => setSelectedLanguage(lang.code)} 
                    className={`h-20 flex flex-col items-center gap-1 shadow-md transition-all duration-300 ${
                        selectedLanguage === lang.code 
                        ? "bg-primary text-white hover:bg-primary/90 ring-4 ring-primary/20" 
                        : "border-primary/50 text-primary hover:bg-primary/10 bg-white/80"
                    }`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </GlassCard>

        {/* Audio Guides List (Monastery Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {audioGuides.map(guide => (
            <GlassCard 
              key={guide.id} 
              className="transform transition-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30"
            >
              <div className="md:flex cursor-pointer" onClick={() => handlePlayPause(guide)}>
                
                {/* Image Section */}
                <div className="md:w-2/5 relative overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                    <img src={guide.image} alt={guide.monastery} className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-primary/90 text-white shadow-lg flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {guide.duration} mins
                    </Badge>
                </div>
                
                {/* Content Section */}
                <div className="md:w-3/5">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary shadow-sm">{guide.monastery}</Badge>
                      {guide.offline && <Badge variant="outline" className="text-xs bg-white/80"><WifiOff className="h-3 w-3 mr-1 text-gray-500" />Offline</Badge>}
                      {guide.gpsEnabled && <Badge variant="outline" className="text-xs bg-white/80"><Navigation className="h-3 w-3 mr-1 text-blue-500" />GPS</Badge>}
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary mb-2">{guide.title[selectedLanguage]}</h3>
                    <p className="text-sm text-gray-700 mb-4">{guide.description[selectedLanguage]}</p>
                    <div className="flex gap-3 mt-4">
                      {/* Download Button */}
                      <Button className="flex-1 bg-primary text-white hover:bg-primary/90 shadow-md">
                        <a href={guide.downloadUrl} download className="flex items-center justify-center w-full h-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download ({guide.downloadSize})
                        </a>
                      </Button>
                      {/* Preview Button */}
                      <Button 
                          variant="outline" 
                          className="border-primary text-primary hover:bg-primary/10 shadow-md"
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handlePlayPause(guide);
                          }}
                      >
                          {currentGuide?.id === guide.id && isPlaying ? 
                            <Pause className="h-4 w-4 mr-2" /> : 
                            <Play className="h-4 w-4 mr-2" />
                          } Preview
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Mobile App Download Section (Glass Card) */}
        <GlassCard className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-2xl text-primary">
              <Smartphone className="h-6 w-6 text-primary" />
              Download Our Mobile App
            </CardTitle>
            <CardDescription className="text-gray-700">
              Get our mobile app for the best **offline** experience with GPS-triggered audio guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Button size="lg" className="w-full mb-3 bg-primary hover:bg-primary/90 shadow-xl" onClick={() => window.open("/downloads/app.apk", "_blank")}>
                  <Download className="h-5 w-5 mr-2" /> Download APK (Android)
                </Button>
                <p className="text-sm text-muted-foreground">Direct download for Android devices</p>
              </div>
              <div className="text-center">
                <Button size="lg" variant="outline" className="w-full mb-3 border-primary text-primary hover:bg-primary/10 shadow-md" onClick={() => window.open("https://play.google.com/store/apps/details?id=com.example.app", "_blank")}>
                  <Smartphone className="h-5 w-5 mr-2" /> Google Play Store
                </Button>
                <p className="text-sm text-muted-foreground">Official Android app store</p>
              </div>
              <div className="text-center">
                <Button size="lg" variant="outline" className="w-full mb-3 border-primary text-primary hover:bg-primary/10 shadow-md" onClick={() => window.open("https://apps.apple.com/app/idXXXXXXXXX", "_blank")}>
                  <Smartphone className="h-5 w-5 mr-2" /> Apple App Store
                </Button>
                <p className="text-sm text-muted-foreground">Available for iOS devices</p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-primary/10 backdrop-blur-sm rounded-xl border border-primary/20">
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" /> Exclusive App Features:
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> Offline audio guides for remote areas
                </li>
                <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> GPS-triggered automatic content playback
                </li>
                <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> Bluetooth beacon integration for superior accuracy
                </li>
                <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> Downloadable monastery maps
                </li>
              </ul>
            </div>
          </CardContent>
        </GlassCard>
        
        {/* Audio Player (In-flow card) - NOW LAST IN JSX AND NOT FIXED */}
        {currentGuide && (
          <GlassCard className="max-w-2xl mx-auto mt-12 mb-40 p-6 shadow-2xl ring-4 ring-primary/20">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center justify-between text-lg font-display text-primary">
                    <div className="flex items-center gap-2">
                      <Headphones className="h-5 w-5 fill-primary/20 text-primary" />
                      Now Playing: {currentGuide.monastery}
                    </div>
                    {/* Badge uses the title in the selected language */}
                    <Badge variant="default" className="bg-accent text-accent-foreground text-xs shadow-sm">
                        {currentGuide.title[selectedLanguage] || 'Audio Guide'}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <audio ref={audioRef} src={currentGuide.downloadUrl} hidden />
              
              {/* Progress Bar */}
              <Progress value={(currentTime / (currentGuide.duration * 60)) * 100 || 0} className="w-full h-2 bg-primary/20" />
              <div className="flex justify-between text-xs font-medium text-gray-700">
                <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, "0")}</span>
                <span>{currentGuide.duration}:00</span>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-primary/50 text-primary hover:bg-primary/10"><SkipBack className="h-4 w-4" /></Button>
                <Button 
                    size="icon" 
                    onClick={() => handlePlayPause(currentGuide)} 
                    className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
                >
                    {isPlaying ? <Pause className="h-7 w-7 fill-white" /> : <Play className="h-7 w-7 fill-white" />}
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-primary/50 text-primary hover:bg-primary/10"><SkipForward className="h-4 w-4" /></Button>
              </div>
              
              {/* Status/Volume Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-primary" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 accent-primary"
                  />
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    Location Auto-Trigger
                </Badge>
              </div>
            </CardContent>
          </GlassCard>
        )}

      </div>
    </div>
  );
};

export default AudioGuide;
