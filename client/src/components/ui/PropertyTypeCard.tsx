import { Link } from "wouter";
import { ReactNode } from "react";

interface PropertyTypeCardProps {
  icon: ReactNode;
  title: string;
  count: string;
  colorClass: string;
  propertyType: string;
  listingType?: string;
}

const PropertyTypeCard = ({ 
  icon, 
  title, 
  count, 
  colorClass,
  propertyType,
  listingType
}: PropertyTypeCardProps) => {
  // Construct the link URL with proper filters
  const getUrl = () => {
    const params = new URLSearchParams();
    params.append('property_type', propertyType);
    if (listingType) {
      params.append('listing_type', listingType);
    }
    return `/properties?${params.toString()}`;
  };

  return (
    <Link href={getUrl()}>
      <a className="bg-light rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition duration-200">
        <div className={`w-16 h-16 bg-${colorClass}-100 rounded-full flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <h3 className="font-medium text-dark">{title}</h3>
        <p className="text-gray-500 text-xs mt-1">{count}</p>
      </a>
    </Link>
  );
};

export default PropertyTypeCard;
