import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertPropertySchema, 
  insertInquirySchema, 
  insertFavoriteSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // User authentication middleware
  const authenticateUser = async (req: Request, res: Response, next: Function) => {
    const userId = req.session?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  };

  // User routes
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // Create user
      const user = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      // Set session
      req.session.userId = user.id;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      return res.status(500).json({ message: "Error creating user" });
    }
  });

  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Set session
      req.session.userId = user.id;
      
      // Remove password from response
      const { password: pass, ...userWithoutPassword } = user;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: "Error logging in" });
    }
  });

  app.post("/api/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/user", authenticateUser, (req: Request, res: Response) => {
    const { password, ...userWithoutPassword } = req.user;
    return res.status(200).json(userWithoutPassword);
  });

  // City routes
  app.get("/api/cities", async (req: Request, res: Response) => {
    try {
      const cities = await storage.getCities();
      return res.status(200).json(cities);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving cities" });
    }
  });

  app.get("/api/cities/:id/localities", async (req: Request, res: Response) => {
    try {
      const cityId = parseInt(req.params.id);
      const localities = await storage.getLocalitiesByCityId(cityId);
      return res.status(200).json(localities);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving localities" });
    }
  });

  // Property routes
  app.get("/api/properties", async (req: Request, res: Response) => {
    try {
      const { city, locality, property_type, listing_type, bedrooms, min_price, max_price, min_area, max_area, limit, offset } = req.query;
      
      let filters: any = {};
      
      if (city) filters.city_id = parseInt(city as string);
      if (locality) filters.locality_id = parseInt(locality as string);
      if (property_type) filters.property_type = property_type;
      if (listing_type) filters.listing_type = listing_type;
      if (bedrooms) filters.bedrooms = parseInt(bedrooms as string);
      
      const properties = await storage.getProperties(
        filters, 
        limit ? parseInt(limit as string) : undefined,
        offset ? parseInt(offset as string) : 0
      );
      
      // Filter by price and area if provided (these need special handling)
      let filteredProperties = properties;
      
      if (min_price || max_price) {
        filteredProperties = filteredProperties.filter(property => {
          const minPriceFilter = min_price ? property.price >= parseInt(min_price as string) : true;
          const maxPriceFilter = max_price ? property.price <= parseInt(max_price as string) : true;
          return minPriceFilter && maxPriceFilter;
        });
      }
      
      if (min_area || max_area) {
        filteredProperties = filteredProperties.filter(property => {
          const minAreaFilter = min_area ? property.area_sqft >= parseInt(min_area as string) : true;
          const maxAreaFilter = max_area ? property.area_sqft <= parseInt(max_area as string) : true;
          return minAreaFilter && maxAreaFilter;
        });
      }
      
      return res.status(200).json(filteredProperties);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving properties" });
    }
  });

  app.get("/api/properties/featured", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const properties = await storage.getFeaturedProperties(limit);
      return res.status(200).json(properties);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving featured properties" });
    }
  });

  app.get("/api/properties/recent", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const properties = await storage.getRecentProperties(limit);
      return res.status(200).json(properties);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving recent properties" });
    }
  });

  app.get("/api/properties/:id", async (req: Request, res: Response) => {
    try {
      const propertyId = parseInt(req.params.id);
      const property = await storage.getPropertyById(propertyId);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      return res.status(200).json(property);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving property" });
    }
  });

  app.post("/api/properties", authenticateUser, async (req: Request, res: Response) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      
      // Set owner_id to current user
      propertyData.owner_id = req.user.id;
      
      const property = await storage.createProperty(propertyData);
      return res.status(201).json(property);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      return res.status(500).json({ message: "Error creating property" });
    }
  });

  app.put("/api/properties/:id", authenticateUser, async (req: Request, res: Response) => {
    try {
      const propertyId = parseInt(req.params.id);
      const property = await storage.getPropertyById(propertyId);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      // Check if user is the owner
      if (property.owner_id !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to edit this property" });
      }
      
      const updatedProperty = await storage.updateProperty(propertyId, req.body);
      return res.status(200).json(updatedProperty);
    } catch (error) {
      return res.status(500).json({ message: "Error updating property" });
    }
  });

  app.delete("/api/properties/:id", authenticateUser, async (req: Request, res: Response) => {
    try {
      const propertyId = parseInt(req.params.id);
      const property = await storage.getPropertyById(propertyId);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      // Check if user is the owner
      if (property.owner_id !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this property" });
      }
      
      await storage.deleteProperty(propertyId);
      return res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting property" });
    }
  });

  // Agent routes
  app.get("/api/agents", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const agents = await storage.getAgents(limit);
      
      // Get user data for each agent
      const agentsWithUserData = await Promise.all(agents.map(async (agent) => {
        const user = await storage.getUser(agent.user_id);
        return {
          ...agent,
          name: user?.name,
          email: user?.email,
          phone: user?.phone
        };
      }));
      
      return res.status(200).json(agentsWithUserData);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving agents" });
    }
  });

  app.get("/api/agents/:id", async (req: Request, res: Response) => {
    try {
      const agentId = parseInt(req.params.id);
      const agent = await storage.getAgentById(agentId);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Get user data
      const user = await storage.getUser(agent.user_id);
      
      return res.status(200).json({
        ...agent,
        name: user?.name,
        email: user?.email,
        phone: user?.phone
      });
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving agent" });
    }
  });

  // Favorites routes
  app.get("/api/favorites", authenticateUser, async (req: Request, res: Response) => {
    try {
      const favorites = await storage.getFavoritesByUser(req.user.id);
      return res.status(200).json(favorites);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving favorites" });
    }
  });

  app.post("/api/favorites", authenticateUser, async (req: Request, res: Response) => {
    try {
      const favoriteData = insertFavoriteSchema.parse({
        ...req.body,
        user_id: req.user.id
      });
      
      // Check if property exists
      const property = await storage.getPropertyById(favoriteData.property_id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      // Check if favorite already exists
      const existingFavorite = await storage.getFavorite(
        favoriteData.user_id, 
        favoriteData.property_id
      );
      
      if (existingFavorite) {
        return res.status(400).json({ message: "Property already in favorites" });
      }
      
      const favorite = await storage.addFavorite(favoriteData);
      return res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      return res.status(500).json({ message: "Error adding to favorites" });
    }
  });

  app.delete("/api/favorites/:propertyId", authenticateUser, async (req: Request, res: Response) => {
    try {
      const propertyId = parseInt(req.params.propertyId);
      const userId = req.user.id;
      
      const removed = await storage.removeFavorite(userId, propertyId);
      
      if (!removed) {
        return res.status(404).json({ message: "Favorite not found" });
      }
      
      return res.status(200).json({ message: "Removed from favorites" });
    } catch (error) {
      return res.status(500).json({ message: "Error removing from favorites" });
    }
  });

  // Inquiry routes
  app.post("/api/inquiries", async (req: Request, res: Response) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      
      // Check if property exists
      const property = await storage.getPropertyById(inquiryData.property_id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      // Set user_id if user is authenticated
      if (req.session?.userId) {
        inquiryData.user_id = req.session.userId;
      }
      
      const inquiry = await storage.createInquiry(inquiryData);
      return res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      return res.status(500).json({ message: "Error submitting inquiry" });
    }
  });

  app.get("/api/inquiries", authenticateUser, async (req: Request, res: Response) => {
    try {
      const inquiries = await storage.getInquiriesByOwner(req.user.id);
      return res.status(200).json(inquiries);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving inquiries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
