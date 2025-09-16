import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Headphones, 
  Download, 
  MapPin, 
  Bluetooth, 
  Wifi, 
  WifiOff,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Languages,
  Navigation,
  Smartphone
} from "lucide-react";
import { useMode } from "@/components/ModeToggle";

const AudioGuide = () => {
  const { mode } = useMode();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const audioGuides = [
    {
      id: 1,
      monastery: "Rumtek Monastery",
      title: "Complete Heritage Tour",
      duration: "45 minutes",
      languages: ["English", "Hindi", "Nepali", "Tibetan"],
      downloadSize: "68 MB",
      description: "Comprehensive audio guide covering history, architecture, and spiritual significance",
      tracks: 12,
      offline: true,
      gpsEnabled: true,
      bluetoothBeacons: true,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      monastery: "Pemayangtse Monastery",
      title: "Sunrise Prayer Experience", 
      duration: "25 minutes",
      languages: ["English", "Hindi", "Nepali"],
      downloadSize: "42 MB",
      description: "Early morning prayer rituals and meditation guidance",
      tracks: 8,
      offline: true,
      gpsEnabled: true,
      bluetoothBeacons: false,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      monastery: "Enchey Monastery",
      title: "Cham Dance Festival Guide",
      duration: "35 minutes",
      languages: ["English", "Tibetan", "Hindi"],
      downloadSize: "55 MB", 
      description: "Sacred dance performances and their cultural significance",
      tracks: 10,
      offline: true,
      gpsEnabled: false,
      bluetoothBeacons: true,
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      monastery: "Tashiding Monastery",
      title: "Sacred Geography Tour",
      duration: "30 minutes",
      languages: ["English", "Nepali", "Hindi"],
      downloadSize: "48 MB",
      description: "Explore the monastery's connection to Himalayan sacred landscapes",
      tracks: 9,
      offline: true,
      gpsEnabled: true,
      bluetoothBeacons: false,
      image: "/api/placeholder/300/200"
    }
  ];

  const features = [
    {
      title: "GPS Location Awareness",
      description: "Automatically triggers relevant audio content based on your precise location within the monastery grounds",
      icon: Navigation,
      available: true
    },
    {
      title: "Bluetooth Beacon Integration",
      description: "Enhanced accuracy using Bluetooth beacons placed throughout monastery areas for seamless transitions",
      icon: Bluetooth,
      available: true
    },
    {
      title: "Offline Functionality",
      description: "Download complete audio packs for use in remote Sikkim areas without internet connectivity",
      icon: WifiOff,
      available: true
    },
    {
      title: "Multi-language Support",
      description: "Available in local languages (Nepali, Hindi, Tibetan) and international languages",
      icon: Languages,
      available: true
    }
  ];

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'nepali', name: 'नेपाली', flag: '🇳🇵' },
    { code: 'tibetan', name: 'བོད་ཡིག་', flag: '🏔️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-heritage">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Smart Audio Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Location-aware audio experiences using GPS and Bluetooth technology
          </p>
          <Badge variant="secondary" className="mt-4">
            {mode === 'tourist' ? 'Enhanced Tourist Experience' : 'Research Audio Archives'} • {audioGuides.length} Available
          </Badge>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="card-heritage text-center">
              <CardContent className="p-6">
                <feature.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <Badge 
                  variant={feature.available ? "default" : "outline"} 
                  className="mt-3"
                >
                  {feature.available ? "Available" : "Coming Soon"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Language Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-6 w-6" />
              Select Your Preferred Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? "default" : "outline"}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className="h-16 flex flex-col items-center gap-1"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audio Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {audioGuides.map((guide) => (
            <Card key={guide.id} className="card-monastery">
              <div className="md:flex">
                <div className="md:w-2/5">
                  <img 
                    src={guide.image} 
                    alt={guide.monastery}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{guide.monastery}</Badge>
                      {guide.offline && (
                        <Badge variant="outline" className="text-xs">
                          <WifiOff className="h-3 w-3 mr-1" />
                          Offline
                        </Badge>
                      )}
                      {guide.gpsEnabled && (
                        <Badge variant="outline" className="text-xs">
                          <Navigation className="h-3 w-3 mr-1" />
                          GPS
                        </Badge>
                      )}
                      {guide.bluetoothBeacons && (
                        <Badge variant="outline" className="text-xs">
                          <Bluetooth className="h-3 w-3 mr-1" />
                          Beacon
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-heading font-bold text-primary mb-2">
                      {guide.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {guide.description}
                    </p>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1">
                          <Headphones className="h-4 w-4" />
                          {guide.duration}
                        </span>
                        <span>{guide.tracks} tracks</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size: {guide.downloadSize}</span>
                        <span>{guide.languages.length} languages</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline">
                        <Play className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
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
                <Button size="lg" className="w-full mb-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Download APK
                </Button>
                <p className="text-sm text-muted-foreground">Direct download for Android devices</p>
              </div>
              
              <div className="text-center">
                <Button size="lg" variant="outline" className="w-full mb-3">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Google Play Store
                </Button>
                <p className="text-sm text-muted-foreground">Official Android app store</p>
              </div>
              
              <div className="text-center">
                <Button size="lg" variant="outline" className="w-full mb-3">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Apple App Store
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

        {/* Audio Player Demo */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="h-6 w-6" />
              Audio Player Demo
            </CardTitle>
            <CardDescription>
              Experience the smart audio guide interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Now Playing */}
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Rumtek Monastery - Main Hall</h3>
              <p className="text-sm text-muted-foreground">
                Welcome to the main prayer hall, where monks gather for daily rituals...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={35} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>2:45</span>
                <span>7:20</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button 
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-full w-12 h-12"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button variant="outline" size="sm">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Additional Controls */}
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <Volume2 className="h-4 w-4 mr-2" />
                Volume
              </Button>
              <Badge variant="outline">
                <MapPin className="h-3 w-3 mr-1" />
                Auto-triggered by location
              </Badge>
              <Button variant="outline" size="sm">
                <Smartphone className="h-4 w-4 mr-2" />
                Download App
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudioGuide;