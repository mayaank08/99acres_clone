import { 
  users, type User, type InsertUser, 
  cities, type City, type InsertCity,
  localities, type Locality, type InsertLocality,
  properties, type Property, type InsertProperty,
  agents, type Agent, type InsertAgent,
  favorites, type Favorite, type InsertFavorite,
  inquiries, type Inquiry, type InsertInquiry
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // City operations
  getCities(): Promise<City[]>;
  getCityById(id: number): Promise<City | undefined>;
  createCity(city: InsertCity): Promise<City>;
  updateCityPropertyCount(id: number, count: number): Promise<City | undefined>;
  
  // Locality operations
  getLocalitiesByCityId(cityId: number): Promise<Locality[]>;
  getLocalityById(id: number): Promise<Locality | undefined>;
  createLocality(locality: InsertLocality): Promise<Locality>;
  
  // Property operations
  getProperties(filters?: Partial<Property>, limit?: number, offset?: number): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  getFeaturedProperties(limit?: number): Promise<Property[]>;
  getRecentProperties(limit?: number): Promise<Property[]>;
  getPropertiesByOwner(ownerId: number): Promise<Property[]>;
  getPropertiesByCity(cityId: number): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<Property>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Agent operations
  getAgents(limit?: number): Promise<Agent[]>;
  getAgentById(id: number): Promise<Agent | undefined>;
  getAgentByUserId(userId: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, agent: Partial<Agent>): Promise<Agent | undefined>;
  
  // Favorites operations
  getFavoritesByUser(userId: number): Promise<(Favorite & { property: Property })[]>;
  getFavorite(userId: number, propertyId: number): Promise<Favorite | undefined>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(userId: number, propertyId: number): Promise<boolean>;
  
  // Inquiry operations
  getInquiriesByProperty(propertyId: number): Promise<Inquiry[]>;
  getInquiriesByOwner(ownerId: number): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
}

export class MemStorage implements IStorage {
  private usersData: Map<number, User>;
  private citiesData: Map<number, City>;
  private localitiesData: Map<number, Locality>;
  private propertiesData: Map<number, Property>;
  private agentsData: Map<number, Agent>;
  private favoritesData: Map<number, Favorite>;
  private inquiriesData: Map<number, Inquiry>;
  
  private userIdCounter: number;
  private cityIdCounter: number;
  private localityIdCounter: number;
  private propertyIdCounter: number;
  private agentIdCounter: number;
  private favoriteIdCounter: number;
  private inquiryIdCounter: number;

  constructor() {
    this.usersData = new Map();
    this.citiesData = new Map();
    this.localitiesData = new Map();
    this.propertiesData = new Map();
    this.agentsData = new Map();
    this.favoritesData = new Map();
    this.inquiriesData = new Map();
    
    this.userIdCounter = 1;
    this.cityIdCounter = 1;
    this.localityIdCounter = 1;
    this.propertyIdCounter = 1;
    this.agentIdCounter = 1;
    this.favoriteIdCounter = 1;
    this.inquiryIdCounter = 1;
    
    // Initialize with sample data
    this.seedData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersData.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, created_at: createdAt };
    this.usersData.set(id, user);
    return user;
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User | undefined> {
    const user = this.usersData.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updateData };
    this.usersData.set(id, updatedUser);
    return updatedUser;
  }

  // City operations
  async getCities(): Promise<City[]> {
    return Array.from(this.citiesData.values());
  }

  async getCityById(id: number): Promise<City | undefined> {
    return this.citiesData.get(id);
  }

  async createCity(city: InsertCity): Promise<City> {
    const id = this.cityIdCounter++;
    const newCity: City = { ...city, id };
    this.citiesData.set(id, newCity);
    return newCity;
  }

  async updateCityPropertyCount(id: number, count: number): Promise<City | undefined> {
    const city = this.citiesData.get(id);
    if (!city) return undefined;
    
    const updatedCity = { ...city, property_count: count };
    this.citiesData.set(id, updatedCity);
    return updatedCity;
  }

  // Locality operations
  async getLocalitiesByCityId(cityId: number): Promise<Locality[]> {
    return Array.from(this.localitiesData.values()).filter(
      (locality) => locality.city_id === cityId
    );
  }

  async getLocalityById(id: number): Promise<Locality | undefined> {
    return this.localitiesData.get(id);
  }

  async createLocality(locality: InsertLocality): Promise<Locality> {
    const id = this.localityIdCounter++;
    const newLocality: Locality = { ...locality, id };
    this.localitiesData.set(id, newLocality);
    return newLocality;
  }

  // Property operations
  async getProperties(filters?: Partial<Property>, limit?: number, offset: number = 0): Promise<Property[]> {
    let properties = Array.from(this.propertiesData.values());
    
    if (filters) {
      properties = properties.filter(property => {
        return Object.keys(filters).every(key => {
          const filterKey = key as keyof Property;
          return filters[filterKey] === undefined || property[filterKey] === filters[filterKey];
        });
      });
    }
    
    // Sort by most recent
    properties = properties.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    
    if (limit !== undefined) {
      properties = properties.slice(offset, offset + limit);
    }
    
    return properties;
  }

  async getPropertyById(id: number): Promise<Property | undefined> {
    return this.propertiesData.get(id);
  }

  async getFeaturedProperties(limit: number = 5): Promise<Property[]> {
    const properties = Array.from(this.propertiesData.values())
      .filter(property => property.featured)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return properties.slice(0, limit);
  }

  async getRecentProperties(limit: number = 3): Promise<Property[]> {
    const properties = Array.from(this.propertiesData.values())
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return properties.slice(0, limit);
  }

  async getPropertiesByOwner(ownerId: number): Promise<Property[]> {
    return Array.from(this.propertiesData.values()).filter(
      (property) => property.owner_id === ownerId
    );
  }

  async getPropertiesByCity(cityId: number): Promise<Property[]> {
    return Array.from(this.propertiesData.values()).filter(
      (property) => property.city_id === cityId
    );
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.propertyIdCounter++;
    const now = new Date();
    const property: Property = { 
      ...insertProperty, 
      id, 
      created_at: now, 
      updated_at: now 
    };
    this.propertiesData.set(id, property);
    
    // Update city property count
    const city = this.citiesData.get(property.city_id);
    if (city) {
      this.updateCityPropertyCount(city.id, (city.property_count || 0) + 1);
    }
    
    return property;
  }

  async updateProperty(id: number, updateData: Partial<Property>): Promise<Property | undefined> {
    const property = this.propertiesData.get(id);
    if (!property) return undefined;
    
    const updatedProperty = { 
      ...property, 
      ...updateData, 
      updated_at: new Date() 
    };
    this.propertiesData.set(id, updatedProperty);
    return updatedProperty;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const property = this.propertiesData.get(id);
    if (!property) return false;
    
    // Update city property count
    const city = this.citiesData.get(property.city_id);
    if (city && city.property_count > 0) {
      this.updateCityPropertyCount(city.id, city.property_count - 1);
    }
    
    return this.propertiesData.delete(id);
  }

  // Agent operations
  async getAgents(limit: number = 4): Promise<Agent[]> {
    const agents = Array.from(this.agentsData.values())
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return limit ? agents.slice(0, limit) : agents;
  }

  async getAgentById(id: number): Promise<Agent | undefined> {
    return this.agentsData.get(id);
  }

  async getAgentByUserId(userId: number): Promise<Agent | undefined> {
    return Array.from(this.agentsData.values()).find(
      (agent) => agent.user_id === userId
    );
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const id = this.agentIdCounter++;
    const newAgent: Agent = { ...agent, id };
    this.agentsData.set(id, newAgent);
    return newAgent;
  }

  async updateAgent(id: number, updateData: Partial<Agent>): Promise<Agent | undefined> {
    const agent = this.agentsData.get(id);
    if (!agent) return undefined;
    
    const updatedAgent = { ...agent, ...updateData };
    this.agentsData.set(id, updatedAgent);
    return updatedAgent;
  }

  // Favorites operations
  async getFavoritesByUser(userId: number): Promise<(Favorite & { property: Property })[]> {
    const favorites = Array.from(this.favoritesData.values()).filter(
      (favorite) => favorite.user_id === userId
    );
    
    return favorites.map(favorite => {
      const property = this.propertiesData.get(favorite.property_id);
      return {
        ...favorite,
        property: property!
      };
    }).filter(item => item.property !== undefined);
  }

  async getFavorite(userId: number, propertyId: number): Promise<Favorite | undefined> {
    return Array.from(this.favoritesData.values()).find(
      (favorite) => favorite.user_id === userId && favorite.property_id === propertyId
    );
  }

  async addFavorite(favorite: InsertFavorite): Promise<Favorite> {
    const id = this.favoriteIdCounter++;
    const createdAt = new Date();
    const newFavorite: Favorite = { ...favorite, id, created_at: createdAt };
    this.favoritesData.set(id, newFavorite);
    return newFavorite;
  }

  async removeFavorite(userId: number, propertyId: number): Promise<boolean> {
    const favorite = Array.from(this.favoritesData.values()).find(
      (favorite) => favorite.user_id === userId && favorite.property_id === propertyId
    );
    
    if (!favorite) return false;
    return this.favoritesData.delete(favorite.id);
  }

  // Inquiry operations
  async getInquiriesByProperty(propertyId: number): Promise<Inquiry[]> {
    return Array.from(this.inquiriesData.values()).filter(
      (inquiry) => inquiry.property_id === propertyId
    );
  }

  async getInquiriesByOwner(ownerId: number): Promise<Inquiry[]> {
    // Get all properties owned by this user
    const ownerProperties = Array.from(this.propertiesData.values())
      .filter(property => property.owner_id === ownerId)
      .map(property => property.id);
    
    // Get all inquiries for these properties
    return Array.from(this.inquiriesData.values())
      .filter(inquiry => ownerProperties.includes(inquiry.property_id));
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryIdCounter++;
    const createdAt = new Date();
    const newInquiry: Inquiry = { 
      ...inquiry, 
      id, 
      created_at: createdAt,
      status: 'new'
    };
    this.inquiriesData.set(id, newInquiry);
    return newInquiry;
  }

  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    const inquiry = this.inquiriesData.get(id);
    if (!inquiry) return undefined;
    
    const updatedInquiry = { ...inquiry, status };
    this.inquiriesData.set(id, updatedInquiry);
    return updatedInquiry;
  }

  // Seed data for initial application state
  private seedData(): void {
    // Add sample users
    const user1 = this.createUser({
      username: 'johndoe',
      password: 'password123',
      email: 'john@example.com',
      name: 'John Doe',
      phone: '9876543210',
      role: 'seller'
    });

    const user2 = this.createUser({
      username: 'janesmith',
      password: 'password123',
      email: 'jane@example.com',
      name: 'Jane Smith',
      phone: '8765432109',
      role: 'agent'
    });

    const user3 = this.createUser({
      username: 'buildercorp',
      password: 'password123',
      email: 'info@buildercorp.com',
      name: 'Builder Corp',
      phone: '7654321098',
      role: 'builder'
    });

    // Add sample cities
    const mumbai = this.createCity({
      name: 'Mumbai',
      state: 'Maharashtra',
      property_count: 12450,
      image_url: 'https://images.pexels.com/photos/2437286/pexels-photo-2437286.jpeg'
    });
    
    const delhi = this.createCity({
      name: 'Delhi NCR',
      state: 'Delhi',
      property_count: 15320,
      image_url: 'https://images.pexels.com/photos/4115131/pexels-photo-4115131.jpeg'
    });
    
    const bangalore = this.createCity({
      name: 'Bangalore',
      state: 'Karnataka',
      property_count: 9870,
      image_url: 'https://images.pexels.com/photos/739987/pexels-photo-739987.jpeg'
    });
    
    const hyderabad = this.createCity({
      name: 'Hyderabad',
      state: 'Telangana',
      property_count: 7630,
      image_url: 'https://images.pexels.com/photos/3155782/pexels-photo-3155782.jpeg'
    });
    
    const pune = this.createCity({
      name: 'Pune',
      state: 'Maharashtra',
      property_count: 6920,
      image_url: 'https://images.pexels.com/photos/6822189/pexels-photo-6822189.jpeg'
    });
    
    const chennai = this.createCity({
      name: 'Chennai',
      state: 'Tamil Nadu',
      property_count: 5480,
      image_url: 'https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg'
    });

    // Add sample localities
    const powai = this.createLocality({
      name: 'Powai',
      city_id: 1 // Mumbai
    });
    
    const bandrWest = this.createLocality({
      name: 'Bandra West',
      city_id: 1 // Mumbai
    });
    
    const gurgaon = this.createLocality({
      name: 'Gurgaon',
      city_id: 2 // Delhi NCR
    });
    
    const noidaSector62 = this.createLocality({
      name: 'Noida Sector 62',
      city_id: 2 // Delhi NCR
    });
    
    const whitefield = this.createLocality({
      name: 'Whitefield',
      city_id: 3 // Bangalore
    });
    
    const gachibowli = this.createLocality({
      name: 'Gachibowli',
      city_id: 4 // Hyderabad
    });
    
    const kharadi = this.createLocality({
      name: 'Kharadi',
      city_id: 5 // Pune
    });

    // Add sample agents
    const agent1 = this.createAgent({
      user_id: 2, // Jane Smith
      speciality: 'Mumbai Specialist',
      experience_years: 6,
      properties_count: 45,
      rating: 5,
      reviews_count: 95,
      description: 'Specialized in luxury properties across Mumbai',
      photo: 'https://images.pexels.com/photos/7821672/pexels-photo-7821672.jpeg',
      verified: true
    });
    
    const agent2 = this.createAgent({
      user_id: 3, // Builder Corp
      speciality: 'Delhi NCR Specialist',
      experience_years: 5,
      properties_count: 29,
      rating: 4,
      reviews_count: 76,
      description: 'Focused on residential properties in Delhi NCR',
      photo: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg',
      verified: true
    });

    // Add more agents
    const agent3 = this.createAgent({
      user_id: 1, // John Doe
      speciality: 'Bangalore Specialist',
      experience_years: 8,
      properties_count: 32,
      rating: 4.5,
      reviews_count: 128,
      description: 'Expert in premium apartments and villas',
      photo: 'https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg',
      verified: true
    });
    
    const agent4 = this.createAgent({
      user_id: 3, // Builder Corp (another agent from same company)
      speciality: 'Pune Specialist',
      experience_years: 4,
      properties_count: 27,
      rating: 4.5,
      reviews_count: 64,
      description: 'Specialist in Pune and surrounding areas',
      photo: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg',
      verified: true
    });

    // Add sample properties
    const property1 = this.createProperty({
      title: '3 BHK Apartment in Hiranandani',
      description: 'Modern spacious apartment with premium amenities including club house, swimming pool, gym, and 24/7 security. Ready to move in!',
      property_type: 'apartment',
      listing_type: 'sale',
      price: 8500000, // 85 Lacs
      bedrooms: 3,
      bathrooms: 3,
      area_sqft: 1450,
      address: 'Hiranandani Gardens, Powai',
      locality_id: 1, // Powai
      city_id: 1, // Mumbai
      state: 'Maharashtra',
      pincode: '400076',
      owner_id: 3, // Builder Corp
      featured: true,
      amenities: ['Modular Kitchen', 'Power Backup', 'Parking', 'Swimming Pool', 'Gym'],
      images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg']
    });
    
    const property2 = this.createProperty({
      title: '4 BHK Independent House',
      description: 'Luxurious villa with garden, terrace, modern interiors and all premium amenities. Located in a gated community with excellent connectivity.',
      property_type: 'house',
      listing_type: 'sale',
      price: 12000000, // 1.2 Cr
      bedrooms: 4,
      bathrooms: 4,
      area_sqft: 2200,
      address: 'Whitefield Main Road',
      locality_id: 5, // Whitefield
      city_id: 3, // Bangalore
      state: 'Karnataka',
      pincode: '560066',
      owner_id: 1, // John Doe
      premium: true,
      amenities: ['Garden', 'Terrace', '24x7 Security', 'Club House', 'Servant Room'],
      images: ['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg']
    });
    
    const property3 = this.createProperty({
      title: '2 BHK Apartment with Garden',
      description: 'Beautiful compact apartment with great amenities. Walking distance to tech parks and shopping malls. Excellent investment opportunity.',
      property_type: 'apartment',
      listing_type: 'sale',
      price: 4500000, // 45 Lacs
      bedrooms: 2,
      bathrooms: 2,
      area_sqft: 1050,
      address: 'Sector 62',
      locality_id: 4, // Noida Sector 62
      city_id: 2, // Delhi NCR
      state: 'Delhi',
      pincode: '201301',
      owner_id: 2, // Jane Smith
      amenities: ['Lake View', 'Lift', 'Visitor Parking', 'Kids Play Area'],
      images: ['https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg']
    });
    
    const property4 = this.createProperty({
      title: '3 BHK Premium Apartment',
      description: 'Luxurious apartment with modern amenities in prime location. Close to IT parks and shopping malls.',
      property_type: 'apartment',
      listing_type: 'sale',
      price: 7200000, // 72 Lacs
      bedrooms: 3,
      bathrooms: 3,
      area_sqft: 1680,
      address: 'Financial District',
      locality_id: 6, // Gachibowli
      city_id: 4, // Hyderabad
      state: 'Telangana',
      pincode: '500032',
      owner_id: 3, // Builder Corp
      featured: true,
      amenities: ['Modular Kitchen', 'Power Backup', 'Swimming Pool', 'Club House', 'Gym'],
      images: ['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg']
    });
    
    const property5 = this.createProperty({
      title: '4 BHK Luxury Apartment',
      description: 'Spacious apartment with premium fixtures and fittings. Offers breathtaking views and luxury lifestyle.',
      property_type: 'apartment',
      listing_type: 'sale',
      price: 9500000, // 95 Lacs
      bedrooms: 4,
      bathrooms: 4,
      area_sqft: 2100,
      address: 'Kharadi IT Park',
      locality_id: 7, // Kharadi
      city_id: 5, // Pune
      state: 'Maharashtra',
      pincode: '411014',
      owner_id: 2, // Jane Smith
      amenities: ['Modular Kitchen', '24x7 Security', 'Swimming Pool', 'Gym', 'Club House'],
      images: ['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg']
    });
    
    // Additional properties for recent listings
    const property6 = this.createProperty({
      title: '3 BHK Apartment in Prestige Symphony',
      description: 'Modern spacious apartment with premium amenities including club house, swimming pool, gym, and 24/7 security. Ready to move in!',
      property_type: 'apartment',
      listing_type: 'sale',
      price: 13500000, // 1.35 Cr
      bedrooms: 3,
      bathrooms: 3,
      area_sqft: 1750,
      address: 'Bandra West',
      locality_id: 2, // Bandra West
      city_id: 1, // Mumbai
      state: 'Maharashtra',
      pincode: '400050',
      owner_id: 2, // Jane Smith
      featured: true,
      amenities: ['Modular Kitchen', 'Power Backup', 'Parking', 'Swimming Pool', 'Gym'],
      images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg']
    });
    
    const property7 = this.createProperty({
      title: '4 BHK Villa in Sobha International City',
      description: 'Luxurious villa with garden, terrace, modern interiors and all premium amenities. Located in a gated community with excellent connectivity.',
      property_type: 'villa',
      listing_type: 'sale',
      price: 20500000, // 2.05 Cr
      bedrooms: 4,
      bathrooms: 4,
      area_sqft: 3200,
      address: 'Sobha International City',
      locality_id: 3, // Gurgaon
      city_id: 2, // Delhi NCR
      state: 'Delhi',
      pincode: '122002',
      owner_id: 3, // Builder Corp
      featured: true,
      amenities: ['Garden', 'Terrace', '24x7 Security', 'Club House', 'Servant Room'],
      images: ['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg']
    });
    
    const property8 = this.createProperty({
      title: '2 BHK Apartment in Prestige Lakeside Habitat',
      description: 'Beautiful lake-facing apartment with great amenities. Walking distance to tech parks and shopping malls. Excellent investment opportunity.',
      property_type: 'apartment',
      listing_type: 'sale',
      price: 7250000, // 72.5 Lacs
      bedrooms: 2,
      bathrooms: 2,
      area_sqft: 1250,
      address: 'Prestige Lakeside Habitat',
      locality_id: 5, // Whitefield
      city_id: 3, // Bangalore
      state: 'Karnataka',
      pincode: '560048',
      owner_id: 1, // John Doe
      featured: true,
      amenities: ['Lake View', 'Lift', 'Visitor Parking', 'Kids Play Area'],
      images: ['https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg']
    });
  }
}

export const storage = new MemStorage();
