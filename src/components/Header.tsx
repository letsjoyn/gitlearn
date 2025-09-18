import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";   // ✅ NEW
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ✅ NEW

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, login, logout, role, setRole } = useAuth();   // ✅ NEW
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Virtual Tours", path: "/virtual-tours" },
    { name: "Monasteries", path: "/monasteries" },
    { name: "Book Visit", path: "/booking" },
    { name: "Community", path: "/community" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-display text-xl font-bold text-primary">
              Monastery360
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path)
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* ✅ Replaced Sign In button */}
            {!user ? (
              <Button variant="outline" size="sm" className="ml-4" onClick={login}>
                Sign In
              </Button>
            ) : (
              <div className="relative ml-4">
                <button
                  className="flex items-center gap-2"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.photoURL || ""} />
                    <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="capitalize">{role ?? "Select Role"}</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow rounded p-2 space-y-1">
                    {role === null && (
                      <>
                        <Button variant="ghost" onClick={() => setRole("tourist")}>Tourist</Button>
                        <Button variant="ghost" onClick={() => setRole("researcher")}>Researcher</Button>
                        <Button variant="ghost" onClick={() => setRole("admin")}>Admin</Button>
                      </>
                    )}
                    <Button variant="destructive" onClick={logout}>Logout</Button>
                  </div>
                )}
              </div>
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* ✅ Replace Sign In in mobile */}
              {!user ? (
                <Button variant="outline" size="sm" className="w-fit" onClick={login}>
                  Sign In
                </Button>
              ) : (
                <div className="flex flex-col space-y-1">
                  {role === null && (
                    <>
                      <Button variant="ghost" onClick={() => setRole("tourist")}>Tourist</Button>
                      <Button variant="ghost" onClick={() => setRole("researcher")}>Researcher</Button>
                      <Button variant="ghost" onClick={() => setRole("admin")}>Admin</Button>
                    </>
                  )}
                  <Button variant="destructive" onClick={logout}>Logout</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
