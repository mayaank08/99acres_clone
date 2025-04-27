import { Agent } from "@/lib/types";
import { StarIcon, StarHalfIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { generateRatingStars } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const agentName = agent.name || "Real Estate Agent";

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <img 
            src={agent.photo || "https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg"} 
            alt={`${agentName} Photo`} 
            className="w-16 h-16 rounded-full object-cover" 
          />
          <div>
            <h3 className="font-medium text-dark">{agentName}</h3>
            <p className="text-gray-500 text-xs">{agent.speciality || 'Real Estate Agent'}</p>
            <div className="flex items-center mt-1">
              {generateRatingStars(agent.rating).map((type, index) => (
                type === 'full' ? (
                  <StarIcon key={index} />
                ) : type === 'half' ? (
                  <StarHalfIcon key={index} />
                ) : (
                  <StarIcon key={index} filled={false} />
                )
              ))}
              <span className="text-xs text-gray-500 ml-1">({agent.reviews_count})</span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Properties:</span>
            <span className="font-medium">{agent.properties_count}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Experience:</span>
            <span className="font-medium">{agent.experience_years} Years</span>
          </div>
        </div>
        {agent.description && (
          <p className="mt-3 text-sm text-gray-500 line-clamp-2">{agent.description}</p>
        )}
        <Button 
          variant="outline" 
          className="w-full mt-4 border border-primary text-primary py-2 rounded text-sm font-medium hover:bg-primary hover:text-white transition duration-200"
        >
          Contact Agent
        </Button>
      </div>
    </div>
  );
};

export default AgentCard;
