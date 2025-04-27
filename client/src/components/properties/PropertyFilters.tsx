import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PropertySearchFilters, City, Locality } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

interface PropertyFiltersProps {
  initialFilters: PropertySearchFilters;
  onFilterChange: (filters: PropertySearchFilters) => void;
}

const PropertyFilters = ({ initialFilters, onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<PropertySearchFilters>(initialFilters);
  const [location] = useLocation();

  // Fetch cities
  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  // Fetch localities based on selected city
  const { data: localities = [] } = useQuery<Locality[]>({
    queryKey: [`/api/cities/${filters.city_id}/localities`],
    queryFn: async () => {
      if (!filters.city_id) return [];
      const response = await fetch(`/api/cities/${filters.city_id}/localities`);
      if (!response.ok) throw new Error("Failed to fetch localities");
      return response.json();
    },
    enabled: !!filters.city_id
  });

  // Apply filters when they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key: keyof PropertySearchFilters, value: any) => {
    // If changing city, reset locality
    if (key === 'city_id') {
      setFilters({
        ...filters,
        [key]: value,
        locality_id: undefined
      });
    } else {
      setFilters({
        ...filters,
        [key]: value
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  // Check if there are any active filters
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== "" && 
    (Array.isArray(value) ? value.length > 0 : true)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Filter Properties</h3>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Location filters */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select
            value={filters.city_id?.toString() || ""}
            onValueChange={(value) => handleFilterChange('city_id', value ? Number(value) : undefined)}
          >
            <SelectTrigger id="city">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filters.city_id && (
          <div className="space-y-2">
            <Label htmlFor="locality">Locality</Label>
            <Select
              value={filters.locality_id?.toString() || ""}
              onValueChange={(value) => handleFilterChange('locality_id', value ? Number(value) : undefined)}
            >
              <SelectTrigger id="locality">
                <SelectValue placeholder="All Localities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Localities</SelectItem>
                {localities.map((locality) => (
                  <SelectItem key={locality.id} value={locality.id.toString()}>
                    {locality.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Property type and listing type */}
        <div className="space-y-2">
          <Label htmlFor="property-type">Property Type</Label>
          <Select
            value={filters.property_type || ""}
            onValueChange={(value) => handleFilterChange('property_type', value || undefined)}
          >
            <SelectTrigger id="property-type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">Independent House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="plot">Plot</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="pg">PG/Co-living</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="listing-type">Listing Type</Label>
          <Select
            value={filters.listing_type || ""}
            onValueChange={(value) => handleFilterChange('listing_type', value || undefined)}
          >
            <SelectTrigger id="listing-type">
              <SelectValue placeholder="All Listings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Listings</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="pg">PG/Co-living</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price range */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="price">
            <AccordionTrigger>Budget</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="min-price">Min Price</Label>
                    <Select
                      value={filters.min_price?.toString() || ""}
                      onValueChange={(value) => handleFilterChange('min_price', value ? Number(value) : undefined)}
                    >
                      <SelectTrigger id="min-price">
                        <SelectValue placeholder="No Min" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Min</SelectItem>
                        <SelectItem value="1000000">10 Lac</SelectItem>
                        <SelectItem value="2000000">20 Lac</SelectItem>
                        <SelectItem value="3000000">30 Lac</SelectItem>
                        <SelectItem value="5000000">50 Lac</SelectItem>
                        <SelectItem value="10000000">1 Cr</SelectItem>
                        <SelectItem value="20000000">2 Cr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="max-price">Max Price</Label>
                    <Select
                      value={filters.max_price?.toString() || ""}
                      onValueChange={(value) => handleFilterChange('max_price', value ? Number(value) : undefined)}
                    >
                      <SelectTrigger id="max-price">
                        <SelectValue placeholder="No Max" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Max</SelectItem>
                        <SelectItem value="2000000">20 Lac</SelectItem>
                        <SelectItem value="3000000">30 Lac</SelectItem>
                        <SelectItem value="5000000">50 Lac</SelectItem>
                        <SelectItem value="10000000">1 Cr</SelectItem>
                        <SelectItem value="20000000">2 Cr</SelectItem>
                        <SelectItem value="50000000">5 Cr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Bedrooms */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="bedrooms">
            <AccordionTrigger>Bedrooms</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-4 gap-2 pt-2">
                {[1, 2, 3, 4].map((bedroom) => (
                  <Button
                    key={bedroom}
                    variant={filters.bedrooms === bedroom ? "default" : "outline"}
                    className={filters.bedrooms === bedroom ? "bg-primary" : ""}
                    onClick={() => handleFilterChange('bedrooms', filters.bedrooms === bedroom ? undefined : bedroom)}
                  >
                    {bedroom} {bedroom === 1 ? 'BHK' : 'BHK'}
                  </Button>
                ))}
                <Button
                  variant={filters.bedrooms === 5 ? "default" : "outline"}
                  className={filters.bedrooms === 5 ? "bg-primary" : ""}
                  onClick={() => handleFilterChange('bedrooms', filters.bedrooms === 5 ? undefined : 5)}
                >
                  5+ BHK
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Area range */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="area">
            <AccordionTrigger>Area (sqft)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="min-area">Min Area</Label>
                    <Select
                      value={filters.min_area?.toString() || ""}
                      onValueChange={(value) => handleFilterChange('min_area', value ? Number(value) : undefined)}
                    >
                      <SelectTrigger id="min-area">
                        <SelectValue placeholder="No Min" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Min</SelectItem>
                        <SelectItem value="500">500 sqft</SelectItem>
                        <SelectItem value="750">750 sqft</SelectItem>
                        <SelectItem value="1000">1000 sqft</SelectItem>
                        <SelectItem value="1500">1500 sqft</SelectItem>
                        <SelectItem value="2000">2000 sqft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="max-area">Max Area</Label>
                    <Select
                      value={filters.max_area?.toString() || ""}
                      onValueChange={(value) => handleFilterChange('max_area', value ? Number(value) : undefined)}
                    >
                      <SelectTrigger id="max-area">
                        <SelectValue placeholder="No Max" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Max</SelectItem>
                        <SelectItem value="1000">1000 sqft</SelectItem>
                        <SelectItem value="1500">1500 sqft</SelectItem>
                        <SelectItem value="2000">2000 sqft</SelectItem>
                        <SelectItem value="3000">3000 sqft</SelectItem>
                        <SelectItem value="5000">5000 sqft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PropertyFilters;
