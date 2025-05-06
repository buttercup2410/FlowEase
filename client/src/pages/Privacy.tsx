import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Privacy() {
  const [_, setLocation] = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This Privacy Policy explains how FlowCycle collects, uses, and protects your personal information 
            when you use our services.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">1. Information We Collect</h3>
          <p className="text-muted-foreground">
            We collect information you provide directly to us, such as account information, profile details, 
            and menstrual cycle data. We also collect usage information automatically when you use our services.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">2. How We Use Your Information</h3>
          <p className="text-muted-foreground">
            We use your information to provide, maintain, and improve our services, communicate with you, 
            personalize your experience, and develop new products and services.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">3. Information Sharing</h3>
          <p className="text-muted-foreground">
            We do not share your personal information with third parties except as described in this Privacy Policy. 
            We may share information with service providers, business partners, or for legal compliance.
          </p>
          
          <div className="pt-4">
            <Button onClick={() => setLocation("/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}