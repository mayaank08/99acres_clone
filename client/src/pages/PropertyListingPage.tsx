import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { PropertySearchFilters } from "@/lib/types";
import PropertyList from "@/components/properties/PropertyList";
import PropertyFilters from "@/components/properties/PropertyFilters";
import { Helmet } from "react-helmet";

const PropertyListingPage = () => {
  const [location] = useLocation();
  const [filters, setFilters] = useState<PropertySearchFilters>({});

  // Parse URL search params into filters on page load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1]);
    
    const newFilters: PropertySearchFilters = {};
    
    // Parse city
    const city = searchParams.get('city');
    if (city) newFilters.city_id = parseInt(city);
    
    // Parse locality
    const locality = searchParams.get('locality');
    if (locality) newFilters.locality_id = parseInt(locality);
    
    // Parse property type
    const propertyType = searchParams.get('property_type');
    if (propertyType) newFilters.property_type = propertyType;
    
    // Parse listing type
    const listingType = searchParams.get('listing_type');
    if (listingType) newFilters.listing_type = listingType;
    
    // Parse bedrooms
    const bedrooms = searchParams.get('bedrooms');
    if (bedrooms) {
      if (bedrooms.includes(',')) {
        // Multiple bedrooms selected
        newFilters.bedrooms = bedrooms.split(',').map(Number);
      } else {
        // Single bedroom selected
        newFilters.bedrooms = parseInt(bedrooms);
      }
    }
    
    // Parse price range
    const minPrice = searchParams.get('min_price');
    if (minPrice) newFilters.min_price = parseInt(minPrice);
    
    const maxPrice = searchParams.get('max_price');
    if (maxPrice) newFilters.max_price = parseInt(maxPrice);
    
    // Parse area range
    const minArea = searchParams.get('min_area');
    if (minArea) newFilters.min_area = parseInt(minArea);
    
    const maxArea = searchParams.get('max_area');
    if (maxArea) newFilters.max_area = parseInt(maxArea);
    
    // Set the filters
    setFilters(newFilters);
  }, [location]);

  // Handle filter changes from PropertyFilters component
  const handleFilterChange = (newFilters: PropertySearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Helmet>
        <title>Property Listings | 99acres Clone</title>
        <meta name="description" content="Browse properties for sale, rent and PG/Co-living across India. Filter by location, budget, property type and more." />
      </Helmet>
      
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6">
            Property Listings
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left sidebar with filters */}
            <div className="md:col-span-1">
              <PropertyFilters 
                initialFilters={filters} 
                onFilterChange={handleFilterChange}
              />
            </div>
            
            {/* Right section with property listings */}
            <div className="md:col-span-3">
              <PropertyList filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyListingPage;
