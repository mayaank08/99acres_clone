import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { City } from "@/lib/types";

const HeroSection = () => {
  const [, setLocation] = useLocation();
  const [keyword, setKeyword] = useState<string>("");

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const handleSearch = () => {
    if (keyword) {
      setLocation(`/properties?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <section className="relative bg-green-600">
      {/* Advertisement Banner */}
      <div className="relative w-full h-28 md:h-44 bg-green-600 overflow-hidden">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-full flex justify-end">
          <div className="relative w-3/4 h-full flex px-4">
            <div className="flex-1 relative">
              <div className="absolute right-0 top-0 w-full h-full flex items-center">
                <div className="flex items-center justify-end space-x-4">
                  <div className="text-white">
                    <div className="text-xs sm:text-sm font-semibold">SS GROUP</div>
                    <div className="text-xs mt-1">RERA NO. GSA/KEU/21SG/R106</div>
                    <div className="mt-1 text-xs">https://rera.punjab.gov.in</div>
                  </div>
                  <div className="text-white text-center">
                    <div className="text-lg sm:text-xl font-bold uppercase">SSCAMASA</div>
                    <div className="text-xs sm:text-sm mt-1">URBAN LUXURY MEETS NATURE</div>
                    <div className="text-xs sm:text-sm mt-1">4 BHK • 4T Starting ₹3.41 CR* | Sector 90, New Gurugram</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white rounded-full shadow-md mx-auto max-w-md -mt-6 relative z-10 mb-4">
        <div className="flex items-center p-1 pl-4 pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            type="text"
            placeholder="Search 'New Projects in Noida'"
            className="flex-1 border-none focus:ring-0 text-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="ml-2 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Get Started Section */}
      <div className="bg-white pb-4 pt-4">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Get started with</h2>
          <p className="text-gray-500 text-sm mb-4">Explore real estate options in top cities</p>
          
          {/* Options Grid */}
          <div className="grid grid-cols-4 gap-3 overflow-x-auto">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-sm font-medium">Buy</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-sm font-medium">Rent</span>
            </div>
            
            <div className="flex flex-col items-center relative">
              <div className="bg-blue-100 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="absolute -top-1 right-1 bg-pink-500 text-white text-xs px-1 rounded">NEW</span>
              <span className="text-sm font-medium">New Projects</span>
            </div>
            
            <div className="flex flex-col items-center relative">
              <div className="bg-blue-100 p-3 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="absolute -top-1 right-1 bg-pink-500 text-white text-xs px-1 rounded">NEW</span>
              <span className="text-sm font-medium">Insights</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tools & Insights */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="bg-white p-1 rounded-md mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-md font-bold text-gray-800">Insights & Tools</h3>
                <p className="text-xs text-gray-500">Go from browsing to buying</p>
              </div>
            </div>
            <a href="#" className="text-blue-500 text-sm font-medium">View All</a>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 h-14">
          <a href="#" className="flex flex-col items-center justify-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">Insights</span>
          </a>
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-6 bg-blue-500 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-xs mt-8 text-gray-500">Sell/Rent</span>
          </div>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-xs mt-1">Shortlisted</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </a>
        </div>
      </div>
      
      {/* Cookie Policy */}
      <div className="fixed bottom-16 left-0 right-0 bg-white shadow-md p-3 text-sm z-40">
        <p className="mb-2">This site uses cookies to improve your experience. By browsing, you agree to our
          <span className="text-blue-500"> Privacy Policy</span> & 
          <span className="text-blue-500"> Cookie Policy</span>
        </p>
        <button className="bg-blue-500 text-white py-1 px-4 rounded">Okay</button>
      </div>
    </section>
  );
};

export default HeroSection;
