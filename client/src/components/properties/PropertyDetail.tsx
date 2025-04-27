import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Property, City, Locality } from "@/lib/types";
import { 
  formatPrice, 
  formatDate, 
  formatArea, 
  getPropertyTypeLabel, 
  getRoleLabel 
} from "@/lib/utils";
import { 
  BedIcon, 
  AreaIcon, 
  RupeeIcon, 
  MapPinIcon,
  BuildingIcon,
  UserIcon,
  UserTieIcon
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import FavoriteButton from "../ui/FavoriteButton";
import ContactOwnerForm from "./ContactOwnerForm";

interface PropertyDetailProps {
  propertyId: number;
}

const PropertyDetail = ({ propertyId }: PropertyDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: property, isLoading: propertyLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${propertyId}`);
      if (!response.ok) throw new Error("Failed to fetch property details");
      return response.json();
    }
  });

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const renderOwnerTypeIcon = (ownerId: number) => {
    // In a real app, we would determine this based on the owner's role
    // For now, we'll use a simple algorithm based on the owner ID
    if (!ownerId) return <UserIcon />;
    
    if (ownerId % 3 === 0) {
      return <BuildingIcon />;
    } else if (ownerId % 3 === 1) {
      return <UserIcon />;
    } else {
      return <UserTieIcon />;
    }
  };

  const getOwnerType = (ownerId: number): string => {
    // Same as above, in a real app this would come from user data
    if (!ownerId) return "Owner";
    
    if (ownerId % 3 === 0) {
      return "Builder";
    } else if (ownerId % 3 === 1) {
      return "Owner";
    } else {
      return "Agent";
    }
  };

  const getCityName = (cityId: number): string => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : "Unknown Location";
  };

  if (propertyLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-60 w-full rounded" />
              <div className="flex space-x-2 overflow-x-auto">
                {[1, 2, 3].map((_, index) => (
                  <Skeleton key={index} className="h-20 w-20 flex-shrink-0 rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
          <div className="p-4 border-t">
            <Skeleton className="h-8 w-40 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          {/* Property header */}
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-dark">{property.title}</h1>
              <p className="text-gray-600 mt-1">
                <MapPinIcon /> {property.address}, {getCityName(property.city_id)}, {property.state}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-primary font-bold text-2xl">{formatPrice(property.price)}</div>
              <div className="text-gray-500 text-sm mt-1">{formatArea(property.area_sqft)} | {Math.round(property.price / property.area_sqft).toLocaleString()} per sqft</div>
              <div className="text-gray-500 text-sm mt-1">Posted: {formatDate(property.created_at)}</div>
            </div>
          </div>

          {/* Property images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={property.images[selectedImageIndex] || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"} 
                  alt={property.title} 
                  className="w-full h-80 object-cover" 
                />
                <FavoriteButton 
                  propertyId={property.id} 
                  className="absolute top-4 right-4"
                  size="lg"
                />
                {property.featured && (
                  <span className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              
              {/* Thumbnail images */}
              {property.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <button 
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`h-20 w-20 flex-shrink-0 rounded overflow-hidden ${index === selectedImageIndex ? 'ring-2 ring-primary' : ''}`}
                    >
                      <img 
                        src={image} 
                        alt={`${property.title} view ${index + 1}`} 
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact form */}
            <div id="contact">
              <ContactOwnerForm propertyId={property.id} />
            </div>
          </div>

          {/* Property details */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-dark mb-4">Property Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
              <div className="flex items-center">
                <span className="font-medium w-36">Type:</span>
                <span>{getPropertyTypeLabel(property.property_type)}</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-medium w-36">For:</span>
                <span>{property.listing_type === 'sale' ? 'Sale' : property.listing_type === 'rent' ? 'Rent' : 'PG/Co-living'}</span>
              </div>
              
              {property.bedrooms && (
                <div className="flex items-center">
                  <span className="font-medium w-36">Bedrooms:</span>
                  <span>{property.bedrooms} BHK</span>
                </div>
              )}
              
              {property.bathrooms && (
                <div className="flex items-center">
                  <span className="font-medium w-36">Bathrooms:</span>
                  <span>{property.bathrooms}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <span className="font-medium w-36">Area:</span>
                <span>{formatArea(property.area_sqft)}</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-medium w-36">Status:</span>
                <span>{property.status.charAt(0).toUpperCase() + property.status.slice(1)}</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-medium w-36">Listed by:</span>
                <span className="flex items-center">
                  {renderOwnerTypeIcon(property.owner_id)}
                  <span className="ml-1">{getOwnerType(property.owner_id)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Property description */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-dark mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-dark mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Map location - placeholder */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-dark mb-4">Location</h2>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map view would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
