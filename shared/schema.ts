import { pgTable, text, serial, integer, boolean, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const propertyTypeEnum = pgEnum('property_type', [
  'apartment', 
  'house', 
  'villa', 
  'plot', 
  'commercial',
  'pg',
]);

export const listingTypeEnum = pgEnum('listing_type', ['sale', 'rent', 'pg']);

export const userRoleEnum = pgEnum('user_role', ['buyer', 'seller', 'agent', 'builder', 'admin']);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone"),
  role: userRoleEnum("role").notNull().default('buyer'),
  created_at: timestamp("created_at").defaultNow(),
});

// Cities table
export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  state: text("state").notNull(),
  property_count: integer("property_count").default(0),
  image_url: text("image_url"),
});

// Localities table
export const localities = pgTable("localities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city_id: integer("city_id").notNull(),
});

// Properties table
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  property_type: propertyTypeEnum("property_type").notNull(),
  listing_type: listingTypeEnum("listing_type").notNull(),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  area_sqft: integer("area_sqft").notNull(),
  address: text("address").notNull(),
  locality_id: integer("locality_id").notNull(),
  city_id: integer("city_id").notNull(),
  state: text("state").notNull(),
  pincode: text("pincode"),
  owner_id: integer("owner_id").notNull(),
  featured: boolean("featured").default(false),
  premium: boolean("premium").default(false),
  verified: boolean("verified").default(false),
  status: text("status").default("active"),
  amenities: jsonb("amenities").default([]),
  images: jsonb("images").default([]),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Agents table
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().unique(),
  speciality: text("speciality"),
  experience_years: integer("experience_years").default(0),
  properties_count: integer("properties_count").default(0),
  rating: integer("rating").default(0),
  reviews_count: integer("reviews_count").default(0),
  description: text("description"),
  photo: text("photo"),
  verified: boolean("verified").default(false),
});

// User favorites
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(),
  property_id: integer("property_id").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// Contact inquiries
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  property_id: integer("property_id").notNull(),
  user_id: integer("user_id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  created_at: timestamp("created_at").defaultNow(),
  status: text("status").default("new"),
});

// Schemas for insert operations
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true
});

export const insertCitySchema = createInsertSchema(cities).omit({
  id: true
});

export const insertLocalitySchema = createInsertSchema(localities).omit({
  id: true
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  created_at: true,
  updated_at: true
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  created_at: true
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  created_at: true,
  status: true
});

// Types for API interactions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type City = typeof cities.$inferSelect;
export type InsertCity = z.infer<typeof insertCitySchema>;

export type Locality = typeof localities.$inferSelect;
export type InsertLocality = z.infer<typeof insertLocalitySchema>;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
