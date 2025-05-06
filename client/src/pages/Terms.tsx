import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Terms() {
  const [_, setLocation] = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            These Terms of Service govern your use of FlowEase. By using our services, you agree 
            to these terms. Please read them carefully.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">1. Service Description</h3>
          <p className="text-muted-foreground">
            FlowEase provides menstrual cycle tracking and product recommendation services to help users 
            manage their menstrual health.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">2. User Responsibilities</h3>
          <p className="text-muted-foreground">
            Users are responsible for maintaining the confidentiality of their account credentials 
            and for all activities that occur under their account.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">3. Privacy</h3>
          <p className="text-muted-foreground">
            Our Privacy Policy describes how we handle the information you provide to us when you use our services. 
            You agree to our data practices, including the collection, use, and sharing of your information as described 
            in our Privacy Policy.
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