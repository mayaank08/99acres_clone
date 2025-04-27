import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import { User } from "@/lib/types";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: userData } = useQuery<User | null>({
    queryKey: ["/api/user"]
  });

  const isAuthenticated = !!userData;

  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white">
      <div className="max-w-full px-2">
        {/* Top Header */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center space-x-4">
            <button 
              className="text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link href="/">
              <a className="flex items-center">
                <span className="text-white text-xl font-semibold">99acres</span>
              </a>
            </Link>
          </div>
          
          <div className="flex items-center">
            <Link href="/post-property">
              <a className="text-sm bg-green-500 text-white px-2 py-1 rounded flex items-center">
                <span>Post property</span> <span className="text-xs ml-1 bg-white text-green-600 px-1 rounded">FREE</span>
              </a>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)}
          isAuthenticated={isAuthenticated}
          user={userData}
        />
      </div>
    </header>
  );
};

export default Header;
