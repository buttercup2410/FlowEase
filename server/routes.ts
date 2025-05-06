import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCycleDataSchema, 
  insertEmergencyDeliverySchema,
  insertSubscriptionSchema,
  insertSubscriptionProductSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });

  app.get("/api/users/email/:email", async (req, res) => {
    const user = await storage.getUserByEmail(req.params.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });

  app.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Failed to create user" });
    }
  });

  // Cycle data routes
  app.get("/api/cycle-data/:userId", async (req, res) => {
    const cycleData = await storage.getCycleDataByUser(parseInt(req.params.userId));
    if (!cycleData) {
      return res.status(404).json({ message: "Cycle data not found" });
    }
    res.json(cycleData);
  });

  app.post("/api/cycle-data", async (req, res) => {
    try {
      const validatedData = insertCycleDataSchema.parse(req.body);
      const cycleData = await storage.createCycleData(validatedData);
      res.status(201).json(cycleData);
    } catch (error) {
      res.status(400).json({ message: "Failed to create cycle data" });
    }
  });

  app.put("/api/cycle-data/:id", async (req, res) => {
    try {
      const validatedData = insertCycleDataSchema.parse(req.body);
      const cycleData = await storage.updateCycleData(parseInt(req.params.id), validatedData);
      res.json(cycleData);
    } catch (error) {
      res.status(400).json({ message: "Failed to update cycle data" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  // Subscription routes
  app.get("/api/subscriptions/:userId", async (req, res) => {
    const subscription = await storage.getSubscriptionByUser(parseInt(req.params.userId));
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.json(subscription);
  });

  app.post("/api/subscriptions", async (req, res) => {
    try {
      const validatedData = insertSubscriptionSchema.parse(req.body);
      const subscription = await storage.createSubscription(validatedData);
      
      // Add subscription products
      const products = req.body.products || [];
      for (const product of products) {
        await storage.addSubscriptionProduct({
          subscriptionId: subscription.id,
          productId: product.productId,
          quantity: product.quantity
        });
      }
      
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ message: "Failed to create subscription" });
    }
  });

  // Emergency delivery routes
  app.get("/api/emergency-deliveries/:userId", async (req, res) => {
    const deliveries = await storage.getEmergencyDeliveriesByUser(parseInt(req.params.userId));
    res.json(deliveries);
  });

  app.post("/api/emergency-deliveries", async (req, res) => {
    try {
      const validatedData = insertEmergencyDeliverySchema.parse(req.body);
      const delivery = await storage.createEmergencyDelivery(validatedData);
      res.status(201).json(delivery);
    } catch (error) {
      res.status(400).json({ message: "Failed to create emergency delivery" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
