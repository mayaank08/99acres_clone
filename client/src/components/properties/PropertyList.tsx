import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Property, City, PropertySearchFilters, PropertySort } from "@/lib/types";
import PropertyCard from "./PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface PropertyListProps {
  filters: PropertySearchFilters;
}

const PropertyList = ({ filters }: PropertyListProps) => {
  const [sort, setSort] = useState<PropertySort>({
    field: 'created_at',
    direction: 'desc'
  });

  // Create query string from filters
  const getQueryString = () => {
    const params = new URLSearchParams();
    
    if (filters.city_id) params.append('city', filters.city_id.toString());
    if (filters.locality_id) params.append('locality', filters.locality_id.toString());
    if (filters.property_type) params.append('property_type', filters.property_type);
    if (filters.listing_type) params.append('listing_type', filters.listing_type);
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
    if (filters.min_price) params.append('min_price', filters.min_price.toString());
    if (filters.max_price) params.append('max_price', filters.max_price.toString());
    if (filters.min_area) params.append('min_area', filters.min_area.toString());
    if (filters.max_area) params.append('max_area', filters.max_area.toString());
    
    return params.toString();
  };

  const { data: properties = [], isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: [`/api/properties?${getQueryString()}`],
    queryFn: async () => {
      const response = await fetch(`/api/properties?${getQueryString()}`);
      if (!response.ok) throw new Error("Failed to fetch properties");
      return response.json();
    }
  });

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  // Apply sorting
  const sortedProperties = [...properties].sort((a, b) => {
    if (sort.field === 'price') {
      return sort.direction === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sort.field === 'area_sqft') {
      return sort.direction === 'asc' ? a.area_sqft - b.area_sqft : b.area_sqft - a.area_sqft;
    } else {
      // Default to sort by date
      return sort.direction === 'asc' 
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-');
    setSort({
      field: field as 'price' | 'created_at' | 'area_sqft',
      direction: direction as 'asc' | 'desc'
    });
  };

  return (
    <div>
      {/* Sort controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          {propertiesLoading 
            ? 'Loading properties...' 
            : `${properties.length} ${properties.length === 1 ? 'property' : 'properties'} found`}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">Sort by:</span>
          <Select 
            value={`${sort.field}-${sort.direction}`} 
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="border-gray-300 h-8 text-sm w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at-desc">Newest First</SelectItem>
              <SelectItem value="created_at-asc">Oldest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="area_sqft-asc">Area: Small to Large</SelectItem>
              <SelectItem value="area_sqft-desc">Area: Large to Small</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Property grid */}
      {propertiesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Skeleton className="w-full h-40" />
              <div className="p-3 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-32" />
                <div className="flex space-x-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              cities={cities}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500">
            Try adjusting your search filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
