import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import { User } from "@/lib/types";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: user } = useQuery<User | null>({
    queryKey: ["/api/user"],
    retry: false,
    onError: () => null
  });

  const isAuthenticated = !!user;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between py-2 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <Link href="/">
              <a className="flex items-center">
                <img
                  src="https://static.99acres.com/universalapp/img/99acres_logo.jpg"
                  alt="99acres Clone"
                  className="h-8"
                />
              </a>
            </Link>
            
            <div className="hidden md:flex space-x-6 text-sm">
              <Link href="/properties?listing_type=sale">
                <a className={`hover:text-primary ${location.startsWith('/properties') && location.includes('listing_type=sale') ? 'text-primary' : ''}`}>
                  Buy
                </a>
              </Link>
              <Link href="/properties?listing_type=rent">
                <a className={`hover:text-primary ${location.startsWith('/properties') && location.includes('listing_type=rent') ? 'text-primary' : ''}`}>
                  Rent
                </a>
              </Link>
              <Link href="/properties?listing_type=pg">
                <a className={`hover:text-primary ${location.startsWith('/properties') && location.includes('listing_type=pg') ? 'text-primary' : ''}`}>
                  PG/Co-living
                </a>
              </Link>
              <Link href="/properties?property_type=commercial">
                <a className={`hover:text-primary ${location.startsWith('/properties') && location.includes('property_type=commercial') ? 'text-primary' : ''}`}>
                  Commercial
                </a>
              </Link>
              <Link href="/home-loans">
                <a className={`hover:text-primary ${location === '/home-loans' ? 'text-primary' : ''}`}>
                  Home Loans
                </a>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/post-property">
              <a className="hidden md:block text-sm text-secondary hover:underline">
                Post Property <span className="text-primary">FREE</span>
              </a>
            </Link>
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/dashboard">
                  <a className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-primary">
                    {user.name}
                  </a>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={async () => {
                    await fetch("/api/logout", { method: "POST" });
                    window.location.href = "/";
                  }}
                  className="px-3 py-1 text-sm font-medium"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-primary">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="px-3 py-1 text-sm font-medium text-white bg-primary rounded hover:bg-red-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      </div>
    </header>
  );
};

export default Header;
