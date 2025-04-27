import { Link } from "wouter";
import { CalcIcon, HomeIcon, PercentIcon } from "@/assets/icons";

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  link: string;
  bgColor: string;
}

const PropertyTools = () => {
  const tools: ToolCardProps[] = [
    {
      icon: <CalcIcon />,
      title: "EMI Calculator",
      description: "Calculate your monthly EMI based on loan amount, interest rate and loan tenure.",
      action: "Calculate Now",
      link: "/emi-calculator",
      bgColor: "primary"
    },
    {
      icon: <HomeIcon />,
      title: "Property Valuation",
      description: "Get an estimate of your property's market value based on location and specifications.",
      action: "Check Value",
      link: "/property-valuation",
      bgColor: "secondary"
    },
    {
      icon: <PercentIcon />,
      title: "Home Loan Eligibility",
      description: "Find out how much loan you are eligible for based on your income and existing obligations.",
      action: "Check Eligibility",
      link: "/loan-eligibility",
      bgColor: "accent"
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-dark mb-6">Helpful Real Estate Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ToolCard = ({ icon, title, description, action, link, bgColor }: ToolCardProps) => {
  return (
    <Link href={link}>
      <a className="bg-light rounded-lg p-6 hover:shadow-md transition duration-200 cursor-pointer block">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-12 h-12 bg-${bgColor} bg-opacity-10 rounded-full flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className="font-medium text-lg text-dark">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
        <button className="mt-4 text-primary text-sm font-medium hover:underline">
          {action}
        </button>
      </a>
    </Link>
  );
};

export default PropertyTools;
