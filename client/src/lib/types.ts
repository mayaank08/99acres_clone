// Client side type definitions for the application

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  phone?: string;
  role: 'buyer' | 'seller' | 'agent' | 'builder' | 'admin';
  created_at: Date;
}

export interface City {
  id: number;
  name: string;
  state: string;
  property_count: number;
  image_url?: string;
}

export interface Locality {
  id: number;
  name: string;
  city_id: number;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  property_type: 'apartment' | 'house' | 'villa' | 'plot' | 'commercial' | 'pg';
  listing_type: 'sale' | 'rent' | 'pg';
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area_sqft: number;
  address: string;
  locality_id: number;
  city_id: number;
  state: string;
  pincode?: string;
  owner_id: number;
  featured: boolean;
  premium: boolean;
  verified: boolean;
  status: string;
  amenities: string[];
  images: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Agent {
  id: number;
  user_id: number;
  speciality?: string;
  experience_years: number;
  properties_count: number;
  rating: number;
  reviews_count: number;
  description?: string;
  photo?: string;
  verified: boolean;
  name?: string; // From user data
  email?: string; // From user data
  phone?: string; // From user data
}

export interface Favorite {
  id: number;
  user_id: number;
  property_id: number;
  created_at: Date;
  property?: Property;
}

export interface Inquiry {
  id: number;
  property_id: number;
  user_id?: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
  created_at: Date;
  status: string;
}

// Form input types
export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  password: string;
  email: string;
  name: string;
  phone?: string;
  role: 'buyer' | 'seller' | 'agent' | 'builder';
}

export interface PropertySearchFilters {
  city_id?: number;
  locality_id?: number;
  property_type?: string;
  listing_type?: string;
  bedrooms?: number;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  amenities?: string[];
}

export interface InquiryInput {
  property_id: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
}

// Helper types
export interface FormattedProperty extends Property {
  formattedPrice: string;
  formattedDate: string;
  cityName?: string;
  localityName?: string;
  owner?: {
    name: string;
    role: string;
  };
}

export interface PropertySort {
  field: 'price' | 'created_at' | 'area_sqft';
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}
