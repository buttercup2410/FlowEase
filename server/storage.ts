import { 
  users, type User, type InsertUser,
  cycleData, type CycleData, type InsertCycleData,
  products as productsSchema, type Product, type InsertProduct,
  productFlowTypes, type ProductFlowType, type InsertProductFlowType,
  subscriptions, type Subscription, type InsertSubscription,
  subscriptionProducts, type SubscriptionProduct, type InsertSubscriptionProduct,
  emergencyDeliveries, type EmergencyDelivery, type InsertEmergencyDelivery
} from "@shared/schema";

// Define the interface with all CRUD methods needed for the app
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cycle data methods
  getCycleDataByUser(userId: number): Promise<CycleData | undefined>;
  createCycleData(data: InsertCycleData): Promise<CycleData>;
  updateCycleData(id: number, data: InsertCycleData): Promise<CycleData>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductFlowTypes(productId: number): Promise<string[]>;
  
  // Subscription methods
  getSubscriptionByUser(userId: number): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptionProducts(subscriptionId: number): Promise<SubscriptionProduct[]>;
  addSubscriptionProduct(product: InsertSubscriptionProduct): Promise<SubscriptionProduct>;
  
  // Emergency delivery methods
  getEmergencyDeliveriesByUser(userId: number): Promise<EmergencyDelivery[]>;
  createEmergencyDelivery(delivery: InsertEmergencyDelivery): Promise<EmergencyDelivery>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cycleDataMap: Map<number, CycleData>;
  private products: Map<number, Product>;
  private productFlowTypes: Map<number, ProductFlowType[]>;
  private subscriptions: Map<number, Subscription>;
  private subscriptionProducts: Map<number, SubscriptionProduct[]>;
  private emergencyDeliveries: Map<number, EmergencyDelivery[]>;
  private userIdCounter: number;
  private cycleDataIdCounter: number;
  private productIdCounter: number;
  private productFlowTypeIdCounter: number;
  private subscriptionIdCounter: number;
  private subscriptionProductIdCounter: number;
  private emergencyDeliveryIdCounter: number;

  constructor() {
    this.users = new Map();
    this.cycleDataMap = new Map();
    this.products = new Map();
    this.productFlowTypes = new Map();
    this.subscriptions = new Map();
    this.subscriptionProducts = new Map();
    this.emergencyDeliveries = new Map();
    this.userIdCounter = 1;
    this.cycleDataIdCounter = 1;
    this.productIdCounter = 1;
    this.productFlowTypeIdCounter = 1;
    this.subscriptionIdCounter = 1;
    this.subscriptionProductIdCounter = 1;
    this.emergencyDeliveryIdCounter = 1;

    // Initialize products
    this.initializeProducts();
  }

  private initializeProducts() {
    const initialProducts = [
      {
        id: this.productIdCounter++,
        name: "Organic Cotton Tampons",
        description: "Pack of 18 biodegradable tampons made from 100% organic cotton.",
        shortDescription: "Pack of 18",
        price: 5.9, // Store as cents
        imageUrl: "/images/products/1.jpeg",
        category: "tampons",
        isEcoCertified: true,
        popularity: 95,
        ecoRating: 9,
        unit: "pack"
      },
      {
        id: this.productIdCounter++,
        name: "Reusable Menstrual Cup",
        description: "Medical-grade silicone cup that can be used for years. Available in multiple sizes.",
        shortDescription: "One size",
        price: 5.9,
        imageUrl: "/images/products/3.jpeg",
        category: "cups",
        isEcoCertified: true,
        popularity: 85,
        ecoRating: 10,
        unit: "cup"
      },
      {
        id: this.productIdCounter++,
        name: "Reusable Organic Cotton Pads",
        description: "Set of 5 washable pads made from organic cotton with leak-proof backing.",
        shortDescription: "Set of 5",
        price: 4.9,
        imageUrl: "/images/products/4.jpeg",
        category: "pads",
        isEcoCertified: true,
        popularity: 78,
        ecoRating: 10,
        unit: "set"
      },
      {
        id: this.productIdCounter++,
        name: "Period Underwear",
        description: "Absorbent underwear that replaces disposable products. Machine washable.",
        shortDescription: "One pair",
        price: 6.9,
        imageUrl: "/images/products/2.jpeg",
        category: "period-underwear",
        isEcoCertified: true,
        popularity: 90,
        ecoRating: 9,
        unit: "pair"
      }
    ];

    // Add products to storage
    initialProducts.forEach(product => {
      this.products.set(product.id, product);
    });

    // Add flow types for each product
    const flowTypeMap = {
      1: ["light", "moderate"],
      2: ["light", "moderate", "heavy", "variable"],
      3: ["moderate", "heavy"],
      4: ["light", "moderate", "variable"]
    };

    Object.entries(flowTypeMap).forEach(([productId, flowTypes]) => {
      const productFlowTypesList = flowTypes.map(flowType => ({
        id: this.productFlowTypeIdCounter++,
        productId: parseInt(productId),
        flowType
      }));
      this.productFlowTypes.set(parseInt(productId), productFlowTypesList);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { id, ...userData };
    this.users.set(id, user);
    return user;
  }

  // Cycle data methods
  async getCycleDataByUser(userId: number): Promise<CycleData | undefined> {
    return Array.from(this.cycleDataMap.values()).find(
      (data) => data.userId === userId
    );
  }

  async createCycleData(data: InsertCycleData): Promise<CycleData> {
    const id = this.cycleDataIdCounter++;
    const cycleData: CycleData = { id, ...data };
    this.cycleDataMap.set(id, cycleData);
    return cycleData;
  }

  async updateCycleData(id: number, data: InsertCycleData): Promise<CycleData> {
    const existingData = this.cycleDataMap.get(id);
    if (!existingData) {
      throw new Error("Cycle data not found");
    }
    
    const updatedData: CycleData = { ...existingData, ...data };
    this.cycleDataMap.set(id, updatedData);
    return updatedData;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductFlowTypes(productId: number): Promise<string[]> {
    const flowTypes = this.productFlowTypes.get(productId) || [];
    return flowTypes.map(ft => ft.flowType);
  }

  // Subscription methods
  async getSubscriptionByUser(userId: number): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(
      (sub) => sub.userId === userId && sub.active
    );
  }

  async createSubscription(subscriptionData: InsertSubscription): Promise<Subscription> {
    const id = this.subscriptionIdCounter++;
    const subscription: Subscription = { id, ...subscriptionData };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async getSubscriptionProducts(subscriptionId: number): Promise<SubscriptionProduct[]> {
    return this.subscriptionProducts.get(subscriptionId) || [];
  }

  async addSubscriptionProduct(productData: InsertSubscriptionProduct): Promise<SubscriptionProduct> {
    const id = this.subscriptionProductIdCounter++;
    const product: SubscriptionProduct = { id, ...productData };
    
    const existingProducts = this.subscriptionProducts.get(productData.subscriptionId) || [];
    this.subscriptionProducts.set(productData.subscriptionId, [...existingProducts, product]);
    
    return product;
  }

  // Emergency delivery methods
  async getEmergencyDeliveriesByUser(userId: number): Promise<EmergencyDelivery[]> {
    return this.emergencyDeliveries.get(userId) || [];
  }

  async createEmergencyDelivery(deliveryData: InsertEmergencyDelivery): Promise<EmergencyDelivery> {
    const id = this.emergencyDeliveryIdCounter++;
    const delivery: EmergencyDelivery = { id, ...deliveryData };
    
    const existingDeliveries = this.emergencyDeliveries.get(deliveryData.userId) || [];
    this.emergencyDeliveries.set(deliveryData.userId, [...existingDeliveries, delivery]);
    
    return delivery;
  }
}

export const storage = new MemStorage();
