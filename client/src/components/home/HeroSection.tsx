import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, FiltersIcon, MapPinIcon } from "@/assets/icons";
import { City } from "@/lib/types";

const HeroSection = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("buy"); // buy, rent, pg, commercial
  const [city, setCity] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const handleSearch = () => {
    // Construct query parameters
    const params = new URLSearchParams();
    
    // Set listing type based on active tab
    if (activeTab === "buy") params.set("listing_type", "sale");
    if (activeTab === "rent") params.set("listing_type", "rent");
    if (activeTab === "pg") params.set("listing_type", "pg");
    if (activeTab === "commercial") params.set("property_type", "commercial");
    
    // Add other filters
    if (city && city !== "all_cities") params.set("city", city);
    if (propertyType && propertyType !== "all_types") params.set("property_type", propertyType);
    
    // Handle budget range
    if (budget && budget !== "select_budget") {
      const [min, max] = budget.split("-");
      if (min) params.set("min_price", min);
      if (max) params.set("max_price", max);
    }
    
    // Handle bedrooms
    if (bedrooms.length > 0) {
      params.set("bedrooms", bedrooms.join(","));
    }
    
    // Handle keyword search
    if (keyword) params.set("keyword", keyword);
    
    // Navigate to properties page with filters
    setLocation(`/properties?${params.toString()}`);
  };

  const toggleBedroom = (value: string) => {
    if (bedrooms.includes(value)) {
      setBedrooms(bedrooms.filter(item => item !== value));
    } else {
      setBedrooms([...bedrooms, value]);
    }
  };

  return (
    <section className="relative bg-gray-100 pt-6 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Headline */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-dark">Search Real Estate Properties in India</h1>
          <p className="text-mediumGray mt-2">From 5 Lakh+ Properties Online</p>
        </div>
        
        {/* Search Tabs */}
        <div className="bg-white rounded-t-lg shadow-sm">
          <div className="flex">
            <button 
              className={`flex-1 py-3 px-4 font-medium ${activeTab === "buy" ? "text-primary border-b-2 border-primary" : "text-gray-600 border-b border-gray-200 hover:text-primary"}`}
              onClick={() => setActiveTab("buy")}
            >
              Buy
            </button>
            <button 
              className={`flex-1 py-3 px-4 font-medium ${activeTab === "rent" ? "text-primary border-b-2 border-primary" : "text-gray-600 border-b border-gray-200 hover:text-primary"}`}
              onClick={() => setActiveTab("rent")}
            >
              Rent
            </button>
            <button 
              className={`flex-1 py-3 px-4 font-medium ${activeTab === "pg" ? "text-primary border-b-2 border-primary" : "text-gray-600 border-b border-gray-200 hover:text-primary"}`}
              onClick={() => setActiveTab("pg")}
            >
              PG/Co-living
            </button>
            <button 
              className={`flex-1 py-3 px-4 font-medium ${activeTab === "commercial" ? "text-primary border-b-2 border-primary" : "text-gray-600 border-b border-gray-200 hover:text-primary"}`}
              onClick={() => setActiveTab("commercial")}
            >
              Commercial
            </button>
          </div>
          
          {/* Search Form */}
          <div className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="w-full p-2 bg-lightGray border border-gray-300 rounded">
                      <SelectValue placeholder="All Cities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_cities">All Cities</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="w-full p-2 bg-lightGray border border-gray-300 rounded">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_types">All Types</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="house">Independent House</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                      {activeTab === "commercial" && (
                        <SelectItem value="commercial">Commercial</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="w-full p-2 bg-lightGray border border-gray-300 rounded">
                      <SelectValue placeholder="Select Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select_budget">Select Budget</SelectItem>
                      <SelectItem value="0-2000000">Under 20 Lacs</SelectItem>
                      <SelectItem value="2000000-4000000">20 - 40 Lacs</SelectItem>
                      <SelectItem value="4000000-6000000">40 - 60 Lacs</SelectItem>
                      <SelectItem value="6000000-10000000">60 Lacs - 1 Cr</SelectItem>
                      <SelectItem value="10000000-999999999">Above 1 Cr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <div className="flex space-x-2">
                    <button 
                      type="button" 
                      className={`flex-1 p-2 border rounded text-center ${bedrooms.includes("1") ? "border-primary text-primary" : "border-gray-300 hover:border-primary hover:text-primary"}`}
                      onClick={() => toggleBedroom("1")}
                    >
                      1 BHK
                    </button>
                    <button 
                      type="button" 
                      className={`flex-1 p-2 border rounded text-center ${bedrooms.includes("2") ? "border-primary text-primary" : "border-gray-300 hover:border-primary hover:text-primary"}`}
                      onClick={() => toggleBedroom("2")}
                    >
                      2 BHK
                    </button>
                    <button 
                      type="button" 
                      className={`flex-1 p-2 border rounded text-center ${bedrooms.includes("3") ? "border-primary text-primary" : "border-gray-300 hover:border-primary hover:text-primary"}`}
                      onClick={() => toggleBedroom("3")}
                    >
                      3 BHK
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Enter locality, project or keyword"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-l"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-primary text-white px-6 py-3 rounded-r font-medium hover:bg-red-700 transition duration-200"
                >
                  Search
                </Button>
              </div>
              
              <div className="flex justify-center space-x-6 text-sm">
                <button type="button" className="text-primary flex items-center">
                  <FiltersIcon /> More Filters
                </button>
                <button type="button" className="text-primary flex items-center">
                  <MapPinIcon /> Search on Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
