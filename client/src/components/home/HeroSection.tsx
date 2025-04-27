import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { City } from "@/lib/types";

const TabButton = ({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) => (
  <button 
    className={`px-6 py-3 text-sm font-medium ${active 
      ? 'border-b-2 border-blue-600 text-blue-600' 
      : 'text-gray-600 hover:text-blue-600'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const HeroSection = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial' | 'pg'>('buy');
  const [propertyType, setPropertyType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    // Add the listing type based on the active tab
    if (activeTab === 'buy') params.set("listing_type", "sale");
    if (activeTab === 'rent') params.set("listing_type", "rent");
    if (activeTab === 'pg') params.set("listing_type", "pg");
    if (activeTab === 'commercial') params.set("property_type", "commercial");
    
    // Add other params if they exist
    if (propertyType) params.set("property_type", propertyType);
    if (selectedCity) params.set("city_id", selectedCity);
    if (budget) {
      const [min, max] = budget.split("-");
      if (min) params.set("min_price", min);
      if (max) params.set("max_price", max);
    }
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (searchQuery) params.set("keyword", searchQuery);
    
    setLocation(`/properties?${params.toString()}`);
  };

  return (
    <div className="bg-gray-100 pt-0">
      {/* Hero Section with Large Background */}
      <div className="relative bg-blue-600 text-white overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-6 md:mb-10">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Search Properties to Buy, Rent or Sell</h1>
            <p className="text-sm md:text-base opacity-80">The No.1 Property Portal in India with over 30 lakh properties listed across the country</p>
          </div>
          
          {/* Main Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-md shadow-lg">
            {/* Tabs */}
            <div className="flex border-b">
              <TabButton active={activeTab === 'buy'} onClick={() => setActiveTab('buy')}>
                Buy
              </TabButton>
              <TabButton active={activeTab === 'rent'} onClick={() => setActiveTab('rent')}>
                Rent
              </TabButton>
              <TabButton active={activeTab === 'commercial'} onClick={() => setActiveTab('commercial')}>
                Commercial
              </TabButton>
              <TabButton active={activeTab === 'pg'} onClick={() => setActiveTab('pg')}>
                PG/Co-living
              </TabButton>
            </div>
            
            {/* Search Form */}
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* All Locations */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">All Locations</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id.toString()}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Property Type */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Property Type</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="house">Independent House</option>
                    <option value="plot">Plot/Land</option>
                    {activeTab === 'commercial' && (
                      <>
                        <option value="office">Office Space</option>
                        <option value="shop">Shop/Showroom</option>
                      </>
                    )}
                  </select>
                </div>
                
                {/* Budget */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Budget</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="">Select Budget</option>
                    <option value="0-2000000">Under 20 Lac</option>
                    <option value="2000000-4000000">20 Lac - 40 Lac</option>
                    <option value="4000000-6000000">40 Lac - 60 Lac</option>
                    <option value="6000000-10000000">60 Lac - 1 Cr</option>
                    <option value="10000000-200000000">1 Cr - 2 Cr</option>
                    <option value="200000000-100000000000">Above 2 Cr</option>
                  </select>
                </div>
                
                {/* Bedrooms (only show if not commercial or plot) */}
                {activeTab !== 'commercial' && propertyType !== 'plot' && (
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">BHK</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                    >
                      <option value="">Select BHK</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="5">5+ BHK</option>
                    </select>
                  </div>
                )}
              </div>
              
              {/* Search keyword input */}
              <div className="relative mb-4">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <div className="absolute left-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter locality, project or keyword"
                    className="w-full py-3 pl-10 pr-4 text-gray-700 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium transition duration-150"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
              
              {/* Additional links */}
              <div className="flex justify-between text-xs text-blue-600">
                <button className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  More Filters
                </button>
                <button className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                  Search on Map
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background image/pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 bg-opacity-60 mix-blend-multiply"></div>
      </div>
      
      {/* Popular Cities Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Explore Real Estate in Popular Cities</h2>
        <p className="text-sm text-gray-500 mb-6">Find properties in India's top cities</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {cities.slice(0, 6).map((city) => (
            <a key={city.id} href={`/properties?city_id=${city.id}`} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform group-hover:scale-105">
                <div className="h-24 bg-blue-100 relative">
                  {city.image_url ? (
                    <img src={city.image_url} alt={city.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-400 to-blue-600">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-sm text-gray-800">{city.name}</h3>
                  <p className="text-xs text-gray-500">{city.property_count} Properties</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      
      {/* Featured Properties */}
      <div className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Featured Properties</h2>
              <p className="text-sm text-gray-500">Handpicked premium properties for you</p>
            </div>
            <a href="/properties?featured=true" className="text-blue-600 text-sm font-medium">View All</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 transform hover:scale-105">
                <div className="relative h-48 bg-gray-100">
                  <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-medium px-2 py-1">
                    For Sale
                  </div>
                  <div className="absolute bottom-0 right-0 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-tl-md">
                    ₹ 90.5 Lac
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1">3 BHK Apartment in Hiranandani</h3>
                  <p className="text-sm text-gray-500 mb-2">Powai, Mumbai</p>
                  <div className="flex justify-between items-center text-xs text-gray-600 border-t border-gray-100 pt-2">
                    <span>1500 sqft</span>
                    <span>Ready to Move</span>
                    <span>3 BHK</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Only visible on md and smaller screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-30">
        <div className="grid grid-cols-5 gap-1">
          <a href="/" className="flex flex-col items-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span className="text-xs">Home</span>
          </a>
          <a href="/properties" className="flex flex-col items-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-xs">Search</span>
          </a>
          <a href="/post-property" className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute -top-8 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
            </div>
            <span className="text-xs mt-4">Post</span>
          </a>
          <a href="/notifications" className="flex flex-col items-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span className="text-xs">Alerts</span>
          </a>
          <a href="/profile" className="flex flex-col items-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span className="text-xs">Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
