import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Headphones, Download, MapPin, Bluetooth, WifiOff, Play, Pause, SkipForward, SkipBack, 
  Volume2, Languages, Navigation, Smartphone 
} from "lucide-react";
import { useMode } from "@/components/ModeToggle";

const AudioGuide = () => {
  const { mode } = useMode();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  // Set the first guide as the default to make the player visible on load
  const [currentGuide, setCurrentGuide] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);

  const audioGuides = [
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
      image: "/rumtek1.jpg",
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
      image: "/rumtek2.jpg",
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
      image: "/rumtek4.jpg",
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
        tibetan: "དགོན་པའི་ས་ཆའི་ལམ་འཛུལ།"
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
      image: "/rumtek5.jpg",
      offline: true,
      gpsEnabled: true,
      bluetoothBeacons: false,
      tracks: 9,
      downloadSize: "48 MB"
    }
  ];

  const features = [
    { title: "GPS Location Awareness", description: "Automatically triggers relevant audio content based on your precise location within the monastery grounds", icon: Navigation, available: true },
    { title: "Bluetooth Beacon Integration", description: "Enhanced accuracy using Bluetooth beacons placed throughout monastery areas for seamless transitions", icon: Bluetooth, available: true },
    { title: "Offline Functionality", description: "Download complete audio packs for use in remote Sikkim areas without internet connectivity", icon: WifiOff, available: true },
    { title: "Multi-language Support", description: "Available in local languages (Nepali, Hindi, Tibetan) and international languages", icon: Languages, available: true }
  ];

  const languages = [
    { code: "english", name: "English", flag: "🇺🇸" },
    { code: "hindi", name: "हिंदी", flag: "🇮🇳" },
    { code: "nepali", name: "नेपाली", flag: "🇳🇵" },
    { code: "tibetan", name: "བོད་ཡིག་", flag: "🏔" }
  ];

  // Effect to handle time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) setCurrentTime(audioRef.current.currentTime);
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handler to play/pause audio and select a new guide
  const handlePlayPause = (guide) => {
    // If a different guide is selected, update and play it
    if (currentGuide?.id !== guide.id) {
      setCurrentGuide(guide);
      setTimeout(() => { 
        if (audioRef.current) {
          audioRef.current.play(); 
          setIsPlaying(true);
          audioRef.current.volume = volume;
        }
      }, 100);
    } else {
      // Otherwise, toggle play/pause for the current guide
      if (isPlaying) { 
        audioRef.current?.pause(); 
        setIsPlaying(false); 
      } else { 
        audioRef.current?.play(); 
        setIsPlaying(true); 
      }
    }
  };

  // Handler to control the audio volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  return (
    <div className="min-h-screen bg-gradient-heritage p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">Smart Audio Guide</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Location-aware audio experiences using GPS and Bluetooth technology</p>
          <Badge variant="secondary" className="mt-4">{mode === "tourist" ? "Enhanced Tourist Experience" : "Research Audio Archives"} • {audioGuides.length} Available</Badge>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, i) => (
            <Card key={i} className="card-heritage text-center">
              <CardContent className="p-6">
                <feature.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <Badge variant={feature.available ? "default" : "outline"} className="mt-3">{feature.available ? "Available" : "Coming Soon"}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Language Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Languages className="h-6 w-6" /> Select Your Preferred Language</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {languages.map(lang => (
                <Button key={lang.code} variant={selectedLanguage === lang.code ? "default" : "outline"} onClick={() => setSelectedLanguage(lang.code)} className="h-16 flex flex-col items-center gap-1">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audio Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {audioGuides.map(guide => (
            <Card key={guide.id} className="card-monastery transform transition-transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="md:flex cursor-pointer" onClick={() => handlePlayPause(guide)}>
                <div className="md:w-2/5"><img src={guide.image} alt={guide.monastery} className="w-full h-48 md:h-full object-cover" /></div>
                <div className="md:w-3/5">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{guide.monastery}</Badge>
                      {guide.offline && <Badge variant="outline" className="text-xs"><WifiOff className="h-3 w-3 mr-1" />Offline</Badge>}
                      {guide.gpsEnabled && <Badge variant="outline" className="text-xs"><Navigation className="h-3 w-3 mr-1" />GPS</Badge>}
                      {guide.bluetoothBeacons && <Badge variant="outline" className="text-xs"><Bluetooth className="h-3 w-3 mr-1" />Beacon</Badge>}
                    </div>
                    <h3 className="text-lg font-heading font-bold text-primary mb-2">{guide.title[selectedLanguage]}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{guide.description[selectedLanguage]}</p>
                    <div className="flex gap-2 mb-4">
                      <Button className="flex-1">
                        <a href={guide.downloadUrl} download className="flex items-center justify-center w-full h-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                      <Button variant="outline">{currentGuide?.id === guide.id && isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />} Preview</Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile App Download Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-6 w-6" />
              Download Our Mobile App
            </CardTitle>
            <CardDescription>
              Get our mobile app for the best offline experience with GPS-triggered audio guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Button size="lg" className="w-full mb-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" onClick={() => window.open("/downloads/app.apk", "_blank")}>
                  <Smartphone className="h-5 w-5 mr-2" /> Download APK
                </Button>
                <p className="text-sm text-muted-foreground">Direct download for Android devices</p>
              </div>
              <div className="text-center">
                <Button size="lg" variant="outline" className="w-full mb-3" onClick={() => window.open("https://play.google.com/store/apps/details?id=com.example.app", "_blank")}>
                  <Smartphone className="h-5 w-5 mr-2" /> Google Play Store
                </Button>
                <p className="text-sm text-muted-foreground">Official Android app store</p>
              </div>
              <div className="text-center">
                <Button size="lg" variant="outline" className="w-full mb-3" onClick={() => window.open("https://apps.apple.com/app/idXXXXXXXXX", "_blank")}>
                  <Smartphone className="h-5 w-5 mr-2" /> Apple App Store
                </Button>
                <p className="text-sm text-muted-foreground">Available for iOS devices</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">App Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Offline audio guides for remote areas</li>
                <li>• GPS-triggered automatic content</li>
                <li>• Bluetooth beacon integration</li>
                <li>• Multi-language support</li>
                <li>• Downloadable monastery maps</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Audio Player */}
        {currentGuide && (
          <Card className="max-w-2xl mx-auto mb-12 p-4">
            <CardHeader><CardTitle className="flex items-center gap-2"><Headphones className="h-6 w-6" />{currentGuide.title[selectedLanguage]}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <audio ref={audioRef} src={currentGuide.downloadUrl} />
              <Progress value={(currentTime / (currentGuide.duration * 60)) * 100 || 0} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, "0")}</span>
                <span>{currentGuide.duration}:00</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="sm"><SkipBack className="h-4 w-4" /></Button>
                <Button size="lg" onClick={() => handlePlayPause(currentGuide)} className="rounded-full w-12 h-12">{isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}</Button>
                <Button variant="outline" size="sm"><SkipForward className="h-4 w-4" /></Button>
              </div>
              <div className="flex items-center justify-between">
                {/* Volume control added here */}
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-primary"
                  />
                </div>
                <Badge variant="outline"><MapPin className="h-3 w-3 mr-1" /> Auto-triggered by location</Badge>
                <Button variant="outline" size="sm" onClick={() => window.open("https://www.apple.com/app-store/", "_blank")}><Smartphone className="h-4 w-4 mr-2" /> App</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AudioGuide;
