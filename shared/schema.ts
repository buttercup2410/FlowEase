import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Cycle data schema
export const cycleData = pgTable("cycle_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  startDate: text("start_date").notNull(),
  cycleLength: integer("cycle_length").notNull(),
  flowType: text("flow_type").notNull(),
});

export const insertCycleDataSchema = createInsertSchema(cycleData).pick({
  userId: true,
  startDate: true,
  cycleLength: true,
  flowType: true,
});

export type InsertCycleData = z.infer<typeof insertCycleDataSchema>;
export type CycleData = typeof cycleData.$inferSelect;

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  price: integer("price").notNull(), // Store as cents
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  isEcoCertified: boolean("is_eco_certified").notNull(),
  popularity: integer("popularity").notNull(),
  ecoRating: integer("eco_rating").notNull(),
  unit: text("unit").notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  shortDescription: true,
  price: true,
  imageUrl: true,
  category: true,
  isEcoCertified: true,
  popularity: true,
  ecoRating: true,
  unit: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Product flow types schema
export const productFlowTypes = pgTable("product_flow_types", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  flowType: text("flow_type").notNull(),
});

export const insertProductFlowTypeSchema = createInsertSchema(productFlowTypes).pick({
  productId: true,
  flowType: true,
});

export type InsertProductFlowType = z.infer<typeof insertProductFlowTypeSchema>;
export type ProductFlowType = typeof productFlowTypes.$inferSelect;

// Subscription schema
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  frequency: text("frequency").notNull(),
  active: boolean("active").notNull().default(true),
  nextDeliveryDate: text("next_delivery_date"),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  userId: true,
  frequency: true,
  active: true,
  nextDeliveryDate: true,
});

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

// Subscription product schema
export const subscriptionProducts = pgTable("subscription_products", {
  id: serial("id").primaryKey(),
  subscriptionId: integer("subscription_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
});

export const insertSubscriptionProductSchema = createInsertSchema(subscriptionProducts).pick({
  subscriptionId: true,
  productId: true,
  quantity: true,
});

export type InsertSubscriptionProduct = z.infer<typeof insertSubscriptionProductSchema>;
export type SubscriptionProduct = typeof subscriptionProducts.$inferSelect;

// Emergency delivery schema
export const emergencyDeliveries = pgTable("emergency_deliveries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productId: integer("product_id").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  notes: text("notes"),
  date: text("date").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const insertEmergencyDeliverySchema = createInsertSchema(emergencyDeliveries).pick({
  userId: true,
  productId: true,
  address: true,
  phone: true,
  notes: true,
  date: true,
  completed: true,
});

export type InsertEmergencyDelivery = z.infer<typeof insertEmergencyDeliverySchema>;
export type EmergencyDelivery = typeof emergencyDeliveries.$inferSelect;
