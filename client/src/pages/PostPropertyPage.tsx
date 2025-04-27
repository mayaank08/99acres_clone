import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { City, InsertProperty } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Helmet } from "react-helmet";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  property_type: z.enum(["apartment", "house", "villa", "plot", "commercial", "pg"], {
    required_error: "Please select a property type",
  }),
  listing_type: z.enum(["sale", "rent", "pg"], {
    required_error: "Please select a listing type",
  }),
  price: z.coerce.number().positive("Price must be positive"),
  bedrooms: z.coerce.number().min(1).optional(),
  bathrooms: z.coerce.number().min(1).optional(),
  area_sqft: z.coerce.number().positive("Area must be positive"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  locality_id: z.coerce.number().positive("Please select a locality"),
  city_id: z.coerce.number().positive("Please select a city"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pincode: z.string().min(5, "Pincode must be at least 5 characters").optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, "At least one image URL is required"),
});

const amenitiesList = [
  "Modular Kitchen",
  "Power Backup",
  "Parking",
  "Swimming Pool",
  "Gym",
  "Lift",
  "Garden",
  "Club House",
  "Visitor Parking",
  "24x7 Security",
  "Kids Play Area",
  "Servant Room",
  "Gated Community",
  "Terrace",
  "Lake View",
];

const PostPropertyPage = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [selectedTab, setSelectedTab] = useState("sale");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Check if user is logged in
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/user"],
    onError: () => {
      // Redirect to login if not authenticated
      toast({
        title: "Authentication Required",
        description: "Please login to post a property",
        variant: "destructive",
      });
      navigate("/login");
    }
  });

  // Fetch cities
  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  // Fetch localities based on selected city
  const { data: localities = [] } = useQuery({
    queryKey: [`/api/cities/${form.watch("city_id")}/localities`],
    queryFn: async () => {
      const cityId = form.watch("city_id");
      if (!cityId) return [];
      const response = await fetch(`/api/cities/${cityId}/localities`);
      if (!response.ok) throw new Error("Failed to fetch localities");
      return response.json();
    },
    enabled: !!form.watch("city_id")
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      property_type: "apartment",
      listing_type: "sale",
      price: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      area_sqft: undefined,
      address: "",
      locality_id: undefined,
      city_id: undefined,
      state: "",
      pincode: "",
      amenities: [],
      images: [],
    },
  });

  // Update form when tab changes
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    form.setValue("listing_type", value as "sale" | "rent" | "pg");
  };

  // Handle adding image URLs
  const handleAddImage = () => {
    if (newImageUrl.trim() === "") return;
    
    setImageUrls([...imageUrls, newImageUrl]);
    form.setValue("images", [...imageUrls, newImageUrl]);
    setNewImageUrl("");
  };

  // Handle removing image URLs
  const handleRemoveImage = (index: number) => {
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls);
    form.setValue("images", newUrls);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: InsertProperty) => {
      const response = await apiRequest("POST", "/api/properties", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Property Listed Successfully",
        description: "Your property has been published.",
      });
      navigate(`/properties/${data.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create property listing",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Submit the property data
    mutate(data);
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Post a Property | 99acres Clone</title>
        <meta name="description" content="List your property for sale or rent on 99acres Clone. Reach millions of potential buyers and tenants." />
      </Helmet>
      
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Post Your Property</CardTitle>
              <CardDescription>
                Fill in the details below to list your property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="sale">Sell</TabsTrigger>
                  <TabsTrigger value="rent">Rent</TabsTrigger>
                  <TabsTrigger value="pg">PG/Co-living</TabsTrigger>
                </TabsList>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Basic Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="property_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">Independent House</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="plot">Plot</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                {selectedTab === "pg" && (
                                  <SelectItem value="pg">PG/Co-living</SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input placeholder="E.g., 3 BHK Apartment in Powai" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (₹)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder={selectedTab === "rent" ? "Monthly rent" : "Property price"} 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {form.watch("property_type") !== "plot" && form.watch("property_type") !== "commercial" && (
                          <>
                            <FormField
                              control={form.control}
                              name="bedrooms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bedrooms</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="No. of bedrooms" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="bathrooms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bathrooms</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="No. of bathrooms" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                        
                        <FormField
                          control={form.control}
                          name="area_sqft"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Area (sqft)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Area in square feet" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your property in detail" 
                                {...field} 
                                rows={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Location */}
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-medium">Location</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <Select 
                                value={field.value?.toString() || ""} 
                                onValueChange={(value) => {
                                  form.setValue("city_id", Number(value));
                                  form.setValue("locality_id", undefined); // Reset locality when city changes
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select city" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {cities.map((city) => (
                                    <SelectItem key={city.id} value={city.id.toString()}>
                                      {city.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="locality_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Locality</FormLabel>
                              <Select 
                                value={field.value?.toString() || ""} 
                                onValueChange={(value) => form.setValue("locality_id", Number(value))}
                                disabled={!form.watch("city_id")}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select locality" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {localities.map((locality: any) => (
                                    <SelectItem key={locality.id} value={locality.id.toString()}>
                                      {locality.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pincode</FormLabel>
                              <FormControl>
                                <Input placeholder="Pincode" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Complete address of the property" 
                                {...field} 
                                rows={2}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Amenities */}
                    {form.watch("property_type") !== "plot" && (
                      <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-medium">Amenities</h3>
                        
                        <FormField
                          control={form.control}
                          name="amenities"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {amenitiesList.map((amenity) => (
                                  <FormField
                                    key={amenity}
                                    control={form.control}
                                    name="amenities"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={amenity}
                                          className="flex flex-row items-start space-x-2 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(amenity)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...(field.value || []), amenity])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== amenity
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal">
                                            {amenity}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Images */}
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-medium">Images</h3>
                      
                      <div className="flex space-x-2">
                        <Input
                          type="text"
                          placeholder="Enter image URL"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                        />
                        <Button 
                          type="button" 
                          onClick={handleAddImage}
                          variant="outline"
                        >
                          Add
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={url} 
                              alt={`Property image ${index + 1}`} 
                              className="w-full h-24 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {form.formState.errors.images && (
                        <p className="text-sm text-red-500">{form.formState.errors.images.message}</p>
                      )}
                      
                      <FormDescription>
                        Please add at least one image URL for your property.
                      </FormDescription>
                    </div>
                    
                    {/* Submit button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-red-700"
                      disabled={isPending}
                    >
                      {isPending ? "Submitting..." : "Post Property"}
                    </Button>
                  </form>
                </Form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PostPropertyPage;
