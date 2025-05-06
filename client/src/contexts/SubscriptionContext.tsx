import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types";

export type FrequencyType = "monthly" | "bimonthly" | "quarterly";

export interface SubscriptionProduct {
  productId: number;
  quantity: number;
}

export interface SubscriptionAddress {
  street: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface Subscription {
  products: SubscriptionProduct[];
  frequency: FrequencyType;
  address: SubscriptionAddress;
  active: boolean;
  nextDeliveryDate?: string;
}

export interface EmergencyDelivery {
  productId: number;
  address: string;
  phone: string;
  notes?: string;
  date: string;
  completed: boolean;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  saveSubscription: (subscription: Subscription) => void;
  cancelSubscription: () => void;
  emergencyDeliveries: EmergencyDelivery[];
  createEmergencyDelivery: (data: Omit<EmergencyDelivery, "date" | "completed">) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (isOpen: boolean) => void;
  isPaymentSuccessModalOpen: boolean;
  setIsPaymentSuccessModalOpen: (isOpen: boolean) => void;
  lastOrderDetails: { type: "subscription" | "emergency" | "regular"; date: string } | null;
  setLastOrderDetails: (details: { type: "subscription" | "emergency" | "regular"; date: string } | null) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
  userId?: string;
}

export function SubscriptionProvider({ children, userId }: SubscriptionProviderProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [emergencyDeliveries, setEmergencyDeliveries] = useState<EmergencyDelivery[]>([]);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<{ type: "subscription" | "emergency" | "regular"; date: string } | null>(null);

  // Load subscription from localStorage on initial load
  useEffect(() => {
    if (userId) {
      const storedSubscription = localStorage.getItem(`FlowEase_subscription_${userId}`);
      if (storedSubscription) {
        try {
          setSubscription(JSON.parse(storedSubscription));
        } catch (err) {
          console.error("Failed to parse stored subscription", err);
        }
      }

      const storedDeliveries = localStorage.getItem(`FlowEase_emergency_${userId}`);
      if (storedDeliveries) {
        try {
          setEmergencyDeliveries(JSON.parse(storedDeliveries));
        } catch (err) {
          console.error("Failed to parse stored emergency deliveries", err);
        }
      }
    }
  }, [userId]);

  // Save subscription to localStorage whenever it changes
  useEffect(() => {
    if (userId && subscription) {
      localStorage.setItem(
        `FlowEase_subscription_${userId}`,
        JSON.stringify(subscription)
      );
    }
  }, [subscription, userId]);

  // Save emergency deliveries to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(
        `FlowEase_emergency_${userId}`,
        JSON.stringify(emergencyDeliveries)
      );
    }
  }, [emergencyDeliveries, userId]);

  const saveSubscription = (newSubscription: Subscription) => {
    setSubscription(newSubscription);
    
    // Calculate next delivery date based on frequency
    const today = new Date();
    let nextDate = new Date(today);
    
    switch (newSubscription.frequency) {
      case "monthly":
        nextDate.setMonth(today.getMonth() + 1);
        break;
      case "bimonthly":
        nextDate.setMonth(today.getMonth() + 2);
        break;
      case "quarterly":
        nextDate.setMonth(today.getMonth() + 3);
        break;
    }
    
    setSubscription({
      ...newSubscription,
      active: true,
      nextDeliveryDate: nextDate.toISOString().split('T')[0]
    });
  };

  const cancelSubscription = () => {
    if (subscription) {
      setSubscription({ ...subscription, active: false });
    }
  };

  const createEmergencyDelivery = (data: Omit<EmergencyDelivery, "date" | "completed">) => {
    const newDelivery: EmergencyDelivery = {
      ...data,
      date: new Date().toISOString(),
      completed: false
    };
    
    setEmergencyDeliveries([...emergencyDeliveries, newDelivery]);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        saveSubscription,
        cancelSubscription,
        emergencyDeliveries,
        createEmergencyDelivery,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isPaymentSuccessModalOpen,
        setIsPaymentSuccessModalOpen,
        lastOrderDetails,
        setLastOrderDetails
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
