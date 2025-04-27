import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HeartIcon } from "@/assets/icons";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface FavoriteButtonProps {
  propertyId: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const FavoriteButton = ({ propertyId, className = "", size = "sm" }: FavoriteButtonProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check if user is logged in
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/user"],
    retry: false,
    onError: () => null // Silently fail if not logged in
  });

  // Check if property is in favorites
  const { data: favorites = [], isLoading: favoritesLoading } = useQuery({
    queryKey: ["/api/favorites"],
    retry: false,
    enabled: !!user, // Only run if user is logged in
    onError: () => null // Silently fail
  });

  const isFavorite = Array.isArray(favorites) && favorites.some(
    (fav) => fav.property_id === propertyId
  );

  // Add to favorites mutation
  const addFavoriteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/favorites", { property_id: propertyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Added to favorites",
        description: "Property has been added to your favorites",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add to favorites",
        variant: "destructive",
      });
    }
  });

  // Remove from favorites mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/favorites/${propertyId}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Removed from favorites",
        description: "Property has been removed from your favorites",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove from favorites",
        variant: "destructive",
      });
    }
  });

  const isLoading = userLoading || favoritesLoading || 
    addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  const toggleFavorite = () => {
    if (!user) {
      // Redirect to login if not logged in
      toast({
        title: "Login Required",
        description: "Please login to add properties to favorites",
        variant: "default",
      });
      return;
    }

    if (isFavorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  // Size classes
  const sizeClasses = {
    sm: "p-1 text-base",
    md: "p-2 text-lg",
    lg: "p-3 text-xl"
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`${className} text-white bg-gray-800 bg-opacity-50 rounded-full ${sizeClasses[size]} hover:bg-opacity-70 transition-all focus:outline-none`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <HeartIcon filled={isFavorite} />
    </button>
  );
};

export default FavoriteButton;
