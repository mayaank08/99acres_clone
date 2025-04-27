import { Link } from "wouter";
import { Property, City } from "@/lib/types";
import { formatPrice, formatDate, getRoleLabel } from "@/lib/utils";
import { 
  BedIcon, 
  AreaIcon, 
  BuildingIcon, 
  UserIcon, 
  UserTieIcon 
} from "@/assets/icons";
import FavoriteButton from "@/components/ui/FavoriteButton";

interface PropertyCardProps {
  property: Property;
  cities: City[];
  compact?: boolean;
}

const PropertyCard = ({ property, cities, compact = false }: PropertyCardProps) => {
  const getCityName = (cityId: number): string => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : "Unknown Location";
  };

  const getOwnerTypeIcon = (ownerId: number): JSX.Element => {
    // In a real app, we would determine this based on the owner's role
    // For now, we'll use a simple algorithm based on the owner ID
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
    if (ownerId % 3 === 0) {
      return "Builder";
    } else if (ownerId % 3 === 1) {
      return "Owner";
    } else {
      return "Agent";
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${compact ? 'w-64 flex-shrink-0' : 'w-full'}`}>
      <div className="relative">
        <img 
          src={property.images[0] || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"} 
          alt={property.title} 
          className="w-full h-40 object-cover" 
        />
        {property.featured && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
        {property.premium && (
          <span className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded">
            Premium
          </span>
        )}
        <FavoriteButton 
          propertyId={property.id} 
          className="absolute top-2 right-2"
        />
      </div>
      <div className="p-3">
        <div className="flex justify-between">
          <span className="text-primary font-bold">{formatPrice(property.price)}</span>
          <span className="text-xs text-gray-500">Posted: {formatDate(property.created_at)}</span>
        </div>
        <Link href={`/properties/${property.id}`}>
          <a>
            <h3 className="font-medium text-dark mt-1 truncate">{property.title}</h3>
          </a>
        </Link>
        <p className="text-gray-500 text-sm">{getCityName(property.city_id)}</p>
        <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
          {property.bedrooms && (
            <div><BedIcon /> {property.bedrooms} BHK</div>
          )}
          <div><AreaIcon /> {property.area_sqft.toLocaleString()} sqft</div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <Link href={`/properties/${property.id}#contact`}>
            <a className="text-xs text-secondary font-medium">Contact Owner</a>
          </Link>
          <div className="flex items-center text-xs">
            {getOwnerTypeIcon(property.owner_id)}
            <span>{getOwnerType(property.owner_id)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
