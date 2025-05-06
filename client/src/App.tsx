import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Subscription from "@/pages/Subscription";
import Layout from "@/components/Layout";
import { useAppAuth } from "./contexts/AppProviders";

function App() {
  const { isAuthenticated } = useAppAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  // Redirect to login if not authenticated and trying to access protected routes
  useEffect(() => {
    if (!isAuthenticated && 
        location !== "/" && 
        location !== "/login" && 
        location !== "/register") {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      setLocation("/login");
    }
  }, [isAuthenticated, location, setLocation, toast]);

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={Login} />
      </Switch>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/products" component={Products} />
        <Route path="/subscription" component={Subscription} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
