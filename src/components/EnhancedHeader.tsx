import { Link, useLocation } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle, useMode } from "@/components/ModeToggle";
import { 
  Menu, 
  X, 
  Map, 
  Camera, 
  BookOpen, 
  Search, 
  Download, 
  Calendar, 
  Users, 
  Headphones,
  Bluetooth,
  Archive
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SignInDialog from "@/components/SignInDialog";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const EnhancedHeader = () => {
  const location = useLocation();
  const { mode } = useMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const exploreItems = [
    { name: "Monasteries Map", path: "/monasteries", icon: Map, description: "Interactive map of Sikkim monasteries" },
    { name: "360° Virtual Tours", path: "/virtual-tours", icon: Camera, description: "Immersive virtual monastery experiences" },
  ];

  const calendarItems = [
    { name: "Festival Calendar", path: "/calendar", icon: Calendar, description: "Sacred festivals & ritual schedules" },
    { name: "Event Booking", path: "/calendar/booking", icon: Users, description: "Participate in cultural events" },
    { name: "Submit Event", path: "/calendar/submit", icon: Calendar, description: "Community event submissions" },
  ];

  const audioGuideItems = [
    { name: "Smart Audio Guide", path: "/audio-guide", icon: Headphones, description: "GPS/Bluetooth location-aware guides" },
    { name: "Offline Packs", path: "/audio-guide/offline", icon: Bluetooth, description: "Download for remote areas" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
  <img 
    src="/icon.png" // Replace with the actual path to your image
    alt="Custom Icon" 
    className="w-5 h-5 object-contain" // Adjust w- and h- for desired size, object-contain to fit
  />
</div>
            <span className="font-heading text-xl font-bold text-primary">
              SoulOfSikkim
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                  <Link 
                    to="/" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/") && "bg-accent text-accent-foreground"
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                {/* Explore */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-80">
                      {exploreItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <item.icon className="h-4 w-4" />
                            {item.name}
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Digital Archives (Researcher Mode Only) */}
                {mode === 'researcher' && (
                  <NavigationMenuItem>
                    <Link 
                      to="/archives" 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/archives") && "bg-accent text-accent-foreground"
                      )}
                    >
                      Digital Archives
                    </Link>
                  </NavigationMenuItem>
                )}

                {/* Events */}
                <NavigationMenuItem>
                  <Link 
                    to="/calendar" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/calendar") && "bg-accent text-accent-foreground"
                    )}
                  >
                    Events
                  </Link>
                </NavigationMenuItem>

                {/* Audio Guide */}
                <NavigationMenuItem>
                  <Link 
                    to="/audio-guide" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/audio-guide") && "bg-accent text-accent-foreground"
                    )}
                  >
                    Audio Guide
                  </Link>
                </NavigationMenuItem>

                {/* Booking */}
                <NavigationMenuItem>
                  <Link 
                    to="/booking" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/booking") && "bg-accent text-accent-foreground"
                    )}
                  >
                    Booking
                  </Link>
                </NavigationMenuItem>

                {/* Community */}
                <NavigationMenuItem>
                  <Link 
                    to="/community" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/community") && "bg-accent text-accent-foreground"
                    )}
                  >
                    Community
                  </Link>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <Link 
                    to="/about" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/about") && "bg-accent text-accent-foreground"
                    )}
                  >
                    About
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mode Toggle */}
            <div className="mx-4">
              <ModeToggle />
            </div>

            {/* Auth UI */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>
                      {user.email?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* User Email */}
                  <DropdownMenuItem disabled className="cursor-default">
                    {user.email}
                  </DropdownMenuItem>

                  {/* Admin Badge */}
                  <DropdownMenuItem disabled className="cursor-default text-red-600 font-bold">
                    Admin
                  </DropdownMenuItem>

                  {/* Logout */}
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SignInDialog />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between mb-4">
                <ModeToggle />
              </div>
              
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              {exploreItems.map((item) => (
                <Link key={item.name} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
              {mode === 'researcher' && (
                <Link to="/archives" onClick={() => setMobileMenuOpen(false)}>Digital Archives</Link>
              )}
              <Link to="/calendar" onClick={() => setMobileMenuOpen(false)}>Events</Link>
              <Link to="/audio-guide" onClick={() => setMobileMenuOpen(false)}>Audio Guide</Link>
              <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>Booking</Link>
              <Link to="/community" onClick={() => setMobileMenuOpen(false)}>Community</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>

              {/* Auth UI in mobile */}
              {user ? (
                <Button onClick={logout} variant="outline">
                  Logout
                </Button>
              ) : (
                <SignInDialog />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedHeader;
