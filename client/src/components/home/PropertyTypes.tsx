import { Link } from "wouter";
import { 
  BuildingIcon, 
  HomeIcon, 
  AreaIcon, 
  CalcIcon 
} from "@/assets/icons";

interface PropertyTypeItem {
  icon: React.ReactNode;
  title: string;
  count: string;
  color: string;
  type: string;
}

const propertyTypes: PropertyTypeItem[] = [
  {
    icon: <BuildingIcon />,
    title: "Apartments",
    count: "28,450+ Properties",
    color: "primary",
    type: "apartment"
  },
  {
    icon: <HomeIcon />,
    title: "Independent Houses",
    count: "12,780+ Properties",
    color: "secondary",
    type: "house"
  },
  {
    icon: <AreaIcon />,
    title: "Plots & Land",
    count: "9,320+ Properties",
    color: "accent",
    type: "plot"
  },
  {
    icon: <CalcIcon />,
    title: "Commercial",
    count: "5,670+ Properties",
    color: "primary",
    type: "commercial"
  }
];

const PropertyTypes = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-dark mb-6">Browse by Property Type</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {propertyTypes.map((item, index) => (
            <Link key={index} href={`/properties?property_type=${item.type}`}>
              <a className="bg-light rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition duration-200">
                <div className={`w-16 h-16 bg-${item.color} bg-opacity-10 rounded-full flex items-center justify-center mb-3`}>
                  {item.icon}
                </div>
                <h3 className="font-medium text-dark">{item.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{item.count}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;
