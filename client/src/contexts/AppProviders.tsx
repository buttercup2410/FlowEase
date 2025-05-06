import { ReactNode, createContext, useContext } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "../lib/queryClient";
import { AuthProvider, AuthContextType, useAuth } from './AuthContext';
import { CycleDataProvider } from './CycleDataContext';
import { CartProvider } from './CartContext';
import { SubscriptionProvider } from './SubscriptionContext';

// For simplicity, let's just export useAuth as useAppAuth
export const useAppAuth = useAuth;

interface AppProvidersProps {
  children: ReactNode;
}

// This is the main component that provides the context structure for the entire app
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppProviderChildren>
            {children}
          </AppProviderChildren>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Create a separate component to consume the auth context
function AppProviderChildren({ children }: { children: ReactNode }) {
  const auth = useAuth();
  
  return (
    <CycleDataProvider userId={auth.user?.id}>
      <CartProvider userId={auth.user?.id}>
        <SubscriptionProvider userId={auth.user?.id}>
          <Toaster />
          {children}
        </SubscriptionProvider>
      </CartProvider>
    </CycleDataProvider>
  );
}