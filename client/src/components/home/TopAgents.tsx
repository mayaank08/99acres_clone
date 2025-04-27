import { useQuery } from "@tanstack/react-query";
import { Agent } from "@/lib/types";
import { StarIcon, StarHalfIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { generateRatingStars } from "@/lib/utils";

const TopAgents = () => {
  const { data: agents = [], isLoading } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
    queryFn: async () => {
      const response = await fetch("/api/agents");
      if (!response.ok) throw new Error("Failed to fetch agents");
      return response.json();
    }
  });

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-dark mb-6">Top Real Estate Agents</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-32 mt-1" />
                      <Skeleton className="h-4 w-20 mt-1" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-1" />
                  </div>
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              </div>
            ))
          ) : agents.length > 0 ? (
            // Actual agent cards
            agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200">
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={agent.photo || "https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg"} 
                      alt={`${agent.name || 'Agent'} Photo`} 
                      className="w-16 h-16 rounded-full object-cover" 
                    />
                    <div>
                      <h3 className="font-medium text-dark">{agent.name || 'Agent'}</h3>
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
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border border-primary text-primary py-2 rounded text-sm font-medium hover:bg-primary hover:text-white transition duration-200"
                  >
                    Contact Agent
                  </Button>
                </div>
              </div>
            ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No agents available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopAgents;
