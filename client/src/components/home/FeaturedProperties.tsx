import { useRef } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property, City } from "@/lib/types";
import PropertyCard from "@/components/properties/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProperties = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const { data: properties = [], isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-dark">Featured Properties</h2>
          <Link href="/properties?featured=true">
            <a className="text-primary text-sm font-medium hover:underline">View All</a>
          </Link>
        </div>
        
        {/* Property Card Slider */}
        <div 
          className="property-slider overflow-x-auto pb-4"
          ref={sliderRef}
        >
          <div className="flex space-x-4 w-max">
            {propertiesLoading ? (
              // Loading skeletons
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="w-64 flex-shrink-0">
                  <Skeleton className="w-full h-40 rounded-t-lg" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : properties.length > 0 ? (
              // Actual property cards
              properties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  cities={cities}
                  compact
                />
              ))
            ) : (
              <div className="w-full text-center py-8">
                <p className="text-gray-500">No featured properties available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
