import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { CycleDataProvider } from "./CycleDataContext";
import { LanguageProvider } from "./LanguageContext";
import { SubscriptionProvider } from "./SubscriptionContext";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <LanguageProvider>
          <AuthConsumer>
            {(auth) => (
              auth.user ? (
                <CycleDataProvider userId={auth.user.id}>
                  <CartProvider>
                    <SubscriptionProvider userId={auth.user.id}>
                      {children}
                      <Toaster />
                    </SubscriptionProvider>
                  </CartProvider>
                </CycleDataProvider>
              ) : (
                <>
                  {children}
                  <Toaster />
                </>
              )
            )}
          </AuthConsumer>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AuthConsumer({ children }: { children: (auth: ReturnType<typeof useAuth>) => ReactNode }) {
  const auth = useAuth();
  return <>{typeof children === "function" ? children(auth) : children}</>;
}

export function useAppAuth() {
  return useAuth();
}