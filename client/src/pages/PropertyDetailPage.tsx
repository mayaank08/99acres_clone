import { useParams } from "wouter";
import PropertyDetail from "@/components/properties/PropertyDetail";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/lib/types";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const propertyId = parseInt(id || "0");

  // Fetch basic property info for the title/meta tags
  const { data: property } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    queryFn: async () => {
      if (!propertyId) return null;
      const response = await fetch(`/api/properties/${propertyId}`);
      if (!response.ok) throw new Error("Failed to fetch property details");
      return response.json();
    },
    enabled: !!propertyId,
  });

  return (
    <>
      <Helmet>
        <title>
          {property 
            ? `${property.title} | 99acres Clone` 
            : "Property Details | 99acres Clone"}
        </title>
        <meta 
          name="description" 
          content={property?.description || "View detailed information about this property including photos, amenities, and contact details."} 
        />
      </Helmet>
      
      <div className="bg-gray-100 py-6">
        {propertyId ? (
          <PropertyDetail propertyId={propertyId} />
        ) : (
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Property ID</h1>
              <p className="text-gray-600">The property you're looking for doesn't exist or has an invalid ID.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyDetailPage;
