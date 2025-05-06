import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { format, addDays, differenceInDays } from "date-fns";

export type FlowType = "light" | "moderate" | "heavy" | "variable";

export interface CycleData {
  startDate: string;
  cycleLength: number;
  flowType: FlowType;
}

interface CycleDataContextType {
  cycleData: CycleData | null;
  updateCycleData: (data: CycleData) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  getPhaseForDate: (date: Date) => "menstruation" | "follicular" | "ovulation" | "luteal" | "none";
  getRecommendations: () => any[];
}

const defaultCycleData: CycleData = {
  startDate: format(new Date(), "yyyy-MM-dd"),
  cycleLength: 28,
  flowType: "moderate",
};

const CycleDataContext = createContext<CycleDataContextType | undefined>(undefined);

interface CycleDataProviderProps {
  children: ReactNode;
  userId?: string;
}

export function CycleDataProvider({ children, userId }: CycleDataProviderProps) {
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load cycle data from localStorage when userId changes
  useEffect(() => {
    if (userId) {
      const storedData = localStorage.getItem(`FlowEase_cycle_data_${userId}`);
      if (storedData) {
        try {
          setCycleData(JSON.parse(storedData));
        } catch (err) {
          console.error("Failed to parse stored cycle data", err);
          setCycleData(defaultCycleData);
        }
      } else {
        setCycleData(defaultCycleData);
      }
    }
  }, [userId]);

  const updateCycleData = (data: CycleData) => {
    setCycleData(data);
    if (userId) {
      localStorage.setItem(`FlowEase_cycle_data_${userId}`, JSON.stringify(data));
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const getPhaseForDate = (date: Date): "menstruation" | "follicular" | "ovulation" | "luteal" | "none" => {
    if (!cycleData) return "none";
    
    const startDate = new Date(cycleData.startDate);
    const cycleLength = cycleData.cycleLength;
    
    // Calculate days since the start of the cycle, considering multiple cycles
    let daysSinceStart = differenceInDays(date, startDate);
    
    // If date is before start date, return none
    if (daysSinceStart < 0) return "none";
    
    // Get the day within the current cycle
    const dayInCycle = daysSinceStart % cycleLength;
    
    // Determine phase based on day in cycle
    if (dayInCycle < 5) {
      return "menstruation"; // First ~5 days
    } else if (dayInCycle < 13) {
      return "follicular"; // Days ~6-13
    } else if (dayInCycle < 16) {
      return "ovulation"; // Days ~14-16
    } else {
      return "luteal"; // Days ~17-28
    }
  };

  const getRecommendations = () => {
    if (!cycleData) return [];
    
    // Recommend products based on flow type
    const flowBasedRecommendations = {
      light: [
        { 
          id: 1, 
          name: "Organic Cotton Liners", 
          description: "Perfect for light flow days",
          icon: "leaf"
        },
        { 
          id: 4, 
          name: "Period Underwear (Light)", 
          description: "Comfortable for lighter days",
          icon: "droplet"
        }
      ],
      moderate: [
        { 
          id: 2, 
          name: "Organic Cotton Tampons", 
          description: "Regular absorbency for moderate flow",
          icon: "leaf"
        },
        { 
          id: 5, 
          name: "Reusable Menstrual Cup", 
          description: "Eco-friendly option for your flow type",
          icon: "droplet"
        }
      ],
      heavy: [
        { 
          id: 3, 
          name: "Organic Cotton Pads (Heavy)", 
          description: "Maximum protection for heavy days",
          icon: "shield"
        },
        { 
          id: 5, 
          name: "Reusable Menstrual Cup", 
          description: "High capacity for heavy flow days",
          icon: "droplet"
        }
      ],
      variable: [
        { 
          id: 5, 
          name: "Reusable Menstrual Cup", 
          description: "Adaptable for all flow types",
          icon: "droplet"
        },
        { 
          id: 6, 
          name: "Mixed Flow Kit", 
          description: "Variety pack for variable flow days",
          icon: "package" 
        }
      ]
    };
    
    return flowBasedRecommendations[cycleData.flowType];
  };

  return (
    <CycleDataContext.Provider
      value={{
        cycleData,
        updateCycleData,
        isEditMode,
        toggleEditMode,
        getPhaseForDate,
        getRecommendations
      }}
    >
      {children}
    </CycleDataContext.Provider>
  );
}

export function useCycleData() {
  const context = useContext(CycleDataContext);
  if (context === undefined) {
    throw new Error("useCycleData must be used within a CycleDataProvider");
  }
  return context;
}
