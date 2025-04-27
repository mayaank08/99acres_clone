import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { City } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const PropertiesByCity = () => {
  const { data: cities = [], isLoading } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-dark mb-6">Explore Properties by City</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoading ? (
            // Loading skeletons
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="h-32 w-full" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-5 w-20 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              </div>
            ))
          ) : (
            // Actual city cards
            cities.map((city) => (
              <Link key={city.id} href={`/properties?city=${city.id}`}>
                <a className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition duration-200">
                  <div className="relative h-32">
                    <img 
                      src={city.image_url || "https://images.pexels.com/photos/2437286/pexels-photo-2437286.jpeg"} 
                      alt={city.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition duration-200"></div>
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium text-dark">{city.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">{city.property_count.toLocaleString()}+ Properties</p>
                  </div>
                </a>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertiesByCity;
