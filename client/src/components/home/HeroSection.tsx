import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { City } from "@/lib/types";

const HeroSection = () => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const handleSearch = () => {
    if (searchQuery) {
      setLocation(`/properties?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="pt-24">
      {/* Hero Banner/Ad */}
      <div className="bg-emerald-600 px-2 pt-3 pb-16 relative">
        {/* Ad content */}
        <div className="flex items-center justify-between">
          <div className="w-1/4">
            <div className="bg-slate-700/20 h-12 w-12 flex items-center justify-center rounded">
              <span className="text-white text-xs">SS GROUP</span>
            </div>
          </div>
          
          <div className="w-3/4 pl-4">
            {/* Towers image */}
            <div className="h-24 relative overflow-hidden mb-2">
              <div className="flex justify-center">
                <img 
                  src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Property"
                  className="h-full object-cover" 
                />
              </div>
            </div>
            
            {/* Property details */}
            <div className="text-white text-center">
              <div className="flex items-center justify-center">
                <span className="mx-auto text-xs bg-yellow-400/30 rounded-full px-2 py-0.5 mb-1">
                  S S C A M A S A
                </span>
              </div>
              <h3 className="font-bold text-sm uppercase">URBAN LUXURY MEETS NATURE</h3>
              <p className="text-xs mt-1">4 BHK • 4T Starting ₹3.41 CR* | Sector 90, New Gurugram</p>
            </div>
          </div>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="px-4 -mt-6 mb-4">
        <div className="bg-white rounded-full shadow-md overflow-hidden">
          <div className="flex items-center p-2">
            <div className="text-gray-400 pl-2 pr-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search 'New Projects in Noida'"
              className="w-full py-1 px-2 text-gray-800 text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="text-blue-500 pr-2 pl-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Get Started */}
      <div className="bg-white px-4 py-5">
        <h2 className="text-lg font-bold text-gray-800">Get started with</h2>
        <p className="text-sm text-gray-500 mb-4">Explore real estate options in top cities</p>
        
        {/* Options Grid */}
        <div className="grid grid-cols-4 gap-x-3">
          {/* Buy */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-1">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <span className="text-sm font-medium">Buy</span>
          </div>
          
          {/* Rent */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-1">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
              </svg>
            </div>
            <span className="text-sm font-medium">Rent</span>
          </div>
          
          {/* New Projects */}
          <div className="flex flex-col items-center relative">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-1">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div className="absolute -top-1 right-0 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-sm">
              NEW
            </div>
            <span className="text-sm font-medium">New<br/>Projects</span>
          </div>
          
          {/* Insights */}
          <div className="flex flex-col items-center relative">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-1">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="absolute -top-1 right-0 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-sm">
              NEW
            </div>
            <span className="text-sm font-medium">Insights</span>
          </div>
        </div>
      </div>
      
      {/* Insights & Tools */}
      <div className="bg-gray-100 px-4 py-4 mt-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center shadow-sm mr-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-800">Insights & Tools</h3>
              <p className="text-xs text-gray-500">Go from browsing to buying</p>
            </div>
          </div>
          <a href="#" className="text-blue-500 text-sm font-medium">View All</a>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-5 h-14">
          <a href="#" className="flex flex-col items-center justify-center text-blue-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span className="text-xs mt-0.5">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-xs mt-0.5">Insights</span>
          </a>
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute -top-5 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <span className="text-xs mt-5 text-gray-500">Sell/Rent</span>
          </div>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
            <span className="text-xs mt-0.5">Shortlisted</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span className="text-xs mt-0.5">Profile</span>
          </a>
        </div>
      </div>
      
      {/* Cookie Policy */}
      <div className="fixed bottom-14 left-0 right-0 bg-white shadow-md p-3 text-sm z-20">
        <p className="text-xs mb-2">This site uses cookies to improve your experience. By browsing, you agree to our
          <span className="text-blue-500"> Privacy Policy</span> & 
          <span className="text-blue-500"> Cookie Policy</span>
        </p>
        <button className="bg-blue-500 text-white text-xs py-1 px-4 rounded">Okay</button>
      </div>
      
      {/* Browser Address Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white py-2 px-3 z-10 flex items-center justify-between" style={{ bottom: '-40px', height: '40px' }}>
        <div className="flex items-center">
          <span className="text-sm mr-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </span>
          <span className="text-sm flex-1 text-center">99acres.com</span>
        </div>
        <div className="flex space-x-4">
          <span className="text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </span>
          <span className="text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
