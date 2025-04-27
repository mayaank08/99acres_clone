import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllNav, setShowAllNav] = useState(false);

  const { data: userData } = useQuery<User | null>({
    queryKey: ["/api/user"]
  });

  const isAuthenticated = !!userData;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar - Help, Login, etc. */}
      <div className="bg-white border-b border-gray-200 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xs text-gray-500 flex items-center space-x-4">
            <span>For guidance : 1800-41-99099</span>
          </div>
          
          <div className="flex items-center space-x-4 text-xs">
            <a href="#" className="text-gray-500 hover:text-blue-600">Download App</a>
            <a href="#" className="text-gray-500 hover:text-blue-600">Advertise</a>
            <a href="#" className="text-gray-500 hover:text-blue-600">Forum</a>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-gray-800 font-medium flex items-center">
                  <span>My Account</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block">
                  <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={async () => {
                      await fetch("/api/logout", { method: "POST" });
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a href="/login" className="text-blue-600 font-medium">Login</a>
                <span className="text-gray-400">|</span> 
                <a href="/signup" className="text-blue-600 font-medium">Register</a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="bg-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="w-24 h-8 bg-blue-600 text-white flex items-center justify-center rounded">
                <span className="font-bold text-lg">99acres</span>
              </div>
            </a>
          </div>
          
          {/* Main Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button className="text-gray-800 font-medium flex items-center">
                <span>Buy</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block">
                <a href="/properties?listing_type=sale&property_type=apartment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Apartments</a>
                <a href="/properties?listing_type=sale&property_type=house" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Houses</a>
                <a href="/properties?listing_type=sale&property_type=villa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Villas</a>
                <a href="/properties?listing_type=sale&property_type=plot" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Plots</a>
              </div>
            </div>
            
            <div className="relative group">
              <button className="text-gray-800 font-medium flex items-center">
                <span>Rent</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block">
                <a href="/properties?listing_type=rent&property_type=apartment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Apartments</a>
                <a href="/properties?listing_type=rent&property_type=house" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Houses</a>
                <a href="/properties?listing_type=rent&property_type=villa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Villas</a>
              </div>
            </div>
            
            <div className="relative group">
              <button className="text-gray-800 font-medium flex items-center">
                <span>Sell</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block">
                <a href="/post-property" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Post Property</a>
                <a href="/seller-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Seller Dashboard</a>
              </div>
            </div>
            
            <div className="relative group">
              <button className="text-gray-800 font-medium flex items-center">
                <span>Property Services</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block">
                <a href="/home-loans" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home Loans</a>
                <a href="/legal-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Legal Services</a>
                <a href="/property-valuation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Property Valuation</a>
              </div>
            </div>
            
            <a href="#" className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium">
              POST PROPERTY <span className="text-xs font-normal">FREE</span>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="bg-white w-3/4 h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              {isAuthenticated ? (
                <div>
                  <div className="font-medium">{userData?.name}</div>
                  <button 
                    className="mt-2 text-red-600"
                    onClick={async () => {
                      await fetch("/api/logout", { method: "POST" });
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <a href="/login" className="flex-1 text-center py-1.5 border border-blue-500 text-blue-500 rounded-md">
                      Login
                    </a>
                    <a href="/signup" className="flex-1 text-center py-1.5 bg-blue-500 text-white rounded-md">
                      Sign Up
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <a href="/post-property" className="block w-full text-center bg-red-500 text-white py-2 rounded-md">
                  POST PROPERTY <span className="text-xs">FREE</span>
                </a>
              </div>
              
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center" onClick={() => setShowAllNav(prev => !prev)}>
                    <span className="font-medium">Buy</span>
                    <svg className={`w-4 h-4 transform ${showAllNav ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {showAllNav && (
                    <div className="mt-2 pl-4 space-y-2">
                      <a href="/properties?listing_type=sale&property_type=apartment" className="block text-sm text-gray-700">Apartments</a>
                      <a href="/properties?listing_type=sale&property_type=house" className="block text-sm text-gray-700">Houses</a>
                      <a href="/properties?listing_type=sale&property_type=villa" className="block text-sm text-gray-700">Villas</a>
                      <a href="/properties?listing_type=sale&property_type=plot" className="block text-sm text-gray-700">Plots</a>
                    </div>
                  )}
                </div>
                
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Rent</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sell</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Property Services</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
