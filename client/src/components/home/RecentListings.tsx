import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Property, City, User } from "@/lib/types";
import { formatPrice, formatDate, getRoleLabel } from "@/lib/utils";
import { BedIcon, AreaIcon, RupeeIcon, HeartIcon, UserIcon, UserTieIcon, BuildingIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import FavoriteButton from "../ui/FavoriteButton";

const RecentListings = () => {
  const { data: properties = [], isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/recent"],
    queryFn: async () => {
      const response = await fetch("/api/properties/recent?limit=3");
      if (!response.ok) throw new Error("Failed to fetch recent properties");
      return response.json();
    }
  });

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["/api/users"],
    queryFn: async () => {
      // In a real app, we would have an endpoint to get users
      // For now, we'll just return an empty array
      return [];
    },
    enabled: false
  });

  const getOwnerInfo = (property: Property) => {
    const user = users.find(u => u.id === property.owner_id);
    return {
      name: user?.name || "Owner information not available",
      role: user?.role || "agent"
    };
  };

  const getLocalityName = (localityId: number) => {
    // In a real app, we would fetch this from localities or have it included in the property data
    return "Locality information not available";
  };

  const getCityName = (cityId: number) => {
    const city = cities.find(c => c.id === cityId);
    return city?.name || "Unknown location";
  };

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
          <Skeleton className="w-full h-56 md:h-full" />
        </div>
        <div className="p-4 md:w-3/4 space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-48" />
              <div className="flex items-center mt-2 space-x-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-16 w-full" />
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <Skeleton className="h-6 w-32 ml-auto" />
              <Skeleton className="h-4 w-24 ml-auto mt-1" />
              <Skeleton className="h-4 w-32 ml-auto mt-2" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} className="h-6 w-24" />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-24" />
            <div className="space-x-2">
              <Skeleton className="h-8 w-32 inline-block" />
              <Skeleton className="h-8 w-32 inline-block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-dark">Recently Added Properties</h2>
          <Link href="/properties">
            <a className="text-primary text-sm font-medium hover:underline">View All</a>
          </Link>
        </div>
        
        {/* Property Listings */}
        <div className="space-y-4">
          {propertiesLoading ? (
            // Show loading skeletons
            Array(3).fill(0).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          ) : properties.length > 0 ? (
            // Show actual property listings
            properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 relative">
                    <img 
                      src={property.images[0] || "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"} 
                      alt={property.title} 
                      className="w-full h-56 md:h-full object-cover" 
                    />
                    {property.featured && (
                      <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <FavoriteButton 
                      propertyId={property.id} 
                      className="absolute top-2 right-2"
                    />
                  </div>
                  <div className="p-4 md:w-3/4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h3 className="font-medium text-lg text-dark">{property.title}</h3>
                        <p className="text-gray-500">{getLocalityName(property.locality_id)}, {getCityName(property.city_id)}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-600 space-x-6">
                          {property.bedrooms && (
                            <div><BedIcon /> {property.bedrooms} BHK</div>
                          )}
                          <div><AreaIcon /> {property.area_sqft.toLocaleString()} sqft</div>
                          <div><RupeeIcon /> {Math.round(property.price / property.area_sqft).toLocaleString()}/sqft</div>
                        </div>
                        <p className="mt-3 text-sm text-gray-700">{property.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-primary font-bold text-xl">{formatPrice(property.price)}</div>
                        <div className="text-xs text-gray-500 mt-1">Posted: {formatDate(property.created_at)}</div>
                        <div className="flex items-center justify-end mt-2 text-xs">
                          {getRoleLabel(getOwnerInfo(property).role) === "Agent" ? (
                            <UserTieIcon />
                          ) : getRoleLabel(getOwnerInfo(property).role) === "Builder" ? (
                            <BuildingIcon />
                          ) : (
                            <UserIcon />
                          )}
                          <span>Listed by {getRoleLabel(getOwnerInfo(property).role)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {property.amenities?.slice(0, 5).map((amenity, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Link href={`/properties/${property.id}`}>
                        <a className="text-secondary font-medium text-sm hover:underline">View Details</a>
                      </Link>
                      <div className="space-x-2">
                        <Link href={`/properties/${property.id}#contact`}>
                          <Button size="sm" className="bg-primary text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700">
                            Contact Owner
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="border border-primary text-primary px-3 py-1 rounded text-sm font-medium hover:bg-primary hover:bg-opacity-10">
                          Get Phone No.
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Show empty state
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No recently added properties found.</p>
            </div>
          )}
        </div>
        
        {properties.length > 0 && (
          <div className="mt-6 text-center">
            <Link href="/properties">
              <Button 
                variant="outline" 
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-50"
              >
                Load More Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
