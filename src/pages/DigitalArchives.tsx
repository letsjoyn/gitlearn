import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Search, 
  Download, 
  Filter, 
  Calendar, 
  Tag, 
  FileText, 
  Image, 
  Scroll,
  Brain,
  Archive,
  Eye,
  Clock
} from "lucide-react";
import { useMode } from "@/components/ModeToggle";

const DigitalArchives = () => {
  const { mode } = useMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (mode !== 'researcher') {
    return (
      <div className="min-h-screen bg-gradient-heritage flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Archive className="h-6 w-6" />
              Restricted Access
            </CardTitle>
            <CardDescription>
              Digital Archives are only available in Researcher Mode. Please switch to Researcher Mode to access scholarly materials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Switch to Researcher Mode</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categories = [
    { id: "all", name: "All Materials", count: 1247, icon: Archive },
    { id: "manuscripts", name: "Manuscripts", count: 342, icon: Scroll },
    { id: "murals", name: "Murals & Art", count: 186, icon: Image },
    { id: "documents", name: "Historical Documents", count: 423, icon: FileText },
    { id: "photos", name: "Photographs", count: 296, icon: Eye },
  ];

  const featuredItems = [
    {
      title: "Tashiding Monastery Manuscripts",
      description: "17th century Tibetan Buddhist texts with AI-generated translations",
      category: "manuscripts",
      date: "1650-1700",
      language: "Classical Tibetan",
      pages: 247,
      status: "digitized",
      thumbnail: "/api/placeholder/200/300"
    },
    {
      title: "Rumtek Monastery Murals Collection", 
      description: "High-resolution scans of sacred murals with iconographic analysis",
      category: "murals",
      date: "1960s",
      language: "Visual Art",
      pages: 89,
      status: "ai-processed",
      thumbnail: "/api/placeholder/200/300"
    },
    {
      title: "Pemayangtse Historical Records",
      description: "Administrative documents and ritual calendars from the monastery archives",
      category: "documents", 
      date: "1705-1900",
      language: "Tibetan, Nepali",
      pages: 156,
      status: "transcribed",
      thumbnail: "/api/placeholder/200/300"
    }
  ];

  const aiFeatures = [
    {
      title: "Semantic Search",
      description: "AI-powered search across all digitized materials using natural language queries",
      icon: Brain
    },
    {
      title: "Auto-Categorization", 
      description: "Machine learning classification of documents by type, period, and content",
      icon: Tag
    },
    {
      title: "OCR & Transcription",
      description: "Optical character recognition for Tibetan scripts with accuracy validation",
      icon: FileText
    },
    {
      title: "Metadata Generation",
      description: "Automated extraction of dates, locations, and subject matter from documents",
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-heritage">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Digital Archives
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital repository of Sikkim monastery heritage with AI-powered discovery tools
          </p>
          <Badge variant="secondary" className="mt-4">
            Researcher Access • {categories.find(c => c.id === "all")?.count} Items
          </Badge>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search manuscripts, murals, documents... (AI-powered)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button>
                <Brain className="h-4 w-4 mr-2" />
                AI Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Category Filters */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center p-4 rounded-lg border transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background hover:bg-muted border-border'
                }`}
              >
                <category.icon className="h-5 w-5 mb-2" />
                <span className="text-xs font-medium">{category.name}</span>
                <Badge variant="outline" className="text-xs mt-1">{category.count}</Badge>
              </button>
            ))}
          </div>

          {/* AI Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {aiFeatures.map((feature, index) => (
              <Card key={index} className="card-heritage">
                <CardContent className="p-4 text-center">
                  <feature.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems
              .filter(item => selectedCategory === "all" || item.category === selectedCategory)
              .map((item, index) => (
              <Card key={index} className="card-monastery group">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={item.status === 'digitized' ? 'default' : item.status === 'ai-processed' ? 'secondary' : 'outline'}
                      className="capitalize"
                    >
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </span>
                      <span>{item.pages} pages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {item.language}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Access Request Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Archive className="h-6 w-6" />
              Request Access to Restricted Materials
            </CardTitle>
            <CardDescription>
              Some materials require special permissions for academic research. Submit your request with institutional affiliation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Input placeholder="Institution/University" className="flex-1" />
              <Input placeholder="Research Purpose" className="flex-1" />
              <Button>
                Submit Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalArchives;